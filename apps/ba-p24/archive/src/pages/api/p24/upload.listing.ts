import { JSDOM } from 'jsdom'
import { NextApiRequest, NextApiResponse } from 'next'
import listingsSchema from '@/schemas/listing'
import { API_URL, RespondToRequest } from '@/utils/api'
import { Property } from 'ba-website'

import { organizeScrapedData, scrapeHTML } from '../../../utils/scrape'
import { client } from '@/utils/sanity.client'
import {
  createReferenceFromRecord,
  linkReferencesToRecord,
  uploadImage,
} from '@/utils/sanity.helpers'
import {
  CREATED_LISTING_RESPONSE_TEXT,
  DEFAULT_IMAGE,
  UPDATED_LISTING_RESPONSE_TEXT,
} from '@/constants/index'
import groq from 'groq'
import {
  convertStringToUrlFriendlyString,
  makeStringOnlyAlphaNumeric,
} from '@/utils/index'
import { randomUUID } from 'crypto'
import { geoLocate } from '@/utils/google.helpers'
import { UploadListingFormDataType } from 'typings'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Look at the url
  const { p24url: url, mandateStartEnd } =
    req?.body as UploadListingFormDataType
  if (!url || !url.includes('https://') || !url.includes('property24.com/'))
    return res.status(400).send({ message: 'Invalid or no url provided' })
  // If it's not a p24 url then respond back saying it's not a p24 url
  if (!url.includes('property24.com'))
    return RespondToRequest(
      res,
      400,
      'Invalid url provided (needs to be a property 24 link).',
    )

  // Fetch the content html
  const rawHTML = await scrapeHTML(url)
  if (!rawHTML) return RespondToRequest(res, 400, 'Unable to parse url')

  const dom = new JSDOM(rawHTML)
  const document: Document = dom.window.document
  let listing: any = {
    _type: 'property',
    gallery: [],
    property24Link: url,
    address: '',
    features: [],
  }

  //   Organize the info based on the schema (attach url as property24Link)
  for (const key in listingsSchema) {
    const { type = undefined, selector = undefined } = listingsSchema[key]

    if (!type || !selector)
      RespondToRequest(
        res,
        500,
        'One of the type or the selector in the schema is not defined. Check the schema file.',
      )

    const data = organizeScrapedData(
      listingsSchema[key],
      dom,
      document,
      req,
      res,
    )
    if (!data && data !== 0 && listingsSchema[key].required)
      return res
        .status(400)
        .json({ message: 'Something went wrong when parsing the HTML' })
    listing[key] = data ?? listingsSchema[key].defaultValue ?? ''
  }

  // * This uploads the images to sanity
  const featuredImage = await uploadImage(
    client,
    listing.featuredImage || DEFAULT_IMAGE,
  )

  let errorUpload = false
  const gallery = await Promise.all(
    listing.gallery.map(async (image: string) => {
      try {
        return await uploadImage(client, image || DEFAULT_IMAGE)
      } catch (error) {
        return (errorUpload = true)
      }
    }),
  )

  if (!gallery || !featuredImage || errorUpload)
    return res
      .status(400)
      .json({ message: 'Something went wrong when uploading the images' })

  listing.featuredImage = featuredImage
  listing.gallery = gallery

  listing = await linkReferencesToRecord(listing, listingsSchema, client)

  listing.slug = {
    _type: 'slug',
    current: `${convertStringToUrlFriendlyString(
      listing.title ?? randomUUID(),
    )}-${listing.property24Id}`,
  }
  listing.title = makeStringOnlyAlphaNumeric(listing.title)
  listing.description = listing.description?.replaceAll('  ', '')
  listing.mandateStart =
    new Date(mandateStartEnd.startDate)?.toISOString() || ''
  listing.mandateEnd = new Date(mandateStartEnd.endDate)?.toISOString() || ''

  // await client.delete({ query: '*[_type == "property"]' });

  // todo: Get address here (fix in schema first)
  const [geoData, ..._] = await geoLocate(listing.address)
  const allAreasInSanity: any[] = await client.fetch("*[_type == 'area']")
  const areaMatch = allAreasInSanity.find(
    item =>
      item.location.coordinates.lat === geoData?.latitude &&
      item.location.coordinates.lng === geoData?.longitude,
  )
  let newSanityArea: Record<any, any>
  delete listing.address

  if (!areaMatch) {
    newSanityArea = await client.create({
      _type: 'area',
      location: {
        _type: 'location',
        coordinates: {
          lat: geoData?.latitude ?? 0,
          lng: geoData?.longitude ?? 0,
          alt: 0,
        },
        formatted_address: geoData.formattedAddress,
        place_id: geoData?.extra?.googlePlaceId || '',
      },
      name: geoData.formattedAddress.split(',')[0] || geoData.formattedAddress,
    })
  }

  listing.location = createReferenceFromRecord(
    areaMatch ? areaMatch : newSanityArea,
  )

  // * This Checks If the property Exists and makes a patch instead of creating a new record.
  const listingExistsQuery = groq`*[_type == "property" && property24Link == "${listing.property24Link}"][0]`
  const propertyThatExistsInSanity = await client.fetch(listingExistsQuery)

  if (propertyThatExistsInSanity) {
    const editedListing = await client
      .patch(propertyThatExistsInSanity._id)
      .set(listing)
      .commit()
      .then(res => res)

    return res.status(200).json({
      message: UPDATED_LISTING_RESPONSE_TEXT,
      listing: editedListing,
      url: editedListing?.slug?.current || undefined,
    })
  }

  const createdSanityListing = await client.create(listing).then(res => res)

  res.status(200).json({
    message: CREATED_LISTING_RESPONSE_TEXT,
    listing: createdSanityListing,
    url: createdSanityListing?.slug?.current || undefined,
  })
}

import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';
import listingsSchema from '@/schemas/listing';
import { API_URL, RespondToRequest } from '@/utils/api';

import { organizeScrapedData, scrapeHTML } from '../../../utils/scrape';
import { client } from '@/utils/sanity.client';
import {
  createReferenceFromRecord,
  linkReferencesToRecord,
  uploadImage,
} from '@/utils/sanity.helpers';
import {
  CREATED_LISTING_RESPONSE_TEXT,
  DEFAULT_IMAGE,
  DELETED_LISTING_RESPONSE_TEXT,
  UPDATED_LISTING_RESPONSE_TEXT,
} from '@/constants/index';
import groq from 'groq';
import {
  convertStringToUrlFriendlyString,
  makeStringOnlyAlphaNumeric,
} from '@/utils/index';
import { randomUUID } from 'crypto';
import { geoLocate } from '@/utils/google.helpers';
import { UploadListingFormDataType } from 'typings';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Look at the url
  const { p24url: url, mandateStartEnd } =
    req?.body as UploadListingFormDataType;
  if (!url || !url.includes('https://') || !url.includes('property24.com/'))
    return res.status(400).send({ message: 'Invalid or no url provided' });
  // If it's not a p24 url then respond back saying it's not a p24 url
  if (!url.includes('property24.com'))
    return RespondToRequest(
      res,
      400,
      'Invalid url provided (needs to be a property 24 link).'
    );

  const deletedListing = await client.delete({
    query: `*[_type == "property" && slug.current == "${url}"]`,
  });

  res.status(200).json({
    message: DELETED_LISTING_RESPONSE_TEXT,
    listing: deletedListing,
    url: undefined,
  });
}

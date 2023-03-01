import { z } from "zod";
import type { DateType } from "react-tailwindcss-datepicker/dist/types";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  organizeScrapedData,
  scrapeHTML,
  type ScrapeSchemaType,
} from "@/utils/scrape";
import listingsSchema from "@/schemas/listing";
import { JSDOM } from "jsdom";
import { client } from "@/utils/sanity.client";
import {
  createReferenceFromRecord,
  linkReferencesToRecord,
  uploadImage,
} from "@/utils/sanity.helpers";
import {
  CREATED_LISTING_RESPONSE_TEXT,
  DEFAULT_IMAGE,
  UPDATED_LISTING_RESPONSE_TEXT,
} from "@/constants";
import {
  convertStringToUrlFriendlyString,
  makeStringOnlyAlphaNumeric,
} from "@/utils";
import { randomUUID } from "crypto";
import { geoLocate } from "@/utils/google.helpers";
import { groq } from "next-sanity";

export const listingRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  uploloadListing: protectedProcedure
    .input(
      z.object({
        p24url: z.string().url(),
        mandateStartEnd: z.object({
          startDate: z.union([z.string(), z.date(), z.null()]),
          endDate: z.union([z.string(), z.date(), z.null()]),
        }),
      })
    )
    .mutation(async ({ input: { p24url: url, mandateStartEnd }, ctx }) => {
      // If it's not a p24 url then respond back saying it's not a p24 url
      if (!url || !url.includes("property24.com"))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid url provided (needs to be a property 24 link).",
        });

      const rawHTML = await scrapeHTML(url);
      if (!rawHTML)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to parse url",
        });

      const dom = new JSDOM(rawHTML);

      const document = dom.window.document;

      let listing: { _type: string } & Record<any, any> = {
        _type: "property",
        gallery: [],
        property24Link: url,
        address: "",
        features: [],
        property24Id: "",
      };

      //   Organize the info based on the schema (attach url as property24Link)
      for (const key in listingsSchema) {
        const type = listingsSchema[key]?.type;
        const selector = listingsSchema[key]?.selector;
        const required = listingsSchema[key]?.required;
        const defaultValue = listingsSchema[key]?.defaultValue;

        if (!type || !selector || !listingsSchema[key])
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "One of the type or the selector in the schema is not defined. Check the schema file.",
          });

        try {
          const data = organizeScrapedData(
            listingsSchema[key] as ScrapeSchemaType,
            dom,
            document
          );

          if (!data && data !== 0 && required)
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went wrong when parsing the HTML",
            });
          listing[key] = data ?? defaultValue ?? "";
        } catch (error: any) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              error?.message || "Something went wrong when parsing the HTML",
          });
        }
      }
      // * This uploads the images to sanity
      const featuredImage = await uploadImage(
        client,
        listing.featuredImage || DEFAULT_IMAGE
      );

      let errorUpload = false;
      const gallery = await Promise.all(
        listing.gallery.map(async (image: string) => {
          try {
            return await uploadImage(client, image || DEFAULT_IMAGE);
          } catch (error) {
            return (errorUpload = true);
          }
        })
      );

      if (!gallery || !featuredImage || errorUpload)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong when uploading the images",
        });

      listing.featuredImage = featuredImage;
      listing.gallery = gallery;

      // @ts-expect-error: _type not found here
      listing = await linkReferencesToRecord(listing, listingsSchema, client);

      listing.slug = {
        _type: "slug",
        current: `${convertStringToUrlFriendlyString(
          listing.title ?? randomUUID()
        )}-${listing?.property24Id}`,
      };
      listing.title = makeStringOnlyAlphaNumeric(listing.title);
      listing.description = listing.description?.replaceAll("  ", "");
      listing.mandateStart =
        new Date(mandateStartEnd.startDate || new Date())?.toISOString() || "";
      listing.mandateEnd =
        new Date(mandateStartEnd.endDate || new Date())?.toISOString() || "";

      // await client.delete({ query: '*[_type == "property"]' });

      // todo: Get address here (fix in schema first)
      const [geoData, ..._] = await geoLocate(listing.address);
      const allAreasInSanity: any[] = await client.fetch("*[_type == 'area']");
      const areaMatch = allAreasInSanity.find(
        (item) =>
          item.location.coordinates.lat === geoData?.latitude &&
          item.location.coordinates.lng === geoData?.longitude
      );
      let newSanityArea: Record<any, any> = {};
      delete listing.address;

      if (!geoData)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Location in listing not found",
        });

      if (!areaMatch) {
        newSanityArea = await client.create({
          _type: "area",
          location: {
            _type: "location",
            coordinates: {
              lat: geoData?.latitude ?? 0,
              lng: geoData?.longitude ?? 0,
              alt: 0,
            },
            formatted_address: geoData.formattedAddress,
            place_id: geoData?.extra?.googlePlaceId || "",
          },
          name: geoData?.formattedAddress
            ? geoData?.formattedAddress.split(",")[0] ||
              geoData?.formattedAddress
            : "",
        });
      }

      listing.location = createReferenceFromRecord(
        areaMatch ? areaMatch : newSanityArea
      );

      // * This Checks If the property Exists and makes a patch instead of creating a new record.
      const listingExistsQuery = groq`*[_type == "property" && property24Link == "${listing.property24Link}"][0]`;
      const propertyThatExistsInSanity = await client.fetch(listingExistsQuery);

      if (propertyThatExistsInSanity) {
        const editedListing = await client
          .patch(propertyThatExistsInSanity._id)
          .set(listing)
          .commit()
          .then((res) => res);

        return {
          message: UPDATED_LISTING_RESPONSE_TEXT,
          listing: editedListing,
          url: editedListing?.slug?.current || undefined,
        };
      }

      const createdSanityListing = await client
        .create(listing)
        .then((res) => res);

      return {
        message: CREATED_LISTING_RESPONSE_TEXT,
        listing: createdSanityListing,
        url: createdSanityListing?.slug?.current || undefined,
      };
    }),
});

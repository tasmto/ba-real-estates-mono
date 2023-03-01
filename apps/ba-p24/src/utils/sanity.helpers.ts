import { type ScrapeSchemaType } from "@/utils/scrape";
import { type SanityClient } from "@sanity/client";
import { randomUUID } from "crypto";
import got from "got";
import { Property, type SanityImageAsset } from "ba-website";

export const uploadImage = async (
  client: SanityClient,
  imageSrc: string
): Promise<any | null> => {
  const imageReadableStream = got.stream(imageSrc);

  if (!imageReadableStream) return null;

  // @ts-expect-error: asset type is still needed here
  const image = await client.assets
    .upload("image", imageReadableStream)
    .then((document) => {
      return document;
    })
    .catch((error) => {
      console.error("Upload failed:", error.message);
    });
  if (!image) return null;

  return {
    _type: "image",
    _key: randomUUID(),
    asset: {
      _ref: image._id,
      _type: "reference",
      _key: randomUUID(),
    },
  };
};

export const createReferenceFromRecord = (
  record:
    | Record<string, { _id: string }>
    | Array<Record<string, { _id: string }>>
) => {
  if (typeof record !== "object") return record;
  if (Array.isArray(record))
    return record.map((item) => ({
      _key: randomUUID(),
      _ref: item._id,
      _type: "reference",
    }));
  else
    return {
      _key: randomUUID(),
      _ref: record?._id || "",
      _type: "reference",
    };
};

export const linkReferencesToRecord = async (
  obj: Record<any, any>,
  schema: Record<any, ScrapeSchemaType>,
  client: SanityClient
) => {
  // Go through Schema and takeout the references, and fetch collections.
  const objCopy = obj;
  const referenceOnlySchema: Record<string, any> = {};
  const queries = {};

  for (const key in schema) {
    if (!schema[key]?.reference) continue;
    referenceOnlySchema[key] = schema[key];

    if (!queries[schema[key]?.reference?.name])
      queries[schema[key]?.reference?.name] = await client.fetch(
        schema[key]?.reference?.query
      );
  }

  // Go though the obj (listing) and:
  // -  if type boolean match presence with key
  // -  if type string match value
  for (const key in referenceOnlySchema) {
    if (typeof obj[key] === "boolean") {
      const recordMatch = queries[
        referenceOnlySchema[key]?.reference.name
      ]?.filter(
        (item) => item?.name === key || item?.commonNames?.includes(key)
      );
      if (
        !recordMatch ||
        recordMatch.length <= 0 ||
        !referenceOnlySchema[key].key
      ) {
        delete objCopy[key];
        continue;
      }
      const recordMatchRef = createReferenceFromRecord(recordMatch);
      if (referenceOnlySchema[key].array)
        objCopy[referenceOnlySchema[key].key] = recordMatchRef ?? [];
      else objCopy[referenceOnlySchema[key].key] = recordMatchRef[0];

      delete objCopy[key];
      continue;
    } else if (typeof obj[key] === "string") {
      const recordMatch = queries[
        referenceOnlySchema[key]?.reference.name
      ]?.filter(
        (item) =>
          item?.name === obj[key] || item?.commonNames?.includes(obj[key])
      );

      if (
        !recordMatch ||
        recordMatch.length <= 0 ||
        !referenceOnlySchema[key].key
      ) {
        delete objCopy[key];
        continue;
      }

      const recordMatchRef = createReferenceFromRecord(recordMatch);
      if (referenceOnlySchema[key].array)
        objCopy[referenceOnlySchema[key].key] = recordMatchRef ?? [];
      else objCopy[referenceOnlySchema[key].key || key] = recordMatchRef[0];

      delete objCopy[key];
      continue;
    } else if (Array.isArray(obj[key])) {
      if (obj[key].includes((item) => typeof item !== "string")) continue;

      const recordMatch = queries[
        referenceOnlySchema[key]?.reference?.name
      ]?.filter((item) =>
        obj[key].find(
          (scrapedValue) =>
            item?.name === scrapedValue ||
            item?.commonNames?.includes(scrapedValue)
        )
      );

      if (
        !recordMatch ||
        recordMatch.length <= 0 ||
        !referenceOnlySchema[key].key
      ) {
        delete objCopy[key];
        continue;
      }

      const recordMatchRefs = recordMatch.map((item: any) =>
        createReferenceFromRecord(item)
      );

      objCopy[referenceOnlySchema[key].key] =
        recordMatchRefs ?? referenceOnlySchema[key].defaultValue;

      delete objCopy[key];
      continue;
    }
    delete objCopy[key];
  }

  return objCopy;
};

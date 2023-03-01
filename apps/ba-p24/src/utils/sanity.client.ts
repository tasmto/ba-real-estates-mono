import SanityClientConstructor from '@sanity/client';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

export const client = SanityClientConstructor({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production' ? true : false,
  token,
});

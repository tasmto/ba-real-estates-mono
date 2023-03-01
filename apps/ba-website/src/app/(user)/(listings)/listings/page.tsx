import React from 'react';
import { PropertyCategory } from 'types';
import { PropertyWithLocation } from 'typings';

import {
  useFetchListings,
  useFetchPropertyCategories,
} from '@/hooks/useSanity';

import Wrapper from './(components)/Wrapper';

type Props = {};

const Page = async (props: Props) => {
  const properties = await useFetchListings<PropertyWithLocation>(
    undefined,
    `"location": location -> { location, name }`,
    ' | order(_createdAt asc)'
  );
  const allCategories = await useFetchPropertyCategories<PropertyCategory>();

  return (

    <Wrapper properties={properties} categories={allCategories} />

  );
};
export const revalidate = 300;
export default Page;

import React from "react";
import { PropertyCategory } from "types";
import { PropertyWithLocation } from "typings";

import { fetchListings, fetchPropertyCategories } from "@/hooks/sanity.helpers";

import Wrapper from "./(components)/Wrapper";

type Props = {
  params: { listingCategoryName: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: Props) => {
  const categoriesFromUrl = searchParams?.category;
  const properties = await fetchListings<PropertyWithLocation>(
    [
      categoriesFromUrl && categoriesFromUrl.length > 0
        ? `category->slug.current in  [${Array.from(categoriesFromUrl).map(
            (cat) => `"${cat?.trim()}"`
          )}]`
        : null,
    ],
    `"location": location -> { location, name }`,
    " | order(_createdAt asc)"
  );
  const allCategories = await fetchPropertyCategories<PropertyCategory>();

  return <Wrapper properties={properties} categories={allCategories} />;
};
export const revalidate = 300;
export default Page;

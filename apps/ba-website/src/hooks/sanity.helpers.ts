import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";

export const fetchPropertyCategories = async <Type>(
  conditions?: string,
  dataFilters?: string
) => {
  const allPropertyCategoriesQuery = groq`*[_type =="propertyCategory" ${
    conditions ? `&& ${conditions}` : ""
  }]{..., ${dataFilters && dataFilters}}`;

  const allPropertyCategories: Type[] = await client.fetch(
    allPropertyCategoriesQuery
  );

  return allPropertyCategories;
};

export const fetchListings = async <Type>(
  conditions?: Array<string | null>,
  dataFilters?: string,
  sorting?: string
) => {
  const propertiesQuery = groq`*[_type=='property' ${
    conditions && conditions?.find((item) => item !== null)
      ? `&& ${conditions
          .filter((condition) => condition !== null)
          .join(" && ")}`
      : ""
  }]{..., ${dataFilters && dataFilters}} ${sorting || ""}`;
  const properties: Type[] = await client.fetch(propertiesQuery);

  return properties;
};

export const fetchTeamMembers = async <Type>(
  conditions?: string,
  dataFilters?: string
) => {
  const memberQuery = groq`*[_type=='teamMember' ${
    conditions ? `&& ${conditions}` : ""
  }]{..., ${dataFilters && dataFilters}}`;
  const member: Type[] = await client.fetch(memberQuery);

  return member;
};

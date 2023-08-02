import React from "react";
import { Property, PropertyCategory, TeamMember } from "types";

import {
  fetchListings,
  fetchPropertyCategories,
  fetchTeamMembers,
} from "@/hooks/sanity.helpers";

import ListingsDataWrapper from "./providers";

type Props = {};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const propertyCategories = await fetchPropertyCategories<PropertyCategory>();
  const allProperties = await fetchListings<Property>();
  const allTeamMembers = await fetchTeamMembers<TeamMember>();

  return (
    <ListingsDataWrapper
      allListings={allProperties}
      propertyCategories={propertyCategories}
      allTeamMembers={allTeamMembers}
    >
      {children}
    </ListingsDataWrapper>
  );
};

export default RootLayout;

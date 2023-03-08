import React from 'react';
import { Property, PropertyCategory, TeamMember } from 'types';

import {
    useFetchListings,
    useFetchPropertyCategories,
    useFetchTeamMembers,
} from '@/hooks/useSanity';

import ListingsDataWrapper from './providers';

type Props = {};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const propertyCategories =
        await useFetchPropertyCategories<PropertyCategory>();
    const allProperties = await useFetchListings<Property>();
    const allTeamMembers = await useFetchTeamMembers<TeamMember>();

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

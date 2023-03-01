'use client';

import React from 'react';
import { atom, useSetAtom } from 'jotai';
import { Property, PropertyCategory, TeamMember } from 'types';

type Props = {
    propertyCategories: PropertyCategory[];
    allListings: Property[];
    allTeamMembers: TeamMember[];
    children: React.ReactNode;
};

export const allPropertyCategoriesAtom = atom<PropertyCategory[]>([]);
export const allPropertiesAtom = atom<Property[]>([]);
export const allTeamMembersAtom = atom<TeamMember[]>([]);

const ListingsDataWrapper = ({
    propertyCategories,
    allListings,
    allTeamMembers,
    children,
}: Props) => {
    const setAllCategoriesAtom = useSetAtom(allPropertyCategoriesAtom);
    setAllCategoriesAtom(propertyCategories);

    const setAllListingsAtom = useSetAtom(allPropertiesAtom);
    setAllListingsAtom(allListings);

    const setAllTeamMembersAtom = useSetAtom(allTeamMembersAtom);
    setAllTeamMembersAtom(allTeamMembers);


    return <div>{children}</div>;
};

export default ListingsDataWrapper;

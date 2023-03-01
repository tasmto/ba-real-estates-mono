'use client';
import React, { useState } from 'react';
import { PropertyCategory } from 'types';
import { PropertyWithLocation } from 'typings';

import PropertyCard from '@/components/cards/property/PropertyCard';
import Tabs from '@/components/inputs/tabs/Tabs';

type Props = {
    categories: PropertyCategory[];
    listings: PropertyWithLocation[];
    limit?: number;
    defaultTab?: number;
};

const PropertyCategoryTabs = ({ categories, listings, limit, defaultTab }: Props) => {
    const [activeTab, setActiveTab] = useState(defaultTab ?? 0);
    const onTabChange = (num: number) => setActiveTab(num ?? 0);

    const formatedTabs = categories.reduce<any[]>(
        (accumulator, currentCategory) => {
            const categoryListings = listings.filter(
                (listing) => listing?.category?._ref === currentCategory._id
            );

            if (categoryListings.length > 0)
                accumulator.push({
                    title: currentCategory?.name ?? '',
                    content: (
                        <div
                            key={currentCategory._id}
                            className='grid items-start gap-x-6 gap-y-6 md:grid-cols-3'
                        >
                            {categoryListings.slice(0, limit || -1).map((item, index) => (
                                <PropertyCard key={index} {...item} />
                            ))}
                        </div>
                    ),
                });
            return accumulator;
        },
        []
    );

    return categories && categories.length > 0 ? (
        <Tabs tabs={formatedTabs} activeTab={activeTab} onChange={onTabChange} />
    ) : (
        <></>
    );
};

export default PropertyCategoryTabs;

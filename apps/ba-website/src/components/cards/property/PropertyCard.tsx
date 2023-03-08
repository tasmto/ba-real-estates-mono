import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { PropertyWithLocation } from 'typings';

import SizeRoomButtons from '@/components/listings/sections/SizeRoomButtons';

import { formatCurrency } from '@/utils/format.number';
import PropertyCardImageSlider from '@/components/cards/property/ImageSlider';

const PropertyCard: React.FC<PropertyWithLocation & { className?: string }> = ({
    title,
    slug,
    featuredImage,
    gallery,
    location,
    price,
    bedrooms,
    bathrooms,
    size,
    className
}) => {

    return (
        <Link
            href={`/listing/${slug?.current || ''}`}
            className={clsx('flex h-full flex-col overflow-hidden rounded-xl border border-slate-200', className)}
            onClick={e => {
                if (e.currentTarget.closest('.property-card--image')) { e.stopPropagation(); e.preventDefault() }
            }}
        >
            <div className='relative flex-shrink-0'>
                <h1 className='absolute top-4 left-4 z-20 rounded-lg bg-slate-700/40 py-2 px-5 font-bold text-slate-50 backdrop-blur md:text-lg'>
                    {formatCurrency(price)}
                </h1>

                <PropertyCardImageSlider featuredImage={featuredImage} images={gallery} />
            </div>
            <div className='flex flex-1 flex-col gap-2 bg-slate-50/20 px-3 py-6'>
                <div className='flex-1'>
                    <div className='grid gap-2'>
                        <p className='text-start text-xl font-semibold text-gray-900'>
                            {title}
                        </p>
                        <p className='text-start text-base font-bold text-slate-400'>
                            {location?.name}
                        </p>
                    </div>
                </div>
                <SizeRoomButtons
                    shortNames
                    size={size}
                    bathrooms={bathrooms}
                    bedrooms={bedrooms}
                    className="gap-2"
                    showIicons={false}
                />

            </div>
        </Link>
    );
};

export default PropertyCard;

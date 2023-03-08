'use client';
import React from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { sortByAtom } from 'src/app/(user)/(listings)/listings/[[...listingCategoryName]]/(components)/Wrapper';



export interface SortByType {
    key: string;
    anchorText: string;
    sanityQuery: string;
}
export const sortByOptions: SortByType[] = [{
    key: 'recommended',
    anchorText: 'Recommended',
    sanityQuery: ' | order(_createdAt desc)'
},
{
    key: 'price-ascending',
    anchorText: 'Price ascending',
    sanityQuery: ' | order(price asc)'
},
{
    key: 'price-descending',
    anchorText: 'Price descending',
    sanityQuery: ' | order(price desc)'
},
{
    key: 'address',
    anchorText: 'Address',
    sanityQuery: ' | order(location.name asc)'
},
]

const SortByMenu = () => {
    const [sortBy, setSortBy] = useAtom(sortByAtom);

    return (
        <Popover suppressHydrationWarning>
            <Popover.Button
                className={clsx([
                    'relative flex items-center gap-2 rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 !outline-0 !ring-0  ui-open:border-primary-700 ui-open:text-primary-800',

                    sortBy &&
                    'border-primary-800 text-primary-800',
                ])}
            >
                {sortBy.anchorText || 'Sort by'}
                <BsFillCaretDownFill className='text-sm transition-transform duration-75 ui-open:rotate-180 ui-open:transform' />
            </Popover.Button>
            <Popover.Panel className='absolute z-30 grid translate-y-[3%] bg-gray-50 pt-2 pb-1 shadow-lg'>

                {sortByOptions.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => {

                            setSortBy(option)
                        }}
                        className={clsx([
                            'px-5 py-2 !outline-0 !ring-0 text-sm transition-colors duration-300',
                            option.key === sortBy.key
                                ? 'bg-primary-700 text-white'
                                : 'border-gray-400  bg-transparent text-gray-700',
                        ])}
                    >

                        <span className='text-sm'>{option.anchorText}</span>
                    </button>
                ))}

            </Popover.Panel>
        </Popover>
    );
};

export default SortByMenu;

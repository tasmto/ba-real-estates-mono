'use client';
import React from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { selectedCategoriesAtom } from 'src/app/(user)/(listings)/listings/[[...listingCategoryName]]/(components)/Wrapper';
import { PropertyCategory } from 'types';

import urlFor from '@/lib/sanity.helpers';
import { shortenString } from '@/utils/format.string';

type Props = {
    categories: PropertyCategory[];
};

const CategorySelectMenu = ({ categories }: Props) => {
    const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);

    if (!categories || categories.length <= 0) return null;
    return (
        <Popover>
            <Popover.Button suppressHydrationWarning
                className={clsx([
                    'relative flex items-center gap-2 rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 !outline-0 !ring-0  ui-open:border-primary-700 ui-open:text-primary-800',

                    selectedCategories?.length > 0 &&
                    'border-primary-800 text-primary-800',
                ])}
            >
                {selectedCategories?.length > 0
                    ? shortenString(
                        selectedCategories?.map((item) => item.name).join(', '),
                        20
                    )
                    : 'Categories'}
                <BsFillCaretDownFill className='text-sm transition-transform duration-75 ui-open:rotate-180 ui-open:transform' />
            </Popover.Button>
            <Popover.Panel className='absolute z-30 grid translate-y-[3%] gap-3 bg-gray-50 py-4 px-4 pb-3 shadow-lg sm:grid-cols-2'>
                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => {
                            const newCategories = selectedCategories.find(cat => cat._id === category._id) ? selectedCategories.filter(cat => cat._id !== category._id) : selectedCategories.concat([category])
                            setSelectedCategories(newCategories)
                        }}
                        className={clsx([
                            'flex flex-col items-center  gap-2 rounded-lg border px-3 py-3 !outline-0 !ring-0  transition-colors duration-300',
                            selectedCategories.find((item) => item._id === category._id)
                                ? 'bg-primary-700 text-white'
                                : 'border-gray-400  bg-transparent text-gray-700',
                        ])}
                    >
                        <img
                            src={
                                (category?.icon?.asset &&
                                    urlFor(category?.icon?.asset)
                                        ?.width(20)
                                        .height(20)
                                        .format('png')
                                        .url()) ||
                                ''
                            }
                            className={clsx([
                                selectedCategories.find((item) => item._id === category._id)
                                    ? 'opacity-100 invert'
                                    : 'opacity-70',
                            ])}
                            alt=''
                            width={20}
                            height={20}
                        />
                        <span className='text-sm'>{category.name}</span>
                    </button>
                ))}
                <div className='col-span-full mt-2 flex w-full justify-end gap-2'>
                    <Popover.Button
                        onClick={() =>
                            setSelectedCategories([])
                        }
                        className='inline-flex  rounded-lg border  border-transparent px-4 py-2 text-base font-medium text-rose-900  hover:bg-gray-100'
                    >
                        Reset
                    </Popover.Button>
                    <Popover.Button className='inline-flex  rounded border border-transparent bg-accent-200 px-4 py-2  text-base font-medium text-gray-700 hover:bg-accent-300'>
                        Done
                    </Popover.Button>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default CategorySelectMenu;

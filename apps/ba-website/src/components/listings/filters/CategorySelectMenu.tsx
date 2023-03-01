'use client';
import React from 'react';
import { Popover } from '@headlessui/react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { PropertyCategory } from 'types';
import { useAtom } from 'jotai';
import { selectedListingCategoriesAtom } from 'src/app/(user)/(listings)/listings/(components)/Wrapper';
import clsx from 'clsx';
import Image from 'next/image';
import urlFor from '@/lib/sanity.helpers';
import { shortenString } from '@/utils/format.string';

type Props = {
    categories: PropertyCategory[];
};

const CategorySelectMenu = ({ categories }: Props) => {
    const [selectedCategories, setSelectedCategories] = useAtom(
        selectedListingCategoriesAtom
    );

    if (!categories || categories.length <= 0) return null;
    return (
        <Popover>
            <Popover.Button
                className={
                    clsx(['relative flex text-sm items-center gap-2 rounded-lg border border-gray-400 px-3 py-2 text-gray-700 !outline-0 !ring-0  ui-open:border-primary-700 ui-open:text-primary-800',

                        selectedCategories.length > 0 && 'border-primary-800 text-primary-800'])
                }
            >
                {selectedCategories.length > 0 ? shortenString(selectedCategories.map(item => item.name).join(', '), 20) : 'Categories'}
                <BsFillCaretDownFill className='text-sm transition-transform duration-75 ui-open:rotate-180 ui-open:transform' />
            </Popover.Button>
            <Popover.Panel className='absolute z-30 grid translate-y-[3%] gap-3 bg-gray-50 py-4 pb-3 px-4 shadow-lg sm:grid-cols-2'>
                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() =>
                            selectedCategories.find(item => item._id === category._id)
                                ? setSelectedCategories((cur) =>
                                    cur.filter((cat) => cat._id !== category._id)
                                )
                                : setSelectedCategories((cur) => [...cur, category])
                        }
                        className={clsx([
                            'flex flex-col items-center  gap-2 rounded-lg border px-3 py-3 !outline-0 !ring-0  transition-colors duration-300',
                            selectedCategories.find(item => item._id === category._id)
                                ? 'bg-primary-700 text-white'
                                : 'border-gray-400  bg-transparent text-gray-700',
                        ])}
                    >
                        <img
                            src={
                                (category?.icon?.asset &&
                                    urlFor(category?.icon?.asset)?.width(20).height(20).format('png').url()) ||
                                ''
                            }
                            className={clsx([selectedCategories.find(item => item._id === category._id)
                                ? 'opacity-100 invert'
                                : 'opacity-70',])}
                            alt=''
                            width={20}
                            height={20}
                        />
                        <span className='text-sm'>{category.name}</span>
                    </button>
                ))}
                <div className='flex w-full justify-end gap-2 col-span-full mt-2'>
                    <Popover.Button
                        onClick={() => setSelectedCategories([])}
                        className='inline-flex  rounded-lg border  border-transparent text-rose-900 px-4 py-2 text-base font-medium  hover:bg-gray-100'
                    >
                        Reset
                    </Popover.Button>
                    <Popover.Button

                        className='inline-flex  rounded border border-transparent text-gray-700 bg-accent-200 hover:bg-accent-300  px-4 py-2 text-base font-medium'
                    >
                        Done
                    </Popover.Button>

                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default CategorySelectMenu;

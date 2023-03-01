'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Area, PropertyCategory } from 'types';
import { PropertyWithLocation } from 'typings';

import PropertyCard from '@/components/cards/property/PropertyCard';
import { ClientOnlyCollectionsMap } from '@/components/inputs/listings/map/collection-page/ClientOnlyMap';
import { useFetchListings } from '@/hooks/useSanity';
import { atom, useAtom } from 'jotai';
import { divIcon } from 'leaflet';
import clsx from 'clsx';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
import ListingsFilters from '@/components/listings/filters/ListingsFilters';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
    properties: PropertyWithLocation[];
    categories: PropertyCategory[];
};

export const selectedCategoryAtom = atom<
    Pick<PropertyWithLocation, 'category'> | undefined
>(undefined);

export const listingMapOpenAtom = atom(true);
export const selectedListingCategoriesAtom = atom<PropertyCategory[]>([]);
export const selectedAreaAtom = atom<Area | undefined>(undefined);

const Wrapper = ({ properties, categories }: Props) => {
    const [listingsMapOpen, setListingsMapOpen] = useAtom(listingMapOpenAtom);
    const [renderListingsCount, setRenderListingsCount] = useState(24);
    const [selectedListingsCategories] = useAtom(selectedListingCategoriesAtom);
    const [selectedArea] = useAtom(selectedAreaAtom);

    const { data } = useQuery({
        queryKey: [
            'properties',
            'all',
            selectedListingsCategories.map((item) => item._id).join(', '),
            selectedArea?.location?.place_id
        ],
        queryFn: async () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const properties = await useFetchListings<PropertyWithLocation>(
                [
                    selectedListingsCategories.length > 0
                        ? `category->name in  [${selectedListingsCategories.map(
                            (cat) => `"${cat.name?.trim()}"`
                        )}]`
                        : null,
                    selectedArea?._id ? `location._ref == "${selectedArea._id}"` : null,
                ],
                `"location": location -> {...}`,
                ' | order(_createdAt asc)'
            );
            return properties;
        },
        initialData: properties,
        keepPreviousData: true,
    });
    const [uniqueLocations, setUniquelocations] = useState<Array<Area>>([]);

    useEffect(() => {
        setUniquelocations((cur) => {
            const arr: Area[] = [];
            data.forEach(
                (property) =>
                    property.location.location?.coordinates &&
                    !arr.find(
                        (item) =>
                            item.location?.place_id === property.location.location?.place_id
                    ) &&
                    arr.push(property.location)
            );
            return arr;
        });
    }, [data]);

    return (
        <div
            className={clsx([
                'flex h-full gap-4 px-2 sm:px-4 md:flex-row md:gap-0',
                listingsMapOpen ? ' place-content-stretch' : 'place-content-center',
            ])}
        >
            <div
                className={clsx([
                    'hidden h-full w-full place-content-stretch transition-all duration-150 md:grid md:min-h-[90vh]',
                    listingsMapOpen
                        ? 'md:w-1/2 md:grid-cols-[1fr_1.5rem] xl:w-2/5'
                        : 'md:w-[1.5rem]',
                ])}
            >
                {/* todo: Have the slate bg be some sort of loading state or skeleton bg */}
                <div
                    className={clsx([
                        'h-full w-full flex-1 bg-slate-200',
                        !listingsMapOpen && 'hidden',
                    ])}
                >
                    <ClientOnlyCollectionsMap
                        key={uniqueLocations.map((item) => item._id).join('')}
                        className={clsx(['h-full w-full '])}
                        locations={uniqueLocations}
                        onClose={() => setListingsMapOpen(false)}
                    />
                </div>

                <button
                    role='button'
                    title={listingsMapOpen ? 'Collapse menu' : 'Show map'}
                    className={clsx([
                        'group z-[1000000] h-full w-full max-w-[1.5rem] cursor-pointer place-content-center transition-all hover:bg-gray-100',
                        listingsMapOpen ? '' : '',
                    ])}
                    onClick={() => setListingsMapOpen((cur) => !cur)}
                >
                    {listingsMapOpen ? (
                        <HiChevronDoubleLeft className='h-10 w-10 rounded-full bg-gray-200 p-2 transition-all  group-hover:w-14 group-hover:-translate-x-4 group-hover:bg-primary-800 group-hover:pr-6 group-hover:text-gray-100' />
                    ) : (
                        <HiChevronDoubleRight className='h-10 w-10 rounded-full bg-gray-200 p-2 transition-all group-hover:w-14 group-hover:translate-x-2 group-hover:bg-primary-800 group-hover:pl-6 group-hover:text-gray-100' />
                    )}
                </button>
            </div>
            <div
                className={clsx(
                    'mr-auto w-full  transition-all duration-150',
                    listingsMapOpen ? 'md:w-1/2 xl:w-3/5' : 'w-full'
                )}
            >
                <ListingsFilters
                    className={clsx([
                        'fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:sticky md:top-0 md:left-0 md:translate-x-0',
                        listingsMapOpen ? '' : 'md:container md:px-0',
                    ])}
                    categories={categories}
                />

                <div
                    className=' h-full  max-h-[95vh] overflow-y-scroll sm:max-h-[90vh] md:max-h-[85vh]'
                    id='listingsScrollContainer'
                >
                    <InfiniteScroll
                        className={clsx(
                            'col grid h-full auto-rows-min grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
                            listingsMapOpen
                                ? ''
                                : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        )}
                        dataLength={renderListingsCount} //This is important field to render the next data
                        next={() => setRenderListingsCount((cur) => cur + 12)}
                        hasMore={renderListingsCount <= data.length}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <div className='col-span-full flex w-full flex-wrap justify-between gap-2 rounded-lg bg-gray-100 py-6 px-4'>
                                <p className='text-serif text-xl'>
                                    Those are all the listings we have so far.
                                </p>
                                {/* todo add cta */}
                            </div>
                        }
                        scrollableTarget='listingsScrollContainer'
                        scrollThreshold='200px'
                    // below props only if you need pull down functionality
                    // refreshFunction={this.refresh}
                    // pullDownToRefresh
                    // pullDownToRefreshThreshold={50}
                    // pullDownToRefreshContent={
                    //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    // }
                    // releaseToRefreshContent={
                    //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    // }
                    >
                        {data.slice(0, renderListingsCount).map((item, index) => (
                            <PropertyCard key={index} {...item} className='!h-auto w-full' />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default Wrapper;

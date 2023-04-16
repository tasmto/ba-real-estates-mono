"use client";

import React, { lazy, useMemo, useState, useTransition } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Area, PropertyCategory } from "types";
import { PropertyWithLocation } from "typings";

import PropertyCard from "@/components/cards/property/PropertyCard";
import ListingsFilters from "@/components/listings/filters/ListingsFilters";
import {
  sortByOptions,
  SortByType,
} from "@/components/listings/filters/SortByMenu";
import {
  getCategoriesFromUrl,
  setFilterParams,
} from "@/components/listings/urlparams.helper";
import useDebounce from "@/hooks/useDebounce";
import useEffectOnce from "@/hooks/useEffectOnce";
import { useFetchListings } from "@/hooks/useSanity";
import useUpdateEffect from "@/hooks/useUpdateEffect";

const ClientOnlyCollectionsMap = lazy(
  () => import("@/components/inputs/listings/map/collection-page/ClientOnlyMap")
);

type Props = {
  properties: PropertyWithLocation[];
  categories: PropertyCategory[];
};

export const listingMapOpenAtom = atom(true);
export const selectedAreaAtom = atom<Area | undefined>(undefined);
export const selectedCategoriesAtom = atom<PropertyCategory[]>([]);

export const minPriceAtom = atom<number | undefined>(undefined);
export const maxPriceAtom = atom<number | undefined>(undefined);

export const sortByAtom = atom<SortByType>(sortByOptions[0]);

const Wrapper = ({ properties, categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [listingsMapOpen, setListingsMapOpen] = useAtom(listingMapOpenAtom);

  const [selectedArea] = useAtom(selectedAreaAtom);
  const [minPrice, setMinPrice] = useAtom(minPriceAtom);
  const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(
    selectedCategoriesAtom
  );

  const debouncedFilterCategories = useDebounce(selectedCategory, 500);

  const { data: listings, isLoading } = useQuery({
    queryKey: [
      "properties",
      "all",
      selectedArea?.location?.place_id,
      debouncedFilterCategories,
      sortBy.key,
    ],
    queryFn: async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const properties = await useFetchListings<PropertyWithLocation>(
        [
          debouncedFilterCategories.length > 0
            ? `category->slug.current in  [${debouncedFilterCategories.map(
                (cat) => `"${cat?.slug?.current}"`
              )}]`
            : null,
          selectedArea?._id ? `location._ref == "${selectedArea._id}"` : null,
          // debouncedFilterPrices ? `price > ${debouncedFilterPrices.at(0)} && price < ${debouncedFilterPrices.at(1)}` : null
        ],
        `"location": location -> {...}`,
        sortBy.sanityQuery
      );
      return properties;
    },
    initialData: properties,
    keepPreviousData: true,
  });

  // * This controls client-side filtering of listings and well as how they get displayed. --------------------------
  const filteredListings = useMemo<PropertyWithLocation[]>(() => {
    if (!listings) return [];
    const filteredListings = listings.filter(
      (listing) =>
        listing.price &&
        listing.price < (maxPrice ? maxPrice : Infinity) &&
        listing.price > (minPrice ? minPrice : 0)
    );

    return filteredListings;
  }, [listings, minPrice, maxPrice]);
  const [renderListingsCount, setRenderListingsCount] = useState(24);

  // * This controls adding filteres to the url (low priority). ---------------------------------------------------
  const [isPending, startTransition] = useTransition();
  function updateUrlFiltersHandlers() {
    startTransition(() => {
      if (typeof window === "undefined") return;
      const queryParams = new URLSearchParams(searchParams);

      // * Set Categories -----------------
      const allCategorySlugs = selectedCategory
        .filter((item) => {
          if (item?.slug?.current) return item;
        })
        .map((item) => item?.slug?.current.trim() || "");

      setFilterParams("category", allCategorySlugs, queryParams);

      // * Set Min-Price Range -----------------

      setFilterParams("min", minPrice?.toString(), queryParams);
      // * Set Min-Price Range -----------------

      setFilterParams("max", maxPrice?.toString(), queryParams);

      // * Set Area Range -----------------
      setFilterParams("area", selectedArea?.location?.place_id, queryParams);

      // * Set Sort By -----------------
      setFilterParams("sort-by", sortBy?.key, queryParams);

      router.push(pathname + "?" + queryParams.toString());
    });
  }

  // *  Ensures that any url param updates happen not on first render and after changes are made to the atoms
  useUpdateEffect(() => {
    updateUrlFiltersHandlers();
  }, [selectedArea, minPrice, maxPrice, selectedCategory, sortBy]);

  //   * Ensures that the filter atoms are initialised to what is in the url
  useEffectOnce(() => {
    const categoriesFromUrl = getCategoriesFromUrl(searchParams, categories);
    if (categoriesFromUrl.length > 0) setSelectedCategory(categoriesFromUrl);

    const minPriceFromUrl = Number(searchParams.get("min"));
    if (minPriceFromUrl) setMinPrice(minPriceFromUrl);

    const maxPriceFromUrl = Number(searchParams.get("max"));
    if (maxPriceFromUrl) setMaxPrice(maxPriceFromUrl);

    const sortByKeyFromUrl = searchParams.get("sort-by");
    if (sortByKeyFromUrl) {
      const sortByFromUrl = sortByOptions.find(
        (item) => item.key === sortByKeyFromUrl
      );
      if (sortByFromUrl) setSortBy(sortByFromUrl);
    }
  });

  return (
    <div
      suppressHydrationWarning
      className={clsx([
        "flex h-full gap-4 px-2 sm:px-4 md:flex-row md:gap-0",
        listingsMapOpen ? " place-content-stretch" : "place-content-center",
      ])}
    >
      <div
        className={clsx([
          "hidden h-full w-full place-content-stretch transition-all duration-150 md:grid md:min-h-[90vh]",
          listingsMapOpen
            ? "md:w-1/2 md:grid-cols-[1fr_1.5rem] xl:w-2/5"
            : "md:w-[1.5rem]",
        ])}
      >
        {/* todo: Have the slate bg be some sort of loading state or skeleton bg */}
        <div
          className={clsx([
            "h-full w-full flex-1 bg-slate-200   ",
            !listingsMapOpen && "hidden",
          ])}
        >
          <ClientOnlyCollectionsMap
            key={searchParams.toString()}
            className={clsx(["h-full w-full "])}
            listings={listings}
            onClose={() => setListingsMapOpen(false)}
          />
        </div>

        <button
          role="button"
          title={listingsMapOpen ? "Collapse menu" : "Show map"}
          className={clsx([
            "group z-[1000000] h-full w-full max-w-[1.5rem] cursor-pointer place-content-center transition-all hover:bg-gray-100",
            listingsMapOpen ? "" : "",
          ])}
          onClick={() => setListingsMapOpen((cur) => !cur)}
        >
          {listingsMapOpen ? (
            <HiChevronDoubleLeft className="h-10 w-10 rounded-full bg-gray-200 p-2 transition-all  group-hover:w-14 group-hover:-translate-x-4 group-hover:bg-primary-800 group-hover:pr-6 group-hover:text-gray-100" />
          ) : (
            <HiChevronDoubleRight className="h-10 w-10 rounded-full bg-gray-200 p-2 transition-all group-hover:w-14 group-hover:translate-x-2 group-hover:bg-primary-800 group-hover:pl-6 group-hover:text-gray-100" />
          )}
        </button>
      </div>
      <div
        className={clsx(
          "filter-container--outer relative mr-auto w-full transition-all duration-150",
          listingsMapOpen ? "md:w-1/2 xl:w-3/5" : "w-full"
        )}
      >
        <ListingsFilters
          className={clsx([
            "fixed bottom-4 left-1/2 z-40 row-start-1 row-end-2 -translate-x-1/2 py-1 md:absolute md:top-0 md:left-0 md:translate-x-0",
            listingsMapOpen ? "" : "md:container md:px-0",
            // listingsMapOpen ? "md:max-w-[50%] xl:max-w-[60%]" : " w-full",
          ])}
          categories={categories}
          listings={filteredListings}
          nonFilteredListings={listings}
        />

        <div
          className="row-start-2 row-end-3 h-full max-h-full sm:mt-[55px] sm:max-h-[90vh] sm:overflow-y-scroll md:max-h-[90vh]"
          id="listingsScrollContainer"
        >
          <InfiniteScroll
            className={clsx(
              "col grid h-full auto-rows-min grid-cols-1 gap-x-4 gap-y-4 pb-14 sm:grid-cols-2 sm:pb-0 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
              listingsMapOpen
                ? ""
                : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}
            dataLength={renderListingsCount}
            next={() => setRenderListingsCount((cur) => cur + 12)}
            hasMore={renderListingsCount <= filteredListings.length}
            loader={<h4>Loading...</h4>}
            endMessage={
              <div className="col-span-full flex w-full flex-wrap justify-between gap-2 rounded-lg bg-gray-100 py-6 px-4">
                <p className="text-serif text-xl">
                  Those are all the listings we have so far.
                </p>
                {/* todo add cta */}
              </div>
            }
            scrollableTarget="listingsScrollContainer"
            scrollThreshold="200px"
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
            {filteredListings
              .slice(0, renderListingsCount)
              .map((item, index) => (
                <PropertyCard
                  key={index}
                  {...item}
                  className="!h-auto w-full"
                />
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

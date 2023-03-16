"use client";
import { useEffect, useRef, useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import clsx from "clsx";
import { useAtom } from "jotai";
import { listingMapOpenAtom } from "src/app/(user)/(listings)/listings/[[...listingCategoryName]]/(components)/Wrapper";
import { PropertyCategory } from "types";
import { PropertyWithLocation } from "typings";

import CategorySelectMenu from "@/components/listings/filters/CategorySelectMenu";
import PriceFilterDropDown from "@/components/listings/filters/PriceFilterDropDown";
import SelectedAreaBadge from "@/components/listings/filters/SelectedAreaBadge";
import SortByMenu from "@/components/listings/filters/SortByMenu";

import "simplebar/dist/simplebar.min.css";

interface Props {
    className?: string;
    categories: PropertyCategory[];
    listings: PropertyWithLocation[];
    nonFilteredListings: PropertyWithLocation[];
}

const ListingsFilters = ({
    className,
    categories,
    listings,
    nonFilteredListings,
}: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtLeftEdge, setIsAtLeftEdge] = useState(true);
    const [isAtRightEdge, setIsAtRightEdge] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [listingsMapOpen] = useAtom(listingMapOpenAtom);

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 100;
            setIsAtLeftEdge(scrollRef.current.scrollLeft === 0);
            setIsAtRightEdge(false);
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 100;
            setIsAtRightEdge(
                scrollRef.current.scrollWidth - scrollRef.current.clientWidth ===
                scrollRef.current.scrollLeft
            );
            setIsAtLeftEdge(false);
        }
    };


    useEffect(() => {
        if (scrollRef.current && scrollRef.current !== null) {
            const handleResize = () => {
                setIsOverflowing(
                    // @ts-expect-error
                    scrollRef.current.scrollWidth > scrollRef.current.clientWidth
                );
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, [listingsMapOpen]);


    return (
        <div
            className={clsx([
                "pointer-events-none w-full flex pb-1 sm:bg-transparent bg-white",
                className,
            ])}

        >
            {isOverflowing &&
                <button
                    onClick={handleScrollLeft}
                    disabled={isAtLeftEdge}
                    className="self-start pointer-events-auto py-2  text-2xl text-gray-600 hover:text-primary-700 hover:scale-105 disabled:text-gray-400"
                >
                    <BsFillCaretLeftFill />
                </button>}
            <div className="listing-filters-container flex snap-x overflow-x-auto w-full gap-2 visually-hide-scrollbar scroll-smooth" ref={scrollRef}>
                <CategorySelectMenu categories={categories} />
                <PriceFilterDropDown
                    listings={listings}
                    nonFilteredListings={nonFilteredListings}
                />
                <SortByMenu />

                <SelectedAreaBadge />
            </div>
            {isOverflowing && <button
                onClick={handleScrollRight}
                disabled={isAtRightEdge}
                className="self-start pointer-events-auto py-2 text-2xl scroll text-gray-600 hover:text-primary-700 hover:scale-105 disabled:text-gray-400"
            >
                <BsFillCaretRightFill />
            </button>}
        </div>
    );
};
export default ListingsFilters;

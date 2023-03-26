"use client";
import React, { useMemo, useRef, useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import clsx from "clsx";
import { useAtom } from "jotai";
import {
    maxPriceAtom,
    minPriceAtom,
} from "src/app/(user)/(listings)/listings/[[...listingCategoryName]]/(components)/Wrapper";
import { PropertyWithLocation } from "typings";

import { DualSlider } from "@/components/inputs/dualSlider/DualSlider";
import useDebouncedEffect from "@/hooks/useDebouncedEffect";
import useIsFirstRender from "@/hooks/useIsFirstRender";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import {
    formatCurrency,
    formatCurrencyToShortString,
    getDistributedRange,
    getPercentage,
    removeNonIntegers,
} from "@/utils/format.number";

type Props = {
    listings: PropertyWithLocation[];
    nonFilteredListings: PropertyWithLocation[];
};

const PriceFilterDropDown = ({ listings, nonFilteredListings }: Props) => {
    const [minPrice, setMinPrice] = useAtom(minPriceAtom);
    const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom);
    const isFirstRender = useIsFirstRender();
    const isInitialized = useRef<boolean>(false);
    const [loadingChange, setLoadingChange] = useState(false)

    const [localMinMaxPriceValue, setLocalMinMaxPriceValue] = useState<
        | [number, number]
        | [undefined, undefined]
        | [number, undefined]
        | [undefined, number]
    >([undefined, undefined]);

    const sliderMarks = useMemo<
        { value: number; label: React.ReactNode }[]
    >(() => {
        const chunks =
            nonFilteredListings.length > 1
                ? getDistributedRange(
                    nonFilteredListings?.map((item) => item?.price || 1)
                )
                : [0];

        return chunks.map((num, i, arr) => ({
            value: num,
            label: (
                <div
                    title={`${nonFilteredListings?.filter((item) => {
                        return (
                            (item?.price || 1) > (arr[i - 1] || num) &&
                            (item?.price || 2) < (arr[i + 1] || num)
                        );
                    }).length
                        }`}
                    className={clsx(["w-2 bg-primary-600/50"])}
                    style={{
                        height: `${(60 / 100) *
                            getPercentage(
                                nonFilteredListings.length || 10,
                                nonFilteredListings?.filter((item) => {
                                    return (
                                        (item?.price || 0) > (arr[i - 1] - 100000 || num) &&
                                        (item?.price || 1) < (arr[i + 1] + 100000 || num)
                                    );
                                }).length
                            )
                            }px`,
                    }}
                ></div>
            ),
        }));
    }, [nonFilteredListings]);

    const setMinMaxAtoms = () => {
        if (localMinMaxPriceValue[0])
            setMinPrice(
                localMinMaxPriceValue[0] || minPrice || sliderMarks?.at(0)?.value
            );
        if (localMinMaxPriceValue[1])
            setMaxPrice(
                localMinMaxPriceValue[1] ||
                maxPrice ||
                sliderMarks?.at(sliderMarks?.length - 1 || -1)?.value
            );
    };

    useUpdateEffect(() => {
        if (isInitialized.current === true) return;
        if (isInitialized.current)
            isInitialized.current = true;
        setLocalMinMaxPriceValue([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    useDebouncedEffect(
        () => {
            if (!isFirstRender) setMinMaxAtoms();
        },
        [localMinMaxPriceValue],
        700
    );

    const handleSliderChange = (newValue: number | number[]) =>
        setLocalMinMaxPriceValue(newValue as [number, number]);

    // if (!listings || listings.length <= 0) return null;

    return (
        <Popover suppressHydrationWarning className={'relative'}>
            <Popover.Button
                className={clsx([
                    (minPrice || maxPrice) &&
                    !loadingChange &&
                    "border-primary-800 text-primary-800",
                    "relative flex items-center gap-2 rounded-lg bg-gray-50  border border-gray-400 px-3 py-2 text-sm text-gray-700 !outline-0 !ring-0  ui-open:border-primary-700 ui-open:text-primary-800 whitespace-nowrap",
                    loadingChange && ' animate-button-loading',
                ])}
            >
                {localMinMaxPriceValue?.at(0) || localMinMaxPriceValue?.at(1)
                    ? `${localMinMaxPriceValue?.at(0)
                        ? formatCurrencyToShortString(
                            localMinMaxPriceValue?.at(0) as number
                        )
                        : "max"
                    } – ${localMinMaxPriceValue?.at(1)
                        ? formatCurrencyToShortString(
                            localMinMaxPriceValue?.at(1) as number
                        )
                        : "minimum"
                    }`
                    : "Price range:"}
                <BsFillCaretDownFill className="text-sm transition-transform duration-75 ui-open:rotate-180 ui-open:transform" />
            </Popover.Button>
            <Popover.Panel className="absolute min-w-max z-30 grid translate-y-[-113%] sm:translate-y-[3%] gap-3 bg-gray-50 py-4 px-4 pb-3 shadow-[1px_-12px_20px_3px_rgb(0_0_0_/_0.15)] sm:shadow-lg sm:min-w-[300px] sm:grid-cols-2">
                <div className="col-span-full mt-2 flex w-full flex-col justify-end gap-2 pb-[20px]">
                    <div className="sm:justify-stretch flex flex-col justify-between gap-3 sm:grid sm:grid-cols-2">
                        <fieldset className="grid gap-1">
                            <label
                                htmlFor="minPrice"
                                className="text-sm font-bold text-gray-900"
                            >
                                Min Price
                            </label>
                            <input
                                id="minPrice"
                                type="number"
                                min={1}
                                className={clsx([
                                    "rounded-lg border sm:max-w-[110px] border-gray-400 px-3 py-2 text-sm text-gray-700 !outline-0 !ring-0  active:border-primary-700 active:text-primary-800",
                                ])}
                                value={localMinMaxPriceValue[0] || 0}
                                onChange={(e) => {
                                    const number = removeNonIntegers(e.target.value);
                                    setLocalMinMaxPriceValue((cur) => [number, cur?.at(1)]);
                                }}
                            />
                        </fieldset>
                        <fieldset className="grid gap-1">
                            <label htmlFor="" className="text-sm font-bold text-gray-900">
                                Max Price
                            </label>
                            <input
                                id="maxPrice"
                                type="number"
                                className={clsx([
                                    "rounded-lg border sm:max-w-[110px] border-gray-400 px-3 py-2 text-sm text-gray-700 !outline-0 !ring-0  active:border-primary-700 active:text-primary-800",
                                ])}
                                value={localMinMaxPriceValue[1] || 10000000}
                                onChange={(e) => {
                                    const number = removeNonIntegers(e.target.value);
                                    setLocalMinMaxPriceValue((cur) => [cur?.at(0), number]);
                                }}
                            />
                        </fieldset>
                    </div>

                    <DualSlider
                        getAriaLabel={(index) =>
                            index === 0 ? "Minimum price" : "Maximum price"
                        }
                        // valueLabelDisplay="on"
                        // @ts-expect-error
                        value={localMinMaxPriceValue.every(item => item === undefined) ? (
                            [sliderMarks?.at(0)?.value, sliderMarks?.at(-1)?.value]
                        ) : localMinMaxPriceValue}
                        onChange={(e, value) => handleSliderChange(value)}
                        // valueLabelDisplay='auto'
                        defaultValue={[minPrice || 1, maxPrice || 2000000]}
                        disableSwap
                        marks={sliderMarks}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => formatCurrency(value)}
                        // getAriaValueText={valuetext}
                        // step={null}
                        min={sliderMarks?.at(0)?.value}
                        max={sliderMarks?.at(-1)?.value}
                    />
                </div>
                <div className="col-span-full flex w-full justify-end gap-2">
                    <Popover.Button
                        onClick={() => {
                            setMinPrice(undefined)
                            setMaxPrice(undefined)
                        }}
                        className="inline-flex  rounded-lg border  border-transparent px-4 py-2 text-base font-medium text-rose-900  hover:bg-gray-100"
                    >
                        Reset
                    </Popover.Button>
                    <Popover.Button
                        disabled={
                            !localMinMaxPriceValue[0] ||
                            !localMinMaxPriceValue[1] ||
                            localMinMaxPriceValue[1] <= localMinMaxPriceValue[0] ||
                            localMinMaxPriceValue[0] <= 0 ||
                            localMinMaxPriceValue[1] <= 0
                        }
                        onClick={() => setMinMaxAtoms()}
                        className="inline-flex  rounded border border-transparent bg-accent-200 px-4 py-2  text-base font-medium text-gray-700 hover:bg-accent-300 disabled:bg-gray-300"
                    >
                        Done
                    </Popover.Button>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default PriceFilterDropDown;

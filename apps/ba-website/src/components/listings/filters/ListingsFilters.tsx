"use client"
import clsx from 'clsx'
import { PropertyCategory } from 'types'
import { PropertyWithLocation } from 'typings'

import CategorySelectMenu from '@/components/listings/filters/CategorySelectMenu'
import PriceFilterDropDown from '@/components/listings/filters/PriceFilterDropDown'
import SelectedAreaBadge from '@/components/listings/filters/SelectedAreaBadge'
import SortByMenu from '@/components/listings/filters/SortByMenu'


interface Props { className?: string, categories: PropertyCategory[], listings: PropertyWithLocation[], nonFilteredListings: PropertyWithLocation[] }

const ListingsFilters = ({ className, categories, listings, nonFilteredListings }: Props) => {


    return (
        <div className={clsx(["bg-white", className])}>

            <section aria-labelledby="filter-heading" className='pb-2 flex gap-2 overflow-x-auto items-center'>
                <CategorySelectMenu categories={categories} />
                <PriceFilterDropDown listings={listings} nonFilteredListings={nonFilteredListings} />
                <SortByMenu />
                <SelectedAreaBadge />
            </section>
        </div>
    )
}
export default ListingsFilters
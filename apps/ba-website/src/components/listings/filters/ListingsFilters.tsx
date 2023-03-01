"use client"
import { Fragment, useState } from 'react'

import clsx from 'clsx'
import { atom, useAtom } from 'jotai'
import CategorySelectMenu from '@/components/listings/filters/CategorySelectMenu'
import { PropertyCategory } from 'types'
import SelectedAreaBadge from '@/components/listings/filters/SelectedAreaBadge'




const ListingsFilters = ({ className, categories }: { className?: string, categories: PropertyCategory[] }) => {


    return (
        <div className={clsx(["bg-white", className])}>

            <section aria-labelledby="filter-heading" className='pb-2 flex gap-2 overflow-x-auto items-center'>
                <CategorySelectMenu categories={categories} />
                <SelectedAreaBadge />
            </section>
        </div>
    )
}
export default ListingsFilters
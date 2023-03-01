import React from 'react'
import { MdOutlineBathroom, MdOutlineBedroomChild } from 'react-icons/md';
import { RiRulerLine } from 'react-icons/ri';
import clsx from 'clsx';

type Props = {
    size?: number;
    bedrooms?: number;
    bathrooms?: number;
    shortNames?: boolean
    className?: string
    showIicons?: boolean
}

const SizeRoomButtons = ({ size, bedrooms, bathrooms, shortNames, className, showIicons = true }: Props) => {
    return (
        <div className={`flex flex-wrap  gap-4 self-start justify-self-start text-slate-500 rounded-lg py-2 divide-gray-300  divide-x  ${className}`}>
            {bedrooms && bedrooms > 0 ? (
                <button
                    role='listitem'
                    className='flex items-center cursor-auto gap-2 '
                >
                    <p className='sr-only'>Number of bedrooms</p>
                    {showIicons && <MdOutlineBedroomChild className='h-7 w-7' />}
                    <span>{bedrooms} {shortNames ? "bd" : "bedrooms"}</span>
                </button>
            ) : <></>}
            {bathrooms && bathrooms > 0 ? (
                <button
                    role='listitem'
                    className='flex items-center cursor-auto gap-2 pl-4'
                >
                    <p className='sr-only'>Number of bathrooms</p>
                    {showIicons && <MdOutlineBathroom className='h-7 w-7' />}
                    <span>{bathrooms} {shortNames ? "ba" : "bathrooms"}</span>
                </button>
            ) : <></>}
            {size && size > 0 ? (
                <button
                    role='listitem'
                    className={clsx('flex items-center cursor-auto gap-2', ((bathrooms && bathrooms > 0) || (bedrooms && bedrooms > 0)) && "pl-4")}
                >
                    <p className='sr-only'>Property size</p>
                    {showIicons && <RiRulerLine className='h-7 w-7' />}
                    <span>{size}m²</span>
                </button>
            ) : <></>}
        </div>
    )
}

export default SizeRoomButtons
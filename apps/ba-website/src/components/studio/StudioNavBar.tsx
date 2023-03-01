"use client"

import React from 'react'
import { ArrowCircleLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

type Props = any

const StudioNavBar = (props: Props) => {
  return (
    <div>
      <div className='m-3 flex justify-between gap-4 flex-wrap'>
        <Link
          href='/'
          className='text-yellow-300 flex items-center gap-2 rounded p-1 px-2 text-semibold hover:bg-gold-100/20 transition-colors bg-transparent'
        >
          <ArrowCircleLeftIcon className='h-4 w-4 ' />
          <span>Go to the Website</span>
        </Link>
        <p className=' hidden md:block text-gold-200 border-2 rounded border-gold-300 p-2 text-gray-400 border-gray-400'>
          A status update can go here
        </p>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  )
}

export default StudioNavBar

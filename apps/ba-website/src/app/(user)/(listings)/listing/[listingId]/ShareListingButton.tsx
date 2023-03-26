"use client"
import React from 'react'

type Props = {
    slug?: string
}

const ShareListingButton = ({ slug }: Props) => {
    return (
        <a
            onClick={() => {
                if (typeof window !== undefined) {
                    const share = async () => {
                        try {

                            navigator.share({
                                title: 'Hey, check out this property listing from BA Real Estates:',
                                url: `/listing/${slug}?utm_source=website-share`
                            })
                        } catch (err) {
                            alert(JSON.stringify(err));
                            // Todo copy the link to clipboard
                        }
                    }
                    share()
                }
            }}
            className='inline-flex cursor-pointer justify-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-base font-bold text-gray-800  shadow-sm hover:bg-gray-300'
        >
            Share Listing
        </a>
    )
}

export default ShareListingButton
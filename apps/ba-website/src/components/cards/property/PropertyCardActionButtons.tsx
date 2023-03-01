"use client"
import React from 'react'
import { HiHeart, HiShare } from 'react-icons/hi2'
import { ButtonGroup, IconButton } from '@mui/material'

type Props = {}

const PropertyCardActionButtons = (props: Props) => {
    return (
        <ButtonGroup size="small" aria-label="small button group">
            <IconButton aria-label="Share property">
                <HiShare className='text-team-700' />
            </IconButton>
            <IconButton aria-label="Save for later">
                <HiHeart className='text-team-700' />
            </IconButton>
        </ButtonGroup>
    )
}

export default PropertyCardActionButtons
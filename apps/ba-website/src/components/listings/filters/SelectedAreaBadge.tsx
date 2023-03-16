import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { selectedAreaAtom } from 'src/app/(user)/(listings)/listings/[[...listingCategoryName]]/(components)/Wrapper'

import ToolTip from '@/components/common/ToolTip'

type Props = {}

const SelectedAreaBadge = (props: Props) => {
    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom)
    if (!selectedArea) return <></>
    return (
        <div suppressHydrationWarning className={
            clsx(['relative flex text-sm self-start items-center justify-center gap-2 rounded-lg border  px-3 py-2 text-gray-700 !outline-0 !ring-0  whitespace-nowrap',
                '',
                'border-primary-800 text-primary-800'])
        }>
            <span>{selectedArea?.name}</span>
            <ToolTip title="Discard filter" className='flex justify-center items-center'><button onClick={() => setSelectedArea(undefined)} className='text-lg'><IoIosCloseCircle /></button></ToolTip>
        </div>
    )
}

export default SelectedAreaBadge
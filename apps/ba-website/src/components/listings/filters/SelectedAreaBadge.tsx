import clsx from 'clsx'
import { useAtom } from 'jotai'
import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { selectedAreaAtom } from 'src/app/(user)/(listings)/listings/(components)/Wrapper'

type Props = {}

const SelectedAreaBadge = (props: Props) => {
    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom)
    if (!selectedArea) return <></>
    return (
        <div className={
            clsx(['relative flex text-sm items-center gap-2 rounded-lg border  px-3 py-2 text-gray-700 !outline-0 !ring-0',

                'border-primary-800 text-primary-800'])
        }>
            <span>{selectedArea?.name}</span>
            <button className='text-lg'><IoIosCloseCircle /></button>
        </div>
    )
}

export default SelectedAreaBadge
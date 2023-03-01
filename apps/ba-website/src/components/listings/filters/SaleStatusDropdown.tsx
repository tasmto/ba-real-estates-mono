import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

type Props = {
    selected: string[];
    onChange: (selected: string[]) => void
}

const saleTypes = [
    "For Sale",
    "To Rent",
    "Sold",
]


const SaleStatusDropdown = ({ selected, onChange }: Props) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-2">


                    {saleTypes.map((option, optionIdx) => (
                        <div key={option} className="flex items-center py-2 px-4">
                            <input
                                id={`filter-mobile-${option}-${optionIdx}`}
                                name={`${option}[]`}
                                onChange={() => {
                                    if (selected.includes(option)) return onChange(selected.filter(item => item !== option));
                                    onChange([...selected, option])
                                }}
                                type="checkbox"
                                defaultChecked={selected.includes(option) || false}
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor={`filter-mobile-${option}-${optionIdx}`}
                                className="ml-3 text-sm flex gap-1 text-gray-500"
                            >
                                <span>{option}</span>
                                <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                    1
                                </span>
                            </label>
                        </div>
                    ))}





                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default SaleStatusDropdown
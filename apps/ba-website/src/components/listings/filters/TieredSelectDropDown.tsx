import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

type Props = {}

const saleTypes = [
    { name: "For Sale", default: true },
    { name: "To Rent", },
    { name: "Sold", },

]


const SaleStatusDropdown = (props: Props) => {
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
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">


                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                            <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                                        <span className="font-medium text-gray-900">{"For Sale"}</span>
                                        <span className="ml-6 flex items-center">
                                            <ChevronDownIcon
                                                className={clsx(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                        {saleTypes.map((option, optionIdx) => (
                                            <div key={option.name} className="flex items-center">
                                                <input
                                                    id={`filter-mobile-${option.name}-${optionIdx}`}
                                                    name={`${option.name}[]`}

                                                    type="checkbox"
                                                    defaultChecked={option.default || false}
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    htmlFor={`filter-mobile-${option.name}-${optionIdx}`}
                                                    className="ml-3 text-sm text-gray-500"
                                                >
                                                    {option.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>


                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default SaleStatusDropdown
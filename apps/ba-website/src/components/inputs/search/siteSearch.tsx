"use client"
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

// todo: https://mui.com/material-ui/react-autocomplete/#customized-hook
const SiteSearch = () => {
    return (
        <div>
            <label htmlFor="email" className="sr-only block text-sm font-medium text-gray-700">
                Search candidates
            </label>
            <div className="mt-1 flex rounded shadow-sm relative">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiSearch className="h-8 w-8 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="focus:ring-primary-500 focus:border-primary-800 block w-full  rounded-md pl-16 sm:text-lg border-gray-300 py-6 pr-40"
                        placeholder="Search for a property, city or agent"
                    />
                </div>
                <Link href="/listings"
                    type="button"
                    className="-ml-px absolute right-6 inline-flex items-center space-x-2 top-1/2 -translate-y-1/2 px-8 py-3 border border-primary-700  font-medium text-lg rounded-md z-30 text-gray-50 bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-1 focus:ring-primary-800 focus:border-primary-500"
                >

                    <span>Search</span>
                </Link>
            </div>
        </div>
    )
}

export default SiteSearch
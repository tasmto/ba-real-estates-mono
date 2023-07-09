import React from "react";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { PropertyCategory } from "types";
import { PropertyWithLocation } from "typings";

import SiteSearch from "@/components/inputs/search/siteSearch";
import PropertyCategoryTabs from "@/components/inputs/tabs/PropertyCategoryTabs";
import {
  fetchListings,
  fetchPropertyCategories,
} from "@/hooks/useSanity";
import urlFor from "@/lib/sanity.helpers";

type Props = {};

const HomePage = async (props: Props) => {
  const allPropertyCategories =
    await fetchPropertyCategories<PropertyCategory>();

  const properties = await fetchListings<PropertyWithLocation>(
    undefined,
    `"location": location -> { location, name }`,
    " | order(_createdAt asc)"
  );

  return (
    <div>
      <div className="  relative overflow-hidden bg-gradient-to-b from-slate-800/60 via-slate-800/10 to-slate-800/0">
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[#021d2b]">
          <Image
            width={900}
            height={500}
            src="https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="cover h-full w-full scale-110 object-cover blur-xl"
          />
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
            <div className="relative h-full">
              <svg
                className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform sm:-translate-x-1/2 md:translate-y-[-30%]   lg:-translate-x-3/4"
                width={404}
                height={784}
                fill="none"
                viewBox="0 0 404 784"
              >
                <defs>
                  <pattern
                    id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200/10"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={784}
                  fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
                />
              </svg>
            </div>
          </div>

          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="mx-auto mt-14 max-w-7xl px-4 sm:mt-24 sm:px-6">
              <div className="gap-2 text-center md:grid md:grid-cols-2 md:text-start lg:gap-10">
                <h1 className="font-display text-5xl font-bold tracking-tight text-gray-100 lg:text-[3.5rem]">
                  <span className="block text-yellow-500 drop-shadow-sm">
                    Beyond Architecture
                  </span>{" "}
                  Real Estates.
                </h1>
                <p className="mx-auto mt-3 max-w-md text-base text-gray-50 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                  Our full-service, streamlined approach provides educating the
                  client the process of acquiring real estates, prequalification
                  and exceptional value.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="w-full flex-1 bg-gray-800" />
            </div>
            <div className="container mx-auto px-4 sm:px-6">
              <SiteSearch />
            </div>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-400">
              Here are some of our partners
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-16">
              <div className="flex justify-center ">
                <Image
                  height={300}
                  width={100}
                  className="object-fit h-12 w-auto"
                  src="/images/assets/ooba.svg"
                  alt=""
                  quality={90}
                />
              </div>
              <div className="flex justify-center ">
                <Image
                  height={54}
                  width={100}
                  className="object-fit h-12 w-auto"
                  src="/images/assets/gift-logo.png"
                  alt=""
                />
              </div>
              <div className=" flex justify-center ">
                <Image
                  height={54}
                  width={100}
                  className="h-12 w-auto object-contain"
                  src="/images/assets/smile-logo.svg"
                  alt=""
                />
              </div>
              <div className=" flex justify-center ">
                <Image
                  height={120}
                  width={300}
                  className="h-12 w-auto object-contain"
                  src="/images/assets/ppra-logo.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container grid gap-10   bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="relative text-center">
          <h2 className="mb-5 font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Latest property listings
          </h2>

          {allPropertyCategories && allPropertyCategories.length > 0 && (
            <PropertyCategoryTabs
              listings={properties}
              categories={allPropertyCategories}
              limit={8}
              defaultTab={1}
            />
          )}
          <Link
            href="/listings"
            type="button"
            className="mx-auto mt-10 inline-flex items-center gap-2 self-start rounded-lg bg-accent-200 px-8 py-4 font-medium text-primary-800 hover:bg-accent-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          >
            <span>Explore all Listings</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
      <div className="relative  overflow-hidden pt-16 pb-32">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img
                className="w-full shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/images/assets/cta-section-1.png"
                alt="Inbox user interface"
              />
            </div>
          </div>{" "}
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Find your next home with us.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              For all your property needs, whether you're looking to sell or buy
              or rent your property we have a variety of available properties
              for your needs.
            </p>

            <a
              href="#"
              className="mt-6 inline-flex  rounded-lg border  border-transparent bg-primary-700 px-8 py-4 text-base font-medium text-white shadow-sm hover:bg-primary-800"
            >
              Learn More
            </a>

            <blockquote className="mt-8 border-t border-gray-200 pt-6">
              <div>
                <p className="text-base text-gray-500">
                  &ldquo;Thank you for taking us through the process of selling
                  our home, your guidance through all the paperwork and
                  legalities made it so much easier.&rdquo;
                </p>
              </div>
              <footer className="mt-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      height={24}
                      width={24}
                      className="h-6 w-6 rounded-full"
                      src="/images/assets/belinda-hoofman.png"
                      alt=""
                    />
                  </div>
                  <div className="text-base font-medium text-gray-700">
                    <b>Belinda Hoofman</b>, Home Seller, CPT
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="bg-accent-100/70">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 pr-6 sm:pt-16 sm:pr-16 lg:self-center lg:py-16 lg:pr-0 xl:py-20 xl:pr-20">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                About BA Real Estates
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                We strive to develop purposeful relationships by effectively
                listening and analyzing each client’s unique needs then promptly
                delivering the appropriate solutions, ensuring all parties
                (buyers and sellers) complete satisfaction and mutual benefit.
              </p>
              <ul className="mt-6 grid gap-3">
                <li className="flex items-center gap-2 font-bold">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
                    <HiCheck
                      className="h-6 w-6 text-primary-800"
                      aria-hidden="true"
                    />
                  </span>
                  <span>Accountability, Fairness and Boldness.</span>
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
                    <HiCheck
                      className="h-6 w-6 text-primary-800"
                      aria-hidden="true"
                    />
                  </span>
                  <span>Friendly, Flexible & Efficient service.</span>
                </li>
              </ul>
              <a
                href="#"
                className="mt-8 inline-flex items-center rounded-md border border-transparent bg-primary-800  px-8 py-4  text-base font-medium text-white shadow hover:bg-primary-900"
              >
                Learn more about us
              </a>
            </div>
            <div className="aspect-w-5 aspect-h-2 md:aspect-w-2 md:aspect-h-1 -mt-6">
              <img
                className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="/images/assets/cta-section-2.png"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container py-16 sm:py-24">
          <div className=" sm:flex sm:items-center sm:justify-between">
            <div className="grid gap-3">
              {" "}
              <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Find the category for you
              </h2>
              <p className=" text-gray-500">
                We help our customers find and sell properties for a variety of
                needs.
              </p>
            </div>

            <Link
              href=""
              type="button"
              className="hidden items-center gap-2 rounded-lg bg-accent-200 px-8 py-4 font-medium text-primary-800 hover:bg-accent-300 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 sm:flex"
            >
              <span>Browse all categories</span>
              <HiArrowRight />
            </Link>
          </div>

          <div className="mt-8 flow-root ">
            <div className="-my-2">
              <div className="relative box-content h-full overflow-x-auto py-2 xl:overflow-visible">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:gap-x-8  xl:space-x-0 xl:px-0">
                  {allPropertyCategories.map((cat, index) => (
                    <Link
                      href={"/listings?category=" + cat.slug?.current || ""}
                      key={index}
                      className="relative flex h-96 w-full flex-col overflow-hidden p-6 hover:opacity-75 md:h-[28rem] xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <Image
                          width={700}
                          height={700}
                          src={
                            (cat.coverImage?.asset &&
                              urlFor(cat.coverImage?.asset)
                                ?.width(600)
                                .height(600)
                                .url()) ||
                            ""
                          }
                          alt={cat.name || ""}
                          className="h-full w-full object-cover object-center"
                        />
                      </span>{" "}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-primary-600 hover:text-primary-500"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
      {/* <div className='bg-white'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
          <div>
            <h2 className='font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
              Technical Specifications
            </h2>
            <p className='mt-4 text-gray-500'>
              The walnut wood card tray is precision milled to perfectly fit a
              stack of Focus cards. The powder coated steel divider separates
              active cards from new ones, or can be used to archive important
              task lists.
            </p>

            <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className='border-t border-gray-200 pt-4'
                >
                  <dt className='font-medium text-gray-900'>{feature.name}</dt>
                  <dd className='mt-2 text-sm text-gray-500'>
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8'>
            <img
              src='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='Walnut card tray with white powder coated steel divider and 3 punchout holes.'
              className='rounded-lg bg-gray-100'
            />
            <img
              src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='Top down view of walnut card tray with embedded magnets and card groove.'
              className='rounded-lg bg-gray-100'
            />
            <img
              src='https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='Side of walnut card tray with card groove and recessed card area.'
              className='rounded-lg bg-gray-100'
            />
            <img
              src='https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
              alt='Walnut card tray filled with cards and card angled in dedicated groove.'
              className='rounded-lg bg-gray-100'
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export const revalidate = 300;
export default HomePage;

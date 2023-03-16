import Image from 'next/image';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { Area, Property, PropertyFeature, TeamMember } from 'types';

import ToolTip from '@/components/common/ToolTip';
import { ClientOnlyListingMap } from '@/components/inputs/listings/map/single-listing/ClientOnlyMap';
import ListingPageContactForm from '@/components/listings/forms/ListingPageContactForm';
import SizeRoomButtons from '@/components/listings/sections/SizeRoomButtons';
import { client } from '@/lib/sanity.client';
import urlFor from '@/lib/sanity.helpers';
import { formatCurrency } from '@/utils/format.number';

export interface PropertyType
    extends Omit<Property, 'location' | 'agents' | 'features'> {
    location: Area;
    features: PropertyFeature[];
    agents: TeamMember[];
}

const Page = async ({ params }: { params: { listingId: string } }) => {
    const propertyQuery = groq`*[_type =="property" && slug.current == "${params.listingId}"][0]{...,"features": features[] ->{name, image, indoor}, "agents": agents[] -> {name, role, image, slug},  "location": location -> {location, name}}`;
    const property: PropertyType = await client.fetch(propertyQuery);

    return (
        <div className='pb-20 overflow-auto h-full'>
            <div className='container grid gap-8 mt-8 
            '>
                <div className='flex flex-col justify-between gap-4 sm:flex-row '>
                    <div className='grid gap-1'>
                        <h1 className='font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                            {property?.title || ''}
                        </h1>
                        {(property?.location?.location?.formatted_address ||
                            property?.location?.name) && (
                                <p className='leading-2 font-bold text-gray-300'>
                                    {property?.location?.location?.formatted_address ??
                                        property?.location.name}
                                </p>
                            )}
                    </div>
                    <p className='text-3xl font-bold tracking-tight text-primary-700 sm:text-2xl'>
                        {formatCurrency(property?.price || 0)}
                    </p>
                </div>


                <div className='grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-5 gap-3 h-96 sm:h-[30rem]'>
                    <div className='overflow-hidden row-span-2 sm:row-span-1 sm:col-span-3 sm:block rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl  relative after:block after:top-0 after:h-full after:w-full after:absolute after:bg-transparent after:transition-colors hover:after:bg-gray-800/30 cursor-pointer'>
                        <Image
                            className='h-full w-full object-cover object-center '
                            src={
                                (property?.featuredImage?.asset &&
                                    urlFor(property?.featuredImage.asset)
                                        ?.width(1000)
                                        .height(1000)
                                        .url()) ||
                                ''
                            }
                            alt=''
                            width={700}
                            height={300}
                        />
                    </div>
                    {property?.gallery && property?.gallery.length > 1 && (

                        <div className='row-span-1 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl h-36 sm:h-full grid  sm:grid-cols-1 grid-cols-[repeat(_auto-fit,_minmax(100px_,_1fr_))] grid-rows-[144px] sm:grid-rows-[repeat(_auto-fit,_minmax(250px_,_1fr_))] sm:col-span-2  md:grid-rows-[repeat(_auto-fit,_minmax(385px_,_1fr_))] gap-3 w-full overflow-x-auto sm:overflow-x-hidden overflow-y-hidden sm:overflow-y-auto'>
                            {property.gallery.map(image => (
                                <div className='w-full row-span-full sm:row-span-1 h-36 sm:h-96 relative after:block after:top-0 after:h-full after:w-full after:absolute after:bg-transparent after:transition-colors hover:after:bg-gray-800/30 cursor-pointer' key={image._key}>
                                    <Image
                                        fill
                                        src={
                                            (image?.asset &&
                                                urlFor(image.asset)
                                                    ?.width(700)
                                                    .height(700)
                                                    .url()) ||
                                            ''
                                        }
                                        alt={''}
                                        className='h-full w-full object-cover object-center'
                                    />
                                </div>
                            ))}

                        </div>

                    )}
                </div>


                <div className='grid gap-10 '>
                    <div className='grid  gap-6 divide-y bg-white p-8'>
                        <div>
                            <h3 className=' font-display text-2xl  font-extrabold tracking-tight text-gray-900'>
                                Description
                            </h3>

                            <div className='grid pt-4'>
                                <p className=' leading-2 text-lg text-gray-500'>
                                    {property?.description}
                                </p>
                                <SizeRoomButtons
                                    size={property?.size}
                                    bathrooms={property?.bathrooms}
                                    bedrooms={property?.bedrooms}
                                    className={
                                        'mt-6  divide-x-2  divide-gray-300 bg-gray-100 py-4  px-4 '
                                    }
                                />
                            </div>
                        </div>
                        {property?.features && property?.features.length > 0 && (
                            <div className='pt-6'>
                                <h3 className=' font-display text-2xl  font-extrabold tracking-tight text-gray-900'>
                                    Facilities & Features
                                </h3>
                                <div className='mt-6 flex divide-x-4 self-start justify-self-start'>
                                    {property?.features?.map((feat, i) => (
                                        <button
                                            key={i}
                                            className='flex items-center gap-2 rounded-lg border border-gray-300 px-4  py-2'
                                        >
                                            <img
                                                className=''
                                                src={
                                                    (feat.image?.asset &&
                                                        urlFor(feat.image.asset)
                                                            ?.width(20)
                                                            .height(20)
                                                            .url()) ||
                                                    ''
                                                }
                                                alt=''
                                                width={20}
                                                height={20}
                                            />
                                            <span>{feat?.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='grid  gap-6 divide-y bg-white p-8'>
                        <div>
                            <h3 className=' font-display text-2xl  font-extrabold tracking-tight text-gray-900'>
                                Location
                            </h3>

                            <div className='grid pt-4'>
                                <ClientOnlyListingMap center={property?.location?.location?.coordinates} pins={property?.location?.location?.coordinates ? [property?.location?.location?.coordinates] : undefined} />
                            </div>
                        </div>
                    </div>
                    <div className=' grid gap-6 divide-y  bg-white p-8'>
                        <h1 className=' font-display text-2xl font-extrabold tracking-tight text-gray-900'>
                            Listing Agent
                        </h1>

                        <div className='grid gap-6 sm:grid-cols-2'>
                            <div className='col-span-full mt-6 mb-3 flex flex-wrap justify-between gap-3'>
                                <h3 className='text-xl font-extrabold tracking-tight text-gray-900'>
                                    Interested in this property? Request a viewing.
                                </h3>
                                <p className='font-bold text-gray-300'>
                                    Listing Code: {property?.property24Id}
                                </p>
                            </div>
                            <ToolTip title="View agent's page" arrow>
                                <Link
                                    href={`/team/${property?.agents[0]?.slug?.current}`}
                                    className=' relative after:absolute after:top-0 after:left-0 after:z-20 after:block after:h-full after:w-full after:bg-slate-700/30'
                                >
                                    <div className='absolute top-4 left-4 z-30 text-white'>
                                        <h2 className='text-xl font-bold lg:text-2xl'>
                                            {property?.agents[0].name}
                                        </h2>
                                        <p className='text-slate-100 sm:text-lg'>
                                            {property?.agents[0].role}
                                        </p>
                                    </div>
                                    <Image
                                        className=' inset-0 h-full w-full object-cover'
                                        src={
                                            (property?.agents[0]?.image?.asset &&
                                                urlFor(property?.agents[0].image.asset)
                                                    ?.width(1200)
                                                    .height(1200)
                                                    .url()) ||
                                            ''
                                        }
                                        alt=''
                                        width={500}
                                        height={500}
                                    />
                                </Link>
                            </ToolTip>
                            <ListingPageContactForm property={property} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const revalidate = 300;
export default Page;
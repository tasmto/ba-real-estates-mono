import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import {
    Area,
    Property,
    PropertyCategory,
    PropertyFeature,
    TeamMember,
} from "types";

import ReadMore from "@/components/common/ReadMore";
import { ClientOnlyListingMap } from "@/components/inputs/listings/map/single-listing/ClientOnlyMap";
import ListingPageContactForm from "@/components/listings/forms/ListingPageContactForm";
import PhotoGallery from "@/components/listings/sections/photos-gallery/PhotoGallery";
import SizeRoomButtons from "@/components/listings/sections/SizeRoomButtons";
import Footer from "@/components/navigation/footer/Footer";
import { DEFAULT_PREQUALIFICATION_LINK } from "@/constants/site";
import { useFetchPropertyCategories } from "@/hooks/useSanity";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/sanity.helpers";
import { formatCurrency } from "@/utils/format.number";
export interface PropertyType
    extends Omit<Property, "location" | "agents" | "features"> {
    location: Area;
    features: PropertyFeature[];
    agents: TeamMember[];
}

const Page = async ({ params }: { params: { listingId: string } }) => {
    const propertyQuery = groq`*[_type =="property" && slug.current == "${params.listingId}"][0]{...,"features": features[] ->{name, image, indoor}, "agents": agents[] -> {name, role, image, slug, areas},  "location": location -> {location, name}}`;
    const property: PropertyType = await client.fetch(propertyQuery);
    const propertyCategories =
        await useFetchPropertyCategories<PropertyCategory>();

    return (
        <div className="h-full overflow-auto">
            <div
                className="container mt-8 mb-14 grid gap-12
            "
            >
                {property?.gallery && property?.gallery.length >= 1 && (
                    <PhotoGallery images={property.gallery} property={property} />
                )}

                <div className="grid grid-cols-1 gap-20  sm:grid-cols-3">
                    <div className="flex flex-col space-y-10 divide-y sm:col-span-2">
                        <div className="flex justify-between gap-1 gap-x-3 ">
                            <div>
                                <p className=" mb-2 text-lg text-gray-500">
                                    <span className="font-bold text-gray-800">

                                        {property?.location?.location?.formatted_address?.split(
                                            ","
                                        )[0] ?? property?.location.name?.split(",")[0]},
                                    </span>{' '}
                                    {property?.location?.location?.formatted_address
                                        ?.split(",")
                                        .slice(1)
                                        .join() ??
                                        property?.location.name?.split(",").slice(1).join()}
                                </p>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-800 sm:text-4xl">
                                        {formatCurrency(property?.price || 0)}
                                    </h1>
                                    {(property?.location?.location?.formatted_address ||
                                        property?.location?.name) && (
                                            <a target="_blank" rel="noreferrer"
                                                href={property?.agents?.find(agent => agent?.prequalificationLink)?.prequalificationLink || DEFAULT_PREQUALIFICATION_LINK}
                                                className="font-semibold text-primary-600 underline hover:text-primary-800"
                                            >
                                                Get pre-approved
                                            </a>
                                        )}
                                </div>
                            </div>
                            <a href="#map">
                                <Image
                                    alt="scroll to map"
                                    className="hidden h-[100px] w-[100px] rounded-lg shadow-sm sm:block"
                                    height={120}
                                    width={120}
                                    src={"/images/assets/standin-map.png"}
                                />
                            </a>
                        </div>
                        <div className="grid gap-6 pt-10">
                            <div>
                                <h3 className="font-display text-3xl  font-semibold tracking-tight text-gray-800">
                                    About This Property
                                </h3>

                                <div className="grid pt-4">
                                    {property?.description && (
                                        <ReadMore className=" leading-2 text-lg text-gray-500">
                                            {property?.description}
                                        </ReadMore>
                                    )}
                                    <SizeRoomButtons
                                        size={property?.size}
                                        bathrooms={property?.bathrooms}
                                        bedrooms={property?.bedrooms}
                                        className={
                                            "mt-6  divide-x-2  divide-gray-300 bg-gray-100 py-4  px-4 "
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {property?.features && property?.features.length > 0 && (
                            <div className="pt-10">
                                <h3 className=" font-display text-3xl  font-semibold tracking-tight text-gray-800">
                                    Facilities & Features
                                </h3>
                                <div className="mt-6 flex divide-x-4 self-start justify-self-start">
                                    {property?.features?.map((feat, i) => (
                                        <button
                                            key={i}
                                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4  py-2"
                                        >
                                            <img
                                                className=""
                                                src={
                                                    (feat.image?.asset &&
                                                        urlFor(feat.image.asset)
                                                            ?.width(20)
                                                            .height(20)
                                                            .url()) ||
                                                    ""
                                                }
                                                alt=""
                                                width={20}
                                                height={20}
                                            />
                                            <span>{feat?.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="grid gap-6 pt-10" id="map">
                            <h3 className=" font-display text-3xl  font-semibold tracking-tight text-gray-900">
                                Location
                            </h3>

                            <figure className="grid gap-2">
                                <ClientOnlyListingMap
                                    className=" h-[250px] sm:h-[350px] md:h-[450px]"
                                    center={property?.location?.location?.coordinates}
                                    pins={
                                        property?.location?.location?.coordinates
                                            ? [property?.location?.location?.coordinates]
                                            : undefined
                                    }
                                />
                                <figcaption className="text-sm text-gray-500">
                                    (
                                    <strong className="font-bold">
                                        The map shows an approximate location of the property.
                                    </strong>{" "}
                                    To get more accurate information about the location, you will
                                    need to contact one of the real estate agents listed below.
                                    They will be happy to answer your questions and arrange a
                                    viewing for you.)
                                </figcaption>{" "}
                            </figure>
                        </div>
                        {property?.agents?.length > 0 && <div className="grid gap-6 pt-10">
                            <h1 className=" font-display text-3xl font-semibold tracking-tight text-gray-900">
                                Property Agent{property?.agents?.length > 1 && "s"}
                            </h1>

                            <div className="grid gap-4  sm:grid-cols-2">
                                {property?.agents?.reverse()?.map((agent) => (
                                    <Link
                                        key={agent._id}
                                        href={`/team/${agent?.slug?.current}`}
                                        className="relative flex items-center gap-4"
                                    >
                                        {" "}
                                        <Image
                                            className="h-36 w-36 rounded-full object-cover"
                                            src={
                                                (agent?.image?.asset &&
                                                    urlFor(agent.image.asset)
                                                        ?.width(400)
                                                        .height(400)
                                                        .url()) ||
                                                ""
                                            }
                                            alt=""
                                            width={300}
                                            height={300}
                                        />
                                        <div className="text-gray-800">
                                            <h2 className="text-xl font-bold">{agent.name}</h2>
                                            <p className="text-primary-600">
                                                {agent.role};{" "}
                                                <span className="text-gray-400">
                                                    {agent.areas?.slice(0, 4)?.map((area) => area.name).join(", ")}
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>}
                        <div className="grid gap-6 pt-10" id="contact">
                            <div className="col-span-full mt-6 mb-3 flex flex-wrap justify-between items-center gap-3">
                                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                                    Interested in this property? Request a viewing.
                                </h1>
                                <p className="font-bold text-gray-300">
                                    Listing Code: {property?.property24Id}
                                </p>
                            </div>

                            <ListingPageContactForm property={property} />
                        </div>
                    </div>
                    <div className="sticky top-4 self-start grid gap-6">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            Enquire about this listing
                        </h1>
                        <div className="grid gap-6 divide-y">
                            <div className="grid gap-4 text-center">
                                <a target="_blank" rel="noreferrer"
                                    href={property?.agents?.find(agent => agent?.prequalificationLink)?.prequalificationLink || DEFAULT_PREQUALIFICATION_LINK}
                                    className='inline-flex justify-center rounded-lg border  border-transparent bg-primary-700 px-8 py-4 text-base font-medium text-white shadow-sm hover:bg-primary-800'
                                >
                                    Get pre-qualified
                                </a>
                                <a
                                    href='#contact'
                                    className='inline-flex justify-center rounded-lg border border-transparent bg-accent-200 px-8 py-4 text-base font-medium text-primary-700 shadow-sm hover:bg-accent-300'
                                >
                                    Send an Enquiry
                                </a>
                                {/* <a
                                onClick={() => {
                                    if (typeof window !== undefined) {
                                        const share = async () => {
                                            try {

                                                navigator.share({
                                                    title: 'Hey, check out this property listing from BA Real Estates:',
                                                    url: `/listing/${property.slug?.current}?utm_source=website-share`
                                                })
                                            } catch (err) {
                                                alert(JSON.stringify(err));
                                                // Todo copy the link to clipboard
                                            }
                                        }
                                        share()
                                    }
                                }}
                                className='inline-flex cursor-pointer justify-center rounded-lg border border-gray-300 bg-gray-100 px-8 py-4 text-base font-bold text-gray-800  shadow-sm hover:bg-gray-300'
                            >
                                Share Listing
                            </a> */}
                            </div>
                            <div className="pt-6 text-center grid grid-cols-2 gap-2">
                                {property?.agents?.reverse()?.find(agent => agent.contactable && agent.phoneNumber)?.phoneNumber && <a href={`tel:${property?.agents?.reverse()?.find(agent => agent.contactable && agent.phoneNumber)?.phoneNumber?.replaceAll(' ', '')}`} className="text-lg font-semibold text-primary-600 underline hover:text-primary-800">{property?.agents?.reverse()?.find(agent => agent.contactable && agent.phoneNumber)?.phoneNumber}</a>}
                                {property?.agents?.reverse()?.find(agent => agent.contactable && agent.email)?.email && <a href={`mailto:${property?.agents?.reverse()?.find(agent => agent.contactable && agent.email)?.email?.replaceAll(' ', '')}`} className="text-lg font-semibold text-primary-600 underline hover:text-primary-800">{property?.agents?.reverse()?.find(agent => agent.contactable && agent.email)?.email}</a>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer propertyCategories={propertyCategories} />
        </div>
    );
};
export const revalidate = 300;
export default Page;

"use client";
import React, { Fragment, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { HiOutlineXMark } from "react-icons/hi2";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { PropertyType } from "src/app/(user)/(listings)/listing/[listingId]/page";
import { Property } from "types";

import ToolTip from "@/components/common/ToolTip";
import { ClientOnlyListingMap } from "@/components/inputs/listings/map/single-listing/ClientOnlyMap";
import urlFor from "@/lib/sanity.helpers";

type Props = {
  images: Pick<Property, "gallery">["gallery"];
  property: PropertyType;
};

const PhotoGallery = ({ images, property }: Props) => {
  const [activeModalImage, setActiveModalImage] = useState<number | undefined>(
    undefined
  );

  if (!images || images.length <= 0) return <></>;
  return (
    <div
      className="relative grid h-96 grid-rows-3 gap-3 sm:h-[30rem] sm:grid-cols-5 sm:grid-rows-1"
      suppressHydrationWarning
    >
      <div
        className="relative row-span-2 cursor-pointer overflow-hidden rounded-t-xl after:absolute after:top-0 after:block  after:h-full after:w-full after:bg-transparent after:transition-colors hover:after:bg-gray-800/30 sm:col-span-3 sm:row-span-1 sm:block sm:rounded-l-xl sm:rounded-tr-none"
        onClick={() => setActiveModalImage(0)}
      >
        <Image
          className="h-full w-full object-cover object-center "
          src={
            (images[0]?.asset &&
              urlFor(images[0]?.asset)
                ?.width(1000)
                .height(1000)
                .quality(100)
                .url()) ||
            ""
          }
          alt=""
          width={1000}
          height={600}
          priority
          quality={100}
        />
      </div>
      <div className="transparent-scrollbar row-span-1 grid h-36 w-full snap-x grid-cols-[repeat(_auto-fit,_minmax(100px_,_1fr_))]  grid-rows-[144px] gap-3 overflow-x-auto overflow-y-hidden  rounded-b-xl sm:col-span-2 sm:h-full sm:snap-y sm:grid-cols-1 sm:grid-rows-[repeat(_auto-fit,_minmax(250px_,_1fr_))]  sm:overflow-y-auto sm:overflow-x-hidden sm:rounded-b-none sm:rounded-r-xl md:grid-rows-[repeat(_auto-fit,_minmax(385px_,_1fr_))]">
        {images.slice(1).map((image, i, arr) => (
          <div
            className={clsx([
              "relative row-span-full h-36 w-full min-w-[100px] cursor-pointer snap-center snap-normal after:absolute after:top-0 after:block after:h-full after:w-full after:bg-transparent after:transition-colors hover:after:bg-gray-800/30 sm:row-span-1 sm:h-96",
              i === arr.length - 1 ? "sm:snap-bottom" : "sm:snap-start",
            ])}
            onClick={() => setActiveModalImage(i + 1)}
            key={image._key}
          >
            <Image
              fill
              src={
                (image?.asset &&
                  urlFor(image.asset)?.width(700).height(700).url()) ||
                ""
              }
              alt={""}
              className="h-full !w-24 object-cover object-center sm:!w-full"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute right-8 bottom-4 z-10 rounded-md border border-gray-300 bg-gray-100 py-2 px-4 text-base font-semibold text-gray-800  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-600"
        onClick={() => setActiveModalImage(0)}
      >
        See all Photos
      </button>
      <PhotosModal
        images={images}
        activeImageIndex={activeModalImage}
        setActiveImageIndex={(index) => setActiveModalImage(index)}
        property={property}
      />
    </div>
  );
};

type ModalProps = {
  images?: Pick<Property, "gallery">["gallery"];
  activeImageIndex?: number;
  setActiveImageIndex: (index?: number) => void;
  property: PropertyType;
};

const PhotosModal = ({
  images,
  activeImageIndex,
  setActiveImageIndex,
  property,
}: ModalProps) => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "map">(
    "photos"
  );

  if (!images || images.length <= 0 || activeImageIndex === undefined)
    return <></>;
  return (
    <Transition
      appear
      show={activeImageIndex !== undefined ? true : false}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={() => {
          setActiveImageIndex(undefined);
          setActiveTab("photos");
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block max-h-[600px] min-h-[50vh] w-screen max-w-[95vw] translate-y-1/4 transform divide-y-2 divide-gray-200 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all sm:h-[90vh] sm:max-h-[95vh] sm:w-[95vw] sm:translate-y-0 ">
              <nav className="flex flex-wrap-reverse items-center justify-between gap-3 py-2 px-6  ">
                <ul className="flex gap-2 text-base">
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("photos");
                      }}
                      className={clsx([
                        "cursor-pointer px-2 py-2 text-gray-500 decoration-2 underline-offset-[17px] transition-colors hover:text-primary-800",
                        activeTab === "photos" && "text-gray-900 underline",
                      ])}
                    >
                      Photos
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("map");
                      }}
                      className={clsx([
                        "cursor-pointer px-2 py-2 text-gray-500 decoration-2 underline-offset-[17px] transition-colors hover:text-primary-800",
                        activeTab === "map" && "text-gray-900 underline",
                      ])}
                    >
                      Map
                    </a>
                  </li>
                </ul>
                <ul className="flex items-center gap-3 text-base">
                  {/* <li>
                                        <button
                                            role="button"
                                            className="flex items-center gap-1 px-2 py-1 text-gray-800 transition-colors hover:text-primary-800"
                                        >
                                            <AiOutlineHeart className="text-2xl" />
                                            <span>Favorite</span>
                                        </button>
                                    </li> */}
                  <li>
                    <button
                      role="button"
                      className="flex items-center gap-1 px-2 py-1 text-gray-800 transition-colors hover:text-primary-800"
                      onClick={async () => {
                        try {
                          navigator.share({
                            title:
                              "Hey, check out this property listing from BA Real Estates:",
                            url: `${window.location.href}?utm_source=website-share`,
                          });
                        } catch (err) {
                          alert(JSON.stringify(err));
                          // Todo copy the link to clipboard
                        }
                      }}
                    >
                      <AiOutlineShareAlt className="text-2xl" />
                      <span>Share</span>
                    </button>
                  </li>
                  <li className="">
                    <ToolTip title="Close">
                      <button
                        type="button"
                        className="rounded-full bg-gray-100 p-1 text-2xl text-gray-600 hover:bg-slate-200"
                        onClick={() => setActiveImageIndex(undefined)}
                      >
                        <span className="sr-only">Close</span>
                        <HiOutlineXMark className="" aria-hidden="true" />
                      </button>
                    </ToolTip>
                  </li>
                </ul>
              </nav>
              <div className="h-auto sm:h-[96%]">
                {activeTab === "photos" && (
                  <div className="grid h-full grid-rows-[1fr_150px] gap-3 px-6 sm:grid-cols-3 sm:grid-rows-1 sm:gap-6 md:grid-cols-10  lg:grid-cols-12">
                    <div
                      className={clsx([
                        "order-2 flex gap-2 overflow-auto sm:order-first  sm:col-span-1 sm:mb-8 sm:mt-4 sm:!w-auto sm:flex-col sm:pr-4 md:col-span-3 lg:col-span-2",
                      ])}
                    >
                      {images.map((image, index) => (
                        <button
                          key={image._key}
                          type="button"
                          className={clsx([
                            index === activeImageIndex
                              ? "outline outline-4 -outline-offset-4 outline-gray-800"
                              : "",

                            "rounded-lg",
                          ])}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <Image
                            height={200}
                            width={200}
                            src={
                              (image?.asset &&
                                urlFor(image.asset)
                                  ?.width(400)
                                  .quality(70)
                                  .format("webp")
                                  // .height(800)
                                  .fit("max")
                                  .url()) ||
                              ""
                            }
                            alt=""
                            className={clsx([
                              "h-full min-w-[150px] overflow-hidden rounded-lg object-cover sm:h-auto sm:w-full sm:min-w-full sm:object-contain md:m-auto",
                            ])}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="relative flex h-full w-full items-center overflow-hidden py-4  sm:col-span-2 md:col-span-7 lg:col-span-10">
                      <div className="absolute left-0 top-1/2 flex w-full  -translate-y-1/2 justify-between">
                        {
                          <ToolTip title="Previous" className="self-start">
                            <button
                              disabled={activeImageIndex === 0}
                              type="button"
                              className={clsx([
                                "rounded-full border border-gray-300 bg-gray-50 p-3 text-3xl text-gray-600 transition-colors duration-200 hover:bg-slate-200 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400",
                              ])}
                              onClick={() =>
                                setActiveImageIndex(activeImageIndex - 1)
                              }
                            >
                              <span className="sr-only">Previous</span>
                              <AiOutlineArrowLeft
                                className=""
                                aria-hidden="true"
                              />
                            </button>
                          </ToolTip>
                        }
                        {
                          <ToolTip title="Next" className="self-end">
                            <button
                              disabled={activeImageIndex >= images.length - 1}
                              type="button"
                              className={clsx([
                                "rounded-full border border-gray-300 bg-gray-50 p-3 text-3xl text-gray-600 transition-colors duration-200 hover:bg-slate-200 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400",
                              ])}
                              onClick={() =>
                                setActiveImageIndex(activeImageIndex + 1)
                              }
                            >
                              <span className="sr-only">Next</span>
                              <AiOutlineArrowRight
                                className=""
                                aria-hidden="true"
                              />
                            </button>
                          </ToolTip>
                        }
                      </div>

                      <Image
                        height={1200}
                        width={1200}
                        src={
                          (images[activeImageIndex]?.asset &&
                            urlFor(images[activeImageIndex].asset)
                              ?.width(1000)
                              .quality(90)
                              .format("webp")
                              // .height(800)
                              .fit("max")
                              .url()) ||
                          ""
                        }
                        alt=""
                        className="pointer-events-none max-h-[50vh] w-full overflow-hidden rounded-lg object-contain sm:max-h-[100%] md:m-auto"
                      />
                      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-800/90 px-4 py-1 text-white backdrop-blur-md md:bottom-16">
                        {activeImageIndex + 1} of {images.length}
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "map" && (
                  <div className="col-span-full h-[95%] w-full px-6 py-4 sm:h-full">
                    <ClientOnlyListingMap
                      className="h-[95%] w-full"
                      containerClassName="h-full w-full flex"
                      center={property?.location?.location?.coordinates}
                      pins={
                        property?.location?.location?.coordinates
                          ? [property?.location?.location?.coordinates]
                          : undefined
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export { PhotosModal };

export default PhotoGallery;

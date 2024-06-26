"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Property } from "types";

import { useIsMobile } from "@/hooks/useIsMobile";
import urlFor from "@/lib/sanity.helpers";

import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";

type Props = {
  images: Property["gallery"];
  className?: string;
  featuredImage: Property["featuredImage"];
};

const PropertyCardImageSlider = ({
  images,
  className,
  featuredImage,
}: Props) => {
  // Create refs for prev and next buttons
  const [isHovering, setIsHovering] = useState(false);

  if (!images || images.length <= 0)
    return (
      <Image
        className={clsx([
          "property-card--image h-56 w-full bg-gray-200 object-cover",
          className,
        ])}
        id="property-card"
        src={
          (featuredImage?.asset &&
            urlFor(featuredImage.asset)?.width(600).height(600).url()) ||
          ""
        }
        alt=""
        width={300}
        height={300}
      />
    );

  return (
    <div
      className={clsx([
        "relative h-56 w-full bg-gray-200 object-cover md:h-56",
        className,
      ])}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        className="property-card--image h-full w-full cursor-grab object-cover focus:cursor-grabbing active:cursor-grabbing"
        id="property-card"
        pagination={{
          type: "progressbar",
        }}
        modules={[Pagination, Autoplay]}
        autoplay={false}
        loop={true}
        onDragEnd={(e) => e.stopPropagation()}
      >
        {images.map((image, i) => (
          <SwiperSlide key={image?._key || i}>
            <Image
              className="h-full w-full object-cover"
              src={
                (image?.asset &&
                  urlFor(image.asset)?.width(600).height(600).url()) ||
                ""
              }
              alt=""
              width={300}
              height={300}
            />
          </SwiperSlide>
        ))}
        <SliderNavigationButtons isHovering={isHovering} />
      </Swiper>
    </div>
  );
};

const SliderNavigationButtons = ({ isHovering }: { isHovering: boolean }) => {
  const swiper = useSwiper();
  const isMobile = useIsMobile();
  return (
    <>
      <button
        className={clsx([
          "absolute top-1/2 left-0 z-[1000] -translate-y-1/3 text-3xl text-white drop-shadow-2xl transition-opacity duration-300 hover:text-primary-600",
          isMobile || isHovering ? "opacity-100" : "opacity-0",
        ])}
        onClick={(e) => {
          swiper?.slidePrev();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <FaChevronLeft />
      </button>
      <button
        className={clsx([
          "absolute top-1/2 right-0 z-[1000] -translate-y-1/3 text-3xl text-white drop-shadow-2xl transition-opacity duration-300 hover:text-primary-600",
          isMobile || isHovering ? "opacity-100" : "opacity-0 ",
        ])}
        onClick={(e) => {
          swiper?.slideNext();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <FaChevronRight />
      </button>
    </>
  );
};

export default PropertyCardImageSlider;

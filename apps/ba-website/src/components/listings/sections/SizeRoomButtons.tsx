import React from "react";
import { MdOutlineBathroom, MdOutlineBedroomChild } from "react-icons/md";
import { RiRulerLine } from "react-icons/ri";
import clsx from "clsx";

type Props = {
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  shortNames?: boolean;
  className?: string;
  showIicons?: boolean;
};

const SizeRoomButtons = ({
  size,
  bedrooms,
  bathrooms,
  shortNames,
  className,
  showIicons = true,
}: Props) => {
  return (
    <div
      className={`flex flex-wrap  gap-4 divide-x divide-gray-300 self-start justify-self-start rounded-lg py-2  text-slate-500  ${className}`}
    >
      {bedrooms && bedrooms > 0 ? (
        <button
          role="listitem"
          className="flex cursor-auto items-center gap-2 "
        >
          <p className="sr-only">Number of bedrooms</p>
          {showIicons && <MdOutlineBedroomChild className="h-7 w-7" />}
          <span>
            {bedrooms} {shortNames ? "bd" : "bedrooms"}
          </span>
        </button>
      ) : (
        <></>
      )}
      {bathrooms && bathrooms > 0 ? (
        <button
          role="listitem"
          className="flex cursor-auto items-center gap-2 pl-4"
        >
          <p className="sr-only">Number of bathrooms</p>
          {showIicons && <MdOutlineBathroom className="h-7 w-7" />}
          <span>
            {bathrooms} {shortNames ? "bth" : "bathrooms"}
          </span>
        </button>
      ) : (
        <></>
      )}
      {size && size > 0 ? (
        <button
          role="listitem"
          className={clsx(
            "flex cursor-auto items-center gap-2",
            ((bathrooms && bathrooms > 0) || (bedrooms && bedrooms > 0)) &&
              "pl-4"
          )}
        >
          <p className="sr-only">Property size</p>
          {showIicons && <RiRulerLine className="h-7 w-7" />}
          <span>{size}m²</span>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SizeRoomButtons;

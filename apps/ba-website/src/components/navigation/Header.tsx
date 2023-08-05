"use client";
import React, { Fragment } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropertyCategory } from "types";

const Header = ({
  propertyCategories,
  className,
}: {
  propertyCategories: PropertyCategory[];
  className?: string;
}) => {
  const pathname = usePathname();

  const links = [
    {
      slug: "Listings",
      link: "/listings",
    },
    {
      slug: "Team",
      link: "/team",
    },
  ];
  links.splice(
    1,
    0,
    ...propertyCategories?.map((cat, i) => ({
      slug: cat?.name ?? "",
      link: `/listings/${i}?category=${cat?.slug?.current}` || "",
    }))
  );

  return (
    <>
      <nav className={clsx("mb-4 mt-2", className)}>
        <div className="flex h-14 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <Image
                className="block  h-8 w-auto md:h-10"
                src="/images/logos/ba-icon.svg"
                alt=""
                height={50}
                width={57}
              />
              <h1 className="text-xl font-extrabold tracking-tighter text-primary-800">
                BA Real Estates
              </h1>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              {links.map((link) => (
                <Link
                  href={link.link}
                  key={link.slug}
                  className={clsx([
                    "inline-flex items-center self-center rounded-lg border-primary-700 bg-transparent px-2 py-3 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-accent-200",
                    pathname == link.link && "bg-accent-300",
                  ])}
                >
                  {link.slug}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden flex-shrink-0 sm:block">
              <Link
                href="/contact"
                className="inline-flex  rounded-lg border  border-transparent bg-accent-200  px-4 py-2  text-base font-medium text-primary-700 shadow-sm hover:bg-accent-300"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="z-30 w-full text-end sm:hidden">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button
                    className={
                      "pt-1 text-[2.8rem] text-gray-800 transition-all hover:translate-y-[2px] hover:text-primary-800"
                    }
                  >
                    {!open ? <HiBars3 /> : <HiXMark />}
                  </Menu.Button>
                  <Menu.Items
                    className={
                      "flex flex-col gap-1 rounded-lg border border-gray-300 bg-white px-2 py-3  shadow-lg"
                    }
                  >
                    {links.map((link) => (
                      <Menu.Item
                        as="a"
                        key={link.link}
                        href={link.link}
                        className="rounded-lg px-2 py-3 transition-all ui-active:bg-primary-800 ui-active:text-white ui-not-active:bg-gray-100/20 ui-not-active:text-black"
                      >
                        {link.slug}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </>
              )}
            </Menu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

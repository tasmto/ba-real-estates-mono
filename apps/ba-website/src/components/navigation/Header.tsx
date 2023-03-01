"use client"
import React, { Fragment } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropertyCategory } from 'types';


const Header = ({ propertyCategories, className }: { propertyCategories: PropertyCategory[], className?: string }) => {
  const pathname = usePathname()



  const links = [
    {
      slug: 'Listings',
      link: '/listings',
    },
    {
      slug: 'Team',
      link: '/team',
    },
  ]
  links.splice(1, 0, ...(propertyCategories?.map(cat => ({ slug: cat?.name ?? "", link: cat?.slug?.current || "" }))));

  return (


    <>
      <div className={clsx("mt-2 mb-4", className)}>
        <div className='flex justify-between h-14'>
          <div className='flex'>

            <Link href="/" className='flex-shrink-0 flex items-center gap-2'>
              <Image
                className='block  h-8 w-auto md:h-10'
                src='/images/logos/ba-icon.svg'
                alt=''
                height={50}
                width={57}
              />
              <h1 className='font-extrabold tracking-tighter text-xl text-primary-800'>
                BA Real Estates
              </h1>
            </Link>
            <div className='hidden md:ml-10 md:flex md:space-x-4'>
              {links.map((link) => (
                <Link
                  href={link.link}
                  key={link.slug}
                  className={clsx([
                    'border-primary-700 self-center text-slate-600 inline-flex items-center px-2 text-sm font-medium bg-transparent rounded-lg transition-colors duration-200 hover:bg-accent-200 py-3',
                    pathname == link.link && 'bg-accent-300',
                  ])}
                >
                  {link.slug}
                </Link>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex-shrink-0 hidden sm:block'>
              <Link
                href='/contact'
                className='inline-flex  rounded-lg border  border-transparent bg-accent-200 px-6 py-4 text-base font-medium text-primary-700 shadow-sm hover:bg-accent-300'
              >
                Contact us
              </Link>
            </div>

          </div>
        </div>
      </div>


    </>

  );
};

export default Header;

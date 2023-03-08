'use client';
import React, { Fragment } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropertyCategory } from 'types';

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
      slug: 'Listings',
      link: '/listings',
    },
    {
      slug: 'Team',
      link: '/team',
    },
  ]
  links.splice(1, 0, ...(propertyCategories?.map(cat => ({ slug: cat?.name ?? "", link: `/listings?category=${cat?.slug?.current}` || "" }))));

  return (
    <>
      <div className={clsx('mt-2 mb-4', className)}>
        <div className='flex h-14 justify-between'>
          <div className='flex'>
            <Link href='/' className='flex flex-shrink-0 items-center gap-2'>
              <Image
                className='block  h-8 w-auto md:h-10'
                src='/images/logos/ba-icon.svg'
                alt=''
                height={50}
                width={57}
              />
              <h1 className='text-xl font-extrabold tracking-tighter text-primary-800'>
                BA Real Estates
              </h1>
            </Link>
            <div className='hidden md:ml-10 md:flex md:space-x-4'>
              {links.map((link) => (
                <Link
                  href={link.link}
                  key={link.slug}
                  className={clsx([
                    'inline-flex items-center self-center rounded-lg border-primary-700 bg-transparent px-2 py-3 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-accent-200',
                    pathname == link.link && 'bg-accent-300',
                  ])}
                >
                  {link.slug}
                </Link>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='hidden flex-shrink-0 sm:block'>
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

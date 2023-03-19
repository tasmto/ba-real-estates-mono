import { ReactNode } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FaTiktok, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill, RiTwitterFill } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { PropertyCategory } from 'types';

import NewsletterForm from '@/components/navigation/footer/NewsletterForm';

/* This example requires Tailwind CSS v2.0+ */
const navigation = {
    company: [
        { name: 'Contact', href: '/contact' },
        { name: 'Marketing', href: '#' },
        { name: 'Commerce', href: '/contact' },
        { name: 'Insights', href: '#' },
    ],
    pages: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '/' },
        { name: 'Jobs', href: 'https://www.facebook.com/BA-REAL-ESTATES-111440894677469/' },
        { name: 'Partners', href: '/' },
    ],
    legal: [
        { name: 'Claim', href: '/contact' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
    social: [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/BA-REAL-ESTATES-111440894677469/',
            icon: (props: any) => <BsFacebook {...props} />,
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/ba_realestates/',
            icon: (props: any) => <RiInstagramFill {...props} />,
        },
        {
            name: 'Twitter',
            href: 'http://twitter.com/barealestates',
            icon: (props: any) => <RiTwitterFill {...props} />,
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@barealestates',
            icon: (props: any) => <FaYoutube {...props} />,
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/@barealestates1?lang=en',
            icon: (props: any) => <FaTiktok {...props} />,
        },
    ],
};

const FooterLink = ({

    href,
    children,
}: {

    href: string;
    children: ReactNode;
}) => (
    <li>
        <Link
            href={`${href}`}
            className='text-base text-gray-400 hover:text-primary-400'
        >
            {children}
        </Link>
    </li>
);

interface Props {
    propertyCategories: PropertyCategory[];
}

const Footer = ({ propertyCategories }: Props) => {
    return (
        <footer className='bg-[#021d2b]' aria-labelledby='footer-heading'>
            <h2 id='footer-heading' className='sr-only'>
                Footer
            </h2>
            <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
                <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
                    <div className='space-y-8 xl:col-span-1'>
                        <div className='flex gap-1 items-center'>
                            <Image
                                className='block h-10 w-auto'
                                src='/images/logos/ba-icon-white.svg'
                                alt=''
                                height={50}
                                width={57}
                            />
                            <h1 className='font-semibold tracking-tighter text-xl text-gray-100'>
                                BA Real Estates
                            </h1>
                        </div>
                        <p className='text-base text-gray-500'>
                            For all your property needs, whether you're looking to sell or buy
                            or rent your property we have a variety of available properties
                            for your needs.
                        </p>
                        <div className='flex space-x-6'>
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className='text-gray-400 hover:text-primary-500'
                                >
                                    <span className='sr-only'>{item.name}</span>
                                    <item.icon className='h-6 w-6' aria-hidden='true' />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className='mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
                        <div className='md:grid md:grid-cols-2 md:gap-8'>
                            <div>
                                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-200'>
                                    Listings
                                </h3>
                                <ul role='list' className='mt-4 space-y-4'>
                                    {propertyCategories?.map((cat, i) => (
                                        <FooterLink
                                            key={cat?.name ?? i}

                                            href={`/listings?category=${cat.slug?.current}`}
                                        >
                                            {cat.name}
                                        </FooterLink>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-200'>
                                    Pages
                                </h3>
                                <ul role='list' className='mt-4 space-y-4'>
                                    {navigation.pages.map((item) => (
                                        <FooterLink href={item.href} key={item.name}>
                                            {item.name}
                                        </FooterLink>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='md:grid md:grid-cols-2 md:gap-8'>
                            <div>
                                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-200'>
                                    Company
                                </h3>
                                <ul role='list' className='mt-4 space-y-4'>
                                    {navigation.company.map((item) => (
                                        <FooterLink key={item.name} href={item.href}>
                                            {item.name}
                                        </FooterLink>
                                    ))}
                                </ul>
                            </div>
                            <div className='mt-12 md:mt-0'>
                                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-200'>
                                    Legal
                                </h3>
                                <ul role='list' className='mt-4 space-y-4'>
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className='text-base text-gray-400 hover:text-primary-400'
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 lg:flex lg:items-center lg:justify-between xl:mt-0 col-span-full mt-12">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                                Subscribe to our newsletter
                            </h3>
                            <p className="mt-2 text-base text-gray-500">
                                Sign up to get news and updates from us as well as the latest trends and hot tips in Real Estate.
                            </p>
                        </div>
                        <NewsletterForm className="mt-4 sm:flex sm:max-w-md lg:mt-0" />
                    </div>
                    <div className='mt-4 col-span-full border-t border-gray-700 pt-8'>
                        <p className='text-base text-gray-400 xl:text-center'>
                            &copy; {new Date().getFullYear()} BA Real Estates. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;

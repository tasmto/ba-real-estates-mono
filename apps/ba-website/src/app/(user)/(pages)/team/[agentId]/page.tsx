/* This example requires Tailwind CSS v2.0+ */
import { HiHome, HiOutlineShieldCheck } from 'react-icons/hi2';
import { IoMdCall } from 'react-icons/io';
import { MdOutlineHelp } from 'react-icons/md';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { groq } from 'next-sanity';
import { PropertyCategory, TeamMember } from 'types';
import { PropertyWithLocation } from 'typings';

import ToolTip from '@/components/common/ToolTip';
import PropertyCategoryTabs from '@/components/inputs/tabs/PropertyCategoryTabs';
import Breadcrumbs from '@/components/navigation/breadcrumbs/Breadcrumbs';
import { BA_CERTIFIED_AGENT, BRAND_SHORT_NAME } from '@/constants/site';
import { client } from '@/lib/sanity.client';
import urlFor from '@/lib/sanity.helpers';



type AgentPageTypes = {
    params: { agentId: string };
};

const AgentPage = async ({ params }: AgentPageTypes) => {
    const AgentQuery = groq`*[_type=='teamMember'  && slug.current == '${params.agentId}'][0]`;
    const agent: TeamMember = await client.fetch(AgentQuery);
    if (!agent) return notFound();
    const agentProperties = groq`*[_type=='property' && '${agent._id}' in agents[]._ref]{..., 'agents': Agents[]-> {name, surname, slug}}`
    const properties: PropertyWithLocation[] = await client.fetch(agentProperties);

    const allPropertyCategoriesQuery = groq`*[_type =="propertyCategory"]`;
    const allPropertyCategories: PropertyCategory[] = await client.fetch(
        allPropertyCategoriesQuery
    );



    const pages = [
        { name: "Home", href: '/', current: false, icon: HiHome },
        { name: 'Team Members', href: '/team', current: false },
        { name: agent.name, href: '#', current: true },
    ];
    return (
        <div className=''>
            <Breadcrumbs
                pages={pages}
                className='container pt-10 pb-5 sm:relative sm:z-10 sm:translate-y-[240%] sm:pt-0 sm:pb-0'
            />

            <div className='relative bg-white pb-16 sm:pb-24'>
                <div className='md:mx-auto md:grid md:max-w-7xl md:grid-cols-2 md:items-start md:gap-24 md:px-8'>
                    <div className='relative sm:py-16 md:col-span-1 md:py-0'>
                        <div
                            aria-hidden='true'
                            className='hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen'
                        >
                            <div className='absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72' />
                            <svg
                                className='absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12'
                                width={404}
                                height={392}
                                fill='none'
                                viewBox='0 0 404 392'
                            >
                                <defs>
                                    <pattern
                                        id='02f20b47-fd69-4224-a62a-4c9de5c763f7'
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits='userSpaceOnUse'
                                    >
                                        <rect
                                            x={0}
                                            y={0}
                                            width={4}
                                            height={4}
                                            className='text-gray-200'
                                            fill='currentColor'
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={404}
                                    height={392}
                                    fill='url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)'
                                />
                            </svg>
                        </div>
                        <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 md:max-w-none md:px-0 md:py-20'>

                            <Image
                                className=' inset-0 h-full w-full object-cover'
                                src={agent.image?.asset && urlFor(agent.image.asset)?.width(700).height(700).url() || ""}
                                alt=''
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>

                    <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 md:px-0'>
                        {/* Content area */}
                        <div className='pt-12 sm:pt-16 lg:pt-20'>
                            <p className='flex items-center gap-2 text-base uppercase text-gray-500 '>
                                <ToolTip
                                    title={BA_CERTIFIED_AGENT}
                                    placement='top'
                                    className='group'
                                >
                                    <HiOutlineShieldCheck className='cursor-pointer text-sky-600 group-hover:text-yellow-500' />
                                </ToolTip>
                                <span>
                                    {BRAND_SHORT_NAME} {agent.role}
                                </span>
                            </p>
                            <h1 className='font-display text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl'>
                                {agent.name}
                            </h1>
                            <div className='mt-6 space-y-6 text-gray-500'>
                                <p className='text-lg text-gray-500'>{agent.bio}</p>
                                <div className='overflow-hidden bg-white '>
                                    <div className=' '>
                                        <dl className='divide-y'>
                                            <div className=' px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6'>
                                                {agent.email && (
                                                    <ToolTip title='Send me an email' placement='top'>
                                                        <a
                                                            href={`mailto:${agent.email}`}
                                                            className='flex items-center gap-2 font-display  text-base font-bold text-primary-600 hover:text-primary-700 sm:text-lg md:text-xl'
                                                        >
                                                            <MdOutlineHelp className='text-lg sm:text-xl  md:text-2xl' />
                                                            <span>Send me an email</span>
                                                        </a>
                                                    </ToolTip>
                                                )}
                                                {agent.phoneNumber && (
                                                    <ToolTip title='Give me a call' placement='top'>
                                                        <a
                                                            href={`tel:${agent.phoneNumber}`}
                                                            className='mt-1 flex items-center gap-2 font-display text-base  font-bold text-primary-600 hover:text-primary-700 sm:mt-0 sm:text-lg  md:text-xl'
                                                        >
                                                            <IoMdCall className='text-lg sm:text-xl md:text-2xl' />
                                                            <span>{agent.phoneNumber}</span>
                                                        </a>
                                                    </ToolTip>
                                                )}
                                            </div>
                                            <div className=' px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                                <dt className='text-sm font-medium text-gray-500'>
                                                    Role
                                                </dt>
                                                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                                                    {agent.role}
                                                </dd>
                                            </div>
                                            <div className=' px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                                <dt className='text-sm font-medium text-gray-500'>
                                                    Email address
                                                </dt>
                                                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2  hover:text-primary-600 underline sm:mt-0 '>
                                                    <a href={`mailto:${agent.email}`}>{agent.email}</a>
                                                </dd>
                                            </div>
                                            <div className=' px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                                <dt className='text-sm font-medium text-gray-500'>
                                                    Social Media
                                                </dt>
                                                <dd className='mt-1 flex flex-wrap gap-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                                                    {[
                                                        agent.whatsapp,
                                                        agent.linkedin,
                                                        agent.instagram,
                                                        agent.facebook,
                                                    ].map((sm, i) => {
                                                        if (!sm) return <></>;
                                                        return (
                                                            <a
                                                                key={sm}
                                                                href={"#"}
                                                                className='underline hover:text-primary-600'
                                                            >
                                                                {`${[
                                                                    'WhatsApp',
                                                                    'Linkedin',
                                                                    'Instagram',
                                                                    'Facebook',
                                                                ].at(i)};` || ''}
                                                            </a>
                                                        );
                                                    })}
                                                </dd>
                                            </div>
                                            <div className=' px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                                <dt className='text-sm font-medium text-gray-500'>
                                                    Neighborhoods:
                                                </dt>
                                                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex flex-wrap gap-2'>
                                                    {agent.areas?.map((area, i) => (
                                                        <ToolTip
                                                            title={
                                                                area?.location?.formatted_address || area?.name || ""
                                                            }
                                                            key={i}
                                                        >
                                                            <>{area?.name || ''};</>
                                                        </ToolTip>
                                                    ))}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container grid gap-10  mb-10  bg-gradient-to-b from-white to-gray-50'>
                <div className='relative text-center'>
                    <h2 className='mb-5 font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
                        {agent.name}'s Listings & Sales
                    </h2>


                    {allPropertyCategories && allPropertyCategories.length > 0 && (
                        <PropertyCategoryTabs
                            listings={properties}
                            categories={allPropertyCategories}
                            limit={6}
                            defaultTab={1}
                        />
                    )}

                </div>
            </div>

            {/* <div className='overflow-hidden bg-gray-50 py-16 lg:py-24'>
                <div className='relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                    <svg
                        className='absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block'
                        width={404}
                        height={784}
                        fill='none'
                        viewBox='0 0 404 784'
                        aria-hidden='true'
                    >
                        <defs>
                            <pattern
                                id='b1e6e422-73f8-40a6-b5d9-c8586e37e0e7'
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits='userSpaceOnUse'
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    width={4}
                                    height={4}
                                    className='text-gray-200'
                                    fill='currentColor'
                                />
                            </pattern>
                        </defs>
                        <rect
                            width={404}
                            height={784}
                            fill='url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)'
                        />
                    </svg>

                    <div className='relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8'>
                        <div className='relative'>
                            <h3 className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                                I am dedicated to helping you one on one
                            </h3>
                            <p className='mt-3 text-lg text-gray-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Pariatur minima sequi recusandae, porro maiores officia
                                assumenda aliquam laborum ab aliquid veritatis impedit odit
                                adipisci optio iste blanditiis facere. Totam, velit.
                            </p>

                            <dl className='mt-10 space-y-10'>
                                {transferFeatures.map((item) => (
                                    <div key={item.id} className='relative'>
                                        <dt>
                                            <div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-700 text-white'>
                                                <item.icon className='h-6 w-6' aria-hidden='true' />
                                            </div>
                                            <p className='ml-16 text-lg font-medium leading-6 text-gray-900'>
                                                {item.name}
                                            </p>
                                        </dt>
                                        <dd className='mt-2 ml-16 text-base text-gray-500'>
                                            {item.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className='relative -mx-4 mt-10 lg:mt-0' aria-hidden='true'>
                            <svg
                                className='absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden'
                                width={784}
                                height={404}
                                fill='none'
                                viewBox='0 0 784 404'
                            >
                                <defs>
                                    <pattern
                                        id='ca9667ae-9f92-4be7-abcb-9e3d727f2941'
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits='userSpaceOnUse'
                                    >
                                        <rect
                                            x={0}
                                            y={0}
                                            width={4}
                                            height={4}
                                            className='text-gray-200'
                                            fill='currentColor'
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={784}
                                    height={404}
                                    fill='url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)'
                                />
                            </svg>
                            <img
                                className='relative mx-auto'
                                width={490}
                                src='https://tailwindui.com/img/features/feature-example-1.png'
                                alt=''
                            />
                        </div>
                    </div>

                    <svg
                        className='absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block'
                        width={404}
                        height={784}
                        fill='none'
                        viewBox='0 0 404 784'
                        aria-hidden='true'
                    >
                        <defs>
                            <pattern
                                id='64e643ad-2176-4f86-b3d7-f2c5da3b6a6d'
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits='userSpaceOnUse'
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    width={4}
                                    height={4}
                                    className='text-gray-200'
                                    fill='currentColor'
                                />
                            </pattern>
                        </defs>
                        <rect
                            width={404}
                            height={784}
                            fill='url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)'
                        />
                    </svg>

                    <div className='relative mt-12 sm:mt-16 lg:mt-24'>
                        <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8'>
                            <div className='lg:col-start-2'>
                                <h3 className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                                    Selling one yard at a time
                                </h3>
                                <p className='mt-3 text-lg text-gray-500'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Impedit ex obcaecati natus eligendi delectus, cum deleniti
                                    sunt in labore nihil quod quibusdam expedita nemo.
                                </p>

                                <dl className='mt-10 space-y-10'>
                                    {communicationFeatures.map((item) => (
                                        <div key={item.id} className='relative'>
                                            <dt>
                                                <div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-700 text-white'>
                                                    <item.icon className='h-6 w-6' aria-hidden='true' />
                                                </div>
                                                <p className='ml-16 text-lg font-medium leading-6 text-gray-900'>
                                                    {item.name}
                                                </p>
                                            </dt>
                                            <dd className='mt-2 ml-16 text-base text-gray-500'>
                                                {item.description}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className='relative -mx-4 mt-10 lg:col-start-1 lg:mt-0'>
                                <svg
                                    className='absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden'
                                    width={784}
                                    height={404}
                                    fill='none'
                                    viewBox='0 0 784 404'
                                    aria-hidden='true'
                                >
                                    <defs>
                                        <pattern
                                            id='e80155a9-dfde-425a-b5ea-1f6fadd20131'
                                            x={0}
                                            y={0}
                                            width={20}
                                            height={20}
                                            patternUnits='userSpaceOnUse'
                                        >
                                            <rect
                                                x={0}
                                                y={0}
                                                width={4}
                                                height={4}
                                                className='text-gray-200'
                                                fill='currentColor'
                                            />
                                        </pattern>
                                    </defs>
                                    <rect
                                        width={784}
                                        height={404}
                                        fill='url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)'
                                    />
                                </svg>
                                <img
                                    className='relative mx-auto'
                                    width={490}
                                    src='https://tailwindui.com/img/features/feature-example-2.png'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div >
    );
};
export default AgentPage;

import React from 'react'
import { groq } from 'next-sanity';
import { PropertyWithLocation } from 'typings';

import PropertyCard from '@/components/cards/property/PropertyCard';
import { client } from '@/lib/sanity.client';

type Props = {}

const Page = async (props: Props) => {
  const propertiesQuery = groq`*[_type=='property' && category-> slug.current == "houses" ]{..., "location": location -> {location, name}}`;
  const properties: PropertyWithLocation[] = await client.fetch(propertiesQuery);

  return (
    <div className='grid gap-16  bg-slate-50 py-24 '>
      {/* <ListingsFilters /> */}
      <div className=' grid sm:grid-cols-2 md:grid-cols-3 container gap-6'>
        {properties.map((item, index) => (
          <PropertyCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
export const revalidate = 300;
export default Page
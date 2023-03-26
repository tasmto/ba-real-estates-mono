import { groq } from 'next-sanity';
import { PropertyCategory } from 'types';

import Header from '@/components/navigation/Header';
import { client } from '@/lib/sanity.client';

import '@/css/globals.css';
import '@/css/listings.css';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const allPropertyCategoriesQuery = groq`*[_type =="propertyCategory"]`;
  const allPropertyCategories: PropertyCategory[] = await client.fetch(
    allPropertyCategoriesQuery
  );
  return (
    <div className='h-screen grid' style={{ gridTemplateRows: "auto 1fr" }}>
      <Header propertyCategories={allPropertyCategories} className="container" />
      <div className='h-full bg-slate-50 overflow-y-auto'>
        {children}
      </div>
    </div>
  );
};
export default RootLayout;

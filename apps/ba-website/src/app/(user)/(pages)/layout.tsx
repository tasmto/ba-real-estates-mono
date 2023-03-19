import { groq } from 'next-sanity';
import { PropertyCategory } from 'types';

import Footer from '@/components/navigation/footer/Footer';
import Header from '@/components/navigation/Header';
import { client } from '@/lib/sanity.client';

import '@/css/globals.css';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const allPropertyCategoriesQuery = groq`*[_type =="propertyCategory"]`;
  const allPropertyCategories: PropertyCategory[] = await client.fetch(
    allPropertyCategoriesQuery
  );
  return (
    <div className='overflow-auto h-full'>
      <Header propertyCategories={allPropertyCategories} className="container" />
      <main >{children}</main>
      <Footer propertyCategories={allPropertyCategories} />
    </div>
  );
};
export default RootLayout;

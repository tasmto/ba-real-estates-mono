import { groq } from "next-sanity";
import { PropertyCategory } from "types";

import Header from "@/components/navigation/Header";
import { client } from "@/lib/sanity.client";

import "@/css/globals.css";
import "@/css/listings.css";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const allPropertyCategoriesQuery = groq`*[_type =="propertyCategory"]`;
  const allPropertyCategories: PropertyCategory[] = await client.fetch(
    allPropertyCategoriesQuery
  );
  return (
    <div className="grid h-screen" style={{ gridTemplateRows: "auto 1fr" }}>
      <Header
        propertyCategories={allPropertyCategories}
        className="container"
      />
      <div className="h-[90vh] bg-slate-50">{children}</div>
    </div>
  );
};
export default RootLayout;

// core
import React from "react";
// card component
import Card from "@/lib/ui/useable-components/card";
// hooks
import { useSearchUI } from "@/lib/context/search/search.context";
// useParams
import { useParams } from "next/navigation";
// heading component
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";


function SearchSeeAllSection() {
  // Get slug from URL params
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // Generate a formatted title from the slug
  let title = slug
    .replaceAll("-", " ")
    .replace(/^./, (str) => str.toUpperCase());

  // Get data form context
  const { searchedData:data } = useSearchUI();

  // If no data returned, show empty state
  if (!data?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={'Restaurant and stores: ' + title} showFilter={false} />
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {data.map((item) => (
              <Card key={item._id} item={item} />
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchSeeAllSection;

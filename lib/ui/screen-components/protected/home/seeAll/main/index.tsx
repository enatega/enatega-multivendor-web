// core
import React from "react";
// card component
import Card from "@/lib/ui/useable-components/card";
// hooks
import useQueryBySlug from "@/lib/hooks/useQueryBySlug";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
// useParams
import { useParams } from "next/navigation";
// heading component
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";
// square card
import SquareCard from "@/lib/ui/useable-components/square-card";
// interface
import { IRestaurant } from "@/lib/utils/interfaces/restaurants.interface";
import { ICuisineData } from "@/lib/utils/interfaces";

// cuisines slug for rendering cuisines card conditionally
const CUISINE_SLUGS = new Set(["restaurant-cuisines", "grocery-cuisines"]);
// slug for rendering logo and image in cuisines card conditionally
const RESTAURANT_SLUGS = new Set(["popular-restaurants", "popular-stores"]);

function SeeAllSection() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  let title = slug
    .replaceAll("-", " ")
    .replace(/^./, (str) => str.toUpperCase());

  const { data, loading, error } = useQueryBySlug(slug);

  if (loading) {
    return <SliderSkeleton />;
  }
  if (error) {
    return;
  }

  if (!data?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={title} />
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {Array.isArray(data) &&
            CUISINE_SLUGS.has(slug) &&
            (data as ICuisineData[]).map((item) => (
              <SquareCard
                key={item._id}
                item={item}
                cuisines={true}
                showLogo={false}
              />
            ))}

          {Array.isArray(data) &&
            RESTAURANT_SLUGS.has(slug) &&
            (data as IRestaurant[]).map((item) => (
              <SquareCard key={item._id} item={item} showLogo={true} />
            ))}

          {Array.isArray(data) &&
            !CUISINE_SLUGS.has(slug) &&
            !RESTAURANT_SLUGS.has(slug) &&
            (data as IRestaurant[]).map((item) => (
              <Card key={item._id} item={item} />
            ))}
        </div>
      </div>
    </>
  );
}

export default SeeAllSection;

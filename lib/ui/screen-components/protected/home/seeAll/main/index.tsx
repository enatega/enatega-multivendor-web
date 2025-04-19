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
// import { ICuisinesData } from "@/lib/utils/interfaces";

// Slugs for rendering cuisines-specific cards
// const CUISINE_SLUGS = new Set(["restaurant-cuisines", "grocery-cuisines"]);

// Slugs for rendering cards with logo/images for restaurants/stores
const RESTAURANT_SLUGS = new Set(["popular-restaurants", "popular-stores"]);

function SeeAllSection() {
  // Get slug from URL params
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // Generate a formatted title from the slug
  let title = slug
    .replaceAll("-", " ")
    .replace(/^./, (str) => str.toUpperCase());

  // Fetch data using slug
  const { data, loading, error } = useQueryBySlug(slug);

  // Show skeleton loader while fetching
  if (loading) {
    return <SliderSkeleton />;
  }

  // Handle query error silently (can be extended with an error UI)
  if (error) {
    return;
  }

  // If no data returned, show empty state
  if (!data?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={title} showFilter={false} />
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          
          {/* Render SquareCard for cuisine-related slugs */}
          {/* {Array.isArray(data) &&
            CUISINE_SLUGS.has(slug) &&
            (data as ICuisinesData[]).map((item) => (
              <SquareCard
                key={item._id}
                item={item}
                cuisines={true}
                showLogo={false} // No logo so it will show image for cuisines
              />
            ))} */}

          {/* Render SquareCard with logo for popular restaurants/stores */}
          {Array.isArray(data) &&
            RESTAURANT_SLUGS.has(slug) &&
            (data as IRestaurant[]).map((item) => (
              <SquareCard
                key={item._id}
                item={item}
                showLogo={true} // Show logo/image
              />
            ))}

          {/* Render default Card for any other slug types */}
          {Array.isArray(data) &&
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

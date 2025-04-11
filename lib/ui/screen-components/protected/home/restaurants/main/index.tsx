// core
import React from "react";
// hooks
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";
// card component
import Card from "@/lib/ui/useable-components/card";
// interface
import { IRestaurant } from "@/lib/utils/interfaces";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";

function RestaurantsMainSection() {
  const { data, error, loading } = useNearByRestaurantsPreview();
  if (error) {
    return;
  }
  if (loading) {
    return <SliderSkeleton isDiscovery={false} />;
  }

  let restaurantsData: IRestaurant[] =
    data?.nearByRestaurantsPreview.restaurants.filter(
      (item) => item.shopType.toLowerCase() === "restaurant"
    ) || [];

  return (
    <>
      <div className="ml-8 mr-10 md:ml-12 md:mr-14 mb-20">
        <span className="font-inter font-bold text-2xl leading-8 tracking-normal text-gray-900">
          All Restaurants
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-items-center items-center">
          {restaurantsData?.map((item) => {
            return (
              <>
                <Card key={item._id} item={item} isDiscovery={false} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RestaurantsMainSection;

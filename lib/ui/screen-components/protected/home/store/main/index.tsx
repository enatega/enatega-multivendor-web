// core
import React from "react";
// hooks
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";
// card component
import Card from "@/lib/ui/useable-components/card";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";

function StoreMainSection() {
  const { error, loading, groceriesData } = useNearByRestaurantsPreview();
  if (error) {
    return;
  }
  if (loading) {
    return <SliderSkeleton />;
  }

  return (
    <div className="mb-20">
      <div className="mx-[6px]">
        <span className="font-inter font-bold text-xl sm:text-2xl leading-8 tracking-normal text-gray-900">
          All stores and groceries
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
        {groceriesData?.map((item) => {
          return (
              <Card key={item._id} item={item} />
          );
        })}
      </div>
    </div>
  );
}

export default StoreMainSection;

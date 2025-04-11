// cuisines slider card
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useGetCuisines from "@/lib/hooks/useGetCuisines";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
// interface
import { ICuisinesData } from "@/lib/utils/interfaces";

function RestaurantCuisines({ title="Restaurant cuisines" } : {title?:string}) {
  const { data, loading, error } = useGetCuisines();

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error) {
    return;
  }

  let restaurantCuisinesData: ICuisinesData[] = Array.isArray(data?.cuisines)
    ? data.cuisines.filter(item => item.shopType.toLowerCase() === 'restaurant')
    : [];

  return (
    <CuisinesSliderCard
      title={title}
      data={restaurantCuisinesData || []}
      cuisines={true}
    />
  );
}

export default RestaurantCuisines;

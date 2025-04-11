import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useMostOrderedRestaurants from "@/lib/hooks/useMostOrderedRestaurants";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
// interfaces
import { IRestaurant } from "@/lib/utils/interfaces";

function PopularRestaurants() {
  const { data, error, loading } = useMostOrderedRestaurants();

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error) {
    return;
  }
  
  let popularRestaurants: IRestaurant[] =
    data?.mostOrderedRestaurantsPreview?.filter(
      (item) => item?.shopType.toLowerCase() === "restaurant"
    ) || [];

  return (
    <CuisinesSliderCard
      title="Popular restaurants"
      data={popularRestaurants || []}
      showLogo={true}
    />
  );
}

export default PopularRestaurants;

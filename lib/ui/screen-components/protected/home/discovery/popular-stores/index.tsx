import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useMostOrderedRestaurants from "@/lib/hooks/useMostOrderedRestaurants";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/cuisines-slider-loading-skeleton";
// interfaces
import { IRestaurant } from "@/lib/utils/interfaces";

function PopularStores() {
  const { data, error, loading } = useMostOrderedRestaurants();

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error) {
    return;
  }

  let popularRestaurants: IRestaurant[] =
    data?.mostOrderedRestaurantsPreview?.filter(
      (item) => item?.shopType?.toLowerCase() === "grocery"
    ) || [];

  return (
    <CuisinesSliderCard
      title="Popular stores"
      data={popularRestaurants || []}
      showLogo={true}
      last={true}
    />
  );
}

export default PopularStores;

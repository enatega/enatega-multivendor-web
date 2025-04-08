// slider card
import SliderCard from "@/lib/ui/useable-components/slider-card";
// hook
import useMostOrderedRestaurants from "@/lib/hooks/useMostOrderedRestaurants";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/slider-loading-skeleton";
// interface
import { IRestaurant } from "@/lib/utils/interfaces/restaurants.interface";

function TopGroceryPicks() {
  const { data, error, loading } = useMostOrderedRestaurants();

  if (loading) {
    return <SliderSkeleton />;
  }

  if (error) {
    return;
  }

  let groceriesData: IRestaurant[] =
    data?.mostOrderedRestaurantsPreview?.filter(
      (item) => item?.shopType.toLowerCase() === "grocery"
    ) || [];

  return <SliderCard title="Top grocery picks" data={groceriesData || []} />;
}

export default TopGroceryPicks;

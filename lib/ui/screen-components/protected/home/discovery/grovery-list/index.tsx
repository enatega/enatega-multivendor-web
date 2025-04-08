import SliderCard from "@/lib/ui/useable-components/slider-card";
// Hook
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/slider-loading-skeleton";
// interface
import { IRestaurant } from "@/lib/utils/interfaces/restaurants.interface";

function GroceryList() {
  const { data, error, loading } = useNearByRestaurantsPreview();

  if (loading) {
    return <SliderSkeleton />;
  }

  if (error) {
    return;
  }

  let groceriesData: IRestaurant[] =
    data?.nearByRestaurantsPreview.restaurants.filter(
      (item) => item.shopType.toLowerCase() === "grocery"
    ) || [];

  return <SliderCard title="Grocery list" data={groceriesData || []} />;
}

export default GroceryList;

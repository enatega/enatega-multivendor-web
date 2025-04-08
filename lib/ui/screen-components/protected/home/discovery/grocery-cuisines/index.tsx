// cuisines slider card
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useGetCuisines from "@/lib/hooks/useGetCuisines";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/cuisines-slider-loading-skeleton";
// interface
import { ICuisinesData } from "@/lib/utils/interfaces";

function GroceryCuisines() {
  const { data, loading, error } = useGetCuisines();

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error) {
    return;
  }

  let groceryCuisinesData: ICuisinesData[] = Array.isArray(data?.cuisines)
    ? data.cuisines.filter((item) => item.shopType.toLowerCase() === "grocery")
    : [];

  return (
    <CuisinesSliderCard
      title="Grocery cuisines"
      data={groceryCuisinesData || []}
      cuisines={true}
    />
  );
}

export default GroceryCuisines;

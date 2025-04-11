// cuisines slider card
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useGetCuisines from "@/lib/hooks/useGetCuisines";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
// interface
import { ICuisinesData } from "@/lib/utils/interfaces";

function GroceryCuisines({title="Grocery cuisines"}: {title?:string}) {
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
      title={title}
      data={groceryCuisinesData || []}
      cuisines={true}
    />
  );
}

export default GroceryCuisines;

// cuisines slider card
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useGetCuisines from "@/lib/hooks/useGetCuisines";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
// interface
import { ICuisinesData } from "@/lib/utils/interfaces";

function CuisinesSection({ title, restaurant } : {title:string, restaurant:boolean}) {
  const { loading, error, restaurantCuisinesData, groceryCuisinesData } = useGetCuisines();

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error) {
    return;
  }

  return (
    <CuisinesSliderCard<ICuisinesData>
      title={title}
      data={restaurant ? restaurantCuisinesData : groceryCuisinesData || []}
      cuisines={true}
    />
  );
}

export default CuisinesSection;

import SliderCard from "@/lib/ui/useable-components/slider-card";
// Hook
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/slider-loading-skeleton";

function RestaurantsNearYou() {
  const { data, error, loading } = useNearByRestaurantsPreview();

  if (loading) {
    return <SliderSkeleton/>;
  }

  if (error) {
    return;
  }
  return (
    <SliderCard
      title="Restaurants near you"
      data={data?.nearByRestaurantsPreview?.restaurants || []}
    />
  );
}

export default RestaurantsNearYou;

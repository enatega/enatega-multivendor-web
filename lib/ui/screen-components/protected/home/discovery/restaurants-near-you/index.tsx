import SliderCard from "@/lib/ui/useable-components/slider-card";
// Hook
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/slider-loading-skeleton";

function RestaurantsNearYou() {
  const { data, error, loading } = useNearByRestaurantsPreview();

  if (loading) {
    return <SliderSkeleton title="Restaurants near you" />;
  }

  if (error) {
    return (
      <p>try again</p>
    );
  }
  return (
    <SliderCard
      title="Restaurants near you"
      data={data?.nearByRestaurantsPreview?.restaurants || []}
    />
  );
}

export default RestaurantsNearYou;

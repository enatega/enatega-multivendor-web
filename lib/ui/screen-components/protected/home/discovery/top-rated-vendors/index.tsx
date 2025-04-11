// Queries
import { TOP_RATED_VENDORS } from "@/lib/api/graphql";
// useQuery
import { useQuery } from "@apollo/client";
// interfaces
import { ITopRatedVendorData } from "@/lib/utils/interfaces";
// card
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";

function TopRatedVendors() {
  const { loading, error, data } = useQuery<ITopRatedVendorData>(
    TOP_RATED_VENDORS,
    {
      variables: {
        latitude: 33.6995,
        longitude: 73.0363,
      },
      fetchPolicy: "cache-and-network",
    }
  );
  if (error) {
    return;
  }
  if (loading) {
    return <CuisinesSliderSkeleton />;
  }
  return (
    <CuisinesSliderCard
      title="Our brands"
      data={data?.topRatedVendorsPreview || []}
      showLogo={true}
    />
  );
}
export default TopRatedVendors;

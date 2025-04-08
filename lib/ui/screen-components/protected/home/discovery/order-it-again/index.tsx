// queries
import { RECENT_ORDER_RESTAURANTS } from "@/lib/api/graphql";
// slider card
import SliderCard from "@/lib/ui/useable-components/slider-card";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/slider-loading-skeleton";
// interfaces
import { IRecentOrderedRestaurantsData, IRestaurant } from "@/lib/utils/interfaces";
// useQuery
import { useQuery } from "@apollo/client";

function OrderItAgain() {
  const { loading, data, error } = useQuery<IRecentOrderedRestaurantsData>(RECENT_ORDER_RESTAURANTS, {
    variables: {
      latitude: 33.5831583,
      longitude: 73.0810976,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    <SliderSkeleton />;
  }

  if (error) {
    return;
  }
    
    const recentOrders: IRestaurant[] = data?.recentOrderRestaurantsPreview || []

  return (
    <SliderCard title="Order it again" data={recentOrders || []} />
  );
}
export default OrderItAgain;

"use client";

import { useQuery } from "@apollo/client";
import { ORDER_TRACKING } from "@/lib/api/graphql/queries/order-tracking";

function useTracking({ orderId }: { orderId: string }) {
  const { data: orderTrackingDetails, loading: isOrderTrackingDetailsLoading } =
    useQuery(ORDER_TRACKING, {
      fetchPolicy: "cache-and-network",
      variables: {
        orderDetailsId: orderId,
      },
    });

  return {
    orderTrackingDetails: orderTrackingDetails?.orderDetails,
    isOrderTrackingDetailsLoading,
  };
}

export default useTracking;

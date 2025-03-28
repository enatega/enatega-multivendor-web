
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";
import OrderCardSkeleton from "@/lib/ui/useable-components/custom-skeletons/order.card.skelton";
import OrderCard from "@/lib/ui/useable-components/order-card";
import EmptyState from "@/lib/ui/useable-components/orders-empty-state";
import { IOrder } from "@/lib/utils/interfaces/orders.interface";
import { useRouter } from "next/navigation";

interface IPastOrdersProps {
    pastOrders : IOrder[];
    ordersLoading: boolean;
}

export default function PastOrders({pastOrders,ordersLoading}:IPastOrdersProps) {
    const router= useRouter()


      //Handlesrs
      // use debouncefunction if user click multiple times at once it will call function only 1 time
    const handleReorderOrderClicked = useDebounceFunction(
        (restaurantId: string | undefined) => {
          console.log("ready for navigation");
          router.push(`/restaurants/${restaurantId}`);
        },
        500 // Debounce time in milliseconds
      );

    // If ordersLoading display skelton  component of orderCardSkelton
    if (ordersLoading) {
        return (
          <OrderCardSkeleton count={2}/>
        )
      }
    
      // If no orders display component of emptyState and pass props 
      if (pastOrders?.length === 0) {
        return (
          <EmptyState
            // icon="fa-solid fa-receipt"
            title="No Past Orders"
            message="You haven't placed any orders yet."
            actionLabel="Browse Restaurants"
            actionLink="/restaurants"
          />
        )
      }
    
      return (
        <div className="space-y-4 py-4">
          <h2 className="text-2xl font-bold mb-6">Past Orders</h2>
          <div className="space-y-4">
            {pastOrders?.map((order:IOrder) => (
              <OrderCard
                key={order._id}
                order={order}
                handleReorderOrderClicked={handleReorderOrderClicked}
                type="past"
                className="border border-gray-200 rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>
      )
}
"use client"
import OrderCardSkeleton from "@/lib/ui/useable-components/custom-skeletons/order.card.skelton";
import OrderCard from "@/lib/ui/useable-components/order-card";
import EmptyState from "@/lib/ui/useable-components/orders-empty-state";
import { IOrder } from "@/lib/utils/interfaces/orders.interface";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";

interface IActiveOrdersProps {
    activeOrders : IOrder[];
    ordersLoading: boolean;
}

export default function ActiveOrders({activeOrders,ordersLoading}:IActiveOrdersProps) {  
    const router= useRouter()

    //Handlers
    // use debouncefunction if user click multiple times at once it will call function only 1 time
    const handleTrackOrderClicked = useDebounceFunction((orderId: string | undefined) => {
      console.log("Navigating to:", orderId);
      router.push(`/orders/${orderId}`);
    }, 500);

    // if orders are loading dislay custom skelton of orderCardSkelton and optionally pass props of how many cards skeltons to display
    if (ordersLoading) {
        return (
          <OrderCardSkeleton count={2}/>
        )
      }

    //   If No Active orders then display Empty state card and pass props
      if (activeOrders?.length === 0) {
        return (
          <EmptyState
            title="No Active Orders"
            message="You don't have any active orders at the moment."
            actionLabel="Browse Restaurants"
            actionLink="/restaurants"
          />
        )
      }

      return (
        <div className="space-y-4 py-4">
          <h2 className="text-2xl font-bold mb-6">Active Orders</h2>
          <div className="space-y-4">
            {activeOrders?.map((order:IOrder) => (
              <OrderCard
                key={order._id}
                order={order}
                handleTrackOrderClicked={handleTrackOrderClicked}
                type="active"
                className={twMerge(
                  "border border-gray-200 rounded-lg shadow-sm",
                //   order.orderStatus === "PENDING" && "border-l-4 border-l-yellow-500",
                //   order.orderStatus === "ACCEPTED" && "border-l-4 border-l-blue-500",
                //   order.orderStatus === "ASSIGNED" && "border-l-4 border-l-[#0EA5E9]",
                //   order.orderStatus === "PICKED" && "border-l-4 border-l-green-500",
                )}
              />
            ))}
          </div>
        </div>
      )
}
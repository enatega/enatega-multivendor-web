"use client";

import { useCallback, type FC } from "react";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IOrder } from "@/lib/utils/interfaces/orders.interface";
import {
  formatDate,
  formatDateAndTime,
  // getStatusColor,
  // getStatusLabel,
} from "@/lib/utils/methods/helpers";
import CustomIconButton from "../custom-icon-button";

interface IOrderCardProps {
  order: IOrder;
  type: "active" | "past";
  className?: string;
  handleTrackOrderClicked?: (id:string|undefined) => void
  handleReOrderClicked?: (id:string|undefined)=> void
  handleRateOrderClicked?: (id:string|undefined,value:number)=> void
  
}

const OrderCard: FC<IOrderCardProps> = ({ order, type, className,handleTrackOrderClicked,handleReOrderClicked,handleRateOrderClicked }) => {

  const handleTrackOrder = (order:IOrder) => {
    // Implement tracking functionality
    console.log("Track order:", order._id);
    // The ?. (optional chaining) operator is used to safely call the function handleTrackOrderClicked only if it is defined.
    handleTrackOrderClicked?.(order?._id)
  };

  const handleReorder = useCallback((order: IOrder) => {
  // Implement reorder functionality
  console.log("order id :", order?._id);

  console.log("restaurant id :", order?.restaurant?._id);
  // pass restaurant id of that order
  handleReOrderClicked?.(order?.restaurant?._id)
  
}, []);

  const handleRateOrder = (value: number) => {
    // Implement rating functionality
    console.log("Rate order:", order._id, "with", value, "stars");
    handleRateOrderClicked?.(order?._id, value)
  };

  return (
    <div className={twMerge("p-4", className)}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Restaurant Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={order?.restaurant?.image || "https://placehold.co/400"}
              alt={order?.restaurant?.name || "Restaurant"}
              width={64}
              height={64}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{order?.restaurant?.name}</h3>
            <h1>{(order?.items && order?.items[0]?.title) || ""}</h1>
            {type === "active" ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <i className="fa-solid fa-clock text-gray-400"></i>
                </div>
                {/* <Badge
                  value={getStatusLabel(order.orderStatus)}
                  severity={getStatusColor(order.orderStatus)}
                  className="mt-2"
                /> */}
              </>
            ) : (
              <>
                <div className="flex items-center  text-sm text-gray-600 mt-1">
                  <i className="fa-solid fa-calendar-alt text-gray-400"></i>
                  <span>
                    {order?.deliveredAt
                      ? `Delivered on ${formatDateAndTime(order.deliveredAt)}`
                      : order?.cancelledAt
                        ? `Cancelled on ${formatDate(order.cancelledAt)}`
                        : "Cancelled"}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Order #{order.orderId?.substring(0, 8)}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex flex-col md:items-end justify-between gap-2">
          <div className="font-semibold text-lg">
            ${order.orderAmount?.toFixed(2)}
          </div>

          {(type === "active" || type === "past") && (
            <CustomIconButton
              title={type=== "active" ? "Track your order" : "Select item to reorder"}
              iconColor="black"
              classNames="bg-[#5AC12F] w-[content] px-4 gap-x-0 text-[12px] font-medium"
              handleClick={
                type === "active"
                  ? ()=> handleTrackOrder(order)
                  : () => handleReorder(order)
              }
            />
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-4 border-t pt-4">
        <div className="text-sm text-gray-600 mb-2">
          {order.items?.length} {order.items?.length === 1 ? "item" : "items"}
        </div>
        <div className="space-y-3">
          {order.items?.map((item, index) => (
            <div
              key={item._id || index}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg?height=48&width=48"}
                    alt={item.title || "Food item"}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {item.quantity}x {item.variation?.[0]?.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating for past orders */}
      {type === "past" && order.orderStatus === "DELIVERED" && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rate the Order</span>
            <Rating
              value={order.review?.rating || 0}
              cancel={false}
              onChange={(e) => handleRateOrder(e.value || 0)}
              pt={{
                onIcon: { className: "text-yellow-400" },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;

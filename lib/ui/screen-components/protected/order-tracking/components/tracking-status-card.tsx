import React from "react";
import { IOrderTrackingDetail } from "@/lib/utils/interfaces/order-tracking-detail.interface";

interface TrackingStatusCardProps {
  orderTrackingDetails: IOrderTrackingDetail;
}

function TrackingStatusCard({ orderTrackingDetails }: TrackingStatusCardProps) {
  // Helper to determine the step status
  const getStepStatus = (stepIndex: number) => {
    const STATUS_ORDER = ["PENDING", "ACCEPTED", "PICKED", "DELIVERED"];
    const currentStatus = orderTrackingDetails?.orderStatus || "PENDING";

    if (currentStatus === "CANCELLED") {
      return "inactive";
    }

    const currentStatusIndex = STATUS_ORDER.indexOf(currentStatus);

    if (currentStatusIndex === -1) return "inactive";

    if (stepIndex < currentStatusIndex) {
      return "completed"; // Steps before current status
    } else if (stepIndex === currentStatusIndex) {
      return "active"; // Current step
    } else {
      return "inactive"; // Future steps
    }
  };

  // Get dynamic estimated delivery time
  const getEstimatedDeliveryTime = () => {
    if (!orderTrackingDetails?.createdAt) return "20 - 30 min";

    const expectedTime =
      orderTrackingDetails.expectedTime ?
        new Date(orderTrackingDetails.expectedTime)
      : null;
    const now = new Date();

    // If order is delivered or completed
    if (
      orderTrackingDetails.orderStatus === "DELIVERED" ||
      orderTrackingDetails.orderStatus === "COMPLETED"
    ) {
      return "Delivered";
    }

    // If order is cancelled
    if (orderTrackingDetails.orderStatus === "CANCELLED") {
      return "Cancelled";
    }

    // If we have expected time, calculate remaining time
    if (expectedTime) {
      const remainingMinutes = Math.max(
        0,
        Math.ceil((expectedTime.getTime() - now.getTime()) / 60000)
      );

      if (remainingMinutes <= 0) {
        return "Any moment now";
      } else if (remainingMinutes <= 5) {
        return "< 5 min";
      } else {
        return `${remainingMinutes} min`;
      }
    }

    // If rider has picked up, estimated time is shorter
    if (orderTrackingDetails.orderStatus === "PICKED") {
      return "10 - 15 min";
    }

    // Default for pending/accepted
    return "20 - 30 min";
  };

  // Get dynamic status message based on current order status
  const getStatusMessage = () => {
    const status = orderTrackingDetails?.orderStatus;

    switch (status) {
      case "PENDING":
        return "We're confirming your order with the restaurant.";
      case "ACCEPTED":
        if (orderTrackingDetails.preparationTime) {
          const prepTime = new Date(orderTrackingDetails.preparationTime);
          const now = new Date();
          if (prepTime > now) {
            const minLeft = Math.ceil(
              (prepTime.getTime() - now.getTime()) / 60000
            );
            return `Restaurant is preparing your food. Ready in ${minLeft} min.`;
          }
        }
        return "Restaurant is preparing your food. A rider will be assigned soon.";
      case "ASSIGNED":
        return `A rider has been assigned and will pick up your order soon.`;
      case "PICKED":
        return "Your rider has picked up your order and is heading your way!";
      case "DELIVERED":
        return "Your order has been delivered. Enjoy your meal!";
      case "COMPLETED":
        return "Order completed. Thank you for ordering!";
      case "CANCELLED":
        return orderTrackingDetails.reason || "Your order has been cancelled.";
      default:
        return "Processing your order...";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm sm:text-base font-semibold">
          Estimated Delivery Time
        </h3>

        {orderTrackingDetails.orderStatus === "CANCELLED" && (
          <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
            Cancelled
          </span>
        )}
      </div>

      <div className="text-xl sm:text-2xl font-bold mb-4">
        {getEstimatedDeliveryTime()}
      </div>

      {/* Segmented Progress Bars */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[0, 1, 2, 3].map((index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={index}
              className="h-2 rounded-full bg-gray-200 overflow-hidden"
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  status === "completed" ? "bg-green-500"
                  : status === "active" ? "bg-green-500 animate-pulse"
                  : "bg-gray-200"
                }`}
                style={{
                  width:
                    status === "completed" ? "100%"
                    : status === "active" ? "75%"
                    : "0%",
                }}
              />
            </div>
          );
        })}
      </div>

      <p className="text-gray-600 text-xs sm:text-sm">{getStatusMessage()}</p>

      {/* Real-time update indicator */}
      {orderTrackingDetails.orderStatus !== "DELIVERED" &&
        orderTrackingDetails.orderStatus !== "COMPLETED" &&
        orderTrackingDetails.orderStatus !== "CANCELLED" && (
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live updates enabled
          </div>
        )}
    </div>
  );
}

export default TrackingStatusCard;

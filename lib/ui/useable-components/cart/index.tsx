"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

// Hooks
import useUser from "@/lib/hooks/useUser";

// Components
import { RECOMMENDATIONS } from "@/lib/utils/dummy";

interface CartProps {
  onClose?: () => void;
}

export default function Cart({ onClose }: CartProps) {
  // Access user context for cart functionality
  const { cart, cartCount, updateItemQuantity, calculateSubtotal } = useUser();

  const router = useRouter();

  // Format subtotal for display
  const formattedSubtotal = cartCount > 0 ? `$${calculateSubtotal()}` : "$0";

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-inter font-semibold text-xl text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add items to your cart to continue
          </p>
          <button
            onClick={onClose}
            className="bg-[#5AC12F] text-black px-6 py-2 rounded-full font-medium"
            type="button"
          >
            Browse Restaurant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="font-inter font-semibold text-xl text-gray-900">
            Your order
          </h2>
          <span className="text-gray-500 text-sm">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* Order Items - Scrollable */}
      <div id="order-list" className="flex-1 overflow-y-auto p-4">
        {cart.map((item) => (
          <div
            key={item.key}
            className="flex flex-wrap md:flex-nowrap items-center mb-4 gap-4 p-3 border-b"
          >
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-inter font-semibold text-[14px] md:text-[16px] text-gray-700 leading-snug">
                {item.foodTitle || item.title || "Food Item"}
              </h3>

              {/* Variation */}
              <p className="font-inter font-normal text-[12px] md:text-[14px] text-gray-500 leading-snug">
                {item.variationTitle && `${item.variationTitle}`}
              </p>

              {/* Add-ons */}
              {item.addons && item.addons.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs text-gray-500">
                    {item.addons.map((addon, index) => (
                      <span key={addon._id}>
                        {addon.options.map((option, optIndex) => (
                          <span key={option._id}>
                            {option.title || ""}
                            {optIndex < addon.options.length - 1 && ", "}
                          </span>
                        ))}
                        {index < (item.addons?.length ?? 0) - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              )}

              {/* Special Instructions */}
              {item.specialInstructions && (
                <p className="text-xs italic text-gray-500 mt-1">
                  {item.specialInstructions}
                </p>
              )}

              {/* Price */}
              <p className="text-[#0EA5E9] font-semibold text-sm md:text-base mt-1">
                ${item.price || 0}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateItemQuantity(item.key, -1)}
                className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center"
                type="button"
              >
                {item.quantity === 1 ?
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                : <FontAwesomeIcon icon={faMinus} size="xs" />}
              </button>

              <span className="text-gray-900 w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => updateItemQuantity(item.key, 1)}
                className="bg-[#0EA5E9] text-white rounded-full w-6 h-6 flex items-center justify-center"
                type="button"
              >
                <FontAwesomeIcon icon={faPlus} size="xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Section */}
      <div className="border-t p-4 bg-gray-50">
        <h2 className="font-inter font-semibold text-base md:text-lg text-gray-900 mb-3">
          Recommendations
        </h2>

        <div className="flex space-x-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {RECOMMENDATIONS.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 h-[200px] w-[170px] flex flex-col justify-between bg-white rounded-lg shadow-sm"
            >
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <button
                    className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faPlus} color="white" size="xs" />
                  </button>
                </div>
              </div>

              <div className="flex justify-start p-3">
                <div className="text-left">
                  <p className="text-[#0EA5E9] font-semibold text-sm">
                    ${item.price}
                  </p>
                  <p className="text-gray-700 text-sm truncate max-w-[150px]">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Button */}
      <div className="p-4 border-t">
        <button
          className="flex justify-between items-center w-full bg-[#5AC12F] text-black rounded-full px-4 py-3"
          onClick={() => {
            // Handle checkout logic here
            router.push("/order/checkout");

            if (onClose) onClose();
          }}
          type="button"
        >
          <div className="flex items-center">
            <span className="bg-black text-[#5AC12F] rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-medium">
              {cartCount}
            </span>
            <span className="text-black text-base font-medium">
              Go to Checkout
            </span>
          </div>
          <span className="text-black text-base font-medium">
            {formattedSubtotal}
          </span>
        </button>
      </div>
    </div>
  );
}

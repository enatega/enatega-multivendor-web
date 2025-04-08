import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ORDER_ITEMS, RECOMMENDATIONS } from "@/lib/utils/dummy";

export default function Cart() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="font-inter font-semibold text-base md:text-[18px] lg:text-xl text-gray-900 leading-snug">
          Your order
        </h2>
      </div>
      {/* Order Items */}
      <div id="order-list" className="pt-4">
        <div>
          {ORDER_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap md:flex-nowrap items-center mb-4 gap-4 p-2 rounded-lg"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-inter font-semibold text-[14px] md:text-[18px]  text-gray-700 leading-snug">
                  {item.name}
                </h3>
                <p
                  className="font-inter font-normal text-[12px] md:text-[14px]  text-gray-500 leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: item.description.replace("\n", "<br>"),
                  }}
                />
                <p className="text-blue-500 font-semibold text-sm md:text-base">
                  ${item.price}
                </p>
              </div>

              {/* Quantity */}
              <div className="ml-auto flex items-center border rounded-lg px-2 md:px-3 py-1 md:py-1">
                <span className="text-[#0EA5E9] text-[14[x] md:text-[18px]">
                  {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendeation */}
      <div className="border-t p-4">
        <h2 className="font-inter font-semibold text-base md:text-[18px] lg:text-xl text-gray-900 leading-snug">
          Recommendations
        </h2>
        <div
          id="recommendations-list"
          className="flex space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="mt-6">
            <div className="flex space-x-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {RECOMMENDATIONS.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 h-[200px] w-[170px] flex flex-col justify-between  bg-white rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {/* <button className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <i className="fas fa-plus"></i>
                      <FontAwesomeIcon icon={faPlus} />
                    </button> */}

                    <div className="absolute top-2 right-2">
                      <button className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlus} color="white" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-start m-2">
                    <div className="mt-2 text-left">
                      <p className="text-[#0EA5E9] font-semibold text-sm md:text-base">
                        ${item.price}
                      </p>
                      <p className="text-gray-700">{item.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <button className="flex justify-between items-center w-full bg-[#5AC12F] text-white rounded-full px-4 py-2 sm:py-3">
          <div className="flex items-center">
            <span className="bg-black text-[#5AC12F] rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mr-2 text-xs sm:text-sm font-medium">
              2
            </span>
            <span className="text-black text-sm sm:text-base font-medium">
              Go to Checkout
            </span>
          </div>
          <span className="text-black text-sm sm:text-base font-medium">
            $8
          </span>
        </button>
      </div>
    </div>
  );
}

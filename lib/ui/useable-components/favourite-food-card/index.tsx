"use client" 
// lib/ui/useable-components/favourite-food-card/index.tsx
import React from "react";
import Image from "next/image";
import { HeartSvg, ClockSvg, FaceSvg } from "@/lib/utils/assets/svg";
import IconWithTitle from "@/lib/ui/useable-components/icon-with-title";
import { useConfig } from "@/lib/context/configuration/configuration.context";

const FavoriteFoodCard = ({ item, onClick }) => {
  const { CURRENCY_SYMBOL } = useConfig();
  
  // Get the first variation price (or default to 0)
  const price = item?.food?.variations && item.food.variations[0] 
    ? item.food.variations[0].price 
    : 0;

  return (
    <div 
      className="relative rounded-md shadow-md cursor-pointer hover:scale-102 hover:opacity-95 transition-transform duration-500 h-[272px] w-full"
      onClick={() => onClick && onClick(item)}
    >
      {/* Image Container */}
      <div className="relative w-full h-[160px]">
        <Image
          src={item?.food?.image || "/placeholder-food.jpg"}
          alt={item?.food?.title || "Food item"}
          fill
          className="object-cover rounded-t-md"
          unoptimized
        />
        
        {/* Favorite Heart Icon - Always filled since these are favorites */}
        <div className="absolute top-2 right-2 rounded-full bg-white/80 h-8 w-8 flex justify-center items-center shadow-md">
          <HeartSvg filled={true} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        {/* Name & Description */}
        <div className="flex flex-row justify-between items-center relative border-b border-dashed pb-1">
          <div className="w-[70%]">
            <p className="text-base lg:text-lg text-[#374151] font-semibold line-clamp-1">
              {item?.food?.title || "Food item"}
            </p>
            <p className="text-xs xl:text-sm text-[#4B5563] font-light line-clamp-1">
              {item?.food?.description || "No description available"}
            </p>
          </div>

          {/* Price Tag */}
          <div className="bg-[#F3FFEE] rounded-md flex items-center justify-center px-2 py-2">
            <p className="text-xs text-[#5AC12F] font-light lg:font-normal text-center">
              {CURRENCY_SYMBOL}
              {price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Restaurant name */}
        <p className="text-xs text-gray-500 pt-1">
          {item?.restaurant?.name || "Restaurant"}
        </p>

        {/* Icons Section */}
        <div className="flex flex-row justify-between w-[80%] sm:w-[100%] lg:w-[75%] pt-1">
          <IconWithTitle
            logo={() => <ClockSvg isBlue={true} />}
            title={`${item?.restaurant?.deliveryTime || 25} mins`}
            isBlue={true}
          />
          <IconWithTitle logo={FaceSvg} title={item?.restaurant?.reviewAverage || 4.5} />
        </div>
      </div>
    </div>
  );
};

export default FavoriteFoodCard;
"use client";

import Image from "next/image";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ClockSvg, CycleSvg, FaceSvg } from "@/lib/utils/assets/svg";
import IconWithTitle from "../icon-with-title";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import CustomDialog from "../custom-dialog";
import { Button } from "primereact/button";

const FoodCard = ({ 
  item, 
  isModalOpen = { value: false, id: "" }, 
  handleUpdateIsModalOpen,
  onFoodClick 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { CURRENCY_SYMBOL } = useConfig();
  
  // Get price from variations - use first variation price
  const price = item?.variations && item.variations[0] ? item.variations[0].price : 0;
  
  return (
    <div
      className={`relative rounded-md shadow-md cursor-pointer hover:scale-102 hover:opacity-95 transition-transform duration-500 max-h-[272px] w-[96%] ml-[2%] ${pathname === "/restaurants" || pathname === "/store" ? "my-[2%]" : "my-[4%]"}`}
      onClick={() => {
        if (!item?.isAvailable) {
          handleUpdateIsModalOpen(true, item._id);
          return;
        }
        
        // Call the parent component's handler
        if (onFoodClick) {
          onFoodClick(item);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[160px]">
        <Image
          src={item?.image || '/placeholder-food.jpg'}
          alt={item?.name || 'Food item'}
          fill
          className="object-cover rounded-t-md"
          unoptimized
        />
      </div>
      
      {/* Overlay for unavailable items */}
      {!item?.isAvailable && (
        <div className="absolute rounded-md top-0 left-0 w-full h-[160px] bg-black/50 opacity-75 z-20 flex items-center justify-center">
          <div className="text-white text-center z-30">
            <p className="text-lg font-bold">Out of Stock</p>
            <p className="text-sm">This item is currently unavailable</p>
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        {/* Name & Description */}
        <div className="flex flex-row justify-between items-center relative border-b border-dashed pb-1">
          <div className="w-[70%]">
            <p className="text-base lg:text-lg text-[#374151] font-semibold line-clamp-1">
              {item?.name || 'Food item'}
            </p>
            <p className="text-xs xl:text-sm text-[#4B5563] font-light line-clamp-2">
              {item?.description || 'No description available'}
            </p>
          </div>
          
          {/* Price Tag */}
          <div className="bg-[#F3FFEE] rounded-md flex items-center justify-center px-2 py-2">
            <p className="text-xs text-[#5AC12F] font-light lg:font-normal text-center">
              {CURRENCY_SYMBOL}{price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex flex-row justify-between w-[80%] sm:w-[100%] lg:w-[75%] pt-1">
          <IconWithTitle
            logo={() => <ClockSvg isBlue={true} />}
            title={`${item?.deliveryTime || 25} mins`}
            isBlue={true}
          />
          {item?.deliveryInfo?.deliveryFee && 
            <IconWithTitle logo={CycleSvg} title={item?.deliveryInfo?.deliveryFee} />
          }
          <IconWithTitle logo={FaceSvg} title={item?.reviewAverage || 4.5} />
        </div>
      </div>

      {/* Modal for unavailable items */}
      <CustomDialog 
        className="max-w-[300px]" 
        visible={isModalOpen.value && isModalOpen.id === item._id} 
        onHide={() => handleUpdateIsModalOpen(false, item._id)}
      >
        <div className="text-center pt-10">
          <p className="text-lg font-bold pb-3">Item Unavailable</p>
          <p className="text-sm">This food item is currently out of stock</p>
          <div className="flex pt-9 px-2 pb-2 flex-row justify-center items-center gap-2 w-full">
            <Button 
              style={{ fontSize: "14px", fontWeight: "normal" }} 
              onClick={() => handleUpdateIsModalOpen(false, item._id)} 
              label="Close" 
              className="w-full bg-red-300 text-base font-normal text-black rounded-md min-h-10" 
            />
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default FoodCard;
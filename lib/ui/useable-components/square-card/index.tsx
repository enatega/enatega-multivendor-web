// Fixed SquareCard component
"use client";

import Image from "next/image";
import React from "react";

interface SquareCardProps {
  item: any;
  cuisines?: boolean;
  showLogo?: boolean;
  onCardClick?: (item: any) => void;
}

const SquareCard: React.FC<SquareCardProps> = ({
  item,
  cuisines = false,
  showLogo = false,
  onCardClick,
}) => {
  console.log("SquareCard rendering with props:", { 
    item, 
    cuisines, 
    showLogo, 
    hasClickHandler: !!onCardClick 
  });
  
  const getImgSrc = showLogo ? item?.logo : item?.image;
  
  // Define a separate click handler function to make sure it's properly bound
  const handleClick = (e: React.MouseEvent) => {
    console.log("CLICK DETECTED in SquareCard!", item);
    
    // Prevent default behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Call the provided click handler if it exists
    if (onCardClick && typeof onCardClick === 'function') {
      console.log("Calling onCardClick function with item:", item);
      onCardClick(item);
    } else {
      console.error("onCardClick is not a function or not provided");
    }
  };

  return (
    <div
      className="rounded-md max-w-prose shadow-md m-2 mb-6 cursor-pointer hover:scale-102 hover:opacity-95 hover:shadow-lg transition-transform duration-500 max-h-[272px] w-[96%] ml-[2%] my-[4%]"
      onClick={handleClick} // THIS IS CRITICAL: Adding the click handler
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as any);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[150px]">
        <Image
          src={getImgSrc || "/placeholder.jpg"}
          alt={item?.name || item?.title || "Category"}
          fill
          className="object-cover rounded-t-md"
          unoptimized
        />
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        <div className="flex flex-row justify-between items-center relative">
          <div className="md:w-[70%]">
            <p className="text-sm lg:text-base text-[#374151] font-semibold line-clamp-1">
              {item?.name || item?.title || "Unknown Category"}
            </p>
            {cuisines && item?.description && (
              <p className="text-xs xl:text-sm text-[#4B5563] font-light line-clamp-1">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareCard;
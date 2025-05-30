"use client";

import Image from "next/image";
import React, { useState } from "react";
import {usePathname } from "next/navigation";
import {  HeartSvg } from "@/lib/utils/assets/svg";
// import IconWithTitle from "../icon-with-title";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import CustomDialog from "../custom-dialog";
import { Button } from "primereact/button";
import { useMutation } from "@apollo/client";
import { TOGGLE_FOOD_FAVORITE } from "@/lib/api/graphql/mutations/food";
import Confetti from "react-confetti";
import Loader from "@/app/(localized)/mapview/[slug]/components/Loader";

const FoodCard = ({
  item,
  isModalOpen = { value: false, id: "" },
  handleUpdateIsModalOpen,
  onFoodClick,
}) => {
  const pathname = usePathname();
  const { CURRENCY_SYMBOL } = useConfig();
  
  // State for favorite functionality
  const [isLiked, setIsLiked] = useState(item?.isFavourite || false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Get price from variations - use first variation price
  const price =
    item?.variations && item.variations[0] ? item.variations[0].price : 0;

  // Set up the toggle favorite mutation
  const [toggleFavorite, { loading: toggleFavoriteLoading }] = useMutation(
    TOGGLE_FOOD_FAVORITE,
    {
      onCompleted: (data) => {
        const newFavoriteState = data.toggleFoodFavorite.isFavourite;
        setIsLiked(newFavoriteState);
        
        // Show confetti only when setting to favorite (true)
        if (newFavoriteState) {
          setShowConfetti(true);
          
          // Hide confetti after 3 seconds
          setTimeout(() => {
            setShowConfetti(false);
          }, 3000);
        }
      },
      onError: (error) => {
        console.error("Error toggling favorite:", error);
      }
    }
  );

  // Handle favorite click
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    
    // Extract the correct IDs from the item
    // For originalFood from allFoodItems/popularFoodItems
    const foodId = item._id;
    
    // Get restaurantId from the item or the original food
    const restaurantId = item.restaurant || 
                         (item.originalFood && item.originalFood.restaurant) ||
                         item.restaurantId;
    
    // Get categoryId - looking at various possible locations in the data structure
    const categoryId = item.category || 
                      (item.originalFood && item.originalFood.category) ||
                      item.categoryId;
    
    // Check if we have the required IDs
    if (!foodId || !restaurantId || !categoryId) {
      console.error("Missing required IDs for toggling favorite:", { foodId, restaurantId, categoryId });
      return;
    }
    
    console.log("Toggling favorite with IDs:", { foodId, restaurantId, categoryId });
    
    toggleFavorite({
      variables: {
        foodId,
        restaurantId,
        categoryId
      }
    });
  };

  return (
    <div
      className={`relative rounded-md shadow-md ${item?.isAvailable ? "cursor-pointer hover:scale-102 hover:opacity-95" : "cursor-not-allowed opacity-80"} transition-transform duration-500 max-h-[272px] w-[96%] ml-[2%] ${pathname === "/restaurants" || pathname === "/store" ? "my-[2%]" : "my-1"}`}
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
          src={item?.image || "/placeholder-food.jpg"}
          alt={item?.name || "Food item"}
          fill
          className="object-cover rounded-t-md"
          unoptimized
        />
        
        {/* Favorite Heart Icon */}
        <button
          onClick={handleFavoriteClick}
          disabled={toggleFavoriteLoading}
          className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white h-8 w-8 flex justify-center items-center transform transition-transform duration-300 hover:scale-110 active:scale-95 shadow-md"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          {toggleFavoriteLoading ? (
            <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
          ) : (
            <HeartSvg filled={isLiked} />
          )}
        </button>
        
        {/* Confetti effect when item is favorited */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000,
              pointerEvents: "none"
            }}
          />
        )}
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
        <div className="flex flex-row justify-between items-center relative pb-1">
          <div className="w-[70%]">
            <p className="text-base lg:text-lg text-[#374151] font-semibold line-clamp-1">
              {item?.name || "Food item"}
            </p>
            <p className="text-xs xl:text-sm text-[#4B5563] font-light">
              {item?.description
                ? item.description.length > 20
                  ? item.description.slice(0, 20) + "..."
                  : item.description
                : "No description available"}
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

        {/* Icons Section */}
        {/* <div className="flex flex-row justify-between w-[80%] sm:w-[100%] lg:w-[75%] pt-1">
          <IconWithTitle
            logo={() => <ClockSvg isBlue={true} />}
            title={`${item?.deliveryTime || 25} mins`}
            isBlue={true}
          />
          {item?.deliveryInfo?.deliveryFee && (
            <IconWithTitle
              logo={CycleSvg}
              title={item?.deliveryInfo?.deliveryFee}
            />
          )}
          <IconWithTitle logo={FaceSvg} title={item?.reviewAverage || 4.5} />
        </div> */}
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
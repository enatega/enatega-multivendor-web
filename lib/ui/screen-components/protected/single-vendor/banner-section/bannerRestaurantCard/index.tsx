'use client';

import React, { useEffect } from "react";
import Image from "next/image";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import useUser from "@/lib/hooks/useUser";

interface IBannerRestaurantCardProps {
  item: {
    _id: string;
    title: string;
    description: string;
    file: string;
    foodId: string;
    restaurant: string;
    foodImage?: string;
    foodTitle?: string;
    displayImage?: string;
    isActive: boolean;
  };
  onFoodClick?: (food: any) => void;
}

const BannerRestaurantCard: React.FC<IBannerRestaurantCardProps> = ({ item, onFoodClick }) => {
  const { allFoodItems, categories, restaurant } = useSingleRestaurantFoodData();
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();
  const isVideo = item?.file?.includes("video");

  // Transform cart items when restaurant data is loaded
  useEffect(() => {
    if (restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [restaurant, cart.length, transformCartWithFoodInfo, updateCart]);

  // Find the corresponding food item by ID
  const findFoodItemById = () => {
    if (!item.foodId || !allFoodItems || !allFoodItems.length) return null;

    const foodItem = allFoodItems.find(food => food._id === item.foodId);
    
    if (!foodItem) return null;
    
    // Find the category for this food item
    let categoryId = null;
    if (categories && categories.length > 0) {
      for (const category of categories) {
        if (category.foods.some(f => f._id === foodItem._id)) {
          categoryId = category._id;
          break;
        }
      }
    }
    
    // Transform food item to match the format expected by the FoodCard component
    return {
      _id: foodItem._id,
      name: foodItem.title,
      description: foodItem.description,
      image: foodItem.image,
      cuisines: [foodItem.category || "Food Item"],
      isAvailable: !foodItem.isOutOfStock,
      isFavourite: foodItem.isFavourite || false,
      variations: foodItem.variations,
      // Add the necessary IDs for the functionality
      restaurant: item.restaurant,
      restaurantId: item.restaurant,
      category: categoryId,
      categoryId: categoryId,
      // Keep the original food object for reference
      originalFood: foodItem,
    };
  };

  const handleClick = () => {
    if (!onFoodClick) return;
    
    const foodItem = findFoodItemById();
    if (foodItem && foodItem.isAvailable !== false) {
      onFoodClick(foodItem);
    }
  };

  return (
    <div 
      className="carousel-item relative cursor-pointer mx-[6px] md:mx-[12px]" 
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent rounded-xl opacity-70"></div>
      
      {isVideo ? (
        <video
          width={890}
          height={300}
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
          style={{ borderRadius: 12 }}
          className="carousel-banner"
        >
          <source src={item?.file} type="video/mp4" />
          {item.title}
        </video>
      ) : (
        <Image
          src={item?.displayImage || item?.file || item?.foodImage || "/placeholder-food.jpg"}
          width={890}
          height={300}
          alt={item?.title}
          objectFit="contain"
          style={{ borderRadius: 12 }}
          className="carousel-banner"
          unoptimized
        />
      )}
      
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-lg sm:text-2xl font-bold sm:font-extrabold">
          {item?.title}
        </p>
        <p className="text-xs sm:text-sm font-medium">
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default BannerRestaurantCard;
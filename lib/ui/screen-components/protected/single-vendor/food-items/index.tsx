"use client";

import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import FoodCard from "@/lib/ui/useable-components/foodCard";
import SliderCard from "@/lib/ui/useable-components/slider-card";
import { useState, useEffect } from "react";
import useUser from "@/lib/hooks/useUser";

// Transform food items to match the format expected by the Card component
function transformFoodForCard(food, restaurant, categoryId) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [food.category || "Food Item"],
    deliveryTime: restaurant?.deliveryTime || 25,
    reviewAverage: restaurant?.reviewData?.ratings || 4.5,
    isAvailable: !food.isOutOfStock,
    isFavourite: food.isFavourite || false,
    variations: food.variations,
    shopType: restaurant?.shopType || "restaurant",
    // Add the necessary IDs for the favorite functionality
    restaurant: restaurant?._id,
    restaurantId: restaurant?._id,
    category: categoryId,
    categoryId: categoryId,
    // Keep the original food object for reference
    originalFood: food,
  };
}

function FoodItems({ onFoodClick }) {
  const { allFoodItems, loading, error, restaurant, categories } = useSingleRestaurantFoodData();
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();
  
  // State for unavailable item modal
  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });
  
  // Transform cart items when restaurant data is loaded
  useEffect(() => {
    if (restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [restaurant, cart.length, transformCartWithFoodInfo, updateCart]);
  
  const handleUpdateIsModalOpen = (value, id) => {
    setIsModalOpen({ value, id });
  };

  if (loading) {
    return <SliderSkeleton />;
  }

  if (error || !allFoodItems?.length) {
    return null;
  }

  // Transform items to match Card component expectations
  const transformedItems = allFoodItems.slice(0, 8).map(food => {
    // Find the category ID for this food item
    let categoryId;
    if (categories && categories.length > 0) {
      for (const category of categories) {
        if (category.foods.some(f => f._id === food._id)) {
          categoryId = category._id;
          break;
        }
      }
    }
    
    return transformFoodForCard(food, restaurant, categoryId);
  });

  return (
    <SliderCard 
      title="Explore Menu 🍴" 
      data={transformedItems}
      last={false}
      renderItem={(item) => (
        <FoodCard 
          item={item} 
          isModalOpen={isModalOpen}
          handleUpdateIsModalOpen={handleUpdateIsModalOpen}
          onFoodClick={onFoodClick}
        />
      )}
    />
  );
}

export default FoodItems;
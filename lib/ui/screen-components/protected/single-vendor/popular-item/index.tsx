"use client";

import { useState } from "react";
import SliderCard from "@/lib/ui/useable-components/slider-card";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import FoodCard from "@/lib/ui/useable-components/foodCard";

// Modify each food item to work with the FoodCard component
function transformFoodForCard(food, restaurant, categoryId) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [food.category || "Popular"],
    deliveryTime: restaurant?.deliveryTime || 25,
    reviewAverage: restaurant?.reviewData?.ratings || 4.5,
    isAvailable: !food.isOutOfStock,
    isFavourite: food.isFavourite || false,
    variations: food.variations,
    shopType: restaurant?.shopType || "restaurant",
    // Add required IDs for favorite functionality
    restaurant: restaurant?._id,
    restaurantId: restaurant?._id,
    category: categoryId,
    categoryId: categoryId,
    // Original food properties preserved for the modal
    originalFood: food,
  };
}

function PopularItems({ onFoodClick }) {
  const { popularFoodItems, loading, error, restaurant, categories } = useSingleRestaurantFoodData();
  
  // State for unavailable item modal
  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });
  
  const handleUpdateIsModalOpen = (value, id) => {
    setIsModalOpen({ value, id });
  };

  if (loading) {
    return <SliderSkeleton />;
  }

  if (error || !popularFoodItems?.length) {
    return null;
  }

  const displayItems = popularFoodItems.map(food => {
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
      title="Popular Items 🔥" 
      data={displayItems}
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

export default PopularItems;
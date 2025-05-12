"use client";

import { useState } from "react";
import SliderCard from "@/lib/ui/useable-components/slider-card";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import FoodCard from "@/lib/ui/useable-components/foodCard";

// Modify each food item to work with the FoodCard component
function transformFoodForCard(food, restaurant) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [food.category || "Popular"],
    deliveryTime: restaurant?.deliveryTime || 25,
    reviewAverage: restaurant?.reviewData?.ratings || 4.5,
    isAvailable: !food.isOutOfStock,
    variations: food.variations,
    shopType: restaurant?.shopType || "restaurant",
    // Original food properties preserved for the modal
    originalFood: food,
  };
}

function PopularItems({ onFoodClick }) {
  const { popularFoodItems, loading, error, restaurant } = useSingleRestaurantFoodData();
  
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

  const displayItems = popularFoodItems.map(food => 
    transformFoodForCard(food, restaurant)
  );

  return (
    <SliderCard 
      title="Popular Items" 
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
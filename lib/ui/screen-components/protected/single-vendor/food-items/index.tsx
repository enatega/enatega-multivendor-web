"use client";

import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import FoodCard from "@/lib/ui/useable-components/foodCard";
import SliderCard from "@/lib/ui/useable-components/slider-card";
import { useState } from "react";

// Transform food items to match the format expected by the Card component
function transformFoodForCard(food, restaurant) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [food.category || "Food Item"],
    deliveryTime: restaurant?.deliveryTime || 25,
    reviewAverage: restaurant?.reviewData?.ratings || 4.5,
    isAvailable: !food.isOutOfStock,
    variations: food.variations,
    shopType: restaurant?.shopType || "restaurant",
    originalFood: food,
  };
}

function FoodItems({ onFoodClick }) {
  const { allFoodItems, loading, error, restaurant } = useSingleRestaurantFoodData();
  // const router = useRouter();
  
  // State for unavailable item modal
  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });
  
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
  const transformedItems = allFoodItems.slice(0, 8).map(food => 
    transformFoodForCard(food, restaurant)
  );

  return (
    <SliderCard 
      title="Food Items" 
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
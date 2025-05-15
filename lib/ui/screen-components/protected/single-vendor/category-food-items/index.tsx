"use client";

import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import FoodCard from "@/lib/ui/useable-components/foodCard";
import SliderCard from "@/lib/ui/useable-components/slider-card";
import { useState, useEffect } from "react";
import useUser from "@/lib/hooks/useUser";

// Transform food items to match the format expected by the Card component
function transformFoodForCard(food, restaurant, categoryTitle, categoryId) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [categoryTitle || "Food Item"],
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

function CategoryItems({ onFoodClick }) {
  const { categories, loading, error, restaurant } = useSingleRestaurantFoodData();
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

  if (error || !categories?.length) {
    return null;
  }

  // Get each category with its first food item
  const categoryItems = categories
    .filter(category => category.foods && category.foods.length > 0)
    .map(category => {
      const firstFood = category.foods[0];
      return transformFoodForCard(firstFood, restaurant, category.name, category._id);
    })
    .slice(0, 8); // Limit to 8 items for display

  if (categoryItems.length === 0) {
    return null;
  }

  return (
    <SliderCard 
      title="Categories 📋" 
      data={categoryItems}
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

export default CategoryItems;
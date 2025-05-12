"use client";

import { useState, useEffect } from "react";
import SliderCard from "@/lib/ui/useable-components/slider-card";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import FoodCard from "@/lib/ui/useable-components/foodCard";

// Define types to fix TypeScript errors
interface Food {
  _id: string;
  title: string;
  description: string;
  image: string;
  isOutOfStock?: boolean;
  variations: any[];
  category?: string;
}

interface Category {
  _id: string;
  title: string;
  foods: Food[];
}

// Transform food items to match the format expected by the FoodCard component
function transformFoodForCard(food: Food, restaurant: any, categoryName: string) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [categoryName || food.category || "Category Item"],
    deliveryTime: restaurant?.deliveryTime || 25,
    reviewAverage: restaurant?.reviewData?.ratings || 4.5,
    isAvailable: !food.isOutOfStock,
    variations: food.variations,
    shopType: restaurant?.shopType || "restaurant",
    originalFood: food,
  };
}

interface CategoryItemsProps {
  onFoodClick: (food: any) => void;
}

function CategoryItems({ onFoodClick }: CategoryItemsProps) {
  const { categories, loading, error, restaurant } = useSingleRestaurantFoodData();
  
  // State to store the selected category's items
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");

  // State for unavailable item modal
  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });
  
  const handleUpdateIsModalOpen = (value: boolean, id: string) => {
    setIsModalOpen({ value, id });
  };

  // Update selected category items when data is loaded
  useEffect(() => {
    if (categories?.length > 0) {
      // Select the first category by default, or the category with most foods
      const sortedCategories = [...categories].sort(
        (a: Category, b: Category) => (b.foods?.length || 0) - (a.foods?.length || 0)
      );
      
      const firstCategory = sortedCategories[0];
      setSelectedCategory(firstCategory);
      setCategoryName(firstCategory.name);
    }
  }, [categories]);
      

  if (loading) {
    return <SliderSkeleton />;
  }

  if (error || !selectedCategory || !selectedCategory.foods?.length) {
    return null;
  }

  // Transform foods for display and limit to 8 items
  const displayItems = selectedCategory.foods
    .slice(0, 8)
    .map(food => transformFoodForCard(food, restaurant, categoryName));

  return (
    <SliderCard 
      title={`${categoryName} Items`}
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

export default CategoryItems;
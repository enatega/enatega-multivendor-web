// Modified CategoryCards component with debugging
"use client";

import { useRouter } from "next/navigation";
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";

function CategoryCards() {
  const { categories, loading, error, restaurant } = useSingleRestaurantFoodData();
  const router = useRouter();

  console.log("CategoryCards rendering with:", { 
    categoriesCount: categories?.length, 
    loading, 
    error, 
    restaurantId: restaurant?._id 
  });

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error || !categories?.length) {
    console.error("No categories found or error:", error);
    return null;
  }

  // Prepare the data with debugging
  const enhancedCategories = categories.map(category => {
    if (!category._id) {
      console.error("Invalid category without ID:", category);
    }
    
    return {
      _id: category._id,
      name: category.title || "Unknown",
      title: category.title || "Unknown",
      image: category.image || "/placeholder.jpg",
      restaurantId: restaurant?._id
    };
  });

  console.log("Enhanced categories prepared:", enhancedCategories);

 const handleCategoryClick = (category) => {
  console.log("Category clicked in CategoryCards:", category);
  
  if (category._id && restaurant?._id) {
    // This is the corrected route path based on your folder structure
    // const url = `/(singleVendor)/categoryItemScreen/${category._id}/${restaurant._id}`;
    // OR this format might be needed depending on Next.js config
    const url = `/categoryItemScreen/${category._id}/${restaurant._id}`;
    console.log("Navigating to:", url);
    router.push(url);
  } else {
    console.error("Missing IDs for navigation");
  }
};

  return (
    <CuisinesSliderCard
      title="Categories"
      data={enhancedCategories}
      cuisines={true}
      onCardClick={handleCategoryClick} // Add the click handler
    />
  );
}

export default CategoryCards;
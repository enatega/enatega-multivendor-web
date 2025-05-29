// Modified CategoryCards component with debugging
"use client";

import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
import { useRouter } from "next/navigation";

function CategoryCards() {
  const { categories, loading, error, restaurant, restaurantId, restaurantSlug, shopType} = useSingleRestaurantFoodData();
  const router = useRouter();

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
      name: category.name || "Unknown",
      title: category.name || "Unknown",
      image: category.image || "/placeholder.jpg",
      restaurantId: restaurant?._id
    };
  });

 const handleCategoryClick = (category) => {
  // const restaurantId = onUseLocalStorage("get", "restaurant");
  //
  console.log("Category clicked in CategoryCards:", category?._id, restaurant._id);
    // router.replace(`/categoryItemScreen/${category?._id}/${restaurant?._id}`);
    router.replace(
      `/${shopType === "grocery" ? "store" : shopType}/${restaurantSlug}/${restaurantId}`
    );
  } 

  return (
    <CuisinesSliderCard
      title="Categories 🛒"
      data={enhancedCategories}
      cuisines={true}
      onCardClick={handleCategoryClick} // Add the click handler
    />
  );
}

export default CategoryCards;
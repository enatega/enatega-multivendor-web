// useSingleRestaurantFoodData.tsx
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT_BY_ID_SLUG, GET_POPULAR_SUB_CATEGORIES_LIST } from "@/lib/api/graphql/queries";
import useSingleRestaurant from "./useSingleRestaurant";

/**
 * Custom hook to fetch and process food data for a single restaurant
 */
const useSingleRestaurantFoodData = () => {
  // Get the single restaurant ID and slug
  const { restaurantId, restaurantSlug, shopType } = useSingleRestaurant();

  // Fetch restaurant data with categories and foods
  const { data: restaurantData, loading: restaurantLoading, error: restaurantError } = useQuery(
    GET_RESTAURANT_BY_ID_SLUG,
    {
      variables: { id: restaurantId, slug: restaurantSlug },
      skip: !restaurantId,
      fetchPolicy: "cache-and-network",
    }
  );

  // Fetch popular items
  const { data: popularItemsData, loading: popularItemsLoading, error: popularItemsError } = useQuery(
    GET_POPULAR_SUB_CATEGORIES_LIST,
    {
      variables: { restaurantId },
      skip: !restaurantId,
      fetchPolicy: "cache-and-network",
    }
  );

  // Extract all food items
  const allFoodItems = restaurantData?.restaurant?.categories?.flatMap(category => 
    category.foods.map(food => ({
      ...food,
      _id: food._id,
      title: food.title,
      description: food.description,
      image: food.image,
      category: category.title,
      categoryId: category._id,
      isOutOfStock: food.isOutOfStock || false,
    }))
  ) || [];

  // Find popular food items using the popularItems IDs
  const popularFoodIds = popularItemsData?.popularItems?.map(item => item.id) || [];
  const popularFoodItems = allFoodItems.filter(food => 
    popularFoodIds.includes(food._id)
  );

  // Extract categories with their foods
  const categories = restaurantData?.restaurant?.categories?.map(category => ({
    _id: category._id,
    name: category.title,
    image: category.foods[0]?.image || '',
    description: `${category.foods.length} items`,
    shopType: restaurantData?.restaurant?.shopType || "restaurant",
    foods: category.foods.map(food => ({
      ...food,
      category: category.title,
      categoryId: category._id,
    })),
  })) || [];

  return {
    allFoodItems,
    popularFoodItems,
    categories,
    loading: restaurantLoading || popularItemsLoading,
    error: restaurantError || popularItemsError,
    restaurant: restaurantData?.restaurant,
    restaurantId: restaurantData?.restaurant?._id,
    restaurantSlug: restaurantData?.restaurant?.slug,
    shopType: shopType
  };
};

export default useSingleRestaurantFoodData;
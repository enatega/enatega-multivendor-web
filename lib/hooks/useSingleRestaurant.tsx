// Hooks
import { useQuery } from "@apollo/client";
// Context
import { useConfig } from "@/lib/context/configuration/configuration.context";
// Queries
import { GET_RESTAURANT_LIST } from "@/lib/api/graphql/queries";

/**
 * Hook to fetch the single restaurant when in single-vendor mode
 * @returns {Object} Restaurant data, loading state, and error
 */
const useSingleRestaurant = () => {
  // Get multi-vendor configuration
  const { IS_MULTIVENDOR } = useConfig();

  // Only execute the query if in single-vendor mode
  const { data, loading, error } = useQuery(GET_RESTAURANT_LIST, {
    fetchPolicy: "cache-and-network",
    skip: IS_MULTIVENDOR, // Skip the query if in multi-vendor mode
  });

  // Get the first restaurant (in single-vendor mode, there should be only one)
  const restaurant = data?.restaurantList?.[0] || null;

  return {
    restaurant,
    restaurantId: restaurant?._id || "",
    restaurantSlug: restaurant?.slug || "",
    shopType: restaurant?.shopType || "restaurant",
    loading,
    error,
    isMultiVendor: IS_MULTIVENDOR,
  };
};

export default useSingleRestaurant;
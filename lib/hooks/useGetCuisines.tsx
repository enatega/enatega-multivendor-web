// Queries
import {
  // GET_CUISINES,
  NEAR_BY_RESTAURANTS_CUISINES,
} from "../api/graphql/queries";
// useQuery
import { useQuery } from "@apollo/client";
// interfaces
import { ICuisinesResponse, ICuisinesData } from "@/lib/utils/interfaces";

const useGetCuisines = (enabled = true) => {
  const { data, loading, error, networkStatus } = useQuery<ICuisinesResponse>(
    NEAR_BY_RESTAURANTS_CUISINES,
    {
      variables: {
        latitude: 33.6995,
        longitude: 73.0363,
        shopType: null,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled,
    }
  );

  let queryData = data;

  let restaurantCuisinesData: ICuisinesData[] = Array.isArray(
    data?.nearByRestaurantsCuisines
  )
    ? data.nearByRestaurantsCuisines.filter(
        (item) => item.shopType.toLowerCase() === "restaurant"
      )
    : [];

  let groceryCuisinesData: ICuisinesData[] = Array.isArray(
    data?.nearByRestaurantsCuisines
  )
    ? data.nearByRestaurantsCuisines.filter(
        (item) => item.shopType.toLowerCase() === "grocery"
      )
    : [];

  return {
    queryData,
    loading,
    error,
    networkStatus,
    restaurantCuisinesData,
    groceryCuisinesData,
  };
};

export default useGetCuisines;

// Queries
import { NEAR_BY_RESTAURANTS_PREVIEW } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
import {
  INearByRestaurantsPreviewData,
  IRestaurant,
} from "../utils/interfaces/restaurants.interface";

const useNearByRestaurantsPreview = (enabled=true) => {
  const { data, loading, error, networkStatus } =
    useQuery<INearByRestaurantsPreviewData>(NEAR_BY_RESTAURANTS_PREVIEW, {
      variables: {
        latitude: 33.6995,
        longitude: 73.0363,
        shopType: null,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled
    });

  let queryData = data?.nearByRestaurantsPreview?.restaurants;

  let groceriesData: IRestaurant[] =
    queryData?.filter((item) => item.shopType.toLowerCase() === "grocery") ||
    [];

  let restaurantsData: IRestaurant[] =
    queryData?.filter((item) => item.shopType.toLowerCase() === "restaurant") ||
    [];

  return {
    queryData,
    loading,
    error,
    networkStatus,
    groceriesData,
    restaurantsData,
  };
};

export default useNearByRestaurantsPreview;

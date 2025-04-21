// Queries
import { NEAR_BY_RESTAURANTS_PREVIEW } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
// interface
import {
  INearByRestaurantsPreviewData,
  IRestaurant,
} from "../utils/interfaces/restaurants.interface";
// context
import { useLocationContext } from "../context/Location/Location.context";

const useNearByRestaurantsPreview = (enabled = true) => {
  const { location } = useLocationContext();
  const userLatitude = Number(location?.latitude || "0")
  const userLongitude = Number(location?.longitude || "0")

  const { data, loading, error, networkStatus } =
    useQuery<INearByRestaurantsPreviewData>(NEAR_BY_RESTAURANTS_PREVIEW, {
      variables: {
        latitude: userLatitude,
        longitude: userLongitude,
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

// Queries
import { MOST_ORDER_RESTAURANTS } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
// interfaces
import {
  IMostOrderedRestaurantsData,
  IRestaurant,
} from "../utils/interfaces/restaurants.interface";
// context
import { useLocationContext } from "../context/Location/Location.context";

const useMostOrderedRestaurants = (enabled = true) => {
  const { location } = useLocationContext();
  const userLatitude = Number(location?.latitude || "0")
  const userLongitude = Number(location?.longitude || "0")

  const { data, loading, error, networkStatus } =
    useQuery<IMostOrderedRestaurantsData>(MOST_ORDER_RESTAURANTS, {
      variables: {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled,
    });

  let queryData = data?.mostOrderedRestaurantsPreview;

  let restaurantsData: IRestaurant[] =
    queryData?.filter(
      (item) => item?.shopType.toLowerCase() === "restaurant"
    ) || [];

  let groceriesData: IRestaurant[] =
    queryData?.filter((item) => item?.shopType.toLowerCase() === "grocery") ||
    [];

  return {
    queryData,
    loading,
    error,
    networkStatus,
    restaurantsData,
    groceriesData,
  };
};

export default useMostOrderedRestaurants;

"use client";
import { useLocationContext } from "@/lib/context/Location/Location.context";
import { GoogleMapsContext } from "@/lib/context/global/google-maps.context";
import useRestaurant from "@/lib/hooks/useRestaurant";
import { useCallback, useContext, useEffect, useState } from "react";
import useUser from "@/lib/hooks/useUser";
import { ILocation } from "@/lib/utils/interfaces/google.map.interface";
import { useUserAddress } from "@/lib/context/address/address.context";
import { onUseLocalStorage } from "@/lib/utils/methods/local-storage";

function useLocation() {
  // Hooks
  const { location, setLocation } = useLocationContext();
  const { userAddress } = useUserAddress();

  const { restaurant: restaurantId } = useUser();
  const { data: restaurantData } = useRestaurant(restaurantId || "");
  const { isLoaded } = useContext(GoogleMapsContext);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [isCheckingCache, setIsCheckingCache] = useState(true);

  const origin = {
    lat: Number(restaurantData?.restaurant?.location.coordinates[1]) || 0,
    lng: Number(restaurantData?.restaurant?.location.coordinates[0]) || 0,
  };

  const destination = {
    lat: Number(userAddress?.location?.coordinates[1]) || 0,
    lng: Number(userAddress?.location?.coordinates[0]) || 0,
  };
  const store_user_location_cache_key = `${origin?.lat},${origin?.lng}_${destination?.lat},${destination?.lng}`;

  const directionsCallback = useCallback(
    (result: google.maps.DirectionsResult | null, status: string) => {
      if (status === "OK" && result) {
        setDirections(result);
        onUseLocalStorage(
          "save",
          store_user_location_cache_key,
          JSON.stringify(result)
        );
      } else {
        console.error("Directions request failed due to", status);
      }
    },
    []
  );

  useEffect(() => {
    if (!location) {
      const localStorageLocation = JSON.parse(
        localStorage.getItem("location") || "null"
      ) as ILocation;
      if (localStorageLocation) {
        setLocation(localStorageLocation);
      }
    }
  }, []);

  return {
    isLoaded,
    origin,
    directions,
    setDirections,
    isCheckingCache,
    setIsCheckingCache,
    destination,
    directionsCallback,
    store_user_location_cache_key,
  };
}

export default useLocation;

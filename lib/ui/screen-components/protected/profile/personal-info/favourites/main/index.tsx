"use client";

import HeaderFavourite from "../header";
import type React from "react";
import { gql, useQuery } from "@apollo/client";
import { FavouriteRestaurant } from "@/lib/api/graphql/queries/profile";
import { IUserFavouriteQueryResponse } from "@/lib/utils/interfaces/favourite.restaurants.interface";
import CardSkeletonGrid from "@/lib/ui/useable-components/card-skelton-grid";
import FavouriteCardsGrid from "@/lib/ui/useable-components/favourite-cards-grid";
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";
import { useRouter } from "next/navigation";
import FavoritesEmptyState from "@/lib/ui/useable-components/favorites-empty-state";
// Query
const FAVOURITERESTAURANT = gql`
  ${FavouriteRestaurant}
`;

const FavouriteProducts = () => {

  const router= useRouter()
  // Get Fav Restaurants by using the query
  const {
    data: FavouriteRestaurantsData,
    loading: isFavouriteRestaurantsLoading,
  } = useQuery<IUserFavouriteQueryResponse>(FAVOURITERESTAURANT, {
    fetchPolicy: "network-only",
  });
  
  //Handlers
  // Handle See All Click
  const handleSeeAllClick = useDebounceFunction(() => {
    console.log("See all clicked");

    // use route state to handle fetching all favourites Restaurants on that page
    router.push("/restaurants?q=favourites");
  }, 500);

  // use debouncefunction if user click multiple times at once it will call function only 1 time
  const handleClickFavRestaurant = useDebounceFunction(
    (FavRestaurantId: string | undefined) => {
      console.log(FavRestaurantId, "fav restaurant id on main component of fav restaurant");
      console.log("Navigating Restaurant Details screen");
      router.push(`/restaurants/${FavRestaurantId}`);
    },
    500 // Debounce time in milliseconds
  );

  return (
    <div className="w-full py-6 flex flex-col gap-6">
      <HeaderFavourite
        title="Your Favourites"
        onSeeAllClick={handleSeeAllClick}
      />
      {isFavouriteRestaurantsLoading ? (
        <CardSkeletonGrid count={4} />
      ) : FavouriteRestaurantsData?.userFavourite && FavouriteRestaurantsData.userFavourite.length > 0 ? (
        <FavouriteCardsGrid items={FavouriteRestaurantsData.userFavourite}
        handleClickFavRestaurant={handleClickFavRestaurant}
        />
      ) : (
        <FavoritesEmptyState/>
      )}
    </div>
  );
};

export default FavouriteProducts;

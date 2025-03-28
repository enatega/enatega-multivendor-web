"use client";

import HeaderFavourite from "../header";
import type React from "react";
import { gql, useQuery } from "@apollo/client";
import { FavouriteRestaurant } from "@/lib/api/graphql/queries/profile";
import { IUserFavouriteQueryResponse } from "@/lib/utils/interfaces/favourite.restaurants.interface";
import CardSkeletonGrid from "@/lib/ui/useable-components/card-skelton-grid";
import FavouriteCardsGrid from "@/lib/ui/useable-components/favourite-cards-grid";

// Query
const FAVOURITERESTAURANT = gql`
  ${FavouriteRestaurant}
`;

const FavouriteProducts = () => {
  // Get Fav Restaurants by using the query
  const {
    data: FavouriteRestaurantsData,
    loading: isFavouriteRestaurantsLoading,
  } = useQuery<IUserFavouriteQueryResponse>(FAVOURITERESTAURANT, {
    fetchPolicy: "network-only",
  });

  // Handle See All Click
  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };


  return (
    <div className="w-full py-6 flex flex-col gap-6">
      <HeaderFavourite
        title="Your Favourites"
        onSeeAllClick={handleSeeAllClick}
      />
      {isFavouriteRestaurantsLoading ? (
        <CardSkeletonGrid count={4} />
      ) : FavouriteRestaurantsData?.userFavourite?.length ? (
        <FavouriteCardsGrid items={FavouriteRestaurantsData?.userFavourite} />
      ) : (
        <div className="text-center text-gray-500">
          No favourite restaurants found
        </div>
      )}
    </div>
  );
};

export default FavouriteProducts;

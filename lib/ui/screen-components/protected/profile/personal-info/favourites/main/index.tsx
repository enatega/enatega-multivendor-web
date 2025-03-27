"use client";

import FavoriteCard from "@/lib/ui/useable-components/favourite-card";
import HeaderFavourite from "../header";
import type React from "react";
import { gql, useQuery } from "@apollo/client";
import { FavouriteRestaurant } from "@/lib/api/graphql/queries/profile";
import {
  IFavouriteRestaurantItem,
  IUserFavouriteQueryResponse,
} from "@/lib/utils/interfaces/profile.interface";
import CustomRestaurantCardSkeleton from "@/lib/ui/useable-components/custom-skeletons/restaurant.card.skeleton";

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
    fetchPolicy: "cache-and-network",
  });

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };

  // If loading, render skeletons
  if (isFavouriteRestaurantsLoading) {
    return (
      <div className="w-full py-6 flex flex-col gap-6">
        <HeaderFavourite
          title="Your Favourites"
          onSeeAllClick={handleSeeAllClick}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full">
              <CustomRestaurantCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If no data, render empty state
  if (!FavouriteRestaurantsData?.userFavourite?.length) {
    return (
      <div className="w-full py-6 flex flex-col gap-6">
        <HeaderFavourite
          title="Your Favourites"
          onSeeAllClick={handleSeeAllClick}
        />
        <div className="text-center text-gray-500">
          No favourite restaurants found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 flex flex-col gap-6">
      <HeaderFavourite
        title="Your Favourites"
        onSeeAllClick={handleSeeAllClick}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {FavouriteRestaurantsData.userFavourite
          .slice(0, 4)
          .map((item: IFavouriteRestaurantItem) => (
            <div key={item._id} className="w-full">
              <FavoriteCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FavouriteProducts;
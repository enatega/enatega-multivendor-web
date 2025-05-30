// lib/ui/screen-components/protected/profile/personal-info/favouritesSingleVendor/main/index.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER_FAVORITE_FOODS } from "@/lib/api/graphql/queries/foods";
import FavoriteFoodsGrid from "@/lib/ui/useable-components/favourite-food-Grid";
import CardSkeletonGrid from "@/lib/ui/useable-components/card-skelton-grid";
import HeaderSingleVendorFavourite from "../header";
import FavoritesEmptyState from "@/lib/ui/useable-components/favorites-empty-state";
import useDebounceFunction from "@/lib/hooks/useDebounceForFunction";
import { useConfig } from "@/lib/context/configuration/configuration.context";

const FavouriteSingleVendorProducts = () => {
  const router = useRouter();
  const {isMultiVendor} = useConfig()

  // Fetch favorite food items
  const {
    data: favoriteFoodsData,
    loading: isFavoriteFoodsLoading,
  } = useQuery(GET_USER_FAVORITE_FOODS, {
    fetchPolicy: "network-only",
  });


  // Navigate to see all favorites
  const handleSeeAllClick = useDebounceFunction(() => {
    if(!isMultiVendor){
      router.push("/seeAllFavorite")
    }else {
      router.push("/see-all/favorite-foods");
    }
  }, 500);

  function handleFoodClick(): void {
    console.log("Food Card Clicked");
  }

  return (
    <div className="w-full py-6 flex flex-col gap-6">
      <HeaderSingleVendorFavourite
        title="Your Favorite Foods"
        onSeeAllClick={handleSeeAllClick}
      />
      
      {isFavoriteFoodsLoading ? (
        <CardSkeletonGrid count={4} />
      ) : favoriteFoodsData?.userFavoriteFoods && favoriteFoodsData.userFavoriteFoods.length > 0 ? (
        <FavoriteFoodsGrid 
          items={favoriteFoodsData.userFavoriteFoods}
          onFoodClick={handleFoodClick}
        />
      ) : (
        <FavoritesEmptyState />
      )}
    </div>
  );
};

export default FavouriteSingleVendorProducts;
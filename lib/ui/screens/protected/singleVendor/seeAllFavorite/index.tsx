// lib/ui/screens/protected/singleVendor/seeAllFavorite/index.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER_FAVORITE_FOODS } from "@/lib/api/graphql/queries/foods";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import FavoriteFoodsGrid from "@/lib/ui/useable-components/favourite-food-Grid";
import CardSkeletonGrid from "@/lib/ui/useable-components/card-skelton-grid";
import FavoritesEmptyState from "@/lib/ui/useable-components/favorites-empty-state";

export default function SeeAllFavoriteFoodsScreen() {
  const router = useRouter();
  const [, setShowDialog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch favorite food items
  const {
    data: favoriteFoodsData,
    loading: isFavoriteFoodsLoading,
  } = useQuery(GET_USER_FAVORITE_FOODS, {
    fetchPolicy: "network-only",
  });

  // Filter foods based on search term
  const filteredItems = favoriteFoodsData?.userFavoriteFoods
    ? favoriteFoodsData.userFavoriteFoods.filter(item => 
        searchTerm === "" || 
        item.food.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.food.description && item.food.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handle food click to show detail modal
  const handleFoodClick = (food) => {
    setShowDialog({
      ...food.food,
      restaurant: food.restaurant._id,
    });
  };

  // Close food detail modal
  // Go back handler
  const handleBack = () => {
    router.back();
  };

  return (
    <PaddingContainer>
      {/* Header with Back Button and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 mb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={handleBack}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">All Favorite Foods</h1>
        </div>
        
        {/* Search Box */}
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search favorite items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Content */}
      {isFavoriteFoodsLoading ? (
        <CardSkeletonGrid count={8} />
      ) : favoriteFoodsData?.userFavoriteFoods && favoriteFoodsData.userFavoriteFoods.length > 0 ? (
        filteredItems.length > 0 ? (
          <FavoriteFoodsGrid 
            items={filteredItems}
            onFoodClick={handleFoodClick}
            type="seeAllFavorites" // Show all items
          />
        ) : (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-700">No results found</p>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )
      ) : (
        <div className="py-10">
          <FavoritesEmptyState />
        </div>
      )}
    </PaddingContainer>
  );
}
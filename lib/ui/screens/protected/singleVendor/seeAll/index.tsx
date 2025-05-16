"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import FoodCard from "@/lib/ui/useable-components/foodCard";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import EmptySearch from "@/lib/ui/useable-components/empty-search-results";

// Hooks
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import { IFood } from "@/lib/utils/interfaces";

// Transform food items to match the format expected by the FoodCard component
function transformFoodForCard(food, restaurant, categoryId) {
  return {
    _id: food._id,
    name: food.title,
    description: food.description,
    image: food.image,
    cuisines: [food.category || "Food Item"],
    deliveryTime: restaurant?.deliveryTime || 25,
    reviewAverage: restaurant?.reviewData?.ratings || 4.5,
    isAvailable: !food.isOutOfStock,
    isFavourite: food.isFavourite || false,
    variations: food.variations,
    shopType: restaurant?.shopType || "restaurant",
    // Add the necessary IDs for the favorite functionality
    restaurant: restaurant?._id,
    restaurantId: restaurant?._id,
    category: categoryId,
    categoryId: categoryId,
    // Keep the original food object for reference
    originalFood: food,
  };
}

export default function SeeAllSingleVendorScreen() {
  // Get URL parameters
  const router = useRouter();
  
  // State
  const [showDialog, setShowDialog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { allFoodItems, loading, error, restaurant, categories } = useSingleRestaurantFoodData();
  
  // Update food items when data is loaded
  useEffect(() => {
    if (allFoodItems?.length && categories?.length) {
      // Prepare all transformed food items
      const transformedItems = allFoodItems.map(food => {
        // Find the category ID for this food item
        let categoryId;
        for (const category of categories) {
          if (category.foods.some(f => f._id === food._id)) {
            categoryId = category._id;
            break;
          }
        }
        
        return transformFoodForCard(food, restaurant, categoryId);
      });
      
      setFoodItems(transformedItems);
      setFilteredItems(transformedItems);
    }
  }, [allFoodItems, categories, restaurant]);
  
  // Handle search filtering
 useEffect(() => {
  if (searchTerm.trim() === '') {
    setFilteredItems(foodItems);
  } else {
    const term = searchTerm.toLowerCase();
    const filtered = foodItems.filter((item: IFood) => 
      (item?.name?.toLowerCase().includes(term) || item?.title?.toLowerCase().includes(term)) || 
      (item.description && item.description.toLowerCase().includes(term))
    );
    setFilteredItems(filtered);
  }
}, [searchTerm, foodItems]);
  
  // Handle update modal state
  const handleUpdateIsModalOpen = (value, id) => {
    setIsModalOpen({ value, id });
  };
  
  // Handle food item click
  const handleFoodClick = (food) => {
    if (!food.isAvailable) {
      handleUpdateIsModalOpen(true, food._id);
      return;
    }
    
    setShowDialog({
      ...(food.originalFood || food),
      restaurant: restaurant?._id,
    });
  };
  
  // Handle modal close
  const handleCloseFoodModal = () => {
    setShowDialog(null);
  };
  
  // Back button handler
  const handleBack = () => {
    router.back();
  };
  
  // Loading state
  if (loading) {
    return (
      <PaddingContainer>
        <div className="flex items-center gap-4 mt-4 mb-6">
          <button 
            onClick={handleBack}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">All Menu Items</h1>
        </div>
        <SliderSkeleton />
      </PaddingContainer>
    );
  }
  
  // Error state or no data
  if (error || !foodItems.length) {
    return (
      <PaddingContainer>
        <div className="flex items-center gap-4 mt-4 mb-6">
          <button 
            onClick={handleBack}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">All Menu Items</h1>
        </div>
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="text-center py-6 text-gray-500 flex flex-col items-center justify-center">
            <EmptySearch />
            <p className="text-lg mt-4">No items available</p>
          </div>
          <Button
            label="Go Back"
            className="bg-[#0EA5E9] text-white px-4 py-2 rounded-md"
            onClick={handleBack}
          />
        </div>
      </PaddingContainer>
    );
  }
  
  return (
    <>
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
            <h1 className="text-2xl font-bold">All Menu Items</h1>
          </div>
          
          {/* Search Box */}
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        
        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-6 text-gray-500 flex flex-col items-center justify-center">
            <EmptySearch />
            <p className="text-lg mt-4">No items found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
            {filteredItems.map((food, index) => (
              <FoodCard
                key={index}
                item={food}
                isModalOpen={isModalOpen}
                handleUpdateIsModalOpen={handleUpdateIsModalOpen}
                onFoodClick={handleFoodClick}
              />
            ))}
          </div>
        )}
      </PaddingContainer>
      
      {/* Food Item Detail Modal */}
      <Dialog
        visible={!!showDialog}
        className="mx-3 sm:mx-4 md:mx-0"
        onHide={handleCloseFoodModal}
        showHeader={false}
        contentStyle={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          padding: "0px",
        }}
        style={{ borderRadius: "1rem" }}
      >
        {showDialog && (
          <FoodItemDetail
            foodItem={showDialog}
            addons={restaurant?.addons}
            options={restaurant?.options}
            restaurant={restaurant}
            onClose={handleCloseFoodModal}
          />
        )}
      </Dialog>
    </>
  );
}
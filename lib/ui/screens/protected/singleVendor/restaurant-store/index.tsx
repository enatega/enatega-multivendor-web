"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { FoodItems, PopularItems, CategoryCards } from "@/lib/ui/screen-components/protected/single-vendor";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import SingleVendorBannerSection from "@/lib/ui/screen-components/protected/single-vendor/banner-section";
import useUser from "@/lib/hooks/useUser";

export default function RestaurantSingleVendorScreen() {
  // State for the food detail modal
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  
  // Get restaurant data to pass to food detail modal
  const { restaurant } = useSingleRestaurantFoodData();
  
  // Get user context to transform cart items
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();
  
  // Transform cart items when restaurant data is loaded
  useEffect(() => {
    if (restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [restaurant, cart.length, transformCartWithFoodInfo, updateCart]);

  // Function to handle food item click
  const handleFoodClick = (food) => {
    if (!food || food.isAvailable === false) return;
    
    setSelectedFood({
      ...food.originalFood || food,
      restaurant: restaurant?._id,
    });
    setShowDialog(true);
  };

  // Function to close the food item modal
  const handleCloseFoodModal = () => {
    setShowDialog(false);
    setSelectedFood(null);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 mx-auto md:w-[90%] mt-6">
        <div>
          {/* Pass the same food click handler to the banner section */}
          <SingleVendorBannerSection onFoodClick={handleFoodClick} />
        </div>
        <div>
          <FoodItems onFoodClick={handleFoodClick} />
        </div>
        <div>
          <PopularItems onFoodClick={handleFoodClick} />
        </div>
        {/* <div>
          <CategoryItems onFoodClick={handleFoodClick} />
        </div> */}
        <div>
          <CategoryCards />
        </div>
      </div>

      {/* Shared Food Item Detail Modal */}
      <Dialog
        visible={showDialog}
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
        {selectedFood && (
          <FoodItemDetail
            foodItem={selectedFood}
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
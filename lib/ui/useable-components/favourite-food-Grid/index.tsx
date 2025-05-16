"use client"
// lib/ui/useable-components/favourite-food-grid/index.tsx
import React from "react";
import { twMerge } from "tailwind-merge";
import FavoriteFoodCard from "../favourite-food-card";

interface IFavoriteFoodsGridProps {
  items: any[];
  onFoodClick: (food: any) => void;
  type?: string | null;
}

const FavoriteFoodsGrid: React.FC<IFavoriteFoodsGridProps> = ({ 
  items, 
  onFoodClick, 
  type = null 
}) => {
  // Force it to show all items if specifically "seeAllFavorites" is passed
  const displayItems = type === "seeAllFavorites" ? items : items.slice(0, 4);

  return (
    <div className={twMerge(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    )}>
      {displayItems.map((item) => (
        <div key={item.food._id} className="w-full">
          <FavoriteFoodCard 
            item={item} 
            onClick={() => onFoodClick(item)} 
          />
        </div>
      ))}
    </div>
  );
};

export default FavoriteFoodsGrid;
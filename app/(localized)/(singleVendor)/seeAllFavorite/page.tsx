// lib/ui/screens/protected/singleVendor/seeAllFavorite/page.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the SeeAllFavoriteFoodsScreen component with no SSR
const SeeAllFavoriteFoodsScreen = dynamic(
  () => import("../../../../lib/ui/screens/protected/singleVendor/seeAllFavorite/index"),
  { ssr: false }
);

export default function SeeAllFavoriteFoodsPage() {
  return (
    <SeeAllFavoriteFoodsScreen/>
  );
}
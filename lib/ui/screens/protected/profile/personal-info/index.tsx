"use client";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import { FavouriteProducts, PersonalInfoMain } from "@/lib/ui/screen-components/protected/profile";
import FavouriteSingleVendorProducts from "@/lib/ui/screen-components/protected/profile/personal-info/favouritesSingleVendor/main";

export default function PersonalInfoScreen() {
  const { IS_MULTIVENDOR } = useConfig();

  return (
    <div className="flex flex-col space-y-10 my-10">
      {/* Main Profile */}
      <PersonalInfoMain />
      
      {/* Conditional rendering based on IS_MULTIVENDOR */}
      {IS_MULTIVENDOR ? (
        <FavouriteProducts />
      ) : (
       <FavouriteSingleVendorProducts/>
      )}
    </div>
  );
}
import {
  DiscoveryBannerSection,
  RestaurantsNearYou,
  MostOrderedRestaurants,
  GroceryList,
  TopGroceryPicks,
  TopRatedVendors,
  PopularRestaurants,
  PopularStores,
  OrderItAgain
} from "@/lib/ui/screen-components/protected/home";
import CuisinesSection from "@/lib/ui/useable-components/cuisines-section";

export default function DiscoveryScreen() {
  return (
    <>
      <DiscoveryBannerSection />
      <OrderItAgain />
      <MostOrderedRestaurants />
      <CuisinesSection restaurant={true} title="Restaurant cuisines"/>
      <RestaurantsNearYou />
      <CuisinesSection restaurant={false} title="Grocery cuisines"/>
      <GroceryList />
      <TopGroceryPicks />
      <TopRatedVendors />
      <PopularRestaurants />
      <PopularStores />
    </>
  );
}

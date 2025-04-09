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
import GroceryCuisines from "@/lib/ui/useable-components/grocery-cuisines";
import RestaurantCuisines from "@/lib/ui/useable-components/restaurant-cuisines";

export default function DiscoveryScreen() {
  return (
    <>
      <DiscoveryBannerSection />
      <OrderItAgain />
      <MostOrderedRestaurants />
      <RestaurantCuisines />
      <RestaurantsNearYou />
      <GroceryCuisines />
      <GroceryList />
      <TopGroceryPicks />
      <TopRatedVendors />
      <PopularRestaurants />
      <PopularStores />
    </>
  );
}

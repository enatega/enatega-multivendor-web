import {
  DiscoveryBannerSection,
  RestaurantsNearYou,
  MostOrderedRestaurants,
  GroceryList,
  TopGroceryPicks,
  RestaurantCuisines,
  GroceryCuisines,
  TopRatedVendors,
  PopularRestaurants,
  PopularStores
} from "@/lib/ui/screen-components/protected/home";
import OrderItAgain from "@/lib/ui/screen-components/protected/home/discovery/order-it-again";

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

// heading section
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";
// restaurant cuisines component
import RestaurantCuisines from "@/lib/ui/useable-components/restaurant-cuisines";
// restaurants main section
import { RestaurantsMainSection } from "@/lib/ui/screen-components/protected/home/restaurants";

export default function RestaurantsScreen() {
  return (
    <>
      <HomeHeadingSection title={"Restaurants near you"}/>
      <RestaurantCuisines title={"Browse categories"} />
      <RestaurantsMainSection />
    </>
  );
}

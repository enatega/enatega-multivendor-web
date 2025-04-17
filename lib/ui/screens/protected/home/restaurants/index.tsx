// heading section
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";
// restaurant cuisines component
import CuisinesSection from "@/lib/ui/useable-components/cuisines-section";
// restaurants main section
import { RestaurantsMainSection } from "@/lib/ui/screen-components/protected/home/restaurants";

export default function RestaurantsScreen() {
  return (
    <>
      <HomeHeadingSection title={"Restaurants near you"}/>
      <CuisinesSection restaurant={true} title={"Browse categories"} />
      <RestaurantsMainSection />
    </>
  );
}

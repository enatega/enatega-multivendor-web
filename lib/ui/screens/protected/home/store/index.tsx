// heading section
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";
// restaurant cuisines component
import GroceryCuisines from "@/lib/ui/useable-components/grocery-cuisines";
// restaurants main section
import { StoreMainSection } from "@/lib/ui/screen-components/protected/home/store";


export default function StoreScreen() {
  return (
    <>
      <HomeHeadingSection title={"Stores and groceries near you"} />
      <GroceryCuisines title={"Browse categories"} />
      <StoreMainSection />
    </>
  );
}

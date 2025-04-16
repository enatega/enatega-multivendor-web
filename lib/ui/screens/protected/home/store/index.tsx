// heading section
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";
// restaurant cuisines component
import CuisinesSection from "@/lib/ui/useable-components/cuisines-section";
// restaurants main section
import { StoreMainSection } from "@/lib/ui/screen-components/protected/home/store";


export default function StoreScreen() {
  return (
    <>
      <HomeHeadingSection title={"Stores and groceries near you"} />
      <CuisinesSection restaurant={false} title={"Browse categories"} />
      <StoreMainSection />
    </>
  );
}

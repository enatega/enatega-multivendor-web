import { FavouriteProducts, PersonalInfoMain } from "@/lib/ui/screen-components/protected/profile";

  export default function PersonalInfoScreen() {
    return (
      <>
        {/* Main Profile */}
       <PersonalInfoMain/>

       {/* Favourites Items  */}
       <FavouriteProducts/>
      </>
    );
  }
  
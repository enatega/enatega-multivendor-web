import FavoriteCard from "@/lib/ui/useable-components/favourite-card";
import { IFavouriteRestaurantItem } from "@/lib/utils/interfaces/favourite.restaurants.interface";

interface IFavouriteGridProps {
  items: IFavouriteRestaurantItem[];
  handleClickFavRestaurant: (id:string|undefined)=> void
}

const FavouriteCardsGrid: React.FC<IFavouriteGridProps> = ({ items,handleClickFavRestaurant }) => {

  const handleClick = (FavRestaurantId:string|undefined)=>{
    handleClickFavRestaurant?.(FavRestaurantId)
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {items.slice(0, 4).map((item) => (
        <div key={item._id} className="w-full" 
        onClick={()=>handleClick(item._id)}
        >
          <FavoriteCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default FavouriteCardsGrid;

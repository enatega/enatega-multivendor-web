import type React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBicycle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { IFavouriteRestaurantItem } from "@/lib/utils/interfaces/profile.interface";
import TextComponent from "../text-field";

interface IFavoriteCardProps {
  item: IFavouriteRestaurantItem;
}

const FavoriteCard: React.FC<IFavoriteCardProps> = ({ item }) => {
  return (
    <div className="relative p-0 border border-gray-200 rounded-lg shadow-lg w-full h-[308px] cursor-pointer">
      <hr className="border-t-2 border-gray-300 border-dashed my-2 absolute bottom-10 w-full" />
      <div className="flex flex-col h-full w-full">
        <div className="relative w-full h-52 overflow-hidden rounded-t-lg">
          <Image
            unoptimized
            width={40}
            height={40}
            src={item?.image || "https://placehold.co/600x400"}
            alt={item?.name || "N/A"}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <TextComponent text={item?.name || "N/A"} className="text-lg font-medium text-gray-800 mb-1" />
          <TextComponent text={item?.categories?.[0]?.title || "N/A"} className="text-sm text-gray-600 mb-6" />
          <div className="flex items-center justify-start mt-auto">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faBicycle}
                className="text-gray-500 mr-1"
              />
              <span className="text-sm text-gray-700 mr-3">$2</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
              <span className="text-sm text-gray-700">{item?.reviewAverage || "9.2"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;

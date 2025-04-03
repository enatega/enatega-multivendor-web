import type React from "react";
import TextComponent from "../text-field";
import ImageComponent from "../card-image-component";
// import IconText from "../icon-text";
import { IFavoriteCardProps } from "@/lib/utils/interfaces/favourite.restaurants.interface";
import IconWithTitle from "../icon-with-title";
import { CycleSvg, FaceSvg } from "@/lib/utils/assets/svg";



const FavoriteCard: React.FC<IFavoriteCardProps> = ({ item }) => {
  return (
    <div className="relative p-0 border border-gray-200 rounded-lg shadow-lg w-full h-[308px] cursor-pointer">
      <hr className="border-t-2 border-gray-300 border-dashed my-2 absolute bottom-10 w-full" />
      <div className="flex flex-col h-full w-full">
        <div className="relative w-full h-52 overflow-hidden rounded-t-lg">
          <ImageComponent src={item?.image} alt={item?.name} />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <TextComponent text={item?.name || "N/A"} className="text-lg font-medium text-gray-800 mb-1" />
          <TextComponent text={item?.categories?.[0]?.title || "N/A"} className="text-sm text-gray-600 mb-6" />
          <div className="flex items-center justify-start mt-auto gap-4">
            {/* <IconText icon={faBicycle} text="$2" className="mr-3 text-gray-500" /> */}
            <IconWithTitle logo={CycleSvg} title={`$ ${item?.tax ?? "0"}`} />
            <IconWithTitle logo={FaceSvg} title={String(item?.reviewAverage) || "9.2"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;

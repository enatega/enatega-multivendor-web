"use client";

import Image from "next/image";
import React from "react";
// import { ClockSvg, CycleSvg, FaceSvg } from "@/lib/utils/assets/svg";
// import IconWithTitle from "../icon-with-title";
import { ICuisinesCardProps } from "@/lib/utils/interfaces";
import { useRouter } from "next/navigation";

const SquareCard: React.FC<ICuisinesCardProps> = ({ item, cuisines=false, showLogo=false }) => {

  const router = useRouter();
  const getImgSrc = showLogo ? item?.logo : item?.image
  
  return (
    <div
      className="max-w-[402px] max-h-[272px] md:w-[135px] lg:w-[120px] xl:w-[175px] 2xl:w-[360px] rounded-md shadow-md m-2 mb-6 cursor-pointer hover:scale-105 hover:opacity-95 hover:shadow-lg transition-transform duration-500"
      onClick={() => {
        router.push(`/restaurant/${item?.name}/${item._id}`); // the root route may change based on store or grocery
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[120px]">
        <Image
          src={`${getImgSrc ||'https://res.cloudinary.com/do1ia4vzf/image/upload/v1740680733/food/ehmip6g5ddtmkygpw7he.webp'}`}
          alt={item?.name}
          fill
          className="object-cover rounded-t-md"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        <div className="flex flex-row justify-between items-center relative">
          <div className="w-[70%]">
            <p className="text-sm lg:text-base text-[#374151] font-semibold line-clamp-1">
              {item?.name}
            </p>
            {cuisines && (
            <p className="text-xs xl:text-sm text-[#4B5563] font-light line-clamp-1">
              {item?.description}
            </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareCard;

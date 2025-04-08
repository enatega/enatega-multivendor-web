"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

// Assets
import { ClockSvg, CycleSvg, FaceSvg } from "@/lib/utils/assets/svg";
import IconWithTitle from "../icon-with-title";

// Interface
import { ICardProps } from "@/lib/utils/interfaces";

const Card: React.FC<ICardProps> = ({ item }) => {
  const router = useRouter();

  return (
    <div
      className="max-w-[402px] max-h-[272px] md:w-[185px] lg:w-[188px] xl:w-[276px] 2xl:w-[402px] rounded-md shadow-md m-2 mb-6 cursor-pointer hover:scale-105 hover:opacity-95 hover:shadow-lg transition-transform duration-500"
      onClick={() => {
        // const params = new URLSearchParams({ name: item?.name, id: item._id });
        // router.push(`/restaurant?${params.toString()}`);

        router.push(`/restaurant/${item?.slug}/${item._id}`); // the root route may change based on store or grocery
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[140px]">
        <Image
          src={item?.image}
          alt={item?.name}
          fill
          className="object-cover rounded-t-md"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between flex-grow">
        {/* Name & Cuisines */}
        <div className="flex flex-row justify-between items-center relative border-b border-dashed pb-1">
          <div className="w-[70%]">
            <p className="text-base lg:text-lg text-[#374151] font-semibold line-clamp-1">
              {item?.name}
            </p>
            <p className="text-xs xl:text-sm text-[#4B5563] font-light line-clamp-1">
              {item?.cuisines[0]}
            </p>
          </div>
          {/* Delivery Time */}
          <div className="bg-[#F3FFEE] rounded-md flex items-center justify-center p-2 w-[60px] h-[50px]">
            <p className="text-xs text-[#5AC12F] font-light lg:font-normal text-center">
              {`${item?.deliveryTime > 5 ? item?.deliveryTime - 5 : item?.deliveryTime} - ${item?.deliveryTime + 5}`}{" "}
              <br /> min
            </p>
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex flex-row justify-between w-[80%] sm:w-[100%] lg:w-[70%] pt-1">
          <IconWithTitle
            logo={()=> <ClockSvg isBlue={true} />}
            title={item?.deliveryTime + " mins"}
            isBlue={true}
          />
          <IconWithTitle logo={CycleSvg} title={item?.tax} />
          <IconWithTitle logo={FaceSvg} title={item?.reviewAverage} />
        </div>
      </div>
    </div>
  );
};

export default Card;

"use client";

// core
import Image from "next/image";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

// Assets
import { ClockSvg, CycleSvg, FaceSvg } from "@/lib/utils/assets/svg";
import IconWithTitle from "../icon-with-title";

// Interface
import { ICardProps } from "@/lib/utils/interfaces";

const Card: React.FC<ICardProps> = ({ item }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`rounded-md shadow-md cursor-pointer hover:scale-102 hover:opacity-95 transition-transform duration-500 max-h-[272px] w-[96%] ml-[2%] ${pathname === "/restaurants" || pathname === "/store" ? "my-[2%]" : "my-[4%]"}`}
      onClick={() => {
        // const params = new URLSearchParams({ name: item?.name, id: item._id });
        // router.push(`/restaurant?${params.toString()}`);

        router.push(
          `/${item.shopType === "restaurant" ? "restaurant" : "store"}/${item?.slug}/${item._id}`
        ); // the root route may change based on store or grocery

        // onUseLocalStorage("save", "restaurant", item._id);
        // onUseLocalStorage("save", "restaurant-slug", item.slug);
        // onUseLocalStorage(
        //   "save",
        //   "currentShopType",
        //   item.shopType === "restaurant" ? "restaurant" : "store"
        // );
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[160px]">
        <Image
          src={item?.image}
          alt={item?.name}
          fill
          className="object-cover rounded-t-md"
          unoptimized
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
          <div className="bg-[#F3FFEE] rounded-md flex items-center justify-center px-2 py-2">
            <p className="text-xs text-[#5AC12F] font-light lg:font-normal text-center">
              {`${item?.deliveryTime}`} min
              {/* {`${item?.deliveryTime > 5 ? item?.deliveryTime - 5 : item?.deliveryTime} - ${item?.deliveryTime + 5}`}{" "} */}
              {/* <br /> min */}
            </p>
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex flex-row justify-between w-[80%] sm:w-[100%] lg:w-[75%] pt-1">
          <IconWithTitle
            logo={() => <ClockSvg isBlue={true} />}
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

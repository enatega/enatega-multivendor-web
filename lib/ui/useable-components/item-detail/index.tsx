import Divider from "../custom-divider";
// import { IFoodItemDetalComponentProps } from "@/lib/utils/interfaces";

import { ITEM_SECTIONS } from "@/lib/utils/dummy";
import {
  IAddon,
  IFoodItemDetalComponentProps,
  IOption,
  ISelectedVariation,
  Option,
} from "@/lib/utils/interfaces";
import { useEffect, useState } from "react";

// Components
import { ItemDetailSection } from "./item-section";
import { ItemDetailAddonSection } from "./item-addon-section";

export default function FoodItemDetail(props: IFoodItemDetalComponentProps) {
  const { foodItem, addons, options } = props;

  const [selectedVariation, setSelectedVariation] =
    useState<ISelectedVariation | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // Single
  const [selectedAddons, setSelectedAddons] = useState<IAddon[] | null>(null); // Multiple

  // Use Effect
  useEffect(() => {
    setSelectedVariation({
      ...foodItem?.variations[0],
      addons:
        foodItem?.variations[0]?.addons?.map((fa) => {
          const addon = addons?.find((a) => a._id === fa);

          if (!addon) {
            return {
              _id: "", // Default _id if not found
              options: [], // Default empty options array
              title: "", // Default title if missing
              description: "", // Default description if missing
              quantityMinimum: 0, // Default quantity minimum
              quantityMaximum: 0, // Default quantity maximum
            };
          }

          const addonOptionsMap = new Map(options?.map((o) => [o._id, o]));

          const addonOptions =
            addon?.options
              ?.map((aoId) => addonOptionsMap.get(aoId))
              .filter((option): option is IOption => option !== undefined) ||
            [];

          return {
            _id: addon._id || "", // Ensure _id is set to a non-undefined value
            title: addon.title || "", // Default title if missing
            description: addon.description || "", // Default description if missing
            quantityMinimum: addon.quantityMinimum || 0, // Default quantityMinimum if missing
            quantityMaximum: addon.quantityMaximum || 0, // Default quantityMaximum if missing
            options: addonOptions, // Mapped options, with no undefined values
          };
        }) || [],
      // Ensure the top-level properties also have default values to avoid undefined
      _id: foodItem?.variations[0]?._id || "", // Default empty string for _id if undefined
      title: foodItem?.variations[0]?.title || "", // Default empty string for title if undefined
      price: foodItem?.variations[0]?.price || 0, // Default 0 for price if undefined
      discounted: foodItem?.variations[0]?.discounted || false, // Default false for discounted if undefined
    });

    // return () => {
    //   setSelectedAddons([]);
    //   setSelectedVariation(null);
    // };
  }, [foodItem, addons, options]);

  return (
    <div className="bg-white  max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <i className="fas fa-search text-gray-500"></i>
        <i className="fas fa-times text-gray-500"></i>
      </div>
      <div className="text-center mb-4">
        <img
          alt={foodItem?.title}
          className="w-full h-[150px] object-cover mx-auto"
          src={foodItem?.image}
        />
      </div>

      <h2 className="font-inter font-bold text-[#111827] text-[16px] md:text-[18px] lg:text-[19px] leading-[22px] md:leading-[24px]">
        {foodItem?.title}
      </h2>
      <p className="text-[#0EA5E9] font-[600] text-[14px] md:text-[15px] lg:text-[16px] mb-2">
        $4
      </p>
      <p className="font-inter font-normal text-gray-500 text-[12px] md:text-[13px] lg:text-[14px] leading-[18px] md:leading-[20px]">
        {foodItem?.description}
      </p>

      <Divider />

      <div id="dip-sections">
        <ItemDetailSection
          key={foodItem?.title}
          title="Select Variation"
          name={foodItem?._id ?? ""}
          singleSelected={selectedOption}
          onSingleSelect={setSelectedOption}
          options={foodItem?.variations || []}
        />

        <ItemDetailSection
          title="Dip 1/2"
          options={ITEM_SECTIONS}
          name="dip1"
          //   multiple={true}
          //   multiSelected={selectedOptions}
          //   onMultiSelect={setSelectedOptions}

          singleSelected={selectedOption}
          onSingleSelect={setSelectedOption}
        />
        <ItemDetailSection
          title="Dip 2/2"
          options={ITEM_SECTIONS}
          name="dip2"
          //   multiple={true}
          //   multiSelected={selectedOptions}
          //   onMultiSelect={setSelectedOptions}
        />
      </div>

      <div className="flex items-center justify-between gap-x-2 mt-4">
        {/* Quantity Controls - Rounded Rectangle Container */}
        <div className="flex items-center space-x-2 bg-gray-200 rounded-[42px] px-3 py-1 flex-[0.2]">
          <button className="bg-white text-gray-900 rounded-full w-6 h-6 flex items-center justify-center shadow">
            -
          </button>
          <span className="text-lg font-medium text-gray-900">2</span>
          <button className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center shadow">
            +
          </button>
        </div>

        {/* Add to Order Button - Takes Remaining 80% */}
        <button className="bg-[#5AC12F] text-black px-4 py-2 text-[500] font-[14px] rounded-full flex items-center justify-between flex-[0.8]">
          Add to order
          <span className="ml-2 text-gray-900 text-[500] font-[14px]">$8</span>
        </button>
      </div>
    </div>
  );
}

// import { IFoodItemDetalComponentProps } from "@/lib/utils/interfaces";

import { ITEM_SECTIONS } from "@/lib/utils/dummy";
import { ItemDetailSection } from "./item-section";
import Divider from "../custom-divider";

export default function FoodItemDetail(/* props: IFoodItemDetalComponentProps */) {
  return (
    <div className="bg-white  max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <i className="fas fa-search text-gray-500"></i>
        <i className="fas fa-times text-gray-500"></i>
      </div>
      <div className="text-center mb-4">
        <img
          alt="A box of assorted McDonald's food items including Chicken McNuggets, Chili Cheese Tops, and Spicy Chicken McNuggets"
          className="w-full h-[150px] object-cover mx-auto"
          src="https://storage.googleapis.com/a1aa/image/gAqgb-r0WwiptmpqIgbITBszVGh_k2Ll8UzXgz1-Eu0.jpg"
        />
      </div>

      <h2 className="font-inter font-bold text-[#111827] text-[16px] md:text-[18px] lg:text-[19px] leading-[22px] md:leading-[24px]">
        Big Share
      </h2>
      <p className="text-[#0EA5E9] font-[600] text-[14px] md:text-[15px] lg:text-[16px] mb-2">
        $4
      </p>
      <p className="font-inter font-normal text-gray-500 text-[12px] md:text-[13px] lg:text-[14px] leading-[18px] md:leading-[20px]">
        6 pieces of Chicken McNuggets™, 6 pieces of Chili Cheese Tops and 6
        pieces of Spicy Chicken McNuggets and two optional dips.
      </p>

      <Divider />

      <div id="dip-sections">
        <ItemDetailSection
          title="Dip 1/2"
          options={ITEM_SECTIONS}
          name="dip1"
          onSelect={(selected) => console.log("Dip 1:", selected)}
        />
        <ItemDetailSection
          title="Dip 2/2"
          options={ITEM_SECTIONS}
          name="dip2"
          onSelect={(selected) => console.log("Dip 2:", selected)}
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

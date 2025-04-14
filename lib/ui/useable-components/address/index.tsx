import { Dialog } from "primereact/dialog";
import React from "react";

// SVG
import { OfficeSvg } from "@/lib/utils/assets/svg";

// Components
import CustomButton from "../button";

// Context
import { useUserAddress } from "@/lib/context/address/address.context";

// Dummy
import { USER_ADDRESSES } from "@/lib/utils/dummy";

export default function UserAddressComponent() {
  // Context
  const { setUserAddress } = useUserAddress();

  return (
    <Dialog
      visible={false}
      onHide={() => {}}
      className="lg:w-1/3 w-full h-auto"
    >
      <div className="w-full">
        {/* Header */}
        <div className="w-full">
          <span className="font-inter font-bold text-[25px]  tracking-normal">
            Where to?
          </span>
        </div>

        {/* Main */}
        <div className="w-full">
          {USER_ADDRESSES.map((address, index) => (
            <div
              key={index}
              className="w-full mb-4 flex items-center justify-between"
            >
              <div className="w-full flex items-center gap-x-2">
                <div className="p-2 bg-gray-50 rounded-full">
                  <OfficeSvg color={address.selected ? "#0EA5E9" : undefined} />
                </div>
                <div className="w-full flex flex-col gap-y-[2px]">
                  <span
                    className={`font-inter font-medium text-sm leading-5 tracking-normal ${address.selected ? "text-sky-500" : "text-gray-500"}`}
                  >
                    {address.label}
                  </span>
                  <span
                    className={`font-inter font-normal text-xs leading-4 tracking-normal ${address.selected ? "text-sky-400" : "text-gray-400"}`}
                  >
                    {address.deliveryAddress}
                  </span>
                </div>
              </div>
              {!address.selected && (
                <div>
                  <CustomButton
                    label="Choose"
                    rounded
                    className="border p-2 pl-4 pr-4 border-gray-300 text-sky-500 font-medium"
                    onClick={() => setUserAddress(address)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

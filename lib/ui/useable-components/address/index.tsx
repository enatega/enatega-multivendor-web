"use client";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useMutation } from "@apollo/client";

// SVG
import { OfficeSvg } from "@/lib/utils/assets/svg";

// Components
import CustomButton from "../button";
import CustomLoader from "../custom-progress-indicator";

// Context
import { useUserAddress } from "@/lib/context/address/address.context";

// Hook
import useUser from "@/lib/hooks/useUser";

// Interface
import {
  IDropdownSelectItem,
  IUserAddress,
  IUserAddressComponentProps,
} from "@/lib/utils/interfaces";

// API
import { SELECT_ADDRESS } from "@/lib/api/graphql";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CustomTextField from "../input-field";
import CustomDropdownComponent from "../custom-dropdown";

/////

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function UserAddressComponent(
  props: IUserAddressComponentProps
) {
  // Props
  const { visible, onHide } = props;

  // States
  const [modifiyingId, setModifyingId] = useState("");
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  // Hook
  const { profile, loadingProfile } = useUser();

  // Context
  const { setUserAddress } = useUserAddress();

  // API
  const [changeUserSelectedAddress, { loading }] = useMutation(SELECT_ADDRESS);

  // Handlers
  const onHandleSelectAddress = async (address: IUserAddress) => {
    setModifyingId(address._id);
    changeUserSelectedAddress({
      variables: { id: address._id },
      onCompleted: () => {
        setUserAddress(address);
      },
    });
  };

  const paginate = (newDirection: number) => {
    setIndex([
      (index + newDirection + COMPONENTS_LIST.length) % COMPONENTS_LIST.length,
      newDirection,
    ]);
  };

  // Sub-Components
  const CHOOSE_ADDRESS = (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="w-full">
        <span className="font-inter font-bold text-[25px] tracking-normal">
          Where to?
        </span>
      </div>

      <div className="w-full flex flex-col items-center">
        {loadingProfile ?
          <div className="w-full flex items-center justify-center m-4">
            <CustomLoader />
          </div>
        : profile?.addresses.map((address, index) => (
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
                    loading={modifiyingId === address._id && loading}
                    className="border p-2 pl-4 pr-4 border-gray-300 text-sky-500 font-medium"
                    onClick={() => onHandleSelectAddress(address)}
                  />
                </div>
              )}
            </div>
          ))
        }
        <button
          className="w-[90%] h-fit bg-[#5AC12F] text-gray-900 py-2 rounded-full text-base lg:text-[14px]"
          onClick={() => paginate(1)}
        >
          <FontAwesomeIcon icon={faPlus} /> <span>Add new address</span>
        </button>
      </div>
    </div>
  );
  const ADD_ADDRESS = (
    <div className="w-full">
      {/* Google Maps */}
      <div className="w-full">Google Maps</div>

      {/* Header */}
      <div className="w-full">
        <span className="font-inter font-semibold text-[18px] tracking-normal">
          Add new address
        </span>
      </div>

      <div className="w-full flex flex-col items-center gap-y-2">
        <div className="w-full space-y-2">
          <CustomDropdownComponent
            name={""}
            placeholder={""}
            selectedItem={null}
            setSelectedItem={function (
              key: string,
              item: IDropdownSelectItem
            ): void {
              throw new Error("Function not implemented.");
            }}
            options={[]}
          />
          <CustomTextField type="text" name="Address" showLabel={false} />
        </div>
        <button
          className="w-[90%] h-fit bg-[#5AC12F] text-gray-900 py-2 rounded-full text-base lg:text-[14px]"
          onClick={() => paginate(1)}
        >
          <FontAwesomeIcon icon={faPlus} /> <span>Add new address</span>
        </button>
      </div>
    </div>
  );
  const SET_ADDRESS_TYPE = <div className="w-full"> Set Address Type </div>;

  const COMPONENTS_LIST = [CHOOSE_ADDRESS, ADD_ADDRESS, SET_ADDRESS_TYPE];

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      className="lg:w-1/3 w-full h-auto"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="w-full relative" // changed from absolute to relative
        >
          {COMPONENTS_LIST[index]}
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { HomeSvg } from "@/lib/utils/assets/svg";
import MenuSvg from "@/lib/utils/assets/svg/menu";
import CustomIconButton from "@/lib/ui/useable-components/custom-icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextComponent from "@/lib/ui/useable-components/text-field";
// import AddressForm from "@/components/address-form"
// import type { Address } from "@/types/address"
import { DUMMY_PROFILE } from "@/lib/utils/dummy";
import AddressesSkeleton from "@/lib/ui/useable-components/custom-skeletons/addresses.skelton";

export default function AddressesMain() {
  const [loading, setLoading] = useState<boolean>(true);
  const handleAddAddress = () => {};

  const handleEditAddress = () => {};

  const handleDeleteAddress = () => {};

  const handleSaveAddress = () => {};

  //   Remove this use effect and handcoded loading usestate after Realldata fatching implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const addresses = DUMMY_PROFILE?.data?.profile?.addresses;
  
  if (!loading) {
    return (
      <div className="w-full mx-auto">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <HomeSvg color="black" width={28} height={28} />
              </div>
              <div>
                <TextComponent
                  text={address?.label}
                  className="font-medium md:text-[24px]"
                />
                <TextComponent
                  text={address.details}
                  className="md:text-[20px]"
                />
              </div>
            </div>
            <span
              className="cursor-pointer"
              onClick={() => handleEditAddress()}
            >
              <MenuSvg width={28} height={28} />
            </span>
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <CustomIconButton
            title="Add New Address"
            iconColor="black"
            classNames="bg-[#5AC12F] w-[content] px-4"
            Icon={faPlus}
            handleClick={handleAddAddress}
          />
        </div>
      </div>
    );
  } else {
    return <AddressesSkeleton />;
  }
}

// "use client";

// import { useEffect, useState } from "react";
// import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// import { HomeSvg } from "@/lib/utils/assets/svg";
// import MenuSvg from "@/lib/utils/assets/svg/menu";
// import CustomIconButton from "@/lib/ui/useable-components/custom-icon-button";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import TextComponent from "@/lib/ui/useable-components/text-field";
// // import AddressForm from "@/components/address-form"
// // import type { Address } from "@/types/address"
// import { DUMMY_PROFILE } from "@/lib/utils/dummy";
// import AddressesSkeleton from "@/lib/ui/useable-components/custom-skeletons/addresses.skelton";

// export default function AddressesMain() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const handleAddAddress = () => {};

//   const handleEditAddress = () => {};

//   const handleDeleteAddress = () => {};

//   const handleSaveAddress = () => {};

//   //   Remove this use effect and handcoded loading usestate after Realldata fatching implementation
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer); // Cleanup on unmount
//   }, []);

//   const addresses = DUMMY_PROFILE?.data?.profile?.addresses;

//   if (!loading) {
//     return (
//       <div className="w-full mx-auto">
//         {addresses.map((address) => (
//           <div
//             key={address._id}
//             className="flex items-center justify-between p-4 border-b"
//           >
//             <div className="flex items-center">
//               <div className="mr-4">
//                 <HomeSvg color="black" width={28} height={28} />
//               </div>
//               <div>
//                 <TextComponent
//                   text={address?.label}
//                   className="font-medium md:text-[24px]"
//                 />
//                 <TextComponent
//                   text={address.details}
//                   className="md:text-[20px]"
//                 />
//               </div>
//             </div>
//             <span
//               className="cursor-pointer"
//               onClick={() => handleEditAddress()}
//             >
//               <MenuSvg width={28} height={28} />
//             </span>
//           </div>
//         ))}

//         <div className="flex justify-center mt-8">
//           <CustomIconButton
//             title="Add New Address"
//             iconColor="black"
//             classNames="bg-[#5AC12F] w-[content] px-4"
//             Icon={faPlus}
//             handleClick={handleAddAddress}
//           />
//         </div>
//       </div>
//     );
//   } else {
//     return <AddressesSkeleton />;
//   }
// }


"use client";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { HomeSvg,MenuSvg } from "@/lib/utils/assets/svg";
import CustomIconButton from "@/lib/ui/useable-components/custom-icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextComponent from "@/lib/ui/useable-components/text-field";
import { DUMMY_PROFILE } from "@/lib/utils/dummy";
import AddressesSkeleton from "@/lib/ui/useable-components/custom-skeletons/addresses.skelton";
import CustomDialog from "@/lib/ui/useable-components/delete-dialog";


export default function AddressesMain() {
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  
  // Use useRef for dropdown refs to avoid unnecessary re-renders
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Memoize addresses to prevent unnecessary re-renders
  const addresses = useMemo(() => 
    DUMMY_PROFILE?.data?.profile?.addresses || [], 
    []
  );

  // Optimize dropdown toggle with useCallback
  const toggleDropdown = useCallback((addressId: string) => {
    setActiveDropdown(prev => prev === addressId ? null : addressId);
    console.log(activeDropdown, "active dropdown")
  }, []);

  // Consolidated delete handling
  const handleDeleteAddress = useCallback((addressId: string) => {
    setDeleteTarget(addressId);
  }, []);

  // Confirm delete action
  const handleConfirmDelete = useCallback(() => {
    if (deleteTarget) {
      console.log(`Deleting address: ${deleteTarget}`);
      // Actual delete logic would go here
      setDeleteTarget(null);
    }
  }, [deleteTarget]);

  // Close delete dialog
  const handleCancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  // Create a ref callback that satisfies TypeScript
  const setDropdownRef = useCallback((addressId: string) => {
    return (el: HTMLDivElement | null) => {
      dropdownRefs.current[addressId] = el;
    };
  }, []);

  // Outside click handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = addresses.every(address => {
        const ref = dropdownRefs.current[address._id];
        return !ref || !ref.contains(event.target as Node);
      });

      if (isOutside) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [addresses]);

  // Simulate loading (remove in production)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AddressesSkeleton />;

  return (
    <div className="w-full mx-auto">
      <CustomDialog 
        onConfirm={handleConfirmDelete} 
        onHide={handleCancelDelete} 
        visible={!!deleteTarget}
      />
      {addresses.map((address) => (
        <div
          key={address._id}
          className="flex items-center justify-between p-4 border-b relative"
        >
          <div className="flex items-center">
            <div className="mr-4">
              <HomeSvg color="black" width={28} height={28} />
            </div>
            <div>
              <TextComponent
                text={address.label}
                className="font-medium md:text-[24px]"
              />
              <TextComponent
                text={address.details}
                className="md:text-[20px]"
              />
            </div>
          </div>
          <div 
            className="relative" 
            ref={setDropdownRef(address._id)}
          >
            <span
              className="cursor-pointer"
              onClick={() => toggleDropdown(address._id)}
            >
              <MenuSvg width={28} height={28} />
              {/* <FontAwesomeIcon icon={faEllipsisV} width={28} height={28} /> */}
            </span>
            
            {activeDropdown === address._id && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {console.log(address?._id, "editing id")}}
                >
                  Edit
                </div>
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <CustomIconButton
          title="Add New Address"
          iconColor="black"
          classNames="bg-[#5AC12F] w-[content] px-4"
          Icon={faPlus}
          handleClick={() => {/* Add address logic */}}
        />
      </div>
    </div>
  );
}
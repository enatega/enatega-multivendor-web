"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { HomeSvg,MenuSvg } from "@/lib/utils/assets/svg";
import CustomIconButton from "@/lib/ui/useable-components/custom-icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextComponent from "@/lib/ui/useable-components/text-field";
import AddressesSkeleton from "@/lib/ui/useable-components/custom-skeletons/addresses.skelton";
import CustomDialog from "@/lib/ui/useable-components/delete-dialog";
import { deleteAddress, profile } from "@/lib/api/graphql/queries/profile";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ISingleAddress } from "@/lib/utils/interfaces/profile.interface";
import useToast from "@/lib/hooks/useToast";
// Query
const PROFILE = gql`
  ${profile}
`;

// Mutation
const DELETE_ADDRESS = gql`
  ${deleteAddress}
`

export default function AddressesMain() {

  //states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Use toast hook for showing messages
  const { showToast } = useToast();

  // Get profile data by using the query
      const { data:profileData,loading:profileLoading } = useQuery(PROFILE, {
        fetchPolicy: "cache-and-network",
      });

  // Mutation for deleting address
  const [mutate, { loading: loadingAddressMutation, error:deleteAddressError }] = useMutation(DELETE_ADDRESS, {
    onCompleted,
  })

  const addresses: ISingleAddress[] = profileData?.profile?.addresses || [];
  
  // Use useRef for dropdown refs to avoid unnecessary re-renders
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


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
  const handleConfirmDelete = useCallback(async() => {
    if (deleteTarget) {
      await mutate({ variables: { id: deleteTarget } })
      .then((response) => {
        console.log('Mutation success:', response);
      })
      .catch((error) => {
        console.log('Mutation error:', error);
        // Handle errors appropriately (optional)
      });
      setDeleteTarget(null);
    }
  }, [deleteTarget]);

  // On Completed Delete address Mutation
  function onCompleted() {
    showToast({
      type: 'success',
      title: 'Address',
      message: 'Address Deleted Successfully',
      duration: 3000,
    });
    setDeleteTarget(null);
  }

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

  //UseEffects
 // On Error Deleting Address Show Toast Of Error
  useEffect(()=>{
    if (deleteAddressError) {
      showToast({
        type: 'error',
        title: 'Address',
        message: 'Failed to delete address',
        duration: 3000,
      });
    }
  },[deleteAddressError])  

  // Outside click handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = addresses.every((address: ISingleAddress) => {
        const ref = dropdownRefs.current[address?._id];
        return !ref || !ref.contains(event.target as Node);
      });

      if (isOutside) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [addresses]);

  if (profileLoading) return <AddressesSkeleton />;

  return (
    <div className="w-full mx-auto">
      <CustomDialog 
        onConfirm={handleConfirmDelete} 
        onHide={handleCancelDelete} 
        visible={!!deleteTarget}
        loading={loadingAddressMutation}
      />
      {addresses?.map((address: ISingleAddress) => (
        <div
          key={address?._id}
          className="flex items-center justify-between p-4 border-b relative"
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
                text={address?.details}
                className="md:text-[20px]"
              />
            </div>
          </div>
          <div 
            className="relative" 
            ref={setDropdownRef(address?._id)}
          >
            <span
              className="cursor-pointer"
              onClick={() => toggleDropdown(address?._id)}
            >
              <MenuSvg width={28} height={28} />
            </span>
            
            {activeDropdown === address?._id && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {console.log(address?._id, "editing id")}}
                >
                  Edit
                </div>
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={() => handleDeleteAddress(address?._id)}
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
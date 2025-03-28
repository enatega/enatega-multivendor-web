"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { deleteAddress, profile } from "@/lib/api/graphql/queries/profile";
import useToast from "@/lib/hooks/useToast";
import AddressesSkeleton from "@/lib/ui/useable-components/custom-skeletons/addresses.skelton";
import CustomIconButton from "@/lib/ui/useable-components/custom-icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddressItem from  "../main/address-listings"
import CustomDialog from "@/lib/ui/useable-components/delete-dialog";
import { ISingleAddress } from "@/lib/utils/interfaces/profile.interface";

// Queries & Mutations
const PROFILE = gql`${profile}`;
const DELETE_ADDRESS = gql`${deleteAddress}`;

export default function AddressesMain() {
  // states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const { showToast } = useToast();

  //Queries and Mutations
  const { data: profileData, loading: profileLoading } = useQuery(PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  const [mutate, { loading: loadingAddressMutation, error: deleteAddressError }] = useMutation(DELETE_ADDRESS, {
    onCompleted,
  });

// variables
  const addresses = profileData?.profile?.addresses || [];
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleDropdown = useCallback((addressId: string) => {
    setActiveDropdown(prev => prev === addressId ? null : addressId);
  }, []);

  //Handlers
  const handleDeleteAddress = useCallback((addressId: string) => {
    setDeleteTarget(addressId);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (deleteTarget) {
      await mutate({ variables: { id: deleteTarget } });
      setDeleteTarget(null);
    }
  }, [deleteTarget]);

  function onCompleted() {
    showToast({ type: 'success', title: 'Address', message: 'Deleted Successfully', duration: 3000 });
    setDeleteTarget(null);
  }

  // UseEffects
  useEffect(() => {
    if (deleteAddressError) {
      showToast({ type: 'error', title: 'Address', message: 'Failed to delete', duration: 3000 });
    }
  }, [deleteAddressError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = addresses.every((address:ISingleAddress) => {
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


// Return Skelton on Loading state
  if (profileLoading) return <AddressesSkeleton />;

  return (
    <div className="w-full mx-auto">
      <CustomDialog 
        onConfirm={handleConfirmDelete} 
        onHide={() => setDeleteTarget(null)} 
        visible={!!deleteTarget}
        loading={loadingAddressMutation}
      />
      
      {addresses.map((address:ISingleAddress) => (
        <AddressItem 
          key={address?._id} 
          address={address} 
          activeDropdown={activeDropdown} 
          toggleDropdown={toggleDropdown} 
          handleDelete={handleDeleteAddress} 
          setDropdownRef={(id) => (el) => dropdownRefs.current[id] = el} 
        />
      ))}

      <div className="flex justify-center mt-16">
        <CustomIconButton
          title="Add New Address"
          iconColor="black"
          classNames="bg-[#5AC12F] w-[content] px-4"
          Icon={faPlus}
          handleClick={() => {/* Add logic */}}
        />
      </div>
    </div>
  );
}

"use client";

import type React from "react";
import { useCallback, useState } from "react";
import CustomInputSwitch from "@/lib/ui/useable-components/custom-input-switch";
import { gql, useQuery } from "@apollo/client";
import { profile } from "@/lib/api/graphql/queries/profile";
import ProfileSettingsSkeleton from "@/lib/ui/useable-components/custom-skeletons/profile.settings.skelton";
import TextComponent from "@/lib/ui/useable-components/text-field";
import CustomButton from "@/lib/ui/useable-components/button";
import DeleteAccountDialog from "./delete-account";
// Query
const PROFILE = gql`
  ${profile}
`;

export default function SettingsMain() {
  // States for current values
  const [sendReceipts, setSendReceipts] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [deleteReason, setDeleteReason] = useState<string>("")
  // Get profile data by using the query
  const { data: profileData, loading: isProfileLoading } = useQuery(PROFILE, {
    fetchPolicy: "cache-and-network",
  });

  // Handle send receipts toggle
  const handleSendReceiptsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setSendReceipts(newValue);
    // You can use a mutation to update the user's settings
  };
  //  handle Logout
  const handleLogout = () => {
    // Add your logout logic here
    // e.g., clear cookies, redirect to login page, etc.
  };

  // Handle Delete Account
  const handleDeleteAccount = () => {
    setDeleteAccount(true)
  }

  const handleConfirmDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      // Actual Mutation Delete Logic implement here
      setIsDeleting(false)
      setDeleteAccount(false)
      // Show success message or redirect
    }, 1500)
  }

    // Close delete dialog
    const handleCancelDelete = useCallback(() => {
       setDeleteAccount(false)
    }, []);

  if (isProfileLoading) {
    return <ProfileSettingsSkeleton />;
  }

  return (
    <div className="w-full mx-auto bg-white">
       <DeleteAccountDialog
        visible={deleteAccount}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        userName={profileData?.profile?.name}
        deleteReason={deleteReason}
        setDeleteReason={setDeleteReason}
        loading={isDeleting}
      />
      {/* Email */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
          <TextComponent text="Email" className="font-normal text-gray-700 text-lg md:text-xl lg:text-2xl" />
          <TextComponent text={profileData?.profile?.email} className="font-medium text-gray-700 text-lg md:text-xl lg:text-2xl" />
        </div>
      </div>

      {/* Mobile Number */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
        <TextComponent text="Mobile Number" className="font-normal text-gray-700 text-lg md:text-xl lg:text-2xl" />
        <TextComponent text={profileData?.profile?.phone} className="font-medium text-gray-700 text-lg md:text-xl lg:text-2xl" />
        </div>
      </div>

      {/* Name */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
        <TextComponent text="Name" className="font-normal text-gray-700 text-lg md:text-xl lg:text-2xl" />
        <TextComponent text={profileData?.profile?.name} className="font-medium text-gray-700 text-lg md:text-xl lg:text-2xl" />
        </div>
      </div>

      {/* Delete Account */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
        <TextComponent text="Delete Account" className="font-normal text-gray-700 text-lg md:text-xl lg:text-2xl" />
          <CustomButton
           label="Delete"
            className="text-red-500 hover:text-red-600 font-medium text-lg md:text-xl lg:text-2xl "
            onClick={handleDeleteAccount}
          />
              
        </div>
      </div>

      {/* Send Receipts */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
        <TextComponent text="Send receipts to email" className="font-normal text-gray-700 text-lg md:text-xl lg:text-2xl" />
          <CustomInputSwitch
            isActive={sendReceipts}
            onChange={handleSendReceiptsChange}
          />
        </div>
      </div>

      {/* Logout */}
      <div className="py-4">
        <div className="flex justify-between items-center">
        <TextComponent text="Log out of app" className="font-normal text-gray-700 text-lg md:text-xl lg:text-2xl" />
          <CustomButton className="font-medium text-gray-700 text-lg md:text-xl lg:text-2xl" onClick={handleLogout}
            label="Logout"
          />
        </div>
      </div>
    </div>
  );
}

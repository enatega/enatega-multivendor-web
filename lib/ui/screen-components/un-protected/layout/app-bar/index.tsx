"use client";

// Core
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import Cart from "@/lib/ui/useable-components/cart";

// Hook
import useUser from "@/lib/hooks/useUser";

// Icons
import { CartSvg, LocationSvg } from "@/lib/utils/assets/svg";

// Interface
import { IAppBarProps } from "@/lib/utils/interfaces/auth.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import UserAddressComponent from "@/lib/ui/useable-components/address";
import { useUserAddress } from "@/lib/context/address/address.context";
import useLocation from "@/lib/hooks/useLocation";
import useSetUserCurrentLocation from "@/lib/hooks/useSetUserCurrentLocation";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import { useAuth } from "@/lib/context/auth/auth.context";

const AppTopbar = ({ handleModalToggle }: IAppBarProps) => {


  // State for cart sidebar
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserAddressModalOpen, setIsUserAddressModalOpen] = useState(false);

  // Access user context for cart information
  const { GOOGLE_MAPS_KEY } = useConfig();
  const { cartCount, calculateSubtotal, profile, loadingProfile } = useUser();
  const { userAddress, setUserAddress } = useUserAddress();

  // Hooks
  const { getCurrentLocation } = useLocation();
  const { onSetUserLocation } = useSetUserCurrentLocation();
  const { authToken, setIsAuthModalVisible } = useAuth();

  // Format subtotal for display
  const formattedSubtotal = cartCount > 0 ? `$${calculateSubtotal()}` : "$0";

  // Handlers
  const onInit = () => {
    const selectedAddress = profile?.addresses.find(
      (address) => address.selected
    );

    // ✅ If there's a selected address, use that
    if (selectedAddress) {
      setUserAddress(selectedAddress);
    } else {
      // 🚀 Otherwise, get current location if profile is loaded and maps key exists
      if (!loadingProfile && GOOGLE_MAPS_KEY) {
        getCurrentLocation(onSetUserLocation);
      }
    }
  };

  const onHandleAddressModelVisibility = () => {
    if (authToken) {
      setIsUserAddressModalOpen(true);
    } else {
      setIsAuthModalVisible(true);
    }
  };

  useEffect(() => {
    onInit();
  }, [GOOGLE_MAPS_KEY, profile]);

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="w-full">
          <PaddingContainer>
            <div className="flex flex-row items-center justify-between w-full h-16">
              <div className="flex gap-x-2 items-center cursor-pointer">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Enatega
                </Link>
                <div
                  className="flex items-center"
                  onClick={onHandleAddressModelVisibility}
                >
                  <div className="p-[4px] m-2 bg-gray-50 rounded-full">
                    <LocationSvg />
                  </div>
                  {/* Show on medium and up */}
                  <span className="hidden md:inline text-xs sm:text-sm md:text-base text-gray-500 font-inter font-normal leading-6 tracking-normal mr-2">
                    {userAddress?.deliveryAddress}
                  </span>

                  {/* Show on small screens only */}
                  <span className="inline md:hidden text-xs sm:text-sm md:text-base text-gray-500 font-inter font-normal leading-6 tracking-normal mr-2">
                    {userAddress?.details}
                  </span>

                  <div className="hidden sm:flex items-center">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center space-x-4">
                {/* Login Button */}
                {handleModalToggle && (
                  <button
                    onClick={handleModalToggle}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </button>
                )}

                {/* Cart Button */}
                <div className="p-1">
                  {/* Full button for larger screens */}
                  {cartCount > 0 && (
                    <div
                      className="hidden sm:flex items-center justify-between bg-[#5AC12F] rounded-full px-4 py-2 w-64 cursor-pointer"
                      onClick={() => setIsCartOpen(true)}
                    >
                      <div className="flex items-center">
                        <div className="bg-black text-[#5AC12F] rounded-full w-6 h-6 flex items-center justify-center text-[10px] sm:text-[12px]">
                          {cartCount}
                        </div>
                        <span className="ml-2 text-black text-[12px] sm:text-[14px]">
                          View Order
                        </span>
                      </div>
                      <span className="text-black text-[12px] sm:text-[14px]">
                        {formattedSubtotal}
                      </span>
                    </div>
                  )}

                  {/* Cart icon with badge for small screens or empty cart */}
                  <div
                    className={`${cartCount > 0 ? "sm:hidden" : ""} flex items-center justify-center rounded-full w-10 h-10 bg-gray-100 relative`}
                    onClick={() => setIsCartOpen(true)}
                  >
                    <CartSvg color="black" width={24} height={24} />
                    {/* Badge for item count */}
                    {cartCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-black text-[#5AC12F] text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </PaddingContainer>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Sidebar
        visible={isCartOpen}
        onHide={() => setIsCartOpen(false)}
        position="right"
        className="!p-0 !m-0 w-full md:w-[30%]"
      >
        <Cart onClose={() => setIsCartOpen(false)} />
      </Sidebar>

      <UserAddressComponent
        visible={isUserAddressModalOpen}
        onHide={() => setIsUserAddressModalOpen(false)}
      />
    </>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;

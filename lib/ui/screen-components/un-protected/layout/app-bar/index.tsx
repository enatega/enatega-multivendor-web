"use client";

// Core
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import { Menu } from "primereact/menu";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Components
import Cart from "@/lib/ui/useable-components/cart";
import UserAddressComponent from "@/lib/ui/useable-components/address";
import { PaddingContainer } from "@/lib/ui/useable-components/containers";

// Hook
import { useUserAddress } from "@/lib/context/address/address.context";
import { useAuth } from "@/lib/context/auth/auth.context";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import useLocation from "@/lib/hooks/useLocation";
import useSetUserCurrentLocation from "@/lib/hooks/useSetUserCurrentLocation";
import useUser from "@/lib/hooks/useUser";

// Icons
import { CartSvg, LocationSvg } from "@/lib/utils/assets/svg";
// import AnimatedLogo from "@/lib/assets/gif/logo.gif";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Interface
import { IAppBarProps } from "@/lib/utils/interfaces";

// Methods
import { onUseLocalStorage } from "@/lib/utils/methods/local-storage";

// Constnats
import { USER_CURRENT_LOCATION_LS_KEY } from "@/lib/utils/constants";

const AppTopbar = ({ handleModalToggle }: IAppBarProps) => {
  // State for cart sidebar
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserAddressModalOpen, setIsUserAddressModalOpen] = useState(false);

  // REf
  const menuRef = useRef<Menu>(null);

  // Hooks
  const router = useRouter();
  const { GOOGLE_MAPS_KEY } = useConfig();
  const {
    cartCount,
    calculateSubtotal,
    profile,
    loadingProfile,
    fetchProfile,
  } = useUser();
  const { userAddress, setUserAddress } = useUserAddress();
  const { getCurrentLocation } = useLocation();
  const { onSetUserLocation } = useSetUserCurrentLocation();
  const {
    authToken,
    setIsAuthModalVisible,
    setAuthToken,
    refetchProfileData,
    setRefetchProfileData,
  } = useAuth();

  // Format subtotal for display
  const formattedSubtotal = cartCount > 0 ? `$${calculateSubtotal()}` : "$0";

  // Handlers
  const onInit = () => {
    const current_location_ls = onUseLocalStorage(
      "get",
      USER_CURRENT_LOCATION_LS_KEY
    );
    const user_current_location =
      current_location_ls ? JSON.parse(current_location_ls) : null;

    if (user_current_location) {
      setUserAddress(user_current_location);
      return;
    }

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

  const onLogout = () => {
    router.replace("/");
    setAuthToken("");
    localStorage.clear();
  };

  // UseEffects
  useEffect(() => {
    onInit();
  }, [GOOGLE_MAPS_KEY, profile]);

  useEffect(() => {
    if (refetchProfileData) {
      fetchProfile(); // this one is not working when a refetch is required, kindly check this whoever is working on this module
      onInit();
      setRefetchProfileData(false);
    }
  }, [refetchProfileData]);



  return (
    <>
      <nav className="h-full w-full bg-white shadow-sm">
        <div className="w-full">
          <PaddingContainer>
            <div className="flex flex-row items-center justify-between w-full h-16">
              <div className="flex gap-x-2 items-center cursor-pointer">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Enatega
                  {/* <Image
                    src={AnimatedLogo}
                    alt="Funny GIF"
                    width={100}
                    height={50}
                    unoptimized // 💥 Required to keep the animation
                  /> */}
                </Link>
                <div
                  className="flex items-center"
                  onClick={onHandleAddressModelVisibility}
                >
                  {/* Show on small screens only */}
                  <div className="block md:hidden p-[4px] m-2 bg-gray-50 rounded-full">
                    <LocationSvg width={18} height={18} />
                  </div>

                  {/* Show on large screens only */}
                  <div className="hidden md:block p-[4px] m-2 bg-gray-50 rounded-full">
                    <LocationSvg width={22} height={22} />
                  </div>

                  {/* Show on medium and up */}
                  <span className="hidden md:inline text-xs sm:text-sm md:text-base text-gray-500 font-inter font-normal leading-6 tracking-normal mr-2">
                    {userAddress?.deliveryAddress}
                  </span>

                  {/* Show on small screens only */}
                  <span className="inline absolute top-6.5 left-[9rem] md:hidden text-[8px] sm:text-sm md:text-base text-gray-500 font-inter font-normal tracking-normal mr-2">
                    {userAddress?.details || userAddress?.deliveryAddress}
                  </span>

                  <div className="hidden sm:flex items-center">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      width={12}
                      hanging={12}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-fit justify-end items-center space-x-4">
                {/* Login Button */}
                {!authToken ?
                  <button
                    className="w-20 h-fit bg-transparent text-gray-900 py-2 border border-black rounded-full text-base lg:text-[14px]"
                    onClick={handleModalToggle}
                  >
                    <span>Login</span>
                  </button>
                : <div
                    className="flex items-center space-x-2 rounded-md p-2 hover:bg-[#d8d8d837]"
                    onClick={(event) => menuRef.current?.toggle(event)}
                    aria-controls="popup_menu_right"
                    aria-haspopup
                  >
                    <Image
                      src={
                        /*  user?.image
                      ? user.image
                      : */ "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                      }
                      alt={"profile-image.png"}
                      height={32}
                      width={32}
                      className="h-6 w-6 md:w-8 md:h-8 select-none rounded-full"
                    />

                    {/* Show full name on large screens and up */}
                    <span className="hidden lg:inline">
                      {profile?.name || ""}
                    </span>

                    <FontAwesomeIcon
                      icon={faChevronDown}
                      width={12}
                      hanging={12}
                    />
                    <Menu
                      model={[
                        {
                          label: "Profile",
                          command: () => {
                            router.push("/profile");
                          },
                        },
                        {
                          label: "Logout",
                          command: () => {
                            onLogout();
                          },
                        },
                      ]}
                      popup
                      ref={menuRef}
                      id="popup_menu_right"
                      popupAlignment="right"
                    />
                  </div>
                }

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
                    className={`${cartCount > 0 ? "sm:hidden" : ""} flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10 bg-gray-100 relative`}
                    onClick={() => setIsCartOpen(true)}
                  >
                    {/* <CartSvg color="black" width={22} height={22} /> */}
                    {/* Show on small screens only */}
                    <div className="block md:hidden">
                      <CartSvg color="black" width={18} height={18} />
                    </div>

                    {/* Show on large screens only */}
                    <div className="hidden md:block">
                      <CartSvg color="black" width={22} height={22} />
                    </div>
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

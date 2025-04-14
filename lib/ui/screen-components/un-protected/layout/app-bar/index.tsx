"use client";

// Core
import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import Cart from "@/lib/ui/useable-components/cart";

// Hook
import useUser from "@/lib/hooks/useUser";

// Icons
import { CartSvg } from "@/lib/utils/assets/svg";

// Interface
import { IAppBarProps } from "@/lib/utils/interfaces/auth.interface";

const AppTopbar = ({ handleModalToggle }: IAppBarProps) => {
  // State for cart sidebar
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Access user context for cart information
  const { cartCount, calculateSubtotal } = useUser();
  
  // Format subtotal for display
  const formattedSubtotal = cartCount > 0 ? `$${calculateSubtotal()}` : "$0";

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="w-full">
          <PaddingContainer>
            <div className="flex flex-row items-center justify-between w-full h-16">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Enatega
              </Link>
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
                    className={`${cartCount > 0 ? 'sm:hidden' : ''} flex items-center justify-center rounded-full w-10 h-10 bg-gray-100 relative`}
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
    </>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
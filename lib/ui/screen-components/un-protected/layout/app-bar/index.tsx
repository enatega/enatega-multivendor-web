/* eslint-disable @next/next/no-img-element */

"use client";

// Core
import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";

// COmponents
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import Cart from "@/lib/ui/useable-components/cart";
// Styles
import classes from "./app-bar.module.css";

// Icon
import { CartSvg } from "@/lib/utils/assets/svg";
// Interface
import { IAppBarProps } from "@/lib/utils/interfaces/auth.interface";

const AppTopbar = ({ handleModalToggle }: IAppBarProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className={`${classes["layout-topbar"]}`}>
        <div className="w-full">
          <PaddingContainer>
            <div className="flex flex-row items-center justify-between w-full">
              <Link href="/" className="layout-topbar-log">
                Enatega
              </Link>
              <div className="flex justify-end">
                {/* Unprotected */}
                <button onClick={handleModalToggle}>Login</button>

                {/* Protected */}
                <div className="p-1">
                  {/* Full button for larger screens */}
                  <div
                    className="hidden sm:flex items-center justify-between bg-[#5AC12F] rounded-full px-4 py-2 w-64"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <div className="flex items-center">
                      <div className="bg-black text-[#5AC12F] rounded-full w-6 h-6 flex items-center justify-center text-[12px] sm:text-[14px]">
                        2
                      </div>
                      <span className="ml-2 text-black text-[12px] sm:text-[14px]">
                        View Order
                      </span>
                    </div>
                    <span className="text-black text-[12px] sm:text-[14px]">
                      $8
                    </span>
                  </div>

                  {/* Cart icon with badge for small screens */}
                  <div
                    className="sm:hidden flex items-center justify-center rounded-full w-7 h-7 relative"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <CartSvg color="black" width={20} height={20} />
                    {/* Badge for item count */}
                    <div className="absolute top-0 right-0 bg-black text-[#5AC12F] text-[8px] w-3 h-3  rounded-full flex items-center justify-center">
                      2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PaddingContainer>
        </div>
      </nav>

      <Sidebar
        visible={isCartOpen}
        onHide={() => setIsCartOpen(false)}
        position="right"
        className="!p-0 !m-0 w-full md:w-[30%]"
      >
        <Cart />
      </Sidebar>
    </>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;

/* eslint-disable @next/next/no-img-element */

"use client";

// Core
import Link from "next/link";

// Styles
import { IAppBarProps } from "@/lib/utils/interfaces/auth.interface";
import classes from "./app-bar.module.css";
import { PaddingContainer } from "@/lib/ui/useable-components/containers";

const AppTopbar = ({ handleModalToggle }: IAppBarProps) => {
  return (
    <nav className={`${classes["layout-topbar"]}`}>
      <div className="w-full">
        <PaddingContainer>
          <div className="flex flex-row items-center justify-between w-full">
            <Link href="/" className="layout-topbar-log">
              Enatega
            </Link>
            <div>
              <button onClick={handleModalToggle}>Login</button>
            </div>
          </div>
        </PaddingContainer>
      </div>
    </nav>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;

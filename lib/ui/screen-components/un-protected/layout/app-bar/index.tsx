/* eslint-disable @next/next/no-img-element */

"use client";

// Core
import Link from "next/link";

// Styles
import { IAppBarProps } from "@/lib/utils/interfaces/auth.interface";
import classes from "./app-bar.module.css";

const AppTopbar = ({handleModalToggle}:IAppBarProps) => {
  return (
    <nav className={`${classes["layout-topbar"]}`}>
      <div className="w-full">
        <div className="flex flex-row items-center justify-between w-full lg:px-12 px-2">
          <Link href="/" className="layout-topbar-log">
            Enatega
          </Link>
          <div>
            <button onClick={handleModalToggle}>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;

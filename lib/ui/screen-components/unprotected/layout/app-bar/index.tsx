/* eslint-disable @next/next/no-img-element */

"use client";

// Core
import Link from "next/link";

// Styles
import classes from "./app-bar.module.css";

const AppTopbar = () => {
  return (
    <div className={`${classes["layout-topbar"]}`}>
      <div>
        <div className="flex flex-row items-center gap-6">
          <Link href="/" className="layout-topbar-log">
            LOGO HERE
          </Link>
        </div>
      </div>
    </div>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;

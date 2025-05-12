"use client"
import { ReactNode } from "react";

export default function SingleVendorLayout({
  children,
}: {
  children: ReactNode;
}) {


  return (
    <div>
      {/* <nav>Testing navbar of single vendor</nav> */}
      {children}
    </div>
  );
}

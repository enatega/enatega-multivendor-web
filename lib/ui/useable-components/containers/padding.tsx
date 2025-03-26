import { IPaddingContainer } from "@/lib/utils/interfaces";
import React from "react";

export default function PaddingContainer({
  children,
  paddingTop,
  paddingBottom,
}: IPaddingContainer) {
  return (
    <div
      className="md:px-6 lg:px-12 xl:px-20 2xl:px-[80px] w-screen"
      style={{
        paddingTop,
        paddingBottom,
      }}
    >
      {children}
    </div>
  );
}

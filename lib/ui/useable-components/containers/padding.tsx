import { IPaddingContainer } from "@/lib/utils/interfaces";
import React from "react";

export default function PaddingContainer({
  children,
  height,
  paddingTop,
  paddingBottom,
}: IPaddingContainer) {
  return (
    <div
      className="w-full md:px-6 lg:px-12 xl:px-20 2xl:px-[80px]"
      style={{
        height,
        paddingTop,
        paddingBottom,
      }}
    >
      {children}
    </div>
  );
}

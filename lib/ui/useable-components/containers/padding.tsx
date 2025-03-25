import { IPaddingContainer } from "@/lib/utils/interfaces";
import React from "react";

export default function PaddingContainer({
  children,
  ...props
}: IPaddingContainer) {
  const {
    paddingLeft = "80px",
    paddingRight = "80px",
    paddingBottom,
    paddingTop,
  } = props;

  return (
    <div
      style={{
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
      }}
    >
      {children}
    </div>
  );
}

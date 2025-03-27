import React from "react";
import { ISvgComponentProps } from "../../interfaces";

export default function ClockSvg(props: ISvgComponentProps) {
    const { width = "20", height="20", color="#0EA5E9" } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 3.625V7.25H9.96875M12.6875 7.25C12.6875 10.253 10.253 12.6875 7.25 12.6875C4.24695 12.6875 1.8125 10.253 1.8125 7.25C1.8125 4.24695 4.24695 1.8125 7.25 1.8125C10.253 1.8125 12.6875 4.24695 12.6875 7.25Z"
        stroke={color}
        strokeWidth="1.0875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

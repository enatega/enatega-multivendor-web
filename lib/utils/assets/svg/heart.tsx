import React from "react";
import { ISvgComponentProps } from "../../interfaces";

export default function HeartSvg(props: ISvgComponentProps) {
  const { width = "22", height = "22", color = "#0F172A" } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 11C28 7.68629 25.2018 5 21.75 5C19.1692 5 16.9537 6.5017 16 8.64456C15.0463 6.5017 12.8308 5 10.25 5C6.79822 5 4 7.68629 4 11C4 20.6274 16 27 16 27C16 27 28 20.6274 28 11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

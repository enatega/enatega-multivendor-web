"use client";

import React from "react";
import { buttonProps } from "@/lib/utils/interfaces/Home-interfaces";
import { useRouter } from "next/navigation";

const TranparentButton: React.FC<buttonProps> = ({ text, link }) => {
  const router = useRouter();

  function navigate() {
    link ? router.push(link) : undefined;
  }
  return (
    <button
      onClick={navigate}
      className="p-3 bg-white/20 rounded-3xl w-[180px] backdrop-blur-sm hover:bg-white/35 h-[50px] flex gap-2 items-center justify-center"
    >
      <p className="text-white text-[16px]"> {text}</p>
      <i
        className="pi pi-angle-right"
        style={{ fontSize: "1rem", color: "white" }}
      ></i>
    </button>
  );
};

export default TranparentButton;

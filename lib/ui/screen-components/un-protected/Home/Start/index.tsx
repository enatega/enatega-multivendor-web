"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Components
import HomeSearch from "@/lib/ui/useable-components/Home-search";
import TextFlyingAnimation from "@/lib/ui/useable-components/FlyingText";

// Hooks
import useLocation from "@/lib/hooks/useLocation";
import useSetUserCurrentLocation from "@/lib/hooks/useSetUserCurrentLocation";

const Start: React.FC = () => {
  // Hooks
  const router = useRouter();
  const { getCurrentLocation } = useLocation();
  const { onSetUserLocation } = useSetUserCurrentLocation();

  return (
    <div className="h-[100vh] w-full bg-cover bg-center flex items-center justify-center bg-[#94e469] relative">
      <div className="text-center flex flex-col items-center justify-center">
        <TextFlyingAnimation />
        <h1 className="text-[40px] md:text-[90px] font-extrabold text-white">
          DELIVERED
        </h1>
        <HomeSearch />
        <div className="my-6 text-white flex items-center justify-center">
          <div className="flex items-center gap-2">
            <i
              className="pi pi-map-marker"
              style={{ fontSize: "1rem", color: "white" }}
            ></i>
            <button
              className="me-2 underline"
              onClick={() => {
                getCurrentLocation(onSetUserLocation);
                router.push("/discovery");
              }}
            >
              Current Location
            </button>
          </div>
          <button className="underline">Login for saved address</button>
        </div>
      </div>

      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[100px]"
      >
        <path
          d="M0,100 C500,60 500,60 1000,100 L1000,200 L0,200 Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Start;

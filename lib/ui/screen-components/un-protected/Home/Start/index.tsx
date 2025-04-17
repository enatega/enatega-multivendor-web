"use client";

import React from "react";
import HomeSearch from "@/lib/ui/useable-components/Home-search";
import { useLocationContext } from "@/lib/context/Location/Location.context";
import { useRouter } from "next/navigation";
import TextFlyingAnimation from "@/lib/ui/useable-components/FlyingText";

const Start: React.FC = () => {
  const { setLocation } = useLocationContext();
  const router = useRouter();

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLocation({
            label: "Current Location",
            latitude,
            longitude,
            deliveryAddress: "Using current location",
          });

          router.push("/restaurants");
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center bg-[#94e469] relative">
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
            <button className="me-2 underline" onClick={handleShareLocation}>
              Share Location
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
          d="M0,100 C500,50 500,50 1000,100 L1000,200 L0,200 Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Start;

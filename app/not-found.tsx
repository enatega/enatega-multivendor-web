"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ANimation
// import notFoundAnimation from "@/lib/assets/animations/404.json"; // You can place your JSON file in public or src/assets
import animationData from "@/lib/assets/animations/404.json"; // Your Lottie file

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      //   router.back();
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-trasnsparent px-4">
      <div className="text-center max-w-md w-full bg-transparent">
        <Lottie
          animationData={animationData}
          loop
          className="h-64 mx-auto bg-black"
        />
      </div>
    </div>
  );
}

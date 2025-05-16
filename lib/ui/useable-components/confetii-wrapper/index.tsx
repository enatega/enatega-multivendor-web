// lib/ui/components/confetti-wrapper.tsx
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Confetti with no SSR
const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false
});

interface ConfettiWrapperProps {
  show: boolean;
  onComplete?: () => void;
}

const ConfettiWrapper: React.FC<ConfettiWrapperProps> = ({ 
  show, 
  onComplete 
}) => {
  const [dimensions, setDimensions] = useState({ 
    width: 0, 
    height: 0 
  });

  useEffect(() => {
    // Only set dimensions when running in browser
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  if (!show || dimensions.width === 0) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.3}
      onConfettiComplete={onComplete}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        pointerEvents: "none"
      }}
    />
  );
};

export default ConfettiWrapper;
"use client"
import Image from "next/image";
import React from "react";
import styles from "./Movable.module.css"; // Ensure this path is correct
import { MoveableProps } from "@/lib/utils/interfaces/Home-interfaces";
import { useEffect, useState } from "react";
const MoveableCard: React.FC<MoveableProps> = ({
  heading,
  subText,
  button,
  image,
  middle = false,
  height = "600px",
}) => {
  const [responsiveHeight, setResponsiveHeight] = useState(height);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 700) {
        setResponsiveHeight("400px");
      } else {
        setResponsiveHeight(height);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  return (
    <div
      className={`${styles.cardContainer} bg-green-300 rounded-3xl cursor-pointer`}
      style={{ height: responsiveHeight }}
    >
      {/* Image container */}
      <Image
        src={
          image ||
          "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=1200&q=90&fm=webp"
        }
        alt="Main Image"
        layout="fill"
        className={`${styles.imageContainer} c`}
      />

      {/* Text container */}

      {middle == false ? (
        <div
          className={`relative h-full inset-0 flex items-start justify-between  flex-col p-5  ${styles.textContainer}`}
        >
           <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10">
            <h1 className=" text-white text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              {heading}
            </h1>
            <p className="text-white text-lg md:text-2xl lg:text-3xl ">{subText}</p>
          </div>
          <div className="relative z-50">{button && button}</div>
        </div>
      ) : (
        <div>
          <div
            className={`absolute inset-0 flex items-center justify-center  flex-col p-5  ${styles.textContainer}`}
          >
            <div className="w-[80%] md:w-[40%]  ">
              <h1 className="text-white text-2xl font-bold  text-center ">
                {heading}
              </h1>
              <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold text-center">
                {subText}
              </p>
            </div>
            <div className="my-4">{button && button}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveableCard;

"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

import { ICuisinesSliderCardComponentProps } from "@/lib/utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import SquareCard from "../square-card";
const responsiveOptions = [
  { breakpoint: "1024px", numVisible: 6, numScroll: 1 }, // If screen width is ≤ 1024px, show 4 items
  { breakpoint: "768px", numVisible: 4, numScroll: 1 }, // If screen width is ≤ 768px, show 3 items
  { breakpoint: "425px", numVisible: 2, numScroll: 1 }, // If screen width is ≤ 425px, show 1 item
  { breakpoint: "320px", numVisible: 1, numScroll: 1 }, // If screen width is ≤ 320px, show 1 item
];

const CuisinesSliderCard = <T,>({
  title,
  data,
  last,
  showLogo,
  cuisines,
}: ICuisinesSliderCardComponentProps<T>) => {
  const [page, setPage] = useState(0);
  const [numVisible, setNumVisible] = useState(getNumVisible());

  function getNumVisible() {
    if (typeof window === "undefined") return;
    // Get the current screen width
    const width = window.innerWidth;

    // Find the matching responsive option
    const option =
      responsiveOptions.find((opt) => width <= parseInt(opt.breakpoint)) ||
      responsiveOptions[0];

    return option.numVisible || 0;
  }

  const next = () => {
    setPage((prevPage) =>
      prevPage < totalPages - 1 ? prevPage + numScroll : 0
    ); // Reset to first page at the end
  };

  const prev = () => {
    setPage((prevPage) =>
      prevPage > 0 ? prevPage - numScroll : totalPages - 1
    ); // Go to last page if at start
  };

  // Effects
  useEffect(() => {
    const handleResize = () => setNumVisible(getNumVisible());

    const handleDeviceChange = () => {
      setNumVisible(getNumVisible());
    };

    window.addEventListener("resize", handleResize);
    window
      .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      .addEventListener("change", handleDeviceChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window
        .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
        .removeEventListener("change", handleDeviceChange);
    };
  }, []);

  const numScroll = 1; // Scroll by 1 item
  const totalPages =
    Math.ceil((data?.length - (numVisible || 0)) / numScroll) + 1; // Total pages

  return (
    data?.length > 0 && (
      <div className={`ml-8 mr-10 md:ml-12 md:mr-14 ${last && "mb-20"}`}>
        <div className="flex justify-between">
          <span className="font-inter font-bold text-2xl leading-8 tracking-normal text-gray-900">
            {title}
          </span>
          <div className="flex items-center justify-end gap-x-2 mb-2">
            {/* "See all" Button */}

            <span className="text-blue-500 text-sm font-inter font-medium tracking-[0px]">
              See All
            </span>

            {/* Navigation Buttons */}
            <div className="gap-x-2 hidden md:flex">
              <button
                className="w-8 h-8 flex items-center justify-center  shadow-md  rounded-full"
                onClick={prev}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center  shadow-md rounded-full"
                onClick={next}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
        </div>

        <Carousel
          value={data}
          style={{ width: "100%" }}
          itemTemplate={(item) => (
            <SquareCard item={item} showLogo={showLogo} cuisines={cuisines} />
          )}
          numVisible={numVisible}
          numScroll={1}
          circular
          responsiveOptions={responsiveOptions}
          showIndicators={false}
          showNavigators={false}
          page={page}
        />
      </div>
    )
  );
};

export default CuisinesSliderCard;

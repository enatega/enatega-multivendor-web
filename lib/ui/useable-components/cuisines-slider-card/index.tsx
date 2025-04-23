"use client";
// core
import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
// interfaces
import { CuisinesSliderCardComponent } from "@/lib/utils/interfaces";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// router
import { useRouter, usePathname } from "next/navigation";
// ui component
import SquareCard from "../square-card";
import CustomButton from "../button";

const responsiveOptions = [
  { breakpoint: "1280px", numVisible: 6, numScroll: 1 }, // If screen width is ≤ 1280px, show 6 items
  { breakpoint: "1024px", numVisible: 4, numScroll: 1 }, // If screen width is ≤ 1024px, show 4 items
  { breakpoint: "640px", numVisible: 3, numScroll: 1 }, // If screen width is ≤ 640px, show 3 item
  { breakpoint: "425px", numVisible: 2, numScroll: 1 }, // If screen width is ≤ 425px, show 2 item
  { breakpoint: "320px", numVisible: 1, numScroll: 1 }, // If screen width is ≤ 320px, show 1 item
];

const CuisinesSliderCard: CuisinesSliderCardComponent = ({
  title,
  data,
  last,
  showLogo,
  cuisines,
}) => {
  const [page, setPage] = useState(0);
  const [numVisible, setNumVisible] = useState(getNumVisible());

  const router = useRouter();
  const pathname = usePathname();

  // Revised function to get number of visible items
  function getNumVisible() {
    if (typeof window === "undefined") return 6; // Default value

    const width = window.innerWidth;

    // For screens wider than 1280px, still show 6
    if (width > 1280) return 6;

    // Find the matching responsive option
    const option = responsiveOptions.find(
      (opt) => width <= parseInt(opt.breakpoint)
    );
    return option ? option.numVisible : 6;
  }

  // Updated page navigation logic
  const numScroll = 1;
  const totalItems = data?.length || 0;
  // const totalPages = Math.max(1, Math.ceil(totalItems / numScroll)); // Ensure we have at least 1 page

  const next = () => {
    // Calculate the next page, ensuring we wrap around properly
    const maxPage = totalItems - numVisible;
    setPage((prevPage) => (prevPage < maxPage ? prevPage + numScroll : 0));
  };

  const prev = () => {
    // Calculate the previous page, ensuring we wrap around properly
    const maxPage = totalItems - numVisible;
    setPage((prevPage) => (prevPage > 0 ? prevPage - numScroll : maxPage));
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

  // see all click handler
  const onSeeAllClick = () => {
    router.push(`/see-all/${title?.toLocaleLowerCase().replace(/\s/g, "-")}`);
  };

  return (
    data?.length > 0 && (
      <div className={`${last && "mb-20"}`}>
        <div className="flex justify-between mx-[6px]">
          <span className="font-inter font-bold text-xl sm:text-2xl leading-8 tracking-normal text-gray-900">
            {title}
          </span>
          <div className="flex items-center justify-end gap-x-2 mb-2">
            {/* See All Button */}
            {pathname !== "/store" && pathname !== "/restaurants" && cuisines==false && (
              <CustomButton
                label="See all"
                onClick={onSeeAllClick}
                className="text-[#0EA5E9] transition-colors duration-200 text-sm md:text-base "
              />
            )}

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
              className="w-[100%] h-[100%]"
              itemTemplate={(item) => (
                  <SquareCard item={item} showLogo={showLogo} cuisines={cuisines} />
              )}
              numVisible={numVisible}
              numScroll={1}
              circular={true}
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

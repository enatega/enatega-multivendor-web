"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";
import SquareCard from "../square-card";
import CustomButton from "../button";

const responsiveOptions = [
  { breakpoint: "1280px", numVisible: 6, numScroll: 1 },
  { breakpoint: "1024px", numVisible: 4, numScroll: 1 },
  { breakpoint: "640px", numVisible: 3, numScroll: 1 },
  { breakpoint: "425px", numVisible: 2, numScroll: 1 },
  { breakpoint: "320px", numVisible: 1, numScroll: 1 },
];

// Define the props interface
interface CuisinesSliderCardProps {
  title: string;
  data: any[];
  last?: boolean;
  showLogo?: boolean;
  cuisines?: boolean;
  onCardClick?: (item: any) => void;
}

const CuisinesSliderCard: React.FC<CuisinesSliderCardProps> = ({
  title,
  data,
  last,
  showLogo,
  cuisines,
  onCardClick,
}) => {
  console.log("CuisinesSliderCard rendering with:", { 
    title, 
    dataLength: data?.length, 
    hasClickHandler: !!onCardClick 
  });


  const [page, setPage] = useState(0);
  const [numVisible, setNumVisible] = useState(getNumVisible());
  const [userInteracted, setUserInteracted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  function getNumVisible() {
    if (typeof window === "undefined") return 6;
    const width = window.innerWidth;
    if (width > 1280) return 6;
    const option = responsiveOptions.find(
      (opt) => width <= parseInt(opt.breakpoint)
    );
    return option ? option.numVisible : 6;
  }

  const numScroll = 1;
  const totalItems = data?.length || 0;

  const next = useCallback(() => {
    setUserInteracted(true);
    const maxPage = totalItems - numVisible;
    setPage((prevPage) => (prevPage < maxPage ? prevPage + numScroll : 0));
  }, [totalItems, numVisible, numScroll]);

  const prev = useCallback(() => {
    setUserInteracted(true);
    const maxPage = totalItems - numVisible;
    setPage((prevPage) => (prevPage > 0 ? prevPage - numScroll : maxPage));
  }, [totalItems, numVisible, numScroll]);

  // Create a card item renderer with memoization to avoid unnecessary rerenders
 const renderCardItem = useCallback((item) => {
    console.log("Rendering card item:", item);
    console.log("Passing onCardClick:", !!onCardClick);
    
    return (
      <SquareCard 
        item={item} 
        showLogo={showLogo} 
        cuisines={cuisines} 
        onCardClick={onCardClick} // Pass the handler to SquareCard
      />
    );
  }, [showLogo, cuisines, onCardClick]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setNumVisible(getNumVisible());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (data.length <= numVisible || userInteracted) return;

    const interval = setInterval(() => {
      const maxPage = data.length - numVisible;
      setPage((prevPage) => (prevPage < maxPage ? prevPage + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length, numVisible, userInteracted]);

  // Resume auto-scroll after 30s
  useEffect(() => {
    if (!userInteracted) return;
    const timeout = setTimeout(() => setUserInteracted(false), 30000);
    return () => clearTimeout(timeout);
  }, [userInteracted]);

  const onSeeAllClick = () => {
    router.push(`/see-all/${title?.toLocaleLowerCase().replace(/\s/g, "-")}`);
  };

  // Debug check to make sure data is valid
  console.log("CuisinesSliderCard rendering with data:", data);

  // Only render if we have data
  if (!data?.length) {
    console.log("No data to display in CuisinesSliderCard");
    return null;
  }

  return (
    <div className={`${last && "mb-20"}`}>
      <div className="flex justify-between mx-[6px]">
        <span className="mb-1 font-inter font-bold text-xl sm:text-2xl leading-8 tracking-normal text-gray-900">
          {title}
        </span>
        <div className="flex items-center justify-end gap-x-2 mb-2">
          {pathname !== "/store" && pathname !== "/restaurants" && !cuisines && (
            <CustomButton
              label="See all"
              onClick={onSeeAllClick}
              className="text-[#0EA5E9] transition-colors duration-200 text-sm md:text-base "
            />
          )}
          {data.length > numVisible && (
            <div className="gap-x-2 hidden md:flex">
              <button
                className="w-8 h-8 flex items-center justify-center shadow-md rounded-full"
                onClick={prev}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center shadow-md rounded-full"
                onClick={next}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className=""
        style={{
          width: data.length < 4 ? "auto" : "100%",
          minWidth: "300px",
        }}
      >
        <Carousel
          value={data}
          className="w-full h-[100%] "
          itemTemplate={renderCardItem}
          numVisible={numVisible}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          showIndicators={false}
          showNavigators={false}
          page={page}
          onPageChange={(e) => setPage(e.page)}
        />
      </div>
    </div>
  );
};

export default CuisinesSliderCard;
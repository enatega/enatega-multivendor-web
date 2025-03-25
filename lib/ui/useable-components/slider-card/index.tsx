"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";

import { Tag } from "primereact/tag";
import {
  ISliderCardComponentProps,
  ISliderCardItemProps,
} from "@/lib/utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faClock,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const responsiveOptions = [
  { breakpoint: "1024px", numVisible: 4, numScroll: 1 }, // If screen width is ≤ 1024px, show 4 items
  { breakpoint: "768px", numVisible: 3, numScroll: 1 }, // If screen width is ≤ 768px, show 3 items
  { breakpoint: "560px", numVisible: 2, numScroll: 1 }, // If screen width is ≤ 560px, show 2 items
  { breakpoint: "400px", numVisible: 1, numScroll: 1 }, // If screen width is ≤ 400px, show 1 item
];

const SliderCard = <T,>({ title, data }: ISliderCardComponentProps<T>) => {
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
  // Templates
  const itemTemplate = (item: ISliderCardItemProps) => {
    return (
      <div className="rounded-lg overflow-hidden m-2 ml-2 mr-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40  rounded-md rounded-b-none "
        />
        <div className="p-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-500 text-sm">{item.category}</p>
          <div className="flex items-center justify-between mt-2">
            <Tag value={item.deliveryTime} severity="success" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <FontAwesomeIcon icon={faClock} /> {item.time}
            <FontAwesomeIcon icon={faUsers} /> {item.reviews}
            <FontAwesomeIcon icon={faStar} /> {item.rating}
          </div>
        </div>
      </div>
    );
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
    Math.ceil((data.length - (numVisible || 0)) / numScroll) + 1; // Total pages

  return (
    <div className=" ml-8 mr-10 md:ml-12 md:mr-14">
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
        itemTemplate={itemTemplate}
        numVisible={numVisible}
        numScroll={1}
        circular
        responsiveOptions={responsiveOptions}
        showIndicators={false}
        showNavigators={false}
        page={page}
      />
    </div>
  );
};

export default SliderCard;

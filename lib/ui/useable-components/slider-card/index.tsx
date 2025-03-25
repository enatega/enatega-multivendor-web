import React, { useRef, useState } from "react";
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
  { breakpoint: "768px", numVisible: 1, numScroll: 1 }, // Mobile
  { breakpoint: "1024px", numVisible: 2, numScroll: 1 }, // Tablets
  { breakpoint: "1200px", numVisible: 3, numScroll: 1 }, // Laptops
  { breakpoint: "1400px", numVisible: 4, numScroll: 1 }, // Desktops
  { breakpoint: "1600px", numVisible: 5, numScroll: 1 }, // Large Desktops
];
const SliderCard = ({ title, data }: ISliderCardComponentProps) => {
  const [page, setPage] = useState(0);
  const numVisible = 4; // Visible items
  const numScroll = 1; // Scroll by 1 item

  const totalPages = Math.ceil((data.length - numVisible) / numScroll) + 1; // Total pages

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

  const itemTemplate = (item: ISliderCardItemProps) => {
    return (
      <div
        className="rounded-lg overflow-hidden m-2 ml-2 mr-2"
        style={{ width: "400px" }}
      >
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

  return (
    <div className="ml-12 mr-14">
      <div className="flex justify-between">
        <span>{title}</span>
        <div className="flex items-center justify-end gap-x-2 mb-2">
          {/* "See all" Button */}

          <span className="text-blue-500 text-sm font-inter font-medium tracking-[0px]">
            See All
          </span>

          {/* Navigation Buttons */}
          <div className="flex gap-x-2">
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

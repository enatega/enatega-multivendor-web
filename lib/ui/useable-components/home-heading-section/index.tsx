// core
import React from "react";

// icons
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomeHeadingSection({
  title = "Restaurants near me",
}: {
  title?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between ml-8 mr-10 md:ml-12 md:mr-14 mb-8">
      <span className="font-inter font-bold text-2xl sm:text-4xl leading-8 tracking-normal text-gray-900">
        {title}
      </span>
      <div className="flex items-center justify-end gap-x-2 mb-2">
        <span className="text-blue-500 text-sm font-inter font-medium tracking-[0px]">
          Sorted by Recommended
        </span>

        {/* Filter Buttons */}
        <div className="gap-x-2 md:flex">
          <button className="w-8 h-8 flex items-center justify-center  shadow-md  rounded-full">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeHeadingSection;

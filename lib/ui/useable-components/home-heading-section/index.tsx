// core
import React from "react";

// icons
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../button";
import MapViewButton from "../mapViewButton";

function HomeHeadingSection({
  title = "Restaurants near me",
  onPress,
  appliedFilters,
  sortByTitle,
  showFilter = true,
}: {
  title: string;
  onPress?: () => void;
  appliedFilters?: number;
  sortByTitle?: string;
  showFilter?: boolean;
}) {

  return (
    <div className="flex justify-between items-center mx-[6px] mb-8">
      <span className="font-inter font-bold text-2xl sm:text-4xl leading-8 tracking-normal text-gray-900">
        {title}
      </span>
      <div className="flex items-center gap-4">
        <MapViewButton />

        {
          showFilter && (
            <div className="flex items-center justify-end gap-x-2">
              <CustomButton
                label={`Sorted by ${sortByTitle}`}
                onClick={onPress}
                className="text-sky-500 transition-colors duration-200 text-sm md:text-base hidden sm:block"
              />

              {/* Filter Buttons */}
              <div className="gap-x-2">
                <button className="w-8 h-8 flex items-center justify-center  shadow-md  rounded-full">
                  <FontAwesomeIcon icon={faFilter} />
                </button>
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
}

export default HomeHeadingSection;

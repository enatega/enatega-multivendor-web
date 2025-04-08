/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";

// Icons
import { ClockSvg, HeartSvg, InfoSvg, RatingSvg } from "@/lib/utils/assets/svg";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

// Hook
// import useRestaurant from "@/lib/hooks/useRestaurant";

// Components
import Spacer from "@/lib/ui/useable-components/spacer";
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import CustomIconTextField from "@/lib/ui/useable-components/input-icon-field";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import { Dialog } from "primereact/dialog";

// Interface
import { ICategory, IFood } from "@/lib/utils/interfaces";

// Hook
import useRestaurant from "@/lib/hooks/useRestaurant";

// Methods
import { toSlug } from "@/lib/utils/methods";
import BannerSkeleton from "@/lib/ui/useable-components/custom-skeletons/food-items.skeleton";
import { Skeleton } from "primereact/skeleton";
import FoodCategorySkeleton from "@/lib/ui/useable-components/custom-skeletons/food-items.skeleton";

export default function RestaurantDetailsScreen() {
  // Params
  const { id, slug }: { id: string; slug: string } = useParams();

  // State
  const [filter, setFilter] = useState("");

  // Hooks
  const { data, loading } = useRestaurant(id, decodeURIComponent(slug));

  // Constants
  const allDeals = data?.restaurant?.categories?.filter(
    (cat: ICategory) => cat.foods.length
  );

  const deals = useMemo(() => {
    return (
      (allDeals || [])
        .filter((c: ICategory) => {
          // Only apply filter logic if `filter` is not an empty string
          if (filter.trim() === "") return true; // If filter is empty, don't filter, just map

          // Check if the category title or any food title contains the filter text
          const categoryMatches = c.title
            .toLowerCase()
            .includes(filter.toLowerCase());
          const foodsMatch = c.foods.some((food: IFood) =>
            food.title.toLowerCase().includes(filter.toLowerCase())
          );

          return categoryMatches || foodsMatch; // Keep category if it matches or any of the foods
        })
        .map((c: ICategory, index: number) => ({
          ...c,
          index,
          foods: c.foods.map((food: IFood) => ({
            ...food,
            title: food.title.toLowerCase(), // Modify food titles if needed
          })),
        })) || []
    );
  }, [allDeals, filter]);

  const headerData = {
    name: data?.restaurant?.name ?? "...",
    averageReview: data?.restaurant?.reviewData?.ratings ?? "...",
    averageTotal: data?.restaurant?.reviewData?.total ?? "...",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
    deals: deals,
    deliveryTime: data?.restaurant?.deliveryTime,
  };

  const restaurantInfo = {
    _id: data?.restaurant._id ?? "",
    name: data?.restaurant?.name ?? "...",
    image: data?.restaurant?.image ?? "",
    deals: deals,
    reviewData: data?.restaurant?.reviewData ?? {},
    address: data?.restaurant?.address ?? "",
    deliveryCharges: data?.restaurant?.deliveryCharges ?? "",
    deliveryTime: data?.restaurant?.deliveryTime ?? "...",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
  };

  // States
  const [visibleItems, setVisibleItems] = useState(10); // Default visible items
  const [showAll, setShowAll] = useState(false);
  const [headerHeight, setHeaderHeight] = useState("64px"); // Default for desktop
  const [showDialog, setShowDialog] = useState<IFood | null>(null);

  // Handlers
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    const container = document.querySelector(".scrollable-container"); // Adjust selector

    if (element && container) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      container.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Function to show all categories
  useEffect(() => {
    // Adjust visible items based on screen width
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleItems(10); // Small screens
      } else if (width < 1024) {
        setVisibleItems(4); // Medium screens
      } else {
        setVisibleItems(5); // Large screens
      }
    };
    const updateHeight = () => {
      if (window.innerWidth >= 1024)
        setHeaderHeight("64px"); // lg (desktop)
      else if (window.innerWidth >= 768)
        setHeaderHeight("80px"); // md (tablet)
      else if (window.innerWidth >= 640)
        setHeaderHeight("100px"); // sm (larger phones)
      else setHeaderHeight("120px"); // xs (small phones)
    };

    updateHeight();
    updateVisibleItems();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col pb-20">
        <div className="scrollable-container flex-1 overflow-auto">
          {/* Banner */}

          <div className="relative">
            {loading ?
              <Skeleton width="100%" height="20rem" borderRadius="0" />
            : <img
                alt="McDonald's banner with a burger and fries"
                className="w-full h-72 object-cover"
                height="300"
                // src="https://storage.googleapis.com/a1aa/image/l_S6V3o3Sf_fYnRuAefKySjq6q-HmTjiF37tvk6PiMU.jpg"
                src={restaurantInfo.image}
                width="1200"
              />
            }

            {!loading && (
              <div className="absolute bottom-0 left-0 md:left-20 p-4">
                <div className="flex flex-col items-start">
                  <img
                    alt="McDonald's logo"
                    className="w-12 h-12 mb-2"
                    height="50"
                    // src="https://storage.googleapis.com/a1aa/image/_a4rKBo9YwPTH-AHQzOLoIcNAirPNTI7alqAVAEqmOo.jpg"
                    src={restaurantInfo.image}
                    width="50"
                  />

                  <div className="text-white space-y-2">
                    <h1 className="font-inter font-extrabold text-[32px] leading-[100%] sm:text-[40px] md:text-[48px]">
                      {restaurantInfo.name}
                    </h1>
                    <p className="font-inter font-medium text-[18px] leading-[28px] sm:text-[20px] sm:leading-[30px] md:text-[24px] md:leading-[32px]">
                      {restaurantInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute top-4 right-4 md:bottom-4 md:right-4 md:top-auto rounded-full bg-white h-8 w-8 flex justify-center items-center">
              {/* <FontAwesomeIcon icon={faHeart} className="  text-2xl" /> */}
              <HeartSvg />
            </div>
          </div>

          {/* Restaurnat Info */}
          <div className="bg-gray-50  shadow-[0px_1px_3px_rgba(0,0,0,0.1)]  p-3 h-[80px] flex justify-between items-center">
            <PaddingContainer>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Time */}
                <span className="flex items-center gap-2 text-gray-600 font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle">
                  <ClockSvg />
                  {loading ?
                    <Skeleton width="2rem" height="1.5rem" />
                  : headerData.deliveryTime}
                  mins
                </span>

                {/* Rating */}
                <span className="flex items-center gap-2 text-gray-600 font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle">
                  <RatingSvg />
                  {loading ?
                    <Skeleton width="2rem" height="1.5rem" />
                  : headerData.averageReview}
                </span>

                {/* Info Link */}
                <a
                  className="flex items-center gap-2 text-[#0EA5E9] font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle"
                  href="#"
                >
                  <InfoSvg />
                  {loading ?
                    <Skeleton width="10rem" height="1.5rem" />
                  : "See more information"}
                </a>
              </div>
            </PaddingContainer>
          </div>

          <Spacer height="20px" />

          {/* Category Section */}
          <PaddingContainer
            height={headerHeight}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              backgroundColor: "white",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="p-3 h-full w-full flex flex-col md:flex-row gap-2 items-center justify-between">
              {/* Category List - Full Width on Small Screens, 80% on Larger Screens */}
              <div className="relative w-full md:w-[80%]">
                <div
                  className="h-12 w-full overflow-x-auto overflow-y-hidden flex items-center 
                  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <ul className="flex space-x-4 items-center w-max flex-nowrap">
                    {(showAll ? deals : deals.slice(0, visibleItems)).map(
                      (category: ICategory, index: number) => (
                        <li key={index} className="shrink-0">
                          <button
                            className="bg-gray-100 text-gray-600 rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap"
                            onClick={() => handleScroll(toSlug(category.title))}
                          >
                            {category.title}
                          </button>
                        </li>
                      )
                    )}

                    {!showAll && deals.length > visibleItems && (
                      <li className="shrink-0">
                        <span
                          className="bg-blue-500 text-white rounded-full px-4 py-2 font-medium text-[14px] cursor-pointer"
                          onClick={() => setShowAll(true)}
                        >
                          More
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Search Input - 20% Width on Large Screens, Full Width on Small Screens */}
              <div className="h-full w-full md:w-[20%]">
                {
                  <CustomIconTextField
                    value={filter}
                    className="w-full md:h-10 h-9 rounded-full pl-10"
                    iconProperties={{
                      icon: faSearch,
                      position: "left",
                      style: { marginTop: "-10px" },
                    }}
                    placeholder="Search for Restaurants"
                    type="text"
                    name="search"
                    showLabel={false}
                    isLoading={loading}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                }
              </div>
            </div>
          </PaddingContainer>

          <Spacer height="20px" />

          {/* Main Section */}

          <PaddingContainer>
            {loading ?
              <FoodCategorySkeleton />
            : deals.map((category: ICategory, catIndex: number) => (
                <div
                  key={catIndex}
                  className="mb-4 p-3"
                  id={toSlug(category.title)}
                >
                  <h2 className="mb-4 font-inter text-gray-900 font-bold text-2xl sm:text-xl leading-snug tracking-tight">
                    {category.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {category.foods.map((meal: IFood, mealIndex) => (
                      <div
                        key={mealIndex}
                        className="flex items-center gap-4 rounded-lg border border-gray-300 shadow-sm bg-white p-3 relative"
                      >
                        {/* Text Content */}
                        <div className="flex-grow text-left md:text-left space-y-2">
                          <h3 className="text-gray-900 text-lg font-semibold font-inter">
                            {meal.title}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            {meal.description}
                          </p>

                          <div className="flex items-center gap-2">
                            <span className="text-[#0EA5E9] text-lg font-semibold">
                              Rs. {meal.variations[0].price}
                            </span>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28">
                          <img
                            alt={meal.title}
                            className="w-full h-full object-contain mx-auto md:mx-0"
                            src={meal.image}
                          />
                        </div>

                        {/* Image Section */}
                        <div className="absolute top-2 right-2">
                          <button
                            className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center"
                            onClick={() => setShowDialog(meal)}
                          >
                            <FontAwesomeIcon icon={faPlus} color="white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
          </PaddingContainer>
        </div>
      </div>

      <Dialog
        visible={!!showDialog}
        className="mx-4 md:mx-0" // Adds margin on small screens
        onHide={() => {
          if (!showDialog) return;
          setShowDialog(null);
        }}
      >
        <FoodItemDetail
          foodItem={showDialog}
          addons={data?.restaurant?.addons}
          options={data?.restaurant?.options}
        />
      </Dialog>
    </>
  );
}

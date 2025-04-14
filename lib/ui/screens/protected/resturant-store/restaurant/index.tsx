"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";

// Context & Hooks
import useUser from "@/lib/hooks/useUser";
import useRestaurant from "@/lib/hooks/useRestaurant";

// Icons
import { ClockSvg, HeartSvg, InfoSvg, RatingSvg } from "@/lib/utils/assets/svg";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

// Components
import Spacer from "@/lib/ui/useable-components/spacer";
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import CustomIconTextField from "@/lib/ui/useable-components/input-icon-field";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import FoodCategorySkeleton from "@/lib/ui/useable-components/custom-skeletons/food-items.skeleton";

// Interface
import { ICategory, IFood } from "@/lib/utils/interfaces";

// Methods
import { toSlug } from "@/lib/utils/methods";
import ChatSvg from "@/lib/utils/assets/svg/chat";
import ReviewsModal from "@/lib/ui/useable-components/reviews-modal";
import InfoModal from "@/lib/ui/useable-components/info-modal";

export default function RestaurantDetailsScreen() {
  // Access the UserContext via our custom hook
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();

  // Params from route
  const { id, slug }: { id: string; slug: string } = useParams();



  // State
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  // Fetch restaurant data
  const { data, loading } = useRestaurant(id, decodeURIComponent(slug));

  // Transform cart items when restaurant data is loaded - only once when dependencies change
  useEffect(() => {
    if (data?.restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, data.restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [data?.restaurant, cart?.length]); // Only re-run when restaurant data or cart length changes

  // Filter food categories based on search term
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
          foods: c.foods.filter(food => {
            // If filter is empty, include all foods
            if (filter.trim() === "") return true;
            
            // Include food if title or description matches filter
            return (
              food.title.toLowerCase().includes(filter.toLowerCase()) ||
              (food.description && food.description.toLowerCase().includes(filter.toLowerCase()))
            );
          }),
        }))
        .filter((c: ICategory) => c.foods.length > 0) || []
    );
  }, [allDeals, filter]);

  // Restaurant info
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
    _id: data?.restaurant?._id ?? "",
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

  const restaurantInfoModalProps={
    _id: data?.restaurant._id ?? "",
    name: data?.restaurant?.name ?? "...",
    username: data?.restaurant?.username ?? "N/A",
    phone: data?.restaurant?.phone ?? "N/A",
    address: data?.restaurant?.address ?? "N/A",
    location: data?.restaurant?.location ?? "N/A",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
    description: data?.restaurant?.description ?? "Preservation of the authentic taste of all traditional foods is upheld here.",
  }

  // States
  const [visibleItems, setVisibleItems] = useState(10); // Default visible items
  const [showAll, setShowAll] = useState(false);
  const [headerHeight, setHeaderHeight] = useState("64px"); // Default for desktop
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  // Handlers
  const handleScroll = (id: string) => {
    setSelectedCategory(id);
    const element = document.getElementById(id);
    const container = document.querySelector(".scrollable-container");

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

    // Function to handle opening the food item modal
    const handleOpenFoodModal = (food: IFood) => {
      // Add restaurant ID to the food item
      setSelectedFood({
        ...food,
        restaurant: restaurantInfo._id
      });
      setShowDialog(true);
    };
  
    // Function to close the food item modal
    const handleCloseFoodModal = () => {
      setShowDialog(false);
      setSelectedFood(null);
    };

  // Adjust UI based on screen size
  // Function to handle the logic for seeing reviews
  const handleSeeReviews = () => {
    setShowReviews(true);
  }

  // Function to handle the logic for seeing more information
  const handleSeeMoreInfo = () => {
    setShowMoreInfo(true);
  }


  // Function to show all categories
  useEffect(() => {
    // Adjust visible items based on screen width
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleItems(3); // Small screens
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
           {/* Reviews Modal  */}
            <ReviewsModal
              restaurantId={id}
              visible={showReviews && !loading}
              onHide={() => setShowReviews(false)}
            />
            {/* See More  Info Modal */}
            <InfoModal
             restaurantInfo={restaurantInfoModalProps}
             // make sure data is not loading because if configuration data is not available it can cause error on google map due to unavailability of api key
             visible={showMoreInfo && !loading}
             onHide={() => setShowMoreInfo(false)}
            />
      <div className="w-screen h-screen flex flex-col pb-20">
        <div className="scrollable-container flex-1 overflow-auto">
          {/* Banner */}
          <div className="relative">
            {loading ? (
              <Skeleton width="100%" height="20rem" borderRadius="0" />
            ) : (
              <img
                alt={`${restaurantInfo.name} banner`}
                className="w-full h-72 object-cover"
                height="300"
                src={restaurantInfo.image}
                width="1200"
              />
            )}

            {!loading && (
              <div className="absolute bottom-0 left-0 md:left-20 p-4">
                <div className="flex flex-col items-start">
                  <img
                    alt={`${restaurantInfo.name} logo`}
                    className="w-12 h-12 mb-2"
                    height="50"
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
              <HeartSvg />
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="bg-gray-50 shadow-[0px_1px_3px_rgba(0,0,0,0.1)] p-3 h-[80px] flex justify-between items-center">
            <PaddingContainer>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Time */}
                <span className="flex items-center gap-2 text-gray-600 font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle">
                  <ClockSvg />
                  {loading ? (
                    <Skeleton width="2rem" height="1.5rem" />
                  ) : (
                    `${headerData.deliveryTime} mins`
                  )}
                </span>

                {/* Rating */}
                <span className="flex items-center gap-2 text-gray-600 font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle">
                  <RatingSvg />
                  {loading ? (
                    <Skeleton width="2rem" height="1.5rem" />
                  ) : (
                    headerData.averageReview
                  )}
                </span>

                {/* Info Link */}
                <a
                  className="flex items-center gap-2 text-[#0EA5E9] font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle"
                  href="#"
                  onClick={(e)=>{
                    e.preventDefault();
                    handleSeeMoreInfo();
                  }}
                >
                  <InfoSvg />
                  {loading ? (
                    <Skeleton width="10rem" height="1.5rem" />
                  ) : (
                    "See more information"
                  )}
                </a>
                 {/* Review Link */}
                 <a
                  className="flex items-center gap-2 text-[#0EA5E9] font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle"
                  href="#"
                  onClick={(e)=>{
                    e.preventDefault();
                    handleSeeReviews();
                  }}
                >
                  <ChatSvg />
                  {loading ?
                    <Skeleton width="10rem" height="1.5rem" />
                  : "See reviews"}
                </a>
              </div>
            </PaddingContainer>
          </div>

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
                      (category: ICategory, index: number) => {
                        const _slug = toSlug(category.title);
                        return (
                          <li key={index} className="shrink-0">
                            <button
                              type="button"
                              className={`bg-${selectedCategory === _slug ? "[#F3FFEE]" : "gray-100"} text-${selectedCategory === _slug ? "[#5AC12F]" : "gray-600"} rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap`}
                              onClick={() =>
                                handleScroll(toSlug(category.title))
                              }
                            >
                              {category.title}
                            </button>
                          </li>
                        );
                      }
                    )}

                    {!showAll && deals.length > visibleItems && (
                      <li className="shrink-0">
                        <button
                          type="button"
                          className="bg-blue-500 text-white rounded-full px-4 py-2 font-medium text-[14px] cursor-pointer"
                          onClick={() => setShowAll(true)}
                        >
                          More
                        </button>
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
                    placeholder="Search for food items"
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

          {/* Food Categories and Items */}
          <PaddingContainer>
            {loading ? (
              <FoodCategorySkeleton />
            ) : (
              deals.map((category: ICategory, catIndex: number) => (
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

                        {/* Add Button */}
                        <div className="absolute top-2 right-2">
                          <button
                            className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center"
                            onClick={() => handleOpenFoodModal(meal)}
                            type="button"
                          >
                            <FontAwesomeIcon icon={faPlus} color="white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </PaddingContainer>
        </div>
      </div>

      {/* Food Item Detail Modal */}
      <Dialog
        visible={showDialog}
        className="mx-4 md:mx-0" // Adds margin on small screens
        onHide={handleCloseFoodModal}
      >
        {selectedFood && (
          <FoodItemDetail
            foodItem={selectedFood}
            addons={data?.restaurant?.addons}
            options={data?.restaurant?.options}
            onClose={handleCloseFoodModal}
          />
        )}
      </Dialog>
    </>
  );
}
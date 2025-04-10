/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";
import { useQuery } from "@apollo/client";
import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";

// Icons
import { ClockSvg, HeartSvg, InfoSvg, RatingSvg } from "@/lib/utils/assets/svg";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Hook
// import useRestaurant from "@/lib/hooks/useRestaurant";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
// import CustomIconTextField from "@/lib/ui/useable-components/input-icon-field";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import FoodCategorySkeleton from "@/lib/ui/useable-components/custom-skeletons/food-items.skeleton";

// Interface
import {
  ICategory,
  ICategoryDetailsResponse,
  ICategoryV2,
  IFood,
  ISubCategory,
  ISubCategoryV2,
} from "@/lib/utils/interfaces";

// Hook
import useRestaurant from "@/lib/hooks/useRestaurant";

// API
import {
  GET_CATEGORIES_SUB_CATEGORIES_LIST,
  GET_SUB_CATEGORIES,
} from "@/lib/api/graphql";

// Methods
import { toSlug } from "@/lib/utils/methods";
import ReviewsModal from "@/lib/ui/useable-components/reviews-modal";
import InfoModal from "@/lib/ui/useable-components/info-modal";
import ChatSvg from "@/lib/utils/assets/svg/chat";

export default function StoreDetailsScreen() {
  // Params
  const { id, slug }: { id: string; slug: string } = useParams();

  // State
  const [showDialog, setShowDialog] = useState<IFood | null>(null);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [filter] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategoriesForCategories, setSubCategoriesForCategories] = useState<
    ICategoryDetailsResponse[]
  >([]);

  // Ref
  const selectedCategoryRefs = useRef<string>("");
  const selectedSubCategoryRefs = useRef<string>("");

  // Hooks
  const { data, loading } = useRestaurant(id, decodeURIComponent(slug));
  const {
    data: categoriesSubCategoriesList,
    loading: categoriesSubCategoriesLoading,
  } = useQuery(GET_CATEGORIES_SUB_CATEGORIES_LIST, {
    variables: {
      storeId: id,
    },
  });
  const { data: subcategoriesData, loading: subcategoriesLoading } =
    useQuery(GET_SUB_CATEGORIES);

  // Constants
  const allDeals = data?.restaurant?.categories?.filter(
    (cat: ICategory) => cat.foods.length
  );

  // Templates
  const parentItemRenderer = (item: MenuItem) => {
    const _url = item.url?.slice(1);
    const isClicked = _url === selectedCategoryRefs.current;

    return (
      <div
        className="flex align-items-center px-3 py-2 cursor-pointer"
        onClick={() => handleScroll(_url ?? "", true)}
      >
        <span
          className={`mx-2 ${item.items && "font-semibold"} text-${isClicked ? "[#5AC12F]" : "gray-600"}`}
        >
          {item.label}
        </span>
      </div>
    );
  };
  const itemRenderer = (item: MenuItem) => {
    const _url = item.url?.slice(1);
    const isClicked = _url === selectedSubCategoryRefs.current;

    return (
      <div
        className={`flex align-items-center px-3 py-2 cursor-pointer bg-${isClicked ? "[#F3FFEE]" : ""}`}
        onClick={() => handleScroll(_url ?? "", false, 80)}
      >
        <span
          className={`mx-2 ${item.items && "font-semibold"} text-${isClicked ? "[#5AC12F]" : "gray-600"}`}
        >
          {item.label}
        </span>
      </div>
    );
  };

  // Memo
  const deals = useMemo(() => {
    const subCategories = subcategoriesData?.subCategories;
    if (!allDeals || !subCategories) return [];

    return (
      allDeals
        .map((category: ICategory, index: number) => {
          // Get subCategories for this category
          const subCats = subCategories.filter(
            (sc: ISubCategory) => sc.parentCategoryId === category._id
          );

          // Group foods by subCategoryId
          const groupedFoods: Record<string, IFood[]> = {};

          category.foods.forEach((food) => {
            const subCatId = food.subCategory || "uncategorized";
            if (!groupedFoods[subCatId]) groupedFoods[subCatId] = [];
            groupedFoods[subCatId].push({
              ...food,
              title: food.title.toLowerCase(),
            });
          });

          // Build sub-category groups with foods
          const subCategoryGroups = subCats
            .map((subCat: ISubCategory) => {
              const foods = groupedFoods[subCat._id] || [];
              return foods.length > 0
                ? {
                    _id: subCat._id,
                    title: subCat.title,
                    foods,
                  }
                : null;
            })
            .filter(Boolean) as {
            _id: string;
            title: string;
            foods: IFood[];
          }[];

          // Add uncategorized group if it has foods
          if (groupedFoods["uncategorized"]?.length > 0) {
            subCategoryGroups.push({
              _id: "uncategorized",
              title: "Uncategorized",
              foods: groupedFoods["uncategorized"],
            });
          }

          // Only return category if it has at least one sub-category with foods
          if (subCategoryGroups.length === 0) return null;

          return {
            ...category,
            index,
            subCategories: subCategoryGroups,
          };
        })
        .filter(Boolean) || []
    );
  }, [allDeals, filter, subcategoriesData?.subCategories]);

  const menuItems = useMemo(() => {
    return categoriesSubCategoriesList?.fetchCategoryDetailsByStoreId.map(
      (item: ICategoryDetailsResponse) => ({
        id: item.id,
        label: item.label,
        url: item.url,
        template: parentItemRenderer,
        items:
          item.items?.map((subItem) => ({
            id: subItem.id,
            label: subItem.label,
            url: subItem.url,

            template: itemRenderer,
          })) || [],
      })
    );
  }, [categoriesSubCategoriesList?.fetchCategoryDetailsByStoreId]);

  // Handlers
  const handleScroll = (id: string, isParent = true, offset: number = 120) => {
    if (isParent) {
      setSelectedCategory(id);
      selectedCategoryRefs.current = id || "";
      // Filter SubCategories
      const sliderSubCategories =
        menuItems?.find(
          (item: ICategoryDetailsResponse) => toSlug(item.label) === id
        ).items || [];

      setSubCategoriesForCategories(sliderSubCategories);
    } else {
      selectedSubCategoryRefs.current = id || "";
      setSelectedSubCategory(id);
    }
    const element = document.getElementById(id);
    const container = document.querySelector(".scrollable-container"); // Adjust selector

    if (element && container) {
      const headerOffset = offset;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      container.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleMouseEnterCategoryPanel = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
  };

  // Constants
  const headerData = {
    name: data?.restaurant?.name ?? "...",
    averageReview: data?.restaurant?.reviewData?.ratings ?? "...",
    averageTotal: data?.restaurant?.reviewData?.total ?? "...",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
    deliveryTime: data?.restaurant?.deliveryTime,
  };

  const restaurantInfo = {
    _id: data?.restaurant._id ?? "",
    name: data?.restaurant?.name ?? "...",
    image: data?.restaurant?.image ?? "",
    reviewData: data?.restaurant?.reviewData ?? {},
    address: data?.restaurant?.address ?? "",
    deliveryCharges: data?.restaurant?.deliveryCharges ?? "",
    deliveryTime: data?.restaurant?.deliveryTime ?? "...",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
  };

  const restaurantInfoModalProps = {
    _id: data?.restaurant._id ?? "",
    name: data?.restaurant?.name ?? "...",
    address: data?.restaurant?.address ?? "",
    location: data?.restaurant?.location ?? "",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
    description:
      data?.restaurant?.description ??
      "Preservation of the authentic taste of all traditional foods is upheld here.",
  };

  // Function to handle the logic for seeing reviews
  const handleSeeReviews = () => {
    setShowReviews(true);
  };

  // Function to handle the logic for seeing more information
  const handleSeeMoreInfo = () => {
    setShowMoreInfo(true);
  };

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
                alt="McDonald's banner with a burger and fries"
                className="w-full h-72 object-cover"
                height="300"
                // src="https://storage.googleapis.com/a1aa/image/l_S6V3o3Sf_fYnRuAefKySjq6q-HmTjiF37tvk6PiMU.jpg"
                src={restaurantInfo.image}
                width="1200"
              />
            )}

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
          <div className="bg-gray-50 shadow-[0px_1px_3px_rgba(0,0,0,0.1)]  p-3 md:h-[80px] h-fit flex justify-between items-center">
            <PaddingContainer>
              <div className="p-3  h-full w-full flex flex-col md:flex-row gap-2 items-center justify-between">
                <div className="w-full md:w-[80%]">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    {/* Time */}
                    <span className="flex items-center gap-2 text-gray-600 font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle">
                      <ClockSvg />
                      {loading ? (
                        <Skeleton width="2rem" height="1.5rem" />
                      ) : (
                        headerData.deliveryTime
                      )}
                      mins
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
                      onClick={(e)=> {
                        e.preventDefault();
                        handleSeeReviews();
                      } }
                    >
                      <ChatSvg />
                      {loading ? (
                        <Skeleton width="10rem" height="1.5rem" />
                      ) : (
                        "See reviews"
                      )}
                    </a>
                  </div>
                </div>
                {/* 
                <div className="w-full md:w-[20%]">
                  <CustomIconTextField
                    value={filter}
                    className="w-full md:h-10 h-9 rounded-full pl-10 mt-2 md:mt-0"
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
                </div> */}
              </div>
            </PaddingContainer>
          </div>

          {/* Category Section */}
          <PaddingContainer
            // height="90px"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              backgroundColor: "white",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="p-3 h-full w-full flex flex-col md:hidden gap-2 items-center justify-between">
              {/* Categories */}
              <div
                className="w-full overflow-x-auto overflow-y-hidden flex items-center 
                  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <ul className="flex space-x-4 items-center w-max flex-nowrap">
                  {menuItems?.map(
                    (category: ICategoryDetailsResponse, index: number) => {
                      const _slug = toSlug(category.label);

                      return (
                        <li key={index} className="shrink-0">
                          <button
                            className={`bg-${selectedCategory === _slug ? "[#F3FFEE]" : "gray-100"} text-${selectedCategory === _slug ? "[#5AC12F]" : "gray-600"} rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap`}
                            onClick={() => handleScroll(_slug, true, 130)}
                          >
                            {category.label}
                          </button>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>

              {/* Sub-Categories */}
              {subCategoriesForCategories.length > 0 && (
                <div
                  className="w-full overflow-x-auto overflow-y-hidden flex items-center 
                  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <ul className="flex space-x-4 items-center w-max flex-nowrap">
                    {subCategoriesForCategories?.map(
                      (
                        sub_category: ICategoryDetailsResponse,
                        index: number
                      ) => {
                        const _slug = toSlug(sub_category.label);

                        return (
                          <li key={index} className="shrink-0">
                            <button
                              className={`bg-${selectedSubCategory === _slug ? "[#F3FFEE]" : "gray-100"} text-${selectedSubCategory === _slug ? "[#5AC12F]" : "gray-600"} rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap`}
                              onClick={() => handleScroll(_slug, false, 170)}
                            >
                              {sub_category.label}
                            </button>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </div>
          </PaddingContainer>

          {/* Main Section */}
          <PaddingContainer>
            {loading ||
            categoriesSubCategoriesLoading ||
            subcategoriesLoading ? (
              <FoodCategorySkeleton />
            ) : (
              <div className="flex flex-col md:flex-row w-full">
                <div className="hidden md:block md:w-1/5 p-3 h-screen z-10  sticky top-0 left-0">
                  <div className="h-full overflow-hidden group">
                    <div
                      className={`h-full overflow-y-auto transition-all duration-300 ${
                        isScrolling
                          ? "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                          : "overflow-hidden"
                      }`}
                      onScroll={handleMouseEnterCategoryPanel}
                    >
                      <PanelMenu
                        model={
                          menuItems
                          // SIDEBAR_CATEGORY
                        }
                        className="w-full"
                        expandIcon={<span></span>}
                        collapseIcon={<span></span>}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/5 p-3 h-full overflow-y-auto">
                  {deals.map((category: ICategoryV2, catIndex: number) => (
                    <div
                      key={catIndex}
                      className="mb-4"
                      id={toSlug(category.title)}
                    >
                      <h2 className="mb-2 font-inter text-gray-900 font-bold text-2xl sm:text-xl leading-snug tracking-tight">
                        {category.title}
                      </h2>

                      {category.subCategories.map(
                        (subCategory: ISubCategoryV2, subCatIndex: number) => (
                          <div
                            key={subCatIndex}
                            className="mb-4"
                            id={toSlug(subCategory.title)}
                          >
                            <h3 className="mb-2 font-inter text-gray-600 font-semibold text-lg sm:text-base leading-snug tracking-normal">
                              {subCategory.title}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                              {subCategory.foods.map(
                                (meal: IFood, mealIndex) => (
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
                                        <FontAwesomeIcon
                                          icon={faPlus}
                                          color="white"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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

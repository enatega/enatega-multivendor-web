"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";
import { useQuery } from "@apollo/client";
import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";

// Context & Hooks
import useUser from "@/lib/hooks/useUser";
import useRestaurant from "@/lib/hooks/useRestaurant";

// Icons
import { ClockSvg, HeartSvg, InfoSvg, RatingSvg } from "@/lib/utils/assets/svg";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import FoodCategorySkeleton from "@/lib/ui/useable-components/custom-skeletons/food-items.skeleton";

// API
import {
  GET_CATEGORIES_SUB_CATEGORIES_LIST,
  GET_SUB_CATEGORIES,
} from "@/lib/api/graphql";

// Interface
import {
  ICategory,
  ICategoryDetailsResponse,
  ICategoryV2,
  IFood,
  ISubCategory,
  ISubCategoryV2,
} from "@/lib/utils/interfaces";

// Methods
import { toSlug } from "@/lib/utils/methods";
import ReviewsModal from "@/lib/ui/useable-components/reviews-modal";
import InfoModal from "@/lib/ui/useable-components/info-modal";
import ChatSvg from "@/lib/utils/assets/svg/chat";
import Image from "next/image";

export default function StoreDetailsScreen() {
  // Access the UserContext via our custom hook
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();

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

  // Transform cart items when restaurant data is loaded
  useEffect(() => {
    if (data?.restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, data.restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [data?.restaurant, cart.length, transformCartWithFoodInfo, updateCart]);

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
          className={`mx-2 ${item.items && "font-semibold"} text-${
            isClicked ? "[#5AC12F]" : "gray-600"
          }`}
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
        className={`flex align-items-center px-3 py-2 cursor-pointer bg-${
          isClicked ? "[#F3FFEE]" : ""
        }`}
        onClick={() => handleScroll(_url ?? "", false, 80)}
      >
        <span
          className={`mx-2 ${item.items && "font-semibold"} text-${
            isClicked ? "[#5AC12F]" : "gray-600"
          }`}
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

              return foods.length > 0 ?
                  {
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
        )?.items || [];

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

  // Function to handle opening the food item modal
  const handleOpenFoodModal = (food: IFood) => {
    // Add restaurant ID to the food item
    setShowDialog({
      ...food,
      restaurant: data?.restaurant?._id,
    });
  };

  // Function to close the food item modal
  const handleCloseFoodModal = () => {
    setShowDialog(null);
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
    _id: data?.restaurant?._id ?? "",
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
    username: data?.restaurant?.username ?? "N/A",
    phone: data?.restaurant?.phone ?? "N/A",
    address: data?.restaurant?.address ?? "N/A",
    location: data?.restaurant?.location ?? "N/A",
    isAvailable: data?.restaurant?.isAvailable ?? true,
    openingTimes: data?.restaurant?.openingTimes ?? [],
    description:
      data?.restaurant?.description ??
      "Preservation of the authentic taste of all traditional foods is upheld here.",
  };

  // Handlers
  // Function to handle the logic for seeing reviews
  const handleSeeReviews = () => {
    setShowReviews(true);
  };

  // Function to handle the logic for seeing more information
  const handleSeeMoreInfo = () => {
    setShowMoreInfo(true);
  };

  // Effect to select the first category on page load
  useEffect(() => {
    if (menuItems?.length > 0) {
      const firstCategorySlug = toSlug(menuItems[0].label);
      setSelectedCategory(firstCategorySlug);
      selectedCategoryRefs.current = firstCategorySlug;
    }
  }, [menuItems]);

  // Effect to update selected category during scrolling
  useEffect(() => {
    const handleScrollUpdate = () => {
      const container = document.querySelector(".scrollable-container");
      if (!container) return;

      let selected = "";
      deals.forEach((category) => {
        const element = document.getElementById(toSlug(category.title));
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            selected = toSlug(category.title);
          }
        }
      });

      if (selected && selected !== selectedCategoryRefs.current) {
        setSelectedCategory(selected);
        selectedCategoryRefs.current = selected;
      }
    };

    const container = document.querySelector(".scrollable-container");
    container?.addEventListener("scroll", handleScrollUpdate);

    return () => {
      container?.removeEventListener("scroll", handleScrollUpdate);
    };
  }, [deals]);

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
            {loading ?
              <Skeleton width="100%" height="20rem" borderRadius="0" />
            : <img
                alt="McDonald's banner with a burger and fries"
                className="w-full h-72 object-cover"
                height="300"
                src={restaurantInfo.image}
                width="1200"
              />
            }

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

                  <div className="text-gray-800 space-y-2">
                    <h1 className="text-3d-effect p-2  text-white rounded font-inter font-extrabold text-[32px] leading-[100%] sm:text-[40px] md:text-[48px]">
                      {restaurantInfo.name}
                    </h1>
                    <span className="text-3d-effect p-2 rounded  text-white font-inter font-medium text-[18px] sm:text-[20px] sm:leading-[30px] md:text-[24px] md:leading-[32px]">
                      {restaurantInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute top-4 right-4 md:bottom-4 md:right-4 md:top-auto rounded-full bg-white h-8 w-8 flex justify-center items-center">
              <HeartSvg />
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="bg-gray-50 shadow-[0px_1px_3px_rgba(0,0,0,0.1)]  p-3 md:h-[80px] h-fit flex justify-between items-center">
            <PaddingContainer>
              <div className="p-3  h-full w-full flex flex-col md:flex-row gap-2 items-center justify-between">
                <div className="w-full md:w-[80%]">
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleSeeMoreInfo();
                      }}
                    >
                      <InfoSvg />
                      {loading ?
                        <Skeleton width="10rem" height="1.5rem" />
                      : "See more information"}
                    </a>
                    {/* Review Link */}
                    <a
                      className="flex items-center gap-2 text-[#0EA5E9] font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle"
                      href="#"
                      onClick={(e) => {
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
                </div>
              </div>
            </PaddingContainer>
          </div>

          {/* Category Section */}
          <PaddingContainer
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
                            className={`bg-${
                              selectedCategory === _slug ? "[#F3FFEE]" : (
                                "gray-100"
                              )
                            } text-${
                              selectedCategory === _slug ? "[#5AC12F]" : (
                                "gray-600"
                              )
                            } rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap`}
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
                              className={`bg-${
                                selectedSubCategory === _slug ? "[#F3FFEE]" : (
                                  "gray-100"
                                )
                              } text-${
                                selectedSubCategory === _slug ? "[#5AC12F]" : (
                                  "gray-600"
                                )
                              } rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap`}
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
            {loading || categoriesSubCategoriesLoading || subcategoriesLoading ?
              <FoodCategorySkeleton />
            : <div className="flex flex-col md:flex-row w-full">
                <div className="hidden md:block md:w-1/5 p-3 h-screen z-10  sticky top-0 left-0">
                  <div className="h-full overflow-hidden group">
                    <div
                      className={`h-full overflow-y-auto transition-all duration-300 ${
                        isScrolling ?
                          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                        : "overflow-hidden"
                      }`}
                      onScroll={handleMouseEnterCategoryPanel}
                    >
                      <PanelMenu
                        model={menuItems}
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
                            {subCategory.title !== "Uncategorized" && (
                              <h3 className="mb-2 font-inter text-gray-600 font-semibold text-lg sm:text-base leading-snug tracking-normal">
                                {subCategory.title}
                              </h3>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                              {subCategory.foods.map(
                                (meal: IFood, mealIndex) => (
                                  <div
                                    key={mealIndex}
                                    className="flex items-center gap-4 rounded-lg border border-gray-300 shadow-sm bg-white p-3 relative cursor-pointer"
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
                                    <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 ">
                                      <Image
                                        alt={meal.title}
                                        className="w-full h-full rounded-md object-cover mx-auto md:mx-0 "
                                        src={meal.image}
                                        width={100}
                                        height={100}
                                      />
                                    </div>

                                    {/* Add Button */}
                                    <div className="absolute top-2 right-2">
                                      <button
                                        className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center"
                                        onClick={() =>
                                          handleOpenFoodModal(meal)
                                        }
                                        type="button"
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
            }
          </PaddingContainer>
        </div>
      </div>

      {/* Food Item Detail Modal */}
      <Dialog
        visible={!!showDialog}
        className="mx-3 sm:mx-4 md:mx-0" // Adds margin on small screens
        onHide={handleCloseFoodModal}
        showHeader={false}
        contentStyle={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }} // Rounds top corners
        style={{ borderRadius: "1rem" }} // Rounds full box including top corners
      >
        {showDialog && (
          <FoodItemDetail
            foodItem={showDialog}
            addons={data?.restaurant?.addons}
            options={data?.restaurant?.options}
            restaurant={data?.restaurant}
            onClose={handleCloseFoodModal}
          />
        )}
      </Dialog>
    </>
  );
}

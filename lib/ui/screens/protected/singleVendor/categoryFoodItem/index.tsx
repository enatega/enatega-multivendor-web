// File: lib/ui/screens/protected/singleVendor/categoryFoodItem.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { MenuItem } from "primereact/menuitem";
import { PanelMenu } from "primereact/panelmenu";
import { useCallback, useEffect, useRef, useState } from "react";

// Components
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import FoodCategorySkeleton from "@/lib/ui/useable-components/custom-skeletons/food-items.skeleton";
import EmptySearch from "@/lib/ui/useable-components/empty-search-results";
import FoodCard from "@/lib/ui/useable-components/foodCard";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";

import useSingleRestaurantFoodData from "@/lib/hooks/useSingleRestaurantFoodData";
import useUser from "@/lib/hooks/useUser";

// Queries
import {
  GET_CATEGORIES_SUB_CATEGORIES_LIST,
  GET_SUB_CATEGORIES,
} from "@/lib/api/graphql";
import { useQuery } from "@apollo/client";

// Utils & Methods
import { toSlug } from "@/lib/utils/methods";
import { motion } from "framer-motion";
import { Button } from "primereact/button";

// Define types
interface SubCategory {
  _id: string;
  title: string;
  foods: any[];
}

interface Category {
  _id: string;
  title: string;
  foods: any[];
  subCategories: SubCategory[];
}

interface ProcessedCategory extends Category {
  subCategories: SubCategory[];
}

interface SubCategoryMobile {
  id: string;
  label: string;
  slug: string;
}

export default function CategoryItemScreen() {
  // URL params
  const params = useParams();
  const router = useRouter();
  const categoryId = params.category as string;
  const restaurantId = params.id as string;

  // State
  const [, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showDialog, setShowDialog] = useState<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });
  const [subCategoriesForMobile, setSubCategoriesForMobile] = useState<
    SubCategoryMobile[]
  >([]);

  // Refs
  const selectedCategoryRef = useRef("");
  const selectedSubCategoryRef = useRef("");

  // Hooks
  const { categories, loading, error, restaurant } =
    useSingleRestaurantFoodData();
  const { cart, transformCartWithFoodInfo, updateCart } = useUser();

  // Fetch subcategories data
  const {
    data: categoriesSubCategoriesList,
    loading: categoriesSubCategoriesLoading,
  } = useQuery(GET_CATEGORIES_SUB_CATEGORIES_LIST, {
    variables: {
      storeId: restaurantId,
    },
    skip: !restaurantId,
  });

  const { data: subcategoriesData, loading: subcategoriesLoading } =
    useQuery(GET_SUB_CATEGORIES);

  // Transform cart items when restaurant data is loaded
  useEffect(() => {
    if (restaurant && cart.length > 0) {
      const transformedCart = transformCartWithFoodInfo(cart, restaurant);
      if (JSON.stringify(transformedCart) !== JSON.stringify(cart)) {
        updateCart(transformedCart);
      }
    }
  }, [restaurant, cart.length, transformCartWithFoodInfo, updateCart]);

  // Process categories and subcategories
  const processedCategories: ProcessedCategory[] =
    categories
    ?.map((category: any) => {
      const subCats =
      subcategoriesData?.subCategories?.filter(
        (sc: any) => sc.parentCategoryId === category._id,
      ) || [];
      
      // Group foods by subcategory
      const groupedFoods: Record<string, any[]> = {};
      category.foods?.forEach((food: any) => {
        const subCatId = food.subCategory || "uncategorized";
        if (!groupedFoods[subCatId]) groupedFoods[subCatId] = [];
        groupedFoods[subCatId].push(food);
      });
      
      // Create subcategory groups
      const subCategoryGroups = subCats
      .map((subCat: any) => {
        const foods = groupedFoods[subCat._id] || [];
        return foods.length > 0 ?
        {
          _id: subCat._id,
          title: subCat.title,
          foods,
        }
        : null;
      })
      .filter(Boolean) as SubCategory[];
      
      // Add uncategorized group if needed
      if (groupedFoods["uncategorized"]?.length > 0) {
        subCategoryGroups.push({
          _id: "uncategorized",
          title: "Uncategorized",
          foods: groupedFoods["uncategorized"],
        });
      }
      
      return {
        ...category,
        subCategories: subCategoryGroups,
      };
    })
    .filter((cat: any) => cat.subCategories.length > 0) || [];
    
  // Find the matching category from the URL parameter
  const selectedCategoryData = processedCategories?.find(
    (category) => category._id === categoryId,
  );

  // Menu items for the sidebar
  const menuItems =
    categoriesSubCategoriesList?.fetchCategoryDetailsByStoreId?.map(
      (item: any) => ({
        id: item.id,
        label: item.label,
        url: `#${item.url?.slice(1)}`,
        template: parentItemRenderer,
        items:
          item.items?.map((subItem: any) => ({
            id: subItem.id,
            label: subItem.label,
            url: `#${subItem.url?.slice(1)}`,
            template: itemRenderer,
          })) || [],
        selected: item.id === categoryId,
      }),
    ) || [];

  // Effect to select category from URL parameter
  useEffect(() => {
    if (categoryId && processedCategories?.length) {
      const category = processedCategories.find(
        (cat) => cat._id === categoryId,
      );
      if (category) {
        const slug = toSlug(category.title);
        setSelectedCategory(slug);
        selectedCategoryRef.current = slug;

        // If category has subcategories, select the first one
        if (category.subCategories?.length > 0) {
          const firstSubCatSlug = toSlug(category.subCategories[0].title);
          setSelectedSubCategory(firstSubCatSlug);
          selectedSubCategoryRef.current = firstSubCatSlug;

          // Set subcategories for mobile view
          setSubCategoriesForMobile(
            category.subCategories.map((sub: SubCategory) => ({
              id: sub._id,
              label: sub.title,
              slug: toSlug(sub.title),
            })),
          );
        }
      }
    }
  }, [categoryId, processedCategories?.length]);

  // Handle update modal state
  const handleUpdateIsModalOpen = useCallback(
    (value: boolean, id: string) => {
      if (isModalOpen.value !== value || isModalOpen.id !== id) {
        setIsModalOpen({ value, id });
      }
    },
    [isModalOpen],
  );

  // Handle food item click
  const handleFoodClick = (food: any) => {
    if (!food.isAvailable) {
      handleUpdateIsModalOpen(true, food._id);
      return;
    }

    setShowDialog({
      ...(food.originalFood || food),
      restaurant: restaurant?._id,
    });
  };

  // Handle modal close
  const handleCloseFoodModal = () => {
    setShowDialog(null);
  };

  // Handle subcategory navigation
  const handleScrollToSubcategory = (id: string, offset = 120) => {
    setSelectedSubCategory(id);
    selectedSubCategoryRef.current = id;

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = offset;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle mouse enter for category panel
  const handleMouseEnterCategoryPanel = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
  };

  // Back button handler
  const handleBack = () => {
    router.back();
  };

  // Parent item template for PanelMenu
  function parentItemRenderer(item: MenuItem) {
    const isClicked = item.id === categoryId;
    return (
      <div
        className={`flex align-items-center px-3 py-2 cursor-pointer ${isClicked ? "bg-[#F3FFEE]" : ""}`}
        onClick={() => {
          if (item?.items && item?.items?.length > 0&&restaurantId) {
            router.push(
              `/categoryItemScreen/${item?.id}/${restaurantId}`,
            );
          }
        }}
      >
        <span
          className={`mx-2 ${item.items && "font-semibold"} text-${isClicked ? "[#5AC12F]" : "gray-600"}`}
        >
          {item.label}
        </span>
      </div>
    );
  }

  // Child item template for PanelMenu
  function itemRenderer(item: MenuItem) {
    const _url = item.url?.slice(1);
    const isClicked = _url === selectedSubCategoryRef.current;

    return (
      <div
        className={`flex align-items-center px-3 py-2 cursor-pointer bg-${isClicked ? "[#F3FFEE]" : ""}`}
        onClick={() =>
          handleScrollToSubcategory(toSlug(item.label as string), 120)
        }
      >
        <span
          className={`mx-2 ${item.items && "font-semibold"} text-${isClicked ? "[#5AC12F]" : "gray-600"}`}
        >
          {item.label}
        </span>
      </div>
    );
  }

  // Loading state
  if (loading || categoriesSubCategoriesLoading || subcategoriesLoading) {
    return (
      <PaddingContainer>
        <FoodCategorySkeleton />
      </PaddingContainer>
    );
  }

  // Error state or no data
  if (error || !selectedCategoryData) {
    return (
      <PaddingContainer>
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="text-center py-6 text-gray-500 flex flex-col items-center justify-center">
            <EmptySearch />
            <p className="text-lg mt-4">
              Category not found or no items available
            </p>
          </div>
          <Button
            label="Go Back"
            className="bg-[#0EA5E9] text-white px-4 py-2 rounded-md"
            onClick={handleBack}
          />
        </div>
      </PaddingContainer>
    );
  }

  return (
    <>
      {/* Back Button and Category Title */}
      {/* <PaddingContainer>
        <div className="flex items-center gap-4 mt-4 mb-6">
          <button 
            onClick={handleBack}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">{selectedCategoryData.title}</h1>
        </div>
      </PaddingContainer> */}

      {/* Subcategory navigation for mobile */}
      {subCategoriesForMobile.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:top-[90px] top-[103px]"
          style={{
            position: "sticky",
            zIndex: 50,
            backgroundColor: "white",
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PaddingContainer>
            <div className="p-3 w-full flex md:hidden items-center justify-between overflow-x-auto">
              <div
                className="w-full overflow-x-auto overflow-y-hidden flex items-center 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <ul className="flex space-x-4 items-center w-max flex-nowrap">
                  {subCategoriesForMobile.map((subCategory, index) => (
                    <li
                      key={index}
                      className="shrink-0"
                    >
                      <button
                        className={`bg-${
                          selectedSubCategory === subCategory.slug ?
                            "[#F3FFEE]"
                          : "gray-100"
                        } text-${
                          selectedSubCategory === subCategory.slug ?
                            "[#5AC12F]"
                          : "gray-600"
                        } rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap`}
                        onClick={() =>
                          handleScrollToSubcategory(subCategory.slug, 150)
                        }
                      >
                        {subCategory.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PaddingContainer>
        </motion.div>
      )}

      {/* Main content */}
      <PaddingContainer>
        <div className="flex flex-col md:flex-row w-full">
          {/* Sidebar for desktop */}
          <div className="hidden md:block md:w-1/5 p-3 h-screen z-10 sticky top-14 left-0">
            <div className="h-full overflow-hidden group">
              <div
                className={`h-full overflow-y-auto transition-all duration-300 ${
                  isScrolling ?
                    "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                  : "overflow-hidden"
                }`}
                onMouseEnter={handleMouseEnterCategoryPanel}
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

          {/* Food items */}
          <div className="w-full md:w-4/5 p-3 h-full">
            {selectedCategoryData.subCategories.map(
              (subCategory, subCatIndex) => (
                <div
                  key={subCatIndex}
                  className="mb-8"
                  id={toSlug(subCategory.title)}
                >
                  <h3 className="mb-4 font-inter text-gray-700 font-semibold text-xl leading-snug tracking-tight">
                    {subCategory.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subCategory.foods.map((food, foodIndex) => {
                      // Transform food for FoodCard
                      const transformedFood = {
                        _id: food._id,
                        name: food.title,
                        description: food.description,
                        image: food.image,
                        cuisines: [
                          selectedCategoryData.title,
                          subCategory.title,
                        ].filter(Boolean),
                        deliveryTime: restaurant?.deliveryTime || 25,
                        reviewAverage: restaurant?.reviewData?.ratings || 4.5,
                        isAvailable: !food.isOutOfStock,
                        variations: food.variations,
                        shopType: restaurant?.shopType || "restaurant",
                        originalFood: food,
                      };
                      return (
                        <FoodCard
                          key={foodIndex}
                          item={transformedFood}
                          isModalOpen={isModalOpen}
                          handleUpdateIsModalOpen={handleUpdateIsModalOpen}
                          onFoodClick={handleFoodClick}
                        />
                      );
                    })}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </PaddingContainer>

      {/* Food Item Detail Modal */}
      <Dialog
        visible={!!showDialog}
        className="mx-3 sm:mx-4 md:mx-0"
        onHide={handleCloseFoodModal}
        showHeader={false}
        contentStyle={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          padding: "0px",
        }}
        style={{ borderRadius: "1rem" }}
      >
        {showDialog && (
          <FoodItemDetail
            foodItem={showDialog}
            addons={restaurant?.addons}
            options={restaurant?.options}
            restaurant={restaurant}
            onClose={handleCloseFoodModal}
          />
        )}
      </Dialog>
    </>
  );
}

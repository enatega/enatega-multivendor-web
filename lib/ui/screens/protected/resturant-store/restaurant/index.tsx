"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Icons
import { ClockSvg, HeartSvg, InfoSvg, RatingSvg } from "@/lib/utils/assets/svg";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

// Components
import Spacer from "@/lib/ui/useable-components/spacer";
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import CustomIconTextField from "@/lib/ui/useable-components/input-icon-field";
import FoodItemDetail from "@/lib/ui/useable-components/item-detail";
import { Dialog } from "primereact/dialog";

const menuData = [
  {
    category: "For greater hunger",
    href: "#for-greater-hunger",
    items: [
      {
        id: 1,
        name: "Big Share",
        description:
          "8 pieces of Chicken McNuggets®, 6 pieces of Spicy Chicken McNuggets and two optional dips.",
        price: "4",
        image:
          "https://storage.googleapis.com/a1aa/image/7yUGCRRKkYPCmODTfTMtYsOhXbggDPaEj6Lwa1Ts52Q.jpg",
      },
      {
        id: 2,
        name: "All in-ateria ja McFlurry",
        description:
          "Big Mac™ Plus meal, 4 pieces of Chicken McNuggets® + a dip and a McFlurry® of your choice.",
        price: "4",
        image:
          "https://storage.googleapis.com/a1aa/image/ZdIquUk6dWp8Ny79PgiPtpwOiPmZnIAVsYjdsxx0RNI.jpg",
      },
      {
        id: 3,
        name: "Big Mac™ Big Mac™ -ateria",
        description:
          "Two Big Mac™ burgers, regular fries, 0.4 l soft drink, Tropicana® juice or Valio Organic™ skimmed milk.",
        price: "4",
        image:
          "https://storage.googleapis.com/a1aa/image/CkgvD4Em_kJdQwQQdfT4M8-rmG6LFlJLYXOZuFGx0l4.jpg",
      },
    ],
  },
  {
    category: "Burgers & Meals",
    href: "#burgers-meals",
    items: [
      {
        id: 4,
        name: "Cheese Rice",
        description:
          "A classic cheeseburger with medium fries and a soft drink.",
        price: "5",
        image:
          "https://storage.googleapis.com/a1aa/image/7yUGCRRKkYPCmODTfTMtYsOhXbggDPaEj6Lwa1Ts52Q.jpg",
      },
      {
        id: 5,
        name: "Double Quarter",
        description:
          "Two beef patties, cheese, pickles, and onions served with fries and a drink.",
        price: "7",
        image:
          "https://storage.googleapis.com/a1aa/image/7yUGCRRKkYPCmODTfTMtYsOhXbggDPaEj6Lwa1Ts52Q.jpg",
      },
      {
        id: 6,
        name: "Double Biryani",
        description:
          "Two beef patties, cheese, pickles, and onions served with fries and a drink.",
        price: "7",
        image:
          "https://storage.googleapis.com/a1aa/image/7yUGCRRKkYPCmODTfTMtYsOhXbggDPaEj6Lwa1Ts52Q.jpg",
      },
    ],
  },
  {
    category: "Snacks & Sides",
    href: "#snacks-sides",
    items: [
      {
        id: 6,
        name: "French Fries",
        description:
          "Crispy golden fries, available in medium and large sizes.",
        price: "2",
        image: "https://storage.googleapis.com/a1aa/image/example-fries.jpg",
      },
      {
        id: 7,
        name: "Mozzarella Sticks",
        description: "Crispy mozzarella sticks with a side of marinara sauce.",
        price: "3",
        image:
          "https://storage.googleapis.com/a1aa/image/example-mozzarella.jpg",
      },
    ],
  },
  {
    category: "Drinks",
    href: "#drinks",
    items: [
      {
        id: 8,
        name: "Coca-Cola",
        description: "Chilled Coca-Cola, available in multiple sizes.",
        price: "1.5",
        image: "https://storage.googleapis.com/a1aa/image/example-coke.jpg",
      },
      {
        id: 9,
        name: "Iced Coffee",
        description: "Refreshing iced coffee with vanilla or caramel flavors.",
        price: "3",
        image:
          "https://storage.googleapis.com/a1aa/image/example-iced-coffee.jpg",
      },
    ],
  },
  {
    category: "Desserts",
    href: "#desserts",
    items: [
      {
        id: 10,
        name: "McFlurry",
        description: "Soft-serve ice cream with your choice of toppings.",
        price: "3",
        image: "https://storage.googleapis.com/a1aa/image/example-mcflurry.jpg",
      },
      {
        id: 11,
        name: "Apple Pie",
        description: "Warm and crispy apple-filled pie.",
        price: "2",
        image:
          "https://storage.googleapis.com/a1aa/image/example-apple-pie.jpg",
      },
    ],
  },
];
const categories = [
  { name: "For greater hunger", href: "#for-greater-hunger" },
  { name: "Burgers & Meals", href: "#burgers-meals" },
  { name: "Snacks & Sides", href: "#snacks-sides" },
  { name: "Drinks", href: "#drinks" },
  { name: "Desserts", href: "#desserts" },
];

export default function RestaurantDetailsScreen() {
  // States
  const [visibleItems, setVisibleItems] = useState(10); // Default visible items
  const [showAll, setShowAll] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Handlers

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    const container = document.querySelector(".scrollable-container"); // Adjust selector

    if (element && container) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      console.log("Scrolling container to:", offsetPosition); // Debugging

      console.log({ offsetPosition });
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

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col pb-20">
        <div className="scrollable-container flex-1 overflow-auto">
          {/* Banner */}
          <div className="relative">
            <img
              alt="McDonald's banner with a burger and fries"
              className="w-full h-72 object-cover"
              height="300"
              src="https://storage.googleapis.com/a1aa/image/l_S6V3o3Sf_fYnRuAefKySjq6q-HmTjiF37tvk6PiMU.jpg"
              width="1200"
            />
            <div className="absolute bottom-0 left-0 md:left-20 p-4">
              <div className="flex flex-col items-start">
                <img
                  alt="McDonald's logo"
                  className="w-12 h-12 mb-2"
                  height="50"
                  src="https://storage.googleapis.com/a1aa/image/_a4rKBo9YwPTH-AHQzOLoIcNAirPNTI7alqAVAEqmOo.jpg"
                  width="50"
                />
                <div className="text-white">
                  <h1 className="font-inter font-extrabold text-[32px] leading-[100%] sm:text-[40px] md:text-[48px]">
                    McDonald&apos;s Espoo
                  </h1>
                  <p className="font-inter font-medium text-[18px] leading-[28px] sm:text-[20px] sm:leading-[30px] md:text-[24px] md:leading-[32px]">
                    Preservation of the authentic taste of all traditional foods
                    is upheld here.
                  </p>
                </div>
              </div>
            </div>
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
                  10:30 AM - 8:30 PM
                </span>

                {/* Rating */}
                <span className="flex items-center gap-2 text-gray-600 font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle">
                  <RatingSvg />
                  Excellent, 4.2
                </span>

                {/* Info Link */}
                <a
                  className="flex items-center gap-2 text-[#0EA5E9] font-inter font-normal text-sm sm:text-base md:text-lg leading-5 sm:leading-6 md:leading-7 tracking-[0px] align-middle"
                  href="#"
                >
                  <InfoSvg />
                  See more information
                </a>
              </div>
            </PaddingContainer>
          </div>

          <Spacer height="20px" />

          {/* Category Section */}
          <PaddingContainer
            height="64px"
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
              <div className="h-full w-full md:w-[80%] flex flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <ul className="flex space-x-4 items-center min-w-full">
                  {(showAll ? categories : categories.slice(0, visibleItems)
                  ).map((category, index) => (
                    <li key={index} className="shrink-0">
                      <button
                        className="bg-gray-100 text-gray-600 rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap"
                        onClick={() => handleScroll(category.href)}
                      >
                        {category.name}
                      </button>
                      {/* <a
                        className="bg-gray-100 text-gray-600 rounded-full px-3 py-2 text-[10px] sm:text-sm md:text-base font-medium whitespace-nowrap"
                        href={category.href}
                      >
                        {category.name}
                      </a> */}
                    </li>
                  ))}

                  {/* "More" button to show hidden categories */}
                  {!showAll && categories.length > visibleItems && (
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

              {/* Search Input - 20% Width on Large Screens, Full Width on Small Screens */}
              <div className="h-full w-full md:w-[20%]">
                <CustomIconTextField
                  className="w-full rounded-full pl-10"
                  iconProperties={{
                    icon: faSearch,
                    position: "left",
                    style: { marginTop: "-10px" },
                  }}
                  placeholder="Search for Restaurants"
                  type="text"
                  name="search"
                  showLabel={false}
                />
              </div>
            </div>
          </PaddingContainer>

          <Spacer height="20px" />

          {/* Main Section */}

          <PaddingContainer>
            {menuData.map((category, index) => (
              <div key={index} className="mb-4 p-3" id={category.href}>
                <h2 className="mb-4 font-inter text-gray-900 font-bold text-2xl sm:text-xl leading-snug tracking-tight">
                  {category.category}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {category.items.map((meal, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border border-gray-300 shadow-sm bg-white p-3 relative"
                    >
                      {/* Text Content */}
                      <div className="flex-grow text-left md:text-left space-y-2">
                        <h3 className="text-gray-900 text-lg font-semibold font-inter">
                          {meal.name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {meal.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="text-[#0EA5E9] text-lg font-semibold">
                            Rs. {meal.price}
                          </span>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28">
                        <img
                          alt={meal.name}
                          className="w-full h-full object-contain mx-auto md:mx-0"
                          src={meal.image}
                        />
                      </div>

                      {/* Image Section */}
                      <div className="absolute top-2 right-2">
                        <button
                          className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center"
                          onClick={() => setShowDialog(true)}
                        >
                          <FontAwesomeIcon icon={faPlus} color="white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </PaddingContainer>
        </div>
      </div>

      <Dialog
        visible={showDialog}
        className="mx-4 md:mx-0" // Adds margin on small screens
        onHide={() => {
          if (!showDialog) return;
          setShowDialog(false);
        }}
      >
        <FoodItemDetail />
      </Dialog>
    </>
  );
}

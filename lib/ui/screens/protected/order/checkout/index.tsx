"use client";

import Divider from "@/lib/ui/useable-components/custom-divider";
import { InfoSvg } from "@/lib/utils/assets/svg";
import {
  faBicycle,
  faChevronDown,
  faChevronRight,
  faCreditCard,
  faDollar,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

export default function OrderCheckoutScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const togglePriceSummary = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen flex flex-col pb-20">
      <div className="scrollable-container flex-1 overflow-auto">
        {/* <!-- Header with map and navigation --> */}
        <div className="relative">
          <img
            alt="Map showing delivery route"
            className="w-full h-64 object-cover"
            height="300"
            src="https://storage.googleapis.com/a1aa/image/jt1AynRJJVtM9j1LRb30CodA1xsK2R23pWTOmRv3nsM.jpg"
            width="1200"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#5AC12F] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            H
          </div>
        </div>
        {/* <!-- Toggle Prices Button for Mobile --> */}
        <div className="sm:hidden fixed top-10 left-0 right-0 bg-transparent z-10 p-4">
          <button
            className="bg-white text-[#5AC12F] w-full py-2 px-4 rounded-full border border-gray-300 flex justify-between items-center"
            onClick={togglePriceSummary}
          >
            <span className="font-inter text-[14px]">Total: $7.00</span>

            <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
          </button>
        </div>

        {/* <!-- Main Content --> */}
        <div className="max-w-6xl mx-auto p-4 lg:flex lg:space-x-4">
          <div className="lg:w-3/4 md:mr-40">
            {/* <!-- Delivery and Pickup Toggle --> */}
            <div className="flex justify-between bg-gray-100 rounded-full p-2 mb-6">
              <button className="w-1/2 bg-[#5AC12F] text-white py-2 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBicycle}
                  className="mr-2 text-gray-900"
                />
                <span className="font-medium text-gray-900 font-inter text-xs md:text-sm xl:[14px]">
                  Delivery
                </span>
              </button>

              <button className="w-1/2 text-gray-600 px-6 py-2 rounded-full mx-2 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faStore}
                  className="mr-2 text-gray-900"
                />
                <span className="font-medium text-gray-900 font-inter text-xs md:text-sm xl:[14px]">
                  Pickup
                </span>
              </button>
            </div>

            {/* <!-- Section Title --> */}
            <h2 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg md:text-[16px] lg:text-[18px]">
              For greater hunger
            </h2>

            {/* <!-- Delivery Details --> */}
            <div className="bg-white px-4 pt-4 pb-2 rounded-lg mb-4 border border-gray-300 w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faBicycle}
                    className="mr-2 text-gray-900"
                  />
                  <p className="text-gray-900 leading-4 sm:leading-5 tracking-normal font-inter text-xs sm:text-sm md:text-sm align-middle">
                    <span className="font-semibold">Delivery </span>
                    <span className="font-normal">in 10-20 min </span>
                    <span className="font-semibold">to Kamppi</span>
                  </p>
                </div>

                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-gray-500 self-center"
                />
              </div>
            </div>

            {/* <!-- Leave at Door --> */}
            <div className="bg-white px-4 pt-4 pb-2 rounded-lg mb-4 border border-gray-300 w-full">
              <div className="flex items-center">
                <input className="mr-2" id="leave-at-door" type="checkbox" />
                <label
                  className="text-gray-900 leading-4 sm:leading-5 tracking-normal font-inter text-xs sm:text-sm md:text-sm align-middle"
                  htmlFor="leave-at-door"
                >
                  Leave the order at my door
                </label>
              </div>
              <p className="text-gray-300 leading-4 sm:leading-5 tracking-normal font-inter text-xs sm:text-sm md:text-sm align-middle mt-2">
                If you are not available to receive the order, the courier will
                leave it at your door.
              </p>
            </div>

            {/* <!-- Selected Items --> */}
            <div className="bg-white pt-4 pb-2 rounded-lg mb-4 w-full">
              <h2 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg md:text-[16px] lg:text-[18px]">
                Selected items
              </h2>
              {/* Map this below section */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <img
                    alt="Big Share meal"
                    className="w-12 h-12 rounded-full mr-2"
                    height="50"
                    src="https://storage.googleapis.com/a1aa/image/cPA2BWDjlQ26C-OR-Sz-gd7gFcDc7QbvTZ_904FkN0Y.jpg"
                    width="50"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base md:text-[12px] lg:text-[14px] xl:text-[16px] leading-5">
                      Big Share
                    </h3>
                    <p className="text-gray-600 leading-4 sm:leading-5 tracking-normal font-inter text-xs sm:text-[12px] md:text-[12px] align-middle mt-2">
                      De 1/2 Currydip! Sweet and sour dip.
                    </p>
                    <p className="text-[#0EA5E9] font-semibold text-sm sm:text-base md:text-[11px] lg:text-[12px] xl:text-[14px]">
                      $6
                    </p>
                  </div>
                </div>

                <div className="border border-[#0EA5E9] text-[#0EA5E9] py-1 px-3 rounded-lg text-xs sm:text-sm font-medium w-fit">
                  1
                </div>
              </div>
              <button className="text-gray-900 mt-2 font-semibold mb-2 text-sm sm:text-base md:text-[12px] lg:text-[12px] xl:text-[14px]">
                + Add more items
              </button>
            </div>

            {/* <!-- Payment Details --> */}
            <h2 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg md:text-[16px] lg:text-[18px]">
              Payment details
            </h2>
            <div className="bg-white px-4 pt-4 pb-2 rounded-lg mb-4 border border-gray-300 w-full">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="text-gray-600 flex items-center text-sm sm:text-base md:text-[12px] lg:text-[12px] xl:text-[14px]"
                  htmlFor="card"
                >
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-gray-900 mr-2"
                  />
                  Card
                </label>
                <input className="mr-2" id="card" name="payment" type="radio" />
              </div>
            </div>

            <div className="bg-white px-4 pt-4 pb-2 rounded-lg mb-6 border border-gray-300 w-full">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="text-gray-600 flex items-center text-sm sm:text-base md:text-[12px] lg:text-[12px] xl:text-[14px]"
                  htmlFor="cash"
                >
                  <FontAwesomeIcon
                    icon={faDollar}
                    className="text-gray-900 mr-2"
                  />
                  Cash
                </label>
                <input className="mr-2" id="cash" name="payment" type="radio" />
              </div>
            </div>

            {/* <!-- Tip the Courier --> */}
            <div className="bg-white mb-6 w-full">
              <h2 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg md:text-[16px] lg:text-[18px]">
                Tip the courier
              </h2>
              <div className="border border-gray-300 rounded-lg p-5">
                <p className="text-gray-500 mb-4 leading-5 sm:leading-5 tracking-normal font-inter text-xs sm:text-sm md:text-sm align-middle mt-2">
                  They&apos;ll get 100% of your tip after the delivery
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-white text-[12px] text-[#0EA5E9] border border-[#0EA5E9] px-4 py-2 rounded-full w-full">
                    2$
                  </button>
                  <button className="bg-white text-[12px] text-[#0EA5E9] border border-[#0EA5E9] px-4 py-2 rounded-full w-full">
                    4$
                  </button>
                  <button className="bg-white text-[12px] text-[#0EA5E9] border border-[#0EA5E9] px-4 py-2 rounded-full w-full">
                    6$
                  </button>
                  <button className="bg-white text-[12px] text-[#0EA5E9] border border-[#0EA5E9] px-4 py-2 rounded-full w-full">
                    8$
                  </button>
                  <button className="bg-white text-[12px] text-[#0EA5E9] border border-[#0EA5E9] px-4 py-2 rounded-full w-full col-span-2">
                    Other
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Promo Code --> */}
            <div className="bg-white  pb-2 rounded-lg mb-4 w-full">
              <h2 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg md:text-[16px] lg:text-[18px]">
                Promo code
              </h2>
              <p className="text-gray-500 mb-4 leading-5 sm:leading-5 tracking-normal font-inter text-xs sm:text-sm md:text-sm align-middle mt-2">
                If you have a promo code enter it below to claim your benefit!
              </p>
              <div className="flex items-center flex-wrap space-x-2">
                <input
                  className="flex-grow p-2 border border-gray-300 rounded text-[12px] md:text-[14px]"
                  placeholder="Enter promo code..."
                  type="text"
                />
                <button className="bg-[#5AC12F] h-10 px-8 font-medium text-gray-900  tracking-normal font-inter text-sm sm:text-base md:text-[12px] lg:text-[14px] rounded-full">
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Order Summary - Large Screen --> */}
          <div className="hidden lg:sticky lg:top-4 lg:block lg:w-1/3 lg:m-0">
            <div
              className="bg-white p-2 rounded-lg shadow-md border border-gray-300 expandable max-h-0 sm:max-h-full sm:block hidden"
              id="price-summary"
            >
              <h2 className="text-sm lg:text-xs font-semibold text-left flex justify-between">
                Prices in USD
                <InfoSvg />
              </h2>
              <p className="text-gray-400 mb-3 text-left leading-5 tracking-normal font-inter text-xs lg:text-[10px]">
                Inc. Taxes (if applicable)
              </p>

              <div className="flex justify-between mb-1 text-xs lg:text-[12px]">
                <span className="font-inter text-gray-900 leading-5">
                  Item subtotal
                </span>
                <span className="font-inter text-gray-900 leading-5">
                  $6.00
                </span>
              </div>

              <div className="flex justify-between mb-1 text-xs lg:text-[12px]">
                <span className="font-inter text-gray-900 leading-5">
                  Delivery (0.316 km)
                </span>
                <span className="font-inter text-gray-900 leading-5">
                  $0.60
                </span>
              </div>

              <div className="flex justify-between mb-1 text-xs lg:text-[12px]">
                <span className="font-inter text-gray-900 leading-5">
                  Service fee
                </span>
                <span className="font-inter text-gray-900 leading-5">
                  $0.40
                </span>
              </div>

              <Divider />

              <div className="flex justify-between mb-1 text-xs lg:text-[12px]">
                <span className="font-inter text-gray-900 leading-5">
                  Discount
                </span>
                <span className="font-inter text-gray-900 leading-5">
                  $0.00
                </span>
              </div>

              <div className="text-[#0EA5E9] mb-1 text-left font-inter text-xs lg:text-[12px]">
                Choose an offer (1 available)
              </div>

              <Divider />

              <div className="flex justify-between font-semibold mb-4 text-xs lg:text-[14px]">
                <span>Total sum</span>
                <span>$7.00</span>
              </div>

              <button className="bg-[#5AC12F] text-gray-900 w-full py-2 rounded-full text-xs lg:text-[12px]">
                Click to order
              </button>
            </div>
          </div>

          {/* Order Summary - Small Screen */}
          <div className="fixed top-4 right-0 mx-auto md:hidden lg:hidden xl:hidden m-4 p-4 w-full sm:w-64 ml-0 sm:ml-8 mt-16 sm:mt-0 lg:right-auto lg:m-0 lg:w-1/4 lg:sticky lg:top-4">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  ref={contentRef}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-2 rounded-lg shadow-md border border-gray-300 overflow-hidden"
                >
                  <h2 className="text-base font-semibold text-left flex justify-between">
                    Prices in USD
                    <InfoSvg />
                  </h2>
                  <p className="text-gray-300 mb-4 text-left  sm:leading-5 tracking-normal font-inter text-xs sm:text-sm md:text-sm align-middle ">
                    Inc. Taxes (if applicable)
                  </p>

                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      Item subtotal
                    </span>
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      $6.00
                    </span>
                  </div>

                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      Delivery (0.316 km)
                    </span>
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      $0.60
                    </span>
                  </div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      Service fee
                    </span>
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      $0.40
                    </span>
                  </div>

                  <Divider />

                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      Discount
                    </span>
                    <span className="font-inter  text-gray-900 text-[14px] md:text-lg leading-6 md:leading-7">
                      $0.00
                    </span>
                  </div>

                  <div className="text-[#0EA5E9] mb-1 text-left font-inter text-[14px] md:text-lg leading-6 md:leading-7">
                    Choose an offer (1 available)
                  </div>
                  <Divider />

                  <div className="flex justify-between font-semibold mb-4 text-sm">
                    <span>Total sum</span>
                    <span>$7.00</span>
                  </div>
                  <button className="bg-[#5AC12F] text-gray-900 w-full py-2 rounded-full text-sm">
                    Click to order
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

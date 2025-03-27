import { OrderItem, Recommendation } from "@/lib/utils/interfaces";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const orderItems: OrderItem[] = [
  {
    id: "1",
    name: "Burger",
    description: "Juicy beef patty with fresh lettuce",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 10.99,
    quantity: 2,
  },
  {
    id: "2",
    name: "Pizza",
    description: "Cheesy delight with fresh toppings",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 12.99,
    quantity: 2,
  },
  {
    id: "3",
    name: "Biryani",
    description: "Cheesy delight with fresh toppings",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 13.99,
    quantity: 5,
  },
  {
    id: "4",
    name: "Qorma",
    description: "Shahi Qorma",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 5.99,
    quantity: 2,
  },
];

const recommendations: Recommendation[] = [
  {
    id: "3",
    name: "Fries",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 4.99,
  },
  {
    id: "4",
    name: "Soft Drink",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 2.99,
  },
  {
    id: "5",
    name: "Pani Puri",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 2.99,
  },
  {
    id: "7",
    name: "Soft Samosa",
    imageUrl:
      "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
    price: 2.99,
  },
];
const OrderSection: React.FC = () => {
  return (
    <div className="p-4">
      {/* Order Items */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <div>
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p
                  className="text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: item.description.replace("\n", "<br>"),
                  }}
                />
                <p className="text-blue-500 font-semibold">${item.price}</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center border rounded-lg px-2 py-1">
                  <span className="text-lg">{item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {recommendations.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-40">
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="mt-2 text-center">
                <p className="text-blue-500 font-semibold">${item.price}</p>
                <p className="text-gray-500">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Cart() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="font-inter font-semibold text-base md:text-[18px] lg:text-xl text-gray-900 leading-snug">
          Your order
        </h2>
      </div>
      {/* Order Items */}
      <div id="order-list" className="pt-4">
        <div>
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap md:flex-nowrap items-center mb-4 gap-4 p-2 rounded-lg"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-inter font-semibold text-[14px] md:text-[18px]  text-gray-700 leading-snug">
                  {item.name}
                </h3>
                <p
                  className="font-inter font-normal text-[12px] md:text-[14px]  text-gray-500 leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: item.description.replace("\n", "<br>"),
                  }}
                />
                <p className="text-blue-500 font-semibold text-sm md:text-base">
                  ${item.price}
                </p>
              </div>

              {/* Quantity */}
              <div className="ml-auto flex items-center border rounded-lg px-2 md:px-3 py-1 md:py-1">
                <span className="text-[#0EA5E9] text-[14[x] md:text-[18px]">
                  {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendeation */}
      <div className="border-t p-4">
        <h2 className="font-inter font-semibold text-base md:text-[18px] lg:text-xl text-gray-900 leading-snug">
          Recommendations
        </h2>
        <div
          id="recommendations-list"
          className="flex space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="mt-6">
            <div className="flex space-x-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 h-[200px] w-[170px] flex flex-col justify-between  bg-white rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {/* <button className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <i className="fas fa-plus"></i>
                      <FontAwesomeIcon icon={faPlus} />
                    </button> */}

                    <div className="absolute top-2 right-2">
                      <button className="bg-[#0EA5E9] rounded-full shadow-md w-6 h-6 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlus} color="white" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-start m-2">
                    <div className="mt-2 text-left">
                      <p className="text-[#0EA5E9] font-semibold text-sm md:text-base">
                        ${item.price}
                      </p>
                      <p className="text-gray-700">{item.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <button className="flex justify-between items-center w-full bg-[#5AC12F] text-white rounded-full px-4 py-3 sm:py-4">
          <div className="flex items-center">
            <span className="bg-black text-[#5AC12F] rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 text-xs sm:text-sm font-medium">
              2
            </span>
            <span className="text-black text-sm sm:text-base font-medium">
              Go to Checkout
            </span>
          </div>
          <span className="text-black text-sm sm:text-base font-medium">
            $8
          </span>
        </button>
      </div>
    </div>
  );
}

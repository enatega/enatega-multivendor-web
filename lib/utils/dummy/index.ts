import { OrderItem, Recommendation } from "../interfaces";

export const DUMMY_BANNER_IMAGES_URL = [
  {
    alt: "Image 2",
    url: "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 3",
    url: "https://images.ctfassets.net/23u853certza/1FZ1mDc4bJVwtMTJz2Wtfa/71060334acbb1bbd9c1f270a94599fc2/photocard_merchant_v2.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 2",
    url: "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 3",
    url: "https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 4",
    url: "https://images.ctfassets.net/23u853certza/471ILgDT92ZOsRUtayO8Gy/3653197562a27c83d18caa3fb4a12256/photocardsmall_wolt_market_v2.jpg?w=600&q=90&fm=webp",
  },
  {
    alt: "Image 5",
    url: "https://images.ctfassets.net/23u853certza/6Cv99BeTRgtrg88Ateht1U/3ea23a65fc86d6e5b7e606a58cf2b063/subhero_merchant.jpg?w=1920&q=90&fm=webp",
  },
];

export const ITEM_SECTIONS = [
  { _id: "1", title: "Currydippi", price: 1.5 },
  { _id: "2", title: "Sweet and sour dip", price: 1.2 },
  { _id: "3", title: "BBQ dip", price: 1.8 },
  { _id: "4", title: "McFeast™ Dip", price: 2.0 },
  { _id: "5", title: "Chili Mayo Dip", price: 1.7 },
  { _id: "6", title: "No Dip", price: 0.0 },
];

export const ORDER_ITEMS: OrderItem[] = [
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

export const RECOMMENDATIONS: Recommendation[] = [
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

export const TIPS = ["2", "4", "6", "8", "Other"];

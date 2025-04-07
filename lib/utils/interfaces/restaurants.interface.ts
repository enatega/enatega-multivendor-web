import { Optional } from "./global.interface";

// Define types for the GraphQL query response
export interface IRestaurantLocation {
  coordinates: [number, number];
}

export interface IRestaurant {
  _id: string;
  name: string;
  image: string;
  address: string;
  deliveryTime: number;
  minimumOrder: number;
  rating: number;
  isActive: boolean;
  isAvailable: boolean;
  commissionRate: number;
  tax: number;
  shopType: string;
  cuisines: string[];
  reviewCount: number;
  reviewAverage: number;
  distanceWithCurrentLocation?: number;
  freeDelivery?: boolean;
  acceptVouchers?: boolean;
  location: IRestaurantLocation;
  orderId: string;
  orderPrefix: string;
  slug: string;
  reviewData: IReviewData;
  categories: ICategory[];
  options: IOption[];
  addons: IAddon[];
  zone: IZone;
  openingTimes: IOpeningTime[];
}

export interface INearByRestaurantsPreviewData {
  nearByRestaurantsPreview: {
    restaurants: IRestaurant[];
  };
}

export interface IReviewData {
  total: number;
  ratings: number;
  reviews: IReview[];
}

export interface IReview {
  _id: string;
  order: {
    user: IUser;
  };
  rating: number;
  description: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ICategory {
  _id: string;
  title: string;
  foods: IFood[];
}

export interface IFood {
  _id: string;
  title: string;
  image: string;
  description: string;
  variations: IVariation[];
}

export interface IVariation {
  _id: string;
  title: string;
  price: number;
  discounted: boolean;
  addons: string[];
}

export interface ISelectedVariation {
  _id: string;
  title: string;
  price: number;
  discounted: boolean;
  addons: {
    _id: string;
    options?: {
      _id: string;
      title: string;
      description: string;
      price: number;
    }[];

    title?: string;
    description?: string;
    quantityMinimum?: number;
    quantityMaximum?: number;
  }[];
}

export interface IOption {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export interface IAddon {
  _id: string;
  options: string[];
  title: string;
  description: string;
  quantityMinimum: number;
  quantityMaximum: number;
}

export interface IZone {
  _id: string;
  title: string;
  tax: number;
}

export interface IOpeningTime {
  day: string;
  times: ITimeSlot[];
}

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

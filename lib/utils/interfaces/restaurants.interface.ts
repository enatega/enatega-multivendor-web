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
  }
  
  
  export interface INearByRestaurantsPreviewData {
    nearByRestaurantsPreview: {
      restaurants: IRestaurant[];
    };
  }
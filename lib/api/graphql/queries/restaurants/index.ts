import { gql } from "@apollo/client";

export const RESTAURANTS_FRAGMENT = gql`
  fragment RestaurantPreviewFields on RestaurantPreview {
    _id
    name
    image
    address
    deliveryTime
    minimumOrder
    rating
    isActive
    isAvailable
    commissionRate
    tax
    shopType
    cuisines
    reviewCount
    reviewAverage
    location {
      coordinates
    }
  }
`;

export const RECENT_ORDER_RESTAURANTS = gql`
  ${RESTAURANTS_FRAGMENT}
  query GetRecentOrderRestaurants($latitude: Float!, $longitude: Float!) {
    recentOrderRestaurantsPreview(latitude: $latitude, longitude: $longitude) {
      ...RestaurantPreviewFields
    }
  }
`;

export const MOST_ORDER_RESTAURANTS = gql`
  ${RESTAURANTS_FRAGMENT}
  query GetMostOrderedRestaurants($latitude: Float!, $longitude: Float!) {
    mostOrderedRestaurantsPreview(latitude: $latitude, longitude: $longitude) {
      ...RestaurantPreviewFields
    }
  }
`;

export const TOP_RATED_VENDORS = gql`
  ${RESTAURANTS_FRAGMENT}
  query TopRatedVendors($latitude: Float!, $longitude: Float!) {
    topRatedVendorsPreview(latitude: $latitude, longitude: $longitude) {
      ...RestaurantPreviewFields
    }
  }
`;

export const NEAR_BY_RESTAURANTS_PREVIEW = gql`
  query Restaurants($latitude: Float, $longitude: Float, $shopType: String) {
    nearByRestaurantsPreview(
      latitude: $latitude
      longitude: $longitude
      shopType: $shopType
    ) {
      restaurants {
        _id
        name
        image
        address
        deliveryTime
        minimumOrder
        rating
        isActive
        isAvailable
        commissionRate
        tax
        shopType
        cuisines
        reviewCount
        reviewAverage
        distanceWithCurrentLocation @client
        freeDelivery @client
        acceptVouchers @client
        location {
          coordinates
        }
      }
    }
  }
`;

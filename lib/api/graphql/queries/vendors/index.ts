import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantPreviewFields on RestaurantPreview {
    _id
    name
    image
    logo
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

export const TOP_RATED_VENDORS = gql`
  ${RESTAURANT_FRAGMENT}
  query TopRatedVendors($latitude: Float!, $longitude: Float!) {
    topRatedVendorsPreview(latitude: $latitude, longitude: $longitude) {
      ...RestaurantPreviewFields
    }
  }
`;
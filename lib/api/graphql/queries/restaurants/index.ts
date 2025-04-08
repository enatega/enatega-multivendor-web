import { gql } from "@apollo/client";

export const RESTAURANTS_FRAGMENT = gql`
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
        slug
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

export const GET_RESTAURANT_BY_ID_SLUG = gql`
  query RestaurantByIdAndSlug($id: String, $slug: String) {
    restaurant(id: $id, slug: $slug) {
      _id
      orderId
      orderPrefix
      name
      image
      slug
      address
      location {
        coordinates
      }
      deliveryTime
      minimumOrder
      tax
      reviewData {
        total
        ratings
        reviews {
          _id
          order {
            user {
              _id
              name
              email
            }
          }
          rating
          description
          createdAt
        }
      }
      categories {
        _id
        title
        foods {
          _id
          title
          image
          description
          variations {
            _id
            title
            price
            discounted
            addons
          }
        }
      }
      options {
        _id
        title
        description
        price
      }
      addons {
        _id
        options
        title
        description
        quantityMinimum
        quantityMaximum
      }
      zone {
        _id
        title
        tax
      }
      rating
      isAvailable
      openingTimes {
        day
        times {
          startTime
          endTime
        }
      }
    }
  }
`;

export const GET_REVIEWS_BY_RESTAURANT = gql`
  query GetReviewsByRestaurant($restaurant: String!) {
    reviewsByRestaurant(restaurant: $restaurant) {
      reviews {
        _id
        rating
        description
        isActive
        createdAt
        updatedAt
        order {
          _id
          user {
            _id
            name
            email
          }
        }
        restaurant {
          _id
          name
        }
      }
      ratings
      total
    }
  }
`;
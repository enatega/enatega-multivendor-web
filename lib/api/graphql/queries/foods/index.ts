// lib/api/graphql/queries/foods.js
import { gql } from '@apollo/client';

export const GET_USER_FAVORITE_FOODS = gql`
  query userFavoriteFoods {
    userFavoriteFoods {
      food {
        _id
        title
        description
        image
        variations {
          _id
          title
          price
          discounted
        }
        isFavourite
        isActive
        isOutOfStock
      }
      restaurant {
        _id
        name
        image
        address
        location {
          coordinates
        }
        slug
        reviewAverage
        reviewCount
        deliveryTime
        shopType
      }
      category {
        _id
        title
      }
    }
  }
`;
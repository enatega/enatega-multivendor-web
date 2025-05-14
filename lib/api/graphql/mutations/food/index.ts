// lib/api/graphql/mutations/food.js

import { gql } from "@apollo/client";

export const TOGGLE_FOOD_FAVORITE = gql`
  mutation ToggleFoodFavorite($foodId: ID!, $restaurantId: ID!, $categoryId: ID!) {
    toggleFoodFavorite(
      foodId: $foodId
      restaurantId: $restaurantId
      categoryId: $categoryId
    ) {
      _id
      title
      description
      image
      isFavourite
      isOutOfStock
      variations {
        _id
        title
        price
        discounted
        addons
      }
    }
  }
`;

export const LIKE_FOOD = gql`
  mutation LikeFood($foodId: String!) {
    likeFood(foodId: $foodId) {
      _id
      title
      description
      image
      isFavourite
      isOutOfStock
      variations {
        _id
        title
        price
        discounted
        addons
      }
    }
  }
`;
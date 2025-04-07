import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    cuisines {
      id
    name
    latitude
    longitude
    cities
    }
  }
`;

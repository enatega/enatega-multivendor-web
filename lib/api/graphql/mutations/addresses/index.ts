import { gql } from "@apollo/client";

export const SELECT_ADDRESS = gql`
  mutation SelectAddress($id: String!) {
    selectAddress(id: $id) {
      _id
      addresses {
        _id
        label
        deliveryAddress
        details
        location {
          coordinates
        }
        selected
      }
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      _id
      addresses {
        _id
        label
        deliveryAddress
        details
        location {
          coordinates
        }
      }
    }
  }
`;

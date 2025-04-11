import { gql } from "@apollo/client";

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

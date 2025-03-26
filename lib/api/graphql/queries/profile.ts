import { gql } from "@apollo/client";

export const profile = `
        query{
          profile{
            _id
            name
            phone
            phoneIsVerified
            email
            emailIsVerified
            notificationToken
            isOrderNotification
            isOfferNotification
            addresses{
              _id
              label
              deliveryAddress
              details
              location{coordinates}
              selected
            }
            favourite
          }
        }`;
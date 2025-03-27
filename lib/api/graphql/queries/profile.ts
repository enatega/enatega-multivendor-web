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
            isActive
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

export const deleteAddress = `mutation DeleteAddress($id:ID!){
            deleteAddress(id:$id){
              _id
              addresses{
                _id
                label
                deliveryAddress
                details
                location{coordinates}
              }
            }
        }`;

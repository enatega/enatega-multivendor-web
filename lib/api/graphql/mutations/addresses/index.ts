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

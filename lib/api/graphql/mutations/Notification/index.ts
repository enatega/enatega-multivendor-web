export const saveNotificationTokenWeb = `mutation SaveNotificationTokenWeb($token:String!){
    saveNotificationTokenWeb(token:$token){
      success
      message
    }
  }`;
'use client'

// libraries
import React from "react";

//Componets
import Start from "../../screen-components/un-protected/Home/Start";
import Cities from "../../screen-components/un-protected/Home/Cities";
import Info from "../../screen-components/un-protected/Home/Info";
import EnategaInfo from "../../screen-components/un-protected/Home/LifeWithEnatega";
import GrowBussiness from "../../screen-components/un-protected/Home/GrowBussiness";
import MiniCards from "../../screen-components/un-protected/Home/MiniCards";
import TinyTiles from "../../useable-components/tinyTiles";
import Couriers from "../../screen-components/un-protected/Home/ForCouriers";
import { PaddingContainer } from "../../useable-components/containers";
import { useMutation } from "@apollo/client";
import { updateNotificationStatus,saveNotificationTokenWeb } from "@/lib/api/graphql";

import { messaging } from "@/lib/config/firebase";
import { getToken } from "@/lib/config/firebase";


const Main = () => {

  const [mutate] = useMutation(updateNotificationStatus)
  const [saveNotify]=useMutation(saveNotificationTokenWeb)

  async function enableNotifications() {
    const permission = await Notification.requestPermission();
    console.log(permission)
  
    if (permission === "granted") {
      
      console.log("permisiion granted")
      await mutate({
        variables: {
          orderNotification: true,
          offerNotification: true,
        },
      });
      console.log("after orderNotificationStatus permission")
  
      //🔑 2. Get FCM token
      const token = await getToken(messaging, {
        vapidKey: "BOpVOtmawD0hzOR0F5NQTz_7oTlNVwgKX_EgElDnFuILsaE_jWYPIExAMIIGS-nYmy1lhf2QWFHQnDEFWNG_Z5w",
      });
  
      console.log("FCM TOKEN : ",token)


      console.log("Running before saveNotify")
      if (token) {
        await saveNotify({ variables: { token } });
        console.log("Running after saveNotify")
      }
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      });
  }
  
  // if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker
  //       .register('/sw.ts')
  //       .then((registration) => {
  //         console.log('Service Worker registered:', registration);
  //       })
  //       .catch((err) => {
  //         console.error('Service Worker registration failed:', err);
  //       });
  //   });
  // }

  return (
    <div className="w-screen">
      <button onClick={enableNotifications}>Enable me</button>
      <Start />
      <PaddingContainer>
        <div className="w-full">
          <Cities />
          <Info />
          <EnategaInfo />
          <GrowBussiness />
          <MiniCards />
          <div className="grid grid-cols-1 md:grid-cols-2 my-[40px] gap-8">
            <TinyTiles
              image={
                "https://images.ctfassets.net/23u853certza/6kRVPn5kxEnlkgCYUTozhL/7846cf51b410e633a8c30a021ec00bde/Restaurant.png?w=200&q=90&fm=webp"
              }
              heading={"Reach new customers and get more orders"}
              buttonText={"For restaurants"}
              backColor={"#eaf7fc"}
              link={"/restaurantInfo"}
            />
            <TinyTiles
              image={
                "https://images.ctfassets.net/23u853certza/4arD8VZQybXkPfyJXchLat/7457eac1b8137a76b50ed70c20cc03b4/Store.png?w=200&q=90&fm=webp"
              }
              heading={"Become a store partner"}
              buttonText={"For stores"}
              backColor="#eaf7fc"
              link={"/restaurantInfo"}
            />
          </div>

          <Couriers />
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Main;

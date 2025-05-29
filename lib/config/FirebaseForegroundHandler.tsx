"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebase";

export default function FirebaseForegroundHandler() {
  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    onMessage(messaging, (payload) => {
     
      console.log(" message recieved ",payload)
      if (Notification.permission === "granted") {
        const { title, body } = payload.notification || {};
        const { redirectUrl } = payload.data || {};

        const notification = new Notification(title || "Notification", {
          body: body || "You have a new message!",
          icon: "/192.png", 
        });

        // Optional: Handle click on the notification
        notification.onclick = () => {
          if (redirectUrl) {
            window.open(redirectUrl, "_blank");
          }
        };
      } else {
        console.warn("❌ Notification permission not granted.");
      }
    });
  }, []);

  return null;
}



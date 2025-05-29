"use client";

import { useEffect } from "react";
import { messaging } from "@/lib/config/firebase";
import { getToken } from "@/lib/config/firebase";

import { useMutation } from "@apollo/client";
import { updateNotificationStatus,saveNotificationTokenWeb } from "@/lib/api/graphql";


export default function NotificationInitializer() {
  const [saveNotify] = useMutation(saveNotificationTokenWeb);
  const [mutatePrefs] = useMutation(updateNotificationStatus);

  useEffect(() => {
    const initNotifications = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
      const permission = Notification.permission;
      if (permission === "default" && (token && userId) ) {
        const granted = await Notification.requestPermission();

        if (granted === "granted") {
          await mutatePrefs({
            variables: {
              orderNotification: true,
              offerNotification: true,
            },
          });

          const registration = await navigator.serviceWorker.ready;
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
          });

          if(!token)
            {
              console.log("token getting failed")
            }

          if (token) {
            await saveNotify({ variables: { token } });
          }
           else {
            console.warn("❌ Failed to get FCM token");
          }
        } else {
          console.warn("🔕 Permission denied");
        }
      }
    };

    initNotifications();
  },);

  return null;
}

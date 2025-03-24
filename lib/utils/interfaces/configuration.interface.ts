import { ReactNode } from "react";
import { IGlobalProps } from "./global.interface";

export interface IConfigurationContextProps extends IGlobalProps {}

export interface IConfigurationProviderProps {
  children: ReactNode;
}

export interface IFirebaseConfig {
  FIREBASE_AUTH_DOMAIN: string | undefined;
  FIREBASE_KEY: string | undefined;
  FIREBASE_PROJECT_ID: string | undefined;
  FIREBASE_STORAGE_BUCKET: string | undefined;
  FIREBASE_MSG_SENDER_ID: string | undefined;
  FIREBASE_APP_ID: string | undefined;
  FIREBASE_MEASUREMENT_ID: string | undefined;
}

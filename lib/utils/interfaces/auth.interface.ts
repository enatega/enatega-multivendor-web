import { OverridableTokenClientConfig } from "@react-oauth/google";
import { Dispatch, SetStateAction } from "react";
import { IAddress } from "./address.interface";
import { IUser } from "./orders.interface";

export interface IAppBarProps {
  handleModalToggle: () => void;
}
export interface IAuthModalProps {
  isAuthModalVisible: boolean;
  handleModalToggle: () => void;
}

export interface IAuthFormData {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  type?: "default" | "google";
}
export interface ILoginWithGoogleProps {
  googleLogin: (overrideConfig?: OverridableTokenClientConfig) => void;
  handleChangePanel: (index: number) => void;
  handleFormChange: (name: string, value: string) => void;
  formData: IAuthFormData;
}

export interface ILoginWithEmailProps {
  handleChangePanel: (index: number) => void;
  handleFormChange: (name: string, value: string) => void;
  formData: IAuthFormData;
}

export interface ISaveEmailAddressProps {
  handleChangePanel: (index: number) => void;
}

export interface IEmailVerificationProps {
  emailOtp: string;
  setEmailOtp: Dispatch<SetStateAction<string>>;
  email: string;
  handleChangePanel: (index: number) => void;
}
export interface IPhoneVerificationProps {
  phoneOtp: string;
  setPhoneOtp: Dispatch<SetStateAction<string>>;
  phone: string;
  handleChangePanel: (index: number) => void;
  handleFormChange: (name: string, value: string) => void;
  formData: IAuthFormData;
}

export interface IUserLoginArguments {
  appleId?: string;
  email?: string;
  password?: string;
  phone?: string;
  type?: string;
  name?: string;
  notificationToken?: string;
  isActive?: boolean;
}

export interface IAuthContextProps {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<ILoginProfile | null>>;
  checkEmail: (email: string) => Promise<boolean | void>;
  checkPhone: (phone: string) => Promise<boolean | void>;
  handleUserLogin: (
    user: IUserLoginArguments & {
      phone?: string;
    },
  ) => Promise<ILoginProfileResponse | null | undefined>;
  activePanel: number;
  setActivePanel: Dispatch<SetStateAction<number>>;
  isAuthModalVisible: boolean;
  setIsAuthModalVisible: Dispatch<SetStateAction<boolean>>;
  otp: string | null;
  setOtp: Dispatch<SetStateAction<string | null>>;
}
export interface ILoginProfile {
  userId?: string;
  token?: string;
  tokenExpiration?: string;
  name?: string;
  phone?: string;
  phoneIsVerified?: boolean;
  email?: string;
  emailIsVerified?: string;
  picture?: string;
  addresses?: {
    location?: {
      coordinates?: string[];
    };
    deliveryAddress?: string;
  };
  isNewUser?: boolean;
  userTypeId?: string;
  isActive?: boolean;
}
export interface ILoginProfileResponse {
  login: ILoginProfile;
}

export interface IPhoneExistsResponse {
  phoneExist: { _id: string };
}

export interface IEmailExistsResponse {
  emailExist: { _id: string };
}

export interface ISendOtpToPhoneResponse {
  sendOtpToPhoneNumber: { result: boolean };
}

export interface ISendOtpToEmailResponse {
  sendOtpToEmail: { result: boolean };
}

export interface IUpdateUserResponse {
  name: string;
  email: string;
  emailIsVerified: boolean;
  phone: string;
  phoneIsVerified: boolean;
  password: string;
  appleId?: string;
  userType?: string;
  isActive: boolean;
  notificationToken?: string;
  notificationTokenWeb?: string;
  isOrderNotification: boolean;
  isOfferNotification: boolean;
  notifications: any[]; // You can replace `any` with a specific type if you have one
  addresses: IAddress[]; // assuming `addressSchema` maps to an Address interface
  favourite: string[];
}
export interface Point {
  coordinates: [string];
}

export interface IUserAddress {
  _id: string;
  location?: Point; // optional if it can be null
  deliveryAddress: string;
  details?: string;
  label: string;
  selected?: boolean;
}

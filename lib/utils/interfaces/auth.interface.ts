import { OverridableTokenClientConfig } from "@react-oauth/google";
import { Dispatch, SetStateAction } from "react";
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
  appleId: string;
  email: string;
  password: string;
  type: string;
  name: string;
  notificationToken: string;
  isActive: boolean;
}

export interface IAuthContextProps {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  checkEmail: (email: string) => Promise<boolean | void>;
  checkPhone: (phone: string) => Promise<boolean | void>;
}

"use client";

// Hooks
import useToast from "@/lib/hooks/useToast";
import { useTranslations } from "next-intl";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Context
import { useConfig } from "../configuration/configuration.context";

// GQL
import {
  EMAIL_EXISTS,
  LOGIN,
  PHONE_EXISTS,
  SENT_OTP_TO_EMAIL,
  SENT_OTP_TO_PHONE,
} from "@/lib/api/graphql";

// Interface & Types
import {
  IAuthContextProps,
  ILoginProfile,
  ILoginProfileResponse,
  IPhoneExistsResponse,
  ISendOtpToEmailResponse,
  ISendOtpToPhoneResponse,
  IUserLoginArguments
} from "@/lib/utils/interfaces";

// Apollo
import { ApolloError, useMutation, useQuery } from "@apollo/client";

// Google API
import { onUseLocalStorage } from "@/lib/utils/methods/local-storage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const AuthContext = createContext({} as IAuthContextProps);

export default function AuthProvider({ children }: { children: ReactNode }) {
  // States
  const [activePanel, setActivePanel] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState<ILoginProfile | null>(null);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);

  // Refs
  const otpFrom = useRef<string | null>(null);

  // Hooks
  const {
    GOOGLE_CLIENT_ID,
    SKIP_EMAIL_VERIFICATION,
    SKIP_MOBILE_VERIFICATION,
    TEST_OTP,
  } = useConfig();
  const { showToast } = useToast();
  const t = useTranslations();
  const router = useRouter();

  // Mutations
  const [mutateEmailCheck] = useMutation<
    IPhoneExistsResponse,
    undefined | { email: string }
  >(EMAIL_EXISTS);
  const [mutatePhoneCheck] = useMutation<
    IPhoneExistsResponse,
    undefined | { phone: string }
  >(PHONE_EXISTS);
  const [mutateLogin] = useMutation<
    ILoginProfileResponse,
    undefined | IUserLoginArguments
  >(LOGIN, { onCompleted: onLoginCompleted, onError: onLoginError });
  const [sendOtpToPhone] =
    useMutation<ISendOtpToPhoneResponse>(SENT_OTP_TO_PHONE);
  const [sendOtpToEmail] =
    useMutation<ISendOtpToEmailResponse>(SENT_OTP_TO_EMAIL);

  const {data:userProfileData, refetch:fetchUserProfileData} = useQuery(PROFILE)

  // Checkers
  async function checkEmail(email: string) {
    try {
      const emailResponse = await mutateEmailCheck({
        variables: { email: email },
      });

      if (emailResponse.data?.profile?._id) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      const error = err as ApolloError;
      console.error("Error while checking email:", error);
      return showToast({
        type: "error",
        title: t("Email Check Error"),
        message:
          error.cause?.message ||
          t("An error occurred while checking the email"),
      });
    }
  }

  async function checkPhone(phone: string) {
    try {
      const phoneResponse = await mutatePhoneCheck({
        variables: { phone: phone },
      });
      if (phoneResponse.data?.phoneExist?._id) {
        return showToast({
          type: "error",
          title: t("Phone Check Error"),
          message: t(
            t(
              "This phone number is already registered please enter a different one",
            ), // put a ","m after "registered" and "." at the end of the sentence in the translation
          ),
        });
      } else {
        if (SKIP_MOBILE_VERIFICATION) {
          console.log("🚀 ~ checkPhone ~ SKIP_MOBILE_VERIFICATION:", {
            SKIP_MOBILE_VERIFICATION,
          });
          setOtp(TEST_OTP);
          setActivePanel(6);
          return;
        } else {
          generateOTP();
          setOtp((otpFrom.current??TEST_OTP)?.substring(0,4));
          const otpResponse = await sendOtpToPhone({
            variables: { phone: phone, otp: otpFrom.current },
          });
          if (otpResponse.data?.sendOtpToPhoneNumber?.result) {
            setActivePanel(6);

          } else {
            showToast({
              type: "error",
              title: t("Error Sending OTP"),
              message: t("An error occurred while sending the OTP"),
            });
            setActivePanel(4);
            return;
          }
        }
      }
    } catch (err) {
      const error = err as ApolloError;
      console.error("Error while checking phone:", error);
      return showToast({
        type: "error",
        title: t("Phone Check Error"),
        message:
          error.cause?.message ||
          t("An error occurred while checking the phone"),
      });
    }
  }

  // handlers
  const handleUserLogin = async (user: IUserLoginArguments) => {
    try {
      const userResponse = await mutateLogin({
        variables: { ...user },
      });
      const { data } = userResponse;
      onUseLocalStorage("save", "userId", data?.login.userId);
      return data;
    } catch (err) {
      const error = err as ApolloError;
      console.error(
        "An error occured while performing login of type:",
        user.type,
        "ERROR:",
        error,
      );
      showToast({
        type: "error",
        title: t("Login Error"),
        message:
          error.cause?.message || t("An error occurred while logging in"),
      });
    }
  };

  async function handleUserProfile(){
    try {
      
    } catch (err) {
      const error = err as ApolloError;
      console.error('Error while fetching user profile:', error);
      showToast({
        type: "error",
        title: t("Profile Error"),
        message:
          error.cause?.message || t("An error occurred while fetching profile"),
      });
    }
  }

  // GQL Handlers
  function onLoginCompleted(data: ILoginProfileResponse) {
    try {
      setUser(data.login);
      console.log(data.login);
      if (!data.login.emailIsVerified) {
        setActivePanel(3);
        console.log("Email is not verified");
      } else if (!data.login.phoneIsVerified) {
        setActivePanel(4);
        console.log("Phone is not verified");
      } else {
        router.push("/");
        setIsAuthModalVisible(false);
      }
    } catch (err) {
      const error = err as ApolloError;
      console.error("Error while logging in:", error);
      showToast({
        type: "error",
        title: t("Login Error"),
        message:
          error.cause?.message || t("An error occurred while logging in"),
      });
    }
  }

  function onLoginError(error: ApolloError) {
    console.error("Error while logging in:", error);
    showToast({
      type: "error",
      title: t("Login Error"),
      message: error.cause?.message || t("An error occurred while logging in"),
    });
  }

  // Generators
  function generateOTP() {
    otpFrom.current = Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Use Effects
  useEffect(() => {
    if (typeof window === "undefined") return; // ⛔ Prevent SSR execution

    // Local Vars
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (typeof user?.token !== "undefined" && !!user?.token) {
      onUseLocalStorage("save", "userToken", user.token);
    }
    if (typeof user?.addresses !== "undefined" && !!user?.addresses) {
      onUseLocalStorage("save", "userAddress", JSON.stringify(user.addresses));
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID ?? "not_found"}>
      <AuthContext.Provider
        value={{
          authToken,
          setAuthToken,
          user,
          setUser,
          checkEmail,
          checkPhone,
          handleUserLogin,
          activePanel,
          setActivePanel,
          isAuthModalVisible,
          setIsAuthModalVisible,
          otp,
          setOtp
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export const useAuth = () => useContext(AuthContext);

"use client";


// Hooks
import useToast from "@/lib/hooks/useToast";
import { useTranslations } from "next-intl";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";


// Context
import { useConfig } from "../configuration/configuration.context";

// GQL
import { EMAIL_EXISTS, LOGIN, PHONE_EXISTS } from "@/lib/api/graphql";

// Interface & Types
import {
  IAuthContextProps,
  IProfileResponse,
  IUser,
  IUserLoginArguments,
} from "@/lib/utils/interfaces";

// Apollo
import { ApolloError, useMutation } from "@apollo/client";

// Google API
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthContext = createContext(
  {} as IAuthContextProps,
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  // States
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState<IUser | null>(null);

  // Hooks
  const { GOOGLE_CLIENT_ID } = useConfig();
  const { showToast } = useToast();
  const t = useTranslations();

  // Mutations
  const [mutateEmailCheck] = useMutation<
    IProfileResponse,
    undefined | { email: string }
  >(EMAIL_EXISTS);
  const [mutatePhoneCheck] = useMutation<
    IProfileResponse,
    undefined | { phone: string }
  >(PHONE_EXISTS);
  const [mutateLogin] = useMutation<
    IProfileResponse,
    undefined | IUserLoginArguments
  >(LOGIN);

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

      if (phoneResponse.data?.profile?._id) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      const error = err as ApolloError;
      console.error("Error while checking phone:", error);
      return showToast({
        type: "error",
        title: t("phone Check Error"),
        message:
          error.cause?.message ||
          t("An error occurred while checking the phone"),
      });
    }
  }

  // handlers
  const userLogin = async (user: IUserLoginArguments & { phone: string }) => {
    try {
      const userResponse = await mutateLogin({
        variables: { ...user },
      });
      const { data } = userResponse;
      return data;
    } catch (error) {
      console.error(
        "An error occured while performing login of type:",
        user.type,
        "ERRO:",
        error,
      );
    }
  };
  // Use Effects
  useEffect(() => {
    if (typeof window === "undefined") return; // ⛔ Prevent SSR execution

    // Local Vars
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    }
  }, []);
console.log(user)
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
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export const useAuth = () => useContext(AuthContext);

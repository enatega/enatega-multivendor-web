"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Apollo
import { ApolloError } from "@apollo/client";

// Core
import useToast from "@/lib/hooks/useToast";

import { useConfig } from "../configuration/configuration.context";

// Google API
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";

const AuthContext = createContext({} as {});

export default function AuthProvider({ children }: { children: ReactNode }) {
  // States
  const [authToken, setAuthToken] = useState("");

  // Hooks
  const { showToast } = useToast();
  const { GOOGLE_CLIENT_ID } = useConfig();

  // Handlers
  const handleEmailCheck = (email: string) => {
    try {
      console.log(email);
    } catch (err) {
      const error = err as ApolloError;
      showToast({
        type: "error",
        title: "Auth Error",
        message:
          error.graphQLErrors[0]?.message ||
          error.networkError?.message ||
          "An error occured while checking the email, Please again later.",
      });
    }
  };

  const handleLoginWithGoogle = (email: string) => {
    console.log(email);
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

  useEffect(() => {
    if (typeof window === "undefined" || !GOOGLE_CLIENT_ID) {
      console.warn("Waiting for GOOGLE_CLIENT_ID...");
      return;
    }
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, [GOOGLE_CLIENT_ID]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID ?? "not_found"}>
      <AuthContext.Provider
        value={{ authToken, handleEmailCheck, handleLoginWithGoogle }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export const useAuth = () => useContext(AuthContext);

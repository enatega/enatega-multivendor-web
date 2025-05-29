"use client";

import getEnv from "@/environment";
// GQL
import { GET_CONFIG } from "@/lib/api/graphql/queries";
import { ENV } from "@/lib/utils/constants";

// Interfaces
import { IConfigProps } from "@/lib/utils/interfaces";

// Apollo
import { useQuery } from "@apollo/client";
import { Libraries } from "@react-google-maps/api";

// Core
import React, { ReactNode, useContext } from "react";

const ConfigurationContext = React.createContext({} as IConfigProps);

export const ConfigurationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { loading, data, error } = useQuery(GET_CONFIG);
  const configuration =
    loading || error || !data.configuration ?
      { currency: "", currencySymbol: "", deliveryRate: 0, costType: "perKM" }
    : data.configuration;
    
  const GOOGLE_CLIENT_ID = configuration.webClientID;
  const IS_MULTIVENDOR = configuration.isMultiVendor;
  const STRIPE_PUBLIC_KEY = configuration.publishableKey;
  const PAYPAL_KEY = configuration.clientId;
  const GOOGLE_MAPS_KEY = configuration.googleApiKey;
  const AMPLITUDE_API_KEY = configuration.webAmplitudeApiKey;
  const LIBRARIES = "places,drawing,geometry".split(",") as Libraries;
  const COLORS = {
    GOOGLE: configuration.googleColor as string,
  };
  const SENTRY_DSN = configuration.webSentryUrl;
  const SKIP_EMAIL_VERIFICATION = configuration.skipEmailVerification;
  const SKIP_MOBILE_VERIFICATION = configuration.skipMobileVerification;
  const CURRENCY = configuration.currency;
  const CURRENCY_SYMBOL = configuration.currencySymbol;
  const DELIVERY_RATE = configuration.deliveryRate;
  const COST_TYPE = configuration.costType;
  const TEST_OTP = configuration.testOtp;
  const { SERVER_URL } = getEnv(ENV);

  return (
    <ConfigurationContext.Provider
      value={{
        GOOGLE_CLIENT_ID,
        STRIPE_PUBLIC_KEY,
        PAYPAL_KEY,
        IS_MULTIVENDOR,
        GOOGLE_MAPS_KEY,
        AMPLITUDE_API_KEY,
        LIBRARIES,
        COLORS,
        SENTRY_DSN,
        SKIP_EMAIL_VERIFICATION,
        SKIP_MOBILE_VERIFICATION,
        CURRENCY,
        CURRENCY_SYMBOL,
        DELIVERY_RATE,
        COST_TYPE,
        TEST_OTP,
        SERVER_URL,
        isMultiVendor: IS_MULTIVENDOR,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
export const ConfigurationConsumer = ConfigurationContext.Consumer;
export const useConfig = () => useContext(ConfigurationContext);

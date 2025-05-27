import { Libraries } from "@react-google-maps/api";

export interface IConfigProps {
  GOOGLE_CLIENT_ID: string;
  STRIPE_PUBLIC_KEY: string;
  PAYPAL_KEY: string;
  GOOGLE_MAPS_KEY: string;
  AMPLITUDE_API_KEY: string;
  LIBRARIES: Libraries;
  COLORS: { GOOGLE: string };
  SENTRY_DSN: string;
  SKIP_EMAIL_VERIFICATION: string;
  SKIP_MOBILE_VERIFICATION: string;
  CURRENCY: string;
  CURRENCY_SYMBOL: string;
  DELIVERY_RATE: number;
  IS_MULTIVENDOR: boolean;
  COST_TYPE: string;
  TEST_OTP: string;
  SERVER_URL: string;
  isMultiVendor: boolean;
}

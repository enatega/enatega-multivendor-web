"use client";

// Core
import { ApolloProvider } from "@apollo/client";

// Prime React
import { PrimeReactProvider } from "primereact/api";

// Context
import { ToastProvider } from "@/lib/context/global/toast.context";

// Configuration
// import { FontawesomeConfig } from '@/lib/config';

// Styles
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./global.css";

// Apollo
import AuthProvider from "@/lib/context/auth/auth.context";
import { ConfigurationProvider,useConfig } from "@/lib/context/configuration/configuration.context";
import { useSetupApollo } from "@/lib/hooks/useSetApollo";
import { UserProvider } from "@/lib/context/User/User.context";
// Layout
import AppLayout from "@/lib/ui/layouts/global";
import { FontawesomeConfig } from "@/lib/config";
import { GoogleMapsProvider } from "@/lib/context/global/google-maps.context";
import { LocationProvider } from "@/lib/context/Location/location.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Apollo
  const client = useSetupApollo();

  const {GOOGLE_MAPS_KEY,LIBRARIES} =useConfig()

  // Constants
  const value = {
    ripple: true,
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <FontawesomeConfig />
      </head>
      <body className={"flex flex-col flex-wrap"}>
        <PrimeReactProvider value={value}>
          <ApolloProvider client={client}>
            <ConfigurationProvider>
              <ToastProvider>
                <AuthProvider>
                  <UserProvider>
                  <GoogleMapsProvider apiKey={GOOGLE_MAPS_KEY} libraries={LIBRARIES} >
                  <LocationProvider>
                  <AppLayout>{children}</AppLayout>
                  </LocationProvider>
                  </GoogleMapsProvider>
                  </UserProvider>
                </AuthProvider>
              </ToastProvider>
            </ConfigurationProvider>
          </ApolloProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}

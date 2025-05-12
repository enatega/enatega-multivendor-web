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
import { UserProvider } from "@/lib/context/User/User.context";
import AuthProvider from "@/lib/context/auth/auth.context";
import { ConfigurationProvider } from "@/lib/context/configuration/configuration.context";
import { useSetupApollo } from "@/lib/hooks/useSetApollo";
// Layout
import { FontawesomeConfig } from "@/lib/config";
import { LocationProvider } from "@/lib/context/Location/Location.context";
import { UserAddressProvider } from "@/lib/context/address/address.context";
import { SearchUIProvider } from "@/lib/context/search/search.context";
import AppLayout from "@/lib/ui/layouts/global";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Apollo
  const client = useSetupApollo();

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
                    <LocationProvider>
                      <UserAddressProvider>
                        <SearchUIProvider>
                          <AppLayout>{children}</AppLayout>
                        </SearchUIProvider>
                      </UserAddressProvider>
                    </LocationProvider>
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

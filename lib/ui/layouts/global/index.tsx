/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
// Components
import AppTopbar from "@/lib/ui/screen-components/un-protected/layout/app-bar";

// Interface & Types
import { IProvider } from "@/lib/utils/interfaces";

// Google OAuth
import AuthModal from "@/lib/ui/screen-components/un-protected/authentication";
import AppFooter from "../../screen-components/un-protected/layout/app-footer";
import { useConfig } from "@/lib/context/configuration/configuration.context";
import { GoogleMapsProvider } from "@/lib/context/global/google-maps.context";

const AppLayout = ({ children }: IProvider) => {
  // States
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  // Hook
  const { GOOGLE_MAPS_KEY, LIBRARIES } = useConfig();

  const handleModalToggle = () => {
    setIsAuthModalVisible((prev) => !prev);
  };

  const UI = (
    <div className="layout-main">
      <div className="layout-top-container">
        <AppTopbar handleModalToggle={handleModalToggle} />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">{children}</div>
      </div>
      <div>
        <AppFooter />
      </div>
      <AuthModal
        handleModalToggle={handleModalToggle}
        isAuthModalVisible={isAuthModalVisible}
      />
    </div>
  );

  useEffect(() => {}, [GOOGLE_MAPS_KEY]);

  return GOOGLE_MAPS_KEY ?
      <GoogleMapsProvider apiKey={GOOGLE_MAPS_KEY} libraries={LIBRARIES}>
        <>{UI}</>
      </GoogleMapsProvider>
    : <>{UI}</>;
};

export default AppLayout;

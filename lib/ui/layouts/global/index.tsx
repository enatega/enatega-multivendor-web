/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
// Components
import AppTopbar from "@/lib/ui/screen-components/un-protected/layout/app-bar";

// Interface & Types
import { IProvider } from "@/lib/utils/interfaces";

// Google OAuth
import { useConfig } from "@/lib/context/configuration/configuration.context";
import { GoogleMapsProvider } from "@/lib/context/global/google-maps.context";
import AuthModal from "@/lib/ui/screen-components/un-protected/authentication";
import AppFooter from "../../screen-components/un-protected/layout/app-footer";

// Hooks
import { useAuth } from "@/lib/context/auth/auth.context";

const AppLayout = ({ children }: IProvider) => {
  const [isScrolled , setIsScrolled] = useState(false);
  // Hooks
  const { isAuthModalVisible, setIsAuthModalVisible } = useAuth();

  // Hook
  const { GOOGLE_MAPS_KEY, LIBRARIES } = useConfig();

  const handleModalToggle = () => {
    setIsAuthModalVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 300 ? true : false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const UI = (
    <div className="layout-main">
      <div className={`
        layout-top-container transtion-all duration-300 ease-in-out
        ${isScrolled ? '!fixed !top-0 left-0 shadow-lg' : ''}
      `}>
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

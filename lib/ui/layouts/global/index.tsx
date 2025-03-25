/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
// Components
import AppTopbar from "@/lib/ui/screen-components/un-protected/layout/app-bar";

// Interface & Types
import { IProvider } from "@/lib/utils/interfaces";

// Google OAuth
import AuthModal from "@/lib/ui/screen-components/un-protected/authentication";

const AppLayout = ({ children }: IProvider) => {
  // States
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  // Handlers
  const handleModalToggle = () => {
    setIsAuthModalVisible((prev) => !prev);
  };
  return (
    <div className="layout-main">
      <div className="layout-top-container">
        <AppTopbar handleModalToggle={handleModalToggle} />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">{children}</div>
      </div>
      <AuthModal
        handleModalToggle={handleModalToggle}
        isAuthModalVisible={isAuthModalVisible}
      />
    </div>
  );
};

export default AppLayout;

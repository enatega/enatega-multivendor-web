/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// Components
import AppTopbar from "@/lib/ui/screen-components/un-protected/layout/app-bar";

// Interface & Types
import { IProvider } from "@/lib/utils/interfaces";

// Google OAuth
import AuthModal from "@/lib/ui/screen-components/un-protected/authentication";

// Hooks
import { useAuth } from "@/lib/context/auth/auth.context";

const AppLayout = ({ children }: IProvider) => {
  // Hooks
 const { isAuthModalVisible, setIsAuthModalVisible } = useAuth();

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

"use client";
// Interfaces
import {
  IAuthFormData,
  IAuthModalProps,
  ILoginProfile,
} from "@/lib/utils/interfaces";

// Hooks
import { useAuth } from "@/lib/context/auth/auth.context";
import { useGoogleLogin } from "@react-oauth/google";
import { useRef, useState } from "react";
// import { useTranslations } from "next-intl";

//Prime React
import { Dialog } from "primereact/dialog";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

// Components
import { useConfig } from "@/lib/context/configuration/configuration.context";
import useToast from "@/lib/hooks/useToast";
import EmailVerification from "./email-verification";
import EnterPassword from "./enter-password";
import LoginWithEmail from "./login-with-email";
import LoginWithGoogle from "./login-with-google";
import PhoneVerification from "./phone-verification";
import SaveEmailAddress from "./save-email-address";
import SavePhoneNumber from "./save-phone-number";
import SignUpWithEmail from "./signup-with-email";

export default function AuthModal({
  isAuthModalVisible,
  handleModalToggle,
}: IAuthModalProps) {
  // States
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [formData, setFormData] = useState<IAuthFormData>({
    email: "",
    password: "",
    name: "",
    phone: "",
  });


  // Refs
  const authenticationPanelRef = useRef(null);

  // Hooks
  const {
    handleUserLogin,
    activePanel,
    setActivePanel,
    setUser,
    setIsAuthModalVisible,
    setIsLoading
  } = useAuth();
  const { showToast } = useToast();
  const {SKIP_EMAIL_VERIFICATION, SKIP_MOBILE_VERIFICATION} = useConfig();

  // Login With Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true)
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      const userData = await userInfo.json();
      
      const userLoginResponse = await handleUserLogin({
        type: "google",
        email: userData.email,
        name: userData.name,
        notificationToken: "",
      });
      console.log("🚀 ~ onSuccess: ~ userData google:", userLoginResponse?.login)
      if (userLoginResponse) {
        setUser(userLoginResponse.login as ILoginProfile);
        if (!userLoginResponse.login.emailIsVerified&&SKIP_EMAIL_VERIFICATION) {
          setActivePanel(5);
        } else if (!userLoginResponse.login.phoneIsVerified&&SKIP_MOBILE_VERIFICATION) {
          setActivePanel(4);
        } else {
          setActivePanel(0);
          setIsAuthModalVisible(false);
          showToast({
            type: "success",
            title: "Login",
            message: "You have logged in successfully",
          });
        }
      setIsLoading(false)
      }
    },

    onError: (errorResponse) => {
      console.log(errorResponse);
    },
  });

  // Handlers
  const handleChangePanel = (index: number) => {
    setActivePanel(index);
  };

  const handleFormChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Dialog
      showHeader={true}
      visible={isAuthModalVisible}
      onHide={handleModalToggle}
      closable={activePanel <= 3}
      contentStyle={{
        padding: "22px",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
      headerStyle={{
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        height: "fit-content",
      }}
      className="lg:w-1/3 w-full h-auto"
      closeOnEscape={activePanel <= 3}
    >
      <Stepper ref={authenticationPanelRef} activeStep={activePanel}>
        <StepperPanel>
          <LoginWithGoogle
            googleLogin={googleLogin}
            handleChangePanel={handleChangePanel}
            handleFormChange={handleFormChange}
            formData={formData}
          />
        </StepperPanel>

        <StepperPanel>
          <LoginWithEmail
            handleChangePanel={handleChangePanel}
            handleFormChange={handleFormChange}
            formData={formData}
          />
        </StepperPanel>

        <StepperPanel>
          <SignUpWithEmail
            handleChangePanel={handleChangePanel}
            handleFormChange={handleFormChange}
            formData={formData}
          />
        </StepperPanel>

        <StepperPanel>
          <EmailVerification
            handleChangePanel={handleChangePanel}
            emailOtp={emailOtp}
            setEmailOtp={setEmailOtp}
          />
        </StepperPanel>
        <StepperPanel>
          <SavePhoneNumber />
        </StepperPanel>
        <StepperPanel>
          <SaveEmailAddress handleChangePanel={handleChangePanel} />
        </StepperPanel>
        <StepperPanel>
          <PhoneVerification
            handleChangePanel={handleChangePanel}
            phoneOtp={phoneOtp}
            setPhoneOtp={setPhoneOtp}
          />
        </StepperPanel>
        <StepperPanel>
          <EnterPassword
            formData={formData}
            setFormData={setFormData}
            handleChangePanel={handleChangePanel}
            handleFormChange={handleFormChange}
          />
        </StepperPanel>
      </Stepper>
    </Dialog>
  );
}

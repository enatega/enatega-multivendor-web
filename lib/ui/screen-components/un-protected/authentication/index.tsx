"use client";
// Interfaces
import { IAuthFormData, IAuthModalProps } from "@/lib/utils/interfaces";

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
import EmailVerification from "./email-verification";
import LoginWithEmail from "./login-with-email";
import LoginWithGoogle from "./login-with-google";
import PhoneVerification from "./phone-verification";
import SignUpWithEmail from "./signup-with-email";

export default function AuthModal({
  isAuthModalVisible,
  handleModalToggle,
}: IAuthModalProps) {
  // States
  const [activePanel, setActivePanel] = useState(0);
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
  const {setUser} = useAuth();

  // Login With Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      const userData = await userInfo.json();
      setUser({
        name:userData.name,
        email:userData.email,
        token:tokenResponse.access_token,
      });


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
      closable={activePanel <= 2}
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
      closeOnEscape={activePanel <= 2}
    >
      <Stepper
        ref={authenticationPanelRef}
        activeStep={activePanel}
      >
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
            email="example@gmail.com"
            emailOtp={emailOtp}
            setEmailOtp={setEmailOtp}
          />
        </StepperPanel>
        <StepperPanel>
          <PhoneVerification
            handleChangePanel={handleChangePanel}
            phone={formData.phone ?? "+9234235899999"}
            phoneOtp={phoneOtp}
            setPhoneOtp={setPhoneOtp}
            handleFormChange={handleFormChange}
            formData={formData}
          />
        </StepperPanel>
      </Stepper>
    </Dialog>
  );
}

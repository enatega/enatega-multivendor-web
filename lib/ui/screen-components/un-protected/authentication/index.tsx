"use client";

import CustomIconButton from "@/lib/ui/useable-components/custom-icon-button";
import { IAuthModalProps } from "@/lib/utils/interfaces";
import GoogleLogo from "@/public/assets/images/svgs/google-logo";
import { useGoogleLogin } from "@react-oauth/google";
import { Dialog } from "primereact/dialog";

export default function AuthModal({
  isAuthModalVisible,
  handleModalToggle,
}: IAuthModalProps) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      console.log({userInfo:await userInfo.json()});
      return userInfo;
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      return errorResponse;
    },
  });
  return (
    <Dialog
      header="Welcome!"
      showHeader={false}
      visible={isAuthModalVisible}
      onHide={handleModalToggle}
      className="lg:w-1/3 w-full h-auto"
    >
      <div className="flex flex-col gap-y-2 items-center justify-start left-12">
        <h3 className="font-bold">Welcome!</h3>
        <p className="font-normal">Sign up or log in to continue</p>
      </div>
    <div className="my-4">
    <CustomIconButton SvgIcon={GoogleLogo} title="Sign In With Google" handleClick={googleLogin}  />
    </div>
    </Dialog>
  );
}

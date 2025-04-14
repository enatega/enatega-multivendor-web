// Components
import CustomButton from "@/lib/ui/useable-components/button";

// Interfaces
import { IEmailVerificationProps } from "@/lib/utils/interfaces";

// Hooks
import { useAuth } from "@/lib/context/auth/auth.context";
import { useTranslations } from "next-intl";

// Prime React
import { InputOtp } from "primereact/inputotp";
import { useEffect } from "react";

export default function EmailVerification({
  handleChangePanel,
}: IEmailVerificationProps) {
  // Hooks
  const t = useTranslations();
  const { user, emailOtp, setEmailOtp } = useAuth();

  useEffect(() => {
    if(!user?.email) {
      handleChangePanel(4);
    }
  },[user?.email])
  return (
    <div className="flex flex-col justify-between item-center self-center p-4">
      <p>
        {t("We have sent OTP code to")}&nbsp;
        <span className="font-bold">{user?.email??"example@email.com"}</span>
      </p>
      <p className="font-light text-sm">{t("Please check your inbox")}</p>
      <InputOtp
        value={emailOtp}
        onChange={(e) => setEmailOtp(String(e.value))}
        color="red"
        autoFocus={true}
        mask
        className="w-full h-20 my-2"
      />

      <CustomButton
        label={t("Continue")}
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72 my-1`}
        onClick={() => handleChangePanel(4)}
      />
      <CustomButton
        label={t("Resend OTP")}
        className={`bg-[#fff] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72 my-1`}
      />
    </div>
  );
}

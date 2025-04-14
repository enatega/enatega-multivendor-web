// Components
import CustomButton from "@/lib/ui/useable-components/button";

// Interfaces
import { IPhoneVerificationProps } from "@/lib/utils/interfaces";

// Hooks
import { useTranslations } from "next-intl";

// Prime React
import { InputOtp } from "primereact/inputotp";

export default function PhoneVerification({
  phoneOtp,
  setPhoneOtp,
  phone="+314 432 43242",
  handleChangePanel
}: IPhoneVerificationProps) {
  // Hooks
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-between item-center self-center">
      <p>
        {t("We have sent OTP code to")}
        <span className="font-bold">{phone}</span>
      </p>
      <p className="font-light text-sm">{t("Please check your inbox")}</p>
      <InputOtp
        value={phoneOtp}
        onChange={(e) => setPhoneOtp(String(e.value))}
        color="red"
        autoFocus={true}
        mask
        className="w-full h-20 my-2"
        onPaste={(e) =>
          setPhoneOtp(
            String(e.clipboardData.items[0].getAsString((data) => data)),
          )
        }
        placeholder="1231"
      />

      <CustomButton label={t("Continue")} className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72 my-1`} onClick={()=>handleChangePanel(1)}/>
      <CustomButton label={t("Resend OTP")} className={`bg-[#fff] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72 my-1`} />
    </div>
  );
}

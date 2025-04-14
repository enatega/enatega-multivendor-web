// Components
import { UPDATE_USER } from "@/lib/api/graphql";
import { useAuth } from "@/lib/context/auth/auth.context";
import useToast from "@/lib/hooks/useToast";
import CustomButton from "@/lib/ui/useable-components/button";

// Interfaces
import {
  IPhoneVerificationProps,
  IUpdateUserResponse,
} from "@/lib/utils/interfaces";
import { ApolloError, useMutation } from "@apollo/client";

// Hooks
import { useTranslations } from "next-intl";

// Prime React
import { InputOtp } from "primereact/inputotp";

export default function PhoneVerification({
  phoneOtp,
  setPhoneOtp,
  handleChangePanel,
}: IPhoneVerificationProps) {
  // Hooks
  const t = useTranslations();
  const { user, otp, checkPhone } = useAuth();
  const { showToast } = useToast();

  // Mutations
  const [updateUser] = useMutation<
    IUpdateUserResponse,
    undefined | { phone: string, name: string }
  >(UPDATE_USER, {
    onError: (error: ApolloError) => {
      showToast({
        type: "error",
        title: t("Error"),
        message: t("An error occurred while updating the user"),
      });
    },
  });

  // Handlers
  const handleSubmit = async () => {
    try {
      console.log(
        "🚀 ~ handleSubmit ~ phoneOtp === otp:",
        phoneOtp === otp,
        phoneOtp,
        otp,
      );
      if (String(phoneOtp) === String(otp) && !!user?.phone) {
        handleChangePanel(5);
        await updateUser({
          variables: {
            phone: user?.phone,
            name:user?.name??""
          },
        });
      } else {
        showToast({
          type: "error",
          title: t("OTP Error"),
          message: t("Please enter a valid OTP code"),
        });
      }
    } catch (error) {
      console.error(
        "Error while updating user and phone otp verification:",
        error,
      );
    }
  };
  const handleResendPhoneOtp = () => {
    if (user?.phone) {
      checkPhone(user?.phone);
      showToast({
        type: "success",
        title: t("OTP Resent"),
        message: t("We have resent the OTP code to your phone"),
      });
    } else {
      showToast({
        type: "error",
        title: t("Error"),
        message: t("Please re-enter your valid phone number"),
      });
      handleChangePanel(4);
    }
  };
  return (
    <div className="flex flex-col justify-between item-center self-center">
      <p>
        {t("We have sent OTP code to")}
        <span className="font-bold">{user?.phone}</span>
      </p>
      <p className="font-light text-sm">{t("Please check your inbox")}</p>
      <InputOtp
        value={phoneOtp}
        onChange={(e) => setPhoneOtp(String(e.value))}
        color="red"
        autoFocus={true}
        mask
        maxLength={6}
        length={6}
        className="w-full h-20 my-2"
        onPaste={(e) =>
          setPhoneOtp(
            String(e.clipboardData.items[0].getAsString((data) => data)),
          )
        }
        placeholder="12314"
      />

      <CustomButton
        label={t("Continue")}
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72 my-1`}
        onClick={handleSubmit}
      />
      <CustomButton
        label={t("Resend OTP")}
        className={`bg-[#fff] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72 my-1`}
        onClick={handleResendPhoneOtp}
      />
    </div>
  );
}

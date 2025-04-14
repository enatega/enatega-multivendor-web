// Icons
import CustomButton from "@/lib/ui/useable-components/button";
import CustomTextField from "@/lib/ui/useable-components/input-field";
import { ILoginWithEmailProps } from "@/lib/utils/interfaces";
import EmailIcon from "@/public/assets/images/svgs/email";

// Hooks
import { useTranslations } from "next-intl";

export default function LoginWithEmail({
  handleChangePanel,
}: ILoginWithEmailProps) {
  // Hooks
  const t = useTranslations();
  return (
    <div className="flex flex-col items-start justify-between w-full h-full">
      <EmailIcon />
      <div className="flex flex-col w-full h-auto self-start left-2 my-2">
        <h3 className="text-2xl">{t("Whats your email")}?</h3>
        {/*replace whats with what's in the translation*/}
        <p>{t("Well check if you have an account")}</p>
        {/*replace well with we'll in the translation*/}
      </div>
      <div className="flex flex-col gap-y-1 my-6 w-full">
        <CustomTextField
          value=""
          showLabel={false}
          name=""
          type="text"
          placeholder={t("Email")}
        />
        <span
          className="self-end font-semibold text-sm underline cursor-pointer text-[#5AC12F]"
          onClick={() => handleChangePanel(0)}
        >
          {t("Continue with google instead")}
        </span>
      </div>
      <CustomButton
        label={t("Continue")}
        onClick={()=> handleChangePanel(3)}
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72`}
      />
    </div>
  );
}

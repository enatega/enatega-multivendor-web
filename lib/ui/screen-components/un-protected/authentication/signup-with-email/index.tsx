// Icons
import CustomButton from "@/lib/ui/useable-components/button";
import CustomTextField from "@/lib/ui/useable-components/input-field";
import CustomPasswordTextField from "@/lib/ui/useable-components/password-input-field";
import PersonIcon from "@/lib/utils/assets/svg/person";
import { ILoginWithEmailProps } from "@/lib/utils/interfaces";

// Hooks
import { useTranslations } from "next-intl";

export default function SignUpWithEmail({
  handleChangePanel,
}: ILoginWithEmailProps) {
  // Hooks
  const t = useTranslations();
  return (
    <div className="flex flex-col items-start justify-between w-full h-full">
      <PersonIcon />
      <div className="flex flex-col w-full h-auto self-start left-2 my-2">
        <h3 className="text-2xl">{t("Lets get you started")}</h3>
        {/*replace lets with let's in the translation*/}
        <p>{t("First lets create your account")}</p>
        {/*replace "First" with "First," in the translation*/}
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomTextField
          value=""
          showLabel={false}
          name=""
          type="text"
          placeholder={t("Name")}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomTextField
          value=""
          showLabel={false}
          name=""
          type="email"
          placeholder={t("Email")}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomPasswordTextField
          value=""
          showLabel={false}
          name=""
          placeholder={t("Password")}
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
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72`}
        onClick={()=>handleChangePanel(1)}
      />
    </div>
  );
}

// Components
import CustomButton from "@/lib/ui/useable-components/button";
import CustomTextField from "@/lib/ui/useable-components/input-field";

// Interfaces
import { ISaveEmailAddressProps } from "@/lib/utils/interfaces";

// Icons
import EmailIcon from "@/public/assets/images/svgs/email";

// Hooks
import { useAuth } from "@/lib/context/auth/auth.context";
import { useTranslations } from "next-intl";

export default function SaveEmailAddress({
  handleChangePanel,
}: ISaveEmailAddressProps) {
  // Hooks
  const t = useTranslations();
  const { setUser, user } = useAuth();

  // Handlers
  const handleChange = (email: string) => {
    setUser((prev) => ({
      ...prev,
      email,
    }));
  };
  return (
    <div className="flex flex-col items-start justify-between w-full h-full">
      <EmailIcon />
      <div className="flex flex-col w-full h-auto self-start left-2 my-2">
        <h3 className="text-2xl">
          {t("Please enter your email address")}?
        </h3>
        <span className="font-bold">example@email.com</span>
      </div>
      <div className="flex flex-col gap-y-1 my-6 w-full">
        <CustomTextField
          value={user?.email}
          showLabel={false}
          name=""
          type="text"
          placeholder={t("Email")}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <CustomButton
        label={t("Continue")}
        onClick={() => handleChangePanel(3)}
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72`}
      />
    </div>
  );
}

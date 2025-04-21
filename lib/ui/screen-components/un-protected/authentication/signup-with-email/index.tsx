// Icons
import { useAuth } from "@/lib/context/auth/auth.context";
import useToast from "@/lib/hooks/useToast";
import CustomButton from "@/lib/ui/useable-components/button";
import CustomTextField from "@/lib/ui/useable-components/input-field";
import CustomPasswordTextField from "@/lib/ui/useable-components/password-input-field";
import CustomPhoneTextField from "@/lib/ui/useable-components/phone-input-field";
import PersonIcon from "@/lib/utils/assets/svg/person";
import { ILoginWithEmailProps } from "@/lib/utils/interfaces";

// Hooks
import { useTranslations } from "next-intl";

export default function SignUpWithEmail({
  handleChangePanel,
  formData,
  handleFormChange,
}: ILoginWithEmailProps) {
  // Hooks
  const t = useTranslations();
  const {
    handleCreateUser,
    setUser,
    sendOtpToEmailAddress,
    sendOtpToPhoneNumber,
  } = useAuth();
  const { showToast } = useToast();

  // Handlers
  const handleSubmit = async () => {
    try {
      if (Object.values(formData).some((val) => !val)) {
        return showToast({
          type: "error",
          title: t("Create User"),
          message: t("All fields are required to be filled"),
        });
      } else {
        const userData = await handleCreateUser({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          password: formData.password,
        });

        if (!userData.emailIsVerified && userData.email) {
          setUser((prev) => ({
            ...prev,
            email: userData.email,
          }));
          sendOtpToEmailAddress(userData.email);
          handleChangePanel(3);
        } else if (!userData.phoneIsVerified && userData.phone) {
          setUser((prev) => ({
            ...prev,
            phone: userData.phone,
          }));
          sendOtpToPhoneNumber(userData.phone);
          handleChangePanel(6);
        }
      }
    } catch (error) {
      console.error("An error occured while registering a new user", error);
    }
  };
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
          value={formData.name}
          showLabel={false}
          name="name"
          type="text"
          placeholder={t("Name")}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomTextField
          value={formData.email}
          showLabel={false}
          name="email"
          type="email"
          placeholder={t("Email")}
          onChange={(e) => handleFormChange("email", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomPhoneTextField
          value={formData.phone}
          showLabel={false}
          mask={"999 999 999"}
          name="phone"
          type="text"
          placeholder={t("Phone")}
          onChange={(val) => handleFormChange("phone", val)}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomPasswordTextField
          value={formData.password}
          showLabel={false}
          name="password"
          placeholder={t("Password")}
          onChange={(e) => handleFormChange("password", e.target.value)}
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
        onClick={handleSubmit}
      />
    </div>
  );
}

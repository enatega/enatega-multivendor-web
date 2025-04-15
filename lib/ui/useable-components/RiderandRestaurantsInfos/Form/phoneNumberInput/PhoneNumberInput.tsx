import { useField } from "formik";
import PhoneInput from "react-phone-input-2";

const PhoneNumberInput = () => {
  const [field, , helpers] = useField("phoneNumber");
  

  return (
    <div>
      <PhoneInput
        country={"au"}
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        inputProps={{
          name: "phoneNumber",
          id: "phoneNumber",
          className: "w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg",
        }}
        buttonStyle={{
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
        containerStyle={{
          width: "100%",
        }}
      />
    </div>
  );
};


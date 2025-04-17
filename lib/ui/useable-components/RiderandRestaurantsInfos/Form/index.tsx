"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

import { sendEmail } from "@/lib/utils/methods";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";

import "react-phone-input-2/lib/style.css";
import { VendorFormValues } from "@/lib/utils/interfaces/Rider-restaurant.interface";
import PhoneNumberInput from "./phoneNumberInput/PhoneNumberInput";

import emailValidationSchema from "./validationSchema";

const initialValues: VendorFormValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const EmailForm: React.FC = () => {
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    if (alert.open) {
      toastRef.current?.show({
        severity: alert.severity as any, // can be "success", "info", "warn", "error"
        summary:
          alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1),
        detail: alert.message,
        life: 4000,
      });
      setAlert({ ...alert, open: false });
    }
  }, [alert]);

  const handleSubmit = async (formData: VendorFormValues) => {
    
    const templateParams = {
      ...formData,
      role: "Vendor Registration",
      isRider: false,
    };

    console.log(formData);

    // try {
    //   const response = await sendEmail("template_eogfh2k", templateParams);
    //   console.log("Email sent successfully!", response.status, response.text);
    //   setAlert({ open: true, severity: "success", message: "formSubmission" });

    //   // Optionally reset form manually
    //   router.push("/email-confirmation");
    // } catch (error) {
    //   console.error("Failed to send email:", error);
    //   setAlert({ open: true, severity: "error", message: "notFormSubmission" });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-m my-6">
      <h2 className="text-2xl font-semibold mb-6">Become a Vendor</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={emailValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="grid gap-5">
            {/* First Name */}
            <div className="gap-4 flex w-[100%]  justify-between">
              <div className="w-[50%]">
                <Field name="firstName">
                  {({ field }: any) => (
                    <InputText
                      placeholder="First Name"
                      {...field}
                      className="w-full border-2 border-gray-100 p-2  focus:outline-none focus:ring-0 active:outline-none rounded-lg"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="firstName"
                  component="small"
                  className="p-error"
                />
              </div>

              {/* Last Name */}
              <div className="w-[50%]">
                <Field name="lastName">
                  {({ field }: any) => (
                    <InputText
                      {...field}
                      placeholder="Last Name"
                      className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="lastName"
                  component="small"
                  className="p-error"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <Field name="email">
                {({ field }: any) => (
                  <InputText
                    {...field}
                    placeholder="Email Address"
                    className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="small"
                className="p-error"
              />
            </div>

            {/* Phone Number */}
            <div>
              <PhoneNumberInput />
              <ErrorMessage
                name="phoneNumber"
                component="small"
                className="p-error"
              />
            </div>

            {/* Password */}
            <div>
              <Field name="password">
                {({ field }: any) => (
                  <Password
                    {...field}
                    placeholder="Password"
                    toggleMask
                    className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg"
                    feedback={false}
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="small"
                className="p-error"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label>Confirm Password</label>
              <Field name="confirmPassword">
                {({ field }: any) => (
                  <Password
                    placeholder="Confrim Password"
                    {...field}
                    toggleMask
                    className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg"
                    feedback={false}
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirmPassword"
                component="small"
                className="p-error"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 h-[40px]">
              <Checkbox
                inputId="termsAccepted"
                checked={values.termsAccepted}
                onChange={(e) => setFieldValue("termsAccepted", e.checked)}
                className={` border-gray-400 checked:bg-green-200`}
              />
              <label htmlFor="termsAccepted">
                I accept the Terms and Conditions
              </label>
            </div>
            <ErrorMessage
              name="termsAccepted"
              component="small"
              className="p-error"
            />

            {/* Submit */}
            <div className="flex justify-center items-center">
            <Button
              type="submit"
              label="Send"
              loading={isSubmitting}
              className="mt-4 bg-[#94e469] w-[200px] p-2 rounded-md text-white text-[20px] hover:bg-[#81db51] transition-all"
            />
            </div>
          </Form>
        )}
      </Formik>
      <Toast ref={toastRef} position="top-right" />
    </div>
  );
};

export default EmailForm;


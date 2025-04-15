// // components/BecomeAVendorForm.tsx
// "use client";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Checkbox } from "primereact/checkbox";
// import { Button } from "primereact/button";
// import { useRouter } from "next/navigation";

// import { sendEmail } from "@/lib/utils/methods";
// import { useState,useRef,useEffect } from "react";
// import { Toast } from "primereact/toast";

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// // import PhoneNumberInput from "./phoneNumberInput/PhoneNumberInput";

// import { useField } from "formik";
// // import PhoneInput from "react-phone-input-2";
// type VendorFormValues = {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   termsAccepted: boolean;
// };

// const initialValues: VendorFormValues = {
//   firstName: "",
//   lastName: "",
//   phoneNumber: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   termsAccepted: false,
// };

// const validationSchema = Yup.object({
//   firstName: Yup.string().required("First name is required"),
//   lastName: Yup.string().required("Last name is required"),
//   phoneNumber: Yup.string()
//     .matches(/^\+?[0-9]{7,15}$/, "Enter a valid phone number")
//     .required("Phone number is required"),
//   email: Yup.string().email("Enter a valid email").required("Email is required"),
//   password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm your password"),
//   termsAccepted: Yup.boolean().oneOf([true], "Accept terms to continue"),
// });

// const EmailForm: React.FC = () => {
//   const router = useRouter();
//   const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const toastRef = useRef<Toast>(null);

// useEffect(() => {
//   if (alert.open) {
//     toastRef.current?.show({
//       severity: alert.severity as any, // can be "success", "info", "warn", "error"
//       summary: alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1),
//       detail: alert.message,
//       life: 4000,
//     });
//     setAlert({ ...alert, open: false });
//   }
// }, [alert]);



//   const handleSubmit = async (formData: VendorFormValues) => {
// console.log("runs")

//     const { password, confirmPassword, email, phoneNumber, termsAccepted } = formData;

//     if (!termsAccepted) {
//       setAlert({ open: true, severity: "error", message: "termsRequired" });
//       return;
//     }

//     if (!phoneNumber) {
//       setAlert({ open: true, severity: "error", message: "mobileErr1" });
//       return;
//     }

//     const phoneRegex = /^\+?[0-9]{7,15}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       setAlert({ open: true, severity: "error", message: "enterValidPhone" });
//       return;
//     }

//     if (password !== confirmPassword) {
//       setAlert({ open: true, severity: "error", message: "passNotMatch" });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setAlert({ open: true, severity: "error", message: `${t("enterValidEmail")}` });
//       return;
//     }

//     setLoading(true);

//     const templateParams = {
//       ...formData,
//       role: "Vendor Registration",
//       isRider: false,
//     };

//     console.log(formData)

//     try {
//       const response = await sendEmail("template_eogfh2k", templateParams);
//       console.log("Email sent successfully!", response.status, response.text);
//       setAlert({ open: true, severity: "success", message: "formSubmission" });

//       // Optionally reset form manually
//       router.push("/email-confirmation");
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       setAlert({ open: true, severity: "error", message: "notFormSubmission" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-m my-6">
//       <h2 className="text-2xl font-semibold mb-6">Become a Vendor</h2>

//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//         {({ values, setFieldValue, isSubmitting }) => (
//           <Form className="grid gap-5">
//             {/* First Name */}
//             <div className="gap-4 flex w-[100%]  justify-between">
//             <div className="w-[50%]">
//               <Field name="firstName" >
//                 {({ field }: any) => (
//                   <InputText
//                     placeholder="First Name"
//                     {...field}
//                     className="w-full border-2 border-gray-100 p-2  focus:outline-none focus:ring-0 active:outline-none rounded-lg"
//                   />
//                 )}
//               </Field>
//               <ErrorMessage name="firstName" component="small" className="p-error" />
//             </div>

//             {/* Last Name */}
//             <div className="w-[50%]">
//               <Field name="lastName">
//                 {({ field }: any) => <InputText {...field} placeholder="Last Name" className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg" />}
//               </Field>
//               <ErrorMessage name="lastName" component="small" className="p-error" />
//             </div>

//             </div>
            
//             {/* Email */}
//             <div>
//               <label>Email</label>
//               <Field name="email">
//                 {({ field }: any) => <InputText {...field} placeholder="Email Address" className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg" />}
//               </Field>
//               <ErrorMessage name="email" component="small" className="p-error" />
//             </div>
        
//             {/* Phone Number */}
//             <div>
//               {/* <Field name="email">
//                 {({field}:any) =>
//               <PhoneInput
//               {...field}
//                 country={"au"}
//                 inputProps={{
//                   name: "phoneNumber",
//                 }}
//               />
//         }
//               </Field> */}
//               <PhoneNumberInput />
//               <ErrorMessage name="phoneNumber" component="small" className="p-error" />
//             </div>

            
//             {/* Password */}
//             <div>
        
//               <Field name="password">
//                 {({ field }: any) => <Password {...field}
//                 placeholder="Password"
//                 toggleMask className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg" feedback={false} />}
//               </Field>
//               <ErrorMessage name="password" component="small" className="p-error" />
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label>Confirm Password</label>
//               <Field name="confirmPassword">
//                 {({ field }: any) => <Password 
//                 placeholder="Confrim Password"
//                 {...field} toggleMask className="w-full border-2 border-gray-100 p-2 focus:outline-none focus:ring-0 active:outline-none rounded-lg" feedback={false} />}
//               </Field>
//               <ErrorMessage name="confirmPassword" component="small" className="p-error" />
//             </div>

//             {/* Terms & Conditions */}
//             <div className="flex items-center gap-2 h-[40px]">
//               <Checkbox
//                 inputId="termsAccepted"
//                 checked={values.termsAccepted}
//                 onChange={(e) => setFieldValue("termsAccepted", e.checked)}
//                 className={` border-gray-400 checked:bg-green-200`}
                
//               />
//               <label htmlFor="termsAccepted">I accept the Terms and Conditions</label>
//             </div>
//             <ErrorMessage name="termsAccepted" component="small" className="p-error" />

//             {/* Submit */}
//             <Button type="submit" label="Submit" loading={isSubmitting} className="mt-4" />
//           </Form>
//         )}
//       </Formik>
//       <Toast ref={toastRef} position="top-right" />
//     </div>
//   );
// };

// export default EmailForm;


// const PhoneNumberInput = () => {
//   const [field, , helpers] = useField("phoneNumber");
  

//   return (
//     <div>
//       <PhoneInput
//         country={"au"}
//         value={field.value}
//         onChange={(value) => helpers.setValue(value)}
//         inputProps={{
//           name: "phoneNumber",
//           id: "phoneNumber",
//           className: "w-full border-2 border-gray-100 py-2 pl-[40px] focus:outline-none focus:ring-0 active:outline-none rounded-lg",
//         }}
//         buttonStyle={{
//           background: "none", 
//           border: "none", 
//           borderRadius: "100px", 
//           width: "40px",
//           height: "85%", 
//           padding: 0, 
//           margin: 3, 
        
//         }}
//         containerStyle={{
//           width: "100%",
//         }}
//       />
//     </div>
//   );
// };
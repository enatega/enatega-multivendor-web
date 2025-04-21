"use client"

import type React from "react"

import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { Checkbox } from "primereact/checkbox"
import { Card } from "primereact/card"
import { Toast } from "primereact/toast"
import { useRef } from "react"
import { UPDATE_USER } from "@/lib/api/graphql"


interface UserFormData {
  firstName: string
  lastName: string
  phone: string
  phoneIsVerified: boolean
  emailIsVerified: boolean
}

export default function UserProfileForm() {
  const toast = useRef<Toast>(null)
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "John",
    lastName: "Smith",
    phone: "",
    phoneIsVerified: false,
    emailIsVerified: false,
  })

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "User profile updated successfully",
        life: 3000,
      })
    },
    onError: (error) => {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      })
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: { checked: boolean; name: string }) => {
    const { name, checked } = e
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    updateUser({
      variables: {
        name: fullName,
        phone: formData.phone || null,
        phoneIsVerified: formData.phoneIsVerified,
        emailIsVerified: formData.emailIsVerified,
      },
    })
  }

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      firstName: "John",
      lastName: "Smith",
      phone: "",
      phoneIsVerified: false,
      emailIsVerified: false,
    })
  }

  return (
    <div className="w-full max-w-3xl">
      <Toast ref={toast} />

      <Card className="shadow-lg">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img src="/placeholder.svg?height=300&width=300" alt="Profile illustration" className="w-64 h-64" />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Name</h2>
              <div className="p-float-label mb-4">
                <InputText
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
                <label htmlFor="firstName">First name</label>
              </div>

              <div className="p-float-label">
                <InputText
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
                <label htmlFor="lastName">Last name</label>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <div className="p-float-label mb-4">
                <InputText
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
                <label htmlFor="phone">Phone</label>
              </div>

              <div className="flex items-center mb-2">
                <Checkbox
                  inputId="phoneIsVerified"
                  name="phoneIsVerified"
                  checked={formData.phoneIsVerified}
                  onChange={(e) => handleCheckboxChange({ name: "phoneIsVerified", checked: e.checked || false })}
                />
                <label htmlFor="phoneIsVerified" className="ml-2">
                  Phone verified
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  inputId="emailIsVerified"
                  name="emailIsVerified"
                  checked={formData.emailIsVerified}
                  onChange={(e) => handleCheckboxChange({ name: "emailIsVerified", checked: e.checked || false })}
                />
                <label htmlFor="emailIsVerified" className="ml-2">
                  Email verified
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button
            label="Cancel"
            icon={<FontAwesomeIcon icon={faTimes} className="mr-2" />}
            className="p-button-outlined p-button-secondary flex-1 sm:flex-none"
            onClick={handleCancel}
          />
          <Button
            label="Save"
            icon={<FontAwesomeIcon icon={faSave} className="mr-2" />}
            className="p-button-success flex-1 sm:flex-none"
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
      </Card>
    </div>
  )
}

"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/emailValidator";

interface Props {
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  onCustomerInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function EstimateCustomerInformation({
  customerInfo,
  onCustomerInfoChange,
  isLoading,
}: Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCustomerInfoChange(e);
    if (emailError) setEmailError("");
  };

  const handleEmailBlur = () => {
    setFocusedField(null);
    if (customerInfo.email.trim() && !isValidEmail(customerInfo.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 relative">
      <div className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="text-sm font-normal text-gray-800"
          >
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Ex: John"
            value={customerInfo.firstName}
            onChange={onCustomerInfoChange}
            onFocus={() => setFocusedField("firstName")}
            onBlur={() => setFocusedField(null)}
            className={`w-full h-12 px-3 rounded-md focus:ring-0 focus:outline-none transition-colors duration-200 ${focusedField === "firstName" ? "border-blue-500 border-2" : "border border-gray-200"}`}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="text-sm font-normal text-gray-800"
          >
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Ex: Smith"
            value={customerInfo.lastName}
            onChange={onCustomerInfoChange}
            onFocus={() => setFocusedField("lastName")}
            onBlur={() => setFocusedField(null)}
            className={`w-full h-12 px-3 rounded-md focus:ring-0 focus:outline-none transition-colors duration-200 ${focusedField === "lastName" ? "border-blue-500 border-2" : "border border-gray-200"}`}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-normal text-gray-800">
            Phone number
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              +1
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="123-456-7890"
              readOnly
              value={customerInfo.phone}
              onChange={onCustomerInfoChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              className={`w-full h-12 pl-10 rounded-md focus:ring-0 focus:outline-none transition-colors duration-200 ${focusedField === "phone" ? "border-blue-500 border-2" : "border border-gray-200"}`}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-normal text-gray-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ex: example@gmail.com"
            value={customerInfo.email}
            onChange={handleEmailChange}
            onFocus={() => setFocusedField("email")}
            onBlur={handleEmailBlur}
            className={`w-full h-12 px-3 rounded-md focus:ring-0 focus:outline-none transition-colors duration-200 ${emailError ? "border-red-500 border-2" : focusedField === "email" ? "border-blue-500 border-2" : "border border-gray-200"}`}
            required
            disabled={isLoading}
          />
          {emailError && (
            <p className="text-sm text-red-600 mt-1">{emailError}</p>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
          <span className="text-sm text-gray-600">Creating customer...</span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { formatPhoneNumber, isValidUSPhoneNumber } from "@/lib/phoneFormatter";

interface Props {
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
  agreedToTerms: boolean;
  onAgreedToTermsChange: (agreed: boolean) => void;
}

export default function EstimateCustomerContactCheck({
  phoneNumber,
  onPhoneNumberChange,
  agreedToTerms,
  onAgreedToTermsChange,
}: Props) {
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneNumberChange(formatted);
    if (phoneError) setPhoneError("");
  };

  const handlePhoneBlur = () => {
    if (phoneNumber.trim() && !isValidUSPhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid US phone number");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col items-center">
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4">
        <Phone className="h-7 w-7 text-gray-800" strokeWidth={1.5} />
      </div>
      <h1 className="text-2xl font-medium text-gray-900 mb-2">
        Add phone number
      </h1>
      <p className="text-center text-gray-600 mb-6 max-w-xs">
        We&apos;ll use this to verify it&apos;s you and send reminders about
        your appointment.
      </p>
      <div className="w-full mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            +1
          </span>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            className={`w-full h-12 pl-10 border rounded-md focus:ring-1 focus:outline-none ${
              phoneError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-green-500 focus:ring-green-500"
            }`}
            maxLength={14}
          />
        </div>
        {phoneError && (
          <p className="text-sm text-red-600 mt-1">{phoneError}</p>
        )}
      </div>
      <div className="w-full flex items-start space-x-2">
        <input
          id="estimate-terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => onAgreedToTermsChange(e.target.checked)}
          className="mt-1 h-4 w-4 border-gray-300 rounded accent-green-500"
        />
        <label
          htmlFor="estimate-terms"
          className="text-sm text-gray-600 font-light"
        >
          I agree to receive SMS & email marketing messages. Msg & data rates
          may apply for SMS. Message frequency may vary. Reply STOP to opt-out.
          Text HELP for help.
        </label>
      </div>
    </div>
  );
}

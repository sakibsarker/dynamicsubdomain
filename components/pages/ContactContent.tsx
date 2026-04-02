"use client";

import Link from "next/link";
import type { WebsiteResponse, BusinessHour } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/Icons";

function formatBusinessHours(businessHours: BusinessHour[]) {
  return businessHours.map((day) => {
    const dayName = day.day.charAt(0) + day.day.slice(1).toLowerCase();
    if (!day.is_open) return dayName + ": Closed";
    const timeSlots = day.time_slots
      .map((slot) => slot.open + " - " + slot.close)
      .join(", ");
    return dayName + ": " + timeSlots;
  });
}

interface Props {
  data: WebsiteResponse;
}

export default function ContactContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const themeName = data?.theme_name ?? "template_one";

  const contactInfo = {
    address: data?.contact_address || "Address not available",
    phone: data?.contact_phone || "Phone not available",
    email: data?.contact_email || "Email not available",
    hours: data?.business_hours
      ? formatBusinessHours(data.business_hours)
      : ["Hours not available"],
  };

  return (
    <>
      {themeName === "template_one" && (
        <main className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Contact Information
              </h1>
              <div className="h-1 w-20 bg-red-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Address</h3>
                      <p className="text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Business Hours
                </h2>
                <ul className="space-y-3">
                  {contactInfo.hours.map((hour, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-700">
                        {hour.split(":")[0]}:
                      </span>
                      <span className="text-gray-600">
                        {hour.split(":").slice(1).join(":")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Template 2: Blue Theme */}
      {themeName === "template_two" && (
        <main className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Contact Information
              </h1>
              <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Address</h3>
                      <p className="text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Business Hours
                </h2>
                <ul className="space-y-3">
                  {contactInfo.hours.map((hour: string, index: number) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-700">
                        {hour.split(":")[0]}:
                      </span>
                      <span className="text-gray-600">
                        {hour.split(":").slice(1).join(":")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Template 3: Orange Gradient Theme */}
      {themeName === "template_three" && (
        <main className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Contact Information
              </h1>
              <div className="h-1 w-20 bg-[#FF6B35] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FF6B35]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FF6B35]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 hover:text-[#FF6B35] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FF6B35]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 hover:text-[#FF6B35] transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Business Hours
                </h2>
                <ul className="space-y-3">
                  {contactInfo.hours.map((hour: string, index: number) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-700">
                        {hour.split(":")[0]}:
                      </span>
                      <span className="text-gray-600">
                        {hour.split(":").slice(1).join(":")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Floating Action Buttons - Template Three Only */}
      {themeName === "template_three" && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
          <a
            onClick={() => onBookAppointment()}
            className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-[#FF6B35] to-[#F7C59F] text-white shadow-xl hover:shadow-2xl hover:brightness-110 animate-bounce"
          >
            Schedule Service
          </a>
          <a
            onClick={() => onGetEstimate()}
            className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-white text-gray-800 border-2 border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] shadow-xl"
          >
            Get An Estimate
          </a>
        </div>
      )}

      {/* Template 4: Slate Theme */}
      {themeName === "template_four" && (
        <main className="bg-white min-h-screen">
          <div className="bg-slate-900 py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4">
                Contact Us
              </h1>
              <div className="w-20 h-px bg-white mx-auto mt-6"></div>
            </div>
          </div>

          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-2">
                      Address
                    </h3>
                    <p className="text-xl text-slate-900">
                      {contactInfo.address}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-2">
                      Phone
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-xl text-slate-900 hover:text-slate-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-xl text-slate-900 hover:text-slate-600 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    {contactInfo.hours.map((hour, index) => (
                      <p key={index} className="text-slate-900">
                        {hour}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Template 5: Orange Theme */}
      {themeName === "template_five" && (
        <main className="bg-white min-h-screen">
          <div className="bg-gray-900 py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="h-1 w-12 bg-orange-600"></div>
                <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">
                  Get In Touch
                </span>
                <div className="h-1 w-12 bg-orange-600"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white">
                Contact Us
              </h1>
            </div>
          </div>

          <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div className="border-l-4 border-orange-600 pl-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                      Visit Us
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {contactInfo.address}
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                      Call Us
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                      Email Us
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">
                    Business Hours
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.hours.map((hour, index) => (
                      <p
                        key={index}
                        className="text-lg text-gray-700 font-medium"
                      >
                        {hour}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Template 6: Teal Theme */}
      {themeName === "template_six" && (
        <main className="bg-white min-h-screen">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 py-24">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
              <div className="inline-block px-4 py-1 bg-amber-500 text-gray-900 rounded-full text-sm font-semibold mb-6">
                Get In Touch
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-teal-100">
                We'd love to hear from you! Reach out to us today.
              </p>
            </div>
          </div>

          <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-teal-600">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-3">
                      📍 Visit Us
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {contactInfo.address}
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-teal-600">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-3">
                      📞 Call Us
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-2xl font-bold text-gray-900 hover:text-teal-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-teal-600">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-3">
                      ✉️ Email Us
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-2xl font-bold text-gray-900 hover:text-teal-600 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-10 text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-8">Business Hours</h3>
                  <div className="space-y-4">
                    {contactInfo.hours.map((hour, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 pb-4 border-b border-teal-500 last:border-0"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <p className="text-lg text-teal-100 font-medium">
                          {hour}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Social Media */}
                  <div className="mt-10 pt-8 border-t border-teal-500">
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">
                      Follow Us
                    </h4>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/20 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/20 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/20 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Template 7: Bold Red Theme */}
      {themeName === "template_seven" && (
        <main className="bg-neutral-950 min-h-screen">
          <div className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                Get In Touch
              </span>
              <h1 className="text-5xl md:text-6xl font-black mt-4">
                Contact Us
              </h1>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
              <p className="text-xl text-neutral-400 mt-4">
                We'd love to hear from you! Reach out to us today.
              </p>
            </div>
          </div>
          <section className="py-24 bg-neutral-900">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-amber-500">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                      📍 Visit Us
                    </h3>
                    <p className="text-2xl font-black text-white">
                      {contactInfo.address}
                    </p>
                  </div>
                  <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-amber-500">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                      📞 Call Us
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-2xl font-black text-white hover:text-amber-400 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="bg-neutral-800 p-8 rounded-lg border-l-4 border-amber-500">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                      ✉️ Email Us
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-2xl font-black text-white hover:text-amber-400 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-10 border border-neutral-700">
                  <h3 className="text-2xl font-black text-white mb-8">
                    Business Hours
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.hours.map((hour, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 pb-4 border-b border-neutral-700 last:border-0"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <p className="text-lg text-neutral-300 font-medium">
                          {hour}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-neutral-700">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
                      Follow Us
                    </h4>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-10 h-10 bg-neutral-700 hover:bg-amber-500 rounded-md flex items-center justify-center transition-all duration-300"
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-neutral-700 hover:bg-amber-500 rounded-md flex items-center justify-center transition-all duration-300"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-neutral-700 hover:bg-amber-500 rounded-md flex items-center justify-center transition-all duration-300"
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Template 8: Dark Sky Theme */}
      {themeName === "template_eight" && (
        <main className="bg-zinc-950 min-h-screen">
          <div className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-sky-500"></div>
                <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                  Get In Touch
                </span>
                <div className="w-8 h-0.5 bg-sky-500"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black">Contact Us</h1>
              <p className="text-xl text-zinc-400 mt-4">
                We'd love to hear from you! Reach out to us today.
              </p>
            </div>
          </div>
          <section className="py-24 bg-zinc-900">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-zinc-800 p-8 rounded-lg border-l-4 border-sky-500">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
                      📍 Visit Us
                    </h3>
                    <p className="text-2xl font-black text-white">
                      {contactInfo.address}
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-8 rounded-lg border-l-4 border-sky-500">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
                      📞 Call Us
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-2xl font-black text-white hover:text-sky-400 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="bg-zinc-800 p-8 rounded-lg border-l-4 border-sky-500">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
                      ✉️ Email Us
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-2xl font-black text-white hover:text-sky-400 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-10 border border-zinc-700">
                  <h3 className="text-2xl font-black text-white mb-8">
                    Business Hours
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.hours.map((hour, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 pb-4 border-b border-zinc-700 last:border-0"
                      >
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        <p className="text-lg text-zinc-300 font-medium">
                          {hour}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-zinc-700">
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 text-sky-400">
                      Follow Us
                    </h4>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-10 h-10 bg-zinc-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all duration-300"
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-zinc-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all duration-300"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-zinc-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all duration-300"
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Template 9: Fresh Emerald Theme */}
      {themeName === "template_nine" && (
        <main className="bg-slate-50 min-h-screen">
          <section className="bg-rose-950 py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <div className="inline-flex items-center gap-2 justify-center mb-6">
                <div className="w-10 h-px bg-rose-400"></div>
                <span className="text-rose-300 font-semibold text-sm uppercase tracking-wider">
                  Get In Touch
                </span>
                <div className="w-10 h-px bg-rose-400"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">Contact Us</h1>
              <p className="text-xl text-rose-200/70 mt-4">
                We'd love to hear from you! Reach out to us today.
              </p>
            </div>
          </section>
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-200">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-3">
                      📍 Visit Us
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {contactInfo.address}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-200">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-3">
                      📞 Call Us
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-2xl font-bold text-gray-900 hover:text-rose-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-gray-200">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-3">
                      ✉️ Email Us
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-2xl font-bold text-gray-900 hover:text-rose-600 transition-colors break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="bg-rose-950 rounded-3xl p-10 text-white shadow-xl">
                  <h3 className="text-2xl font-bold mb-8">Business Hours</h3>
                  <div className="space-y-4">
                    {contactInfo.hours.map((hour, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 pb-4 border-b border-rose-800 last:border-0"
                      >
                        <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                        <p className="text-lg text-rose-100 font-medium">
                          {hour}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-rose-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 text-rose-400">
                      Follow Us
                    </h4>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="w-10 h-10 bg-rose-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <FacebookIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-rose-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-rose-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <LinkedInIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

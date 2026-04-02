"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { WebsiteResponse } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { FadeInSection, SlideIn, BounceIn } from "@/components/Animations";

interface Props {
  data: WebsiteResponse;
}

export default function HomeContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const [openImage, setOpenImage] = useState<string | null>(null);
  const themeName = data?.theme_name ?? "template_one";

  return (
    <>
      {/* Template One Homepage */}
      {themeName === "template_one" && (
        <main>
          {/* Hero Section */}
          <section className="relative bg-black text-white overflow-hidden z-40 min-h-[70vh] flex items-center justify-center text-center px-6">
            <div className="absolute inset-0">
              {data.hero_image && (
                <ImageWithSkeleton
                  src={data.hero_image}
                  alt="Workshop background"
                  className="w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                {data.headline}
              </h1>
              {data.subtitle && (
                <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                  {data.subtitle}
                </p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  onClick={() => onBookAppointment()}
                  className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold transition-colors bg-red-600 text-white hover:bg-red-700"
                >
                  Book Appointment
                </a>
                <a
                  onClick={() => onGetEstimate()}
                  className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold transition-colors bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        {data.section_title_one}
                      </h2>
                      <div className="mt-2 h-1 w-20 bg-red-600 mx-auto" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_one}
                    </p>
                  </div>
                  {data.section_image_one && (
                    <div className="relative">
                      <ImageWithSkeleton
                        src={data.section_image_one}
                        alt={data.section_title_one}
                        className="w-full h-96 object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_two && (
                    <div className="relative order-2 lg:order-1">
                      <ImageWithSkeleton
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="w-full h-96 object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        {data.section_title_two}
                      </h2>
                      <div className="mt-2 h-1 w-20 bg-red-600 mx-auto" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        {data.section_title_three}
                      </h2>
                      <div className="mt-2 h-1 w-20 bg-red-600 mx-auto" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative">
                      <ImageWithSkeleton
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="w-full h-96 object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_four && (
                    <div className="relative order-2 lg:order-1">
                      <ImageWithSkeleton
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="w-full h-96 object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        {data.section_title_four}
                      </h2>
                      <div className="mt-2 h-1 w-20 bg-red-600 mx-auto" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Two Homepage */}
      {themeName === "template_two" && (
        <main>
          {/* Hero Section */}
          <section className="relative text-white flex items-center justify-center text-center px-6 py-32">
            <div className="absolute inset-0 bg-black/30 z-0">
              {data.hero_image && (
                <ImageWithSkeleton
                  src={data.hero_image}
                  alt="Mechanic working"
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-blue-700/70 z-0"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                {data.headline}
              </h1>
              {data.subtitle && (
                <p className="mt-4 text-white/90 text-lg">{data.subtitle}</p>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  onClick={() => onGetEstimate()}
                  className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700"
                >
                  Get Free Estimate
                </a>
                <a
                  onClick={() => onBookAppointment()}
                  className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors bg-white text-blue-600 border border-gray-300 hover:bg-gray-100"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {data.section_title_one}
                  </h2>
                  <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_one}
                    </p>
                  </div>
                  {data.section_image_one && (
                    <div className="relative">
                      <div className="absolute -inset-4 bg-blue-100 rounded-2xl"></div>
                      <img
                        src={data.section_image_one}
                        alt={data.section_title_one}
                        className="relative w-full h-96 object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {data.section_title_two}
                  </h2>
                  <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_two && (
                    <div className="relative order-2 lg:order-1">
                      <div className="absolute -inset-4 bg-blue-100 rounded-2xl"></div>
                      <img
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="relative w-full h-96 object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {data.section_title_three}
                  </h2>
                  <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative">
                      <div className="absolute -inset-4 bg-blue-100 rounded-2xl"></div>
                      <img
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="relative w-full h-96 object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    {data.section_title_four}
                  </h2>
                  <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_four && (
                    <div className="relative order-2 lg:order-1">
                      <div className="absolute -inset-4 bg-blue-100 rounded-2xl"></div>
                      <img
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="relative w-full h-96 object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Three Homepage */}
      {themeName === "template_three" && (
        <main>
          {/* Floating Action Buttons - Template Three Only */}
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

          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-0">
              {data.hero_image && (
                <img
                  src={data.hero_image}
                  alt="Mechanic working"
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-0"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                {data.headline}
              </h1>
              {data.subtitle && (
                <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                  {data.subtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  onClick={() => onBookAppointment()}
                  className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-[#FF6B35] to-[#F7C59F] text-white shadow-lg hover:shadow-xl hover:brightness-110"
                >
                  Schedule Service
                </a>
                <a
                  onClick={() => onGetEstimate()}
                  className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-white text-gray-800 border-2 border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                >
                  Get An Estimate
                </a>
              </div>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_one}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_one}
                    </p>
                  </div>
                  {data.section_image_one && (
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6B35]/20 to-[#F7C59F]/20 rounded-3xl"></div>
                      <img
                        src={data.section_image_one}
                        alt={data.section_title_one}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_two && (
                    <div className="relative order-2 lg:order-1">
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#F7C59F]/20 to-[#FF6B35]/20 rounded-3xl"></div>
                      <img
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_two}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_three}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6B35]/20 to-[#F7C59F]/20 rounded-3xl"></div>
                      <img
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_four && (
                    <div className="relative order-2 lg:order-1">
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#F7C59F]/20 to-[#FF6B35]/20 rounded-3xl"></div>
                      <img
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_four}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Four Homepage */}
      {themeName === "template_four" && (
        <main className="pt-20 bg-white">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-slate-50">
              {data.hero_image && (
                <div className="absolute inset-0">
                  <img
                    src={data.hero_image}
                    alt="Hero"
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900">
                  {data.headline}
                </h1>
                {data.subtitle && (
                  <p className="text-xl md:text-2xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
                    {data.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <a
                    onClick={() => onBookAppointment()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Book Appointment
                  </a>
                  <a
                    onClick={() => onGetEstimate()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <FadeInSection>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-light text-slate-900">
                        {data.section_title_one}
                      </h2>
                      <div className="w-20 h-px bg-slate-900"></div>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {data.section_description_one}
                      </p>
                    </div>
                    {data.section_image_one && (
                      <div className="relative">
                        <img
                          src={data.section_image_one}
                          alt={data.section_title_one}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FadeInSection>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6">
                <FadeInSection delay={200}>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    {data.section_image_two && (
                      <div className="relative order-2 md:order-1">
                        <img
                          src={data.section_image_two}
                          alt={data.section_title_two}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-6 order-1 md:order-2">
                      <h2 className="text-4xl md:text-5xl font-light text-slate-900">
                        {data.section_title_two}
                      </h2>
                      <div className="w-20 h-px bg-slate-900"></div>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {data.section_description_two}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <FadeInSection delay={400}>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-light text-slate-900">
                        {data.section_title_three}
                      </h2>
                      <div className="w-20 h-px bg-slate-900"></div>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {data.section_description_three}
                      </p>
                    </div>
                    {data.section_image_three && (
                      <div className="relative">
                        <img
                          src={data.section_image_three}
                          alt={data.section_title_three}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FadeInSection>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6">
                <FadeInSection delay={600}>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    {data.section_image_four && (
                      <div className="relative order-2 md:order-1">
                        <img
                          src={data.section_image_four}
                          alt={data.section_title_four}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-6 order-1 md:order-2">
                      <h2 className="text-4xl md:text-5xl font-light text-slate-900">
                        {data.section_title_four}
                      </h2>
                      <div className="w-20 h-px bg-slate-900"></div>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {data.section_description_four}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Five Homepage */}
      {themeName === "template_five" && (
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative bg-gray-900 text-white min-h-[85vh] flex items-center">
            <div className="absolute inset-0">
              {data.hero_image && (
                <>
                  <img
                    src={data.hero_image}
                    alt="Hero"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
                </>
              )}
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
              <div className="max-w-3xl">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-16 bg-orange-600"></div>
                  <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">
                    Professional Service
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  {data.headline}
                </h1>
                {data.subtitle && (
                  <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                    {data.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    onClick={() => onBookAppointment()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl"
                  >
                    Make an Appointment
                  </a>
                  <a
                    onClick={() => onGetEstimate()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-lg hover:shadow-xl"
                  >
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <SlideIn>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                        {data.section_title_one}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {data.section_description_one}
                      </p>
                    </div>
                    {data.section_image_one && (
                      <div className="relative">
                        <div className="absolute -inset-2 bg-orange-600/20"></div>
                        <img
                          src={data.section_image_one}
                          alt={data.section_title_one}
                          className="relative w-full h-96 object-cover shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                </SlideIn>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <SlideIn>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {data.section_image_two && (
                      <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-2 bg-orange-600/20"></div>
                        <img
                          src={data.section_image_two}
                          alt={data.section_title_two}
                          className="relative w-full h-96 object-cover shadow-2xl"
                        />
                      </div>
                    )}
                    <div className="order-1 lg:order-2">
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                        {data.section_title_two}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {data.section_description_two}
                      </p>
                    </div>
                  </div>
                </SlideIn>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <SlideIn>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                        {data.section_title_three}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {data.section_description_three}
                      </p>
                    </div>
                    {data.section_image_three && (
                      <div className="relative">
                        <div className="absolute -inset-2 bg-orange-600/20"></div>
                        <img
                          src={data.section_image_three}
                          alt={data.section_title_three}
                          className="relative w-full h-96 object-cover shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                </SlideIn>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6">
                <SlideIn>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {data.section_image_four && (
                      <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-2 bg-orange-600/20"></div>
                        <img
                          src={data.section_image_four}
                          alt={data.section_title_four}
                          className="relative w-full h-96 object-cover shadow-2xl"
                        />
                      </div>
                    )}
                    <div className="order-1 lg:order-2">
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                        {data.section_title_four}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {data.section_description_four}
                      </p>
                    </div>
                  </div>
                </SlideIn>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Six Homepage */}
      {themeName === "template_six" && (
        <main className="pt-20 bg-gradient-to-b from-amber-50 to-white">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              {data.hero_image && (
                <>
                  <img
                    src={data.hero_image}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-teal-900/95"></div>
                </>
              )}
              {!data.hero_image && (
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800"></div>
              )}
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center text-white">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 inline-block px-6 py-2 bg-amber-500 text-gray-900 rounded-full font-semibold text-sm">
                  Your Neighborhood Experts
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {data.headline}
                </h1>
                {data.subtitle && (
                  <p className="text-xl md:text-2xl text-teal-100 mb-10 leading-relaxed">
                    {data.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    onClick={() => onBookAppointment()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Get Started
                  </a>
                  <a
                    onClick={() => onGetEstimate()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-amber-500 text-gray-900 hover:bg-amber-600"
                  >
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 1440 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                  fill="#fffbeb"
                />
              </svg>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-16 md:py-24 bg-amber-50">
              <div className="max-w-7xl mx-auto px-6">
                <BounceIn>
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="inline-block px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">
                        About Us
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {data.section_title_one}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {data.section_description_one}
                      </p>
                    </div>
                    {data.section_image_one && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-teal-200 to-amber-200 rounded-3xl"></div>
                        <img
                          src={data.section_image_one}
                          alt={data.section_title_one}
                          className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                </BounceIn>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_two && (
                    <div className="relative order-2 lg:order-1">
                      <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 to-teal-200 rounded-3xl"></div>
                      <img
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                      Our Promise
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_two}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-16 md:py-24 bg-amber-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-block px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">
                      Why Choose Us
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_three}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-teal-200 to-amber-200 rounded-3xl"></div>
                      <img
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {data.section_image_four && (
                    <div className="relative order-2 lg:order-1">
                      <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 to-teal-200 rounded-3xl"></div>
                      <img
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                      />
                    </div>
                  )}
                  <div className="order-1 lg:order-2">
                    <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                      Community First
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {data.section_title_four}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Seven Homepage */}
      {themeName === "template_seven" && (
        <main className="pt-20 bg-neutral-950">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              {data.hero_image && (
                <img
                  src={data.hero_image}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40"></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
              <div className="max-w-2xl space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-amber-300 font-bold uppercase tracking-widest text-xs">
                    Professional Auto Service
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                  {data.headline}
                </h1>
                {data.subtitle && (
                  <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                    {data.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    onClick={() => onBookAppointment()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-base font-bold tracking-wide rounded-md bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25"
                  >
                    Book Now
                  </a>
                  <a
                    onClick={() => onGetEstimate()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-base font-bold tracking-wide rounded-md border-2 border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  >
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section One */}
          {data.section_title_one && (
            <section className="py-16 md:py-28 bg-neutral-900 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-6">
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                      Who We Are
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      {data.section_title_one}
                    </h2>
                    <div className="w-20 h-1 bg-amber-500"></div>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {data.section_description_one}
                    </p>
                  </div>
                  {data.section_image_one && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity blur"></div>
                      <img
                        src={data.section_image_one}
                        alt={data.section_title_one}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Two */}
          {data.section_title_two && (
            <section className="py-16 md:py-28 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  {data.section_image_two && (
                    <div className="relative group order-2 lg:order-1">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity blur"></div>
                      <img
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="space-y-6 order-1 lg:order-2">
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                      Our Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      {data.section_title_two}
                    </h2>
                    <div className="w-20 h-1 bg-amber-500"></div>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section Three */}
          {data.section_title_three && (
            <section className="py-16 md:py-28 bg-neutral-900 relative">
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-6">
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                      Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      {data.section_title_three}
                    </h2>
                    <div className="w-20 h-1 bg-amber-500"></div>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity blur"></div>
                      <img
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Section Four */}
          {data.section_title_four && (
            <section className="py-16 md:py-28 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  {data.section_image_four && (
                    <div className="relative group order-2 lg:order-1">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity blur"></div>
                      <img
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="space-y-6 order-1 lg:order-2">
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                      Our Guarantee
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      {data.section_title_four}
                    </h2>
                    <div className="w-20 h-1 bg-amber-500"></div>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Eight Homepage */}
      {themeName === "template_eight" && (
        <main className="pt-20 bg-zinc-950">
          <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              {data.hero_image && (
                <img
                  src={data.hero_image}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
              <div className="max-w-2xl space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-sky-500"></div>
                  <span className="text-sky-400 font-semibold uppercase tracking-widest text-sm">
                    Auto Repair & Service
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">
                  {data.headline}
                </h1>
                {data.subtitle && (
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    {data.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    onClick={() => onBookAppointment()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider rounded-lg bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30"
                  >
                    Book Now
                  </a>
                  <a
                    onClick={() => onGetEstimate()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider rounded-lg border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                  >
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
          </section>
          {data.section_title_one && (
            <section className="py-16 md:py-24 bg-zinc-900">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-sky-500"></div>
                      <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                        About Us
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                      {data.section_title_one}
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      {data.section_description_one}
                    </p>
                  </div>
                  {data.section_image_one && (
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-sky-500/20 rounded-lg blur-xl group-hover:bg-sky-500/30 transition-colors duration-300"></div>
                      <img
                        src={data.section_image_one}
                        alt={data.section_title_one}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {data.section_title_two && (
            <section className="py-16 md:py-24 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {data.section_image_two && (
                    <div className="relative group order-2 lg:order-1">
                      <div className="absolute -inset-1 bg-sky-500/20 rounded-lg blur-xl group-hover:bg-sky-500/30 transition-colors"></div>
                      <img
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="space-y-6 order-1 lg:order-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-sky-500"></div>
                      <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                        Our Expertise
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                      {data.section_title_two}
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {data.section_title_three && (
            <section className="py-16 md:py-24 bg-zinc-900">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-sky-500"></div>
                      <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                        Why Choose Us
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                      {data.section_title_three}
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-sky-500/20 rounded-lg blur-xl group-hover:bg-sky-500/30 transition-colors"></div>
                      <img
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {data.section_title_four && (
            <section className="py-16 md:py-24 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {data.section_image_four && (
                    <div className="relative group order-2 lg:order-1">
                      <div className="absolute -inset-1 bg-sky-500/20 rounded-lg blur-xl group-hover:bg-sky-500/30 transition-colors"></div>
                      <img
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="relative w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="space-y-6 order-1 lg:order-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-sky-500"></div>
                      <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                        Our Promise
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                      {data.section_title_four}
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Template Nine Homepage */}
      {themeName === "template_nine" && (
        <main className="pt-20 bg-slate-50">
          <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-rose-950">
            <div className="absolute inset-0">
              {data.hero_image && (
                <img
                  src={data.hero_image}
                  alt="Hero"
                  className="w-full h-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-rose-950/60 via-rose-950/40 to-rose-950"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/20 border border-rose-500/30 rounded-full mb-8">
                  <span className="text-rose-300 font-medium text-sm tracking-wide">
                    Trusted Auto Service
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                  {data.headline}
                </h1>
                {data.subtitle && (
                  <p className="text-xl text-rose-100/70 leading-relaxed mt-8 max-w-2xl">
                    {data.subtitle}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <a
                    onClick={() => onBookAppointment()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/25"
                  >
                    Book Now
                  </a>
                  <a
                    onClick={() => onGetEstimate()}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full border-2 border-white/40 text-white hover:bg-white hover:text-rose-900"
                  >
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
          </section>
          {data.section_title_one && (
            <section className="py-16 md:py-28 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-px bg-rose-600"></div>
                      <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">
                        About Us
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      {data.section_title_one}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {data.section_description_one}
                    </p>
                  </div>
                  {data.section_image_one && (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={data.section_image_one}
                        alt={data.section_title_one}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"></div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {data.section_title_two && (
            <section className="py-16 md:py-28 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {data.section_image_two && (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
                      <img
                        src={data.section_image_two}
                        alt={data.section_title_two}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"></div>
                    </div>
                  )}
                  <div className="space-y-6 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-px bg-rose-600"></div>
                      <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">
                        Our Expertise
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      {data.section_title_two}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {data.section_description_two}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {data.section_title_three && (
            <section className="py-16 md:py-28 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-px bg-rose-600"></div>
                      <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">
                        Our Approach
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      {data.section_title_three}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {data.section_description_three}
                    </p>
                  </div>
                  {data.section_image_three && (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={data.section_image_three}
                        alt={data.section_title_three}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"></div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          {data.section_title_four && (
            <section className="py-16 md:py-28 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {data.section_image_four && (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
                      <img
                        src={data.section_image_four}
                        alt={data.section_title_four}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"></div>
                    </div>
                  )}
                  <div className="space-y-6 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-px bg-rose-600"></div>
                      <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">
                        Quality Promise
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                      {data.section_title_four}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {data.section_description_four}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* Services Section */}
      {themeName === "template_one" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section id="services" className="py-20 bg-gray-800 text-white">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                    Our Services
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                    >
                      {service.image_url && (
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-gray-300">{service.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Bottom CTA Section */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to book or get an estimate?
              </h2>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                Our team is here to help with fast, reliable service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="bg-transparent text-white border border-white hover:bg-white hover:text-red-600 rounded-md px-8 py-3 font-bold transition-colors inline-flex items-center justify-center"
                >
                  GET FREE ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_two" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section className="py-20 bg-blue-600 text-white">
              <div className="max-w-7xl mx-auto px-6">
                <FadeInSection>
                  <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
                      Our Services
                    </h2>
                    <div className="w-20 h-px bg-white mx-auto"></div>
                  </div>
                </FadeInSection>

                <div className="grid md:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <FadeInSection key={index} delay={index * 100}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {service.image_url && (
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-bold text-blue-600 mb-2">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-gray-600">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-blue-700 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to book or get an estimate?
              </h2>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
                Our team is here to help with fast, reliable service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="bg-transparent text-white border border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  GET ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_three" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section className="py-20 bg-gray-100">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                    Our Services
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      {service.image_url && (
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-gray-600 mb-4">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Bottom CTA Section */}
          <section className="py-20 bg-[#1A1A2E] text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Precision Auto Care?
              </h2>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                Our team of experts is ready to provide your vehicle with the
                highest quality service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-gradient-to-r from-[#FF6B35] to-[#F7C59F] text-white shadow-lg hover:shadow-xl hover:brightness-110 px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="bg-white text-black border-2 border-white hover:bg-white hover:text-[#FF6B35] px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  GET FREE ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_four" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <FadeInSection>
                  <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
                      Our Services
                    </h2>
                    <div className="w-20 h-px bg-slate-900 mx-auto"></div>
                  </div>
                </FadeInSection>

                <div className="grid md:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <FadeInSection key={index} delay={index * 100}>
                      <div className="group cursor-pointer">
                        {service.image_url && (
                          <div className="relative overflow-hidden mb-6 h-64">
                            <img
                              src={service.image_url}
                              alt={service.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <h3 className="text-2xl font-light text-slate-900 mb-3">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-slate-600 leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-32 bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-slate-300 mb-12 font-light">
                Contact us today for exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="border-2 border-slate-900 bg-white text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  GET ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_five" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section className="py-24 bg-gray-900 text-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <div className="mb-6 flex items-center justify-center gap-4">
                    <div className="h-1 w-12 bg-orange-600"></div>
                    <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">
                      What We Do
                    </span>
                    <div className="h-1 w-12 bg-orange-600"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-4">
                    Our Services
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <SlideIn key={index} delay={index * 100}>
                      <div className="group bg-gray-800 overflow-hidden hover:bg-gray-700 transition-all duration-300">
                        {service.image_url && (
                          <div className="relative overflow-hidden h-64">
                            <img
                              src={service.image_url}
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-orange-600/20 group-hover:bg-orange-600/30 transition-colors duration-300"></div>
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-2xl font-black text-white mb-3">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-gray-300 leading-relaxed">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </SlideIn>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-24 bg-orange-600 text-white">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready for Professional Service?
              </h2>
              <p className="text-xl mb-12 text-orange-100">
                Contact us today and experience the difference quality makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  GET ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_six" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section className="py-24 bg-gradient-to-b from-teal-600 to-teal-700 text-white">
              <div className="max-w-7xl mx-auto px-6">
                <BounceIn>
                  <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-amber-500 text-gray-900 rounded-full font-semibold text-sm mb-6">
                      What We Offer
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      Our Services
                    </h2>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                      Professional automotive services tailored to your needs
                    </p>
                  </div>
                </BounceIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <BounceIn key={index} delay={index * 100}>
                      <div className="group bg-white text-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        {service.image_url && (
                          <div className="relative overflow-hidden h-56">
                            <img
                              src={service.image_url}
                              alt={service.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {service.name}
                          </h3>
                          {service.description && (
                            <p className="text-gray-600 leading-relaxed">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </BounceIn>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-24 bg-amber-50">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-12 text-white shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Let's Work Together!
                </h2>
                <p className="text-xl text-teal-100 mb-10">
                  We're here to help with friendly, reliable service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onBookAppointment();
                    }}
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                  >
                    MAKE AN APPOINTMENT
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onGetEstimate();
                    }}
                    className="bg-amber-500 text-gray-900 hover:bg-amber-600 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                  >
                    GET ESTIMATE
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_seven" && (
        <>
          {/* Services Section */}
          {data.service_logo_urls?.length > 0 && (
            <section className="py-28 bg-neutral-900">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                  <span className="text-red-500 font-bold uppercase tracking-widest text-xs">
                    What We Offer
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
                    Our Services
                  </h2>
                  <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.service_logo_urls.map((service, index) => (
                    <div
                      key={index}
                      className="group bg-neutral-800/60 border border-neutral-700/40 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      {service.image_url && (
                        <div className="relative overflow-hidden h-56">
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-neutral-400 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-32 bg-neutral-950 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent"></div>
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-neutral-400 mb-12">
                Contact us today for exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-3.5 rounded-md font-bold transition-colors inline-flex items-center justify-center shadow-lg shadow-red-600/25"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3.5 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  GET ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_eight" && (
        <>
          {data.service_logo_urls?.length > 0 && (
            <section className="py-24 bg-zinc-900">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-0.5 bg-sky-500"></div>
                    <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                      What We Offer
                    </span>
                    <div className="w-8 h-0.5 bg-sky-500"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Our Services
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.service_logo_urls.map((service, index) => (
                    <div
                      key={index}
                      className="group bg-zinc-800/50 border border-zinc-700/50 rounded-lg overflow-hidden hover:border-sky-500/50 transition-all duration-300"
                    >
                      {service.image_url && (
                        <div className="relative overflow-hidden h-56">
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-zinc-400 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          <section className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-zinc-400 mb-12">
                Contact us today for exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-sky-500 text-white hover:bg-sky-600 px-8 py-3.5 rounded-lg font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center shadow-lg shadow-sky-500/30"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-8 py-3.5 rounded-lg font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center"
                >
                  GET ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {themeName === "template_nine" && (
        <>
          {data.service_logo_urls?.length > 0 && (
            <section className="py-28 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 justify-center mb-4">
                    <div className="w-10 h-px bg-rose-600"></div>
                    <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">
                      What We Offer
                    </span>
                    <div className="w-10 h-px bg-rose-600"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Our Services
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {data.service_logo_urls.map((service, index) => (
                    <div
                      key={index}
                      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {service.image_url && (
                        <div className="relative overflow-hidden h-56">
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 border-t-2 border-rose-600">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          <section className="py-32 bg-rose-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-rose-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-rose-200/70 mb-12">
                Contact us today for exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-white text-rose-900 hover:bg-rose-50 px-8 py-3.5 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
                >
                  MAKE AN APPOINTMENT
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="border-2 border-rose-400/50 text-rose-200 hover:bg-rose-400 hover:text-rose-950 px-8 py-3.5 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
                >
                  GET ESTIMATE
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Image Popup Modal */}
      {openImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenImage(null)}
        >
          <div className="relative max-w-4xl w-full mx-auto">
            <button
              className="absolute -top-12 right-0 bg-white rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                setOpenImage(null);
              }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>
            <div className="flex items-center justify-center h-[80vh]">
              <img
                src={openImage || ""}
                alt="Enlarged gallery image"
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

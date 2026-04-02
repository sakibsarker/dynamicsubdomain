"use client";

import Link from "next/link";
import type { WebsiteResponse } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";

interface Props {
  data: WebsiteResponse;
}

export default function AboutContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const themeName = data?.theme_name ?? "template_one";

  const aboutPageSection = {
    heading: data?.about_heading || "About Us",
    description: data?.about_description || "Welcome to our business",
    image: data?.about_image,
  };

  return (
    <>
      {themeName === "template_one" && (
        <main>
          <div className="bg-gradient-to-r from-red-600 to-red-800 py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold text-white">About Us</h1>
            </div>
          </div>
          {aboutPageSection && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    {aboutPageSection.heading}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {aboutPageSection.description}
                  </p>
                </div>
                {aboutPageSection.image && (
                  <img
                    src={aboutPageSection.image}
                    alt="About us"
                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                  />
                )}
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_two" && (
        <main>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold text-white">About Us</h1>
            </div>
          </div>
          {aboutPageSection && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    {aboutPageSection.heading}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {aboutPageSection.description}
                  </p>
                </div>
                {aboutPageSection.image && (
                  <img
                    src={aboutPageSection.image}
                    alt="About us"
                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                  />
                )}
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_three" && (
        <main>
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold text-white">About Us</h1>
            </div>
          </div>
          {aboutPageSection && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    {aboutPageSection.heading}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {aboutPageSection.description}
                  </p>
                </div>
                {aboutPageSection.image && (
                  <img
                    src={aboutPageSection.image}
                    alt="About us"
                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                  />
                )}
              </div>
            </section>
          )}
        </main>
      )}
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
      {themeName === "template_four" && (
        <main className="bg-white">
          {/* Hero Section */}
          <section className="relative flex items-center justify-center overflow-hidden py-32">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-600"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-light mb-6">About Us</h1>
            </div>
          </section>

          {/* About Content Section */}
          {aboutPageSection && (
            <section className="py-24 bg-white">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl font-light text-slate-900 mb-8">
                      {aboutPageSection.heading}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {aboutPageSection.description}
                    </p>
                  </div>
                  {aboutPageSection.image && (
                    <img
                      src={aboutPageSection.image}
                      alt="About us"
                      className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_five" && (
        <main className="bg-white">
          {/* Hero Section */}
          <section className="relative flex items-center justify-center overflow-hidden py-32">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-orange-900"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="h-1 w-12 bg-orange-600"></div>
                <span className="text-orange-600 font-bold uppercase tracking-wider text-sm bg-white px-4 py-1 rounded">
                  About Us
                </span>
                <div className="h-1 w-12 bg-orange-600"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                Our Story
              </h1>
            </div>
          </section>

          {/* About Content Section */}
          {aboutPageSection && (
            <section className="py-24 bg-white">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl font-black text-gray-900 mb-8">
                      {aboutPageSection.heading}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {aboutPageSection.description}
                    </p>
                  </div>
                  {aboutPageSection.image && (
                    <img
                      src={aboutPageSection.image}
                      alt="About us"
                      className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_six" && (
        <main className="bg-white">
          {/* Hero Section */}
          <section className="relative flex items-center justify-center overflow-hidden py-32">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <div className="inline-block px-4 py-1 bg-amber-500 text-gray-900 rounded-full text-sm font-semibold mb-6">
                About Us
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
            </div>
          </section>

          {/* About Content Section */}
          {aboutPageSection && (
            <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                      {aboutPageSection.heading}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {aboutPageSection.description}
                    </p>
                  </div>
                  {aboutPageSection.image && (
                    <img
                      src={aboutPageSection.image}
                      alt="About us"
                      className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_seven" && (
        <main className="bg-neutral-950">
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                Our Story
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-white mt-4">
                About Us
              </h1>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
            </div>
          </section>
          {aboutPageSection && (
            <section className="py-24 bg-neutral-900">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-6">
                      {aboutPageSection.heading}
                    </h2>
                    <p className="text-neutral-400 leading-relaxed text-lg">
                      {aboutPageSection.description}
                    </p>
                  </div>
                  {aboutPageSection.image && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg opacity-30 blur"></div>
                      <img
                        src={aboutPageSection.image}
                        alt="About us"
                        className="relative rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_eight" && (
        <main className="bg-zinc-950">
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-sky-500"></div>
                <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                  Our Story
                </span>
                <div className="w-8 h-0.5 bg-sky-500"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white">
                About Us
              </h1>
            </div>
          </section>
          {aboutPageSection && (
            <section className="py-24 bg-zinc-900">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-6">
                      {aboutPageSection.heading}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed text-lg">
                      {aboutPageSection.description}
                    </p>
                  </div>
                  {aboutPageSection.image && (
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-sky-500/20 rounded-lg blur-xl"></div>
                      <img
                        src={aboutPageSection.image}
                        alt="About us"
                        className="relative rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
      {themeName === "template_nine" && (
        <main className="bg-slate-50">
          <section className="bg-rose-950 py-32 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 justify-center mb-6">
                <div className="w-10 h-px bg-rose-400"></div>
                <span className="text-rose-300 font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <div className="w-10 h-px bg-rose-400"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                About Us
              </h1>
            </div>
          </section>
          {aboutPageSection && (
            <section className="py-24 bg-white">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      {aboutPageSection.heading}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {aboutPageSection.description}
                    </p>
                  </div>
                  {aboutPageSection.image && (
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={aboutPageSection.image}
                        alt="About us"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
    </>
  );
}

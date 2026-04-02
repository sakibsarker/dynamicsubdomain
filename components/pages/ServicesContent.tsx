"use client";

import Link from "next/link";
import type { WebsiteResponse } from "@/lib/types";
import { usePopup } from "@/components/PopupContext";

interface Props {
  data: WebsiteResponse;
}

export default function ServicesContent({ data }: Props) {
  const { onBookAppointment, onGetEstimate } = usePopup();
  const themeName = data?.theme_name ?? "template_one";

  return (
    <>
      {themeName === "template_one" && (
        <main>
          <div className="bg-gray-800 py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold text-white">
                Our Services
              </h1>
              <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                Comprehensive auto repair and maintenance services
              </p>
            </div>
          </div>
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {service.image_url && (
                      <img
                        src={service.image_url}
                        alt={service.name || `Service ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-gray-600">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold transition-colors bg-red-600 text-white hover:bg-red-700 mr-4"
                >
                  Book Appointment
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold transition-colors bg-transparent text-red-600 border border-red-600 hover:bg-white hover:text-red-600"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_two" && (
        <main>
          <div className="bg-blue-700 py-16 text-white">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold">Our Services</h1>
              <p className="text-blue-100 mt-2 max-w-2xl mx-auto">
                Comprehensive auto care for all your vehicle needs
              </p>
            </div>
          </div>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {service.image_url && (
                      <img
                        src={service.image_url}
                        alt={service.name || `Service ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-blue-600 mb-2">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-gray-600">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700 mr-4"
                >
                  Get Free Estimate
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="bg-transparent text-blue-600 border border-blue-600 hover:bg-white hover:text-blue-600 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_three" && (
        <main>
          <div className="bg-gray-800 py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-extrabold text-white">
                Our Services
              </h1>
              <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                Complete automotive care for your vehicle
              </p>
            </div>
          </div>
          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {service.image_url && (
                      <img
                        src={service.image_url}
                        alt={service.name || `Service ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
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
        <main className="pt-20 bg-white min-h-screen">
          <div className="bg-slate-900 py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4">
                Our Services
              </h1>
              <div className="w-20 h-px bg-white mx-auto mt-6"></div>
            </div>
          </div>
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {data.service_logo_urls?.map((service, index) => (
                  <div key={index} className="group">
                    {service.image_url && (
                      <div className="relative overflow-hidden mb-6 h-72">
                        <img
                          src={service.image_url}
                          alt={service.name || `Service ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl font-light text-slate-900 mb-3">
                      {service.name || `Service ${index + 1}`}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description || "Professional service"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800 mr-4"
                >
                  Get Started
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_five" && (
        <main className="pt-20 bg-white min-h-screen">
          <div className="bg-gray-900 py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="h-1 w-12 bg-orange-600"></div>
                <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">
                  What We Do
                </span>
                <div className="h-1 w-12 bg-orange-600"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white">
                Our Services
              </h1>
            </div>
          </div>
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-white border-4 border-gray-100 hover:border-orange-600 transition-all duration-300 overflow-hidden"
                  >
                    {service.image_url && (
                      <div className="relative overflow-hidden h-80">
                        <img
                          src={service.image_url}
                          alt={service.name || `Service ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-orange-600/20 group-hover:bg-orange-600/30 transition-colors duration-300"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-3xl font-black text-gray-900 mb-4">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl mr-4"
                >
                  Get Started Today
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_six" && (
        <main className="pt-20 bg-white min-h-screen">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 py-24">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
              <div className="inline-block px-4 py-1 bg-amber-500 text-gray-900 rounded-full text-sm font-semibold mb-6">
                What We Do
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">Our Services</h1>
            </div>
          </div>
          <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-white border-2 border-gray-100 hover:border-teal-600 rounded-3xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl"
                  >
                    {service.image_url && (
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={service.image_url}
                          alt={service.name || `Service ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-teal-600/10 group-hover:bg-teal-600/20 transition-colors duration-300"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-teal-600 text-white hover:bg-teal-700 mr-4"
                >
                  Get Started
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-amber-500 text-gray-900 hover:bg-amber-600"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_seven" && (
        <main className="pt-20 bg-neutral-950 min-h-screen">
          <div className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                What We Do
              </span>
              <h1 className="text-5xl md:text-6xl font-black mt-4">
                Our Services
              </h1>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-6"></div>
            </div>
          </div>
          <section className="py-24 bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-neutral-800 border border-neutral-700 hover:border-amber-500 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    {service.image_url && (
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={service.image_url}
                          alt={service.name || `Service ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-white mb-3">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-wide rounded-md bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25 mr-4"
                >
                  Book Now
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-wide rounded-md border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_eight" && (
        <main className="pt-20 bg-zinc-950 min-h-screen">
          <div className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-sky-500"></div>
                <span className="text-sky-400 font-semibold uppercase tracking-widest text-xs">
                  What We Do
                </span>
                <div className="w-8 h-0.5 bg-sky-500"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black">Our Services</h1>
            </div>
          </div>
          <section className="py-24 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-zinc-800 border border-zinc-700 hover:border-sky-500 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    {service.image_url && (
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={service.image_url}
                          alt={service.name || `Service ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-colors duration-300"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-white mb-3">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30 mr-4"
                >
                  Book Now
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wider rounded-lg border-2 border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
      {themeName === "template_nine" && (
        <main className="pt-20 bg-slate-50 min-h-screen">
          <section className="bg-rose-950 py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <div className="inline-flex items-center gap-2 justify-center mb-6">
                <div className="w-10 h-px bg-rose-400"></div>
                <span className="text-rose-300 font-semibold text-sm uppercase tracking-wider">
                  What We Do
                </span>
                <div className="w-10 h-px bg-rose-400"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">Our Services</h1>
            </div>
          </section>
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.service_logo_urls?.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-white border border-gray-200 hover:border-rose-500 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                    {service.image_url && (
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={service.image_url}
                          alt={service.name || `Service ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/10 transition-colors duration-300"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.name || `Service ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description || "Professional service"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onBookAppointment();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/25 mr-4"
                >
                  Book Now
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetEstimate();
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
                >
                  Get Estimate
                </a>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

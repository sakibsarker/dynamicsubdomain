"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  ThemeName,
  WebsiteResponse,
  BusinessLogoResponse,
} from "@/lib/types";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface HeaderProps {
  data: WebsiteResponse;
  logoData: BusinessLogoResponse | null;
  themeName: ThemeName;
  activePage?: string;
  onBookAppointment?: () => void;
  onGetEstimate?: () => void;
}

export default function Header({
  data,
  logoData,
  themeName,
  activePage = "",
  onBookAppointment,
  onGetEstimate,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Template One - Classic Red Gradient
  if (themeName === "template_one") {
    return (
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-sm group-hover:bg-red-700 transition-colors">
                <ImageWithSkeleton
                  src={logoData?.logo || ""}
                  alt="Logo"
                  className="h-10 w-auto"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight whitespace-nowrap">
                {logoData?.business_name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="font-bold text-gray-300 hover:text-red-400 transition-colors">Home</Link>
              <Link href="/contact" className="font-bold text-gray-300 hover:text-red-400 transition-colors">Contact</Link>
              <Link href="/services" className="font-bold text-gray-300 hover:text-red-400 transition-colors">Services</Link>
              <Link href="/about" className="font-bold text-gray-300 hover:text-red-400 transition-colors">About Us</Link>
              <a
                onClick={() => onBookAppointment?.()}
                className="cursor-pointer bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md font-bold transition-colors inline-flex items-center justify-center"
              >
                Book Appointment
              </a>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white text-3xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <Link href="/" className="block py-2 px-4 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a className="block text-center bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md font-bold transition-colors cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Book Appointment</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Two - Blue Professional
  if (themeName === "template_two") {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-blue-600">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-4 group">
              {logoData?.logo ? (
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-14 w-auto relative z-10 drop-shadow-lg" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent whitespace-nowrap">{logoData?.business_name}</h1>
                    <p className="text-xs text-gray-500 font-medium tracking-wider">PROFESSIONAL CARE</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-30"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl font-black">{logoData?.business_name?.substring(0, 2).toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent whitespace-nowrap">{logoData?.business_name}</h1>
                    <p className="text-xs text-gray-500 font-medium tracking-wider">PROFESSIONAL AUTO CARE</p>
                  </div>
                </div>
              )}
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-blue-600 text-3xl focus:outline-none" aria-label="Toggle menu">{isMenuOpen ? "✕" : "☰"}</button>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="font-semibold text-gray-700 hover:text-blue-600 transition-all hover:scale-105">Home</Link>
              <Link href="/contact" className="font-semibold text-gray-700 hover:text-blue-600 transition-all hover:scale-105">Contact</Link>
              <Link href="/services" className="font-semibold text-gray-700 hover:text-blue-600 transition-all hover:scale-105">Services</Link>
              <Link href="/about" className="font-semibold text-gray-700 hover:text-blue-600 transition-all hover:scale-105">About Us</Link>
              <a onClick={() => onGetEstimate?.()} className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-md font-semibold inline-flex items-center justify-center">Get Free Estimate</a>
            </nav>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
              <Link href="/" className="block py-2 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a onClick={() => { onGetEstimate?.(); setIsMenuOpen(false); }} className="block py-3 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded font-semibold text-center transition-colors cursor-pointer">Get Free Estimate</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Three - Gradient Modern
  if (themeName === "template_three") {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-4 text-left">
              {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-12 w-auto" />}
              <span className="text-xl font-bold text-gray-800 whitespace-nowrap">{logoData?.business_name}</span>
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-800 text-3xl focus:outline-none" aria-label="Toggle menu">{isMenuOpen ? "✕" : "☰"}</button>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Home</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Contact</Link>
              <Link href="/services" className="text-gray-700 hover:text-[#FF6B35] transition-colors">Services</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#FF6B35] transition-colors">About Us</Link>
              <a onClick={() => onBookAppointment?.()} className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-[#FF6B35] to-[#F7C59F] text-white shadow-lg hover:shadow-xl hover:brightness-110">Schedule Service</a>
            </nav>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
              <Link href="/" className="block py-2 px-4 text-gray-700 hover:text-[#FF6B35] hover:bg-orange-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-gray-700 hover:text-[#FF6B35] hover:bg-orange-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-gray-700 hover:text-[#FF6B35] hover:bg-orange-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-gray-700 hover:text-[#FF6B35] hover:bg-orange-50 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }} className="block py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#F7C59F] text-white hover:brightness-110 rounded-full font-medium text-center transition-all cursor-pointer">Schedule Service</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // SVG Menu Icon helper for templates 4-9
  const MenuIcon = ({ color = "text-slate-900" }: { color?: string }) => (
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${color}`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );

  // Template Four - Minimalist Slate
  if (themeName === "template_four") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-10 w-auto" />}
              <span className="text-2xl font-light text-slate-900 tracking-tight whitespace-nowrap">{logoData?.business_name}</span>
            </Link>
            <MenuIcon color="text-slate-900" />
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
              <Link href="/contact" className="text-sm uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">Contact</Link>
              <Link href="/services" className="text-sm uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">Services</Link>
              <Link href="/about" className="text-sm uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">About Us</Link>
              <a onClick={() => onBookAppointment?.()} className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800">Book Appointment</a>
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-slate-200 pt-4">
              <Link href="/" className="block py-2 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors uppercase tracking-wider text-sm" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors uppercase tracking-wider text-sm" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors uppercase tracking-wider text-sm" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors uppercase tracking-wider text-sm" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a className="block py-3 px-4 bg-slate-900 text-white hover:bg-slate-800 font-medium text-center transition-colors cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Book Appointment</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Five - Bold Dark
  if (themeName === "template_five") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/95 backdrop-blur-sm shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-12 w-auto" />}
              <span className="text-2xl font-black text-white tracking-tight whitespace-nowrap">{logoData?.business_name}</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-orange-600 transition-colors">Home</Link>
              <Link href="/contact" className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-orange-600 transition-colors">Contact</Link>
              <Link href="/services" className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-orange-600 transition-colors">Services</Link>
              <Link href="/about" className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-orange-600 transition-colors">About Us</Link>
              <a onClick={() => onBookAppointment?.()} className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl">Make an Appointment</a>
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-700 pt-4">
              <Link href="/" className="block py-2 px-4 text-gray-300 hover:text-orange-600 hover:bg-gray-800 rounded transition-colors uppercase tracking-wider text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-gray-300 hover:text-orange-600 hover:bg-gray-800 rounded transition-colors uppercase tracking-wider text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-gray-300 hover:text-orange-600 hover:bg-gray-800 rounded transition-colors uppercase tracking-wider text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-gray-300 hover:text-orange-600 hover:bg-gray-800 rounded transition-colors uppercase tracking-wider text-sm font-bold" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a className="block py-3 px-4 bg-orange-600 text-white hover:bg-orange-700 font-bold text-center transition-colors shadow-lg cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Make an Appointment</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Six - Friendly Teal
  if (themeName === "template_six") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-12 w-auto" />}
              <span className="text-2xl font-black text-teal-600 tracking-tight whitespace-nowrap">{logoData?.business_name}</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-teal-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors font-semibold">Home</Link>
              <Link href="/contact" className="text-gray-700 hover:text-teal-600 transition-colors font-semibold">Contact</Link>
              <Link href="/services" className="text-gray-700 hover:text-teal-600 transition-colors font-semibold">Services</Link>
              <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors font-semibold">About Us</Link>
              <a onClick={() => onBookAppointment?.()} className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl bg-teal-600 text-white hover:bg-teal-700">Get Started</a>
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
              <Link href="/" className="block py-2 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a className="block py-3 px-4 bg-teal-600 text-white hover:bg-teal-700 rounded-full font-semibold text-center transition-colors shadow-lg cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Get Started</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Seven - Bold Red
  if (themeName === "template_seven") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-neutral-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-12 w-auto brightness-0 invert" />}
              <span className="text-2xl font-black text-white tracking-tight whitespace-nowrap">{logoData?.business_name}</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-neutral-300 hover:text-amber-400 transition-colors font-bold text-sm uppercase tracking-wider">Home</Link>
              <Link href="/contact" className="text-neutral-300 hover:text-amber-400 transition-colors font-bold text-sm uppercase tracking-wider">Contact</Link>
              <Link href="/services" className="text-neutral-300 hover:text-amber-400 transition-colors font-bold text-sm uppercase tracking-wider">Services</Link>
              <Link href="/about" className="text-neutral-300 hover:text-amber-400 transition-colors font-bold text-sm uppercase tracking-wider">About Us</Link>
              <a onClick={() => onBookAppointment?.()} className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wide rounded-md bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25">Book Now</a>
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-neutral-800 pt-4">
              <Link href="/" className="block py-2 px-4 text-neutral-300 hover:text-amber-400 transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-neutral-300 hover:text-amber-400 transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-neutral-300 hover:text-amber-400 transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-neutral-300 hover:text-amber-400 transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a className="block py-3 px-4 bg-amber-500 text-white hover:bg-amber-600 rounded-md font-bold text-center cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Book Now</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Eight - Dark Sky
  if (themeName === "template_eight") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-12 w-auto brightness-0 invert" />}
              <span className="text-2xl font-black text-white tracking-tight whitespace-nowrap">{logoData?.business_name}</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-zinc-300 hover:text-sky-400 transition-colors font-semibold text-sm uppercase tracking-wider">Home</Link>
              <Link href="/contact" className="text-zinc-300 hover:text-sky-400 transition-colors font-semibold text-sm uppercase tracking-wider">Contact</Link>
              <Link href="/services" className="text-zinc-300 hover:text-sky-400 transition-colors font-semibold text-sm uppercase tracking-wider">Services</Link>
              <Link href="/about" className="text-zinc-300 hover:text-sky-400 transition-colors font-semibold text-sm uppercase tracking-wider">About Us</Link>
              <a onClick={() => onBookAppointment?.()} className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-lg bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30">Book Now</a>
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-zinc-800 pt-4">
              <Link href="/" className="block py-2 px-4 text-zinc-300 hover:text-sky-400 transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/contact" className="block py-2 px-4 text-zinc-300 hover:text-sky-400 transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/services" className="block py-2 px-4 text-zinc-300 hover:text-sky-400 transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/about" className="block py-2 px-4 text-zinc-300 hover:text-sky-400 transition-colors font-semibold" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <a className="block py-3 px-4 bg-sky-500 text-white hover:bg-sky-600 rounded-lg font-bold text-center cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Book Now</a>
            </nav>
          )}
        </div>
      </header>
    );
  }

  // Template Nine - Fresh Emerald (default)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            {logoData?.logo && <ImageWithSkeleton src={logoData.logo} alt="Logo" className="h-12 w-auto" />}
            <span className="text-2xl font-bold text-rose-900 tracking-tight whitespace-nowrap">{logoData?.business_name}</span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-rose-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Home</Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Contact</Link>
            <Link href="/services" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Services</Link>
            <Link href="/about" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">About Us</Link>
            <a onClick={() => onBookAppointment?.()} className="cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/25">Book Now</a>
          </nav>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
            <Link href="/" className="block py-2 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/contact" className="block py-2 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link href="/services" className="block py-2 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/about" className="block py-2 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <a className="block py-3 px-4 bg-rose-600 text-white hover:bg-rose-700 rounded-full font-semibold text-center cursor-pointer" onClick={() => { onBookAppointment?.(); setIsMenuOpen(false); }}>Book Now</a>
          </nav>
        )}
      </div>
    </header>
  );
}

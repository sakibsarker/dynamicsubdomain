#!/usr/bin/env python3
"""Generate Header.tsx, Footer.tsx, and loading.tsx files to match originals exactly."""

import os

BASE = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# HEADER.TSX - Exact match to original Webpage.tsx headers
# ============================================================
header_tsx = r'''"use client";

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
'''

# ============================================================
# FOOTER.TSX - Exact match to original footers
# ============================================================
footer_tsx = r'''import type { ThemeName, WebsiteResponse, BusinessLogoResponse } from "@/lib/types";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "./Icons";

interface FooterProps {
  data: WebsiteResponse;
  logoData: BusinessLogoResponse | null;
  themeName: ThemeName;
}

export default function Footer({ data, logoData, themeName }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = `\u00A9 ${year} ${logoData?.business_name || data.website_url}. All rights reserved.`;

  // Shared service list
  const ServicesList = ({ hoverClass }: { hoverClass: string }) => (
    <ul className="space-y-2 text-gray-400">
      {data.service_logo_urls?.slice(0, 4).map((service, index) => (
        <li key={index}><a href="/services" className={`${hoverClass} transition-colors`}>{service.name}</a></li>
      ))}
    </ul>
  );

  // Shared hours list
  const HoursList = ({ textClass }: { textClass: string }) => (
    <ul className="space-y-2">
      {data?.business_hours?.map((day) => (
        <li key={day.day} className={textClass}>
          {day.day}:{" "}
          {day.is_open
            ? day.time_slots.map((slot, index) => (
                <span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>
              ))
            : "Closed"}
        </li>
      ))}
    </ul>
  );

  // Templates 1-3: Social icons in first column, 4-column grid
  if (themeName === "template_one") {
    return (
      <footer id="contact" className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
            {data.website_url && <p className="font-bold text-lg">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-gray-400 text-sm mt-2">{data.contact_address}</p>}
            <div className="flex space-x-4 mt-4">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><TiktokIcon className="w-6 h-6" /></a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="/services" className="hover:text-red-500 transition-colors">{service.name}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Hours</h4>
            <HoursList textClass="text-gray-400" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="hover:text-red-500 transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="hover:text-red-500 transition-colors">{data.contact_email}</a></li>}
              {data.website_url && <li><a href={`https://${data.website_url}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">{logoData?.business_name || data.website_url}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bg-black py-4"><p className="text-center text-gray-500 text-sm">{copyright}</p></div>
      </footer>
    );
  }

  if (themeName === "template_two") {
    return (
      <footer id="contact" className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
            {data.website_url && <p className="font-bold text-lg">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-gray-400 text-sm mt-2">{data.contact_address}</p>}
            <div className="flex space-x-4 mt-4">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><TiktokIcon className="w-6 h-6" /></a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="hover:text-blue-400">{service.name}</a></li>))}</ul>
          </div>
          <div><h4 className="font-bold text-lg mb-4">Hours</h4><HoursList textClass="text-gray-400" /></div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="hover:text-red-500 transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="hover:text-blue-400 transition-colors">{data.contact_email}</a></li>}
              {data.website_url && <li><a href={`https://${data.website_url}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">{logoData?.business_name || data.website_url}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bg-black py-4"><p className="text-center text-gray-500 text-sm">{copyright}</p></div>
      </footer>
    );
  }

  if (themeName === "template_three") {
    return (
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Footer Logo`} className="h-12 mb-4" />}
            {data.website_url && <p className="font-bold text-lg">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-gray-400 text-sm mt-2">{data.contact_address}</p>}
            <div className="flex space-x-4 mt-4">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B35] transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B35] transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B35] transition-colors"><TiktokIcon className="w-6 h-6" /></a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="hover:text-[#FF6B35] transition-colors">{service.name}</a></li>))}</ul>
          </div>
          <div><h4 className="font-bold text-lg mb-4">Hours</h4><HoursList textClass="text-gray-400" /></div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="hover:text-red-500 transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="hover:text-[#FF6B35] transition-colors">{data.contact_email}</a></li>}
              {data.website_url && <li><a href={`https://${data.website_url}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors">{logoData?.business_name || data.website_url}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bg-black py-4"><p className="text-center text-gray-500 text-sm">{copyright}</p></div>
      </footer>
    );
  }

  // Templates 4-9: Social icons in Contact column, different layout structure
  if (themeName === "template_four") {
    return (
      <footer id="contact" className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-10 mb-4" />}
              {data.website_url && <p className="text-xl font-light mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-sm text-slate-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-sm text-slate-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-sm text-slate-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-sm text-slate-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center"><p className="text-sm text-slate-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_five") {
    return (
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-gray-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-600">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-gray-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-600">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-gray-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-600">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-gray-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-gray-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center"><p className="text-gray-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_six") {
    return (
      <footer id="contact" className="bg-gradient-to-br from-teal-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-teal-100">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-teal-100 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-teal-100">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-teal-100 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-teal-100 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-amber-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-amber-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-teal-100 hover:text-amber-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-teal-600 pt-8 text-center"><p className="text-teal-200">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_seven") {
    return (
      <footer id="contact" className="bg-neutral-950 text-white border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4 brightness-0 invert" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-neutral-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-neutral-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-neutral-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-4">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-neutral-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-neutral-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center"><p className="text-neutral-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  if (themeName === "template_eight") {
    return (
      <footer id="contact" className="bg-zinc-950 text-white border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4 brightness-0 invert" />}
              {data.website_url && <p className="text-2xl font-black mb-4">{logoData?.business_name || data.website_url}</p>}
              {data.contact_address && <p className="text-zinc-400">{data.contact_address}</p>}
            </div>
            <div>
              <h4 className="text-sky-400 font-semibold uppercase tracking-wider text-xs mb-4">Services</h4>
              <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-zinc-400 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-sky-400 font-semibold uppercase tracking-wider text-xs mb-4">Hours</h4>
              <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-zinc-400">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sky-400 font-semibold uppercase tracking-wider text-xs mb-4">Contact</h4>
              <ul className="space-y-2">
                {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-zinc-400 hover:text-white transition-colors">{data.contact_phone}</a></li>}
                {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-zinc-400 hover:text-white transition-colors">{data.contact_email}</a></li>}
              </ul>
              <div className="flex gap-4 mt-6">
                {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
                {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
                {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center"><p className="text-zinc-500">{copyright}</p></div>
        </div>
      </footer>
    );
  }

  // Template Nine (default)
  return (
    <footer id="contact" className="bg-rose-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            {logoData?.logo && <img src={logoData.logo} alt={`${logoData?.business_name || data.website_url} Logo`} className="h-12 mb-4 brightness-0 invert" />}
            {data.website_url && <p className="text-2xl font-bold mb-4">{logoData?.business_name || data.website_url}</p>}
            {data.contact_address && <p className="text-rose-300/60">{data.contact_address}</p>}
          </div>
          <div>
            <h4 className="text-rose-400 font-semibold uppercase tracking-wider text-xs mb-4">Services</h4>
            <ul className="space-y-2">{data.service_logo_urls?.slice(0, 4).map((service, index) => (<li key={index}><a href="#services" className="text-rose-300/60 hover:text-white transition-colors">{service.name}</a></li>))}</ul>
          </div>
          <div>
            <h4 className="text-rose-400 font-semibold uppercase tracking-wider text-xs mb-4">Hours</h4>
            <ul className="space-y-2">{data?.business_hours?.map((day) => (<li key={day.day} className="text-rose-300/60">{day.day}: {day.is_open ? day.time_slots.map((slot, index) => (<span key={index}>{slot.open}-{slot.close}{index < day.time_slots.length - 1 && ", "}</span>)) : "Closed"}</li>))}</ul>
          </div>
          <div>
            <h4 className="text-rose-400 font-semibold uppercase tracking-wider text-xs mb-4">Contact</h4>
            <ul className="space-y-2">
              {data.contact_phone && <li><a href={`tel:${data.contact_phone}`} className="text-rose-300/60 hover:text-white transition-colors">{data.contact_phone}</a></li>}
              {data.contact_email && <li><a href={`mailto:${data.contact_email}`} className="text-rose-300/60 hover:text-white transition-colors">{data.contact_email}</a></li>}
            </ul>
            <div className="flex gap-4 mt-6">
              {data.facebook_url && <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="text-rose-300/60 hover:text-rose-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>}
              {data.instagram_url && <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="text-rose-300/60 hover:text-rose-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>}
              {data.tiktok_url && <a href={data.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-rose-300/60 hover:text-rose-400 transition-colors"><TiktokIcon className="w-5 h-5" /></a>}
            </div>
          </div>
        </div>
        <div className="border-t border-rose-800 pt-8 text-center"><p className="text-rose-300/40">{copyright}</p></div>
      </div>
    </footer>
  );
}
'''

# ============================================================
# SKELETON - Shared skeleton component
# ============================================================
skeleton_component = r'''export function HeaderSkeleton() {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </nav>
          <div className="md:hidden w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        <div>
          <div className="w-12 h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-4 mt-4">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>
          <ul className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <li key={index}><div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-4"></div>
          <ul className="space-y-2">
            {[...Array(7)].map((_, index) => (
              <li key={index}><div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-4"></div>
          <ul className="space-y-2">
            <li><div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div></li>
            <li><div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div></li>
            <li><div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div></li>
          </ul>
        </div>
      </div>
      <div className="bg-black py-4">
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
    </footer>
  );
}
'''

# ============================================================
# LOADING.TSX files for each route
# ============================================================
home_loading = r'''import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeaderSkeleton />
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-32 animate-pulse">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="h-14 w-3/4 bg-white/10 rounded-lg mx-auto"></div>
          <div className="h-6 w-2/3 bg-white/10 rounded mx-auto"></div>
          <div className="flex gap-4 justify-center mt-8">
            <div className="h-12 w-40 bg-white/20 rounded-md"></div>
            <div className="h-12 w-40 bg-white/10 rounded-md"></div>
          </div>
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200/60 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200/40 rounded"></div>
          </div>
          <div className="h-64 w-full bg-gray-200/50 rounded-xl"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
          <div className="h-64 w-full bg-gray-200/50 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200/60 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-full bg-gray-200/40 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200/40 rounded"></div>
          </div>
        </div>
      </div>
      <FooterSkeleton />
    </div>
  );
}
'''

about_loading = r'''import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSkeleton />
      <main className="flex-1">
        <div className="bg-gray-800 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          </div>
        </div>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </section>
      </main>
      <FooterSkeleton />
    </div>
  );
}
'''

contact_loading = r'''import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSkeleton />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-1 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
              <ul className="space-y-3">
                {[...Array(7)].map((_, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <FooterSkeleton />
    </div>
  );
}
'''

services_loading = r'''import { HeaderSkeleton, FooterSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSkeleton />
      <main className="flex-1">
        <div className="bg-gray-800 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse mx-auto mb-6"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </section>
      </main>
      <FooterSkeleton />
    </div>
  );
}
'''

# Write all files
files = {
    os.path.join(BASE, "components", "Header.tsx"): header_tsx,
    os.path.join(BASE, "components", "Footer.tsx"): footer_tsx,
    os.path.join(BASE, "components", "Skeleton.tsx"): skeleton_component,
    os.path.join(BASE, "app", "loading.tsx"): home_loading,
    os.path.join(BASE, "app", "about", "loading.tsx"): about_loading,
    os.path.join(BASE, "app", "contact", "loading.tsx"): contact_loading,
    os.path.join(BASE, "app", "services", "loading.tsx"): services_loading,
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print(f"  Written: {os.path.relpath(path, BASE)}")

print("\nDone! All files generated.")

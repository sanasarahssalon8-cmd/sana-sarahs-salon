"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 border border-white/10 shadow-md">
            <Image
              src="/logo.jpeg"
              alt="Sana Sarah's Salon & Studio"
              width={32}
              height={32}
              className="rounded-full"
              priority
            />
            <span className="text-sm sm:text-base font-semibold tracking-tight text-fuchsia-50">
              Sana Sarah&apos;s Salon & Studio
            </span>
          </div>
        </Link>


        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          <Link href="/" className="hover:text-pink-300 text-fuchsia-100 transition">
            Home
          </Link>
          <Link href="/makeup" className="hover:text-pink-300 text-fuchsia-100 transition">
            Makeup
          </Link>
          <Link href="/skincare" className="hover:text-pink-300 text-fuchsia-100 transition">
            Skincare
          </Link>
          <Link href="/haircare" className="hover:text-pink-300 text-fuchsia-100 transition">
            Haircare
          </Link>

          {/* Branches Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBranchesOpen(true)}
            onMouseLeave={() => setBranchesOpen(false)}
          >
            <button className="flex items-center gap-1 text-fuchsia-100 hover:text-pink-300 transition">
              Branches <ChevronDown size={16} />
            </button>

            {branchesOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-black/90 border border-white/10 shadow-xl p-4 space-y-3 backdrop-blur-md">
                <div>
                  <p className="text-pink-400 font-semibold text-sm mb-1">Karachi Branches</p>
                  <div className="flex flex-col pl-2 space-y-1 text-sm">
                    <Link href="/karachi/dha" className="hover:text-pink-400">DHA Branch</Link>
                    <Link href="/karachi/johar" className="hover:text-pink-400">Johar Branch</Link>
                    <Link href="/karachi/north-nazimabad" className="hover:text-pink-400">
                      North Nazimabad
                    </Link>
                    <Link href="/karachi/tariq-road" className="hover:text-pink-400">
                      Tariq Road Branch
                    </Link>
                  </div>
                </div>

                <hr className="border-white/10" />

                <div className="flex flex-col space-y-1 text-sm pl-2">
                  <p className="text-pink-400 font-semibold text-sm mb-1">Other Cities</p>
                  <Link href="/hyderabad" className="hover:text-pink-400">Hyderabad Branch</Link>
                  <Link href="/lahore" className="hover:text-pink-400">Lahore Branch</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-black/90 border-t border-white/10 text-white/90 backdrop-blur-md px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-pink-400">
              Home
            </Link>
            <Link href="/makeup" onClick={() => setOpen(false)} className="hover:text-pink-400">
              Makeup
            </Link>
            <Link href="/skincare" onClick={() => setOpen(false)} className="hover:text-pink-400">
              Skincare
            </Link>
            <Link href="/haircare" onClick={() => setOpen(false)} className="hover:text-pink-400">
              Haircare
            </Link>
          </div>

          <hr className="border-white/10 my-3" />

          <div>
            <p className="text-pink-400 font-semibold text-sm mb-2">Karachi Branches</p>
            <div className="flex flex-col pl-3 space-y-2 text-sm">
              <Link href="/karachi/dha" onClick={() => setOpen(false)}>DHA Branch</Link>
              <Link href="/karachi/johar" onClick={() => setOpen(false)}>Johar Branch</Link>
              <Link href="/karachi/north-nazimabad" onClick={() => setOpen(false)}>North Nazimabad</Link>
              <Link href="/karachi/tariq-road" onClick={() => setOpen(false)}>Tariq Road Branch</Link>
            </div>

            <p className="text-pink-400 font-semibold text-sm mt-4 mb-2">Other Cities</p>
            <div className="flex flex-col pl-3 space-y-2 text-sm">
              <Link href="/hyderabad" onClick={() => setOpen(false)}>Hyderabad Branch</Link>
              <Link href="/lahore" onClick={() => setOpen(false)}>Lahore Branch</Link>
            </div>
          </div>

          <hr className="border-white/10 my-4" />

          <a
            href="https://wa.me/923198451172?text=Hi%20Sana%20Sarah%20Salon%2C%20I%20want%20to%20book%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-tr from-pink-600 to-fuchsia-500 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            💬 Talk to Agent
          </a>
        </div>
      )}
    </header>
  );
}

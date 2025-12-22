"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, MapPin, Phone } from "lucide-react";

export default function HyderabadLocation() {
  const address =
    "Plot No. B/1-54, Ground Floor, Railway Employees Housing Society, Main Auto Bhan Road, next to Bank Islamic & Haveli Restaurant, Hyderabad";
  const phones = ["0370-0918026"];
  const waLink =
    "https://wa.me/923198451172?text=Hi%20Sana%20Sarah%20Salon%2C%20Hyderabad%20branch%20details%20please.";
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.871960944083!2d68.34655131502803!3d25.37519418381925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c710034718e5f%3A0x72761edfbabe8786!2sSana%20Sarahs%20Salon%20and%20Studio%20-%20Hyderabad!5e0!3m2!1sen!2s!4v1730915402321!5m2!1sen!2s";

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* soft glow background */}
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full blur-3xl bg-fuchsia-700/10" />
      <div aria-hidden className="absolute -bottom-40 right-10 h-[360px] w-[360px] rounded-full blur-3xl bg-pink-600/10" />

      <main className="relative z-10 pt-28 pb-12 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
            Hyderabad Branch
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* left column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5" />
                  <div>
                    <p className="text-sm text-white/60">Address</p>
                    <p className="font-medium mt-0.5 text-white/90">{address}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5" />
                  <div>
                    <p className="text-sm text-white/60">Phone Numbers</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {phones.map((p) => (
                        <Link
                          key={p}
                          href={`tel:${p}`}
                          className="rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20 transition"
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* map column */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
              <iframe
                src={mapSrc}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <MessageCircle />
              Talk to Agent
            </Link>
            <p className="text-xs text-white/60">Open 7 days • 11:00 AM – 11:00 PM</p>
          </div>
        </div>
      </main>
    </div>
  );
}

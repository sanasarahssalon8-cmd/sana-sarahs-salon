// src/app/karachi/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const branches = [
  { slug: "johar", label: "Johar" },
  { slug: "north-nazimabad", label: "North Nazimabad" },
  { slug: "dha", label: "DHA" },
  { slug: "tariq-road", label: "Tariq Road" },
];

export default function Karachi() {
  // --- Hydration guard: render only on client ---
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="relative min-h-screen w-full text-white overflow-hidden"
      // Avoid warnings if anything still differs slightly
      suppressHydrationWarning
    >
      {/* subtle background glows */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full blur-3xl bg-fuchsia-700/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-10 h-[360px] w-[360px] rounded-full blur-3xl bg-pink-600/10"
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-16 sm:py-24">
        {/* Title */}
        <motion.div
          initial={false}                 // ✅ prevent SSR/CSR mismatch
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xs sm:text-sm tracking-widest text-white/70 uppercase">
            Kindly let us know
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">
            For which branch are you asking about?
          </h2>
        </motion.div>

        {/* Branch cards */}
        <motion.div
          initial={false}                 // ✅ no SSR-time “initial”
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl"
        >
          {branches.map((b) => (
            <Link
              key={b.slug}
              href={`/karachi/${b.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] backdrop-blur transition"
            >
              <div className="pointer-events-none absolute -inset-24 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(236,72,153,0.10),rgba(168,85,247,0.10),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">{b.label}</h3>
                  <p className="text-white/60 text-sm inline-flex items-center gap-1">
                    <MapPin size={14} /> Karachi
                  </p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-pink-600/80 to-fuchsia-500/80 flex items-center justify-center text-xl font-bold">
                  →
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-2" id="agent">
          <Link
            href="https://wa.me/923198451172?text=Hi%20Sana%20Sarah%20Salon%2C%20I%20want%20info%20for%20Karachi."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <MessageCircle />
            Talk to Agent
          </Link>
          <p className="text-xs text-white/60">
            Open 7 days • 11:00 AM – 9:00 PM
          </p>
        </div>
      </main>
    </div>
  );
}

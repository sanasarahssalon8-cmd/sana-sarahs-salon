"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Download } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "923198451172"; // ✅ actual number

// --- DealCard Component ---
function DealCard({
  base,
  i,
  openLightbox,
}: {
  base: string;
  i: number;
  openLightbox: (i: number) => void;
}) {
  // Prefer .jpeg first
  const chain = useMemo(() => [`${base}.jpeg`, `${base}.jpg`, `${base}.png`], [base]);
  const [idx, setIdx] = useState(0);
  const src = chain[idx];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="pointer-events-none absolute -inset-24 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(236,72,153,0.08),rgba(168,85,247,0.08),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition" />
      <button
        onClick={() => openLightbox(i)}
        className="block w-full text-left"
        aria-label={`Open deal ${i + 1}`}
      >
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/5">
          <Image
            src={src}
            alt={`Hyderabad Deal ${i + 1}`}
            fill
            className="object-contain"
            priority
            onError={() =>
              setIdx((prev) => (prev < chain.length - 1 ? prev + 1 : prev))
            }
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </button>
      <div className="relative z-10 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Deal #{i + 1}</p>
          <h3 className="text-base font-semibold">Hyderabad</h3>
        </div>
        <Link
          href={src}
          download
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 transition"
        >
          Download
        </Link>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function HyderabadCurrentDealsPage() {
  const TOTAL_DEALS = 9; // ✅ your folder has 9 images

  const bases = useMemo(
    () => Array.from({ length: TOTAL_DEALS }, (_, i) => `/deals/hyderabad/${i + 1}`),
    []
  );

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const openLightbox = (i: number) => {
    setActiveIdx(i);
    setOpen(true);
  };
  const closeLightbox = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Hyderabad — Current Deals</h1>
          <Link
            href="/hyderabad"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs sm:text-sm tracking-widest text-white/60 uppercase">
            Limited-time offers
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Hyderabad — {bases.length} Deals
          </h2>
        </motion.div>

        {/* ✅ Deals Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {bases.map((base, i) => (
            <DealCard key={base} base={base} i={i} openLightbox={openLightbox} />
          ))}
        </motion.div>

        {/* ✅ WhatsApp Button */}
        <div className="pt-4 flex justify-center">
          <Link
            href={`https://wa.me/${encodeURIComponent(
              WHATSAPP_NUMBER
            )}?text=${encodeURIComponent(
              "Hi Sana Sarah Salon, I want info about current deals for the Hyderabad branch."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <MessageCircle />
            Talk to Agent
          </Link>
        </div>

        <p className="text-center text-xs text-white/60">
          Open 7 days • 11:00 AM – 11:00 PM
        </p>
      </main>

      {/* ✅ Lightbox */}
      <AnimatePresence>
        {open && activeIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Lightbox
              baseFolder="/deals/hyderabad"
              index={activeIdx}
              onClose={closeLightbox}
              label="Hyderabad"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Lightbox ---
function Lightbox({
  baseFolder,
  index,
  onClose,
  label,
}: {
  baseFolder: string;
  index: number;
  onClose: () => void;
  label: string;
}) {
  const base = `${baseFolder}/${index + 1}`;
  const chain = [`${base}.jpeg`, `${base}.jpg`, `${base}.png`];
  const [i, setI] = useState(0);
  const src = chain[i];
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
        <span className="text-sm sm:text-base text-white/80">
          {label} — Deal #{index + 1}
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={src}
            download
            className="rounded-lg border border-white/10 px-2 py-1 hover:bg-white/10 inline-flex"
          >
            <Download size={18} />
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-2 py-1 hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="min-h-full w-full grid place-items-center p-4 sm:p-8">
          <Image
            src={src}
            onError={() =>
              setI((prev) => (prev < chain.length - 1 ? prev + 1 : prev))
            }
            alt="Current deal enlarged"
            className="max-h-[85svh] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

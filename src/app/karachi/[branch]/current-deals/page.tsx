"use client";
export const runtime = 'edge';
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

// ✅ DealCard component
function DealCard({
  base,
  i,
  openLightbox,
  label,
}: {
  base: string;
  i: number;
  openLightbox: (i: number) => void;
  label: string;
}) {
  // Try jpeg first
  const chain = useMemo(() => [`${base}.jpeg`, `${base}.jpg`, `${base}.png`], [base]);
  const [idx, setIdx] = useState(0);
  const src = chain[idx];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <button
        onClick={() => openLightbox(i)}
        className="block w-full text-left"
        aria-label={`Open ${label} deal ${i + 1}`}
      >
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/5">
          <Image
            src={src}
            alt={`${label} Deal ${i + 1}`}
            fill
            className="object-contain"
            priority
            onError={() => setIdx((p) => (p < chain.length - 1 ? p + 1 : p))}
          />
        </div>
      </button>
      <div className="relative z-10 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Deal #{i + 1}</p>
          <h3 className="text-base font-semibold">{label}</h3>
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

// ✅ Main Page
export default function KarachiBranchDealsPage() {
  // total images = 9
  const TOTAL_DEALS = 9;

  const bases = useMemo(
    () => Array.from({ length: TOTAL_DEALS }, (_, i) => `/deals/karachi/${i + 1}`),
    []
  );

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (i: number) => {
    setActiveIdx(i);
    setOpen(true);
  };
  const closeLightbox = () => setOpen(false);

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Karachi — Current Deals</h1>
          <Link
            href="/karachi"
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
            Karachi — {bases.length} Deals
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
            <DealCard
              key={base}
              base={base}
              i={i}
              openLightbox={openLightbox}
              label="Karachi"
            />
          ))}
        </motion.div>
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
              baseFolder="/deals/karachi"
              index={activeIdx}
              onClose={closeLightbox}
              label="Karachi"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ✅ Lightbox Component
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm text-white/80">
          {label} — Deal #{index + 1}
        </span>
        <button
          onClick={onClose}
          className="rounded border border-white/10 px-2 py-1 hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 grid place-items-center p-4">
        <Image
          src={src}
          alt={`Deal enlarged ${index + 1}`}
          width={800}
          height={1000}
          className="object-contain max-h-[85svh] w-auto"
          onError={() => setI((prev) => (prev < chain.length - 1 ? prev + 1 : prev))}
        />
      </div>
    </div>
  );
}

"use client";
export const runtime = 'edge';

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SKINCARE_VIDEOS = [
  { file: "/gallery/skincare/1", title: "Mani & Pedi" },
  { file: "/gallery/skincare/2", title: "Eyelashes" },
  { file: "/gallery/skincare/3", title: "Carbon Treatment" },
  { file: "/gallery/skincare/4", title: "Acrylic Nails" },
  { file: "/gallery/skincare/5", title: "Facial" },
];

export default function SkincareCatalogue() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex justify-between">
          <h1 className="text-lg font-semibold">Skincare Catalogue</h1>
          <Link
            href="../"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            Back
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="text-xs text-white/60 uppercase tracking-widest">
            Sana Sarah Salon — Skincare Gallery
          </p>
          <h2 className="text-3xl font-bold">Catalogue</h2>
        </motion.div>

        {/* Grid of 5 videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKINCARE_VIDEOS.map((v, i) => (
            <div
              key={v.file}
              onClick={() => setActive(i)}
              className="cursor-pointer group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <video
                src={`${v.file}.mp4`}
                loop
                muted
                autoPlay
                playsInline
                className="object-cover w-full h-[340px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition" />
              <p className="absolute bottom-3 left-3 text-sm font-medium">
                {v.title}
              </p>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-end px-4 py-3 border-b border-white/10">
                <button
                  onClick={() => setActive(null)}
                  className="rounded border border-white/10 px-2 py-1 hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 grid place-items-center p-4">
                <video
                  src={`${SKINCARE_VIDEOS[active].file}.mp4`}
                  controls
                  autoPlay
                  className="max-h-[85svh] w-auto rounded-xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

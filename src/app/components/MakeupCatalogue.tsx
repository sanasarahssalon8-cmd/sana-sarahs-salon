"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Category = "signature-by-sana-sarah" | "signature-artist" | "senior-artist" | "expert-artist";
const LABELS: Record<Category, string> = {
  "signature-by-sana-sarah": "Signature by Sana Sarah",
  "signature-artist": "Signature Artist",
  "senior-artist": "Senior Artist",
  "expert-artist": "Expert Artist",
};

// WhatsApp
const WA = "923198451172";

type Props = {
  // "johar" | "dha" | "tariq-road" | "north-nazimabad" | "lahore" | "hyderabad"
  branchKey: string;
  branchLabel: string;
};

// ----- PRICES -----
// Karachi (standard)
const KARACHI_STD = {
  "signature-artist": 32000,
  "senior-artist": 28000,
} as const;

// Expert availability (Karachi)
const EXPERT_KHI: Record<string, number | null> = {
  johar: 22000,
  "north-nazimabad": 20000,
  dha: null, // not offered
  "tariq-road": null, // not offered
};

// Owner price per branch (no discount anywhere)
const OWNER_PRICE: Record<string, number> = {
  johar: 40000,
  dha: 70000,
  "tariq-road": 70000,
  "north-nazimabad": 70000,
  lahore: 150000,
  hyderabad: 200000,
};

// Discount tables (non-owner) for Lahore/Hyderabad
type Discount = { actual: number; after: number };
const DISCOUNT_LAHORE: Partial<Record<Category, Discount>> = {
  "signature-artist": { actual: 100000, after: 50000 },
  "senior-artist": { actual: 60000, after: 30000 },
  // expert not listed on your Lahore card -> hide it
};
const DISCOUNT_HYDERABAD: Partial<Record<Category, Discount>> = {
  "senior-artist": { actual: 50000, after: 25000 },
  "expert-artist": { actual: 30000, after: 15000 },
  // signature-artist not shown -> hide it
};

const TOTAL_BY_TAB: Record<Category, number> = {
  "signature-by-sana-sarah": 6,
  "signature-artist": 6,
  "senior-artist": 6,
  "expert-artist": 6,
};

export default function MakeupCatalogue({ branchKey, branchLabel }: Props) {
  // available categories for the branch
  const categories = useMemo(() => {
    const base: Category[] = ["signature-by-sana-sarah", "signature-artist", "senior-artist", "expert-artist"];

    // Karachi expert filter
    if (["johar", "dha", "tariq-road", "north-nazimabad"].includes(branchKey)) {
      return base.filter((c) => {
        if (c === "expert-artist") return EXPERT_KHI[branchKey] !== null;
        return true;
      });
    }

    // Lahore: only owner + signature + senior
    if (branchKey === "lahore") return ["signature-by-sana-sarah", "signature-artist", "senior-artist"];

    // Hyderabad: owner + senior + expert
    if (branchKey === "hyderabad") return ["signature-by-sana-sarah", "senior-artist", "expert-artist"];

    return base;
  }, [branchKey]);

  const [tab, setTab] = useState<Category>(categories[0] as Category);

  const basePath = `/gallery/makeup/${tab}`;
  const files = useMemo(
    () => Array.from({ length: TOTAL_BY_TAB[tab] }, (_, i) => `${basePath}/${i + 1}`),
    [basePath, tab]
  );

  const priceLine = (cat: Category) => {
    // owner (no discount anywhere)
    if (cat === "signature-by-sana-sarah") {
      const p = OWNER_PRICE[branchKey];
      return `Price: PKR ${p.toLocaleString()}`;
    }

    // Lahore
    if (branchKey === "lahore" && DISCOUNT_LAHORE[cat]) {
      const d = DISCOUNT_LAHORE[cat]!;
      return `Actual: PKR ${d.actual.toLocaleString()} • After 50% Off: PKR ${d.after.toLocaleString()}`;
    }

    // Hyderabad
    if (branchKey === "hyderabad" && DISCOUNT_HYDERABAD[cat]) {
      const d = DISCOUNT_HYDERABAD[cat]!;
      return `Actual: PKR ${d.actual.toLocaleString()} • After 50% Off: PKR ${d.after.toLocaleString()}`;
    }

    // Karachi standard
    if (["johar", "dha", "tariq-road", "north-nazimabad"].includes(branchKey)) {
      if (cat === "signature-artist") return `Price: PKR ${KARACHI_STD["signature-artist"].toLocaleString()}`;
      if (cat === "senior-artist") return `Price: PKR ${KARACHI_STD["senior-artist"].toLocaleString()}`;
      if (cat === "expert-artist") {
        const val = EXPERT_KHI[branchKey];
        if (val) return `Price: PKR ${val.toLocaleString()}`;
      }
    }

    return "Price: —";
  };

  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-white/60 uppercase tracking-widest">Makeup Catalogue — {branchLabel}</p>
          <h1 className="text-3xl sm:text-4xl font-bold">Choose a Category</h1>
        </motion.div>

        {/* tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((c) => {
  const cat = c as Category;
  return (
    <button
      key={cat}
      onClick={() => setTab(cat)}
      className={`px-5 py-2 rounded-2xl text-sm font-medium transition ${
        tab === cat
          ? "bg-gradient-to-tr from-pink-600 to-fuchsia-500"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      {LABELS[cat]}
    </button>
  );
})}

        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {files.map((file, i) => (
            <Card
              key={file}
              file={file}
              title={`${LABELS[tab]} — ${branchLabel}`}
              priceLine={priceLine(tab)}
              branchKey={branchKey}
              cat={tab}
              index={i + 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function Card({
  file,
  title,
  priceLine,
  branchKey,
  cat,
  index,
}: {
  file: string;
  title: string;
  priceLine: string;
  branchKey: string;
  cat: Category;
  index: number;
}) {
  const [extIdx, setExtIdx] = useState(0);
  const exts = [".mp4", ".mov", ".jpeg", ".jpg", ".png"];
  const src = file + exts[extIdx];
  const isVideo = [".mp4", ".mov"].includes(exts[extIdx]);

  const WA_TEXT = `Hi! I want to book ${title}).`;
  const wa = `https://wa.me/923198451172?text=${encodeURIComponent(WA_TEXT)}`;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      {/* media wrapper: aspect with glow background to avoid empty bars */}
      <div className="relative aspect-[3/4] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.2))]">
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
            onError={() => setExtIdx((p) => (p < exts.length - 1 ? p + 1 : p))}
          />
        ) : (
          <Image
            src={src}
            alt={title}
            fill
            className="object-contain"
            onError={() => setExtIdx((p) => (p < exts.length - 1 ? p + 1 : p))}
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* inline description + CTA */}
      <div className="p-4">
        <p className="text-sm text-white/60">{title}</p>
        <p className="mt-1 text-[13px]">{priceLine}</p>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-tr from-pink-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold shadow-lg hover:brightness-110 transition animate-pulse"
        >
          Book Now 
        </a>
      </div>
    </div>
  );
}

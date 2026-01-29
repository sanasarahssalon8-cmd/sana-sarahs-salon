// app/karachi/[branch]/gallery/page.tsx
"use client";
export const runtime = 'edge';

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const BRANCH_LABELS: Record<string, string> = {
  johar: "Johar",
  "north-nazimabad": "North Nazimabad",
  dha: "DHA",
  "tariq-road": "Tariq Road",
};

const WHATSAPP_NUMBER = "922138899883";

const CATALOGUE: { label: string; slug: string }[] = [
  { label: "Signature by Sana Sarah", slug: "signature-by-sana-sarah" },
  { label: "Signature Artist", slug: "signature-artist" },
  { label: "Senior Artist", slug: "senior-artist" },
  { label: "Expert Artist", slug: "expert-artist" },
  { label: "Model Party Makeup", slug: "model-party-makeup" },
  { label: "Glamorous Party Makeup", slug: "glamorous-party-makeup" },
  { label: "Soft Party Makeup", slug: "soft-party-makeup" },
];

export default function CataloguePage() {
  const { branch } = useParams<{ branch: string }>();
  const slug = branch.toLowerCase();
  const title = BRANCH_LABELS[slug] ?? "Branch";

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">{title} — Catalogue</h1>
          <Link
            href={`/karachi/${slug}`}
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            Back to options
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm tracking-widest text-white/60 uppercase">
            Choose a category
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            {title} — Makeup Catalogue
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CATALOGUE.map((c) => (
            <Link
              key={c.slug}
              href={`/karachi/${slug}/gallery/${c.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:bg-white/[0.06] transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold">{c.label}</h3>
                <span className="text-xs text-white/60">View</span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link
            href={`https://wa.me/${encodeURIComponent(
              WHATSAPP_NUMBER
            )}?text=${encodeURIComponent(
              `Hi Sana Sarah Salon, please share catalogue details for ${title} branch (Karachi).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <MessageCircle />
            Talk to Agent
          </Link>
        </div>
      </main>
    </div>
  );
}

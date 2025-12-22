"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PRICE, HAS_EXPERT, BranchKey, CategoryKey } from "@/app/data/makeupRates";

const BRANCH_LABEL: Record<BranchKey, string> = {
  johar: "Karachi — Johar",
  dha: "Karachi — DHA",
  northNazimabad: "Karachi — North Nazimabad",
  tariqRoad: "Karachi — Tariq Road",
  hyderabad: "Hyderabad",
  lahore: "Lahore",
};

function pkr(v?: number) {
  return typeof v === "number" ? `Rs ${v.toLocaleString()}` : "—";
}

function whatsappHref(subcat: string) {
  const text = encodeURIComponent(
    `Hi Sana Sarah Salon, I want to book *${subcat}* makeup. Please confirm availability & price.`
  );
  return `https://wa.me/923198451172?text=${text}`;
}

function resolveBranchPrice(
  topCat: CategoryKey,
  subcat: string,
  branch: BranchKey
): number | undefined {
  const isExpertStyle = [
    "Model Party Makeup",
    "Glamorous Party Makeup",
    "Soft Party Makeup",
  ].includes(subcat);

  if (isExpertStyle) {
  if (HAS_EXPERT[branch]) {
    return (
      (PRICE["Expert Artist"] as unknown as Record<
        string,
        Partial<Record<BranchKey, number | undefined>>
      >)?.[subcat]?.[branch]
    );
  } else {
    return (
      (PRICE["Senior Artist"] as unknown as Record<
        string,
        Partial<Record<BranchKey, number | undefined>>
      >)?.[subcat]?.[branch]
    );
  }
}


  return (PRICE[topCat] as Record<string, Record<BranchKey, number | undefined>>)?.[subcat]?.[branch];
}

function findBestDeal(topCat: CategoryKey, subcat: string) {
  let bestBranch: BranchKey | null = null;
  let bestPrice: number | null = null;

  (Object.keys(BRANCH_LABEL) as BranchKey[]).forEach((b) => {
    const price = resolveBranchPrice(topCat, subcat, b);
    if (typeof price === "number") {
      if (bestPrice === null || price < bestPrice) {
        bestPrice = price;
        bestBranch = b;
      }
    }
  });

  return { branch: bestBranch, price: bestPrice };
}

interface RatesModalProps {
  open: boolean;
  topCat: CategoryKey;
  subcat: string;
  onClose: () => void;
}

export default function RatesModal({ open, topCat, subcat, onClose }: RatesModalProps) {
  const rows = useMemo(() => {
    return (Object.keys(BRANCH_LABEL) as BranchKey[]).map((b) => ({
      branch: b,
      price: resolveBranchPrice(topCat, subcat, b),
    }));
  }, [topCat, subcat]);

  const best = useMemo(() => findBestDeal(topCat, subcat), [topCat, subcat]);

  if (!open) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key={`${topCat}-${subcat}`} // ✅ Fix #1 unique key
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="fixed inset-x-4 sm:left-1/2 sm:-translate-x-1/2 top-[12vh] z-[90] w-auto sm:w-[720px] rounded-2xl border border-white/10 bg-black/80 p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Rates for</p>
            <h3 className="text-xl font-semibold">{topCat} — {subcat}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 p-2 hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Branch</th>
                <th className="px-3 py-2 text-left font-medium">Price</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ branch, price }) => {
                const isBest = best.branch === branch && best.price === price;
                return (
                  <tr key={branch} className="odd:bg-white/[0.02]">
                    <td className="px-3 py-2">{BRANCH_LABEL[branch]}</td>
                    <td className="px-3 py-2">{pkr(price)}</td>
                    <td className="px-3 py-2">
                      {isBest && (
                        <span className="text-[11px] rounded-full px-2 py-1 bg-green-500/20 text-green-300 border border-green-400/30">
                          Best Deal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          <a
            href={whatsappHref(subcat)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-tr from-pink-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold hover:brightness-110 transition"
          >
            Book on WhatsApp
          </a>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

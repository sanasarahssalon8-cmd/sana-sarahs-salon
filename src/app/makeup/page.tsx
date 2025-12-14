"use client";

import React, { useState, useRef } from "react";
import RatesModal from "@/app/components/RatesModal";
import { makeupRates, CategoryKey } from "@/app/data/makeupRates";

const CATEGORIES: CategoryKey[] = [
  "Signature by Sana Sarah",
  "Signature Artist",
  "Senior Artist",
  "Expert Artist",
];

type GroupId =
  | "engagement-nikkah"
  | "mayoun-mehndi"
  | "baarat"
  | "valima"
  | "party";

type SubGroup = {
  id: GroupId;
  label: string;
  keys: string[];
};

const SUBCATEGORY_GROUPS: SubGroup[] = [
  {
    id: "engagement-nikkah",
    label: "Engagement / Nikkah Makeup",
    keys: ["Engagement / Nikkah Makeup", "Engagement", "Nikkah"],
  },
  {
    id: "mayoun-mehndi",
    label: "Mayoun / Mehndi Makeup",
    keys: ["Mayoun / Mehndi Makeup", "Mayoun", "Mehndi"],
  },
  {
    id: "baarat",
    label: "Baraat Makeup",
    keys: ["Baraat Makeup", "Baraat"],
  },
  {
    id: "valima",
    label: "Valima Makeup",
    keys: ["Valima Makeup", "Valima"],
  },
  {
    id: "party",
    label: "Party Makeup",
    keys: ["Party Makeup", "Party"],
  },
];

// Har group mein kitni videos hain
const VIDEOS_PER_GROUP: Record<GroupId, number> = {
  "engagement-nikkah": 3,
  "mayoun-mehndi": 3,
  "baarat": 3,
  "valima": 3,
  "party": 3,
};

export default function MakeupPage() {
  const [selectedCat, setSelectedCat] = useState<CategoryKey>(CATEGORIES[0]);
  const [selectedSubcat, setSelectedSubcat] = useState<string | null>(null);

  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 👉 yahan hum categoryRates ko proper type de rahe hain
  const categoryRates: Record<string, unknown> =
    makeupRates[selectedCat as keyof typeof makeupRates] || {};

  const groups = SUBCATEGORY_GROUPS;

  const handleScroll = (groupId: string, direction: "left" | "right") => {
    const container = scrollRefs.current[groupId];
    if (!container) return;

    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.clientWidth : 260;
    const gap = 16;

    container.scrollBy({
      left: direction === "right" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen pt-24 text-white">
      <h1 className="text-center text-3xl font-bold">Choose a Category</h1>

      {/* artist tabs */}
      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              selectedCat === cat
                ? "bg-pink-600 text-white shadow-[0_0_25px_rgba(244,114,182,0.6)]"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* sections */}
      <div className="mt-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        {groups.map((group, index) => {
          const catSlug = selectedCat.toLowerCase().replace(/ /g, "-");
          const base = index + 1;

          const videoCount = VIDEOS_PER_GROUP[group.id] ?? 0;
          const hasArrows = videoCount > 1;

          const videoPaths = Array.from({ length: videoCount }, (_, i) =>
            `/gallery/makeup/${catSlug}/${base}-${i + 1}.mp4`
          );

          // 🔧 yahan se 'any' hata diya – sirf check kar rahe hain key exist karti hai ya nahi
          const ratesKey =
            group.keys.find((k) => Object.prototype.hasOwnProperty.call(categoryRates, k)) ??
            group.label;

          return (
            <section
              key={group.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-5"
            >
              {/* title row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {group.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70">
                    {group.label} ke different looks ki preview videos neeche
                    horizontal slider mein hain.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSubcat(ratesKey)}
                  className="self-start sm:self-auto px-4 py-2 bg-pink-600 rounded-full text-xs sm:text-sm font-semibold hover:bg-pink-500 transition"
                >
                  View Rates for {group.label}
                </button>
              </div>

              {/* slider */}
              <div className="relative">
                {hasArrows && (
                  <>
                    {/* left arrow */}
                    <button
                      type="button"
                      onClick={() => handleScroll(group.id, "left")}
                      className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10
                                 h-8 w-8 items-center justify-center rounded-full bg-black/60
                                 border border-white/20 backdrop-blur
                                 text-sm"
                    >
                      ‹
                    </button>

                    {/* right arrow */}
                    <button
                      type="button"
                      onClick={() => handleScroll(group.id, "right")}
                      className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10
                                 h-8 w-8 items-center justify-center rounded-full bg-black/60
                                 border border-white/20 backdrop-blur
                                 text-sm"
                    >
                      ›
                    </button>
                  </>
                )}

                <div
                  ref={(el) => {
                    if (el) scrollRefs.current[group.id] = el;
                  }}
                  className="flex gap-4 overflow-hidden pb-2 pt-1"
                >
                  {videoPaths.map((src, i) => (
                    <div
                      key={`${group.id}-${i}`}
                      className="shrink-0 w-[70vw] sm:w-[240px] lg:w-[260px]
                                 bg-white/5 border border-white/10 rounded-2xl p-3"
                    >
                      <video
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="rounded-xl mb-2 w-full object-contain aspect-[3/4]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {selectedSubcat && (
        <RatesModal
          open={!!selectedSubcat}
          topCat={selectedCat}
          subcat={selectedSubcat}
          onClose={() => setSelectedSubcat(null)}
        />
      )}
    </div>
  );
}

// app/karachi/[branch]/ratelist/page.tsx
"use client";
export const runtime = 'edge';

import React, { useMemo } from "react"; // ✅ removed useState
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const BRANCH_LABELS: Record<string, string> = {
  "johar": "Johar",
  "north-nazimabad": "North Nazimabad",
  "dha": "DHA",
  "tariq-road": "Tariq Road",
};

const BRANCH_INFO: Record<string, { address: string; phone: string }> = {
  "johar": { address: "J𝐨𝐡𝐚𝐫 𝐁𝐫𝐚𝐧𝐜𝐡: C-104, Block 15 Gulistan-e-Johar", phone: "Call us (Johar Branch): 0300-1283-742" },
  "north-nazimabad": { address: "𝐍𝐨𝐫𝐭𝐡 𝐍𝐚𝐳𝐢𝐦𝐚𝐛𝐚𝐝: Shop # 1 plot # B-74 Block L North Nazimabad food street opposite shan supermarket near Landikotal Chorangi Karachi", phone: "Call us (North Nazimabad): 021-36610375" },
  "dha": { address: "𝐃𝐇𝐀 𝐁𝐫𝐚𝐧𝐜𝐡: Shop No 1 Building 3C super Eight apartment ground floor Ittehad lane 5 phase 6 DHA Karachi.", phone: "Call us (DHA Branch): 0335-0292990, 021-35345488" },
  "tariq-road": { address: "𝐓𝐚𝐫𝐢𝐪 𝐑𝐨𝐚𝐝 𝐁𝐫𝐚𝐧𝐜𝐡: Shop # 2 Dilkusha & Gohar Residency, Plat No  6 Block 3, Delhi Co-operative Housing Society Ltd Besides Swings, Main Tariq Road, Karachi", phone: "Call us (Tariq Road): 0305-8887601, 021- 34540375" },
};

const WHATSAPP_NUMBER = "02138899883"; // <-- replace

export default function BranchRateList() {
  const { branch } = useParams<{ branch: string }>();
  const slug = branch.toLowerCase();
  const title = BRANCH_LABELS[slug] ?? "Branch";

  // Only first file path, no state needed
  const src = useMemo(() => `/ratelists/karachi/${slug}.jpeg`, [slug]);
  const info = BRANCH_INFO[slug] ?? { address: "Not available", phone: "N/A" };

  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">{title} — Rate List</h1>
          <Link
            href={`/karachi/${slug}`}
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            Back to options
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-10">
        {/* Rate list image */}
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-full max-w-3xl mx-auto aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <Image src={src} alt={`Rate list — ${title}`} fill className="object-contain" priority />
          </div>
        </motion.section>

        {/* Address + Phone */}
        <section className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5" />
              <div>
                <p className="text-sm text-fuchsia-300">Address</p>
                <p className="font-medium mt-0.5">{info.address}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5" />
              <div>
                <p className="text-sm text-fuchsia-300">Branch Number</p>
                <Link href={`tel:${info.phone}`} className="font-medium mt-0.5 underline underline-offset-4 hover:text-white">
                  {info.phone}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Talk to agent */}
        <section className="flex flex-col items-center gap-2">
          <Link
            href={`https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}?text=${encodeURIComponent(
              `Hi Sana Sarah Salon, please assist me for the ${title} branch (Karachi).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <MessageCircle />
            Talk to Agent
          </Link>
          <p className="text-xs text-white/60">Open 7 days • 11:00 AM – 8:00 PM</p>
        </section>
      </main>
    </div>
  );
}

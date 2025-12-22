"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HomeIcon, MessageCircle, MapPin, Phone } from "lucide-react";

type BranchKey = "dha" | "johar" | "north-nazimabad" | "tariq-road";

const BRANCH_LABELS: Record<BranchKey, string> = {
  dha: "DHA",
  johar: "Johar",
  "north-nazimabad": "North Nazimabad",
  "tariq-road": "Tariq Road",
};

const BRANCH_DATA: Record<
  BranchKey,
  { address: string; phones: string[]; mapEmbed: React.ReactNode }
> = {
  dha: {
    address:
      "Shop No 1, Building 3C, Super Eight Apartment, Ground Floor, Ittehad Lane 5, Phase 6, DHA, Karachi",
    phones: ["021-35345488", "0335-0292990"],
    mapEmbed: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.2284583980785!2d67.0710525752743!3d24.801732577955295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d8877bc8243%3A0xb7b6adbe8e7767b8!2sSana%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20DHA%20Branch!5e0!3m2!1sen!2s!4v1730912336401!5m2!1sen!2s"
        width="100%"
        height="260"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    ),
  },
  johar: {
    address: "C-104, Block 15, Gulistan-e-Johar, Karachi",
    phones: ["0300-1283742", "0317-2129212", "021-34170375", "0336-2013944"],
    mapEmbed: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.4223872493323!2d67.12419337527508!3d24.92495207936386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338eef9fd9b55%3A0xeee23238f2d49f0c!2sSana%20and%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20Johar%20Branch!5e0!3m2!1sen!2s!4v1730914312222!5m2!1sen!2s"
        width="100%"
        height="260"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    ),
  },
  "north-nazimabad": {
    address:
      "Shop #1, Plot #B-74, Block L, North Nazimabad (Food Street), Opp. Shan Supermarket, Near Landhi Kotal Chorangi, Karachi",
    phones: ["021-36610375", "0349-2411424", "0349-3010254"],
    mapEmbed: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.423579327982!2d66.97810931502829!3d24.938043000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f00580ff81f%3A0x760a93da39cf297a!2sSana%20and%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20North%20Branch!5e0!3m2!1sen!2s!4v1730914512309!5m2!1sen!2s"
        width="100%"
        height="260"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    ),
  },
  "tariq-road": {
    address:
      "Shop #2, Dilkusha & Gohar Residency, Plot No. 6, Block 3, Delhi Co-operative Housing Society Ltd, Besides Swings, Main Tariq Road, Karachi",
    phones: ["0305-8887601", "021-34540375"],
    mapEmbed: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.0427751976323!2d67.0678761752745!3d24.870782078640323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0a1e389a4f%3A0x88ca77ba428e39c!2sSana%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20Tariq%20Road%20Branch!5e0!3m2!1sen!2s!4v1730914742191!5m2!1sen!2s"
        width="100%"
        height="260"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    ),
  },
};

const WA_LINK =
  "https://api.whatsapp.com/send/?phone=923198451172&text&type=phone_number&app_absent=0";

export default function KarachiBranchMain() {
  const { branch } = useParams<{ branch: BranchKey }>();
  const slug = (branch || "dha") as BranchKey;
  const title = BRANCH_LABELS[slug];
  const data = BRANCH_DATA[slug];

  if (!data) {
    return (
      <div className="min-h-screen grid place-items-center text-white px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold">Branch Not Found</h1>
          <p className="text-white/70">
            The branch you’re looking for isn’t available. Please choose again.
          </p>
          <Link
            href="/karachi"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-black px-4 py-2 font-medium"
          >
            <HomeIcon size={16} /> Back to Karachi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full blur-3xl bg-fuchsia-700/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-10 h-[360px] w-[360px] rounded-full blur-3xl bg-pink-600/10"
      />

      {/* Main */}
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-xs sm:text-sm tracking-widest text-white/70 uppercase">
              Explore our services
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
              {title} Branch — Karachi
            </h2>
          </motion.div>

          {/* ---- Service Buttons (Moved Up) ---- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <ServiceCard title="Rate List" href={`/karachi/${slug}/ratelist`} />
            <ServiceCard title="Current Deals" href={`/karachi/${slug}/current-deals`} />
            <ServiceCard title="Makeup Catalogue" href={`/karachi/${slug}/gallery/makeup`} />
            <ServiceCard title="Haircare Catalogue" href={`/karachi/${slug}/gallery/haircare`} />
            <ServiceCard title="Skincare Catalogue" href={`/karachi/${slug}/gallery/skincare`} />
            <ServiceCard title="Book Appointment" href={WA_LINK} external accent />
          </motion.div>

          {/* ---- Address + Contact + Map (Now at Bottom) ---- */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            <div className="lg:col-span-2 space-y-5">
              <InfoCard icon={<MapPin />} title="Address" text={data.address} />
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5" />
                  <div>
                    <p className="text-sm text-white/60">Phone Numbers</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {data.phones.map((p) => (
                        <Link
                          key={p}
                          href={`tel:${p.replace(/\s+/g, "")}`}
                          className="inline-flex rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20 transition"
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
              {data.mapEmbed}
            </div>
          </motion.div>

          {/* ---- Agent CTA ---- */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <MessageCircle />
              Talk to Agent
            </Link>
            <p className="text-xs text-white/60">
              Open 7 days • 11:00 AM – 8:00 PM
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <p className="text-sm text-white/60">{title}</p>
          <p className="font-medium mt-0.5 text-white/90">{text}</p>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  href,
  external = false,
  accent = false,
}: {
  title: string;
  href: string;
  external?: boolean;
  accent?: boolean;
}) {
  const content = (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 p-5 backdrop-blur transition ${
        accent
          ? "bg-gradient-to-tr from-pink-600 to-fuchsia-500 hover:brightness-110"
          : "bg-white/[0.04] hover:bg-white/[0.06]"
      }`}
    >
      {!accent && (
        <div className="pointer-events-none absolute -inset-24 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(236,72,153,0.10),rgba(168,85,247,0.10),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition" />
      )}
      <h3 className="text-xl font-semibold relative z-10">{title}</h3>
    </div>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href}>{content}</Link>
  );
}

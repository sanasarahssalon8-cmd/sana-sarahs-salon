"use client";
export const runtime = 'edge';

import React from "react";
import { useParams } from "next/navigation";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

type BranchKey =
  | "dha"
  | "johar"
  | "north-nazimabad"
  | "tariq-road"
  | "hyderabad"
  | "lahore";

const BRANCH_DATA: Record<
  BranchKey,
  {
    name: string;
    address: string;
    phones: string[];
    map: React.ReactNode;
  }
> = {
  dha: {
    name: "DHA Branch — Karachi",
    address:
      "Shop No 1, Building 3C, Super Eight Apartment, Ground Floor, Ittehad Lane 5, Phase 6, DHA, Karachi",
    phones: ["021-35345488", "0335-0292990", "0315-9228819"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.2284583980785!2d67.0710525752743!3d24.801732577955295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d8877bc8243%3A0xb7b6adbe8e7767b8!2sSana%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20DHA%20Branch!5e0!3m2!1sen!2s!4v1730912336401!5m2!1sen!2s"
        width="100%"
        height="330"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  },
  johar: {
    name: "Johar Branch — Karachi",
    address: "C-104, Block 15, Gulistan-e-Johar, Karachi",
    phones: ["0300-1283742", "0317-2129212", "021-34170375", "0336-2013944"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.4223872493323!2d67.12419337527508!3d24.92495207936386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338eef9fd9b55%3A0xeee23238f2d49f0c!2sSana%20and%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20Johar%20Branch!5e0!3m2!1sen!2s!4v1730914312222!5m2!1sen!2s"
        width="100%"
        height="330"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  },
  "north-nazimabad": {
    name: "North Nazimabad Branch — Karachi",
    address:
      "Shop #1, Plot #B-74, Block L, North Nazimabad (Food Street), Opp. Shan Supermarket, Near Landhi Kotal Chorangi, Karachi",
    phones: ["021-36610375", "0349-2411424", "0349-3010254"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.423579327982!2d66.97810931502829!3d24.938043000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f00580ff81f%3A0x760a93da39cf297a!2sSana%20and%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20North%20Branch!5e0!3m2!1sen!2s!4v1730914512309!5m2!1sen!2s"
        width="100%"
        height="330"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  },
  "tariq-road": {
    name: "Tariq Road Branch — Karachi",
    address:
      "Shop #2, Dilkusha & Gohar Residency, Plot No. 6, Block 3, Delhi Co-operative Housing Society Ltd, Besides Swings, Main Tariq Road, Karachi",
    phones: ["021-34540375", "0305-8887601"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.0427751976323!2d67.0678761752745!3d24.870782078640323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0a1e389a4f%3A0x88ca77ba428e39c!2sSana%20Sarah&#39;s%20Salon%20%26%20Studio%20-%20Tariq%20Road%20Branch!5e0!3m2!1sen!2s!4v1730914742191!5m2!1sen!2s"
        width="100%"
        height="330"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  },
  hyderabad: {
    name: "Hyderabad Branch",
    address:
      "Plot No. B/1-54, Ground Floor, Railway Employees Housing Society, Main Auto Bhan Road, next to Bank Islamic & Haveli Restaurant, Hyderabad",
    phones: ["0370-0918026"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.871960944083!2d68.34655131502803!3d25.37519418381925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c710034718e5f%3A0x72761edfbabe8786!2sSana%20Sarahs%20Salon%20and%20Studio%20-%20Hyderabad!5e0!3m2!1sen!2s!4v1730915402321!5m2!1sen!2s"
        width="100%"
        height="330"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  },
  lahore: {
    name: "Lahore Branch",
    address:
      "House #82 - Block B2, Gulberg III, Main MM Alam Road, Opposite OD, Lahore, Pakistan",
    phones: ["042-37881450", "0334-0654474"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.612703268988!2d74.34729351503542!3d31.51673298137968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f6ff7b4a01f%3A0x50a7fae47c2eb38!2sSana%20Sarah%E2%80%99s%20Salon%20and%20Studio!5e0!3m2!1sen!2s!4v1730915402321!5m2!1sen!2s"
        width="100%"
        height="330"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  },
};

export default function LocationPage() {
  const { branch } = useParams<{ branch: BranchKey }>();
  const info = branch ? BRANCH_DATA[branch] : BRANCH_DATA.johar;

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Location not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* soft glow background */}
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full blur-3xl bg-fuchsia-700/10" />
      <div aria-hidden className="absolute -bottom-40 right-10 h-[360px] w-[360px] rounded-full blur-3xl bg-pink-600/10" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-center mb-10">
          {info.name} — Outlet Location
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* left info */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <div className="flex items-start gap-3">
                <MapPin className="text-pink-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Address</p>
                  <p className="mt-1 font-medium text-white/90">{info.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <div className="flex items-start gap-3">
                <Phone className="text-pink-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Phone Numbers</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {info.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s+/g, "")}`}
                        className="inline-flex rounded-xl border border-white/10 bg-white/10 px-3 py-1 text-xs hover:bg-white/20 transition"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right map */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {info.map}
          </div>
        </div>

        {/* Talk to agent */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <Link
            href="https://wa.me/923198451172?text=Hi%20Sana%20Sarah%20Salon%2C%20I%20want%20to%20book%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <MessageCircle className="transition group-hover:rotate-6" />
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

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://api.whatsapp.com/send/?phone=923198451172&text=Hi%20Sana%20Sarah%20Salon%2C%20I%20want%20to%20book%20an%20appointment.&type=phone_number&app_absent=0";

export default function LahoreBranch() {
  const branch = {
    title: "Lahore Branch",
    address:
      "House # 82 - Block B2, Gulberg III, Main MM Alam Road, Opposite OD, Lahore, Pakistan",
    phones: ["042-37881450", "0334-0654474"],
    map: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.612703268988!2d74.34729351503542!3d31.51673298137968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f6ff7b4a01f%3A0x50a7fae47c2eb38!2sSana%20Sarah%E2%80%99s%20Salon%20and%20Studio!5e0!3m2!1sen!2s!4v1730915402321!5m2!1sen!2s"
        width="100%"
        height="260"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    ),
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Glows */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full blur-3xl bg-fuchsia-700/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-10 h-[360px] w-[360px] rounded-full blur-3xl bg-pink-600/10"
      />

      {/* Main Section */}
      <main className="relative z-10 pt-28 pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Branch Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center text-3xl sm:text-4xl font-bold mb-10"
          >
            {branch.title}
          </motion.h1>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <ServiceCard title="Rate List" href="/lahore/ratelist" />
            <ServiceCard title="Current Deals" href="/lahore/current-deals" />
            <ServiceCard title="Makeup Catalogue" href="/lahore/gallery/makeup" />
            <ServiceCard title="Haircare Catalogue" href="/lahore/gallery/haircare" />
            <ServiceCard title="Skincare Catalogue" href="/lahore/gallery/skincare" />
            <ServiceCard title="Book Appointment" href={WA_LINK} external accent />
          </motion.div>

          {/* Address & Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            {/* Left */}
            <div className="lg:col-span-2 space-y-5">
              <InfoCard icon={<MapPin />} title="Address" text={branch.address} />
              <PhoneCard phones={branch.phones} />
            </div>

            {/* Right */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
              {branch.map}
            </div>
          </motion.div>

          {/* CTA */}
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

/* --- Reusable Components --- */
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function InfoCard({ icon, title, text }: InfoCardProps) {
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

interface PhoneCardProps {
  phones: string[];
}

function PhoneCard({ phones }: PhoneCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
      <div className="flex items-start gap-3">
        <Phone className="mt-0.5 text-pink-400" />
        <div>
          <p className="text-sm text-white/60">Phone Numbers</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {phones.map((num) => (
              <Link
                key={num}
                href={`tel:${num.replace(/\s+/g, "")}`}
                className="inline-flex rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20 transition"
              >
                {num}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  href: string;
  external?: boolean;
  accent?: boolean;
}

function ServiceCard({ title, href, external = false, accent = false }: ServiceCardProps) {
  const content = (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 p-5 backdrop-blur transition ${
        accent
          ? "bg-gradient-to-tr from-pink-600 to-fuchsia-500 hover:brightness-110"
          : "bg-white/[0.04] hover:bg-white/[0.06]"
      }`}
    >
      {!accent && (
        <div className="pointer-events-none absolute -inset-24 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(236,72,153,0.1),rgba(168,85,247,0.1),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition" />
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

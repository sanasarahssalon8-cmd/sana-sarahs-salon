// src/components/TopActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Home, MessageCircle } from "lucide-react";

export default function TopActions({
  whatsapp = "923198451172",
}: {
  whatsapp?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/"; // ✅ check if home page

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const waHref = `https://wa.me/${encodeURIComponent(
    whatsapp
  )}?text=${encodeURIComponent("Hi Sana Sarah Salon, I want to talk to an agent.")}`;

  return (
    <div
      className="
        fixed z-[60]
        top-[max(12px,env(safe-area-inset-top))]
        right-[max(12px,env(safe-area-inset-right))]
      "
    >
      <div
        className="
          flex items-center gap-2
          rounded-full border border-white/15 bg-black/35 backdrop-blur-md
          px-2 py-1.5
          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        "
      >
        {/* Show Back button only if NOT on Home */}
        {!isHome && (
          <button
            onClick={goBack}
            className="
              inline-flex items-center gap-1.5
              h-9 px-3 rounded-full
              text-[13px] font-medium
              border border-white/10 bg-white/10 hover:bg-white/15
              transition
            "
            aria-label="Go back"
            title="Back"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}

        {/* Always show Home button */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-1.5
            h-9 px-3 rounded-full
            text-[13px] font-medium
            border border-white/10 bg-white/10 hover:bg-white/15
            transition
          "
          aria-label="Go home"
          title="Home"
        >
          <Home size={16} />
          <span className="hidden sm:inline">Home Page</span>
        </Link>

        {/* Always show Talk to Agent */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-1.5
            h-9 px-3 rounded-full
            text-[13px] font-semibold
            bg-gradient-to-tr from-pink-600 to-fuchsia-500 hover:brightness-110
            shadow-[0_8px_24px_rgba(236,72,153,0.45)]
            transition
          "
          aria-label="Talk to agent"
          title="Talk to Agent"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">Talk to Agent</span>
        </a>
      </div>
    </div>
  );
}

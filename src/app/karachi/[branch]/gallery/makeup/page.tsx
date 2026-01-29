"use client";
export const runtime = 'edge';

import { useParams } from "next/navigation";
import MakeupCatalogue from "@/app/components/MakeupCatalogue";

const LABELS: Record<string, string> = {
  dha: "Karachi — DHA",
  johar: "Karachi — Johar",
  "north-nazimabad": "Karachi — North Nazimabad",
  "tariq-road": "Karachi — Tariq Road",
};

export default function Page() {
  const { branch } = useParams<{ branch: string }>();
  const key = (branch || "dha").toLowerCase();
  return <MakeupCatalogue branchKey={key} branchLabel={LABELS[key] ?? "Karachi"} />;
}



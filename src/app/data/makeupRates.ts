// Branch keys we use everywhere
export type BranchKey =
  | "johar"
  | "northNazimabad"
  | "hyderabad"
  | "dha"
  | "tariqRoad"
  | "lahore";

// Branches where Expert category EXISTS
export const HAS_EXPERT: Record<BranchKey, boolean> = {
  johar: true,
  northNazimabad: true,
  hyderabad: true,
  dha: false,
  tariqRoad: false,
  lahore: false,
};

// ------------------------------
// PRICE TABLE (cleaned numbers)
// ------------------------------
type PriceRow = Partial<Record<BranchKey, number>>;

export const PRICE = {
  // Signature by Sana Sarah (Owner)
  "Signature by Sana Sarah": {
    Engagement: {
      johar: 35000,
      dha: 70000,
      northNazimabad: 70000,
      tariqRoad: 70000,
      hyderabad: 200000,
      lahore: 150000,
    },
    Mehndi: {
      johar: 35000,
      dha: 70000,
      northNazimabad: 70000,
      tariqRoad: 70000,
      hyderabad: 200000,
      lahore: 150000,
    },
    Mayoun: {
      johar: 35000,
      dha: 70000,
      northNazimabad: 70000,
      tariqRoad: 70000,
      hyderabad: 200000,
      lahore: 150000,
    },
    Nikkah: {
      johar: 35000,
      dha: 70000,
      northNazimabad: 70000,
      tariqRoad: 70000,
      hyderabad: 200000,
      lahore: 150000,
    },
    // Bridal price → hum Baraat + Valima dono ke liye use kar rahe
    Bridal: {
      johar: 40000,
      dha: 70000,
      northNazimabad: 70000,
      tariqRoad: 70000,
      hyderabad: 200000,
      lahore: 150000,
    },
    Party: {
      johar: 25000,
      dha: 40000,
      northNazimabad: 40000,
      tariqRoad: 40000,
      hyderabad: 200000,
      lahore: 150000,
    },
  },

  // Signature Artist
  "Signature Artist": {
    Bridal: {
      johar: 32000,
      dha: 32000,
      northNazimabad: 32000,
      tariqRoad: 32000,
      hyderabad: 35000,
      lahore: 50000,
    },
    Engagement: {
      johar: 25000,
      dha: 25000,
      northNazimabad: 25000,
      tariqRoad: 25000,
      hyderabad: 30000,
      lahore: 40000,
    },
    Mehndi: {
      johar: 25000,
      dha: 25000,
      northNazimabad: 25000,
      tariqRoad: 25000,
      hyderabad: 30000,
      lahore: 40000,
    },
    Mayoun: {
      johar: 25000,
      dha: 25000,
      northNazimabad: 25000,
      tariqRoad: 25000,
      hyderabad: 30000,
      lahore: 40000,
    },
    Nikkah: {
      johar: 25000,
      dha: 25000,
      northNazimabad: 25000,
      tariqRoad: 25000,
      hyderabad: 30000,
      lahore: 40000,
    },
    Party: {
      johar: 15000,
      dha: 15000,
      northNazimabad: 15000,
      tariqRoad: 15000,
      hyderabad: 20000,
      lahore: 25000,
    },
  },

  // Senior Artist — party-focused
  "Senior Artist": {
    "Party (General)": {
      johar: 10000,
      northNazimabad: 10000,
      hyderabad: 15000,
    },
    "Model Party Makeup": {
      dha: 10000,
      tariqRoad: 10000,
      lahore: 12500,
    },
    "Glamorous Party Makeup": {
      dha: 8000,
      tariqRoad: 8000,
      lahore: 10000,
    },
    "Soft Party Makeup": {
      dha: 6000,
      tariqRoad: 6000,
      lahore: 7500,
    },
  },

  // Expert Artist — party styles only (and only in expert branches)
  "Expert Artist": {
    "Model Party Makeup": {
      johar: 10000,
      northNazimabad: 10000,
      hyderabad: 7500,
    },
    "Glamorous Party Makeup": {
      johar: 7500,
      northNazimabad: 7500,
      hyderabad: 10000,
    },
    "Soft Party Makeup": {
      johar: 6000,
      northNazimabad: 5000,
      hyderabad: 5000,
    },
  },
} as const;

export type CategoryKey = keyof typeof PRICE;
export type SubcatKey<C extends CategoryKey> = keyof (typeof PRICE)[C];

// ---------------------------------------------
// UI label → PRICE key mapping
// (Eng/Nikkah, Mayoun/Mehndi, Baraat, Valima, Party…)
// ---------------------------------------------
export function normalizeSubcatLabel(
  category: CategoryKey,
  subcat: string
): string {
  const s = subcat.trim();

  // 5 main groups from /makeup page
  if (s === "Engagement / Nikkah Makeup") {
    return "Engagement";
  }

  if (s === "Mayoun / Mehndi Makeup") {
    // agar is category me Mehndi row hai to use, warna Mayoun
    const table = PRICE[category] as Record<string, PriceRow>;
    if (table["Mehndi"]) return "Mehndi";
    if (table["Mayoun"]) return "Mayoun";
    return "Engagement";
  }

  if (s === "Baraat Makeup") {
    return "Bridal";
  }

  if (s === "Valima Makeup") {
    return "Bridal";
  }

  if (s === "Party Makeup") {
    // Senior Artist ke liye generic party row alag name se hai
    if (category === "Senior Artist") {
      const table = PRICE[category] as Record<string, PriceRow>;
      if (table["Party (General)"]) return "Party (General)";
    }
    return "Party";
  }

  // Agar already canonical name hai (Engagement, Mehndi, Bridal, Party, …)
  return s;
}

// ----------------------------------------------------
// Decide which subcategories to DISPLAY in dropdowns
// (yahan hum sirf woh keys return karte hain jinke price
//  table me actual rows maujood hain)
// ----------------------------------------------------
export function subcatsForCategory(
  category: CategoryKey,
  branch?: BranchKey
): string[] {
  if (category === "Expert Artist") {
    // Sirf 3 party styles
    return Object.keys(PRICE["Expert Artist"]) as string[];
  }

  if (category === "Senior Artist") {
    if (branch && HAS_EXPERT[branch]) {
      // Jahan Expert bhi available hai (Johar / NorthNazimabad / Hyderabad) →
      // Senior ko simple "Party (General)" pe limit kar rahe
      return ["Party (General)"];
    }
    // Baqi branches (DHA / Tariq / Lahore) pe 3 detailed party types dikhao
    return Object.keys(PRICE["Senior Artist"]) as string[];
  }

  // Signature by Sana Sarah / Signature Artist
  const keys = Object.keys(PRICE[category]) as string[];
  const order = ["Bridal", "Engagement", "Mehndi", "Mayoun", "Nikkah", "Party"];

  // canonical order ke hisaab se; jo keys exist nahi karte unko skip
  return order.filter((k) => keys.includes(k));
}

// ---------------------------------------------
// Price resolver – ek jagah se sari mapping
// ---------------------------------------------
export function getPrice(
  category: CategoryKey,
  subcat: string,
  branch: BranchKey
): number | null {
  // pehle UI label ko canonical PRICE key me convert karo
  const normalized = normalizeSubcatLabel(category, subcat);

  // Senior vs Expert party-style conflict logic
  if (
    category === "Senior Artist" &&
    (normalized === "Model Party Makeup" ||
      normalized === "Glamorous Party Makeup" ||
      normalized === "Soft Party Makeup") &&
    HAS_EXPERT[branch]
  ) {
    // jahan Expert available hai wahan Senior ke detailed party styles hide
    return null;
  }

  if (
    category === "Expert Artist" &&
    (normalized === "Model Party Makeup" ||
      normalized === "Glamorous Party Makeup" ||
      normalized === "Soft Party Makeup") &&
    !HAS_EXPERT[branch]
  ) {
    // jahan Expert allowed hi nahi wahan Expert party styles ka price mat do
    return null;
  }

  const row = (PRICE[category] as Record<string, PriceRow>)[normalized];
  const val = row?.[branch];

  return typeof val === "number" ? val : null;
}

// same object ko aur naam se export kar rahe hain
export const makeupRates = PRICE;

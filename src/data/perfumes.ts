// Re-export types and data from database.ts so all components can import from "@/data/perfumes"
export { PERFUMES } from "./database";
export type { Perfume, NoteDetail, SeasonData } from "./database";

import { PERFUMES } from "./database";
import { ACCORDS_LIBRARY, detectAccordsFromNotes } from "./accords";
import { PARFUM_ACCORDS } from "./parfumAccords";

// Additional type aliases used by components
export type Gender = "homme" | "femme" | "unisexe";
export type NoteCategory = string;
export const NOTE_LABELS: Record<string, string> = {
  top: "Notes de tête",
  heart: "Notes de cœur",
  base: "Notes de fond",
};

// ── Mapping famille → accords ──
const FAMILY_TO_ACCORDS: Record<string, string[]> = {
  hesperides: ["citrus", "bergamot", "fresh"],
  aromatiques: ["aromatic", "herbal", "lavender"],
  marines: ["marine", "ozonic", "aquatic"],
  "epices-fraiches": ["fresh_spicy", "pink_pepper", "spicy"],
  "fruits-legers": ["fruity", "fresh"],
  florales: ["floral", "white_floral", "rose", "jasmine"],
  fruitees: ["fruity", "sweet", "tropical"],
  "epices-chaudes": ["spicy", "warm_spicy", "cinnamon"],
  "notes-vertes": ["green", "herbal"],
  epicees: ["spicy", "warm_spicy", "fresh_spicy"],
  musquees: ["musky", "powdery", "clean"],
  boisees: ["woody", "cedar", "sandalwood", "vetiver"],
  ambrees: ["amber", "amber_woody", "oriental"],
  gourmandes: ["sweet", "vanilla", "tonka_bean", "gourmand"],
  mousses: ["mossy", "earthy", "oakmoss"],
};

// ── Boost par atmosphère ──
const ATMOSPHERE_ACCORD_BOOST: Record<string, string[]> = {
  "soiree-gala": ["oriental", "amber", "sweet", "leather", "oud", "smoky"],
  business: ["woody", "aromatic", "citrus", "fresh", "clean"],
  "casual-weekend": ["fresh", "citrus", "fruity", "marine", "green"],
  romantique: ["floral", "sweet", "musky", "vanilla", "rose"],
  sport: ["fresh", "citrus", "marine", "aromatic", "clean"],
  voyage: ["woody", "spicy", "amber", "oriental", "earthy"],
};

// ── Résolution accords d'un parfum ──
function getPerfumeAccords(perfumeId: string, notes: string[]): string[] {
  const manual = PARFUM_ACCORDS[perfumeId];
  if (manual && manual.length > 0) return manual;
  return detectAccordsFromNotes(notes);
}

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>,
  atmosphere?: string
): { perfume: any; matchPercent: number }[] {

  // ── 1. FILTRAGE GENRE ──────────────────────────────────────
  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    const g = gender.toLowerCase();
    const pg = p.gender.toLowerCase();
    if (g === "homme") return pg === "homme" || pg === "unisexe";
    if (g === "femme") return pg === "femme" || pg === "unisexe";
    return true;
  });

  // ── 2. SAISON ACTUELLE ────────────────────────────────────
  const month = new Date().getMonth();
  const currentSeason: keyof typeof candidates[0]["seasonData"] =
    month >= 2 && month <= 4 ? "spring" :
    month >= 5 && month <= 7 ? "summer" :
    month >= 8 && month <= 10 ? "autumn" : "winter";

  // ── 3. PROFIL UTILISATEUR ─────────────────────────────────
  const buildWeightedAccords = (
    choices: string[],
    weight: number
  ): Map<string, number> => {
    const map = new Map<string, number>();
    choices.forEach(choice => {
      const accords = FAMILY_TO_ACCORDS[choice] || [];
      accords.forEach(acc => {
        map.set(acc, (map.get(acc) || 0) + weight);
      });
    });
    return map;
  };

  const userAccords = new Map<string, number>();
  const mergeMaps = (map: Map<string, number>) => {
    map.forEach((v, k) => {
      userAccords.set(k, (userAccords.get(k) || 0) + v);
    });
  };

  mergeMaps(buildWeightedAccords(selectedTop, 1.0));
  mergeMaps(buildWeightedAccords(selectedHeart, 1.5));
  mergeMaps(buildWeightedAccords(selectedBase, 2.0));

  const maxUserWeight = Math.max(...Array.from(userAccords.values()), 1);
  userAccords.forEach((v, k) => {
    userAccords.set(k, v / maxUserWeight);
  });

  // Intensité moyenne choisie par l'utilisateur via radar
  const avgRadarIntensity = radarIntensities
    ? Object.values(radarIntensities).reduce((a, b) => a + b, 0) /
      Object.values(radarIntensities).length
    : 0.5;

  const boostedAccords = new Set(
    atmosphere ? (ATMOSPHERE_ACCORD_BOOST[atmosphere] || []) : []
  );

  // Mapping sillage → score numérique
  const sillageScore: Record<string, number> = {
    "discret": 0.2,
    "modéré": 0.45,
    "fort": 0.7,
    "très fort": 0.9,
  };

  // ── 4. SCORING ────────────────────────────────────────────
  const scored = candidates.map((perfume) => {
    const allNotes = [
      ...perfume.topNotes,
      ...perfume.heartNotes,
      ...perfume.baseNotes,
    ];

    const perfumeAccords = getPerfumeAccords(perfume.id, allNotes);
    let score = 0;

    // A. MATCH ACCORDS (45%)
    let matchScore = 0;
    let totalScore = 0;
    userAccords.forEach((userWeight, acc) => {
      const accord = ACCORDS_LIBRARY[acc];
      if (!accord) return;
      const weight = accord.weight || 1;
      totalScore += userWeight * weight;
      if (perfumeAccords.includes(acc)) {
        matchScore += userWeight * weight;
      }
    });
    score += (totalScore > 0 ? matchScore / totalScore : 0) * 0.45;

    // B. CONTEXTE ATMOSPHÈRE (15%)
    let contextMatch = 0;
    boostedAccords.forEach(acc => {
      if (perfumeAccords.includes(acc)) {
        const accord = ACCORDS_LIBRARY[acc];
        contextMatch += accord ? accord.weight : 1;
      }
    });
    score += Math.min(contextMatch / 5, 1) * 0.15;

    // C. SAISON ACTUELLE (15%) — NOUVEAU
    const seasonScore = (perfume.seasonData[currentSeason] || 0) / 100;
    score += seasonScore * 0.15;

    // D. COHÉRENCE SILLAGE / INTENSITÉ RADAR (10%) — AMÉLIORÉ
    const perfumeSillage = sillageScore[perfume.sillage ?? "modéré"] ?? 0.45;
    const sillageMatch = 1 - Math.abs(avgRadarIntensity - perfumeSillage);
    score += sillageMatch * 0.1;

    // E. BONUS GENRE FORT (5%) — NOUVEAU
    if (gender && perfume.gender === gender) {
      score += 0.05;
    }

    // F. RICHESSE & SIGNATURE (10%)
    const richness = Math.min(perfumeAccords.length / 10, 1);
    const uniqueness =
      new Set(perfumeAccords).size / Math.max(perfumeAccords.length, 1);
    score += (richness * 0.6 + uniqueness * 0.4) * 0.1;

    // Bris d'égalité unique par parfum
    const tieBreaker =
      (perfume.seasonData[currentSeason] % 7) * 0.001 +
      (perfume.topNotes.length * 0.002) +
      (perfume.baseNotes.length * 0.001) +
      (sillageScore[perfume.sillage ?? "modéré"] * 0.003);

    return {
      perfume,
      matchPercent: Math.min(Math.round((score + tieBreaker) * 100), 99),
      brand: perfume.brand,
      perfumeAccords,
    };
  });

  // ── 5. TRI ────────────────────────────────────────────────
  const sorted = scored.sort((a, b) => b.matchPercent - a.matchPercent);

  // Garantir l'unicité des scores
  const seenScores = new Set<number>();
  sorted.forEach(item => {
    let s = item.matchPercent;
    while (seenScores.has(s)) s--;
    item.matchPercent = Math.max(s, 1);
    seenScores.add(s);
  });

  // ── 6. DIVERSITÉ AMÉLIORÉE ────────────────────────────────
  const finalResults: { perfume: any; matchPercent: number }[] = [];
  const usedProfiles: string[] = [];
  const usedBrands: string[] = [];

  for (const item of sorted) {
    const signature = item.perfumeAccords.slice(0, 3).join("-");
    const brand = item.brand;

    // Max 2 parfums par marque pour la diversité
    const brandCount = usedBrands.filter(b => b === brand).length;
    if (brandCount >= 2 && finalResults.length >= 3) continue;

    if (!usedProfiles.includes(signature) || finalResults.length < 3) {
      finalResults.push({
        perfume: item.perfume,
        matchPercent: item.matchPercent,
      });
      usedProfiles.push(signature);
      usedBrands.push(brand);
    }

    if (finalResults.length === 8) break;
  }

  return finalResults;
}

import { PERFUMES as DB_PERFUMES } from "./database";
import { ACCORDS_LIBRARY } from "./ACCORDS_LIBRARY";

export const PERFUMES = DB_PERFUMES;

export type NoteCategory = string;
export type Gender = "homme" | "femme" | "unisexe" | "mixte";

export interface NoteDetail {
  name: string;
}

export type { Perfume } from "./database";

export const NOTE_LABELS: Record<string, string> = {
  hesperides: "Hespéridés",
  aromatiques: "Aromatiques",
  marines: "Marines",
  "epices-fraiches": "Épices Fraîches",
  "fruits-legers": "Fruits Légers",
  florales: "Florales",
  fruitees: "Fruités",
  "epices-chaudes": "Épices Chaudes",
  "notes-vertes": "Notes Vertes",
  boisees: "Boisées",
  ambrees: "Ambrées",
  gourmandes: "Gourmandes",
  musquees: "Musquées",
  mousses: "Mousses",
};

//
// ─────────────────────────────────────────────
// 🧠 UTILS ACCORDS
// ─────────────────────────────────────────────
//

function normalize(str: string) {
  return str.toLowerCase();
}

function generateAccordsFromNotes(perfume: any): string[] {
  const notes = [
    ...(perfume.topNotesDetailed || []),
    ...(perfume.heartNotesDetailed || []),
    ...(perfume.baseNotesDetailed || []),
  ].map((n: any) => normalize(n.name));

  const matchedAccords = new Set<string>();

  Object.entries(ACCORDS_LIBRARY).forEach(([key, accord]: any) => {
    const label = normalize(accord.label);

    notes.forEach((note) => {
      if (
        note.includes(label) ||
        label.includes(note)
      ) {
        matchedAccords.add(key);
      }
    });
  });

  return Array.from(matchedAccords);
}

//
// ─────────────────────────────────────────────
// 🔥 ENRICHISSEMENT AUTO DES PARFUMS
// ─────────────────────────────────────────────
//

export const ENRICHED_PERFUMES = PERFUMES.map((perfume: any) => ({
  ...perfume,
  accords: generateAccordsFromNotes(perfume),
}));

//
// ─────────────────────────────────────────────
// 🚀 MATCHING V4 HYBRIDE PRO
// ─────────────────────────────────────────────
//

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>,
  atmosphere?: string
): { perfume: any; matchPercent: number }[] {

  const selectedIngredients = [
    ...selectedTop,
    ...selectedHeart,
    ...selectedBase,
  ].map((i) => i.toLowerCase());

  if (selectedIngredients.length === 0) return [];

  const ATMOSPHERE_BOOST: Record<string, string[]> = {
    soir: ["amber", "warm_spicy", "musky", "woody"],
    quotidien: ["fresh", "citrus", "floral", "fruity"],
    business: ["woody", "aromatic", "musky"],
    rendezvous: ["floral", "sweet", "musky"],
  };

  const boostedAccords = atmosphere
    ? ATMOSPHERE_BOOST[atmosphere] || []
    : [];

  const candidates = ENRICHED_PERFUMES.filter((p: any) => {
    if (!gender) return true;

    const g = gender.toLowerCase();
    const pg = p.gender.toLowerCase();

    if (g === "homme") return pg === "homme" || pg === "unisexe";
    if (g === "femme") return pg === "femme" || pg === "unisexe";

    return true;
  });

  const results = candidates
    .map((perfume: any) => {

      const top = (perfume.topNotesDetailed || []).map((n: any) =>
        n.name.toLowerCase()
      );
      const heart = (perfume.heartNotesDetailed || []).map((n: any) =>
        n.name.toLowerCase()
      );
      const base = (perfume.baseNotesDetailed || []).map((n: any) =>
        n.name.toLowerCase()
      );
      const accords = perfume.accords || [];

      let score = 0;
      const maxScore = selectedIngredients.length;

      selectedIngredients.forEach((note) => {
        let noteScore = 0;

        // 🎯 priorité pyramidale
        if (base.includes(note)) noteScore = 1.0;
        else if (heart.includes(note)) noteScore = 0.8;
        else if (top.includes(note)) noteScore = 0.6;

        // 🎚️ radar
        const radarBoost = radarIntensities?.[note]
          ? 0.5 + radarIntensities[note]
          : 1;

        score += noteScore * radarBoost;

        // 💎 bonus accord
        if (accords.some((acc: string) => acc.includes(note))) {
          score += 0.2;
        }
      });

      // 🌙 bonus atmosphère
      boostedAccords.forEach((acc) => {
        if (accords.includes(acc)) {
          score += 0.3;
        }
      });

      const percent = Math.round((score / maxScore) * 100);

      return {
        perfume,
        matchPercent: percent,
      };
    })
    .filter((r) => r.matchPercent > 0) // 🔒 strict
    .sort((a, b) => b.matchPercent - a.matchPercent);

  return results;
}

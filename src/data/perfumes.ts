import { PERFUMES } from "./database";

export type NoteCategory =
  | "hesperides"
  | "aromatiques"
  | "marines"
  | "epices-fraiches"
  | "fruits-legers"
  | "florales"
  | "fruitees"
  | "epices-chaudes"
  | "notes-vertes"
  | "boisees"
  | "ambrees"
  | "gourmandes"
  | "musquees"
  | "mousses";

export type Gender = "homme" | "femme" | "mixte";

export interface NoteDetail {
  name: string;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  year: number;
  concentration: string;
  description: string;
  topNotes: NoteCategory[];
  heartNotes: NoteCategory[];
  baseNotes: NoteCategory[];
  topNotesDetailed: NoteDetail[];
  heartNotesDetailed: NoteDetail[];
  baseNotesDetailed: NoteDetail[];
}

export const NOTE_LABELS: Record<NoteCategory, string> = {
  hesperides: "Hespéridés (Agrumes)",
  aromatiques: "Aromatiques (Herbes)",
  marines: "Marines / Aquatiques",
  "epices-fraiches": "Épices Fraîches",
  "fruits-legers": "Fruits Légers",
  florales: "Florales (Jasmin, Rose, Iris)",
  fruitees: "Fruités (Rouges, Jaunes)",
  "epices-chaudes": "Épices Chaudes",
  "notes-vertes": "Notes Vertes",
  boisees: "Boisées (Santal, Oud, Cèdre)",
  ambrees: "Ambrées & Résines",
  gourmandes: "Gourmandes (Vanille, Caramel)",
  musquees: "Musquées & Animales",
  mousses: "Mousses",
};

export const TOP_NOTES: NoteCategory[] = [
  "hesperides", "aromatiques", "marines", "epices-fraiches", "fruits-legers",
];

export const HEART_NOTES: NoteCategory[] = [
  "florales", "fruitees", "epices-chaudes", "notes-vertes",
];

export const BASE_NOTES: NoteCategory[] = [
  "boisees", "ambrees", "gourmandes", "musquees", "mousses",
];

export function matchPerfumes(
  gender: Gender | null,
  selectedTop: NoteCategory[],
  selectedHeart: NoteCategory[],
  selectedBase: NoteCategory[]
): { perfume: Perfume; matchPercent: number }[] {

  const candidates = gender
    ? PERFUMES.filter((p) => p.gender === gender || p.gender === "mixte")
    : PERFUMES;

  const userSelection = [...selectedTop, ...selectedHeart, ...selectedBase];

  const scored = candidates
    .map((perfume) => {
      // On récupère toutes les catégories de notes uniques qui COMPOSENT le parfum
      const perfumeCategories = Array.from(new Set([
        ...perfume.topNotes,
        ...perfume.heartNotes,
        ...perfume.baseNotes
      ]));

      // On compte combien de ces catégories l'utilisateur a sélectionnées
      const matches = perfumeCategories.filter((cat) => userSelection.includes(cat));
      
      if (matches.length === 0) return null;

      // Logique : (Catégories trouvées / Total catégories du parfum) * 100
      const matchPercent = Math.round((matches.length / perfumeCategories.length) * 100);

      return { perfume, matchPercent };
    })
    .filter((item): item is { perfume: Perfume; matchPercent: number } => item !== null);

  // Tri par pourcentage et on retourne le top 3
  return scored
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3);
}

// On exporte aussi la liste brute pour les autres composants (comme le catalogue)
export { PERFUMES };

import { PERFUMES } from "./database";
export { PERFUMES };

export type NoteCategory =
  | "hesperides" | "aromatiques" | "marines" | "epices-fraiches"
  | "fruits-legers" | "florales" | "fruitees" | "epices-chaudes"
  | "notes-vertes" | "boisees" | "ambrees" | "gourmandes"
  | "musquees" | "mousses";

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
  image?: string; 
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

/**
 * Calcule les meilleures correspondances selon les choix de l'utilisateur
 */
export function matchPerfumes(
  gender: Gender | null,
  selectedTop: NoteCategory[],
  selectedHeart: NoteCategory[],
  selectedBase: NoteCategory[]
): { perfume: Perfume; matchPercent: number }[] {

  // 1. Filtrage par genre
  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    if (gender === "homme") return p.gender === "homme" || p.gender === "mixte";
    if (gender === "femme") return p.gender === "femme" || p.gender === "mixte";
    return p.gender === "mixte";
  });

  const userSelection = [...selectedTop, ...selectedHeart, ...selectedBase];

  // 2. Calcul du score de matching
  const scored = candidates
    .map((perfume) => {
      // On crée un set des catégories présentes dans le parfum pour éviter les doublons
      const perfumeCategories = Array.from(new Set([
        ...perfume.topNotes,
        ...perfume.heartNotes,
        ...perfume.baseNotes
      ]));

      // On compte combien de catégories choisies par l'utilisateur sont dans ce parfum
      const matches = perfumeCategories.filter((cat) => userSelection.includes(cat));
      
      if (matches.length === 0) return null;

      // Calcul du pourcentage (règle de trois simple)
      const matchPercent = Math.round((matches.length / perfumeCategories.length) * 100);
      
      return { perfume, matchPercent };
    })
    .filter((item): item is { perfume: Perfume; matchPercent: number } => item !== null);

  // 3. Tri et retour des 3 meilleurs
  // IMPORTANT : On utilise [...scored].sort() car .sort() modifie le tableau original. 
  // Cela remplace e.toSorted() pour une compatibilité totale.
  return [...scored]
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3);
}

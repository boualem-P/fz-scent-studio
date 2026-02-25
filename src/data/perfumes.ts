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

export const PERFUMES: Perfume[] = [
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "mixte",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un élixir lumineux où le safran et le jasmin dansent sur un lit d'ambre et de cèdre, laissant un sillage inoubliable de douceur cristalline.",
    topNotes: ["epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [{ name: "Safran" }],
    heartNotesDetailed: [{ name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Ambre" }, { name: "Cèdre" }, { name: "Fève Tonka" }],
  },
  {
    id: "sauvage",
    name: "Sauvage",
    brand: "Dior",
    gender: "homme",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un souffle de liberté brute. La bergamote explose sur un cœur poivré, ancré dans un ambroxan profond évoquant les grands espaces sauvages.",
    topNotes: ["hesperides", "epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [{ name: "Bergamote" }, { name: "Poivre" }],
    heartNotesDetailed: [{ name: "Poivre de Sichuan" }, { name: "Lavande" }],
    baseNotesDetailed: [{ name: "Ambroxan" }, { name: "Cèdre" }],
  },
  {
    id: "aventus",
    name: "Aventus",
    brand: "Creed",
    gender: "homme",
    year: 2010,
    concentration: "Eau de Parfum",
    description: "L'incarnation du succès. L'ananas fumé rencontre le bouleau et le musc, créant une signature de puissance et de raffinement absolu.",
    topNotes: ["fruits-legers", "hesperides"],
    heartNotes: ["florales", "notes-vertes"],
    baseNotes: ["boisees", "musquees"],
    topNotesDetailed: [{ name: "Ananas" }, { name: "Bergamote" }, { name: "Pomme" }],
    heartNotesDetailed: [{ name: "Rose" }, { name: "Bouleau" }],
    baseNotesDetailed: [{ name: "Musc" }, { name: "Mousse de Chêne" }, { name: "Patchouli" }],
  },
  {
    id: "chanel-n5",
    name: "N°5",
    brand: "Chanel",
    gender: "femme",
    year: 1921,
    concentration: "Eau de Parfum",
    description: "L'essence éternelle de la féminité. Un bouquet d'aldéhydes floraux qui transcende le temps, porté par le ylang-ylang et le santal crémeux.",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales"],
    baseNotes: ["boisees", "gourmandes"],
    topNotesDetailed: [{ name: "Aldéhydes" }, { name: "Néroli" }],
    heartNotesDetailed: [{ name: "Ylang-Ylang" }, { name: "Rose" }, { name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Santal" }, { name: "Vanille" }],
  },
  {
    id: "libre",
    name: "Libre",
    brand: "Yves Saint Laurent",
    gender: "femme",
    year: 2019,
    concentration: "Eau de Parfum",
    description: "L'audace au féminin. La lavande française s'allie à la fleur d'oranger marocaine pour un contraste saisissant de fraîcheur et de chaleur.",
    topNotes: ["aromatiques", "hesperides"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
    topNotesDetailed: [{ name: "Lavande" }, { name: "Mandarine" }],
    heartNotesDetailed: [{ name: "Fleur d'Oranger" }, { name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Musc" }, { name: "Cèdre" }],
  },
  {
    id: "oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    gender: "mixte",
    year: 2007,
    concentration: "Eau de Parfum",
    description: "Un voyage mystique à travers les forêts anciennes. Le oud rare se mêle au santal et au vétiver pour une élégance boisée incomparable.",
    topNotes: ["epices-fraiches"],
    heartNotes: ["epices-chaudes", "notes-vertes"],
    baseNotes: ["boisees", "ambrees"],
    topNotesDetailed: [{ name: "Cardamome" }, { name: "Poivre Rose" }],
    heartNotesDetailed: [{ name: "Oud" }, { name: "Palissandre" }],
    baseNotesDetailed: [{ name: "Santal" }, { name: "Vétiver" }, { name: "Ambre" }],
  },
  {
    id: "la-nuit-de-lhomme",
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    gender: "homme",
    year: 2009,
    concentration: "Eau de Toilette",
    description: "La séduction incarnée. Le cardamome électrise la lavande, tandis que le cèdre et le vétiver tissent un voile nocturne envoûtant.",
    topNotes: ["epices-fraiches", "aromatiques"],
    heartNotes: ["epices-chaudes", "florales"],
    baseNotes: ["boisees", "gourmandes"],
    topNotesDetailed: [{ name: "Cardamome" }, { name: "Lavande" }],
    heartNotesDetailed: [{ name: "Cèdre" }, { name: "Vétiver" }],
    baseNotesDetailed: [{ name: "Coumarine" }, { name: "Tonka" }],
  },
  {
    id: "black-opium",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    gender: "femme",
    year: 2014,
    concentration: "Eau de Parfum",
    description: "Une addiction raffinée. Le café noir s'entrelace avec la vanille et la fleur d'oranger pour un cocktail nocturne irrésistible et glamour.",
    topNotes: ["fruits-legers", "epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
    topNotesDetailed: [{ name: "Café" }, { name: "Poivre Rose" }],
    heartNotesDetailed: [{ name: "Fleur d'Oranger" }, { name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Patchouli" }, { name: "Cèdre" }],
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    gender: "homme",
    year: 2010,
    concentration: "Eau de Parfum",
    description: "La liberté masculine sublimée. Les agrumes vibrants cèdent la place au bois de santal, créant une aura de confiance magnétique.",
    topNotes: ["hesperides", "aromatiques"],
    heartNotes: ["epices-chaudes", "notes-vertes"],
    baseNotes: ["boisees", "musquees"],
    topNotesDetailed: [{ name: "Citron" }, { name: "Menthe" }, { name: "Pamplemousse" }],
    heartNotesDetailed: [{ name: "Gingembre" }, { name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Santal" }, { name: "Cèdre" }, { name: "Encens" }],
  },
  {
    id: "tobacco-vanille",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    gender: "mixte",
    year: 2007,
    concentration: "Eau de Parfum",
    description: "L'opulence incarnée. Le tabac enveloppé de vanille, de cacao et d'épices orientales compose un parfum d'une richesse intoxicante.",
    topNotes: ["epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["gourmandes", "ambrees", "mousses"],
    topNotesDetailed: [{ name: "Tabac" }, { name: "Épices" }],
    heartNotesDetailed: [{ name: "Cacao" }, { name: "Fleur de Tabac" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Tonka" }, { name: "Miel" }],
  },
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

  const scored = candidates.map((perfume) => {
    let score = 0;
    let total = 0;

    if (selectedTop.length > 0) {
      const topHits = selectedTop.filter((n) =>
        perfume.topNotes.includes(n)
      ).length;
      score += topHits;
      total += selectedTop.length;
    }

    if (selectedHeart.length > 0) {
      const heartHits = selectedHeart.filter((n) =>
        perfume.heartNotes.includes(n)
      ).length;
      score += heartHits * 1.2;
      total += selectedHeart.length * 1.2;
    }

    if (selectedBase.length > 0) {
      const baseHits = selectedBase.filter((n) =>
        perfume.baseNotes.includes(n)
      ).length;
      score += baseHits * 1.5;
      total += selectedBase.length * 1.5;
    }

    const matchPercent =
      total > 0 ? Math.round((score / total) * 100) : 50;

    return { perfume, matchPercent };
  });

  return scored
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3);
}

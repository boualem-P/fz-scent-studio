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

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  description: string;
  imageUrl: string;
  topNotes: NoteCategory[];
  heartNotes: NoteCategory[];
  baseNotes: NoteCategory[];
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
  "hesperides",
  "aromatiques",
  "marines",
  "epices-fraiches",
  "fruits-legers",
];

export const HEART_NOTES: NoteCategory[] = [
  "florales",
  "fruitees",
  "epices-chaudes",
  "notes-vertes",
];

export const BASE_NOTES: NoteCategory[] = [
  "boisees",
  "ambrees",
  "gourmandes",
  "musquees",
  "mousses",
];

export const PERFUMES: Perfume[] = [
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "mixte",
    description:
      "Un élixir lumineux où le safran et le jasmin dansent sur un lit d'ambre et de cèdre, laissant un sillage inoubliable de douceur cristalline.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.36500.jpg",
    topNotes: ["epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["ambrees", "boisees"],
  },
  {
    id: "sauvage",
    name: "Sauvage",
    brand: "Dior",
    gender: "homme",
    description:
      "Un souffle de liberté brute. La bergamote explose sur un cœur poivré, ancré dans un ambroxan profond évoquant les grands espaces sauvages.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.31861.jpg",
    topNotes: ["hesperides", "epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["ambrees", "boisees"],
  },
  {
    id: "aventus",
    name: "Aventus",
    brand: "Creed",
    gender: "homme",
    description:
      "L'incarnation du succès. L'ananas fumé rencontre le bouleau et le musc, créant une signature de puissance et de raffinement absolu.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    topNotes: ["fruits-legers", "hesperides"],
    heartNotes: ["florales", "notes-vertes"],
    baseNotes: ["boisees", "musquees"],
  },
  {
    id: "chanel-n5",
    name: "N°5",
    brand: "Chanel",
    gender: "femme",
    description:
      "L'essence éternelle de la féminité. Un bouquet d'aldéhydes floraux qui transcende le temps, porté par le ylang-ylang et le santal crémeux.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.46404.jpg",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales"],
    baseNotes: ["boisees", "gourmandes"],
  },
  {
    id: "libre",
    name: "Libre",
    brand: "Yves Saint Laurent",
    gender: "femme",
    description:
      "L'audace au féminin. La lavande française s'allie à la fleur d'oranger marocaine pour un contraste saisissant de fraîcheur et de chaleur.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.58090.jpg",
    topNotes: ["aromatiques", "hesperides"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
  },
  {
    id: "oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    gender: "mixte",
    description:
      "Un voyage mystique à travers les forêts anciennes. Le oud rare se mêle au santal et au vétiver pour une élégance boisée incomparable.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.6981.jpg",
    topNotes: ["epices-fraiches"],
    heartNotes: ["epices-chaudes", "notes-vertes"],
    baseNotes: ["boisees", "ambrees"],
  },
  {
    id: "la-nuit-de-lhomme",
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    gender: "homme",
    description:
      "La séduction incarnée. Le cardamome électrise la lavande, tandis que le cèdre et le vétiver tissent un voile nocturne envoûtant.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.5935.jpg",
    topNotes: ["epices-fraiches", "aromatiques"],
    heartNotes: ["epices-chaudes", "florales"],
    baseNotes: ["boisees", "gourmandes"],
  },
  {
    id: "black-opium",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    gender: "femme",
    description:
      "Une addiction raffinée. Le café noir s'entrelace avec la vanille et la fleur d'oranger pour un cocktail nocturne irrésistible et glamour.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.25324.jpg",
    topNotes: ["fruits-legers", "epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    gender: "homme",
    description:
      "La liberté masculine sublimée. Les agrumes vibrants cèdent la place au bois de santal, créant une aura de confiance magnétique.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.25967.jpg",
    topNotes: ["hesperides", "aromatiques"],
    heartNotes: ["epices-chaudes", "notes-vertes"],
    baseNotes: ["boisees", "musquees"],
  },
  {
    id: "acqua-di-gio",
    name: "Acqua di Giò Profondo",
    brand: "Giorgio Armani",
    gender: "homme",
    description:
      "L'immensité de l'océan capturée. Les notes aquatiques et l'ambre minéral créent une sensation de plongée dans les eaux cristallines.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.60219.jpg",
    topNotes: ["marines", "hesperides"],
    heartNotes: ["aromatiques" as NoteCategory, "notes-vertes"],
    baseNotes: ["ambrees", "musquees"],
  },
  {
    id: "miss-dior",
    name: "Miss Dior",
    brand: "Dior",
    gender: "femme",
    description:
      "Un jardin en fleurs au crépuscule. La rose de Grasse et le muguet s'épanouissent sur un fond boisé délicat, symbole de grâce intemporelle.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.79882.jpg",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales", "fruitees"],
    baseNotes: ["musquees", "boisees"],
  },
  {
    id: "tobacco-vanille",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    gender: "mixte",
    description:
      "L'opulence incarnée. Le tabac enveloppé de vanille, de cacao et d'épices orientales compose un parfum d'une richesse intoxicante.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1825.jpg",
    topNotes: ["epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["gourmandes", "ambrees", "mousses"],
  },
  {
    id: "la-vie-est-belle",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    gender: "femme",
    description:
      "Un hymne au bonheur. L'iris et le patchouli se fondent dans un tourbillon de praline et de vanille, un sourire olfactif inoubliable.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.17035.jpg",
    topNotes: ["fruits-legers", "hesperides"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
  },
  {
    id: "gentleman-givenchy",
    name: "Gentleman",
    brand: "Givenchy",
    gender: "homme",
    description:
      "L'élégance masculine dans sa forme la plus pure. La lavande et l'iris dansent sur un accord boisé profond de patchouli crémeux.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.44239.jpg",
    topNotes: ["aromatiques", "epices-fraiches"],
    heartNotes: ["florales", "epices-chaudes"],
    baseNotes: ["boisees", "gourmandes"],
  },
  {
    id: "coco-mademoiselle",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    gender: "femme",
    description:
      "L'esprit libre et audacieux. L'orange fraîche et le jasmin absolu s'entrelacent avec le patchouli et le vétiver pour une féminité moderne.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales", "fruitees"],
    baseNotes: ["boisees", "musquees"],
  },
];

export function matchPerfumes(
  gender: Gender,
  selectedTop: NoteCategory[],
  selectedHeart: NoteCategory[],
  selectedBase: NoteCategory[]
): { perfume: Perfume; matchPercent: number }[] {
  const candidates = PERFUMES.filter((p) => p.gender === gender || p.gender === "mixte");

  const scored = candidates.map((perfume) => {
    let score = 0;
    let total = 0;

    // Top notes (weight 1)
    if (selectedTop.length > 0) {
      const topHits = selectedTop.filter((n) => perfume.topNotes.includes(n)).length;
      score += topHits;
      total += selectedTop.length;
    }

    // Heart notes (weight 1.2)
    if (selectedHeart.length > 0) {
      const heartHits = selectedHeart.filter((n) => perfume.heartNotes.includes(n)).length;
      score += heartHits * 1.2;
      total += selectedHeart.length * 1.2;
    }

    // Base notes (weight 1.5)
    if (selectedBase.length > 0) {
      const baseHits = selectedBase.filter((n) => perfume.baseNotes.includes(n)).length;
      score += baseHits * 1.5;
      total += selectedBase.length * 1.5;
    }

    const matchPercent = total > 0 ? Math.round((score / total) * 100) : 0;
    return { perfume, matchPercent };
  });

  return scored
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3)
    .map((s) => ({
      ...s,
      matchPercent: Math.max(s.matchPercent, 30 + Math.floor(Math.random() * 15)),
    }));
}

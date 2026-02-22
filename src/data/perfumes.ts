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
  imageUrl: string;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  year: number;
  concentration: string;
  description: string;
  imageUrl: string;
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
    year: 2015,
    concentration: "Eau de Parfum",
    description:
      "Un élixir lumineux où le safran et le jasmin dansent sur un lit d'ambre et de cèdre, laissant un sillage inoubliable de douceur cristalline.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.36500.jpg",
    topNotes: ["epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [
      { name: "Safran", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Ambre", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Cèdre", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Fève Tonka", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "sauvage",
    name: "Sauvage",
    brand: "Dior",
    gender: "homme",
    year: 2015,
    concentration: "Eau de Parfum",
    description:
      "Un souffle de liberté brute. La bergamote explose sur un cœur poivré, ancré dans un ambroxan profond évoquant les grands espaces sauvages.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.31861.jpg",
    topNotes: ["hesperides", "epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [
      { name: "Bergamote", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
      { name: "Poivre", imageUrl: "https://images.unsplash.com/photo-1599909533601-aa23a1b5c05a?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Poivre de Sichuan", imageUrl: "https://images.unsplash.com/photo-1599909533601-aa23a1b5c05a?w=200&h=200&fit=crop" },
      { name: "Lavande", imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Ambroxan", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Cèdre", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "aventus",
    name: "Aventus",
    brand: "Creed",
    gender: "homme",
    year: 2010,
    concentration: "Eau de Parfum",
    description:
      "L'incarnation du succès. L'ananas fumé rencontre le bouleau et le musc, créant une signature de puissance et de raffinement absolu.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    topNotes: ["fruits-legers", "hesperides"],
    heartNotes: ["florales", "notes-vertes"],
    baseNotes: ["boisees", "musquees"],
    topNotesDetailed: [
      { name: "Ananas", imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200&h=200&fit=crop" },
      { name: "Bergamote", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
      { name: "Pomme", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Rose", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Bouleau", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Musc", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Mousse de Chêne", imageUrl: "https://images.unsplash.com/photo-1518882515-9e96a9a6da67?w=200&h=200&fit=crop" },
      { name: "Patchouli", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "chanel-n5",
    name: "N°5",
    brand: "Chanel",
    gender: "femme",
    year: 1921,
    concentration: "Eau de Parfum",
    description:
      "L'essence éternelle de la féminité. Un bouquet d'aldéhydes floraux qui transcende le temps, porté par le ylang-ylang et le santal crémeux.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.46404.jpg",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales"],
    baseNotes: ["boisees", "gourmandes"],
    topNotesDetailed: [
      { name: "Aldéhydes", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
      { name: "Néroli", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Ylang-Ylang", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Rose", imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=200&h=200&fit=crop" },
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Santal", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Vanille", imageUrl: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "libre",
    name: "Libre",
    brand: "Yves Saint Laurent",
    gender: "femme",
    year: 2019,
    concentration: "Eau de Parfum",
    description:
      "L'audace au féminin. La lavande française s'allie à la fleur d'oranger marocaine pour un contraste saisissant de fraîcheur et de chaleur.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.58090.jpg",
    topNotes: ["aromatiques", "hesperides"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
    topNotesDetailed: [
      { name: "Lavande", imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=200&h=200&fit=crop" },
      { name: "Mandarine", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Fleur d'Oranger", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Vanille", imageUrl: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=200&h=200&fit=crop" },
      { name: "Musc", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Cèdre", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    gender: "mixte",
    year: 2007,
    concentration: "Eau de Parfum",
    description:
      "Un voyage mystique à travers les forêts anciennes. Le oud rare se mêle au santal et au vétiver pour une élégance boisée incomparable.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.6981.jpg",
    topNotes: ["epices-fraiches"],
    heartNotes: ["epices-chaudes", "notes-vertes"],
    baseNotes: ["boisees", "ambrees"],
    topNotesDetailed: [
      { name: "Cardamome", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
      { name: "Poivre Rose", imageUrl: "https://images.unsplash.com/photo-1599909533601-aa23a1b5c05a?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Oud", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Palissandre", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Santal", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Vétiver", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
      { name: "Ambre", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "la-nuit-de-lhomme",
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    gender: "homme",
    year: 2009,
    concentration: "Eau de Toilette",
    description:
      "La séduction incarnée. Le cardamome électrise la lavande, tandis que le cèdre et le vétiver tissent un voile nocturne envoûtant.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.5935.jpg",
    topNotes: ["epices-fraiches", "aromatiques"],
    heartNotes: ["epices-chaudes", "florales"],
    baseNotes: ["boisees", "gourmandes"],
    topNotesDetailed: [
      { name: "Cardamome", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
      { name: "Lavande", imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Cèdre", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Vétiver", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Coumarine", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop" },
      { name: "Tonka", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "black-opium",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    gender: "femme",
    year: 2014,
    concentration: "Eau de Parfum",
    description:
      "Une addiction raffinée. Le café noir s'entrelace avec la vanille et la fleur d'oranger pour un cocktail nocturne irrésistible et glamour.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.25324.jpg",
    topNotes: ["fruits-legers", "epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
    topNotesDetailed: [
      { name: "Café", imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop" },
      { name: "Poivre Rose", imageUrl: "https://images.unsplash.com/photo-1599909533601-aa23a1b5c05a?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Fleur d'Oranger", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Vanille", imageUrl: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=200&h=200&fit=crop" },
      { name: "Patchouli", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
      { name: "Cèdre", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    gender: "homme",
    year: 2010,
    concentration: "Eau de Parfum",
    description:
      "La liberté masculine sublimée. Les agrumes vibrants cèdent la place au bois de santal, créant une aura de confiance magnétique.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.25967.jpg",
    topNotes: ["hesperides", "aromatiques"],
    heartNotes: ["epices-chaudes", "notes-vertes"],
    baseNotes: ["boisees", "musquees"],
    topNotesDetailed: [
      { name: "Citron", imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=200&h=200&fit=crop" },
      { name: "Menthe", imageUrl: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=200&h=200&fit=crop" },
      { name: "Pamplemousse", imageUrl: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Gingembre", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&h=200&fit=crop" },
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Santal", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Cèdre", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
      { name: "Encens", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "acqua-di-gio",
    name: "Acqua di Giò Profondo",
    brand: "Giorgio Armani",
    gender: "homme",
    year: 2020,
    concentration: "Eau de Parfum",
    description:
      "L'immensité de l'océan capturée. Les notes aquatiques et l'ambre minéral créent une sensation de plongée dans les eaux cristallines.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.60219.jpg",
    topNotes: ["marines", "hesperides"],
    heartNotes: ["aromatiques" as NoteCategory, "notes-vertes"],
    baseNotes: ["ambrees", "musquees"],
    topNotesDetailed: [
      { name: "Bergamote", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
      { name: "Notes Aquatiques", imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Romarin", imageUrl: "https://images.unsplash.com/photo-1515586000433-45c4a8c7c4a8?w=200&h=200&fit=crop" },
      { name: "Lavande", imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Ambre", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Musc", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Patchouli", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "miss-dior",
    name: "Miss Dior",
    brand: "Dior",
    gender: "femme",
    year: 2017,
    concentration: "Eau de Parfum",
    description:
      "Un jardin en fleurs au crépuscule. La rose de Grasse et le muguet s'épanouissent sur un fond boisé délicat, symbole de grâce intemporelle.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.79882.jpg",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales", "fruitees"],
    baseNotes: ["musquees", "boisees"],
    topNotesDetailed: [
      { name: "Mandarine", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
      { name: "Poire", imageUrl: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Rose", imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=200&h=200&fit=crop" },
      { name: "Pivoine", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Iris", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Musc", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
      { name: "Bois de Rose", imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "tobacco-vanille",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    gender: "mixte",
    year: 2007,
    concentration: "Eau de Parfum",
    description:
      "L'opulence incarnée. Le tabac enveloppé de vanille, de cacao et d'épices orientales compose un parfum d'une richesse intoxicante.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1825.jpg",
    topNotes: ["epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["gourmandes", "ambrees", "mousses"],
    topNotesDetailed: [
      { name: "Tabac", imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop" },
      { name: "Épices", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Cacao", imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=200&h=200&fit=crop" },
      { name: "Fleur de Tabac", imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Vanille", imageUrl: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=200&h=200&fit=crop" },
      { name: "Tonka", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop" },
      { name: "Miel", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "la-vie-est-belle",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    gender: "femme",
    year: 2012,
    concentration: "Eau de Parfum",
    description:
      "Un hymne au bonheur. L'iris et le patchouli se fondent dans un tourbillon de praline et de vanille, un sourire olfactif inoubliable.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.17035.jpg",
    topNotes: ["fruits-legers", "hesperides"],
    heartNotes: ["florales"],
    baseNotes: ["gourmandes", "ambrees"],
    topNotesDetailed: [
      { name: "Cassis", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop" },
      { name: "Poire", imageUrl: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Iris", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Praline", imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=200&h=200&fit=crop" },
      { name: "Vanille", imageUrl: "https://images.unsplash.com/photo-1631206753348-db44968fd440?w=200&h=200&fit=crop" },
      { name: "Patchouli", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "gentleman-givenchy",
    name: "Gentleman",
    brand: "Givenchy",
    gender: "homme",
    year: 2018,
    concentration: "Eau de Parfum",
    description:
      "L'élégance masculine dans sa forme la plus pure. La lavande et l'iris dansent sur un accord boisé profond de patchouli crémeux.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.44239.jpg",
    topNotes: ["aromatiques", "epices-fraiches"],
    heartNotes: ["florales", "epices-chaudes"],
    baseNotes: ["boisees", "gourmandes"],
    topNotesDetailed: [
      { name: "Lavande", imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=200&h=200&fit=crop" },
      { name: "Poivre", imageUrl: "https://images.unsplash.com/photo-1599909533601-aa23a1b5c05a?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Iris", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Cannelle", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Patchouli", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
      { name: "Fève Tonka", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "coco-mademoiselle",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    gender: "femme",
    year: 2001,
    concentration: "Eau de Parfum",
    description:
      "L'esprit libre et audacieux. L'orange fraîche et le jasmin absolu s'entrelacent avec le patchouli et le vétiver pour une féminité moderne.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    topNotes: ["hesperides", "fruits-legers"],
    heartNotes: ["florales", "fruitees"],
    baseNotes: ["boisees", "musquees"],
    topNotesDetailed: [
      { name: "Orange", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
      { name: "Bergamote", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200&h=200&fit=crop" },
    ],
    heartNotesDetailed: [
      { name: "Rose", imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=200&h=200&fit=crop" },
      { name: "Jasmin", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop" },
      { name: "Litchi", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop" },
    ],
    baseNotesDetailed: [
      { name: "Patchouli", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
      { name: "Vétiver", imageUrl: "https://images.unsplash.com/photo-1446034295857-c899f4c1b528?w=200&h=200&fit=crop" },
      { name: "Musc", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop" },
    ],
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

    if (selectedTop.length > 0) {
      const topHits = selectedTop.filter((n) => perfume.topNotes.includes(n)).length;
      score += topHits;
      total += selectedTop.length;
    }

    if (selectedHeart.length > 0) {
      const heartHits = selectedHeart.filter((n) => perfume.heartNotes.includes(n)).length;
      score += heartHits * 1.2;
      total += selectedHeart.length * 1.2;
    }

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

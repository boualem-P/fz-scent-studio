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

// MODIFICATION 1 : Ajout de l'URL de l'image dans le détail de la note
export interface NoteDetail {
  name: string;
  image?: string; // Optionnel, sera rempli automatiquement ou manuellement
}

// Fonction utilitaire pour générer une image Unsplash réaliste selon le nom de la note
const getNoteImage = (name: string) => 
  `https://loremflickr.com/300/300/${encodeURIComponent(name.toLowerCase())},ingredient/all`;

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

export const TOP_NOTES: NoteCategory[] = ["hesperides", "aromatiques", "marines", "epices-fraiches", "fruits-legers"];
export const HEART_NOTES: NoteCategory[] = ["florales", "fruitees", "epices-chaudes", "notes-vertes"];
export const BASE_NOTES: NoteCategory[] = ["boisees", "ambrees", "gourmandes", "musquees", "mousses"];

export const PERFUMES: Perfume[] = [
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "mixte",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un élixir lumineux où le safran et le jasmin dansent sur un lit d'ambre et de cèdre.",
    topNotes: ["epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [{ name: "Safran", image: getNoteImage("Saffron") }],
    heartNotesDetailed: [{ name: "Jasmin", image: getNoteImage("Jasmine") }],
    baseNotesDetailed: [
      { name: "Ambre", image: getNoteImage("Amber") },
      { name: "Cèdre", image: getNoteImage("Cedar") },
      { name: "Fève Tonka", image: getNoteImage("Tonka Bean") }
    ],
  },
  {
    id: "sauvage",
    name: "Sauvage",
    brand: "Dior",
    gender: "homme",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un souffle de liberté brute. La bergamote explose sur un cœur poivré.",
    topNotes: ["hesperides", "epices-fraiches"],
    heartNotes: ["epices-chaudes"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [
        { name: "Bergamote", image: getNoteImage("Bergamot") },
        { name: "Poivre", image: getNoteImage("Pepper") }
    ],
    heartNotesDetailed: [
        { name: "Poivre de Sichuan", image: getNoteImage("Sichuan Pepper") },
        { name: "Lavande", image: getNoteImage("Lavender") }
    ],
    baseNotesDetailed: [
        { name: "Ambroxan", image: getNoteImage("Crystal") },
        { name: "Cèdre", image: getNoteImage("Cedar") }
    ],
  },
  // Applique le même modèle { name: "...", image: getNoteImage("...") } pour les autres parfums...
];

// ... reste de la fonction matchPerfumes (inchangée) ...

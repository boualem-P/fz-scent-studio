// src/data/database.ts
import { NOTE_TO_ACCORD_MAP, normalizeNote } from "./noteMap";

// --- INTERFACES ---

export interface NoteDetail {
  name: string;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  year: number;
  gender: "homme" | "femme" | "unisexe";
  concentration: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  topNotesDetailed: NoteDetail[];
  heartNotesDetailed: NoteDetail[];
  baseNotesDetailed: NoteDetail[];
  accords: string[];
}

// --- UTILITAIRE DE GÉNÉRATION ---

/**
 * Précharge un mapping normalisé note -> accords pour éviter de recalculer
 */
const NORMALIZED_NOTE_TO_ACCORD_MAP: Record<string, string[]> = Object.fromEntries(
  Object.entries(NOTE_TO_ACCORD_MAP).map(([note, accords]) => [normalizeNote(note), accords])
);

/**
 * Calcule les accords uniques pour un ensemble de notes détaillées
 */
function computeAccords(notesDetailed: NoteDetail[]): string[] {
  const accordsSet = new Set<string>();
  notesDetailed.forEach(({ name }) => {
    const mappedAccords = NORMALIZED_NOTE_TO_ACCORD_MAP[normalizeNote(name)];
    if (mappedAccords) {
      mappedAccords.forEach(acc => accordsSet.add(acc));
    }
  });
  return Array.from(accordsSet);
}

/**
 * Crée un parfum avec accords pré-calculés
 */
function createPerfume(data: Omit<Perfume, "accords">): Perfume {
  const allNotes = [
    ...data.topNotesDetailed,
    ...data.heartNotesDetailed,
    ...data.baseNotesDetailed,
  ];
  return {
    ...data,
    accords: computeAccords(allNotes),
  };
}

// --- BASE DE DONNÉES DES PARFUMS ---

export const PERFUMES: Perfume[] = [
  createPerfume({
    id: "j-adore-dior",
    name: "J'adore",
    brand: "Dior",
    image: "https://fimgs.net/mdimg/perfume/o.210.jpg",
    description: "Un bouquet floral unique, riche et équilibré, dont la complexité est une source d'inspiration.",
    year: 1999,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Melon", "Magnolia", "Pêche", "Mandarine", "Bergamote"],
    heartNotes: ["Jasmin", "Muguet", "Tubéreuse", "Freesia", "Rose de Damas", "Orchidée", "Prune", "Violette"],
    baseNotes: ["Musc", "Vanille", "Mûre", "Cèdre"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Melon" }, { name: "Bergamote" }],
    heartNotesDetailed: [{ name: "Jasmin" }, { name: "Tubéreuse" }, { name: "Rose de Damas" }],
    baseNotesDetailed: [{ name: "Musc" }, { name: "Vanille" }, { name: "Cèdre" }],
  }),
  createPerfume({
    id: "la-vie-est-belle",
    name: "La Vie est Belle",
    brand: "Lancôme",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2019/06/La-vie-est-belle-Lancome-Eau-de-parfum-1.jpg",
    description: "L'éclat d'un sourire universel, encapsulé dans un parfum de bonheur.",
    year: 2012,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Cassis", "Poire"],
    heartNotes: ["Iris", "Jasmin", "Fleur d'oranger"],
    baseNotes: ["Praline", "Vanille", "Patchouli", "Fève Tonka"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Cassis" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Praline" }, { name: "Patchouli" }, { name: "Fève Tonka" }],
  }),
  createPerfume({
    id: "black-opium",
    name: "Black Opium",
    brand: "YSL",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2019/06/Black-opium-Yves-saint-laurent-Eau-de-parfum.jpg",
    description: "Une dose d'adrénaline, pour une héroïne aussi glamour qu'impertinente.",
    year: 2014,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Poivre rose", "Fleur d'oranger"],
    heartNotes: ["Café", "Jasmin", "Amande amère", "Réglisse"],
    baseNotes: ["Vanille", "Patchouli", "Cèdre", "Bois de Cachemire"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Poivre rose" }, { name: "Fleur d'oranger" }],
    heartNotesDetailed: [{ name: "Café" }, { name: "Jasmin" }, { name: "Amande amère" }, { name: "Réglisse" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Patchouli" }, { name: "Cèdre" }, { name: "Bois de Cachemire" }],
  }),
];

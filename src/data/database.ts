// src/data/database.ts

import { RAW_PERFUMES } from "./perfumes.raw";
import { buildPerfume } from "./perfumeBuilder";

// --- INTERFACES (Définies ici pour éviter les boucles d'import) ---

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

// --- GÉNÉRATION DE LA DATABASE FINALE ---

/**
 * On transforme chaque parfum "RAW" en parfum complet avec accords calculés.
 * Le .map(buildPerfume) exécute la logique de perfumeBuilder.ts
 */
export const PERFUMES: Perfume[] = RAW_PERFUMES.map((p) => buildPerfume(p));

/**
 * Note pour Lovable : 
 * Si tu ajoutes un nouveau parfum, fais-le dans perfumes.raw.ts.
 * La database se mettra à jour automatiquement ici.
 */

// src/data/database.ts

import { RAW_PERFUMES } from "./perfumes.raw";
import { buildPerfume } from "./perfumeBuilder";

// --- TYPES ---

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

// --- DATABASE FINALE (pré-calculée une fois) ---

export const PERFUMES: Perfume[] = RAW_PERFUMES.map(buildPerfume);

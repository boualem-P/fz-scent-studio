// src/data/perfumeBuilder.ts

import { NOTE_TO_ACCORD_MAP, normalizeNote } from "./noteMap";
import { NoteDetail, Perfume } from "./database";

const NORMALIZED_MAP: Record<string, string[]> = Object.fromEntries(
  Object.entries(NOTE_TO_ACCORD_MAP).map(([k, v]) => [normalizeNote(k), v])
);

export function computeAccords(notes: NoteDetail[]): string[] {
  const set = new Set<string>();

  notes.forEach(n => {
    const accords = NORMALIZED_MAP[normalizeNote(n.name)];
    if (accords) accords.forEach(a => set.add(a));
  });

  return Array.from(set);
}

export function buildPerfume(data: Omit<Perfume, "accords">): Perfume {
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

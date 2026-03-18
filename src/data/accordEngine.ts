import { NOTE_TO_ACCORD_MAP, normalizeNote } from "../data/noteMap";
import type { Perfume } from "../data/database";

/**
 * Mapping normalisé pré-calculé (évite normalize + lookup à chaque appel)
 */
const NORMALIZED_NOTE_TO_ACCORD_MAP: Record<string, string[]> = Object.fromEntries(
  Object.entries(NOTE_TO_ACCORD_MAP).map(([note, accords]) => [
    normalizeNote(note),
    accords,
  ])
);

/**
 * Retourne les accords d'un parfum
 * (calcul à la demande, optimisé et stable)
 */
export function getPerfumeAccords(perfume: Perfume): string[] {
  const accordsSet = new Set<string>();

  const allNotes = [
    ...perfume.topNotesDetailed,
    ...perfume.heartNotesDetailed,
    ...perfume.baseNotesDetailed,
  ];

  for (const { name } of allNotes) {
    const accords = NORMALIZED_NOTE_TO_ACCORD_MAP[normalizeNote(name)];

    if (accords) {
      for (const acc of accords) {
        accordsSet.add(acc);
      }
    }
  }

  return Array.from(accordsSet);
}

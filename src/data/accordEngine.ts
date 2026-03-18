import { NOTE_TO_ACCORD_MAP, normalizeNote } from "../data/noteMap";
import type { Perfume } from "../data/database";

/**
 * Retourne les accords d'un parfum
 * (calcul à la demande, pas dans database)
 */
export function getPerfumeAccords(perfume: Perfume): string[] {
  const accordsSet = new Set<string>();

  const allNotes = [
    ...perfume.topNotesDetailed,
    ...perfume.heartNotesDetailed,
    ...perfume.baseNotesDetailed,
  ];

  allNotes.forEach(({ name }) => {
    const key = normalizeNote(name);
    const accords = NOTE_TO_ACCORD_MAP[key];

    if (accords) {
      accords.forEach((a) => accordsSet.add(a));
    }
  });

  return Array.from(accordsSet);
}

import { NOTE_TO_ACCORD_MAP, normalizeNote } from "./noteMap";

// On redéfinit localement l'interface simple dont on a besoin ici
interface NoteName {
  name: string;
}

const NORMALIZED_MAP: Record<string, string[]> = Object.fromEntries(
  Object.entries(NOTE_TO_ACCORD_MAP).map(([k, v]) => [normalizeNote(k), v])
);

export function computeAccords(notes: NoteName[]): string[] {
  const set = new Set<string>();
  notes.forEach(n => {
    const accords = NORMALIZED_MAP[normalizeNote(n.name)];
    if (accords) accords.forEach(a => set.add(a));
  });
  return Array.from(set);
}

// On utilise "any" ici temporairement pour que Lovable ne cherche pas l'interface Perfume ailleurs
export function buildPerfume(data: any): any {
  const allNotes = [
    ...(data.topNotesDetailed || []),
    ...(data.heartNotesDetailed || []),
    ...(data.baseNotesDetailed || []),
  ];

  return {
    ...data,
    accords: computeAccords(allNotes),
  };
}

// ... (garder les types NoteCategory, Gender, NoteDetail inchangés)

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
  image?: string; // Le "?" rend le champ optionnel
}

// ... (garder les constantes NOTE_LABELS, TOP_NOTES, etc. inchangées)

export function matchPerfumes(
  gender: Gender | null,
  selectedTop: NoteCategory[],
  selectedHeart: NoteCategory[],
  selectedBase: NoteCategory[]
): { perfume: Perfume; matchPercent: number }[] {

  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    if (gender === "homme") return p.gender === "homme" || p.gender === "mixte";
    if (gender === "femme") return p.gender === "femme" || p.gender === "mixte";
    return p.gender === "mixte";
  });

  const userSelection = [...selectedTop, ...selectedHeart, ...selectedBase];

  const scored = candidates
    .map((perfume) => {
      const perfumeCategories = Array.from(new Set([
        ...perfume.topNotes,
        ...perfume.heartNotes,
        ...perfume.baseNotes
      ]));

      const matches = perfumeCategories.filter((cat) => userSelection.includes(cat));
      if (matches.length === 0) return null;

      const matchPercent = Math.round((matches.length / perfumeCategories.length) * 100);
      return { perfume, matchPercent };
    })
    .filter((item): item is { perfume: Perfume; matchPercent: number } => item !== null);

  // Utilisation de .sort() sur une copie pour éviter le bug toSorted
  return [...scored]
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 3);
}

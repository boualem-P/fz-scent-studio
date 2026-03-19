import type { Perfume } from "./database";
import { getPerfumeAccords } from "./accordEngine";
import { normalizeNote } from "./noteMap";

/**
 * CONFIG
 */
const WEIGHTS = {
  top: 0.2,
  heart: 0.3,
  base: 0.5,
};

const MIN_SCORE = 15;

/**
 * SAFE UTILS
 */
function safeArray<T>(arr: T[] | null | undefined): T[] {
  return Array.isArray(arr) ? arr : [];
}

function normalizeList(arr: string[]): string[] {
  return safeArray(arr)
    .map((n) => normalizeNote(n))
    .filter(Boolean);
}

/**
 * EXTRACTION NOTES
 */
function extractPerfumeNotes(perfume: Perfume) {
  const top = normalizeList(
    safeArray(perfume.topNotesDetailed).map((n) => n?.name || "")
  );

  const heart = normalizeList(
    safeArray(perfume.heartNotesDetailed).map((n) => n?.name || "")
  );

  const base = normalizeList(
    safeArray(perfume.baseNotesDetailed).map((n) => n?.name || "")
  );

  return { top, heart, base };
}

/**
 * SCORE PAR NOTE
 */
function getWeightedNoteScore(
  note: string,
  top: string[],
  heart: string[],
  base: string[]
): number {
  if (base.includes(note)) return WEIGHTS.base;
  if (heart.includes(note)) return WEIGHTS.heart;
  if (top.includes(note)) return WEIGHTS.top;
  return 0;
}

/**
 * BONUS BASE
 */
function getBaseBonus(note: string, base: string[]): number {
  return base.includes(note) ? 0.1 : 0;
}

/**
 * BONUS ACCORD
 */
function getAccordBonus(notes: string[], accords: string[]): number {
  if (!accords.length) return 0;

  let bonus = 0;

  notes.forEach((note) => {
    if (accords.some((acc) => acc.includes(note))) {
      bonus += 0.05;
    }
  });

  return bonus;
}

/**
 * SCORE GLOBAL (0 → 100)
 */
export function computePerfumeScore(
  perfume: Perfume,
  userNotesInput: string[]
): number {
  if (!perfume || !userNotesInput) return 0;

  const userNotes = normalizeList(userNotesInput);
  if (userNotes.length === 0) return 0;

  const { top, heart, base } = extractPerfumeNotes(perfume);

  const accords = safeArray(getPerfumeAccords(perfume));

  let score = 0;

  userNotes.forEach((note) => {
    const noteScore = getWeightedNoteScore(note, top, heart, base);
    const baseBonus = getBaseBonus(note, base);

    score += noteScore + baseBonus;
  });

  score += getAccordBonus(userNotes, accords);

  const maxPerNote = WEIGHTS.base + 0.1;
  const maxScore = userNotes.length * maxPerNote;

  if (maxScore === 0) return 0;

  return Math.min(100, Math.round((score / maxScore) * 100));
}

/**
 * MATCH GLOBAL
 */
export function computePerfumeMatches(
  perfumes: Perfume[],
  userNotes: string[]
): { perfume: Perfume; score: number }[] {
  if (!Array.isArray(perfumes) || perfumes.length === 0) return [];

  return perfumes
    .map((perfume) => ({
      perfume,
      score: computePerfumeScore(perfume, userNotes),
    }))
    .filter((r) => r.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);
}

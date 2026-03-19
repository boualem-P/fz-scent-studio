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
    .filter((n) => typeof n === "string" && n.length > 0);
}

/**
 * EXTRACTION NOTES
 */
function extractPerfumeNotes(perfume: Perfume) {
  const top = normalizeList(
    safeArray(perfume.topNotesDetailed).map((n: { name: string }) => n?.name || "")
  );

  const heart = normalizeList(
    safeArray(perfume.heartNotesDetailed).map((n: { name: string }) => n?.name || "")
  );

  const base = normalizeList(
    safeArray(perfume.baseNotesDetailed).map((n: { name: string }) => n?.name || "")
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
 * SCORE GLOBAL
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
  if (!Array.isArray(perfumes)) return [];

  return perfumes
    .map((perfume) => ({
      perfume,
      score: computePerfumeScore(perfume, userNotes),
    }))
    .filter((r) => r.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);
}

/**
 * SIMILARITÉ PARFUM
 */
export function computePerfumeSimilarity(
  perfumeA: Perfume,
  perfumeB: Perfume
): number {
  if (!perfumeA || !perfumeB) return 0;

  const A = extractPerfumeNotes(perfumeA);
  const B = extractPerfumeNotes(perfumeB);

  const matchScore = (a: string[], b: string[]) => {
    if (!a.length || !b.length) return 0;

    let matches = 0;

    a.forEach((note) => {
      if (b.includes(note)) matches++;
    });

    return matches / Math.max(a.length, b.length);
  };

  const topScore = matchScore(A.top, B.top) * 0.2;
  const heartScore = matchScore(A.heart, B.heart) * 0.3;
  const baseScore = matchScore(A.base, B.base) * 0.5;

  const accordsA = safeArray(getPerfumeAccords(perfumeA));
  const accordsB = safeArray(getPerfumeAccords(perfumeB));

  let accordMatches = 0;

  accordsA.forEach((acc) => {
    if (accordsB.includes(acc)) accordMatches++;
  });

  const accordScore =
    accordsA.length && accordsB.length
      ? (accordMatches / Math.max(accordsA.length, accordsB.length)) * 0.2
      : 0;

  const total = topScore + heartScore + baseScore + accordScore;

  return Math.min(100, Math.round(total * 100));
}

/**
 * PARFUMS SIMILAIRES
 */
export function computeSimilarPerfumes(
  sourcePerfume: Perfume,
  perfumes: Perfume[]
): { perfume: Perfume; score: number }[] {
  if (!sourcePerfume || !Array.isArray(perfumes)) return [];

  return perfumes
    .filter((p) => p.id !== sourcePerfume.id)
    .map((perfume) => ({
      perfume,
      score: computePerfumeSimilarity(sourcePerfume, perfume),
    }))
    .filter((r) => r.score >= 20)
    .sort((a, b) => b.score - a.score);
}

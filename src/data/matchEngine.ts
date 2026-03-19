import type { Perfume } from "./database";
import { getPerfumeAccords } from "./accordEngine";
import { normalizeNote } from "./noteMap";

/**
 * Configuration V5
 */
const WEIGHTS = {
  top: 0.2,
  heart: 0.3,
  base: 0.5,
};

const MIN_SCORE_THRESHOLD = 15;

/**
 * Sécurise un tableau
 */
function safeArray<T>(arr: T[] | undefined | null): T[] {
  return Array.isArray(arr) ? arr : [];
}

/**
 * Normalise une liste de notes utilisateur
 */
function normalizeUserNotes(notes: string[]): string[] {
  return safeArray(notes)
    .map((n) => normalizeNote(n))
    .filter(Boolean);
}

/**
 * Extrait les notes d’un parfum (normalisées)
 */
function extractNotes(perfume: Perfume) {
  const top = safeArray(perfume.topNotesDetailed).map((n) =>
    normalizeNote(n?.name || "")
  );

  const heart = safeArray(perfume.heartNotesDetailed).map((n) =>
    normalizeNote(n?.name || "")
  );

  const base = safeArray(perfume.baseNotesDetailed).map((n) =>
    normalizeNote(n?.name || "")
  );

  return { top, heart, base };
}

/**
 * Score une note dans une pyramide olfactive
 */
function getNoteScore(
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
 * Calcule bonus accords
 */
function getAccordBonus(userNotes: string[], accords: string[]): number {
  if (!accords.length || !userNotes.length) return 0;

  let bonus = 0;

  userNotes.forEach((note) => {
    if (accords.some((acc) => acc.includes(note))) {
      bonus += 0.05;
    }
  });

  return bonus;
}

/**
 * Bonus si note présente en base
 */
function getBaseBonus(note: string, base: string[]): number {
  return base.includes(note) ? 0.1 : 0;
}

/**
 * Calcule score brut (0 → 100)
 */
export function getPerfumeMatchScore(
  perfume: Perfume,
  userNotesInput: string[]
): number {
  if (!perfume || !userNotesInput || userNotesInput.length === 0) return 0;

  const userNotes = normalizeUserNotes(userNotesInput);
  if (userNotes.length === 0) return 0;

  const { top, heart, base } = extractNotes(perfume);

  const accords = safeArray(getPerfumeAccords(perfume));

  let score = 0;

  userNotes.forEach((note) => {
    const noteScore = getNoteScore(note, top, heart, base);
    const baseBonus = getBaseBonus(note, base);

    score += noteScore + baseBonus;
  });

  // Bonus accords
  score += getAccordBonus(userNotes, accords);

  // Normalisation (max théorique = userNotes.length * 0.6)
  const maxPerNote = WEIGHTS.base + 0.1; // base + bonus max
  const maxScore = userNotes.length * maxPerNote;

  if (maxScore === 0) return 0;

  const finalScore = Math.min(100, Math.round((score / maxScore) * 100));

  return finalScore;
}

/**
 * Retourne les meilleurs matchs
 */
export function getBestMatches(
  perfumes: Perfume[],
  userNotes: string[]
): { perfume: Perfume; score: number }[] {
  if (!Array.isArray(perfumes) || perfumes.length === 0) return [];

  const results = perfumes
    .map((p) => {
      const score = getPerfumeMatchScore(p, userNotes);
      return { perfume: p, score };
    })
    .filter((r) => r.score >= MIN_SCORE_THRESHOLD) // filtre strict
    .sort((a, b) => b.score - a.score);

  return results;
}

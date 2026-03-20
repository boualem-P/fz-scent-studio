import { getPerfumeAccords } from "./accordEngine";
import { normalizeNote } from "./noteMap";
import { PERFUMES } from "./database";

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>,
  atmosphere?: string
): { perfume: any; matchPercent: number }[] {

  const safeArray = (arr: any) => (Array.isArray(arr) ? arr : []);

  const normalizeList = (arr: string[]) =>
    safeArray(arr).map((n) => normalizeNote(n)).filter(Boolean);

  const selectedIngredients = [
    ...normalizeList(selectedTop),
    ...normalizeList(selectedHeart),
    ...normalizeList(selectedBase),
  ];

  if (selectedIngredients.length === 0) return [];

  const WEIGHTS = {
    top: 0.2,
    heart: 0.3,
    base: 0.5,
  };

  const MIN_SCORE = 15;

  const ATMOSPHERE_BOOST: Record<string, string[]> = {
    soir: ["amber", "warm_spicy", "musky", "woody"],
    quotidien: ["fresh", "citrus", "floral", "fruity"],
    business: ["woody", "aromatic", "musky"],
    rendezvous: ["floral", "sweet", "musky"],
  };

  const boostedAccords = atmosphere
    ? ATMOSPHERE_BOOST[atmosphere] || []
    : [];

  const candidates = PERFUMES.filter((p: any) => {
    if (!gender) return true;

    const g = gender.toLowerCase();
    const pg = p.gender?.toLowerCase?.() || "";

    if (g === "homme") return pg === "homme" || pg === "unisexe";
    if (g === "femme") return pg === "femme" || pg === "unisexe";

    return true;
  });

  const results = candidates
    .map((perfume: any) => {

      const top = normalizeList(
        safeArray(perfume.topNotesDetailed).map((n: any) => n?.name || "")
      );

      const heart = normalizeList(
        safeArray(perfume.heartNotesDetailed).map((n: any) => n?.name || "")
      );

      const base = normalizeList(
        safeArray(perfume.baseNotesDetailed).map((n: any) => n?.name || "")
      );

      const accords = safeArray(getPerfumeAccords(perfume));

      let score = 0;

      selectedIngredients.forEach((note) => {
        let noteScore = 0;

        // pondération pyramidale corrigée
        if (base.includes(note)) noteScore = WEIGHTS.base;
        else if (heart.includes(note)) noteScore = WEIGHTS.heart;
        else if (top.includes(note)) noteScore = WEIGHTS.top;

        // bonus base (important)
        const baseBonus = base.includes(note) ? 0.1 : 0;

        // radar
        const radarBoost = radarIntensities?.[note]
          ? 0.5 + radarIntensities[note]
          : 1;

        score += (noteScore + baseBonus) * radarBoost;
      });

      // bonus accords (via accordEngine)
      selectedIngredients.forEach((note) => {
        if (accords.some((acc: string) => acc.includes(note))) {
          score += 0.05;
        }
      });

      // bonus atmosphère
      boostedAccords.forEach((acc) => {
        if (accords.includes(acc)) {
          score += 0.3;
        }
      });

      // normalisation propre
      const maxPerNote = WEIGHTS.base + 0.1;
      const maxScore = selectedIngredients.length * maxPerNote;

      const percent =
        maxScore > 0
          ? Math.min(100, Math.round((score / maxScore) * 100))
          : 0;

      return {
        perfume,
        matchPercent: percent,
      };
    })
    .filter((r) => r.matchPercent >= MIN_SCORE) // filtre strict
    .sort((a, b) => b.matchPercent - a.matchPercent);

  return results;
}

// Re-export types and data from database.ts so all components can import from "@/data/perfumes"
export { PERFUMES } from "./database";
export type { Perfume, NoteDetail, SeasonData } from "./database";

// Additional type aliases used by components
export type Gender = "homme" | "femme" | "unisexe";
export type NoteCategory = "top" | "heart" | "base";
export const NOTE_LABELS: Record<NoteCategory, string> = {
  top: "Notes de tête",
  heart: "Notes de cœur",
  base: "Notes de fond",
};

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>,
  atmosphere?: string
): { perfume: any; matchPercent: number }[] {

  // ── 1. FILTRAGE GENRE ───────────────────────────────────────
  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    const g = gender.toLowerCase();
    const pg = p.gender.toLowerCase();
    if (g === "homme") return pg === "homme" || pg === "unisexe";
    if (g === "femme") return pg === "femme" || pg === "unisexe";
    return true;
  });

  // ── 2. PROFIL UTILISATEUR (pondéré) ─────────────────────────
  const buildWeightedAccords = (
    choices: string[],
    weight: number
  ): Map<string, number> => {
    const map = new Map<string, number>();

    choices.forEach(choice => {
      const accords = FAMILY_TO_ACCORDS[choice] || [];
      accords.forEach(acc => {
        map.set(acc, (map.get(acc) || 0) + weight);
      });
    });

    return map;
  };

  const userAccords = new Map<string, number>();

  const mergeMaps = (map: Map<string, number>) => {
    map.forEach((v, k) => {
      userAccords.set(k, (userAccords.get(k) || 0) + v);
    });
  };

  // ⚠️ pondération pyramide
  mergeMaps(buildWeightedAccords(selectedTop, 1.0));
  mergeMaps(buildWeightedAccords(selectedHeart, 1.5));
  mergeMaps(buildWeightedAccords(selectedBase, 2.0));

  // normalisation
  const maxUserWeight = Math.max(...Array.from(userAccords.values()), 1);
  userAccords.forEach((v, k) => {
    userAccords.set(k, v / maxUserWeight);
  });

  const boostedAccords = new Set(
    atmosphere ? (ATMOSPHERE_ACCORD_BOOST[atmosphere] || []) : []
  );

  // ── 3. SCORING ──────────────────────────────────────────────
  const scored = candidates.map((perfume) => {

    const allNotes = [
      ...perfume.topNotes,
      ...perfume.heartNotes,
      ...perfume.baseNotes,
    ];

    const perfumeAccords = getPerfumeAccords(perfume.id, allNotes);

    let score = 0;

    // ── A. MATCH FIN ACCORDS (55%) ────────────────────────────
    let matchScore = 0;
    let totalScore = 0;

    userAccords.forEach((userWeight, acc) => {
      const accord = ACCORDS_LIBRARY[acc];
      if (!accord) return;

      const weight = accord.weight || 1;
      totalScore += userWeight * weight;

      if (perfumeAccords.includes(acc)) {
        matchScore += userWeight * weight;
      }
    });

    const accordRatio = totalScore > 0 ? matchScore / totalScore : 0;
    score += accordRatio * 0.55;

    // ── B. CONTEXTE (20%) ─────────────────────────────────────
    let contextMatch = 0;

    boostedAccords.forEach(acc => {
      if (perfumeAccords.includes(acc)) {
        const accord = ACCORDS_LIBRARY[acc];
        contextMatch += accord ? accord.weight : 1;
      }
    });

    const contextScore = Math.min(contextMatch / 5, 1);
    score += contextScore * 0.2;

    // ── C. INTENSITÉ (15%) ────────────────────────────────────
    if (radarIntensities) {
      const avgRadar =
        Object.values(radarIntensities).reduce((a, b) => a + b, 0) /
        Object.values(radarIntensities).length;

      const avgWeight =
        perfumeAccords.reduce((sum, acc) => {
          const a = ACCORDS_LIBRARY[acc];
          return sum + (a ? a.weight : 1);
        }, 0) / Math.max(perfumeAccords.length, 1);

      const intensityScore = 1 - Math.abs(avgRadar - avgWeight / 2);
      score += Math.max(0, intensityScore) * 0.15;
    }

    // ── D. SIGNATURE PARFUM (10%) ─────────────────────────────
    // 👉 différencie les scores !
    const richness = Math.min(perfumeAccords.length / 10, 1);
    const uniqueness =
      new Set(perfumeAccords).size / Math.max(perfumeAccords.length, 1);

    const signatureScore = (richness * 0.6 + uniqueness * 0.4);
    score += signatureScore * 0.1;

    // ── NORMALISATION FINALE ─────────────────────────────────
    const finalPercent = Math.round(score * 100);

    return {
      perfume,
      matchPercent: finalPercent
    };
  });

  // ── 4. TRI + DIVERSITÉ ─────────────────────────────────────
  const sorted = scored.sort((a, b) => b.matchPercent - a.matchPercent);

  const finalResults: typeof sorted = [];
  const usedProfiles: string[] = [];

  for (const item of sorted) {

    const accords = getPerfumeAccords(
      item.perfume.id,
      [
        ...item.perfume.topNotes,
        ...item.perfume.heartNotes,
        ...item.perfume.baseNotes,
      ]
    );

    const signature = accords.slice(0, 3).join("-");

    if (!usedProfiles.includes(signature) || finalResults.length < 3) {
      finalResults.push(item);
      usedProfiles.push(signature);
    }

    if (finalResults.length === 8) break;
  }

  return finalResults;
}

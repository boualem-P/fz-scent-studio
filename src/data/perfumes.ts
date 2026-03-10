import { PERFUMES as DB_PERFUMES } from "./database";

export const PERFUMES = DB_PERFUMES;

export type NoteCategory = string; // Plus flexible pour éviter les erreurs de frappe
export type Gender = "homme" | "femme" | "unisexe" | "mixte";

export interface NoteDetail { name: string; }

export type { Perfume } from "./database";

// Mappage pour l'affichage (labels)
export const NOTE_LABELS: Record<string, string> = {
  hesperides: "Hespéridés", aromatiques: "Aromatiques", marines: "Marines",
  "epices-fraiches": "Épices Fraîches", "fruits-legers": "Fruits Légers",
  florales: "Florales", fruitees: "Fruités", "epices-chaudes": "Épices Chaudes",
  "notes-vertes": "Notes Vertes", boisees: "Boisées", ambrees: "Ambrées",
  gourmandes: "Gourmandes", musquees: "Musquées", mousses: "Mousses",
};

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>  // ← nouveau paramètre optionnel
): { perfume: any; matchPercent: number }[] {
  
  // 1. FILTRAGE DU GENRE
  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    const userGender = gender.toLowerCase();
    const perfumeGender = p.gender.toLowerCase();
    if (userGender === "homme") return perfumeGender === "homme" || perfumeGender === "unisexe";
    if (userGender === "femme") return perfumeGender === "femme" || perfumeGender === "unisexe";
    return true;
  });

  const userChoices = [...selectedTop, ...selectedHeart, ...selectedBase].map(c => c.toLowerCase());

  const rules = [
    { key: "hesperides", words: ["citron", "bergamote", "orange", "agrumes", "mandarine", "pamplemousse"] },
    { key: "aromatiques", words: ["lavande", "menthe", "romarin", "sauge", "basilic"] },
    { key: "marines", words: ["marine", "sel", "iodée", "algues", "aquatique"] },
    { key: "epices-fraiches", words: ["gingembre", "cardamome", "poivre rose", "baies"] },
    { key: "epices-chaudes", words: ["cannelle", "safran", "clou", "épices", "muscade"] },
    { key: "florales", words: ["rose", "jasmin", "fleur", "iris", "néroli", "violette", "tubéreuse"] },
    { key: "boisees", words: ["cèdre", "santal", "vétiver", "patchouli", "bois", "oud", "chêne"] },
    { key: "ambrees", words: ["ambre", "encens", "benjoin", "résine", "myrrhe"] },
    { key: "gourmandes", words: ["vanille", "tonka", "praliné", "caramel", "chocolat", "miel"] },
    { key: "musquees", words: ["musc", "ambroxan", "cashmeran"] },
    { key: "fruitees", words: ["pêche", "pomme", "poire", "fraise", "framboise", "cassis", "abricot"] },
    { key: "notes-vertes", words: ["vert", "herbe", "galbanum", "feuille"] },
    { key: "mousses", words: ["mousse", "terreux", "humide"] }
  ];

  const scored = candidates.map((perfume) => {
    let score = 0;
    const content = (
      perfume.description + " " +
      perfume.topNotes.join(" ") + " " +
      perfume.heartNotes.join(" ") + " " +
      perfume.baseNotes.join(" ")
    ).toLowerCase();

    userChoices.forEach(choice => {
      // Score de base si le mot est présent dans la fiche
      let basePoints = content.includes(choice) ? 30 : 0;

      // Points bonus via les règles de la famille
      const rule = rules.find(r => r.key === choice);
      let rulePoints = 0;
      if (rule) {
        rule.words.forEach(word => {
          if (content.includes(word)) rulePoints += 15;
        });
      }

      // ── APPLICATION DU MULTIPLICATEUR RADAR ──────────────────────────────
      // Si l'utilisateur a monté l'intensité de cette famille sur le radar,
      // on amplifie le score. Intensité 0.5 = neutre (×1), 1.0 = ×1.5, 0.1 = ×0.6
      const radarMultiplier = radarIntensities?.[choice]
        ? 0.5 + radarIntensities[choice]   // range : 0.6 (min) → 1.5 (max)
        : 1;
      // ─────────────────────────────────────────────────────────────────────

      score += (basePoints + rulePoints) * radarMultiplier;
    });

    // GARANTIE DE RÉSULTAT
    let finalPercent = Math.min(Math.round(score), 98);
    if (finalPercent < 40) {
      finalPercent = 50 + Math.floor(Math.random() * 20);
    }

    return { perfume, matchPercent: finalPercent };
  });

  // TRI ET RETOUR
  return scored
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 6);
}

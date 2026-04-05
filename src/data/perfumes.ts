import { PERFUMES } from "./database";
import { ACCORDS_LIBRARY, detectAccordsFromNotes } from "./accords";
import { getAccordIdsForPerfume } from "./parfumAccords";

export { PERFUMES };

export type NoteCategory = string;
export type Gender = "homme" | "femme" | "unisexe";

export interface NoteDetail { name: string; }

export type { Perfume } from "./database";

export const NOTE_LABELS: Record<string, string> = {
  hesperides: "Hespéridés", aromatiques: "Aromatiques", marines: "Marines",
  "epices-fraiches": "Épices Fraîches", "fruits-legers": "Fruits Légers",
  florales: "Florales", fruitees: "Fruités", "epices-chaudes": "Épices Chaudes",
  "notes-vertes": "Notes Vertes", boisees: "Boisées", ambrees: "Ambrées",
  gourmandes: "Gourmandes", musquees: "Musquées", mousses: "Mousses",
};

// ── Mapping familles swipe → accordIds ──────────────────────────
// Fait le pont entre les choix des cartes swipe et les accords
const FAMILY_TO_ACCORDS: Record<string, string[]> = {
  hesperides:       ["citrus", "citrus_aromatic", "fresh", "fresh_aromatic"],
  aromatiques:      ["aromatic", "lavender", "herbal", "fresh_aromatic", "aromatic_fougere"],
  marines:          ["aquatic", "ozonic", "mineral", "fresh"],
  epices_fraiches:  ["fresh_spicy", "pink_pepper", "tea"],
  epices_chaudes:   ["warm_spicy", "saffron", "cinnamon", "spicy"],
  florales:         ["floral", "white_floral", "rose", "jasmine", "orange_blossom", "tuberose", "sweet_floral", "iris_powdery", "violet", "lily_of_valley"],
  fruitees:         ["fruity", "floral_fruity", "tropical", "fig", "rhubarb"],
  boisees:          ["woody", "warm_woody", "amber_woody", "cedar", "sandalwood", "vetiver", "patchouli", "oud", "guaiac_wood", "papyrus"],
  ambrees:          ["amber", "oriental", "balsamic", "incense", "myrrh", "benzoin", "styrax", "elemi"],
  gourmandes:       ["gourmand", "sweet", "vanilla", "tonka_bean", "chocolate", "caramel", "honey", "almond", "coffee", "fruity_gourmand", "lactonic"],
  musquees:         ["musky", "musk", "ambergris", "animalic", "leather", "suede"],
  notes_vertes:     ["green", "herbal", "conifer", "earthy"],
  mousses:          ["earthy", "aromatic_fougere", "green"],
  epicees:          ["warm_spicy", "saffron", "cinnamon", "spicy", "fresh_spicy"],
};

// ── Mapping occasions → accordIds boostés ───────────────────────
const ATMOSPHERE_ACCORD_BOOST: Record<string, string[]> = {
  soir:       ["warm_spicy", "saffron", "amber", "oriental", "oud", "leather", "tobacco", "smoky", "incense", "animalic", "narcotic_floral"],
  quotidien:  ["citrus", "fresh", "aromatic", "lavender", "aquatic", "green", "herbal", "tea", "fresh_aromatic"],
  business:   ["woody", "cedar", "vetiver", "aromatic", "iris_powdery", "lavender", "fresh_spicy", "mineral", "suede"],
  rendezvous: ["rose", "jasmine", "tuberose", "musky", "ambergris", "vanilla", "white_floral", "amber", "leather", "narcotic_floral"],
  aid:        ["oud", "rose", "jasmine", "incense", "saffron", "amber", "oriental", "myrrh", "warm_spicy", "orange_blossom"],
  mariage:    ["white_floral", "rose", "jasmine", "orange_blossom", "tuberose", "aldehydic", "ambergris", "sweet_floral", "musky"],
  famille:    ["fruity", "citrus", "floral", "sweet", "vanilla", "honey", "gourmand", "fresh", "lily_of_valley"],
  ramadan:    ["oud", "incense", "myrrh", "amber", "oriental", "benzoin", "rose", "saffron", "sandalwood", "styrax"],
};

// ── Récupère les accords d'un parfum (mapping ou détection auto) ─
function getPerfumeAccords(perfumeId: string, allNotes: string[]): string[] {
  const fromMapping = getAccordIdsForPerfume(perfumeId);
  if (fromMapping.length > 0) return fromMapping;
  return detectAccordsFromNotes(allNotes);
}

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>,
  atmosphere?: string
): { perfume: any; matchPercent: number }[] {

  // ── 1. FILTRAGE DU GENRE ────────────────────────────────────
  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    const userGender = gender.toLowerCase();
    const perfumeGender = p.gender.toLowerCase();
    if (userGender === "homme") return perfumeGender === "homme" || perfumeGender === "unisexe";
    if (userGender === "femme") return perfumeGender === "femme" || perfumeGender === "unisexe";
    return true;
  });

  const userChoices = [...selectedTop, ...selectedHeart, ...selectedBase].map(c => c.toLowerCase());
  const boostedAccordIds = atmosphere ? (ATMOSPHERE_ACCORD_BOOST[atmosphere] || []) : [];

  // ── Anciennes règles conservées pour rétrocompatibilité ─────
  const rules = [
    { key: "hesperides",       words: ["citron", "bergamote", "orange", "agrumes", "mandarine", "pamplemousse"] },
    { key: "aromatiques",      words: ["lavande", "menthe", "romarin", "sauge", "basilic"] },
    { key: "marines",          words: ["marine", "sel", "iodée", "algues", "aquatique"] },
    { key: "epices-fraiches",  words: ["gingembre", "cardamome", "poivre rose", "baies"] },
    { key: "epices-chaudes",   words: ["cannelle", "safran", "clou", "épices", "muscade"] },
    { key: "florales",         words: ["rose", "jasmin", "fleur", "iris", "néroli", "violette", "tubéreuse"] },
    { key: "boisees",          words: ["cèdre", "santal", "vétiver", "patchouli", "bois", "oud", "chêne"] },
    { key: "ambrees",          words: ["ambre", "encens", "benjoin", "résine", "myrrhe"] },
    { key: "gourmandes",       words: ["vanille", "tonka", "praliné", "caramel", "chocolat", "miel"] },
    { key: "musquees",         words: ["musc", "ambroxan", "cashmeran"] },
    { key: "fruitees",         words: ["pêche", "pomme", "poire", "fraise", "framboise", "cassis", "abricot"] },
    { key: "notes-vertes",     words: ["vert", "herbe", "galbanum", "feuille"] },
    { key: "mousses",          words: ["mousse", "terreux", "humide"] },
  ];

  const scored = candidates.map((perfume) => {
    const allNotes = [
      ...perfume.topNotes,
      ...perfume.heartNotes,
      ...perfume.baseNotes,
    ];

    // Accords du parfum (depuis parfumAccords ou détection auto)
    const perfumeAccordIds = getPerfumeAccords(perfume.id, allNotes);

    const content = (
      perfume.description + " " +
      allNotes.join(" ")
    ).toLowerCase();

    let score = 0;

    // ── DIMENSION 1 : ADN OLFACTIF (50%) ──────────────────────
    // Score basé sur les choix swipe + radar
    userChoices.forEach(choice => {
      // Score texte classique (rétrocompatible)
      const basePoints = content.includes(choice) ? 30 : 0;
      const rule = rules.find(r => r.key === choice);
      let rulePoints = 0;
      if (rule) {
        rule.words.forEach(word => {
          if (content.includes(word)) rulePoints += 15;
        });
      }

      // Score accords : vérifie si les accords du parfum
      // correspondent aux familles du choix utilisateur
      const choiceAccords = FAMILY_TO_ACCORDS[choice] || [];
      let accordPoints = 0;
      choiceAccords.forEach(accordId => {
        if (perfumeAccordIds.includes(accordId)) {
          const accord = ACCORDS_LIBRARY[accordId];
          if (accord) {
            // Poids de l'accord × 25 points de base
            accordPoints += accord.weight * 25;
          }
        }
      });

      // Multiplicateur radar
      const radarMultiplier = radarIntensities?.[choice]
        ? 0.5 + radarIntensities[choice]
        : 1;

      score += (basePoints + rulePoints + accordPoints) * radarMultiplier * 0.5;
    });

    // ── DIMENSION 2 : CONTEXTE D'USAGE (30%) ──────────────────
    // Boost si les accords du parfum correspondent à l'occasion
    if (boostedAccordIds.length > 0) {
      boostedAccordIds.forEach(accordId => {
        if (perfumeAccordIds.includes(accordId)) {
          const accord = ACCORDS_LIBRARY[accordId];
          if (accord) {
            // Plus le poids de l'accord est élevé, plus le boost est fort
            score += accord.weight * 30 * 0.3;
          }
        }
      });
    }

    // ── DIMENSION 3 : INTENSITÉ DE PROJECTION (20%) ───────────
    // Le radar définit l'intensité souhaitée
    // On mesure si le parfum a suffisamment d'accords "lourds"
    if (radarIntensities && Object.keys(radarIntensities).length > 0) {
      const avgRadar = Object.values(radarIntensities).reduce((a, b) => a + b, 0)
        / Object.values(radarIntensities).length;

      // Calcule le poids moyen des accords du parfum
      const avgAccordWeight = perfumeAccordIds.length > 0
        ? perfumeAccordIds.reduce((sum, id) => {
            const accord = ACCORDS_LIBRARY[id];
            return sum + (accord ? accord.weight : 1.0);
          }, 0) / perfumeAccordIds.length
        : 1.0;

      // Si l'utilisateur veut de l'intensité (radar > 0.7),
      // les parfums avec accords lourds sont boostés
      if (avgRadar > 0.7 && avgAccordWeight > 1.2) {
        score += 20 * 0.2;
      }
      // Si l'utilisateur veut de la légèreté (radar < 0.4),
      // les parfums avec accords légers sont boostés
      if (avgRadar < 0.4 && avgAccordWeight < 1.0) {
        score += 20 * 0.2;
      }
    }

    // ── NORMALISATION FINALE ───────────────────────────────────
    let finalPercent = Math.min(Math.round(score), 98);
    if (finalPercent < 40) {
      finalPercent = 50 + Math.floor(Math.random() * 20);
    }

    return { perfume, matchPercent: finalPercent };
  });

  return scored
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 6);
}

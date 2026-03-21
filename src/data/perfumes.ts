import { PERFUMES } from "./database";

export { PERFUMES };

export type NoteCategory = string;
export type Gender = "homme" | "femme" | "unisexe" | "mixte";

export interface NoteDetail { name: string; }

export type { Perfume } from "./database";

export const NOTE_LABELS: Record<string, string> = {
  hesperides: "Hespéridés", aromatiques: "Aromatiques", marines: "Marines",
  "epices-fraiches": "Épices Fraîches", "fruits-legers": "Fruits Légers",
  florales: "Florales", fruitees: "Fruités", "epices-chaudes": "Épices Chaudes",
  "notes-vertes": "Notes Vertes", boisees: "Boisées", ambrees: "Ambrées",
  gourmandes: "Gourmandes", musquees: "Musquées", mousses: "Mousses",
};

const ATMOSPHERE_BOOST: Record<string, string[]> = {
  soir:      ['epicees', 'ambrees', 'musquees', 'boisees'],
  quotidien: ['hesperides', 'florales', 'marines', 'fruitees'],
  business:  ['boisees', 'aromatiques', 'musquees'],
  rendezvous:['florales', 'gourmandes', 'musquees'],
  aid:       ['epicees', 'ambrees', 'boisees', 'musquees'],
  mariage:   ['florales', 'musquees', 'ambrees', 'gourmandes'],
  famille:   ['hesperides', 'florales', 'fruitees'],
  ramadan:   ['boisees', 'ambrees', 'epicees', 'musquees'],
};

export function matchPerfumes(
  gender: string | null,
  selectedTop: string[],
  selectedHeart: string[],
  selectedBase: string[],
  radarIntensities?: Record<string, number>,
  atmosphere?: string
): { perfume: any; matchPercent: number }[] {

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

  const boostedFamilies = atmosphere ? (ATMOSPHERE_BOOST[atmosphere] || []) : [];

  const scored = candidates.map((perfume) => {
    let score = 0;
    const content = (
      perfume.description + " " +
      perfume.topNotes.join(" ") + " " +
      perfume.heartNotes.join(" ") + " " +
      perfume.baseNotes.join(" ")
    ).toLowerCase();

    userChoices.forEach(choice => {
      let basePoints = content.includes(choice) ? 30 : 0;
      const rule = rules.find(r => r.key === choice);
      let rulePoints = 0;
      if (rule) {
        rule.words.forEach(word => {
          if (content.includes(word)) rulePoints += 15;
        });
      }
      const radarMultiplier = radarIntensities?.[choice] ? 0.5 + radarIntensities[choice] : 1;
      score += (basePoints + rulePoints) * radarMultiplier;
    });

    boostedFamilies.forEach(family => {
      const rule = rules.find(r => r.key === family);
      if (rule) {
        rule.words.forEach(word => {
          if (content.includes(word)) score += 20;
        });
      }
    });

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

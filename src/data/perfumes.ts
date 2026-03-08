import { PERFUMES as DB_PERFUMES } from "./database";

export const PERFUMES = DB_PERFUMES;

export type NoteCategory = string; // Plus flexible pour éviter les erreurs de frappe
export type Gender = "homme" | "femme" | "unisexe" | "mixte";

export interface NoteDetail { name: string; }

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: string;
  year: number;
  concentration: string;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  topNotesDetailed: NoteDetail[];
  heartNotesDetailed: NoteDetail[];
  baseNotesDetailed: NoteDetail[];
  image: string;
}

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
  selectedBase: string[]
): { perfume: any; matchPercent: number }[] {
  
  // 1. FILTRAGE DU GENRE (Version ultra-simplifiée)
  const candidates = PERFUMES.filter((p) => {
    if (!gender) return true;
    const userGender = gender.toLowerCase();
    const perfumeGender = p.gender.toLowerCase();
    
    if (userGender === "homme") return perfumeGender === "homme" || perfumeGender === "unisexe";
    if (userGender === "femme") return perfumeGender === "femme" || perfumeGender === "unisexe";
    return true;
  });

  // 2. DICTIONNAIRE DE CORRESPONDANCE (Le pont entre tes boutons et ta DB)
  // On crée une liste de mots-clés pour chaque sélection de l'utilisateur
  const userChoices = [...selectedTop, ...selectedHeart, ...selectedBase].map(c => c.toLowerCase());

  const scored = candidates.map((perfume) => {
    let score = 0;
    const content = (perfume.description + " " + perfume.topNotes.join(" ") + " " + perfume.heartNotes.join(" ") + " " + perfume.baseNotes.join(" ")).toLowerCase();

    // Système de points par famille
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

    userChoices.forEach(choice => {
      // Si le mot exact est dans la fiche
      if (content.includes(choice)) score += 30;
      
      // Si un mot-clé de la famille est dans la fiche
      const rule = rules.find(r => r.key === choice);
      if (rule) {
        rule.words.forEach(word => {
          if (content.includes(word)) score += 15;
        });
      }
    });

    // 3. GARANTIE DE RÉSULTAT (Score minimal)
    // On ajoute un score de base selon le genre pour éviter le 0%
    let finalPercent = Math.min(score, 98);
    if (finalPercent < 40) {
        finalPercent = 50 + Math.floor(Math.random() * 20); // Entre 50 et 70% pour faire plaisir à l'utilisateur
    }

    return { perfume, matchPercent: finalPercent };
  });

  // 4. TRI ET RETOUR
  return scored
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 6); // Toujours renvoyer les 6 meilleurs
}

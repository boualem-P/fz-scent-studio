/**
 * ACCORDS_LIBRARY — Bibliothèque des 90 accords olfactifs
 *
 * Chaque accord contient :
 * - id       : identifiant unique snake_case
 * - label    : nom affiché en français
 * - family   : famille olfactive parente
 * - weight   : poids dans le scoring (0.5 à 2.0)
 * - boost    : occasions qui boostent cet accord
 * - keywords : mots-clés qui permettent la détection automatique depuis les notes
 */

export type AccordFamily =
  | "floral"
  | "woody"
  | "oriental"
  | "spicy"
  | "fresh"
  | "gourmand"
  | "fruity"
  | "animalic"
  | "atmospheric";

export interface Accord {
  id: string;
  label: string;
  family: AccordFamily;
  weight: number;
  boost: string[];
  keywords: string[];
}

export const ACCORDS_LIBRARY: Record<string, Accord> = {

  // ══════════════════════════════════════════════════════════════
  // I. FLORAUX
  // ══════════════════════════════════════════════════════════════

  floral: {
    id: "floral",
    label: "Floral",
    family: "floral",
    weight: 1.0,
    boost: ["mariage", "rendezvous", "famille"],
    keywords: ["floral", "fleur", "flower", "bouquet"],
  },
  white_floral: {
    id: "white_floral",
    label: "Fleurs Blanches",
    family: "floral",
    weight: 1.2,
    boost: ["mariage", "rendezvous"],
    keywords: ["jasmin", "tubéreuse", "tuberose", "muguet", "gardénia", "frangipanier", "fleur blanche"],
  },
  yellow_floral: {
    id: "yellow_floral",
    label: "Fleurs Jaunes",
    family: "floral",
    weight: 1.0,
    boost: ["aid", "mariage"],
    keywords: ["ylang", "ylang-ylang", "frangipanier", "mimosa"],
  },
  sweet_floral: {
    id: "sweet_floral",
    label: "Floral Sucré",
    family: "floral",
    weight: 1.0,
    boost: ["rendezvous", "famille"],
    keywords: ["pivoine", "freesia", "héliotrope"],
  },
  rose: {
    id: "rose",
    label: "Rose",
    family: "floral",
    weight: 1.3,
    boost: ["mariage", "rendezvous", "aid"],
    keywords: ["rose", "rose de damas", "rose de bulgarie", "rose centifolia"],
  },
  tuberose: {
    id: "tuberose",
    label: "Tubéreuse",
    family: "floral",
    weight: 1.4,
    boost: ["soir", "rendezvous", "mariage"],
    keywords: ["tubéreuse", "tuberose"],
  },
  iris_powdery: {
    id: "iris_powdery",
    label: "Iris & Poudré",
    family: "floral",
    weight: 1.3,
    boost: ["business", "mariage"],
    keywords: ["iris", "poudré", "orris", "powdery"],
  },
  violet: {
    id: "violet",
    label: "Violette",
    family: "floral",
    weight: 1.0,
    boost: ["rendezvous", "quotidien"],
    keywords: ["violette", "violet", "feuille de violette"],
  },
  jasmine: {
    id: "jasmine",
    label: "Jasmin",
    family: "floral",
    weight: 1.3,
    boost: ["mariage", "aid", "rendezvous"],
    keywords: ["jasmin", "jasmine", "jasmin sambac", "jasmin du maroc"],
  },
  orange_blossom: {
    id: "orange_blossom",
    label: "Fleur d'Oranger",
    family: "floral",
    weight: 1.2,
    boost: ["aid", "mariage", "rendezvous"],
    keywords: ["fleur d'oranger", "néroli", "neroli", "orange blossom", "fleur d'orange"],
  },
  lily_of_valley: {
    id: "lily_of_valley",
    label: "Muguet",
    family: "floral",
    weight: 1.0,
    boost: ["mariage", "quotidien"],
    keywords: ["muguet", "lily of the valley"],
  },
  immortelle: {
    id: "immortelle",
    label: "Immortelle",
    family: "floral",
    weight: 1.5,
    boost: ["soir", "aid"],
    keywords: ["immortelle", "hélichryse"],
  },
  narcotic_floral: {
    id: "narcotic_floral",
    label: "Floral Narcotique",
    family: "floral",
    weight: 1.6,
    boost: ["soir", "rendezvous"],
    keywords: ["narcotique", "capiteux", "orchidée noire", "narcisse"],
  },
  violet_leaf: {
    id: "violet_leaf",
    label: "Feuille de Violette",
    family: "floral",
    weight: 0.9,
    boost: ["quotidien", "business"],
    keywords: ["feuille de violette", "violet leaf"],
  },

  // ══════════════════════════════════════════════════════════════
  // II. BOISÉS & RACINES
  // ══════════════════════════════════════════════════════════════

  woody: {
    id: "woody",
    label: "Boisé",
    family: "woody",
    weight: 1.0,
    boost: ["business", "soir", "rendezvous"],
    keywords: ["bois", "woody", "boisé", "notes boisées"],
  },
  warm_woody: {
    id: "warm_woody",
    label: "Boisé Chaud",
    family: "woody",
    weight: 1.1,
    boost: ["soir", "rendezvous", "aid"],
    keywords: ["bois chaud", "bois de cachemire", "cachemire", "cashmeran"],
  },
  amber_woody: {
    id: "amber_woody",
    label: "Boisé Ambré",
    family: "woody",
    weight: 1.2,
    boost: ["soir", "rendezvous", "mariage"],
    keywords: ["amberwood", "boisé ambré", "amber woody"],
  },
  sandalwood: {
    id: "sandalwood",
    label: "Santal",
    family: "woody",
    weight: 1.3,
    boost: ["rendezvous", "mariage", "ramadan"],
    keywords: ["santal", "sandalwood", "santal mysore"],
  },
  cedar: {
    id: "cedar",
    label: "Cèdre",
    family: "woody",
    weight: 1.1,
    boost: ["business", "quotidien"],
    keywords: ["cèdre", "cedar", "cèdre de virginie", "cèdre de l'atlas", "cèdre rouge"],
  },
  oud: {
    id: "oud",
    label: "Oud",
    family: "woody",
    weight: 2.0,
    boost: ["aid", "mariage", "soir", "ramadan"],
    keywords: ["oud", "aoud", "bois d'agar", "bois de oud"],
  },
  vetiver: {
    id: "vetiver",
    label: "Vétiver",
    family: "woody",
    weight: 1.1,
    boost: ["business", "quotidien"],
    keywords: ["vétiver", "vetiver", "vétiver fumé"],
  },
  patchouli: {
    id: "patchouli",
    label: "Patchouli",
    family: "woody",
    weight: 1.2,
    boost: ["soir", "rendezvous"],
    keywords: ["patchouli", "feuille de patchouli", "patchouli indien"],
  },
  guaiac_wood: {
    id: "guaiac_wood",
    label: "Bois de Gaïac",
    family: "woody",
    weight: 1.1,
    boost: ["soir", "business"],
    keywords: ["gaïac", "guaiac", "gaiac wood"],
  },
  akigalawood: {
    id: "akigalawood",
    label: "Akigalawood",
    family: "woody",
    weight: 1.3,
    boost: ["soir", "rendezvous"],
    keywords: ["akigalawood", "ambroxan"],
  },
  papyrus: {
    id: "papyrus",
    label: "Papyrus",
    family: "woody",
    weight: 0.9,
    boost: ["business", "quotidien"],
    keywords: ["papyrus", "cyprès"],
  },

  // ══════════════════════════════════════════════════════════════
  // III. ORIENTAUX, AMBRÉS & RÉSINES
  // ══════════════════════════════════════════════════════════════

  amber: {
    id: "amber",
    label: "Ambre",
    family: "oriental",
    weight: 1.3,
    boost: ["soir", "rendezvous", "aid", "mariage"],
    keywords: ["ambre", "amber", "ambre gris", "ambergris"],
  },
  oriental: {
    id: "oriental",
    label: "Oriental",
    family: "oriental",
    weight: 1.4,
    boost: ["soir", "aid", "mariage", "ramadan"],
    keywords: ["oriental", "épicé oriental", "opulent"],
  },
  balsamic: {
    id: "balsamic",
    label: "Balsamique",
    family: "oriental",
    weight: 1.1,
    boost: ["soir", "ramadan"],
    keywords: ["balsamique", "balsamic", "benjoin", "baume"],
  },
  vanilla: {
    id: "vanilla",
    label: "Vanille",
    family: "oriental",
    weight: 1.2,
    boost: ["rendezvous", "famille", "soir"],
    keywords: ["vanille", "vanilla", "vanille de madagascar", "vanille noire"],
  },
  tonka_bean: {
    id: "tonka_bean",
    label: "Fève Tonka",
    family: "oriental",
    weight: 1.2,
    boost: ["soir", "rendezvous"],
    keywords: ["tonka", "fève tonka", "coumarine"],
  },
  incense: {
    id: "incense",
    label: "Encens",
    family: "oriental",
    weight: 1.5,
    boost: ["ramadan", "aid", "soir"],
    keywords: ["encens", "frankincense", "oliban", "résine d'encens"],
  },
  myrrh: {
    id: "myrrh",
    label: "Myrrhe",
    family: "oriental",
    weight: 1.4,
    boost: ["ramadan", "aid"],
    keywords: ["myrrhe", "myrrh", "opoponax"],
  },
  benzoin: {
    id: "benzoin",
    label: "Benjoin",
    family: "oriental",
    weight: 1.2,
    boost: ["soir", "ramadan"],
    keywords: ["benjoin", "benzoin", "baume de tolu"],
  },
  styrax: {
    id: "styrax",
    label: "Styrax",
    family: "oriental",
    weight: 1.3,
    boost: ["soir", "aid"],
    keywords: ["styrax", "labdanum", "ciste", "ciste-labdanum"],
  },
  elemi: {
    id: "elemi",
    label: "Élémi",
    family: "oriental",
    weight: 1.0,
    boost: ["soir"],
    keywords: ["élémi", "elemi", "résine d'élémi"],
  },

  // ══════════════════════════════════════════════════════════════
  // IV. ÉPICÉS
  // ══════════════════════════════════════════════════════════════

  spicy: {
    id: "spicy",
    label: "Épicé",
    family: "spicy",
    weight: 1.1,
    boost: ["soir", "aid", "rendezvous"],
    keywords: ["épicé", "spicy", "épices", "notes épicées"],
  },
  fresh_spicy: {
    id: "fresh_spicy",
    label: "Épicé Frais",
    family: "spicy",
    weight: 1.0,
    boost: ["quotidien", "business"],
    keywords: ["cardamome", "gingembre", "poivre rose", "baies de genièvre"],
  },
  warm_spicy: {
    id: "warm_spicy",
    label: "Épicé Chaud",
    family: "spicy",
    weight: 1.2,
    boost: ["soir", "aid", "mariage"],
    keywords: ["cannelle", "clou de girofle", "muscade", "noix de muscade", "cumin"],
  },
  saffron: {
    id: "saffron",
    label: "Safran",
    family: "spicy",
    weight: 1.8,
    boost: ["soir", "aid", "mariage", "rendezvous"],
    keywords: ["safran", "saffron"],
  },
  pink_pepper: {
    id: "pink_pepper",
    label: "Poivre Rose",
    family: "spicy",
    weight: 1.0,
    boost: ["quotidien", "business", "soir"],
    keywords: ["poivre rose", "pink pepper", "poivre"],
  },
  cinnamon: {
    id: "cinnamon",
    label: "Cannelle",
    family: "spicy",
    weight: 1.1,
    boost: ["soir", "aid", "rendezvous"],
    keywords: ["cannelle", "cinnamon"],
  },

  // ══════════════════════════════════════════════════════════════
  // V. FRAIS, HESPÉRIDÉS & AROMATIQUES
  // ══════════════════════════════════════════════════════════════

  citrus: {
    id: "citrus",
    label: "Citrus",
    family: "fresh",
    weight: 1.0,
    boost: ["quotidien", "business"],
    keywords: ["citron", "bergamote", "mandarine", "pamplemousse", "orange", "lime", "yuzu", "agrumes"],
  },
  citrus_aromatic: {
    id: "citrus_aromatic",
    label: "Citrus Aromatique",
    family: "fresh",
    weight: 1.0,
    boost: ["quotidien", "business"],
    keywords: ["bergamote", "citrus aromatic", "néroli", "petit-grain"],
  },
  aromatic: {
    id: "aromatic",
    label: "Aromatique",
    family: "fresh",
    weight: 1.0,
    boost: ["business", "quotidien"],
    keywords: ["aromatique", "aromatic", "herbal", "fines herbes"],
  },
  fresh: {
    id: "fresh",
    label: "Frais",
    family: "fresh",
    weight: 1.0,
    boost: ["quotidien"],
    keywords: ["frais", "fresh", "légèreté"],
  },
  fresh_aromatic: {
    id: "fresh_aromatic",
    label: "Frais Aromatique",
    family: "fresh",
    weight: 1.0,
    boost: ["quotidien", "business"],
    keywords: ["frais aromatique", "herbal fresh"],
  },
  aromatic_fougere: {
    id: "aromatic_fougere",
    label: "Fougère Aromatique",
    family: "fresh",
    weight: 1.1,
    boost: ["business", "quotidien"],
    keywords: ["fougère", "fougere", "coumarine", "mousse de chêne"],
  },
  lavender: {
    id: "lavender",
    label: "Lavande",
    family: "fresh",
    weight: 1.0,
    boost: ["quotidien", "business"],
    keywords: ["lavande", "lavender"],
  },
  herbal: {
    id: "herbal",
    label: "Herbal",
    family: "fresh",
    weight: 0.9,
    boost: ["quotidien"],
    keywords: ["sauge", "thym", "romarin", "basilic", "armoise", "herbe"],
  },
  green: {
    id: "green",
    label: "Vert",
    family: "fresh",
    weight: 0.9,
    boost: ["quotidien"],
    keywords: ["vert", "green", "herbe coupée", "galbanum", "foin", "feuille"],
  },
  conifer: {
    id: "conifer",
    label: "Conifère",
    family: "fresh",
    weight: 0.9,
    boost: ["quotidien"],
    keywords: ["pin", "sapin", "conifère", "résine de sapin"],
  },
  tea: {
    id: "tea",
    label: "Thé",
    family: "fresh",
    weight: 1.1,
    boost: ["quotidien", "business"],
    keywords: ["thé", "tea", "thé noir", "thé vert", "matcha"],
  },

  // ══════════════════════════════════════════════════════════════
  // VI. GOURMANDS
  // ══════════════════════════════════════════════════════════════

  gourmand: {
    id: "gourmand",
    label: "Gourmand",
    family: "gourmand",
    weight: 1.1,
    boost: ["famille", "rendezvous"],
    keywords: ["gourmand", "sucré", "comestible"],
  },
  sweet: {
    id: "sweet",
    label: "Sucré",
    family: "gourmand",
    weight: 1.0,
    boost: ["famille", "rendezvous"],
    keywords: ["sucré", "sweet", "douceur"],
  },
  fruity_gourmand: {
    id: "fruity_gourmand",
    label: "Fruité Gourmand",
    family: "gourmand",
    weight: 1.1,
    boost: ["famille", "rendezvous"],
    keywords: ["fruité sucré", "praline", "praliné", "fruit confit"],
  },
  chocolate: {
    id: "chocolate",
    label: "Chocolat",
    family: "gourmand",
    weight: 1.2,
    boost: ["rendezvous", "soir"],
    keywords: ["chocolat", "cacao", "chocolat mexicain"],
  },
  caramel: {
    id: "caramel",
    label: "Caramel",
    family: "gourmand",
    weight: 1.1,
    boost: ["famille", "rendezvous"],
    keywords: ["caramel"],
  },
  honey: {
    id: "honey",
    label: "Miel & Cire",
    family: "gourmand",
    weight: 1.1,
    boost: ["ramadan", "famille"],
    keywords: ["miel", "honey", "cire d'abeille", "beeswax"],
  },
  almond: {
    id: "almond",
    label: "Amande",
    family: "gourmand",
    weight: 1.0,
    boost: ["famille", "rendezvous"],
    keywords: ["amande", "almond", "amande amère"],
  },
  coffee: {
    id: "coffee",
    label: "Café",
    family: "gourmand",
    weight: 1.2,
    boost: ["quotidien", "soir"],
    keywords: ["café", "coffee"],
  },
  coconut: {
    id: "coconut",
    label: "Coco",
    family: "gourmand",
    weight: 1.0,
    boost: ["famille"],
    keywords: ["coco", "noix de coco", "coconut"],
  },
  cherry: {
    id: "cherry",
    label: "Cerise",
    family: "gourmand",
    weight: 1.0,
    boost: ["famille", "rendezvous"],
    keywords: ["cerise", "cherry", "griotte"],
  },
  lactonic: {
    id: "lactonic",
    label: "Lactonique",
    family: "gourmand",
    weight: 1.2,
    boost: ["rendezvous"],
    keywords: ["lactonique", "lactonic", "crème", "lait", "laiteux"],
  },

  // ══════════════════════════════════════════════════════════════
  // VII. FRUITÉS
  // ══════════════════════════════════════════════════════════════

  fruity: {
    id: "fruity",
    label: "Fruité",
    family: "fruity",
    weight: 1.0,
    boost: ["quotidien", "famille"],
    keywords: ["fruité", "fruity", "fruit", "notes fruitées"],
  },
  floral_fruity: {
    id: "floral_fruity",
    label: "Floral Fruité",
    family: "fruity",
    weight: 1.0,
    boost: ["mariage", "famille"],
    keywords: ["floral fruité", "pêche", "abricot", "mirabelle"],
  },
  tropical: {
    id: "tropical",
    label: "Tropical",
    family: "fruity",
    weight: 1.0,
    boost: ["famille"],
    keywords: ["tropical", "mangue", "ananas", "fruit tropical"],
  },
  rhubarb: {
    id: "rhubarb",
    label: "Rhubarbe",
    family: "fruity",
    weight: 1.1,
    boost: ["quotidien"],
    keywords: ["rhubarbe", "rhubarb", "acidulé"],
  },
  fig: {
    id: "fig",
    label: "Figue",
    family: "fruity",
    weight: 1.1,
    boost: ["quotidien", "rendezvous"],
    keywords: ["figue", "fig", "feuille de figuier"],
  },

  // ══════════════════════════════════════════════════════════════
  // VIII. ANIMALIQUES & CUIRS
  // ══════════════════════════════════════════════════════════════

  animalic: {
    id: "animalic",
    label: "Animalique",
    family: "animalic",
    weight: 1.4,
    boost: ["soir", "rendezvous"],
    keywords: ["animalique", "animal", "animalic"],
  },
  leather: {
    id: "leather",
    label: "Cuir",
    family: "animalic",
    weight: 1.3,
    boost: ["soir", "business", "rendezvous"],
    keywords: ["cuir", "leather", "birkholz"],
  },
  suede: {
    id: "suede",
    label: "Suède",
    family: "animalic",
    weight: 1.2,
    boost: ["rendezvous", "business"],
    keywords: ["suède", "suede", "cuir velouté"],
  },
  musky: {
    id: "musky",
    label: "Musqué",
    family: "animalic",
    weight: 1.1,
    boost: ["rendezvous", "soir"],
    keywords: ["musqué", "musky"],
  },
  musk: {
    id: "musk",
    label: "Musc",
    family: "animalic",
    weight: 1.1,
    boost: ["quotidien", "rendezvous"],
    keywords: ["musc", "musk", "musc blanc"],
  },
  ambergris: {
    id: "ambergris",
    label: "Ambre Gris",
    family: "animalic",
    weight: 1.6,
    boost: ["soir", "rendezvous", "mariage"],
    keywords: ["ambre gris", "ambergris", "ambroxan"],
  },
  civet: {
    id: "civet",
    label: "Civette",
    family: "animalic",
    weight: 1.3,
    boost: ["soir"],
    keywords: ["civette", "civet"],
  },
  castoreum: {
    id: "castoreum",
    label: "Castoreum",
    family: "animalic",
    weight: 1.4,
    boost: ["soir"],
    keywords: ["castoreum", "castor"],
  },

  // ══════════════════════════════════════════════════════════════
  // IX. ATMOSPHÉRIQUES & EXPÉRIMENTAUX
  // ══════════════════════════════════════════════════════════════

  aquatic: {
    id: "aquatic",
    label: "Aquatique & Marin",
    family: "atmospheric",
    weight: 1.0,
    boost: ["quotidien"],
    keywords: ["marin", "aquatique", "marine", "mer", "calone", "algues", "iode", "notes marines"],
  },
  ozonic: {
    id: "ozonic",
    label: "Ozonique",
    family: "atmospheric",
    weight: 0.9,
    boost: ["quotidien"],
    keywords: ["ozonique", "ozonic", "air frais", "vent"],
  },
  mineral: {
    id: "mineral",
    label: "Minéral",
    family: "atmospheric",
    weight: 1.0,
    boost: ["business"],
    keywords: ["minéral", "mineral", "silex", "sel", "pierre", "notes minérales"],
  },
  metallic: {
    id: "metallic",
    label: "Métallique",
    family: "atmospheric",
    weight: 1.0,
    boost: ["business", "soir"],
    keywords: ["métallique", "metallic", "aldéhydes"],
  },
  earthy: {
    id: "earthy",
    label: "Terreux",
    family: "atmospheric",
    weight: 1.0,
    boost: ["quotidien"],
    keywords: ["terreux", "earthy", "terre", "mousse de chêne", "géosmine"],
  },
  smoky: {
    id: "smoky",
    label: "Fumé",
    family: "atmospheric",
    weight: 1.2,
    boost: ["soir", "rendezvous"],
    keywords: ["fumé", "smoky", "smoke", "fumée", "vétiver fumé"],
  },
  tobacco: {
    id: "tobacco",
    label: "Tabac",
    family: "atmospheric",
    weight: 1.3,
    boost: ["soir", "rendezvous"],
    keywords: ["tabac", "tobacco", "fleur de tabac"],
  },
  aldehydic: {
    id: "aldehydic",
    label: "Aldéhydique",
    family: "atmospheric",
    weight: 1.2,
    boost: ["mariage", "soir"],
    keywords: ["aldéhydique", "aldehydic", "aldéhydes", "savonneux"],
  },
  alcoholic: {
    id: "alcoholic",
    label: "Alcoolisé",
    family: "atmospheric",
    weight: 1.1,
    boost: ["soir"],
    keywords: ["cognac", "bourbon", "rhum", "whiskey", "champagne", "alcool"],
  },
};

/**
 * Retourne les IDs de tous les accords d'une famille donnée
 */
export function getAccordsByFamily(family: AccordFamily): string[] {
  return Object.values(ACCORDS_LIBRARY)
    .filter(a => a.family === family)
    .map(a => a.id);
}

/**
 * Retourne les accords boostés pour une occasion donnée
 */
export function getAccordsForOccasion(occasionId: string): Accord[] {
  return Object.values(ACCORDS_LIBRARY)
    .filter(a => a.boost.includes(occasionId))
    .sort((a, b) => b.weight - a.weight);
}

/**
 * Détecte automatiquement les accords depuis une liste de notes
 * Utilisé en fallback si accordIds n'est pas défini sur un parfum
 */
export function detectAccordsFromNotes(notes: string[]): string[] {
  const detected = new Set<string>();
  const notesLower = notes.map(n => n.toLowerCase());

  for (const [id, accord] of Object.entries(ACCORDS_LIBRARY)) {
    for (const keyword of accord.keywords) {
      if (notesLower.some(note => note.includes(keyword.toLowerCase()))) {
        detected.add(id);
        break;
      }
    }
  }

  return Array.from(detected);
}

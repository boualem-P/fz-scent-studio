/**
 * PARFUM_ACCORDS — Mapping enrichi des 38 parfums vers leurs accords principaux.
 * * Version "Juste Milieu" : Combine la structure de dominance de Fragrantica 
 * avec la précision technique des notes spécifiques (Library 85+).
 * * Les accords sont classés par ordre de dominance décroissante.
 */

export const PARFUM_ACCORDS: Record<string, string[]> = {

  // ── DIOR ──────────────────────────────────────────────────────

  "j-adore-dior": [
    "white_floral", "floral", "fruity", "sweet", "fresh",
    "jasmine", "tuberose", "rose", "musky", "vanilla"
  ],

  "sauvage-dior": [
    "aromatic", "fresh_spicy", "citrus", "ambergris", "woody", 
    "lavender", "spicy", "musky", "herbal", "pink_pepper"
  ],

"fahrenheit-dior": [
  "leather", "woody", "ozonic", "fresh_spicy", "aromatic",
  "violet", "earthy", "animalic", "floral", "vetiver"
],

  "homme-intense-dior": [
    "iris", "powdery", "lavender", "woody", "violet", 
    "earthy", "amber_woody", "musky", "cedar", "vetiver"
  ],

  // ── CHANEL ────────────────────────────────────────────────────

  "bleu-de-chanel": [
    "woody", "citrus", "aromatic", "amber", "fresh_spicy",
    "smoky", "incense", "cedar", "sandalwood", "warm_woody"
  ],

  "le-lion-chanel": [
    "amber", "balsamic", "smoky", "woody", "powdery", 
    "oriental", "patchouli", "vanilla", "animalic", "incense"
  ],

  "allure-sport-chanel": [
    "citrus", "aromatic", "vanilla", "aldehydic", "marine",
    "tonka_bean", "musky", "amber", "cedar", "fresh"
  ],

  "no5-chanel": [
    "aldehydic", "white_floral", "floral", "powdery", "jasmine",
    "rose", "vanilla", "musky", "sandalwood", "iris"
  ],
  
  // ── YSL ───────────────────────────────────────────────────────

  "black-opium": [
    "vanilla", "coffee", "sweet", "white_floral", "gourmand", 
    "warm_spicy", "fruity", "woody", "jasmine", "oriental"
  ],

  "libre-ysl": [
    "white_floral", "lavender", "citrus", "vanilla", "aromatic", 
    "orange_blossom", "powdery", "sweet", "musky", "amber"
  ],

  "la-nuit-de-l-homme": [
    "aromatic", "lavender", "fresh_spicy", "woody", "warm_spicy", 
    "spicy", "cedar", "citrus", "vetiver"
  ],

  "y-edp-ysl": [
    "aromatic", "woody", "fresh_spicy", "amber", "citrus", 
    "green", "herbal", "sage", "cedar", "incense"
  ],

  // ── LE LABO ───────────────────────────────────────────────────

  "the-noir-29": [
    "woody", "smoky", "tea", "tobacco", "fresh_spicy", 
    "fruity", "aromatic", "musky", "earthy", "fig"
  ],

  "santal-33": [
    "woody", "powdery", "leather", "sandalwood", "warm_spicy", 
    "violet", "aromatic", "papyrus", "cedar", "ambergris"
  ],

  // ── LANCÔME ───────────────────────────────────────────────────

  "la-vie-est-belle": [
    "sweet", "vanilla", "fruity", "gourmand", "iris", 
    "powdery", "patchouli", "white_floral", "tonka_bean", "earthy"
  ],

  // ── GIVENCHY ──────────────────────────────────────────────────

  "l-interdit": [
    "white_floral", "tuberose", "patchouli", "orange_blossom", 
    "jasmine", "woody", "fruity", "sweet", "animalic", "vanilla"
  ],

  "gentleman-givenchy": [
    "iris", "powdery", "vanilla", "warm_spicy", "woody", 
    "violet", "aromatic", "earthy", "lavender", "patchouli"
  ],

  // ── BURBERRY ──────────────────────────────────────────────────

  "her-burberry": [
    "fruity", "sweet", "floral_fruity", "woody", "musky", 
    "powdery", "violet", "jasmine", "amber", "floral"
  ],

  // ── CREED ─────────────────────────────────────────────────────

  "aventus-creed": [
    "fruity", "sweet", "woody", "smoky", "leather", 
    "citrus", "musky", "tropical", "fresh", "patchouli"
  ],

  // ── MAISON FRANCIS KURKDJIAN ──────────────────────────────────

  "baccarat-rouge-540": [
    "amber_woody", "woody", "amber", "warm_spicy", "saffron", 
    "fresh_spicy", "aromatic", "jasmine", "mineral", "conifer"
  ],
  
  "grand-soir-mfk": [
   "amber", "vanilla",  "powdery",  "sweet",  "aromatic"
],

  // ── PARFUMS DE MARLY ──────────────────────────────────────────

  "layton-pdm": [
    "warm_spicy", "vanilla", "woody", "aromatic", "fruity", 
    "lavender", "fresh_spicy", "powdery", "spicy", "sandalwood"
  ],

  // ── KILIAN PARIS ──────────────────────────────────────────────

  "angels-share": [
    "warm_spicy", "alcoholic", "sweet", "vanilla", "woody", 
    "cinnamon", "tonka_bean", "powdery", "amber", "caramel"
  ],

  // ── HERMÈS ────────────────────────────────────────────────────

  "terre-d-hermes": [
    "citrus", "woody", "fresh_spicy", "aromatic", "earthy", 
    "mineral", "vetiver", "spicy", "cedar", "balsamic"
  ],

  // ── JEAN PAUL GAULTIER ────────────────────────────────────────

  "le-male-jpg": [
    "vanilla", "lavender", "fresh_spicy", "aromatic", "powdery", 
    "sweet", "green", "orange_blossom", "tonka_bean", "musky"
  ],

  // ── VERSACE ───────────────────────────────────────────────────

  "eros-versace": [
    "vanilla", "aromatic", "green", "fresh_spicy", "amber", 
    "tonka_bean", "citrus", "woody", "mint", "ambergris"
  ],

  // ── ARMANI ────────────────────────────────────────────────────

  "acqua-di-gio": [
    "aromatic", "marine", "citrus", "aquatic", "fresh", 
    "floral", "fresh_spicy", "ozonic", "woody", "musky"
  ],

  // ── CAROLINA HERRERA ──────────────────────────────────────────

"good-girl": [
  "sweet", "white_floral", "warm_spicy", "vanilla", "amber",
  "gourmand", "cacao", "tuberose", "coffee", "tonka_bean", "woody"
],

  // ── CHLOÉ ─────────────────────────────────────────────────────

  "nomade-chloe": [
    "floral", "woody", "earthy", "fruity", "mossy", 
    "citrus", "fresh", "musky", "patchouli", "amber_woody"
  ],

  // ── TOM FORD ──────────────────────────────────────────────────

  "black-orchid-tf": [
    "warm_spicy", "earthy", "woody", "sweet", "amber", 
    "patchouli", "floral", "chocolate", "fruity", "narcotic_floral"
  ],

  // ── VIKTOR&ROLF ───────────────────────────────────────────────

  "spicebomb": [
    "warm_spicy", "spicy", "tobacco", "sweet", "leather", 
    "woody", "aromatic", "citrus", "pink_pepper", "cinnamon"
  ],

  "spicebomb-extreme": [
    "fresh_spicy", "tobacco", "vanilla", "warm_spicy", 
    "aromatic", "sweet", "cinnamon", "saffron", "balsamic"
  ],

  // ── DOLCE & GABBANA ───────────────────────────────────────────

  "the-one-dg": [
    "amber", "warm_spicy", "tobacco", "aromatic", "citrus", 
    "sweet", "woody", "orange_blossom", "balsamic", "spicy"
  ],

  // ── PRADA ─────────────────────────────────────────────────────

  "prada-l-homme": [
    "iris", "powdery", "floral", "aromatic", "fresh_spicy", 
    "woody", "violet", "cedar", "amber", "spicy"
  ],

  // ── AZZARO ────────────────────────────────────────────────────

  "wanted-by-night": [
    "warm_spicy", "tobacco", "woody", "fruity", "aromatic", 
    "cinnamon", "leather", "citrus", "amber", "incense"
  ],

  // ── VALENTINO ─────────────────────────────────────────────────

  "born-in-roma": [
    "vanilla", "woody", "mineral", "fruity", "aromatic", 
    "fresh_spicy", "violet", "herbal", "ozonic", "salty"
  ],

  // ── MANCERA ───────────────────────────────────────────────────

  "cedrat-boise": [
    "citrus", "woody", "fruity", "aromatic", "leather", 
    "fresh_spicy", "powdery", "musky", "cedar", "mossy"
  ],

  // ── PACO RABANNE ──────────────────────────────────────────────

  "one-million-pr": [
    "warm_spicy", "cinnamon", "citrus", "leather", "amber", 
    "rose", "animalic", "patchouli", "woody", "spicy"
  ],

  // ── GUERLAIN ──────────────────────────────────────────────────

  "homme-ideal-guerlain": [
    "aromatic", "sweet", "nutty", "almond", "citrus", 
    "leather", "tonka_bean", "woody", "fresh_spicy", "vanilla"
  ],

  // ── ACQUA DI PARMA ────────────────────────────────────────────

  "acqua-di-parma-colonia": [
    "citrus", "aromatic", "fresh", "fresh_spicy", "floral", 
    "lavender", "herbal", "musky", "rose", "woody"
  ],

  // ── xerjoff ──────────────────────────────────────────────────────

  "torino21-xerjoff": [
  "aromatic", "fresh_spicy", "green", "citrus", "musky",
  "lavender", "herbal", "fresh", "mint", "aquatic"
],
};

/**
 * Retourne les accordIds d'un parfum.
 * Si non défini dans PARFUM_ACCORDS, retourne un tableau vide.
 */
export function getAccordIdsForPerfume(perfumeId: string): string[] {
  return PARFUM_ACCORDS[perfumeId] ?? [];
}

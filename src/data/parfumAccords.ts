/**
 * PARFUM_ACCORDS — Mapping des 38 parfums vers leurs accords principaux
 *
 * Chaque entrée : parfumId → string[] d'accordIds depuis ACCORDS_LIBRARY
 * Les accords sont classés du plus dominant au plus subtil.
 *
 * Méthode : basé sur la composition réelle de chaque parfum,
 * connaissance des grandes maisons et profil olfactif documenté.
 */

export const PARFUM_ACCORDS: Record<string, string[]> = {

  // ── DIOR ──────────────────────────────────────────────────────

  "j-adore-dior": [
    "floral", "white_floral", "rose", "jasmine", "tuberose",
    "fruity", "floral_fruity", "musky", "vanilla", "sweet_floral"
  ],

  "sauvage-dior": [
    "fresh_spicy", "aromatic", "citrus", "pink_pepper", "ambergris",
    "woody", "warm_woody", "lavender", "fresh_aromatic"
  ],

  "fahrenheit-dior": [
    "leather", "violet", "woody", "warm_spicy", "amber",
    "floral", "iris_powdery", "vetiver", "earthy"
  ],

  "homme-intense-dior": [
    "iris_powdery", "lavender", "woody", "cedar", "amber_woody",
    "sweet_floral", "vetiver", "musky"
  ],

  // ── CHANEL ────────────────────────────────────────────────────

  "bleu-de-chanel": [
    "aromatic", "citrus", "woody", "cedar", "incense",
    "fresh_spicy", "warm_woody", "amber_woody", "sandalwood"
  ],

  "le-lion-chanel": [
    "amber", "balsamic", "oriental", "styrax", "patchouli",
    "sandalwood", "vanilla", "warm_woody", "incense"
  ],

  "allure-sport-chanel": [
    "citrus", "aquatic", "fresh", "aromatic", "tonka_bean",
    "vanilla", "musky", "cedar", "woody"
  ],

  // ── YSL ───────────────────────────────────────────────────────

  "black-opium": [
    "coffee", "vanilla", "white_floral", "jasmine", "gourmand",
    "sweet", "woody", "warm_woody", "oriental"
  ],

  "libre-ysl": [
    "lavender", "orange_blossom", "vanilla", "floral", "amber",
    "musky", "citrus", "fresh_aromatic"
  ],

  "la-nuit-de-l-homme": [
    "lavender", "aromatic", "woody", "cedar", "spicy",
    "fresh_spicy", "vetiver", "aromatic_fougere"
  ],

  "y-edp-ysl": [
    "aromatic", "woody", "amber", "fresh_spicy", "herbal",
    "citrus", "vetiver", "incense", "cedar"
  ],

  // ── LE LABO ───────────────────────────────────────────────────

  "the-noir-29": [
    "tea", "smoky", "tobacco", "woody", "vetiver",
    "green", "earthy", "cedar", "fig"
  ],

  "santal-33": [
    "sandalwood", "leather", "woody", "smoky", "iris_powdery",
    "papyrus", "cedar", "ambergris", "warm_woody"
  ],

  // ── LANCÔME ───────────────────────────────────────────────────

  "la-vie-est-belle": [
    "gourmand", "iris_powdery", "sweet", "vanilla", "tonka_bean",
    "floral", "orange_blossom", "patchouli", "fruity_gourmand"
  ],

  // ── GIVENCHY ──────────────────────────────────────────────────

  "l-interdit": [
    "white_floral", "tuberose", "orange_blossom", "jasmine", "patchouli",
    "woody", "ambergris", "narcotic_floral", "vanilla"
  ],

  "gentleman-givenchy": [
    "iris_powdery", "spicy", "warm_spicy", "lavender", "patchouli",
    "vanilla", "benzoin", "tonka_bean", "oriental"
  ],

  // ── BURBERRY ──────────────────────────────────────────────────

  "her-burberry": [
    "fruity", "floral_fruity", "sweet", "violet", "jasmine",
    "musky", "amber", "earthy", "woody"
  ],

  // ── CREED ─────────────────────────────────────────────────────

  "aventus-creed": [
    "fruity", "smoky", "woody", "patchouli", "ambergris",
    "citrus", "earthy", "musky", "floral"
  ],

  // ── MAISON FRANCIS KURKDJIAN ──────────────────────────────────

  "baccarat-rouge-540": [
    "amber_woody", "saffron", "jasmine", "ambergris", "mineral",
    "woody", "aldehydic", "warm_woody", "sweet_floral"
  ],

  // ── PARFUMS DE MARLY ──────────────────────────────────────────

  "layton-pdm": [
    "floral", "vanilla", "woody", "lavender", "spicy",
    "fruity", "sandalwood", "patchouli", "warm_woody"
  ],

  // ── KILIAN PARIS ──────────────────────────────────────────────

  "angels-share": [
    "alcoholic", "vanilla", "warm_spicy", "cinnamon", "tonka_bean",
    "gourmand", "caramel", "sandalwood", "sweet"
  ],

  // ── HERMÈS ────────────────────────────────────────────────────

  "terre-d-hermes": [
    "woody", "mineral", "citrus", "earthy", "vetiver",
    "spicy", "cedar", "balsamic", "green"
  ],

  // ── JEAN PAUL GAULTIER ────────────────────────────────────────

  "le-male-jpg": [
    "lavender", "vanilla", "aromatic", "orange_blossom", "warm_spicy",
    "tonka_bean", "fresh_aromatic", "musky", "sandalwood"
  ],

  // ── VERSACE ───────────────────────────────────────────────────

  "eros-versace": [
    "fresh", "vanilla", "woody", "ambergris", "tonka_bean",
    "citrus", "earthy", "green", "warm_woody"
  ],

  // ── ARMANI ────────────────────────────────────────────────────

  "acqua-di-gio": [
    "aquatic", "citrus", "fresh", "ozonic", "floral",
    "woody", "musky", "mineral", "earthy"
  ],

  // ── CAROLINA HERRERA ──────────────────────────────────────────

  "good-girl": [
    "gourmand", "white_floral", "jasmine", "tuberose", "coffee",
    "chocolate", "vanilla", "tonka_bean", "sweet", "iris_powdery"
  ],

  // ── CHLOÉ ─────────────────────────────────────────────────────

  "nomade-chloe": [
    "floral", "earthy", "woody", "floral_fruity", "musky",
    "patchouli", "amber_woody", "sandalwood", "sweet_floral"
  ],

  // ── TOM FORD ──────────────────────────────────────────────────

  "black-orchid-tf": [
    "narcotic_floral", "chocolate", "patchouli", "amber", "spicy",
    "earthy", "incense", "tobacco", "animalic", "oriental"
  ],

  // ── VIKTOR&ROLF ───────────────────────────────────────────────

  "spicebomb": [
    "warm_spicy", "spicy", "saffron", "tobacco", "leather",
    "cinnamon", "citrus", "pink_pepper", "vetiver"
  ],

  "spicebomb-extreme": [
    "warm_spicy", "tobacco", "saffron", "oriental", "vanilla",
    "cinnamon", "spicy", "balsamic", "styrax", "amber"
  ],

  // ── DOLCE & GABBANA ───────────────────────────────────────────

  "the-one-dg": [
    "amber", "tobacco", "oriental", "spicy", "orange_blossom",
    "warm_spicy", "woody", "aromatic", "balsamic"
  ],

  // ── PRADA ─────────────────────────────────────────────────────

  "prada-l-homme": [
    "iris_powdery", "aromatic", "woody", "spicy", "floral",
    "violet", "cedar", "patchouli", "amber"
  ],

  // ── AZZARO ────────────────────────────────────────────────────

  "wanted-by-night": [
    "tobacco", "leather", "oriental", "incense", "warm_spicy",
    "vanilla", "woody", "amber", "smoky", "balsamic"
  ],

  // ── VALENTINO ─────────────────────────────────────────────────

  "born-in-roma": [
    "mineral", "smoky", "woody", "vetiver", "herbal",
    "earthy", "spicy", "green"
  ],

  // ── MANCERA ───────────────────────────────────────────────────

  "cedrat-boise": [
    "citrus", "woody", "fruity", "leather", "earthy",
    "cedar", "sandalwood", "musky", "green"
  ],

  // ── PACO RABANNE ──────────────────────────────────────────────

  "one-million-pr": [
    "leather", "amber", "warm_spicy", "cinnamon", "citrus",
    "patchouli", "woody", "spicy", "rose"
  ],

  // ── GUERLAIN ──────────────────────────────────────────────────

  "homme-ideal-guerlain": [
    "almond", "aromatic", "citrus", "tonka_bean", "leather",
    "woody", "herbal", "fresh_aromatic", "vetiver"
  ],

  // ── ACQUA DI PARMA ────────────────────────────────────────────

  "acqua-di-parma-colonia": [
    "citrus", "aromatic", "fresh", "floral", "woody",
    "lavender", "rose", "herbal", "earthy", "citrus_aromatic"
  ],
};

/**
 * Retourne les accordIds d'un parfum
 * Si non défini dans PARFUM_ACCORDS, retourne un tableau vide
 */
export function getAccordIdsForPerfume(perfumeId: string): string[] {
  return PARFUM_ACCORDS[perfumeId] ?? [];
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type NoteCategory =
  | "sweet" | "fresh" | "woody" | "spicy" | "floral"
  | "oriental" | "musky" | "leather" | "green" | "fruity";

export interface NoteProfile {
  note: string;
  category: NoteCategory;
  intensity: number;
  warmth: number;
  freshness: number;
  sensuality: number;
  seasonality: { summer: number; winter: number; spring: number; autumn: number };
  occasions: string[];
  vibes: string[];
}

export interface PerfumeExpertProfile {
  dominantCategories: string[];
  globalVibe: string[];
  recommendedOccasions: string[];
  seasonScore: Record<string, number>;
  intensityScore: number;
  uniquenessScore: number;
}

// ─── BASE DE CONNAISSANCE ─────────────────────────────────────────────────────

export const NOTE_EXPERT_PROFILES: Record<string, NoteProfile> = {
  // 🍰 Gourmand / Sucré
  vanille:    { note: "vanille",    category: "sweet",    intensity: 0.7, warmth: 0.9, freshness: 0.1, sensuality: 0.85, seasonality: { summer: 0.3, winter: 0.9, spring: 0.5, autumn: 0.8 }, occasions: ["soirée", "date", "hiver"], vibes: ["séduisant", "enveloppant", "gourmand"] },
  tonka:      { note: "tonka",      category: "sweet",    intensity: 0.65, warmth: 0.85, freshness: 0.1, sensuality: 0.8, seasonality: { summer: 0.2, winter: 0.9, spring: 0.4, autumn: 0.8 }, occasions: ["soirée", "date"], vibes: ["chaleureux", "gourmand", "sensuel"] },
  caramel:    { note: "caramel",    category: "sweet",    intensity: 0.6, warmth: 0.8, freshness: 0.05, sensuality: 0.7, seasonality: { summer: 0.2, winter: 0.85, spring: 0.3, autumn: 0.7 }, occasions: ["soirée", "casual"], vibes: ["gourmand", "doux", "réconfortant"] },
  miel:       { note: "miel",       category: "sweet",    intensity: 0.55, warmth: 0.75, freshness: 0.1, sensuality: 0.65, seasonality: { summer: 0.3, winter: 0.8, spring: 0.5, autumn: 0.7 }, occasions: ["date", "casual"], vibes: ["doux", "naturel", "sensuel"] },
  chocolat:   { note: "chocolat",   category: "sweet",    intensity: 0.7, warmth: 0.85, freshness: 0.05, sensuality: 0.75, seasonality: { summer: 0.15, winter: 0.9, spring: 0.3, autumn: 0.8 }, occasions: ["soirée", "date"], vibes: ["gourmand", "intense", "luxueux"] },
  praline:    { note: "praline",    category: "sweet",    intensity: 0.55, warmth: 0.7, freshness: 0.05, sensuality: 0.6, seasonality: { summer: 0.2, winter: 0.85, spring: 0.35, autumn: 0.75 }, occasions: ["casual", "date"], vibes: ["gourmand", "doux"] },
  sucre:      { note: "sucre",      category: "sweet",    intensity: 0.4, warmth: 0.5, freshness: 0.1, sensuality: 0.5, seasonality: { summer: 0.3, winter: 0.7, spring: 0.5, autumn: 0.6 }, occasions: ["casual", "quotidien"], vibes: ["doux", "léger"] },
  cacao:      { note: "cacao",      category: "sweet",    intensity: 0.65, warmth: 0.8, freshness: 0.05, sensuality: 0.7, seasonality: { summer: 0.15, winter: 0.9, spring: 0.3, autumn: 0.8 }, occasions: ["soirée"], vibes: ["intense", "gourmand", "sombre"] },
  amande:     { note: "amande",     category: "sweet",    intensity: 0.45, warmth: 0.6, freshness: 0.15, sensuality: 0.5, seasonality: { summer: 0.3, winter: 0.7, spring: 0.5, autumn: 0.65 }, occasions: ["casual", "bureau"], vibes: ["doux", "poudreux"] },
  cafe:       { note: "café",       category: "sweet",    intensity: 0.7, warmth: 0.75, freshness: 0.1, sensuality: 0.6, seasonality: { summer: 0.2, winter: 0.85, spring: 0.3, autumn: 0.8 }, occasions: ["soirée", "bureau"], vibes: ["intense", "sophistiqué", "moderne"] },

  // 🍋 Frais / Agrumes
  citron:       { note: "citron",       category: "fresh", intensity: 0.5, warmth: 0.1, freshness: 0.95, sensuality: 0.15, seasonality: { summer: 0.95, winter: 0.2, spring: 0.8, autumn: 0.3 }, occasions: ["été", "bureau", "quotidien", "sport"], vibes: ["frais", "énergisant", "pétillant"] },
  bergamote:    { note: "bergamote",    category: "fresh", intensity: 0.5, warmth: 0.15, freshness: 0.9, sensuality: 0.25, seasonality: { summer: 0.9, winter: 0.3, spring: 0.85, autumn: 0.4 }, occasions: ["été", "bureau", "quotidien"], vibes: ["élégant", "frais", "lumineux"] },
  orange:       { note: "orange",       category: "fresh", intensity: 0.45, warmth: 0.2, freshness: 0.85, sensuality: 0.2, seasonality: { summer: 0.9, winter: 0.25, spring: 0.8, autumn: 0.35 }, occasions: ["été", "quotidien"], vibes: ["joyeux", "frais", "solaire"] },
  pamplemousse: { note: "pamplemousse", category: "fresh", intensity: 0.5, warmth: 0.1, freshness: 0.95, sensuality: 0.1, seasonality: { summer: 0.95, winter: 0.15, spring: 0.85, autumn: 0.25 }, occasions: ["été", "sport", "quotidien"], vibes: ["dynamique", "frais", "vif"] },
  mandarine:    { note: "mandarine",    category: "fresh", intensity: 0.4, warmth: 0.2, freshness: 0.85, sensuality: 0.2, seasonality: { summer: 0.9, winter: 0.2, spring: 0.8, autumn: 0.35 }, occasions: ["été", "quotidien"], vibes: ["doux", "solaire", "joyeux"] },
  yuzu:         { note: "yuzu",         category: "fresh", intensity: 0.45, warmth: 0.1, freshness: 0.9, sensuality: 0.15, seasonality: { summer: 0.9, winter: 0.2, spring: 0.85, autumn: 0.3 }, occasions: ["été", "bureau"], vibes: ["raffiné", "frais", "moderne"] },
  neroli:       { note: "néroli",       category: "fresh", intensity: 0.5, warmth: 0.2, freshness: 0.8, sensuality: 0.4, seasonality: { summer: 0.85, winter: 0.3, spring: 0.9, autumn: 0.4 }, occasions: ["été", "mariage", "quotidien"], vibes: ["lumineux", "élégant", "raffiné"] },
  petitgrain:   { note: "petit grain",  category: "fresh", intensity: 0.4, warmth: 0.15, freshness: 0.85, sensuality: 0.15, seasonality: { summer: 0.9, winter: 0.2, spring: 0.8, autumn: 0.3 }, occasions: ["été", "bureau"], vibes: ["frais", "vert", "propre"] },

  // 🌲 Boisé
  cedre:    { note: "cèdre",    category: "woody", intensity: 0.6, warmth: 0.6, freshness: 0.3, sensuality: 0.5, seasonality: { summer: 0.4, winter: 0.7, spring: 0.5, autumn: 0.8 }, occasions: ["bureau", "quotidien", "soirée"], vibes: ["élégant", "masculin", "noble"] },
  santal:   { note: "santal",   category: "woody", intensity: 0.65, warmth: 0.75, freshness: 0.15, sensuality: 0.8, seasonality: { summer: 0.3, winter: 0.8, spring: 0.5, autumn: 0.75 }, occasions: ["date", "soirée", "mariage"], vibes: ["sensuel", "crémeux", "raffiné"] },
  vetiver:  { note: "vétiver",  category: "woody", intensity: 0.6, warmth: 0.4, freshness: 0.5, sensuality: 0.45, seasonality: { summer: 0.5, winter: 0.6, spring: 0.6, autumn: 0.7 }, occasions: ["bureau", "quotidien"], vibes: ["terreux", "sophistiqué", "masculin"] },
  patchouli:{ note: "patchouli",category: "woody", intensity: 0.75, warmth: 0.7, freshness: 0.1, sensuality: 0.7, seasonality: { summer: 0.2, winter: 0.85, spring: 0.4, autumn: 0.8 }, occasions: ["soirée", "date"], vibes: ["intense", "mystérieux", "bohème"] },
  oud:      { note: "oud",      category: "woody", intensity: 0.95, warmth: 0.85, freshness: 0.05, sensuality: 0.9, seasonality: { summer: 0.15, winter: 0.95, spring: 0.3, autumn: 0.85 }, occasions: ["soirée", "cérémonie", "date"], vibes: ["puissant", "royal", "mystique"] },
  gaiac:    { note: "gaïac",    category: "woody", intensity: 0.6, warmth: 0.65, freshness: 0.2, sensuality: 0.55, seasonality: { summer: 0.3, winter: 0.75, spring: 0.45, autumn: 0.7 }, occasions: ["bureau", "soirée"], vibes: ["fumé", "élégant", "discret"] },
  bouleau:  { note: "bouleau",  category: "woody", intensity: 0.55, warmth: 0.5, freshness: 0.35, sensuality: 0.35, seasonality: { summer: 0.35, winter: 0.65, spring: 0.5, autumn: 0.7 }, occasions: ["quotidien", "bureau"], vibes: ["naturel", "propre", "boisé"] },
  cyprès:   { note: "cyprès",   category: "woody", intensity: 0.5, warmth: 0.35, freshness: 0.55, sensuality: 0.3, seasonality: { summer: 0.5, winter: 0.5, spring: 0.6, autumn: 0.65 }, occasions: ["quotidien", "bureau"], vibes: ["frais", "vert", "noble"] },

  // 🌸 Floral
  rose:           { note: "rose",            category: "floral", intensity: 0.65, warmth: 0.45, freshness: 0.4, sensuality: 0.75, seasonality: { summer: 0.5, winter: 0.5, spring: 0.9, autumn: 0.6 }, occasions: ["date", "mariage", "soirée"], vibes: ["romantique", "classique", "féminin"] },
  jasmin:         { note: "jasmin",          category: "floral", intensity: 0.7, warmth: 0.5, freshness: 0.35, sensuality: 0.85, seasonality: { summer: 0.6, winter: 0.4, spring: 0.85, autumn: 0.5 }, occasions: ["date", "soirée", "mariage"], vibes: ["séduisant", "envoûtant", "sensuel"] },
  iris:           { note: "iris",            category: "floral", intensity: 0.55, warmth: 0.35, freshness: 0.4, sensuality: 0.6, seasonality: { summer: 0.4, winter: 0.6, spring: 0.8, autumn: 0.65 }, occasions: ["bureau", "mariage", "quotidien"], vibes: ["poudreux", "élégant", "raffiné"] },
  tubereuse:      { note: "tubéreuse",       category: "floral", intensity: 0.8, warmth: 0.55, freshness: 0.2, sensuality: 0.9, seasonality: { summer: 0.5, winter: 0.5, spring: 0.7, autumn: 0.6 }, occasions: ["soirée", "date"], vibes: ["capiteux", "opulent", "séduisant"] },
  fleur_oranger:  { note: "fleur d'oranger", category: "floral", intensity: 0.55, warmth: 0.4, freshness: 0.55, sensuality: 0.5, seasonality: { summer: 0.7, winter: 0.3, spring: 0.85, autumn: 0.45 }, occasions: ["mariage", "quotidien", "été"], vibes: ["lumineux", "doux", "solaire"] },
  violette:       { note: "violette",        category: "floral", intensity: 0.45, warmth: 0.3, freshness: 0.5, sensuality: 0.45, seasonality: { summer: 0.5, winter: 0.4, spring: 0.85, autumn: 0.55 }, occasions: ["quotidien", "bureau"], vibes: ["poudreux", "rétro", "délicat"] },
  pivoine:        { note: "pivoine",         category: "floral", intensity: 0.45, warmth: 0.3, freshness: 0.55, sensuality: 0.4, seasonality: { summer: 0.6, winter: 0.25, spring: 0.9, autumn: 0.4 }, occasions: ["quotidien", "mariage"], vibes: ["frais", "romantique", "printanier"] },
  muguet:         { note: "muguet",          category: "floral", intensity: 0.4, warmth: 0.2, freshness: 0.7, sensuality: 0.3, seasonality: { summer: 0.55, winter: 0.2, spring: 0.95, autumn: 0.35 }, occasions: ["quotidien", "bureau"], vibes: ["frais", "propre", "délicat"] },
  magnolia:       { note: "magnolia",        category: "floral", intensity: 0.5, warmth: 0.35, freshness: 0.5, sensuality: 0.5, seasonality: { summer: 0.6, winter: 0.3, spring: 0.85, autumn: 0.45 }, occasions: ["quotidien", "mariage"], vibes: ["crémeux", "féminin", "doux"] },
  ylang:          { note: "ylang-ylang",     category: "floral", intensity: 0.7, warmth: 0.5, freshness: 0.3, sensuality: 0.85, seasonality: { summer: 0.6, winter: 0.4, spring: 0.7, autumn: 0.5 }, occasions: ["date", "soirée"], vibes: ["exotique", "sensuel", "envoûtant"] },

  // 🌶 Épicé
  poivre:     { note: "poivre",     category: "spicy", intensity: 0.6, warmth: 0.65, freshness: 0.35, sensuality: 0.5, seasonality: { summer: 0.35, winter: 0.7, spring: 0.5, autumn: 0.75 }, occasions: ["soirée", "bureau"], vibes: ["piquant", "dynamique", "viril"] },
  cannelle:   { note: "cannelle",   category: "spicy", intensity: 0.65, warmth: 0.9, freshness: 0.1, sensuality: 0.65, seasonality: { summer: 0.15, winter: 0.95, spring: 0.3, autumn: 0.85 }, occasions: ["soirée", "hiver", "date"], vibes: ["chaleureux", "épicé", "enveloppant"] },
  safran:     { note: "safran",     category: "spicy", intensity: 0.75, warmth: 0.85, freshness: 0.1, sensuality: 0.7, seasonality: { summer: 0.2, winter: 0.9, spring: 0.35, autumn: 0.8 }, occasions: ["soirée", "cérémonie", "date"], vibes: ["luxueux", "royal", "intense"] },
  cardamome:  { note: "cardamome",  category: "spicy", intensity: 0.55, warmth: 0.6, freshness: 0.4, sensuality: 0.45, seasonality: { summer: 0.4, winter: 0.7, spring: 0.55, autumn: 0.7 }, occasions: ["bureau", "quotidien", "soirée"], vibes: ["raffiné", "frais-épicé", "élégant"] },
  muscade:    { note: "muscade",    category: "spicy", intensity: 0.55, warmth: 0.75, freshness: 0.15, sensuality: 0.5, seasonality: { summer: 0.2, winter: 0.8, spring: 0.35, autumn: 0.75 }, occasions: ["soirée", "hiver"], vibes: ["chaleureux", "épicé", "cocooning"] },
  gingembre:  { note: "gingembre",  category: "spicy", intensity: 0.55, warmth: 0.5, freshness: 0.5, sensuality: 0.35, seasonality: { summer: 0.5, winter: 0.6, spring: 0.6, autumn: 0.6 }, occasions: ["quotidien", "bureau"], vibes: ["frais", "piquant", "énergisant"] },
  clou:       { note: "clou de girofle", category: "spicy", intensity: 0.65, warmth: 0.8, freshness: 0.1, sensuality: 0.55, seasonality: { summer: 0.15, winter: 0.9, spring: 0.3, autumn: 0.8 }, occasions: ["soirée", "hiver"], vibes: ["puissant", "épicé", "sombre"] },
  cumin:      { note: "cumin",      category: "spicy", intensity: 0.6, warmth: 0.7, freshness: 0.1, sensuality: 0.4, seasonality: { summer: 0.2, winter: 0.75, spring: 0.35, autumn: 0.7 }, occasions: ["soirée"], vibes: ["terreux", "chaud", "brut"] },

  // 🌿 Vert / Aromatique
  menthe:   { note: "menthe",     category: "green", intensity: 0.5, warmth: 0.05, freshness: 0.95, sensuality: 0.1, seasonality: { summer: 0.95, winter: 0.15, spring: 0.8, autumn: 0.25 }, occasions: ["été", "sport", "quotidien"], vibes: ["glacial", "frais", "énergisant"] },
  basilic:  { note: "basilic",    category: "green", intensity: 0.45, warmth: 0.15, freshness: 0.8, sensuality: 0.15, seasonality: { summer: 0.85, winter: 0.2, spring: 0.75, autumn: 0.3 }, occasions: ["été", "quotidien"], vibes: ["aromatique", "frais", "naturel"] },
  lavande:  { note: "lavande",    category: "green", intensity: 0.5, warmth: 0.3, freshness: 0.7, sensuality: 0.3, seasonality: { summer: 0.65, winter: 0.35, spring: 0.8, autumn: 0.5 }, occasions: ["quotidien", "bureau", "détente"], vibes: ["propre", "apaisant", "classique"] },
  romarin:  { note: "romarin",    category: "green", intensity: 0.45, warmth: 0.2, freshness: 0.75, sensuality: 0.1, seasonality: { summer: 0.8, winter: 0.25, spring: 0.75, autumn: 0.35 }, occasions: ["été", "sport"], vibes: ["herbacé", "frais", "méditerranéen"] },
  the_vert: { note: "thé vert",   category: "green", intensity: 0.35, warmth: 0.15, freshness: 0.8, sensuality: 0.2, seasonality: { summer: 0.8, winter: 0.3, spring: 0.8, autumn: 0.4 }, occasions: ["bureau", "quotidien"], vibes: ["zen", "propre", "minimaliste"] },
  sauge:    { note: "sauge",      category: "green", intensity: 0.45, warmth: 0.25, freshness: 0.65, sensuality: 0.2, seasonality: { summer: 0.6, winter: 0.3, spring: 0.7, autumn: 0.45 }, occasions: ["quotidien", "bureau"], vibes: ["herbacé", "naturel", "propre"] },
  galbanum: { note: "galbanum",   category: "green", intensity: 0.5, warmth: 0.15, freshness: 0.75, sensuality: 0.2, seasonality: { summer: 0.6, winter: 0.3, spring: 0.8, autumn: 0.45 }, occasions: ["bureau", "quotidien"], vibes: ["vert", "tranchant", "moderne"] },
  figue:    { note: "figue",      category: "green", intensity: 0.45, warmth: 0.3, freshness: 0.6, sensuality: 0.45, seasonality: { summer: 0.85, winter: 0.2, spring: 0.7, autumn: 0.4 }, occasions: ["été", "quotidien", "date"], vibes: ["solaire", "crémeux", "méditerranéen"] },

  // 🐾 Musqué / Animal
  musc:      { note: "musc",      category: "musky", intensity: 0.5, warmth: 0.5, freshness: 0.3, sensuality: 0.75, seasonality: { summer: 0.5, winter: 0.6, spring: 0.5, autumn: 0.6 }, occasions: ["date", "quotidien", "soirée"], vibes: ["sensuel", "peau", "intime"] },
  ambrette:  { note: "ambrette",  category: "musky", intensity: 0.4, warmth: 0.45, freshness: 0.35, sensuality: 0.6, seasonality: { summer: 0.5, winter: 0.5, spring: 0.55, autumn: 0.55 }, occasions: ["quotidien", "date"], vibes: ["doux", "musqué", "naturel"] },
  civette:   { note: "civette",   category: "musky", intensity: 0.7, warmth: 0.6, freshness: 0.05, sensuality: 0.8, seasonality: { summer: 0.2, winter: 0.75, spring: 0.3, autumn: 0.7 }, occasions: ["soirée"], vibes: ["animal", "provocant", "intense"] },
  ambre_gris:{ note: "ambre gris", category: "musky", intensity: 0.6, warmth: 0.65, freshness: 0.2, sensuality: 0.75, seasonality: { summer: 0.35, winter: 0.75, spring: 0.45, autumn: 0.7 }, occasions: ["soirée", "date"], vibes: ["marin", "sensuel", "mystérieux"] },

  // 🧥 Cuir / Fumé / Oriental
  cuir:    { note: "cuir",    category: "leather", intensity: 0.75, warmth: 0.7, freshness: 0.1, sensuality: 0.8, seasonality: { summer: 0.2, winter: 0.85, spring: 0.35, autumn: 0.8 }, occasions: ["soirée", "date"], vibes: ["rebelle", "viril", "puissant"] },
  tabac:   { note: "tabac",   category: "leather", intensity: 0.7, warmth: 0.8, freshness: 0.05, sensuality: 0.65, seasonality: { summer: 0.15, winter: 0.9, spring: 0.3, autumn: 0.85 }, occasions: ["soirée", "hiver"], vibes: ["fumé", "chaleureux", "rétro"] },
  encens:  { note: "encens",  category: "oriental", intensity: 0.7, warmth: 0.75, freshness: 0.15, sensuality: 0.7, seasonality: { summer: 0.25, winter: 0.85, spring: 0.4, autumn: 0.8 }, occasions: ["soirée", "cérémonie", "méditation"], vibes: ["mystique", "sacré", "profond"] },
  ambre:   { note: "ambre",   category: "oriental", intensity: 0.7, warmth: 0.85, freshness: 0.1, sensuality: 0.8, seasonality: { summer: 0.2, winter: 0.9, spring: 0.4, autumn: 0.8 }, occasions: ["soirée", "date", "hiver"], vibes: ["chaleureux", "sensuel", "enveloppant"] },
  benjoin: { note: "benjoin",  category: "oriental", intensity: 0.6, warmth: 0.8, freshness: 0.1, sensuality: 0.65, seasonality: { summer: 0.2, winter: 0.85, spring: 0.35, autumn: 0.75 }, occasions: ["soirée", "hiver"], vibes: ["baumé", "doux", "résineux"] },
  myrrhe:  { note: "myrrhe",   category: "oriental", intensity: 0.65, warmth: 0.75, freshness: 0.1, sensuality: 0.6, seasonality: { summer: 0.2, winter: 0.85, spring: 0.35, autumn: 0.8 }, occasions: ["cérémonie", "soirée"], vibes: ["mystique", "sacré", "profond"] },
  opium:   { note: "opium",    category: "oriental", intensity: 0.8, warmth: 0.85, freshness: 0.05, sensuality: 0.85, seasonality: { summer: 0.1, winter: 0.95, spring: 0.25, autumn: 0.85 }, occasions: ["soirée"], vibes: ["narcotique", "envoûtant", "opulent"] },

  // 🍓 Fruité
  peche:         { note: "pêche",          category: "fruity", intensity: 0.45, warmth: 0.3, freshness: 0.6, sensuality: 0.45, seasonality: { summer: 0.9, winter: 0.2, spring: 0.75, autumn: 0.35 }, occasions: ["été", "quotidien", "date"], vibes: ["doux", "juteux", "féminin"] },
  pomme:         { note: "pomme",          category: "fruity", intensity: 0.4, warmth: 0.2, freshness: 0.7, sensuality: 0.25, seasonality: { summer: 0.7, winter: 0.3, spring: 0.75, autumn: 0.5 }, occasions: ["quotidien", "bureau"], vibes: ["frais", "croquant", "joyeux"] },
  poire:         { note: "poire",          category: "fruity", intensity: 0.4, warmth: 0.25, freshness: 0.65, sensuality: 0.3, seasonality: { summer: 0.65, winter: 0.3, spring: 0.7, autumn: 0.5 }, occasions: ["quotidien", "bureau"], vibes: ["frais", "élégant", "délicat"] },
  framboise:     { note: "framboise",      category: "fruity", intensity: 0.5, warmth: 0.3, freshness: 0.55, sensuality: 0.5, seasonality: { summer: 0.8, winter: 0.3, spring: 0.7, autumn: 0.4 }, occasions: ["date", "quotidien"], vibes: ["pétillant", "séduisant", "féminin"] },
  cassis:        { note: "cassis",         category: "fruity", intensity: 0.55, warmth: 0.2, freshness: 0.65, sensuality: 0.4, seasonality: { summer: 0.75, winter: 0.25, spring: 0.7, autumn: 0.4 }, occasions: ["quotidien", "date"], vibes: ["vif", "fruité", "moderne"] },
  mangue:        { note: "mangue",         category: "fruity", intensity: 0.5, warmth: 0.35, freshness: 0.55, sensuality: 0.4, seasonality: { summer: 0.9, winter: 0.15, spring: 0.65, autumn: 0.3 }, occasions: ["été", "casual"], vibes: ["exotique", "juteux", "solaire"] },
  fruits_rouges: { note: "fruits rouges",  category: "fruity", intensity: 0.5, warmth: 0.3, freshness: 0.5, sensuality: 0.5, seasonality: { summer: 0.75, winter: 0.3, spring: 0.7, autumn: 0.45 }, occasions: ["date", "quotidien"], vibes: ["gourmand", "séduisant", "joyeux"] },
  abricot:       { note: "abricot",        category: "fruity", intensity: 0.4, warmth: 0.3, freshness: 0.6, sensuality: 0.35, seasonality: { summer: 0.85, winter: 0.2, spring: 0.7, autumn: 0.35 }, occasions: ["été", "quotidien"], vibes: ["doux", "solaire", "lumineux"] },
  litchi:        { note: "litchi",         category: "fruity", intensity: 0.45, warmth: 0.2, freshness: 0.6, sensuality: 0.4, seasonality: { summer: 0.85, winter: 0.2, spring: 0.7, autumn: 0.3 }, occasions: ["été", "date"], vibes: ["exotique", "frais", "délicat"] },

  // 🌊 Aquatique / Marin
  marine:    { note: "marine",     category: "fresh", intensity: 0.4, warmth: 0.1, freshness: 0.9, sensuality: 0.15, seasonality: { summer: 0.95, winter: 0.15, spring: 0.7, autumn: 0.25 }, occasions: ["été", "sport", "quotidien"], vibes: ["aquatique", "frais", "libre"] },
  sel:       { note: "sel",        category: "fresh", intensity: 0.35, warmth: 0.15, freshness: 0.8, sensuality: 0.2, seasonality: { summer: 0.9, winter: 0.2, spring: 0.65, autumn: 0.3 }, occasions: ["été", "casual"], vibes: ["marin", "brut", "naturel"] },
  algues:    { note: "algues",     category: "fresh", intensity: 0.4, warmth: 0.1, freshness: 0.85, sensuality: 0.1, seasonality: { summer: 0.9, winter: 0.15, spring: 0.6, autumn: 0.25 }, occasions: ["été", "sport"], vibes: ["iodé", "frais", "naturel"] },
};

// ─── LOOKUP RAPIDE ────────────────────────────────────────────────────────────

const profileCache = new Map<string, PerfumeExpertProfile>();

/** Normalise un nom de note pour le lookup */
function normalizeNote(n: string): string {
  return n.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "'")
    .trim();
}

/** Map de lookup normalisé → clé */
const LOOKUP: Map<string, NoteProfile> = (() => {
  const m = new Map<string, NoteProfile>();
  for (const [, profile] of Object.entries(NOTE_EXPERT_PROFILES)) {
    m.set(normalizeNote(profile.note), profile);
    // Alias sans accents pour la clé aussi
    m.set(normalizeNote(profile.note.replace(/[éèê]/g, "e").replace(/[àâ]/g, "a").replace(/[ùû]/g, "u").replace(/[îï]/g, "i").replace(/[ôö]/g, "o")), profile);
  }
  return m;
})();

function findProfile(note: string): NoteProfile | undefined {
  const key = normalizeNote(note);
  // Exact
  const exact = LOOKUP.get(key);
  if (exact) return exact;
  // Partial
  for (const [k, v] of LOOKUP) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return undefined;
}

// ─── NEUTRAL PROFILE ──────────────────────────────────────────────────────────

const NEUTRAL: PerfumeExpertProfile = {
  dominantCategories: [],
  globalVibe: ["neutre"],
  recommendedOccasions: ["quotidien"],
  seasonScore: { summer: 0.5, winter: 0.5, spring: 0.5, autumn: 0.5 },
  intensityScore: 0.5,
  uniquenessScore: 0,
};

// ─── MAIN FUNCTION ────────────────────────────────────────────────────────────

export function buildExpertProfile(notes: string[]): PerfumeExpertProfile {
  if (!notes.length) return { ...NEUTRAL };

  const cacheKey = notes.slice().sort().join("|");
  const cached = profileCache.get(cacheKey);
  if (cached) return cached;

  const matched: NoteProfile[] = [];
  for (const n of notes) {
    const p = findProfile(n);
    if (p) matched.push(p);
  }

  if (!matched.length) return { ...NEUTRAL };

  const len = matched.length;

  // Aggregate categories
  const catCount: Record<string, number> = {};
  const vibeCount: Record<string, number> = {};
  const occCount: Record<string, number> = {};
  let totalIntensity = 0;
  const season = { summer: 0, winter: 0, spring: 0, autumn: 0 };

  for (const p of matched) {
    catCount[p.category] = (catCount[p.category] || 0) + 1;
    for (const v of p.vibes) vibeCount[v] = (vibeCount[v] || 0) + 1;
    for (const o of p.occasions) occCount[o] = (occCount[o] || 0) + 1;
    totalIntensity += p.intensity;
    season.summer += p.seasonality.summer;
    season.winter += p.seasonality.winter;
    season.spring += p.seasonality.spring;
    season.autumn += p.seasonality.autumn;
  }

  // Sort by frequency
  const sortedCats = Object.entries(catCount).sort((a, b) => b[1] - a[1]);
  const sortedVibes = Object.entries(vibeCount).sort((a, b) => b[1] - a[1]);
  const sortedOccs = Object.entries(occCount).sort((a, b) => b[1] - a[1]);

  // Normalize season
  for (const k of Object.keys(season) as (keyof typeof season)[]) {
    season[k] = Math.min(season[k] / len, 1);
  }

  // Uniqueness = how many distinct categories
  const uniqueness = Math.min(sortedCats.length / 5, 1);

  const result: PerfumeExpertProfile = {
    dominantCategories: sortedCats.slice(0, 3).map(([c]) => c),
    globalVibe: sortedVibes.slice(0, 4).map(([v]) => v),
    recommendedOccasions: sortedOccs.slice(0, 3).map(([o]) => o),
    seasonScore: season,
    intensityScore: Math.min(totalIntensity / len, 1),
    uniquenessScore: uniqueness,
  };

  profileCache.set(cacheKey, result);
  return result;
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────

const CAT_LABELS: Record<string, string> = {
  sweet: "Gourmand", fresh: "Frais", woody: "Boisé", spicy: "Épicé",
  floral: "Floral", oriental: "Oriental", musky: "Musqué",
  leather: "Cuir", green: "Vert", fruity: "Fruité",
};

export function getDominantCategory(profile: PerfumeExpertProfile): string {
  return CAT_LABELS[profile.dominantCategories[0]] || "Classique";
}

export function getMainVibe(profile: PerfumeExpertProfile): string {
  return profile.globalVibe[0] || "élégant";
}

export function getBestSeason(profile: PerfumeExpertProfile): string {
  const s = profile.seasonScore;
  const entries = Object.entries(s);
  entries.sort((a, b) => b[1] - a[1]);
  const labels: Record<string, string> = {
    summer: "Été", winter: "Hiver", spring: "Printemps", autumn: "Automne",
  };
  return labels[entries[0][0]] || "Toute saison";
}

// ─── DEFAULT EXPORT ───────────────────────────────────────────────────────────

export default {
  buildExpertProfile,
  getDominantCategory,
  getMainVibe,
  getBestSeason,
  NOTE_EXPERT_PROFILES,
};

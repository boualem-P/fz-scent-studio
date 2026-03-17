// Mapping des notes vers les accords (Clés de ACCORDS_LIBRARY)
export const NOTE_TO_ACCORD_MAP: Record<string, string[]> = {
  // Agrumes & Frais
  "poire": ["fruity"],
  "melon": ["fruity", "fresh"],
  "bergamote": ["citrus", "fresh"],
  "mandarine": ["citrus", "fresh"],
  "pamplemousse": ["citrus", "fresh"],
  "citron": ["citrus", "fresh"],
  "cassis": ["fruity"],
  "peche": ["fruity"],
  "prune": ["fruity"],

  // Fleurs
  "magnolia": ["white_floral"],
  "jasmin": ["floral", "white_floral"],
  "muguet": ["white_floral"],
  "tubereuse": ["white_floral"],
  "rose de damas": ["floral", "white_floral"],
  "orchidee": ["floral"],
  "violette": ["floral"],
  "fleur d'oranger": ["white_floral", "citrus"],
  "iris": ["powdery", "floral"],

  // Boisés & Terreux
  "cedre": ["woody"],
  "bois de cachemire": ["woody"],
  "patchouli": ["woody", "earthy"],
  "vetiver": ["woody", "aromatic"],
  "santal": ["woody"],

  // Gourmands & Orientaux
  "vanille": ["sweet", "gourmand"],
  "cafe": ["coffee", "gourmand"],
  "feve tonka": ["sweet", "gourmand"],
  "amande amere": ["nutty", "gourmand"],
  "reglisse": ["sweet", "spicy"],
  "praline": ["sweet", "gourmand"],

  // Muscs & Fond
  "musc": ["musky"],
  "ambre": ["amber"],
  "epices": ["warm_spicy"],
  "poivre rose": ["fresh_spicy"],
};

/**
 * Nettoie une chaîne pour la comparaison (minuscules, sans accents)
 */
export function normalizeNote(note: string): string {
  return note
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

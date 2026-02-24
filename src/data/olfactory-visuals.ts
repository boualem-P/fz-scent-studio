/**
 * OLFACTORY_VISUALS — Centralized image mapping for all ingredients.
 * 
 * Each key matches an ingredient name from src/data/ingredients.ts.
 * URLs use Unsplash's dynamic image API with macro/ingredient keywords.
 * 
 * To manually replace any URL on GitHub, simply edit the string value
 * for the desired ingredient key below.
 */

const UNSPLASH_BASE = "https://images.unsplash.com";

export const OLFACTORY_VISUALS: Record<string, string> = {
  // ─── TOP NOTES: Hespéridés ─────────────────────────────
  "Citron":           `${UNSPLASH_BASE}/photo-1590502593747-42a996133562?w=400&h=400&fit=crop&crop=entropy`,
  "Bergamote":        `${UNSPLASH_BASE}/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop&crop=entropy`,
  "Orange":           `${UNSPLASH_BASE}/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=entropy`,
  "Mandarine":        `${UNSPLASH_BASE}/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop&crop=entropy`,
  "Pamplemousse":     `${UNSPLASH_BASE}/photo-1577234286642-fc512a5f8f11?w=400&h=400&fit=crop&crop=entropy`,
  "Yuzu":             `${UNSPLASH_BASE}/photo-1590502593747-42a996133562?w=400&h=400&fit=crop&crop=entropy`,
  "Verveine":         `${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,

  // ─── TOP NOTES: Aromatiques ────────────────────────────
  "Menthe":           `${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,
  "Basilic":          `${UNSPLASH_BASE}/photo-1618164435735-413d3b066c9a?w=400&h=400&fit=crop&crop=entropy`,
  "Romarin":          `${UNSPLASH_BASE}/photo-1515586000433-45406d8e6662?w=400&h=400&fit=crop&crop=entropy`,
  "Lavande":          `${UNSPLASH_BASE}/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=entropy`,
  "Thym":             `${UNSPLASH_BASE}/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop&crop=entropy`,
  "Eucalyptus":       `${UNSPLASH_BASE}/photo-1596547609652-9cf5d8d76921?w=400&h=400&fit=crop&crop=entropy`,
  "Sauge":            `${UNSPLASH_BASE}/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop&crop=entropy`,

  // ─── TOP NOTES: Marines ────────────────────────────────
  "Iode":             `${UNSPLASH_BASE}/photo-1505118380757-91f5f5632de0?w=400&h=400&fit=crop&crop=entropy`,
  "Algues":           `${UNSPLASH_BASE}/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop&crop=entropy`,
  "Lotus":            `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=400&h=400&fit=crop&crop=entropy`,
  "Concombre":        `${UNSPLASH_BASE}/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop&crop=entropy`,
  "Calone":           `${UNSPLASH_BASE}/photo-1505118380757-91f5f5632de0?w=400&h=400&fit=crop&crop=entropy`,

  // ─── TOP NOTES: Épices Fraîches ────────────────────────
  "Poivre Rose":      `${UNSPLASH_BASE}/photo-1599909533601-aa023a72ff4a?w=400&h=400&fit=crop&crop=entropy`,
  "Gingembre":        `${UNSPLASH_BASE}/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop&crop=entropy`,
  "Baies de Genièvre":`${UNSPLASH_BASE}/photo-1599909533601-aa023a72ff4a?w=400&h=400&fit=crop&crop=entropy`,
  "Cardamome":        `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,

  // ─── TOP NOTES: Fruits Légers ──────────────────────────
  "Pomme verte":      `${UNSPLASH_BASE}/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop&crop=entropy`,
  "Poire":            `${UNSPLASH_BASE}/photo-1514756331096-242fdeb70d4a?w=400&h=400&fit=crop&crop=entropy`,
  "Bourgeon de Cassis":`${UNSPLASH_BASE}/photo-1515942140440-bc864ab2b015?w=400&h=400&fit=crop&crop=entropy`,

  // ─── HEART NOTES: Florales ─────────────────────────────
  "Jasmin":           `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Tubéreuse":        `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Ylang-Ylang":      `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Fleur d'Oranger":  `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Rose":             `${UNSPLASH_BASE}/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop&crop=entropy`,
  "Géranium":         `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Pivoine":          `${UNSPLASH_BASE}/photo-1562690868-60bbe7293e94?w=400&h=400&fit=crop&crop=entropy`,
  "Iris":             `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Violette":         `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Mimosa":           `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,

  // ─── HEART NOTES: Fruitées ─────────────────────────────
  "Fraise":           `${UNSPLASH_BASE}/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop&crop=entropy`,
  "Framboise":        `${UNSPLASH_BASE}/photo-1577069861033-55d04cec4ef5?w=400&h=400&fit=crop&crop=entropy`,
  "Mûre":             `${UNSPLASH_BASE}/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&crop=entropy`,
  "Mangue":           `${UNSPLASH_BASE}/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&crop=entropy`,
  "Ananas":           `${UNSPLASH_BASE}/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&crop=entropy`,
  "Pêche":            `${UNSPLASH_BASE}/photo-1595124216650-1ce2e54b8644?w=400&h=400&fit=crop&crop=entropy`,
  "Abricot":          `${UNSPLASH_BASE}/photo-1595124216650-1ce2e54b8644?w=400&h=400&fit=crop&crop=entropy`,

  // ─── HEART NOTES: Épices Chaudes ───────────────────────
  "Cannelle":         `${UNSPLASH_BASE}/photo-1587132137056-bfbf0166836e?w=400&h=400&fit=crop&crop=entropy`,
  "Clou de Girofle":  `${UNSPLASH_BASE}/photo-1599909533601-aa023a72ff4a?w=400&h=400&fit=crop&crop=entropy`,
  "Muscade":          `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Safran":           `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,

  // ─── HEART NOTES: Notes Vertes ─────────────────────────
  "Feuille de violette":`${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,
  "Herbe coupée":     `${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,
  "Galbanum":         `${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,

  // ─── BASE NOTES: Boisées ──────────────────────────────
  "Santal":           `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=entropy`,
  "Cèdre":            `${UNSPLASH_BASE}/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop&crop=entropy`,
  "Patchouli":        `${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,
  "Vétiver":          `${UNSPLASH_BASE}/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop&crop=entropy`,
  "Gaïac":            `${UNSPLASH_BASE}/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop&crop=entropy`,
  "Oud":              `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=entropy`,

  // ─── BASE NOTES: Ambrées & Résines ────────────────────
  "Ambre gris":       `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Encens":           `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Myrrhe":           `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Benjoin":          `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Labdanum":         `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,

  // ─── BASE NOTES: Gourmandes ────────────────────────────
  "Vanille":          `${UNSPLASH_BASE}/photo-1631206753348-db44968fd440?w=400&h=400&fit=crop&crop=entropy`,
  "Fève Tonka":       `${UNSPLASH_BASE}/photo-1631206753348-db44968fd440?w=400&h=400&fit=crop&crop=entropy`,
  "Caramel":          `${UNSPLASH_BASE}/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&crop=entropy`,
  "Chocolat":         `${UNSPLASH_BASE}/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop&crop=entropy`,
  "Praliné":          `${UNSPLASH_BASE}/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&crop=entropy`,
  "Miel":             `${UNSPLASH_BASE}/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&crop=entropy`,

  // ─── BASE NOTES: Musquées ─────────────────────────────
  "Musc blanc":       `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=entropy`,
  "Cuir":             `${UNSPLASH_BASE}/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=entropy`,
  "Civette":          `${UNSPLASH_BASE}/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=entropy`,

  // ─── BASE NOTES: Mousses ──────────────────────────────
  "Mousse de Chêne":  `${UNSPLASH_BASE}/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop&crop=entropy`,

  // ─── PERFUME DETAIL NOTES (from perfumes.ts) ──────────
  "Ambre":            `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Poivre":           `${UNSPLASH_BASE}/photo-1599909533601-aa023a72ff4a?w=400&h=400&fit=crop&crop=entropy`,
  "Poivre de Sichuan":`${UNSPLASH_BASE}/photo-1599909533601-aa023a72ff4a?w=400&h=400&fit=crop&crop=entropy`,
  "Pomme":            `${UNSPLASH_BASE}/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop&crop=entropy`,
  "Bouleau":          `${UNSPLASH_BASE}/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop&crop=entropy`,
  "Musc":             `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=entropy`,
  "Aldéhydes":        `${UNSPLASH_BASE}/photo-1505118380757-91f5f5632de0?w=400&h=400&fit=crop&crop=entropy`,
  "Néroli":           `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
  "Palissandre":      `${UNSPLASH_BASE}/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop&crop=entropy`,
  "Coumarine":        `${UNSPLASH_BASE}/photo-1631206753348-db44968fd440?w=400&h=400&fit=crop&crop=entropy`,
  "Tonka":            `${UNSPLASH_BASE}/photo-1631206753348-db44968fd440?w=400&h=400&fit=crop&crop=entropy`,
  "Café":             `${UNSPLASH_BASE}/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&crop=entropy`,
  "Tabac":            `${UNSPLASH_BASE}/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=entropy`,
  "Épices":           `${UNSPLASH_BASE}/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=entropy`,
  "Cacao":            `${UNSPLASH_BASE}/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop&crop=entropy`,
  "Fleur de Tabac":   `${UNSPLASH_BASE}/photo-1490750967868-88aa4f44baee?w=400&h=400&fit=crop&crop=entropy`,
};

/**
 * Get the Unsplash URL for a given ingredient name.
 * Falls back to a generic luxury texture if not found.
 */
export function getIngredientImage(name: string): string {
  return OLFACTORY_VISUALS[name] ?? `${UNSPLASH_BASE}/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=entropy`;
}

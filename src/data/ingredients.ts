import { NoteCategory } from "./perfumes";

export interface IngredientGroup {
  category: NoteCategory;
  label: string;
  ingredients: string[];
}

export const TOP_INGREDIENTS: IngredientGroup[] = [
  {
    category: "hesperides",
    label: "Hespéridés",
    ingredients: ["Citron", "Bergamote", "Orange", "Mandarine", "Pamplemousse", "Yuzu", "Verveine"],
  },
  {
    category: "aromatiques",
    label: "Aromatiques",
    ingredients: ["Menthe", "Basilic", "Romarin", "Lavande", "Thym", "Eucalyptus", "Sauge"],
  },
  {
    category: "marines",
    label: "Marines",
    ingredients: ["Iode", "Algues", "Lotus", "Concombre", "Calone"],
  },
  {
    category: "epices-fraiches",
    label: "Épices Fraîches",
    ingredients: ["Poivre Rose", "Gingembre", "Baies de Genièvre", "Cardamome"],
  },
  {
    category: "fruits-legers",
    label: "Fruits Légers",
    ingredients: ["Pomme verte", "Poire", "Bourgeon de Cassis"],
  },
];

export const HEART_INGREDIENTS: IngredientGroup[] = [
  {
    category: "florales",
    label: "Florales",
    ingredients: ["Jasmin", "Tubéreuse", "Ylang-Ylang", "Fleur d'Oranger", "Rose", "Géranium", "Pivoine", "Iris", "Violette", "Mimosa"],
  },
  {
    category: "fruitees",
    label: "Fruitées",
    ingredients: ["Fraise", "Framboise", "Mûre", "Mangue", "Ananas", "Pêche", "Abricot"],
  },
  {
    category: "epices-chaudes",
    label: "Épices Chaudes",
    ingredients: ["Cannelle", "Clou de Girofle", "Muscade", "Safran"],
  },
  {
    category: "notes-vertes",
    label: "Notes Vertes",
    ingredients: ["Feuille de violette", "Herbe coupée", "Galbanum"],
  },
];

export const BASE_INGREDIENTS: IngredientGroup[] = [
  {
    category: "boisees",
    label: "Boisées",
    ingredients: ["Santal", "Cèdre", "Patchouli", "Vétiver", "Gaïac", "Oud"],
  },
  {
    category: "ambrees",
    label: "Ambrées & Résines",
    ingredients: ["Ambre gris", "Encens", "Myrrhe", "Benjoin", "Labdanum"],
  },
  {
    category: "gourmandes",
    label: "Gourmandes",
    ingredients: ["Vanille", "Fève Tonka", "Caramel", "Chocolat", "Praliné", "Miel"],
  },
  {
    category: "musquees",
    label: "Musquées",
    ingredients: ["Musc blanc", "Cuir", "Civette"],
  },
  {
    category: "mousses",
    label: "Mousses",
    ingredients: ["Mousse de Chêne"],
  },
];

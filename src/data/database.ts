export interface NoteDetail {
  name: string;
}

export interface PerfumeHotspots {
  cap: { title: string; description: string };
  heart: { title: string; description: string };
  base: { title: string; description: string };
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  year: number;
  gender: "homme" | "femme" | "unisexe";
  concentration: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  topNotesDetailed: NoteDetail[];
  heartNotesDetailed: NoteDetail[];
  baseNotesDetailed: NoteDetail[];
  hotspots?: PerfumeHotspots;
}

const joinNotes = (notes: string[]): string => {
  if (notes.length === 0) return "essences rares";
  if (notes.length === 1) return notes[0];
  return notes.slice(0, -1).join(", ") + " et " + notes[notes.length - 1];
};

const capPhrases = [
  (notes: string) => `Un design hermétique préservant l'éclat vibrant de ${notes}, capturant leur fraîcheur à l'état pur.`,
  (notes: string) => `Une architecture de verre scellant la vivacité de ${notes} dans un écrin d'exception.`,
  (notes: string) => `Le couronnement parfait, protégeant l'intensité de ${notes} contre le passage du temps.`,
  (notes: string) => `Un bouchon d'orfèvre conçu pour préserver la pureté cristalline de ${notes}.`,
];

const heartPhrases = [
  (notes: string) => `Révèle un cœur envoûtant de ${notes}, une signature olfactive d'une profondeur rare.`,
  (notes: string) => `Au cœur de la composition, ${notes} s'enlacent dans une harmonie sensuelle et captivante.`,
  (notes: string) => `L'âme du parfum vibre à travers ${notes}, créant une aura magnétique et inoubliable.`,
  (notes: string) => `Une concentration exceptionnelle de ${notes} pour une tenue qui transcende les heures.`,
];

const basePhrases = [
  (notes: string) => `Un sillage persistant de ${notes}, une empreinte de caractère qui dure au-delà de 12 heures.`,
  (notes: string) => `Les notes de fond de ${notes} laissent un sillage noble et enveloppant sur la peau.`,
  (notes: string) => `La signature finale repose sur ${notes}, des essences rares sélectionnées pour leur projection élégante.`,
  (notes: string) => `${notes} composent un fond majestueux, un écho luxueux qui accompagne chaque mouvement.`,
];

const hashCode = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

export function generateHotspots(perfume: Perfume): PerfumeHotspots {
  if (perfume.hotspots) return perfume.hotspots;
  const h = hashCode(perfume.id);
  return {
    cap: {
      title: "Le Couronnement",
      description: capPhrases[h % capPhrases.length](joinNotes(perfume.topNotes)),
    },
    heart: {
      title: "L'Âme du Parfum",
      description: heartPhrases[(h >> 2) % heartPhrases.length](joinNotes(perfume.heartNotes)),
    },
    base: {
      title: "Sillage Signature",
      description: basePhrases[(h >> 4) % basePhrases.length](joinNotes(perfume.baseNotes)),
    },
  };
}

/**
 * Get related perfumes with gender compatibility and note matching.
 * Always returns at least 5 perfumes.
 */
export function getRelatedPerfumes(perfume: Perfume, minCount: number = 5): Perfume[] {
  const validGenders = getCompatibleGenders(perfume.gender);
  const allNotes = [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes];
  
  // Filter candidates by gender (excluding current perfume)
  const genderMatches = PERFUMES.filter(
    (p) => p.id !== perfume.id && validGenders.includes(p.gender)
  );
  
  // Level 1: Score by common notes
  const scored = genderMatches.map((p) => {
    const pNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes];
    const commonNotes = allNotes.filter((n) => 
      pNotes.some((pn) => pn.toLowerCase() === n.toLowerCase())
    ).length;
    const sameBrand = p.brand === perfume.brand ? 2 : 0;
    return { perfume: p, score: commonNotes + sameBrand };
  });
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Take perfumes with at least 1 common note
  const noteMatches = scored.filter((s) => s.score > 0).map((s) => s.perfume);
  
  // Level 2 Fallback: If not enough, fill with remaining gender-compatible perfumes
  if (noteMatches.length >= minCount) {
    return noteMatches.slice(0, 8);
  }
  
  const remaining = genderMatches.filter(
    (p) => !noteMatches.some((m) => m.id === p.id)
  );
  
  const result = [...noteMatches, ...remaining].slice(0, Math.max(minCount, 8));
  return result;
}

function getCompatibleGenders(gender: "homme" | "femme" | "unisexe"): string[] {
  switch (gender) {
    case "femme":
      return ["femme", "unisexe"];
    case "homme":
      return ["homme", "unisexe"];
    case "unisexe":
      return ["unisexe", "femme", "homme"]; // Prioritize unisexe first
    default:
      return ["femme", "homme", "unisexe"];
  }
}

export const PERFUMES: Perfume[] = [
  // --- TES 14 FICHES PERSONNELLES (MISES À JOUR EN HD) ---
  {
    id: "j-adore-dior",
    name: "J'adore",
    brand: "Dior",
    image: "https://fimgs.net/mdimg/perfume/o.210.jpg",
    description: "Un bouquet floral unique, riche et équilibré, dont la complexité est une source d'inspiration.",
    year: 1999,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Melon", "Magnolia", "Pêche", "Mandarine", "Bergamote"],
    heartNotes: ["Jasmin", "Muguet", "Tubéreuse", "Freesia", "Rose de Damas", "Orchidée", "Prune", "Violette"],
    baseNotes: ["Musc", "Vanille", "Mûre", "Cèdre"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Melon" }, { name: "Bergamote" }],
    heartNotesDetailed: [{ name: "Jasmin" }, { name: "Tubéreuse" }, { name: "Rose de Damas" }],
    baseNotesDetailed: [{ name: "Musc" }, { name: "Vanille" }]
  },
  {
    id: "la-vie-est-belle",
    name: "La Vie est Belle",
    brand: "Lancôme",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2019/06/La-vie-est-belle-Lancome-Eau-de-parfum-1.jpg",
    description: "L'éclat d'un sourire universel, encapsulé dans un parfum de bonheur.",
    year: 2012,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Cassis", "Poire"],
    heartNotes: ["Iris", "Jasmin", "Fleur d'oranger"],
    baseNotes: ["Praline", "Vanille", "Patchouli", "Fève Tonka"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Cassis" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Praline" }, { name: "Patchouli" }, { name: "Fève Tonka" }]
  },
  {
    id: "black-opium",
    name: "Black Opium",
    brand: "YSL",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2019/06/Black-opium-Yves-saint-laurent-Eau-de-parfum.jpg",
    description: "Une dose d'adrénaline, pour une héroïne aussi glamour qu'impertinente.",
    year: 2014,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Poivre rose", "Fleur d'oranger"],
    heartNotes: ["Café", "Jasmin", "Amande amère", "Réglisse"],
    baseNotes: ["Vanille", "Patchouli", "Cèdre", "Bois de Cachemire"],
    topNotesDetailed: [{ name: "Café" }, { name: "Poire" }],
    heartNotesDetailed: [{ name: "Jasmin" }, { name: "Amande amère" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Bois de Cachemire" }]
  },
  {
    id: "the-noir-29",
    name: "Thé Noir 29",
    brand: "Le Labo",
    image: "https://fimgs.net/mdimg/perfume/o.31872.jpg",
    description: "Une ode à la feuille de thé et à la noblesse de la matière.",
    year: 2015,
    gender: "unisexe",
    concentration: "Eau de Parfum",
    topNotes: ["Figue", "Laurier", "Bergamote"],
    heartNotes: ["Cèdre", "Vétiver", "Musc"],
    baseNotes: ["Tabac", "Foin"],
    topNotesDetailed: [{ name: "Figue" }, { name: "Laurier" }],
    heartNotesDetailed: [{ name: "Cèdre" }, { name: "Vétiver" }],
    baseNotesDetailed: [{ name: "Tabac" }, { name: "Foin" }]
  },
  {
    id: "santal-33",
    name: "Santal 33",
    brand: "Le Labo",
    image: "https://ounass-kw.atgcdn.ae/small_light(p=zoom,of=webp,q=65)/pub/media/catalog/product/2/1/214492364_nocolor_in.jpg?ts=1665481840.2575",
    description: "L'esprit du Grand Ouest américain et la liberté dans un sillage boisé fumé.",
    year: 2011,
    gender: "unisexe",
    concentration: "Eau de Parfum",
    topNotes: ["Cardamome", "Iris", "Violette"],
    heartNotes: ["Santal", "Papyrus", "Ambroxan"],
    baseNotes: ["Cuir", "Cèdre de Virginie"],
    topNotesDetailed: [{ name: "Cardamome" }, { name: "Iris" }],
    heartNotesDetailed: [{ name: "Santal" }, { name: "Papyrus" }],
    baseNotesDetailed: [{ name: "Cuir" }, { name: "Cèdre" }]
  },
  {
    id: "fahrenheit-dior",
    name: "Fahrenheit",
    brand: "Dior",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.228.jpg",
    description: "Une signature pionnière, masculine et contrastée, aux notes de cuir et de violette.",
    year: 1988,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Fleur de Muscadier", "Lavande", "Cèdre", "Mandarine", "Camomille", "Aubépine", "Bergamote", "Citron"],
    heartNotes: ["Feuille de violette", "Noix de muscade", "Cèdre", "Santal", "Chèvrefeuille", "Jasmin", "Muguet"],
    baseNotes: ["Cuir", "Vétiver", "Musc", "Ambre", "Patchouli", "Fève Tonka"],
    topNotesDetailed: [{ name: "Mandarine" }, { name: "Fleur de Muscadier" }],
    heartNotesDetailed: [{ name: "Feuille de violette" }, { name: "Noix de muscade" }],
    baseNotesDetailed: [{ name: "Cuir" }, { name: "Vétiver" }]
  },
  {
    id: "spicebomb",
    name: "Spicebomb",
    brand: "Viktor&Rolf",
    image: "https://fimgs.net/mdimg/perfume/o.13857.jpg",
    description: "Une déflagration d'épices, un concentré explosif de sensualité masculine.",
    year: 2012,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Poivre rose", "Élémi", "Bergamote", "Pamplemousse"],
    heartNotes: ["Cannelle", "Safran", "Paprika"],
    baseNotes: ["Tabac", "Cuir", "Vétiver"],
    topNotesDetailed: [{ name: "Poivre rose" }, { name: "Élémi" }],
    heartNotesDetailed: [{ name: "Cannelle" }, { name: "Safran" }],
    baseNotesDetailed: [{ name: "Tabac" }, { name: "Cuir" }]
  },
  {
    id: "l-interdit",
    name: "L'Interdit",
    brand: "Givenchy",
    image: "https://fimgs.net/mdimg/perfume/o.51488.jpg",
    description: "L'hommage à une féminité audacieuse. Une fleur blanche traversée de notes noires.",
    year: 2018,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Bergamote"],
    heartNotes: ["Tubéreuse", "Fleur d'oranger", "Jasmin Sambac"],
    baseNotes: ["Patchouli", "Vétiver", "Ambroxan", "Vanille"],
    topNotesDetailed: [{ name: "Poire" }],
    heartNotesDetailed: [{ name: "Tubéreuse" }, { name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Patchouli" }, { name: "Vétiver" }, { name: "Ambroxan" }]
  },
  {
    id: "her-burberry",
    name: "Her",
    brand: "Burberry",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.71379.jpg",
    description: "L'esprit de Londres : une fragrance gourmande, fruitée et audacieuse.",
    year: 2018,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Fraise", "Framboise", "Mûre", "Griotte", "Cassis", "Mandarine", "Citron"],
    heartNotes: ["Violette", "Jasmin"],
    baseNotes: ["Musc", "Vanille", "Ambre", "Notes boisées", "Mousse de chêne"],
    topNotesDetailed: [{ name: "Fraise" }, { name: "Framboise" }, { name: "Mûre" }],
    heartNotesDetailed: [{ name: "Violette" }, { name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Ambre" }, { name: "Musc" }]
  },
  {
    id: "libre-ysl",
    name: "Libre",
    brand: "YSL",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2022/10/3614273069557_ysl_women-fragrance_libre-edp-intense-20_90ml.jpg",
    description: "Le parfum de la liberté. Une lavande florale, sensuelle et brûlante.",
    year: 2019,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Lavande", "Mandarine", "Cassis", "Petit-grain"],
    heartNotes: ["Lavande", "Fleur d'oranger", "Jasmin"],
    baseNotes: ["Vanille de Madagascar", "Musc", "Ambre gris", "Cèdre"],
    topNotesDetailed: [{ name: "Mandarine" }, { name: "Lavande" }],
    heartNotesDetailed: [{ name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Ambre gris" }]
  },
  {
    id: "good-girl",
    name: "Good Girl",
    brand: "Carolina Herrera",
    image: "https://fimgs.net/mdimg/perfume/o.39681.jpg",
    description: "Un mélange audacieux d'éléments clairs et sombres. Pour la femme qui aime son bon côté et célèbre son mauvais.",
    year: 2016,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Amande", "Café", "Bergamote", "Citron"],
    heartNotes: ["Jasmin Sambac", "Tubéreuse", "Iris", "Fleur d'oranger", "Rose de Bulgarie"],
    baseNotes: ["Fève Tonka", "Cacao", "Vanille", "Praline", "Santal", "Ambre", "Bois de Cachemire", "Patchouli"],
    topNotesDetailed: [{ name: "Amande" }, { name: "Café" }],
    heartNotesDetailed: [{ name: "Jasmin Sambac" }, { name: "Tubéreuse" }],
    baseNotesDetailed: [{ name: "Fève Tonka" }, { name: "Cacao" }, { name: "Praline" }]
  },
  {
    id: "gentleman-givenchy",
    name: "Gentleman",
    brand: "Givenchy",
    image: "https://odorem-dz.com/wp-content/uploads/2022/06/s2546281-main-zoom.jpg",
    description: "Une élégance intemporelle alliée à une virilité audacieuse.",
    year: 2017,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Poivre noir", "Lavande", "Bergamote"],
    heartNotes: ["Iris", "Cannelle", "Clou de girofle"],
    baseNotes: ["Vanille noire", "Baume de Tolu", "Patchouli", "Benjoin", "Fève Tonka"],
    topNotesDetailed: [{ name: "Poivre noir" }, { name: "Lavande" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Cannelle" }],
    baseNotesDetailed: [{ name: "Vanille noire" }, { name: "Baume de Tolu" }, { name: "Patchouli" }]
  },
  {
    id: "nomade-chloe",
    name: "Nomade",
    brand: "Chloé",
    image: "https://confiseriedubonheur.net/Stalk3r_hGeDKFxAmyy7H5pn/wp-content/uploads/2023/08/27.jpg",
    description: "L'incarnation d'une femme libre et aventureuse.",
    year: 2018,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Mirabelle", "Bergamote", "Citron", "Orange"],
    heartNotes: ["Freesia", "Pêche", "Jasmin", "Rose"],
    baseNotes: ["Mousse de chêne", "Amberwood", "Patchouli", "Musc blanc", "Santal"],
    topNotesDetailed: [{ name: "Mirabelle" }, { name: "Bergamote" }],
    heartNotesDetailed: [{ name: "Freesia" }, { name: "Pêche" }],
    baseNotesDetailed: [{ name: "Mousse de chêne" }, { name: "Patchouli" }]
  },
  {
    id: "le-lion-chanel",
    name: "Le Lion",
    brand: "Chanel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4P2DFdG8hxN4DJjf-qY9Pz3zGV8cN7e7KbA&s",
    description: "Une fragrance majestueuse, solaire et puissante, inspirée par l'animal totem de Gabrielle Chanel.",
    year: 2020,
    gender: "unisexe",
    concentration: "Les Exclusifs",
    topNotes: ["Citron", "Bergamote"],
    heartNotes: ["Ambre", "Ciste", "Labdanum"],
    baseNotes: ["Patchouli", "Vanille de Madagascar", "Santal", "Musc"],
    topNotesDetailed: [{ name: "Citron" }, { name: "Bergamote" }],
    heartNotesDetailed: [{ name: "Ambre" }, { name: "Ciste" }],
    baseNotesDetailed: [{ name: "Patchouli" }, { name: "Vanille" }]
  },

  // --- LES 24 FICHES COMPLÉMENTAIRES HD ---
  {
    id: "sauvage-dior",
    name: "Sauvage",
    brand: "Dior",
    image: "https://fimgs.net/mdimg/perfume/o.31861.jpg",
    description: "Un acte de création inspiré par les grands espaces, un sillage d'une noblesse brute.",
    year: 2015,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Bergamote de Calabre", "Poivre"],
    heartNotes: ["Poivre du Sichuan", "Lavande", "Anis étoilé", "Noix de muscade"],
    baseNotes: ["Ambroxan", "Vanille de Papouasie"],
    topNotesDetailed: [{ name: "Bergamote de Calabre" }],
    heartNotesDetailed: [{ name: "Poivre du Sichuan" }, { name: "Lavande" }, { name: "Noix de muscade" }],
    baseNotesDetailed: [{ name: "Ambroxan" }, { name: "Vanille" }]
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    image: "https://fimgs.net/mdimg/perfume/o.25967.jpg",
    description: "L'éloge de la liberté qui s'exprime dans un boisé aromatique au sillage captivant.",
    year: 2010,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Pamplemousse", "Citron", "Menthe", "Poivre rose", "Aldéhydes", "Bergamote", "Coriandre"],
    heartNotes: ["Gingembre", "Noix de muscade", "Jasmin", "Melon"],
    baseNotes: ["Encens", "Ambre", "Cèdre", "Santal", "Patchouli", "Labdanum", "Amberwood"],
    topNotesDetailed: [{ name: "Pamplemousse" }, { name: "Menthe" }, { name: "Poivre rose" }],
    heartNotesDetailed: [{ name: "Gingembre" }, { name: "Noix de muscade" }],
    baseNotesDetailed: [{ name: "Encens" }, { name: "Cèdre" }, { name: "Santal" }]
  },
  {
    id: "aventus-creed",
    name: "Aventus",
    brand: "Creed",
    image: "https://fimgs.net/mdimg/perfume/o.9828.jpg",
    description: "Inspiré par la vie dramatique d'un empereur historique qui menait la guerre, la paix et la romance.",
    year: 2010,
    gender: "homme",
    concentration: "Millésime",
    topNotes: ["Ananas", "Bergamote", "Cassis", "Pomme"],
    heartNotes: ["Bouleau", "Patchouli", "Baies de rose", "Jasmin du Maroc"],
    baseNotes: ["Musc", "Mousse de chêne", "Ambre gris", "Vanille"],
    topNotesDetailed: [{ name: "Ananas" }, { name: "Bergamote" }, { name: "Cassis" }],
    heartNotesDetailed: [{ name: "Bouleau" }, { name: "Patchouli" }],
    baseNotesDetailed: [{ name: "Musc" }, { name: "Ambre gris" }]
  },
  {
    id: "la-nuit-de-l-homme",
    name: "La Nuit de l'Homme",
    brand: "YSL",
    image: "https://fimgs.net/mdimg/perfume/o.5521.jpg",
    description: "Une fragrance séductrice et sombre, entre élégance et perdition.",
    year: 2009,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Cardamome", "Bergamote"],
    heartNotes: ["Lavande", "Cèdre de Virginie", "Notes florales"],
    baseNotes: ["Vétiver", "Coumarine", "Carvi"],
    topNotesDetailed: [{ name: "Cardamome" }],
    heartNotesDetailed: [{ name: "Lavande" }, { name: "Cèdre" }],
    baseNotesDetailed: [{ name: "Vétiver" }, { name: "Coumarine" }]
  },
  {
    id: "acqua-di-gio",
    name: "Acqua di Gio",
    brand: "Armani",
    image: "https://fimgs.net/mdimg/perfume/o.410.jpg",
    description: "La fraîcheur de la mer et la chaleur du soleil sur la peau.",
    year: 1996,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Lime", "Citron", "Bergamote", "Jasmin", "Orange", "Mandarine", "Néroli"],
    heartNotes: ["Notes marines", "Jasmin", "Calone", "Pêche", "Freesia", "Cyclamen", "Jacinthe", "Violette", "Romarin", "Coriandre", "Noix de muscade", "Rose", "Réséda"],
    baseNotes: ["Musc blanc", "Cèdre", "Mousse de chêne", "Patchouli", "Ambre"],
    topNotesDetailed: [{ name: "Lime" }, { name: "Citron" }, { name: "Bergamote" }],
    heartNotesDetailed: [{ name: "Notes marines" }, { name: "Romarin" }, { name: "Pêche" }],
    baseNotesDetailed: [{ name: "Musc blanc" }, { name: "Cèdre" }]
  },
  {
    id: "terre-d-hermes",
    name: "Terre d'Hermès",
    brand: "Hermès",
    image: "https://fimgs.net/mdimg/perfume/o.17.jpg",
    description: "Un récit symbolique sur la matière et sa transformation. Un parfum entre terre et ciel.",
    year: 2006,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Orange", "Pamplemousse"],
    heartNotes: ["Poivre", "Pélargonium", "Silex"],
    baseNotes: ["Vétiver", "Cèdre", "Patchouli", "Benjoin"],
    topNotesDetailed: [{ name: "Orange" }, { name: "Pamplemousse" }],
    heartNotesDetailed: [{ name: "Poivre" }, { name: "Silex" }],
    baseNotesDetailed: [{ name: "Vétiver" }, { name: "Cèdre" }, { name: "Benjoin" }]
  },
  {
    id: "le-male-jpg",
    name: "Le Male",
    brand: "Jean Paul Gaultier",
    image: "https://fimgs.net/mdimg/perfume/o.430.jpg",
    description: "Aussi viril que sexy, un parfum qui bouscule les conventions.",
    year: 1995,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Lavande", "Menthe", "Cardamome", "Bergamote", "Armoise"],
    heartNotes: ["Cannelle", "Fleur d'oranger", "Carvi"],
    baseNotes: ["Vanille", "Fève Tonka", "Ambre", "Santal", "Cèdre"],
    topNotesDetailed: [{ name: "Lavande" }, { name: "Menthe" }, { name: "Cardamome" }],
    heartNotesDetailed: [{ name: "Cannelle" }, { name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Fève Tonka" }]
  },
  {
    id: "eros-versace",
    name: "Eros",
    brand: "Versace",
    image: "https://fimgs.net/mdimg/perfume/o.16657.jpg",
    description: "Inspiré par la mythologie grecque, un parfum pour l'homme fort et passionné.",
    year: 2012,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Menthe", "Pomme verte", "Citron"],
    heartNotes: ["Fève Tonka", "Ambroxan", "Géranium"],
    baseNotes: ["Vanille de Madagascar", "Cèdre de Virginie", "Cèdre de l'Atlas", "Vétiver", "Mousse de chêne"],
    topNotesDetailed: [{ name: "Menthe" }, { name: "Pomme verte" }],
    heartNotesDetailed: [{ name: "Fève Tonka" }, { name: "Ambroxan" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Cèdre" }]
  },
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    image: "https://www.decanterra.ro/cdn/shop/files/BaccaratRouge540Extrait_ea7ebc01-3e67-4524-a02d-d1c84d071769.webp?v=1726603547",
    description: "Une alchimie poétique où les notes de jasmin et le rayonnement du safran transportent des facettes minérales d'ambre gris.",
    year: 2015,
    gender: "unisexe",
    concentration: "Eau de Parfum",
    topNotes: ["Safran", "Jasmin"],
    heartNotes: ["Amberwood", "Ambre gris"],
    baseNotes: ["Résine de sapin", "Cèdre"],
    topNotesDetailed: [{ name: "Safran" }, { name: "Jasmin" }],
    heartNotesDetailed: [{ name: "Amberwood" }, { name: "Ambre gris" }],
    baseNotesDetailed: [{ name: "Résine de sapin" }, { name: "Cèdre" }]
  },
  {
    id: "layton-pdm",
    name: "Layton",
    brand: "Parfums de Marly",
    image: "https://parfums-de-marly.com/cdn/shop/files/LAYTON-PERFUME-200-PACK1-1X1_CENTERED_b1c0caab-e449-4e3c-9780-195aad3a1ae5.png?v=1759501470&width=1445",
    description: "Une fragrance addictive et élégante qui célèbre la noblesse du 18ème siècle.",
    year: 2016,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Pomme", "Lavande", "Bergamote", "Mandarine"],
    heartNotes: ["Géranium", "Violette", "Jasmin"],
    baseNotes: ["Vanille", "Poivre noir", "Cardamome", "Santal", "Patchouli", "Gaïac"],
    topNotesDetailed: [{ name: "Pomme" }, { name: "Lavande" }],
    heartNotesDetailed: [{ name: "Géranium" }, { name: "Violette" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Poivre noir" }, { name: "Gaïac" }]
  },
  {
    id: "homme-intense-dior",
    name: "Dior Homme Intense",
    brand: "Dior",
    image: "https://fimgs.net/mdimg/perfume/o.13016.jpg",
    description: "La quintessence du prestige et du raffinement dans une Eau de Parfum généreuse et puissante.",
    year: 2011,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Lavande"],
    heartNotes: ["Iris", "Ambrette", "Poire"],
    baseNotes: ["Cèdre de Virginie", "Vétiver"],
    topNotesDetailed: [{ name: "Lavande" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Ambrette" }],
    baseNotesDetailed: [{ name: "Cèdre de Virginie" }, { name: "Vétiver" }]
  },
  {
    id: "y-edp-ysl",
    name: "Y Eau de Parfum",
    brand: "YSL",
    image: "https://fimgs.net/mdimg/perfume/o.50757.jpg",
    description: "Le parfum d'un homme qui a accompli ses rêves et qui ose encore davantage.",
    year: 2018,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Pomme", "Gingembre", "Bergamote"],
    heartNotes: ["Sauge", "Baies de genièvre", "Géranium"],
    baseNotes: ["Ambre gris", "Fève Tonka", "Cèdre", "Vétiver", "Oliban"],
    topNotesDetailed: [{ name: "Pomme" }, { name: "Gingembre" }],
    heartNotesDetailed: [{ name: "Sauge" }, { name: "Baies de genièvre" }],
    baseNotesDetailed: [{ name: "Ambre gris" }, { name: "Fève Tonka" }]
  },
  {
    id: "angels-share",
    name: "Angels' Share",
    brand: "Kilian Paris",
    image: "https://fimgs.net/mdimg/perfume/o.62615.jpg",
    description: "Une fragrance inspirée par l'héritage de la famille Hennessy, une véritable part des anges.",
    year: 2020,
    gender: "unisexe",
    concentration: "Eau de Parfum",
    topNotes: ["Cognac"],
    heartNotes: ["Cannelle", "Fève Tonka", "Chêne"],
    baseNotes: ["Vanille", "Praliné", "Santal"],
    topNotesDetailed: [{ name: "Cognac" }],
    heartNotesDetailed: [{ name: "Cannelle" }, { name: "Fève Tonka" }],
    baseNotesDetailed: [{ name: "Vanille" }, { name: "Praliné" }]
  },
  {
    id: "cedrat-boise",
    name: "Cedrat Boise",
    brand: "Mancera",
    image: "https://fimgs.net/mdimg/perfume/o.15211.jpg",
    description: "Vif et étincelant, un boisé fruité moderne et polyvalent.",
    year: 2011,
    gender: "unisexe",
    concentration: "Eau de Parfum",
    topNotes: ["Citron de Sicile", "Cassis", "Bergamote", "Notes épicées"],
    heartNotes: ["Notes fruitées", "Feuille de patchouli", "Jasmin d'eau"],
    baseNotes: ["Cèdre", "Cuir", "Santal", "Musc blanc", "Mousse de chêne", "Vanille"],
    topNotesDetailed: [{ name: "Citron de Sicile" }, { name: "Cassis" }],
    heartNotesDetailed: [{ name: "Notes fruitées" }, { name: "Patchouli" }],
    baseNotesDetailed: [{ name: "Cuir" }, { name: "Cèdre" }, { name: "Santal" }]
  },
  {
    id: "wanted-by-night",
    name: "Wanted by Night",
    brand: "Azzaro",
    image: "https://fimgs.net/mdimg/perfume/o.49144.jpg",
    description: "L'arme de séduction d'un Gatsby moderne. Un parfum boisé-oriental-épicé.",
    year: 2018,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Cannelle", "Mandarine", "Lavande", "Citron"],
    heartNotes: ["Notes fruitées", "Encens", "Cèdre rouge", "Cumin"],
    baseNotes: ["Tabac", "Vanille", "Cuir", "Cèdre", "Benjoin", "Iso E Super", "Patchouli"],
    topNotesDetailed: [{ name: "Cannelle" }, { name: "Mandarine" }],
    heartNotesDetailed: [{ name: "Encens" }, { name: "Notes fruitées" }],
    baseNotesDetailed: [{ name: "Tabac" }, { name: "Cuir" }, { name: "Vanille" }]
  },
  {
    id: "born-in-roma",
    name: "Uomo Born In Roma",
    brand: "Valentino",
    image: "https://fimgs.net/mdimg/perfume/o.55805.jpg",
    description: "Une fragrance boisée moderne et élégante, inspirée par la ville de Rome.",
    year: 2019,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Notes minérales", "Feuille de violette", "Sel"],
    heartNotes: ["Sauge", "Gingembre"],
    baseNotes: ["Vétiver fumé", "Notes boisées"],
    topNotesDetailed: [{ name: "Notes minérales" }, { name: "Feuille de violette" }],
    heartNotesDetailed: [{ name: "Sauge" }, { name: "Gingembre" }],
    baseNotesDetailed: [{ name: "Vétiver fumé" }]
  },
  {
    id: "the-one-dg",
    name: "The One",
    brand: "Dolce & Gabbana",
    image: "https://fimgs.net/mdimg/perfume/o.2056.jpg",
    description: "Une signature classique et moderne, vibrante et magnétique.",
    year: 2008,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Pamplemousse", "Coriandre", "Basilic"],
    heartNotes: ["Gingembre", "Cardamome", "Fleur d'oranger"],
    baseNotes: ["Tabac", "Ambre", "Cèdre"],
    topNotesDetailed: [{ name: "Basilic" }, { name: "Pamplemousse" }],
    heartNotesDetailed: [{ name: "Gingembre" }, { name: "Cardamome" }],
    baseNotesDetailed: [{ name: "Tabac" }, { name: "Ambre" }]
  },
  {
    id: "prada-l-homme",
    name: "Prada L'Homme",
    brand: "Prada",
    image: "https://fimgs.net/mdimg/perfume/o.39029.jpg",
    description: "Un parfum construit autour de l'association de l'Iris et du Néroli, les deux ingrédients phares de Prada.",
    year: 2016,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Néroli", "Poivre noir", "Cardamome", "Graine de carotte"],
    heartNotes: ["Iris", "Violette", "Géranium", "Maté"],
    baseNotes: ["Patchouli", "Cèdre", "Santal", "Ambre"],
    topNotesDetailed: [{ name: "Néroli" }, { name: "Poivre noir" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Violette" }],
    baseNotesDetailed: [{ name: "Patchouli" }, { name: "Cèdre" }]
  },
  {
    id: "allure-sport-chanel",
    name: "Allure Homme Sport",
    brand: "Chanel",
    image: "https://fimgs.net/mdimg/perfume/o.607.jpg",
    description: "L'allure d'un homme qui aime les grands espaces, entre fraîcheur et sensualité.",
    year: 2004,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Orange", "Notes marines", "Aldéhydes", "Mandarine sanguine"],
    heartNotes: ["Poivre", "Néroli", "Cèdre"],
    baseNotes: ["Fève Tonka", "Vanille", "Musc blanc", "Ambre", "Vétiver", "Résine d'élémi"],
    topNotesDetailed: [{ name: "Orange" }, { name: "Notes marines" }, { name: "Aldéhydes" }],
    heartNotesDetailed: [{ name: "Poivre" }, { name: "Néroli" }],
    baseNotesDetailed: [{ name: "Fève Tonka" }, { name: "Musc blanc" }]
  },
  {
    id: "homme-ideal-guerlain",
    name: "L'Homme Idéal",
    brand: "Guerlain",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.25780.jpg",
    description: "L'homme idéal est un mythe. Son parfum, une réalité. Une fragrance d'amande fraîche et boisée.",
    year: 2014,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Agrumes", "Fleur d'oranger", "Romarin", "Bitter Orange"],
    heartNotes: ["Amande", "Fève Tonka"],
    baseNotes: ["Cuir", "Vétiver", "Cèdre"],
    topNotesDetailed: [{ name: "Agrumes" }, { name: "Romarin" }],
    heartNotesDetailed: [{ name: "Amande" }, { name: "Fève Tonka" }],
    baseNotesDetailed: [{ name: "Cuir" }, { name: "Vétiver" }]
  },
  {
    id: "black-orchid-tf",
    name: "Black Orchid",
    brand: "Tom Ford",
    image: "https://fimgs.net/mdimg/perfume/o.1018.jpg",
    description: "Une fragrance luxueuse et sensuelle aux accords riches et sombres d'orchidée noire.",
    year: 2006,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Truffe noire", "Gardénia", "Cassis", "Ylang-ylang", "Jasmin", "Bergamote", "Mandarine", "Citron d'Amalfi"],
    heartNotes: ["Orchidée noire", "Épices", "Notes fruitées", "Lotus", "Jasmin"],
    baseNotes: ["Chocolat mexicain", "Patchouli", "Vanille", "Encens", "Ambre", "Santal", "Vétiver", "Musc blanc"],
    topNotesDetailed: [{ name: "Truffe noire" }, { name: "Ylang-ylang" }, { name: "Cassis" }],
    heartNotesDetailed: [{ name: "Orchidée noire" }, { name: "Épices" }],
    baseNotesDetailed: [{ name: "Chocolat mexicain" }, { name: "Patchouli" }, { name: "Encens" }]
  },
  {
    id: "one-million-pr",
    name: "1 Million",
    brand: "Paco Rabanne",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2020/04/1-Million-510x510.jpg",
    description: "L'expression de la fantaisie de tout homme : le succès, la richesse et l'audace.",
    year: 2008,
    gender: "homme",
    concentration: "Eau de Toilette",
    topNotes: ["Mandarine sanguine", "Pamplemousse", "Menthe poivrée"],
    heartNotes: ["Cannelle", "Rose", "Notes épicées"],
    baseNotes: ["Cuir", "Ambre", "Patchouli indien", "Notes boisées"],
    topNotesDetailed: [{ name: "Mandarine sanguine" }, { name: "Menthe poivrée" }],
    heartNotesDetailed: [{ name: "Cannelle" }, { name: "Rose" }],
    baseNotesDetailed: [{ name: "Cuir" }, { name: "Ambre" }]
  },
  {
    id: "spicebomb-extreme",
    name: "Spicebomb Extreme",
    brand: "Viktor&Rolf",
    image: "https://cdn.notinoimg.com/detail_main_lq/viktor-rolf/3614270659706_01-o/spicebomb-extreme___250715.jpg",
    description: "Une version encore plus intense et épicée du classique Spicebomb.",
    year: 2015,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Poivre noir", "Pamplemousse", "Bergamote"],
    heartNotes: ["Tabac", "Cannelle", "Cumin", "Safran"],
    baseNotes: ["Vanille de Madagascar", "Bourbon", "Ciste-Labdanum"],
    topNotesDetailed: [{ name: "Poivre noir" }, { name: "Pamplemousse" }],
    heartNotesDetailed: [{ name: "Tabac" }, { name: "Cannelle" }, { name: "Safran" }],
    baseNotesDetailed: [{ name: "Vanille de Madagascar" }, { name: "Ciste-Labdanum" }]
  },
  {
    id: "acqua-di-parma-colonia",
    name: "Colonia",
    brand: "Acqua di Parma",
    image: "https://fimgs.net/mdimg/perfume/o.1681.jpg",
    description: "L'élégance italienne authentique. Un classique intemporel né en 1916.",
    year: 1916,
    gender: "unisexe",
    concentration: "Eau de Cologne",
    topNotes: ["Citron de Sicile", "Orange douce", "Bergamote de Calabre"],
    heartNotes: ["Lavande", "Rose de Bulgarie", "Romarin", "Verveine odorante"],
    baseNotes: ["Santal", "Vétiver", "Patchouli", "Mousse de chêne"],
    topNotesDetailed: [{ name: "Citron de Sicile" }, { name: "Orange douce" }],
    heartNotesDetailed: [{ name: "Lavande" }, { name: "Rose de Bulgarie" }, { name: "Romarin" }],
    baseNotesDetailed: [{ name: "Santal" }, { name: "Vétiver" }]
  }
];

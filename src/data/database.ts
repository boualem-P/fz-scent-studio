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
    topNotes: ["Ylang-ylang"],
    heartNotes: ["Rose de Damas"],
    baseNotes: ["Jasmin Grasse"],
    topNotesDetailed: [{ name: "Ylang-ylang" }],
    heartNotesDetailed: [{ name: "Rose de Damas" }],
    baseNotesDetailed: [{ name: "Jasmin Grasse" }]
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
    topNotes: ["Poire", "Mûre"],
    heartNotes: ["Iris", "Fleur d'oranger"],
    baseNotes: ["Patchouli"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Mûre" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Patchouli" }]
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
    topNotes: ["Café noir"],
    heartNotes: ["Fleur d'oranger"],
    baseNotes: ["Cèdre", "Patchouli"],
    topNotesDetailed: [{ name: "Café noir" }],
    heartNotesDetailed: [{ name: "Fleur d'oranger" }],
    baseNotesDetailed: [{ name: "Cèdre" }, { name: "Patchouli" }]
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
    topNotes: ["Bergamote", "Figue"],
    heartNotes: ["Cèdre", "Vétiver"],
    baseNotes: ["Musc", "Tabac"],
    topNotesDetailed: [{ name: "Bergamote" }, { name: "Figue" }],
    heartNotesDetailed: [{ name: "Cèdre" }, { name: "Vétiver" }],
    baseNotesDetailed: [{ name: "Musc" }, { name: "Tabac" }]
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
    topNotes: ["Cardamome"],
    heartNotes: ["Iris", "Violette"],
    baseNotes: ["Santal", "Cèdre"],
    topNotesDetailed: [{ name: "Cardamome" }],
    heartNotesDetailed: [{ name: "Iris" }, { name: "Violette" }],
    baseNotesDetailed: [{ name: "Santal" }, { name: "Cèdre" }]
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
    topNotes: ["Mandarine"],
    heartNotes: ["Violette"],
    baseNotes: ["Cuir"],
    topNotesDetailed: [{ name: "Mandarine" }],
    heartNotesDetailed: [{ name: "Violette" }],
    baseNotesDetailed: [{ name: "Cuir" }]
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
    topNotes: ["Bergamote", "Pamplemousse"],
    heartNotes: ["Poivre rose", "Safran"],
    baseNotes: ["Cuir", "Tabac"],
    topNotesDetailed: [{ name: "Bergamote" }, { name: "Pamplemousse" }],
    heartNotesDetailed: [{ name: "Poivre rose" }, { name: "Safran" }],
    baseNotesDetailed: [{ name: "Cuir" }, { name: "Tabac" }]
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
    topNotes: ["Gingembre"],
    heartNotes: ["Fleur d'oranger", "Jasmin"],
    baseNotes: ["Patchouli", "Vétiver"],
    topNotesDetailed: [{ name: "Gingembre" }],
    heartNotesDetailed: [{ name: "Fleur d'oranger" }, { name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Patchouli" }, { name: "Vétiver" }]
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
    topNotes: ["Fraise", "Framboise"],
    heartNotes: ["Jasmin", "Violette"],
    baseNotes: ["Ambre", "Musc"],
    topNotesDetailed: [{ name: "Fraise" }, { name: "Framboise" }],
    heartNotesDetailed: [{ name: "Jasmin" }, { name: "Violette" }],
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
    topNotes: ["Mandarine", "Lavande"],
    heartNotes: ["Fleur d'oranger"],
    baseNotes: ["Vanille", "Ambre gris"],
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
    topNotes: ["Amande"],
    heartNotes: ["Jasmin Sambac", "Tubéreuse"],
    baseNotes: ["Fève Tonka", "Cacao"],
    topNotesDetailed: [{ name: "Amande" }],
    heartNotesDetailed: [{ name: "Jasmin Sambac" }, { name: "Tubéreuse" }],
    baseNotesDetailed: [{ name: "Fève Tonka" }, { name: "Cacao" }]
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
    topNotes: ["Poivre noir"],
    heartNotes: ["Iris"],
    baseNotes: ["Vanille noire", "Patchouli"],
    topNotesDetailed: [{ name: "Poivre noir" }],
    heartNotesDetailed: [{ name: "Iris" }],
    baseNotesDetailed: [{ name: "Vanille noire" }, { name: "Patchouli" }]
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
    topNotes: ["Mirabelle"],
    heartNotes: ["Freesia"],
    baseNotes: ["Mousse de chêne"],
    topNotesDetailed: [{ name: "Mirabelle" }],
    heartNotesDetailed: [{ name: "Freesia" }],
    baseNotesDetailed: [{ name: "Mousse de chêne" }]
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
    heartNotes: ["Ambre", "Ciste"],
    baseNotes: ["Patchouli", "Vanille"],
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
    topNotes: ["Bergamote de Calabre"],
    heartNotes: ["Poivre du Sichuan", "Lavande"],
    baseNotes: ["Ambroxan"],
    topNotesDetailed: [{ name: "Bergamote de Calabre" }],
    heartNotesDetailed: [{ name: "Poivre du Sichuan" }, { name: "Lavande" }],
    baseNotesDetailed: [{ name: "Ambroxan" }]
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
    topNotes: ["Citron", "Menthe", "Baies roses"],
    heartNotes: ["Gingembre", "Jasmin"],
    baseNotes: ["Santal", "Cèdre"],
    topNotesDetailed: [{ name: "Citron" }, { name: "Menthe" }],
    heartNotesDetailed: [{ name: "Gingembre" }],
    baseNotesDetailed: [{ name: "Santal" }]
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
    topNotes: ["Ananas", "Cassis"],
    heartNotes: ["Bouleau", "Patchouli"],
    baseNotes: ["Musc", "Ambre gris"],
    topNotesDetailed: [{ name: "Ananas" }],
    heartNotesDetailed: [{ name: "Bouleau" }],
    baseNotesDetailed: [{ name: "Ambre gris" }]
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
    topNotes: ["Cardamome"],
    heartNotes: ["Lavande", "Cèdre"],
    baseNotes: ["Vétiver", "Coumarine"],
    topNotesDetailed: [{ name: "Cardamome" }],
    heartNotesDetailed: [{ name: "Lavande" }],
    baseNotesDetailed: [{ name: "Vétiver" }]
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
    topNotes: ["Citron", "Jasmin"],
    heartNotes: ["Notes marines", "Pêche"],
    baseNotes: ["Cèdre", "Musc blanc"],
    topNotesDetailed: [{ name: "Citron" }],
    heartNotesDetailed: [{ name: "Notes marines" }],
    baseNotesDetailed: [{ name: "Musc blanc" }]
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
    heartNotes: ["Poivre", "Pélargonium"],
    baseNotes: ["Vétiver", "Cèdre", "Benjoin"],
    topNotesDetailed: [{ name: "Orange" }],
    heartNotesDetailed: [{ name: "Poivre" }],
    baseNotesDetailed: [{ name: "Vétiver" }]
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
    topNotes: ["Lavande", "Menthe"],
    heartNotes: ["Fleur d'oranger", "Cannelle"],
    baseNotes: ["Vanille", "Fève Tonka"],
    topNotesDetailed: [{ name: "Menthe" }],
    heartNotesDetailed: [{ name: "Cannelle" }],
    baseNotesDetailed: [{ name: "Vanille" }]
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
    topNotes: ["Menthe", "Pomme verte"],
    heartNotes: ["Fève Tonka", "Ambroxan"],
    baseNotes: ["Vanille de Madagascar", "Cèdre"],
    topNotesDetailed: [{ name: "Menthe" }],
    heartNotesDetailed: [{ name: "Ambroxan" }],
    baseNotesDetailed: [{ name: "Vanille" }]
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
    heartNotes: ["Bois d'Ambre", "Ambre gris"],
    baseNotes: ["Résine de sapin", "Cèdre"],
    topNotesDetailed: [{ name: "Safran" }],
    heartNotesDetailed: [{ name: "Ambre gris" }],
    baseNotesDetailed: [{ name: "Cèdre" }]
  },
  {
    id: "layton-pdm",
    name: "Layton",
    brand: "Parfums de Marly",
    image: "https://fimgs.net/mdimg/perfume/social.46633.jpg",
    description: "Une fragrance addictive et élégante qui célèbre la noblesse du 18ème siècle.",
    year: 2016,
    gender: "homme",
    concentration: "Eau de Parfum",
    topNotes: ["Pomme", "Lavande", "Bergamote"],
    heartNotes: ["Jasmin", "Violette", "Géranium"],
    baseNotes: ["Vanille", "Poivre", "Santal"],
    topNotesDetailed: [{ name: "Pomme" }],
    heartNotesDetailed: [{ name: "Géranium" }],
    baseNotesDetailed: [{ name: "Vanille" }]
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
    heartNotes: ["Iris", "Ambrette"],
    baseNotes: ["Cèdre de Virginie", "Vétiver"],
    topNotesDetailed: [{ name: "Lavande" }],
    heartNotesDetailed: [{ name: "Iris" }],
    baseNotesDetailed: [{ name: "Vétiver" }]
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
    topNotes: ["Gingembre", "Pomme", "Bergamote"],
    heartNotes: ["Sauge", "Baies de genièvre"],
    baseNotes: ["Fève Tonka", "Ambre gris", "Cèdre"],
    topNotesDetailed: [{ name: "Pomme" }],
    heartNotesDetailed: [{ name: "Sauge" }],
    baseNotesDetailed: [{ name: "Ambre gris" }]
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
    heartNotesDetailed: [{ name: "Cannelle" }],
    baseNotesDetailed: [{ name: "Vanille" }]
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
    topNotes: ["Citron de Sicile", "Cassis", "Épices"],
    heartNotes: ["Notes fruitées", "Feuilles de Patchouli", "Jasmin"],
    baseNotes: ["Cèdre", "Cuir", "Santal", "Musc blanc"],
    topNotesDetailed: [{ name: "Citron" }],
    heartNotesDetailed: [{ name: "Patchouli" }],
    baseNotesDetailed: [{ name: "Cuir" }]
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
    topNotes: ["Cannelle", "Mandarine"],
    heartNotes: ["Cèdre rouge", "Encens"],
    baseNotes: ["Tabac", "Cèdre", "Cuir"],
    topNotesDetailed: [{ name: "Cannelle" }],
    heartNotesDetailed: [{ name: "Encens" }],
    baseNotesDetailed: [{ name: "Tabac" }]
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
    topNotes: ["Sels minéraux", "Feuille de violette"],
    heartNotes: ["Sauge", "Gingembre"],
    baseNotes: ["Vétiver fumé"],
    topNotesDetailed: [{ name: "Feuille de violette" }],
    heartNotesDetailed: [{ name: "Gingembre" }],
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
    topNotesDetailed: [{ name: "Basilic" }],
    heartNotesDetailed: [{ name: "Gingembre" }],
    baseNotesDetailed: [{ name: "Ambre" }]
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
    topNotes: ["Néroli", "Poivre noir"],
    heartNotes: ["Iris", "Ambre", "Géranium"],
    baseNotes: ["Patchouli", "Cèdre"],
    topNotesDetailed: [{ name: "Néroli" }],
    heartNotesDetailed: [{ name: "Iris" }],
    baseNotesDetailed: [{ name: "Cèdre" }]
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
    topNotes: ["Aldéhydes", "Mandarine", "Orange"],
    heartNotes: ["Cèdre", "Néroli"],
    baseNotes: ["Fève Tonka", "Ambre", "Musc blanc"],
    topNotesDetailed: [{ name: "Orange" }],
    heartNotesDetailed: [{ name: "Cèdre" }],
    baseNotesDetailed: [{ name: "Musc blanc" }]
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
    topNotes: ["Agrumes", "Romarin"],
    heartNotes: ["Amande", "Fève Tonka"],
    baseNotes: ["Cuir", "Cèdre", "Vétiver"],
    topNotesDetailed: [{ name: "Romarin" }],
    heartNotesDetailed: [{ name: "Amande" }],
    baseNotesDetailed: [{ name: "Cuir" }]
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
    topNotes: ["Truffe noire", "Ylang-ylang", "Bergamote"],
    heartNotes: ["Orchidée noire", "Notes fruitées"],
    baseNotes: ["Patchouli", "Santal", "Vanille", "Chocolat"],
    topNotesDetailed: [{ name: "Truffe noire" }],
    heartNotesDetailed: [{ name: "Orchidée noire" }],
    baseNotesDetailed: [{ name: "Patchouli" }]
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
    topNotes: ["Mandarine sanguine", "Menthe poivrée"],
    heartNotes: ["Absolu de rose", "Cannelle"],
    baseNotes: ["Accord de cuir", "Ambre kétal"],
    topNotesDetailed: [{ name: "Mandarine" }],
    heartNotesDetailed: [{ name: "Cannelle" }],
    baseNotesDetailed: [{ name: "Accord de cuir" }]
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
    topNotes: ["Poivre noir", "Carvi"],
    heartNotes: ["Tabac", "Lavande"],
    baseNotes: ["Vanille", "Fève Tonka"],
    topNotesDetailed: [{ name: "Poivre noir" }],
    heartNotesDetailed: [{ name: "Tabac" }],
    baseNotesDetailed: [{ name: "Vanille" }]
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
    topNotes: ["Citron", "Orange douce", "Bergamote"],
    heartNotes: ["Lavande", "Rose", "Romarin"],
    baseNotes: ["Vétiver", "Santal", "Patchouli"],
    topNotesDetailed: [{ name: "Citron" }],
    heartNotesDetailed: [{ name: "Lavande" }],
    baseNotesDetailed: [{ name: "Santal" }]
  }
];

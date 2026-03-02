import { Perfume } from "./perfumes";

export const PERFUMES: Perfume[] = [
  {
    id: "bleu-de-chanel-edp",
    name: "Bleu de Chanel",
    brand: "Chanel",
    gender: "homme",
    year: 2014,
    concentration: "Eau de Parfum",
    description: "Une fragrance boisée et aromatique aux accents ambrés et musqués.",
    topNotes: ["hesperides", "epices-fraiches", "aromatiques"],
    heartNotes: ["epices-chaudes", "florales", "fruitees"],
    baseNotes: ["boisees", "ambrees", "musquees"],
    topNotesDetailed: [
      { name: "Pamplemousse" }, { name: "Citron" }, 
      { name: "Menthe" }, { name: "Poivre Rose" }, 
      { name: "Aldéhydes" }, { name: "Coriandre" }
    ],
    heartNotesDetailed: [
      { name: "Gingembre" }, { name: "Noix de Muscade" }, 
      { name: "Jasmin" }, { name: "Melon" }
    ],
    baseNotesDetailed: [
      { name: "Encens" }, { name: "Ambre" }, { name: "Cèdre" }, 
      { name: "Santal" }, { name: "Patchouli" }, { name: "Labdanum" }
    ],
  },
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "mixte",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un élixir lumineux où le safran et le jasmin dansent sur un lit d'ambre et de cèdre.",
    topNotes: ["epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [{ name: "Safran" }, { name: "Jasmin" }],
    heartNotesDetailed: [{ name: "Bois d'Ambre" }, { name: "Ambre gris" }],
    baseNotesDetailed: [{ name: "Résine de sapin" }, { name: "Cèdre" }],
  },
  {
    id: "sauvage-edp",
    name: "Sauvage",
    brand: "Dior",
    gender: "homme",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un souffle de liberté brute. La bergamote explose sur un cœur poivré et ambré.",
    topNotes: ["hesperides", "epices-fraiches"],
    heartNotes: ["epices-chaudes", "aromatiques"],
    baseNotes: ["ambrees", "boisees"],
    topNotesDetailed: [{ name: "Bergamote de Calabre" }, { name: "Poivre" }],
    heartNotesDetailed: [{ name: "Poivre de Sichuan" }, { name: "Lavande" }, { name: "Anis étoilé" }, { name: "Noix de muscade" }],
    baseNotesDetailed: [{ name: "Ambroxan" }, { name: "Vanille de Papouasie" }],
  }
];

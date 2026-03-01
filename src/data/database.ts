import { Perfume } from "./perfumes";

export const PERFUMES: Perfume[] = [
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
    topNotesDetailed: [{ name: "Safran" }],
    heartNotesDetailed: [{ name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Ambre" }, { name: "Cèdre" }],
  },
  // ... GARDE TOUS TES AUTRES PARFUMS ICI ...
  // Assure-toi qu'ils finissent tous par une virgule } ,
];

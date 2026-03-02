import { Perfume } from "./perfumes";

export const PERFUMES: Perfume[] = [
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "mixte",
    year: 2015,
    concentration: "Eau de Parfum",
    description: "Un élixir lumineux.",
    topNotes: ["epices-fraiches"],
    heartNotes: ["florales"],
    baseNotes: ["ambrees"],
    // ON NETTOIE ICI : On met des tableaux vides pour tester
    topNotesDetailed: [], 
    heartNotesDetailed: [],
    baseNotesDetailed: [],
  }
];

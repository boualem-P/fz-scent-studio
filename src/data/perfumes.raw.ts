// src/data/perfumes.raw.ts

import { NoteDetail } from "./database";

export interface RawPerfume {
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
}

export const RAW_PERFUMES: RawPerfume[] = [
  {
    id: "j-adore-dior",
    name: "J'adore",
    brand: "Dior",
    image: "https://fimgs.net/mdimg/perfume/o.210.jpg",
    description: "Un bouquet floral unique...",
    year: 1999,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Melon", "Magnolia"],
    heartNotes: ["Jasmin", "Tubéreuse", "Rose de Damas"],
    baseNotes: ["Musc", "Vanille", "Cèdre"],
    topNotesDetailed: [{ name: "Poire" }, { name: "Melon" }],
    heartNotesDetailed: [{ name: "Jasmin" }],
    baseNotesDetailed: [{ name: "Vanille" }]
  },

  {
    id: "black-opium",
    name: "Black Opium",
    brand: "YSL",
    image: "https://www.mustbeauty.dz/wp-content/uploads/2019/06/Black-opium-Yves-saint-laurent-Eau-de-parfum.jpg",
    description: "Une dose d'adrénaline...",
    year: 2014,
    gender: "femme",
    concentration: "Eau de Parfum",
    topNotes: ["Poire", "Poivre rose"],
    heartNotes: ["Café", "Jasmin"],
    baseNotes: ["Vanille", "Patchouli"],
    topNotesDetailed: [{ name: "Poire" }],
    heartNotesDetailed: [{ name: "Café" }],
    baseNotesDetailed: [{ name: "Vanille" }]
  }
];

export interface Accord {
  label: string;
  color: string;
}

export const ACCORDS_LIBRARY: Record<string, Accord> = {

  // ======================
  // FAMILLE 1 : PILIERS
  // ======================
  woody: { label: "Boisé", color: "#8B4513" },
  aromatic: { label: "Aromatique", color: "#6B8E23" },
  citrus: { label: "Agrumes / Hespéridé", color: "#FFD700" },
  floral: { label: "Floral", color: "#FF69B4" },
  fresh: { label: "Frais", color: "#ADD8E6" },
  fresh_spicy: { label: "Frais épicé", color: "#87CEFA" },
  warm_spicy: { label: "Épicé chaud", color: "#CD5C5C" },
  soft_spicy: { label: "Épicé doux", color: "#DEB887" },
  amber: { label: "Ambré", color: "#FFBF00" },
  musky: { label: "Musqué", color: "#D8BFD8" },
  powdery: { label: "Poudré", color: "#F5DEB3" },

  // ======================
  // FAMILLE 2 : NATURE
  // ======================
  rose: { label: "Rose", color: "#FF007F" },
  white_floral: { label: "Fleurs blanches", color: "#FFF5EE" },
  yellow_floral: { label: "Jaune floral", color: "#FFD54F" },
  iris: { label: "Iris", color: "#C8A2C8" },
  violet: { label: "Violette", color: "#8A2BE2" },
  lavender: { label: "Lavande", color: "#9370DB" },
  tuberose: { label: "Tubéreuse", color: "#FFE4E1" },
  green: { label: "Vert", color: "#228B22" },
  herbal: { label: "Herbal", color: "#556B2F" },
  mossy: { label: "Mousse", color: "#6B8E23" },
  earthy: { label: "Terreux", color: "#8B4513" },
  patchouli: { label: "Patchouli", color: "#5A3E1B" },
  vetiver: { label: "Vétiver", color: "#3B5323" },
  conifer: { label: "Conifère", color: "#2E8B57" },
  foresty: { label: "Forestier", color: "#355E3B" },
  hay: { label: "Foin", color: "#C2B280" },
  terpenic: { label: "Terpénique", color: "#9ACD32" },
  juniper: { label: "Genévrier", color: "#4F7942" }, // ajouté
  oak: { label: "Chêne", color: "#A0522D" }, // ajouté

  // ======================
  // FAMILLE 3 : GOURMAND
  // ======================
  fruity: { label: "Fruité", color: "#FF6347" },
  sweet: { label: "Sucré", color: "#FFB6C1" },
  vanilla: { label: "Vanille", color: "#F3E5AB" },
  gourmand: { label: "Gourmand", color: "#D2691E" },
  tropical: { label: "Tropical", color: "#FFA500" },
  coconut: { label: "Noix de coco", color: "#FFFDD0" },
  cherry: { label: "Cerise", color: "#DE3163" },
  pear: { label: "Poire", color: "#D1E231" },
  cassis: { label: "Cassis", color: "#4B0082" },
  almond: { label: "Amande", color: "#FFEBCD" },
  nutty: { label: "Noix / Noisette", color: "#A0522D" },
  honey: { label: "Miel", color: "#FFB300" },
  beeswax: { label: "Cire d'abeille", color: "#E1A95F" },
  chocolate: { label: "Chocolat", color: "#3E2723" },
  cacao: { label: "Cacao", color: "#5D4037" },
  caramel: { label: "Caramel", color: "#C68E17" },
  coffee: { label: "Café", color: "#4B3621" },
  lactonic: { label: "Lactonique", color: "#FFF8DC" },
  milky: { label: "Lacté", color: "#FAF0E6" },
  toffee: { label: "Toffee", color: "#C68E17" }, // ajouté
  maple: { label: "Érable", color: "#D2691E" }, // ajouté

  // ======================
  // FAMILLE 4 : CARACTÈRE
  // ======================
  leather: { label: "Cuir", color: "#4B3621" },
  animalic: { label: "Animalier", color: "#8B0000" },
  oud: { label: "Oud", color: "#3E2723" },
  smoky: { label: "Fumé", color: "#2F4F4F" },
  tobacco: { label: "Tabac", color: "#8B4513" },
  balsamic: { label: "Balsamique", color: "#A0522D" },
  incense: { label: "Encens", color: "#696969" },
  cinnamon: { label: "Cannelle", color: "#D2691E" },
  anise: { label: "Anis", color: "#708090" },
  camphor: { label: "Camphré", color: "#B0E0E6" },
  rum: { label: "Rhum", color: "#8B0000" },
  wine: { label: "Vin", color: "#722F37" },
  champagne: { label: "Champagne", color: "#F7E7CE" },
  sake: { label: "Saké", color: "#F5F5F5" },
  incense_sweet: { label: "Encens doux", color: "#DCD0FF" }, // ajouté

  // ======================
  // FAMILLE 5 : AQUATIQUE
  // ======================
  marine: { label: "Marin", color: "#1E90FF" },
  aquatic: { label: "Aquatique", color: "#00BFFF" },
  ozonic: { label: "Ozonique", color: "#87CEEB" },
  salty: { label: "Salé", color: "#B0C4DE" },
  mineral: { label: "Minéral", color: "#708090" },
  sand: { label: "Sable", color: "#EDC9AF" },
  solar: { label: "Solaire", color: "#FFD700" },
  aldehydic: { label: "Aldéhydé", color: "#F0FFFF" },
  soapy: { label: "Savonneux", color: "#E0FFFF" },
  metallic: { label: "Métallique", color: "#C0C0C0" },
  seaweed: { label: "Algue", color: "#2E8B57" }, // ajouté
  salty_sweet: { label: "Salé-sucré", color: "#F5DEB3" }, // ajouté

  // ======================
  // FAMILLE 6 : NICHE
  // ======================
  clay: { label: "Argile", color: "#B5651D" },
  gasoline: { label: "Essence", color: "#2B2B2B" },
  hot_iron: { label: "Fer chaud", color: "#A9A9A9" },
  industrial_glue: { label: "Colle industrielle", color: "#D3D3D3" },
  oily: { label: "Huilé", color: "#808000" },
  plastic: { label: "Plastique / Vinyle", color: "#E5E4E2" },
  rubber: { label: "Caoutchouc", color: "#1C1C1C" },
  paper: { label: "Papier", color: "#F5F5DC" },
  varnish: { label: "Vernis", color: "#DAA520" },
  sour: { label: "Acidulé", color: "#ADFF2F" },
  bitter: { label: "Amer", color: "#556B2F" },
  savory: { label: "Gustatif / Salé", color: "#8F9779" },
  resin: { label: "Résine", color: "#B87333" }, // ajouté
  metallic_sharp: { label: "Métallique tranchant", color: "#C0C0C0" } // ajouté
};

/**
 * NOTES_IMAGES — High-quality photographic images for perfume notes.
 * 
 * Each key matches a note name from perfume data.
 * URLs use Unsplash's dynamic image API with contextual keywords.
 */

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80";

export const NOTES_IMAGES: Record<string, string> = {
  // ─── CITRUS / HESPÉRIDÉS ─────────────────────────────
  "Bergamote": "https://www.grocerymart.com.my/202/bergamot-.jpg",
  "Citron": "https://png.pngtree.com/png-vector/20250508/ourmid/pngtree-lemon-png-image_16221455.png",
  "Orange": "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=150&q=80",
  "Mandarine": "https://png.pngtree.com/png-vector/20210528/ourmid/pngtree-citrus-flesh-juice-png-image_3357191.jpg",
  "Pamplemousse": "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=150&q=80",
  "Yuzu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW61VWxqrxj-d9wQPXbGGJG_2edgfXCMHQSw&s",
  "Verveine": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvasS84L8Lyw68KeCL_uUnrwj_hDpWCmDdWw&s",
  "Néroli": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzGZjJd83Ma1vEGSYekxmUoPQb064i2VXuQ&s",

  // ─── FLORALS ─────────────────────────────────────────
  "Rose": "https://upload.wikimedia.org/wikipedia/commons/5/51/Small_Red_Rose.JPG",
  "Jasmin": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Tubéreuse": "https://www.biolandes.com/wp-content/uploads/photo-produit-F2960.jpg",
  "Ylang-Ylang": "https://png.pngtree.com/png-clipart/20241013/original/pngtree-ylang-flower-png-image_16315299.png",
  "Fleur d'Oranger": "https://lallanature.com/wp-content/uploads/2020/08/eau-de-fleur-doranger-1280x800.jpg",
  "Géranium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ev56SrgogQ_YfNi-0QlkLMYQrPJA1QUsrw&s",
  "Pivoine": "https://i.pinimg.com/736x/14/d6/cd/14d6cddd1fe5346d79d438e89cce0a39.jpg",
  "Iris": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe1jK73W4KnuqMk2PByMTyLZDfMuJsqhzUg&s",
  "Violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5SwkdSnYYli-D6Pxj1l55bYkTFv4LWaDZQ&s",
  "Mimosa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Lavande": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGB63vsr4DISXdsVRM8z4ZSgKdEW4SRJWkew&s",
  "Fleur de Tabac": "https://pensezsauvage.org/IMG/jpg/semences_de_tabac_aile_bio.jpg",

  // ─── SPICES ──────────────────────────────────────────
  "Poivre": "https://images.unsplash.com/photo-1599909533601-aa023a72ff4a?auto=format&fit=crop&w=150&q=80",
  "Poivre Rose": "https://images.unsplash.com/photo-1599909533601-aa023a72ff4a?auto=format&fit=crop&w=150&q=80",
  "Poivre de Sichuan": "https://images.unsplash.com/photo-1599909533601-aa023a72ff4a?auto=format&fit=crop&w=150&q=80",
  "Gingembre": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&q=80",
  "Cardamome": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Cannelle": "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=150&q=80",
  "Clou de Girofle": "https://images.unsplash.com/photo-1599909533601-aa023a72ff4a?auto=format&fit=crop&w=150&q=80",
  "Muscade": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Safran": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Baies de Genièvre": "https://images.unsplash.com/photo-1599909533601-aa023a72ff4a?auto=format&fit=crop&w=150&q=80",
  "Épices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",

  // ─── AROMATICS ───────────────────────────────────────
  "Menthe": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=150&q=80",
  "Basilic": "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&w=150&q=80",
  "Romarin": "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=150&q=80",
  "Thym": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=150&q=80",
  "Eucalyptus": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=150&q=80",
  "Sauge": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=150&q=80",

  // ─── WOODS ───────────────────────────────────────────
  "Santal": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Cèdre": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Patchouli": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=150&q=80",
  "Vétiver": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=150&q=80",
  "Gaïac": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Oud": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Bouleau": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Palissandre": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",

  // ─── AMBER & RESINS ──────────────────────────────────
  "Ambre": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Ambre gris": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Encens": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Myrrhe": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Benjoin": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",
  "Labdanum": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80",

  // ─── GOURMAND ────────────────────────────────────────
  "Vanille": "https://images.unsplash.com/photo-1631206753348-db44968fd440?auto=format&fit=crop&w=150&q=80",
  "Fève Tonka": "https://images.unsplash.com/photo-1631206753348-db44968fd440?auto=format&fit=crop&w=150&q=80",
  "Tonka": "https://images.unsplash.com/photo-1631206753348-db44968fd440?auto=format&fit=crop&w=150&q=80",
  "Caramel": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=150&q=80",
  "Chocolat": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=150&q=80",
  "Cacao": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=150&q=80",
  "Praliné": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=150&q=80",
  "Miel": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&q=80",
  "Café": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=150&q=80",
  "Coumarine": "https://images.unsplash.com/photo-1631206753348-db44968fd440?auto=format&fit=crop&w=150&q=80",

  // ─── FRUITS ──────────────────────────────────────────
  "Pomme": "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=150&q=80",
  "Pomme verte": "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=150&q=80",
  "Poire": "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=150&q=80",
  "Bourgeon de Cassis": "https://images.unsplash.com/photo-1515942140440-bc864ab2b015?auto=format&fit=crop&w=150&q=80",
  "Fraise": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=150&q=80",
  "Framboise": "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&w=150&q=80",
  "Mûre": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=150&q=80",
  "Mangue": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=150&q=80",
  "Ananas": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=150&q=80",
  "Pêche": "https://images.unsplash.com/photo-1595124216650-1ce2e54b8644?auto=format&fit=crop&w=150&q=80",
  "Abricot": "https://images.unsplash.com/photo-1595124216650-1ce2e54b8644?auto=format&fit=crop&w=150&q=80",

  // ─── MARINE / AQUATIC ────────────────────────────────
  "Iode": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=150&q=80",
  "Algues": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=150&q=80",
  "Lotus": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=150&q=80",
  "Concombre": "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=150&q=80",
  "Calone": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=150&q=80",
  "Aldéhydes": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=150&q=80",

  // ─── GREEN NOTES ─────────────────────────────────────
  "Feuille de violette": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=150&q=80",
  "Herbe coupée": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=150&q=80",
  "Galbanum": "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=150&q=80",

  // ─── MUSK & LEATHER ──────────────────────────────────
  "Musc": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Musc blanc": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Cuir": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=150&q=80",
  "Civette": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=150&q=80",
  "Tabac": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=150&q=80",

  // ─── MOSS ────────────────────────────────────────────
  "Mousse de Chêne": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
};

/**
 * Get the image URL for a given note name.
 * Falls back to a default golden liquid image if not found.
 */
export function getNoteImage(name: string): string {
  return NOTES_IMAGES[name] ?? DEFAULT_IMAGE;
}

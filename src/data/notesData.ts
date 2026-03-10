/**
 * NOTES_IMAGES — Version Finale Optimisée & Experte
 * Incorpore : Notes de base + Bonus + 15 Molécules de synthèse stratégiques.
 */

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80";

export const NOTES_IMAGES: Record<string, string> = {
  // ─── CITRUS / HESPÉRIDÉS ─────────────────────────────
  "Bergamote": "https://www.grocerymart.com.my/202/bergamot-.jpg",
  "Bergamote de Calabre": "https://www.grocerymart.com.my/202/bergamot-.jpg",
  "Citron": "https://media.istockphoto.com/id/1389128157/fr/photo/fruit-citronn%C3%A9-avec-feuille-isol%C3%A9e-citron-entier-et-demi-avec-des-feuilles-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ilhfen4bwWI5Xfp7A9EoxcEZ7jm_kjsTlI9eL-y-AzI=",
  "Orange": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLdCdM4vI1YyN_iYrqf4Gfj-0g2hJMzx2pg&s",
  "Mandarine": "https://media.istockphoto.com/id/504384796/fr/photo/tangerines-m%C3%BBrs-frais.jpg?s=612x612&w=0&k=20&c=h60UUnfVB6ik_cT1b8lW31nU9iynyuH72QflMCOGkVQ=",
  "Pamplemousse": "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=150&q=80",
  "Yuzu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW61VWxqrxj-d9wQPXbGGJG_2edgfXCMHQSw&s",
  "Néroli": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzGZjJd83Ma1vEGSYekxmUoPQb064i2VXuQ&s",
  "Petit-grain": "https://www.biolandes.com/wp-content/uploads/photo-produit-F0460.jpg",

  // ─── FLORAUX & VERTS (INCLUANT BONUS) ────────────────
  "Rose": "https://upload.wikimedia.org/wikipedia/commons/5/51/Small_Red_Rose.JPG",
  "Jasmin": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Ylang-Ylang": "https://media.istockphoto.com/id/671330648/fr/photo/arbre-%C3%A0-fleurs-dylang-ylang.jpg?s=612x612&w=0&k=20&c=yluNyzZIHmg4WU--WgNB6LfZYnJOdZ_7vlI9kiVlPyY=",
  "Fleur d'Oranger": "https://lallanature.com/wp-content/uploads/2020/08/eau-de-fleur-doranger-1280x800.jpg",
  "Iris": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe1jK73W4KnuqMk2PByMTyLZDfMuJsqhzUg&s",
  "Lavande": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGB63vsr4DISXdsVRM8z4ZSgKdEW4SRJWkew&s",
  "Pivoine": "https://i.pinimg.com/736x/14/d6/cd/14d6cddd1fe5346d79d438e89cce0a39.jpg",
  "Violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5SwkdSnYYli-D6Pxj1l55bYkTFv4LWaDZQ&s",
  "Héliotrope": "https://media.istockphoto.com/id/1743304873/fr/photo/fleurs-dh%C3%A9liotrope.jpg?s=612x612&w=0&k=20&c=65p2ASsuECr7-2yNei-ZB0lx5E_CCK-iO71vmPhDqyI=",
  "Mimosa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Feuille de violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT77yR5_rO4fE0UuTCHmK3P7x9J5K_S9iW7pA&s",
  "Notes vertes": "https://carrementbelle.com/blog/wp-content/uploads/2020/12/notes-vertes-parfum.jpg",

  // ─── ÉPICES & GOURMANDS (INCLUANT BONUS) ─────────────
  "Poivre rose": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Cardamome": "https://media.istockphoto.com/id/1331297760/fr/photo/gousses-de-cardamome-et-graines-isol%C3%A9es-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=M9pEbeZLkCjCCa96ILlaRJPSTR4v2Xf9_6td4Wmr71M=",
  "Safran": "https://pommedambre.com/app/uploads/2021/08/safran-moulu_13320678-1-scaled.jpeg",
  "Gingembre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJtMdQmJ2JFlcmdsalxqNg7vzSS1DEj1XvA&s",
  "Vanille": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Fève Tonka": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHvB5Lqd4ZkAgh__-H5QAlpQCVjcuotFtvw&s",
  "Café": "https://thumbs.dreamstime.com/b/granos-de-caf%C3%A9-tostados-en-fondo-r%C3%BAstico-texturado-fotograf%C3%ADa-alta-resoluci%C3%B3n-cierre-asados-esparcidos-una-superficie-c%C3%A1lida-393023802.jpg",
  "Miel": "https://media.istockphoto.com/id/1445503284/fr/photo/miel-isol%C3%A9-sur-le-fond-blanc.jpg?s=612x612&w=0&k=20&c=KLj2iYJ7w60Pln3XAs_yDyTZhc-nBIHxnGncnSp29Y4=",
  "Caramel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s",
  "Chocolat": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",

  // ─── BOISÉS, RÉSINES & ORIENTAUX ─────────────────────
  "Santal": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Cèdre": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Patchouli": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg",
  "Vétiver": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg",
  "Oud": "https://t3.ftcdn.net/jpg/01/40/25/80/360_F_140258049_BouSqnArYQtcl3PWCGMtEBG9spCkEDBF.jpg",
  "Encens": "https://img.freepik.com/photos-gratuite/porte-encens-resine-encens-au-charbon-bois-brulant-myrrhe-table-bois-rustique_181624-60529.jpg",
  "Cuir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoJIex_fU14J9ospvHmjeTTpG_-6Xjq5Gvw&s",
  "Tabac": "https://img.pikbest.com/ai/illus_our/20230427/798052d67767baa5e01d539c36e38154.jpg!w700wp",
  "Ambre": "https://media.istockphoto.com/id/1356213244/fr/photo/ambre-naturel-un-morceau-dambre-naturel-opaque-jaune-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=dDRryxccAfwaczmreErOsDimsz-6NAqnKaTARROe-AE=",
  "Mousse de chêne": "https://cdn.shopify.com/s/files/1/0681/1772/5436/files/parfum-bougies-mousse-chene.webp",

  // ─── LES 15 MOLÉCULES DE SYNTHÈSE EXPERTES ───────────
  "Ambroxan": "https://img.freepik.com/photos-premium/cristaux-blancs-fond-blanc_172420-123.jpg",
  "Iso E Super": "https://media.istockphoto.com/id/1155383401/fr/photo/texture-bois-abstrait.jpg", // Note boisée veloutée
  "Ethyl Maltol": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s", // Note barbe à papa
  "Cashmeran": "https://media.istockphoto.com/id/874320972/fr/photo/texture-bois-motif-grunge.jpg", // Bois de cachemire
  "Calone": "https://api-assets.wikiparfum.com/_resized/1fcvyygroqvmwm0yc00nfds7b6l0cwvwe88kd5tny77gu9urat7c42np3hum-w1000-q85.jpg", // Note marine/pastèque
  "Hédione": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg", // Jasmin aérien
  "Evernyl": "https://cdn.shopify.com/s/files/1/0681/1772/5436/files/parfum-bougies-mousse-chene.webp", // Mousse moderne (Baccarat)
  "Vetiveryl Acetate": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg", // Vétiver propre
  "Coumarine": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHvB5Lqd4ZkAgh__-H5QAlpQCVjcuotFtvw&s", // Fève tonka pure
  "Aldéhydes": "https://images.unsplash.com/photo-1551029108-662584449339?auto=format&fit=crop&w=300&q=80", // Note propre/savon
  "Galaxolide": "https://media.istockphoto.com/id/864520024/fr/photo/ambrette.jpg", // Musc blanc propre
  "Akigalawood": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg", // Patchouli poivré propre
  "Javanol": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80", // Santal crémeux puissant
  "Ethyl Vanillin": "https://myspicesland.com/wp-content/uploads/2025/09/VANILLE-POMPONA-NOIRE3-1-scaled.jpg", // Vanille intense
  "Norlimbanol": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80", // Bois sec/ambré

  // ─── FRUITS & MARINS ─────────────────────────────────
  "Pomme": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Ananas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlGn3bDORTrIUISN5vcNEiEzkvwF_PizIAg&s",
  "Pêche": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwcwVGPVJlGvRQnS8pfJ4SmhEfOGBmy0OXQ&s",
  "Cassis": "https://thumbs.dreamstime.com/b/curry-noir-de-baies-avec-feuille-verte-fruits-frais-isol%C3%A9s-sur-fond-blanc-345087256.jpg",
  "Notes marines": "https://api-assets.wikiparfum.com/_resized/1fcvyygroqvmwm0yc00nfds7b6l0cwvwe88kd5tny77gu9urat7c42np3hum-w1000-q85.jpg",
  "Notes minérales": "https://media.istockphoto.com/id/1155383401/fr/photo/pierres-galets.jpg",
};

/**
 * Récupère l'image d'une note avec fallback intelligent.
 */
export function getNoteImage(name: string): string {
  if (!name) return DEFAULT_IMAGE;

  const normalizedName = name.toLowerCase().trim();
  const keys = Object.keys(NOTES_IMAGES);

  // 1. Recherche exacte (insensible à la casse)
  const exactMatch = keys.find(k => k.toLowerCase() === normalizedName);
  if (exactMatch) return NOTES_IMAGES[exactMatch];

  // 2. Recherche par mot-clé (ex: "Rose de Bulgarie" -> "Rose")
  const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
  const fallbackMatch = sortedKeys.find(k => {
    const keyLower = k.toLowerCase();
    return normalizedName.includes(keyLower) || keyLower.includes(normalizedName);
  });

  return fallbackMatch ? NOTES_IMAGES[fallbackMatch] : DEFAULT_IMAGE;
}

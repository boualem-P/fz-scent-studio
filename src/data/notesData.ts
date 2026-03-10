/**
 * NOTES_IMAGES — Bibliothèque exhaustive et optimisée.
 * Refonte totale avec intégration des sous-notes database et molécules de synthèse.
 */

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80";

export const NOTES_IMAGES: Record<string, string> = {
  // --- CITRUS / HESPÉRIDÉS -----------------------------
  "Bergamote": "https://www.grocerymart.com.my/202/bergamot-.jpg",
  "Citron": "https://media.istockphoto.com/id/1389128157/fr/photo/fruit-citronn%C3%A9-avec-feuille-isol%C3%A9e-citron-entier-et-demi-avec-des-feuilles-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ilhfen4bwWI5Xfp7A9EoxcEZ7jm_kjsTlI9eL-y-AzI=",
  "Orange": "https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg",
  "Mandarine": "https://media.istockphoto.com/id/504384796/fr/photo/tangerines-m%C3%BBrs-frais.jpg?s=612x612&w=0&k=20&c=h60UUnfVB6ik_cT1b8lW31nU9iynyuH72QflMCOGkVQ=",
  "Pamplemousse": "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=150&q=80",
  "Yuzu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW61VWxqrxj-d9wQPXbGGJG_2edgfXCMHQSw&s",
  "Verveine": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvasS84L8Lyw68KeCL_uUnrwj_hDpWCmDdWw&s",
  "Néroli": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzGZjJd83Ma1vEGSYekxmUoPQb064i2VXuQ&s",
  "Bigarade": "https://binette-et-jardin.ouest-france.fr/images/dossiers/2020-01/citrus-aurantium-181207.jpg",

  // --- FLORALS -----------------------------------------
  "Rose": "https://upload.wikimedia.org/wikipedia/commons/5/51/Small_Red_Rose.JPG",
  "Jasmin": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Tubéreuse": "https://www.biolandes.com/wp-content/uploads/photo-produit-F2960.jpg",
  "Ylang-Ylang": "https://t4.ftcdn.net/jpg/00/34/90/31/360_F_34903143_mTqdY4T9w6yykmq4Bx41jiTrpoUAgpPI.jpg",
  "Fleur d'Oranger": "https://lallanature.com/wp-content/uploads/2020/08/eau-de-fleur-doranger-1280x800.jpg",
  "Géranium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ev56SrgogQ_YfNi-0QlkLMYQrPJA1QUsrw&s",
  "Pivoine": "https://i.pinimg.com/736x/14/d6/cd/14d6cddd1fe5346d79d438e89cce0a39.jpg",
  "Iris": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe1jK73W4KnuqMk2PByMTyLZDfMuJsqhzUg&s",
  "Violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5SwkdSnYYli-D6Pxj1l55bYkTFv4LWaDZQ&s",
  "Mimosa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Lavande": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGB63vsr4DISXdsVRM8z4ZSgKdEW4SRJWkew&s",
  "Fleur de Tabac": "https://pensezsauvage.org/IMG/jpg/semences_de_tabac_aile_bio.jpg",
  "Héliotrope": "https://media.istockphoto.com/id/1743304873/fr/photo/fleurs-dh%C3%A9liotrope.jpg?s=612x612&w=0&k=20&c=65p2ASsuECr7-2yNei-ZB0lx5E_CCK-iO71vmPhDqyI=",

  // --- SPICES ------------------------------------------
  "Poivre": "https://thumbs.dreamstime.com/b/tas-frais%C3%A9-ou-moulu-de-poivre-noir-d-isolement-sur-le-fond-blanc-front-view-143209481.jpg",
  "Poivre Rose": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Gingembre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJtMdQmJ2JFlcmdsalxqNg7vzSS1DEj1XvA&s",
  "Cardamome": "https://media.istockphoto.com/id/1331297760/fr/photo/gousses-de-cardamome-et-graines-isol%C3%A9es-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=M9pEbeZLkCjCCa96ILlaRJPSTR4v2Xf9_6td4Wmr71M=",
  "Cannelle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlj2mRYrtQpL1hAiiIHEVKSoXJEFJGUWb1-g&s",
  "Clou de Girofle": "https://www.epices.com/img/cms/clou-de-girofle-dents.jpg",
  "Muscade": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNdJLp6eo1mzDioLyw0Vzyzf8RBkXkBp5aQ&s",
  "Safran": "https://pommedambre.com/app/uploads/2021/08/safran-moulu_13320678-1-scaled.jpeg",
  "Baies de Genièvre": "https://thumbs.dreamstime.com/b/baies-de-gen%C3%A9vrier-d-isolement-56630956.jpg",
  "Carvi": "https://png.pngtree.com/thumb_back/fh260/background/20240614/pngtree-cumin-seeds-pile-of-cumin-seeds-or-caraway-isolated-on-white-image_15754366.jpg",

  // --- AROMATICS ---------------------------------------
  "Menthe": "https://media.istockphoto.com/id/935393534/fr/photo/feuilles-de-menthe-fra%C3%AEche-isol%C3%A9s-sur-fond-blanc-menthe-menthe-poivr%C3%A9e-bouchent-n.jpg?s=612x612&w=0&k=20&c=faMcrD1M5Wp-wkBbjA9doe6X9BvzSfj1NluS7xN8Lfk=",
  "Basilic": "https://img.freepik.com/photos-gratuite/feuilles-vertes-fraiches-basilic-nom-latin-ocimum-basilicum_181624-40506.jpg?semt=ais_hybrid&w=740&q=80",
  "Romarin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Thym": "https://media.istockphoto.com/id/611746162/fr/photo/thym-frais-d%C3%A9tails-de-la-plante.jpg?s=612x612&w=0&k=20&c=XrRWpf-rCEhl4hzXPHv9IgQuf0N-J1snuLjZuGiGgS8=",

  // --- WOODS -------------------------------------------
  "Santal": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Cèdre": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Patchouli": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg",
  "Vétiver": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg",
  "Oud": "https://t3.ftcdn.net/jpg/01/40/25/80/360_F_140258049_BouSqnArYQtcl3PWCGMtEBG9spCkEDBF.jpg",
  "Gaïac": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyuJJ90i8osSX5S2tLiDacmsd1wM5iu0J3Q&s",
  "Bouleau": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUmLWLFbrebY-pMBUd7qf5iRgIe8TTjy6xQ&s",
  "Bois de cachemire": "https://media.istockphoto.com/id/874320972/fr/photo/texture-bois-motif-grunge.jpg?s=612x612&w=0&k=20&c=HHhWpzkI37AJbEiSXwgUQiVp8pTBm3C98Njl-ff-C4M=",

  // --- AMBER & RESINS ----------------------------------
  "Ambre": "https://media.istockphoto.com/id/1356213244/fr/photo/ambre-naturel-un-morceau-dambre-naturel-opaque-jaune-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=dDRryxccAfwaczmreErOsDimsz-6NAqnKaTARROe-AE=",
  "Encens": "https://img.freepik.com/photos-gratuite/porte-encens-resine-encens-au-charbon-bois-brulant-myrrhe-table-bois-rustique_181624-60529.jpg",
  "Myrrhe": "https://media.istockphoto.com/id/1409930753/fr/photo/r%C3%A9sine-de-myrrhe-isol%C3%A9e-sur-fond-blanc-pile-de-commiphora-myrrha-naturel-opoponax-de-myrrhe.jpg?s=612x612&w=0&k=20&c=aBq4IsCJTbKOp1_VG9wBgPd0BHSzbXgRHigW3SMYJYA=",
  "Benjoin": "https://media.istockphoto.com/id/596390248/fr/photo/loban-biologique.jpg?s=612x612&w=0&k=20&c=mCxUhbqCopoTYQrFVAM4wBgTCcD-tM3-Om0kPsIG4HQ=",
  "Labdanum": "https://t4.ftcdn.net/jpg/05/18/61/03/360_F_518610333_hdSPiHAQf3QEJXz0RRprSWdsmFi54Wa8.jpg",
  "Opoponax": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Styrax": "https://media.istockphoto.com/id/1328112394/fr/photo/fleur-blanche-du-storax-japonais.jpg?s=612x612&w=0&k=20&c=Sl8-3Cj9m8vP0hPzVq-Af_VBO0KCjKPaK2sVT6s8M58=",

  // --- GOURMAND ----------------------------------------
  "Vanille": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Tonka": "https://t4.ftcdn.net/jpg/17/54/89/81/360_F_1754898160_roXxgZqwXTnerzjHd50qqjwizlkHFVvx.jpg",
  "Caramel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s",
  "Chocolat": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",
  "Miel": "https://media.istockphoto.com/id/1445503284/fr/photo/miel-isol%C3%A9-sur-le-fond-blanc.jpg?s=612x612&w=0&k=20&c=KLj2iYJ7w60Pln3XAs_yDyTZhc-nBIHxnGncnSp29Y4=",
  "Café": "https://thumbs.dreamstime.com/b/granos-de-caf%C3%A9-tostados-en-fondo-r%C3%BAstico-texturado-fotograf%C3%ADa-alta-resoluci%C3%B3n-cierre-asados-esparcidos-una-superficie-c%C3%A1lida-393023802.jpg",
  "Cognac": "https://media.istockphoto.com/id/1155383401/fr/photo/verre-de-cognac.jpg",

  // --- FRUITS ------------------------------------------
  "Pomme": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Poire": "https://media.istockphoto.com/id/1299073137/fr/photo/poires-isol%C3%A9es-un-fruit-vert-et-demi-de-poire-avec-la-lame-sur-le-fond-blanc-tranche-de-poire.jpg?s=612x612&w=0&k=20&c=79UeSZyzkKAs9D5uVLSPFLLK1NnNiyS-5R9eFUYTPrA=",
  "Cassis": "https://thumbs.dreamstime.com/b/curry-noir-de-baies-avec-feuille-verte-fruits-frais-isol%C3%A9s-sur-fond-blanc-345087256.jpg",
  "Fraise": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGEdhbPH4Gulol5glAmc4m2wCNpC0-66ESg&s",
  "Framboise": "https://media.istockphoto.com/id/648967314/fr/photo/framboise-avec-feuilles-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ou-KHQxSEhrVS6CYNkrrz7bQcpclClikveOlG_4ilBI=",
  "Mangue": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIadzY6k35gyv_LM9D333pdWuNwiSsonvaQ&s",
  "Ananas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlGn3bDORTrIUISN5vcNEiEzkvwF_PizIAg&s",
  "Pêche": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwcwVGPVJlGvRQnS8pfJ4SmhEfOGBmy0OXQ&s",

  // --- MARINE / AQUATIC --------------------------------
  "Marine": "https://api-assets.wikiparfum.com/_resized/1fcvyygroqvmwm0yc00nfds7b6l0cwvwe88kd5tny77gu9urat7c42np3hum-w1000-q85.jpg",
  "Algues": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKBHTrGGG4Z4nYID8BT6d38m4w_gcipbuQQ&s",
  "Lotus": "https://img.freepik.com/photos-premium/belle-fleur-lotus-surface-etang_38535-73.jpg",
  "Calone": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=150&q=80",
  "Aldéhydes": "https://thumbs.dreamstime.com/b/usine-d-herbe-de-poissons-de-lizardtail-de-heartleaf-de-cordata-de-houttuynia-29944862.jpg",

  // --- MUSK & LEATHER ----------------------------------
  "Musc": "https://media.istockphoto.com/id/1389488308/fr/photo/grandes-fleurs-de-mauve-musqu%C3%A9e.jpg?s=612x612&w=0&k=20&c=YZVQ1v3Heq5HJ-yedH9lxGRlLIaiuMMRt5aOvGh_SQs=",
  "Ambroxan": "https://img.freepik.com/photos-premium/cristaux-blancs-fond-blanc_172420-123.jpg",
  "Cuir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoJIex_fU14J9ospvHmjeTTpG_-6Xjq5Gvw&s",
  "Tabac": "https://img.pikbest.com/ai/illus_our/20230427/798052d67767baa5e01d539c36e38154.jpg!w700wp",
  "Mousse de Chêne": "https://cdn.shopify.com/s/files/1/0681/1772/5436/files/parfum-bougies-mousse-chene.webp",
};

/**
 * Récupère l'image d'une note avec fallback intelligent.
 */
export function getNoteImage(name: string): string {
  if (!name) return DEFAULT_IMAGE;
  
  const normalizedName = name.toLowerCase().trim();
  const keys = Object.keys(NOTES_IMAGES);

  // 1. Recherche exacte
  const exactMatch = keys.find(k => k.toLowerCase() === normalizedName);
  if (exactMatch) return NOTES_IMAGES[exactMatch];

  // 2. Recherche par mot-clé (Fallback intelligent)
  // On trie les clés par longueur pour trouver le terme le plus précis en premier
  const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
  const fallbackMatch = sortedKeys.find(k => {
    const keyLower = k.toLowerCase();
    return normalizedName.includes(keyLower) || keyLower.includes(normalizedName);
  });

  return fallbackMatch ? NOTES_IMAGES[fallbackMatch] : DEFAULT_IMAGE;
}

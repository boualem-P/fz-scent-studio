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
  "Poivre": "https://thumbs.dreamstime.com/b/tas-frais%C3%A9-ou-moulu-de-poivre-noir-d-isolement-sur-le-fond-blanc-front-view-143209481.jpg",
  "Poivre Rose": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Poivre de Sichuan": "https://static.wixstatic.com/media/7c0cb6_5c38eb946e64411eb66f5c73a33415e3~mv2.jpg/v1/fill/w_560,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7c0cb6_5c38eb946e64411eb66f5c73a33415e3~mv2.jpg",
  "Gingembre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJtMdQmJ2JFlcmdsalxqNg7vzSS1DEj1XvA&s",
  "Cardamome": "https://media.istockphoto.com/id/1331297760/fr/photo/gousses-de-cardamome-et-graines-isol%C3%A9es-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=M9pEbeZLkCjCCa96ILlaRJPSTR4v2Xf9_6td4Wmr71M=",
  "Cannelle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlj2mRYrtQpL1hAiiIHEVKSoXJEFJGUWb1-g&s",
  "Clou de Girofle": "https://png.pngtree.com/png-vector/20201127/ourmid/pngtree-clove-png-image_2411283.jpg",
  "Muscade": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNdJLp6eo1mzDioLyw0Vzyzf8RBkXkBp5aQ&s",
  "Safran": "https://pommedambre.com/app/uploads/2021/08/safran-moulu_13320678-1-scaled.jpeg",
  "Baies de Genièvre": "https://thumbs.dreamstime.com/b/baies-de-gen%C3%A9vrier-d-isolement-56630956.jpg",
  "Épices": "https://www.mgc-prevention.fr/wp-content/uploads/2016/10/epices_592527149.jpg",

  // ─── AROMATICS ───────────────────────────────────────
  "Menthe": "https://media.istockphoto.com/id/935393534/fr/photo/feuilles-de-menthe-fra%C3%AEche-isol%C3%A9s-sur-fond-blanc-menthe-menthe-poivr%C3%A9e-bouchent-n.jpg?s=612x612&w=0&k=20&c=faMcrD1M5Wp-wkBbjA9doe6X9BvzSfj1NluS7xN8Lfk=",
  "Basilic": "https://img.freepik.com/photos-gratuite/feuilles-vertes-fraiches-basilic-nom-latin-ocimum-basilicum_181624-40506.jpg?semt=ais_hybrid&w=740&q=80",
  "Romarin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Thym": "https://media.istockphoto.com/id/611746162/fr/photo/thym-frais-d%C3%A9tails-de-la-plante.jpg?s=612x612&w=0&k=20&c=XrRWpf-rCEhl4hzXPHv9IgQuf0N-J1snuLjZuGiGgS8=",
  "Eucalyptus": "https://thumbs.dreamstime.com/b/branche-eucalyptus-avec-fleurs-isol%C3%A9es-sur-fond-blanc-327580608.jpg",
  "Sauge": "https://media.istockphoto.com/id/183812930/fr/photo/sauge.jpg?s=612x612&w=0&k=20&c=b4TTz_eshPG5GTXuROmeZb-w5-wrKVVvVe1HP-1m9AM=",

  // ─── WOODS ───────────────────────────────────────────
  "Santal": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80",
  "Cèdre": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Patchouli": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg",
  "Vétiver": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg",
  "Gaïac": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyuJJ90i8osSX5S2tLiDacmsd1wM5iu0J3Q&s",
  "Oud": "https://t3.ftcdn.net/jpg/01/40/25/80/360_F_140258049_BouSqnArYQtcl3PWCGMtEBG9spCkEDBF.jpg",
  "Bouleau": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUmLWLFbrebY-pMBUd7qf5iRgIe8TTjy6xQ&s",
  "Palissandre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1jFnnDDLFhyLppaTvHs-nLgjYFBLx6BA81A&s",

  // ─── AMBER & RESINS ──────────────────────────────────
  "Ambre": "https://media.istockphoto.com/id/1356213244/fr/photo/ambre-naturel-un-morceau-dambre-naturel-opaque-jaune-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=dDRryxccAfwaczmreErOsDimsz-6NAqnKaTARROe-AE=",
  "Ambre gris": "https://media.istockphoto.com/id/1199831926/photo/ambergris-ambre-gris-ambergrease-or-grey-amber-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=aC6yZ8GutEVAY8YWmB40xI8TL6S5QnQxWvQjyhaKpb0=",
  "Encens": "https://img.freepik.com/photos-gratuite/porte-encens-resine-encens-au-charbon-bois-brulant-myrrhe-table-bois-rustique_181624-60529.jpg",
  "Myrrhe": "https://media.istockphoto.com/id/1409930753/fr/photo/r%C3%A9sine-de-myrrhe-isol%C3%A9e-sur-fond-blanc-pile-de-commiphora-myrrha-naturel-opoponax-de-myrrhe.jpg?s=612x612&w=0&k=20&c=aBq4IsCJTbKOp1_VG9wBgPd0BHSzbXgRHigW3SMYJYA=",
  "Benjoin": "https://media.istockphoto.com/id/596390248/fr/photo/loban-biologique.jpg?s=612x612&w=0&k=20&c=mCxUhbqCopoTYQrFVAM4wBgTCcD-tM3-Om0kPsIG4HQ=",
  "Labdanum": "https://t4.ftcdn.net/jpg/05/18/61/03/360_F_518610333_hdSPiHAQf3QEJXz0RRprSWdsmFi54Wa8.jpg",

  // ─── GOURMAND ────────────────────────────────────────
  "Vanille": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Fève Tonka": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHvB5Lqd4ZkAgh__-H5QAlpQCVjcuotFtvw&s",
  "Tonka": "https://t4.ftcdn.net/jpg/17/54/89/81/360_F_1754898160_roXxgZqwXTnerzjHd50qqjwizlkHFVvx.jpg",
  "Caramel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s",
  "Chocolat": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",
  "Cacao": "https://i.pinimg.com/736x/da/cb/70/dacb70d73a663794edf34978af5294f0.jpg",
  "Praliné": "https://thumbs.dreamstime.com/b/d%C3%A9licieuse-pralin%C3%A9-au-chocolat-faite-de-et-vermicelles-432451243.jpg",
  "Miel": "https://media.istockphoto.com/id/1445503284/fr/photo/miel-isol%C3%A9-sur-le-fond-blanc.jpg?s=612x612&w=0&k=20&c=KLj2iYJ7w60Pln3XAs_yDyTZhc-nBIHxnGncnSp29Y4=",
  "Café": "https://thumbs.dreamstime.com/b/granos-de-caf%C3%A9-tostados-en-fondo-r%C3%BAstico-texturado-fotograf%C3%ADa-alta-resoluci%C3%B3n-cierre-asados-esparcidos-una-superficie-c%C3%A1lida-393023802.jpg",
  "Coumarine": "https://media.istockphoto.com/id/1217356340/photo/fragrant-tonka-beans-for-baking-and-cooking-on-dark-background.jpg?s=612x612&w=0&k=20&c=gD4lAi1xe9AP49GspdYKDDXVy9NN495Aa_61fxixp14=",

  // ─── FRUITS ──────────────────────────────────────────
  "Pomme": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Pomme verte": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD25wgHX69phUcoi1Tfl0sYy7EsjDIckYRoQ&s",
  "Poire": "https://media.istockphoto.com/id/1299073137/fr/photo/poires-isol%C3%A9es-un-fruit-vert-et-demi-de-poire-avec-la-lame-sur-le-fond-blanc-tranche-de-poire.jpg?s=612x612&w=0&k=20&c=79UeSZyzkKAs9D5uVLSPFLLK1NnNiyS-5R9eFUYTPrA=",
  "Bourgeon de Cassis": "https://thumbs.dreamstime.com/b/curry-noir-de-baies-avec-feuille-verte-fruits-frais-isol%C3%A9s-sur-fond-blanc-345087256.jpg",
  "Fraise": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGEdhbPH4Gulol5glAmc4m2wCNpC0-66ESg&s",
  "Framboise": "https://media.istockphoto.com/id/648967314/fr/photo/framboise-avec-feuilles-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ou-KHQxSEhrVS6CYNkrrz7bQcpclClikveOlG_4ilBI=",
  "Mûre": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=150&q=80",
  "Mangue": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIadzY6k35gyv_LM9D333pdWuNwiSsonvaQ&s",
  "Ananas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlGn3bDORTrIUISN5vcNEiEzkvwF_PizIAg&s",
  "Pêche": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwcwVGPVJlGvRQnS8pfJ4SmhEfOGBmy0OXQ&s",
  "Abricot": "https://media.istockphoto.com/id/178782797/fr/photo/des-abricots-isol%C3%A9-sur-blanc.jpg?s=612x612&w=0&k=20&c=dFeVDM5x0i3oavli2t5Fsx6MwhFSrltg31l32ntUHCg=",

  // ─── MARINE / AQUATIC ────────────────────────────────
  "Iode": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjUpaMZHPVJZntJ-dxDBEcRQoC86LbQItIg&s",
  "Algues": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKBHTrGGG4Z4nYID8BT6d38m4w_gcipbuQQ&s",
  "Lotus": "https://img.freepik.com/photos-premium/belle-fleur-lotus-surface-etang_38535-73.jpg",
  "Concombre": "https://thumbs.dreamstime.com/b/blanc-de-concombre-8624699.jpg",
  "Calone": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=150&q=80",
  "Aldéhydes": "https://thumbs.dreamstime.com/b/usine-d-herbe-de-poissons-de-lizardtail-de-heartleaf-de-cordata-de-houttuynia-29944862.jpg",

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

/**
 * NOTES_IMAGES — Bibliothèque exhaustive et optimisée.
 * Refonte totale avec intégration des sous-notes database et molécules de synthèse.
 */

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80";

export const NOTES_IMAGES: Record<string, string> = {
  // --- CITRUS / HESPÉRIDÉS -----------------------------
  "Bergamote": "https://www.grocerymart.com.my/202/bergamot-.jpg",
  "Citron": "https://lepotagerdelili.fr/wp-content/uploads/2021/12/citron.jpg",
  "Orange": "https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg",
  "Mandarine": "https://media.istockphoto.com/id/504384796/fr/photo/tangerines-m%C3%BBrs-frais.jpg?s=612x612&w=0&k=20&c=h60UUnfVB6ik_cT1b8lW31nU9iynyuH72QflMCOGkVQ=",
  "Pamplemousse": "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=150&q=80",
  "Yuzu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW61VWxqrxj-d9wQPXbGGJG_2edgfXCMHQSw&s",
  "Verveine": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvasS84L8Lyw68KeCL_uUnrwj_hDpWCmDdWw&s",
  "Néroli": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzGZjJd83Ma1vEGSYekxmUoPQb064i2VXuQ&s",
  "Bigarade": "https://binette-et-jardin.ouest-france.fr/images/dossiers/2020-01/citrus-aurantium-181207.jpg",
  "Lime": "https://i5.walmartimages.com/seo/Fresh-Lime-Each_12314833-2e54-4739-94a2-7db45b63109d.16ff07e3c111df9be4158853c2e505ef.jpeg",
  "Mandarine sanguine": "https://luchyprimeurs.com/220-large_default/orange-sanguine.jpg",
  "Citron de Sicile": "https://d1q864mr06oufu.cloudfront.net/farmy-s3/public/spree/products/131529/large/Zitronen_Cedri_Zitronatzitrone-farmy-ch-01.JPG?1730471597",
  "Orange douce": "https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg",
  "Bergamote de Calabre": "https://blog.foodelita.it/wp-content/uploads/2021/05/bergamote.jpg",

  // --- FLORALS -----------------------------------------
  "Rose": "https://upload.wikimedia.org/wikipedia/commons/5/51/Small_Red_Rose.JPG",
  "Jasmin": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Jasmin Sambac": "https://palmiersetcompagnie.fr/wp-content/uploads/2024/04/MG_7363-Jasminum-sambac-Jasmin-Arabie.jpg",
  "Jasmin du Maroc": "https://dw5gv07eh08co.cloudfront.net/media/perfumes/thumb/Jasmin2_thumbnail.jpg",
  "Tubéreuse": "https://www.biolandes.com/wp-content/uploads/photo-produit-F2960.jpg",
  "Ylang-Ylang": "https://t4.ftcdn.net/jpg/00/34/90/31/360_F_34903143_mTqdY4T9w6yykmq4Bx41jiTrpoUAgpPI.jpg",
  "Fleur d'oranger": "https://lallanature.com/wp-content/uploads/2020/08/eau-de-fleur-doranger-1280x800.jpg",
  "Géranium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ev56SrgogQ_YfNi-0QlkLMYQrPJA1QUsrw&s",
  "Pivoine": "https://i.pinimg.com/736x/14/d6/cd/14d6cddd1fe5346d79d438e89cce0a39.jpg",
  "Iris": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe1jK73W4KnuqMk2PByMTyLZDfMuJsqhzUg&s",
  "Violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5SwkdSnYYli-D6Pxj1l55bYkTFv4LWaDZQ&s",
  "Mimosa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Lavande": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGB63vsr4DISXdsVRM8z4ZSgKdEW4SRJWkew&s",
  "Fleur de Tabac": "https://pensezsauvage.org/IMG/jpg/semences_de_tabac_aile_bio.jpg",
  "Héliotrope": "https://media.istockphoto.com/id/1743304873/fr/photo/fleurs-dh%C3%A9liotrope.jpg?s=612x612&w=0&k=20&c=65p2ASsuECr7-2yNei-ZB0lx5E_CCK-iO71vmPhDqyI=",
  "Freesia": "https://www.bonparfumeur.com/cdn/shop/articles/freesia-simple-rose-2_62433c3d-d7af-4da1-829e-04e656410f0b.jpg?v=1748246429",
  "Orchidée noire": "https://www.industries-cosmetiques.fr/wp-content/uploads/2016/11/capture98.jpg",
  "Muguet": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGhIvJb3X2LRj0A5ZvJx9e5FKmV5zPJJVeA&s",
  "Rose de Damas": "https://www.jardindupicvert.com/media/catalog/product/r/o/rosier-ancien-de-damas-rose-de-rescht-18783.jpg",
  "Rose de Bulgarie": "https://blog.visiondumonde.org/wp-content/uploads/2017/05/bulgarie-roses-couverture-2-864x520.jpg",
  "Laurier": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKZMvXOtke4wY3KTYB9fsxHuESvXHJ7xshA&s",
  "Figue": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tfbApizQc4oaqIqiAmlP0mJGDDcj6L3fjw&s",
  "Ciste": "https://media.ooreka.fr/public/image/plant/172/varietyImage/43iqyknkad2csco8wgcccsk8c-source-11402391.jpg",
  "Maté": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtwsymAQpRX8h3dvP-YVBx2qrZMGAVDbseYg&s",

  // --- SPICES ------------------------------------------
  "Poivre": "https://epecia.com/wp-content/uploads/2022/11/Poivre-noir-en-Grains-2-scaled.jpg",
  "Poivre Rose": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Poivre noir": "https://thumbs.dreamstime.com/b/tas-frais%C3%A9-ou-moulu-de-poivre-noir-d-isolement-sur-le-fond-blanc-front-view-143209481.jpg",
  "Poivre du Sichuan": "https://pommedambre.com/app/uploads/2021/05/poivre-de-sichuan-400.jpg",
  "Gingembre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJtMdQmJ2JFlcmdsalxqNg7vzSS1DEj1XvA&s",
  "Cardamome": "https://media.istockphoto.com/id/1331297760/fr/photo/gousses-de-cardamome-et-graines-isol%C3%A9es-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=M9pEbeZLkCjCCa96ILlaRJPSTR4v2Xf9_6td4Wmr71M=",
  "Cannelle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlj2mRYrtQpL1hAiiIHEVKSoXJEFJGUWb1-g&s",
  "Clou de Girofle": "https://www.epices.com/img/cms/clou-de-girofle-dents.jpg",
  "Muscade": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDV2X7krjYacBhRtTrEdSKLa7xNKAcEAukTQ&s",
  "Noix de muscade": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNdJLp6eo1mzDioLyw0Vzyzf8RBkXkBp5aQ&s",
  "Safran": "https://pommedambre.com/app/uploads/2021/08/safran-moulu_13320678-1-scaled.jpeg",
  "Baies de Genièvre": "https://thumbs.dreamstime.com/b/baies-de-gen%C3%A9vrier-d-isolement-56630956.jpg",
  "Carvi": "https://png.pngtree.com/thumb_back/fh260/background/20240614/pngtree-cumin-seeds-pile-of-cumin-seeds-or-caraway-isolated-on-white-image_15754366.jpg",
  "Paprika": "https://media.istockphoto.com/id/1128101263/fr/photo/poudre-de-paprika-rouge-isol%C3%A9e-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=eMaVAIVToF6MFnOT9BF0mWmvNXTlBqNNBiPqQnYqh2E=",
  "Cumin": "https://media.istockphoto.com/id/825243922/fr/photo/graines-de-cumin-isol%C3%A9es-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=1HHX9V_k8Z6T0bZjbdEWk3hJt6UwCn2UJPaBCmNMpj0=",

  // --- AROMATICS ---------------------------------------
  "Menthe": "https://media.istockphoto.com/id/935393534/fr/photo/feuilles-de-menthe-fra%C3%AEche-isol%C3%A9s-sur-fond-blanc-menthe-menthe-poivr%C3%A9e-bouchent-n.jpg?s=612x612&w=0&k=20&c=faMcrD1M5Wp-wkBbjA9doe6X9BvzSfj1NluS7xN8Lfk=",
  "Menthe poivrée": "https://www.dieti-natura.com/media/herbier/cache/b0c0919611ce43128a9a0d08c90f2b70/m/e/menthe-poivree.png",
  "Basilic": "https://img.freepik.com/photos-gratuite/feuilles-vertes-fraiches-basilic-nom-latin-ocimum-basilicum_181624-40506.jpg?semt=ais_hybrid&w=740&q=80",
  "Romarin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Thym": "https://media.istockphoto.com/id/611746162/fr/photo/thym-frais-d%C3%A9tails-de-la-plante.jpg?s=612x612&w=0&k=20&c=XrRWpf-rCEhl4hzXPHv9IgQuf0N-J1snuLjZuGiGgS8=",
  "Sauge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2o2hG7cJq8HhhMwT26MzFZo4swaKwEayM0w&s",
  "Armoise": "https://sf2.doctissimo.fr/wp-content/uploads/doctissimo/2024/06/armoise-47535086b920d60c-scaled.jpeg",
  "Petit-grain": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2F4LqLGTX6OVQtWsKQLzplvGPm1KXtrAmjg&s",

  // --- WOODS -------------------------------------------
  "Santal": "https://www.dieti-natura.com/media/herbier/cache/b0c0919611ce43128a9a0d08c90f2b70/b/a/badge-santal-blanc.png",
  "Cèdre": "https://img.freepik.com/photos-gratuite/gros-plan-aiguilles-pin-vert-flou_181624-9273.jpg?w=360",
  "Cèdre de Virginie": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdPneTy0H8wjOdCkS2VbE5LwtIYwRL9MYbg&s",
  "Cèdre de l'Atlas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvk8or0k-JxPbrdb55lap_S36CG_I7Fb4xDw&s",
  "Cèdre rouge": "https://m.media-amazon.com/images/I/61L5u4t67cL._AC_UF1000,1000_QL80_.jpg",
  "Patchouli": "https://www.maison-sidonie-champagne.fr/fichiers/browser/images/BLOG/Quest-ce-que-le-patchouli-/plante-patchouli.JPG",
  "Vétiver": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUV1NL_Rxap7iYXMMNZZF1McQEkOVwEyEbA&s",
  "Vétiver fumé": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg",
  "Oud": "https://t3.ftcdn.net/jpg/01/40/25/80/360_F_140258049_BouSqnArYQtcl3PWCGMtEBG9spCkEDBF.jpg",
  "Gaïac": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyuJJ90i8osSX5S2tLiDacmsd1wM5iu0J3Q&s",
  "Bouleau": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUmLWLFbrebY-pMBUd7qf5iRgIe8TTjy6xQ&s",
  "Bois de Cachemire": "https://media.istockphoto.com/id/874320972/fr/photo/texture-bois-motif-grunge.jpg?s=612x612&w=0&k=20&c=HHhWpzkI37AJbEiSXwgUQiVp8pTBm3C98Njl-ff-C4M=",
  "Papyrus": "https://png.pngtree.com/png-vector/20241114/ourmid/pngtree-old-paper-scroll-ancient-papyrus-isolated-on-transparent-background-png-image_14317742.png",
  "Foin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqk7EGBIgXdIDfl9O_6rMqJLkdGgveq0dkHw&s",
  "Silex": "https://www.olfastory.com/sites/default/files/styles/400x400/public/silex.jpg?itok=zagkecof",
  "Pélargonium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjnUIW1tDUtcNKki5mgZZ50uO-nGBgVG0B3Q&s",

  // --- AMBER & RESINS ----------------------------------
  "Ambre": "https://media.istockphoto.com/id/1356213244/fr/photo/ambre-naturel-un-morceau-dambre-naturel-opaque-jaune-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=dDRryxccAfwaczmreErOsDimsz-6NAqnKaTARROe-AE=",
  "Ambre gris": "https://baleinesendirect.org/wp-content/uploads/2024/08/vrai-ambre-gris.jpg",
  "Amberwood": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJWK4U300snE-J9SboK8nhg2P-Q0pokoyhA&s",
  "Encens": "https://img.freepik.com/photos-gratuite/porte-encens-resine-encens-au-charbon-bois-brulant-myrrhe-table-bois-rustique_181624-60529.jpg",
  "Oliban": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0hUqwO3qmhTCR3otTPBkYLVjvZNYSDoTDg&s",
  "Myrrhe": "https://media.istockphoto.com/id/1409930753/fr/photo/r%C3%A9sine-de-myrrhe-isol%C3%A9e-sur-fond-blanc-pile-de-commiphora-myrrha-naturel-opoponax-de-myrrhe.jpg?s=612x612&w=0&k=20&c=aBq4IsCJTbKOp1_VG9wBgPd0BHSzbXgRHigW3SMYJYA=",
  "Benjoin": "https://media.istockphoto.com/id/596390248/fr/photo/loban-biologique.jpg?s=612x612&w=0&k=20&c=mCxUhbqCopoTYQrFVAM4wBgTCcD-tM3-Om0kPsIG4HQ=",
  "Labdanum": "https://www.olfastory.com/sites/default/files/styles/400x400/public/labdanum.jpg?itok=bNzU6LMj",
  "Opoponax": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Styrax": "https://media.istockphoto.com/id/1328112394/fr/photo/fleur-blanche-du-storax-japonais.jpg?s=612x612&w=0&k=20&c=Sl8-3Cj9m8vP0hPzVq-Af_VBO0KCjKPaK2sVT6s8M58=",
  "Baume de Tolu": "https://www.olfastory.com/sites/default/files/styles/400x400/public/baume-tolu.jpg?itok=ODqpvpLd",
  "Résine de sapin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBkTA8RLYGWXQFXfGIpLQB1wQ_Jc_d8BwdDQ&s",
  "Ciste-Labdanum": "https://t4.ftcdn.net/jpg/05/18/61/03/360_F_518610333_hdSPiHAQf3QEJXz0RRprSWdsmFi54Wa8.jpg",

  // --- GOURMAND ----------------------------------------
  "Vanille": "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-white-vanilla-lily-and-three-vanilla-sticks-on-white-surface-image_2939306.jpg",
  "Vanille de Madagascar": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Vanille noire": "https://www.lecomptoirdespoivres.com/345-medium_default/vanille-noire-gourmet-non-fendue-tahitensis.jpg",
  "Tonka": "https://t4.ftcdn.net/jpg/04/92/84/15/360_F_492841519_FZHBpVybVJMUsNYyW7A7glnTCxsMKdQq.jpg",
  "Fève Tonka": "https://www.evasionsgourmandes.com/wp-content/uploads/2023/07/tonka.jpg",
  "Caramel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s",
  "Chocolat": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",
  "Chocolat mexicain": "https://mexique-voyages.com/wp-content/uploads/captura-de-pantalla-2023-11-18-a-las-111344-1280x800.png",
  "Cacao": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0QVfri3iGG2V-O5qXFqY_l-skFjfYdm6CQ&s",
  "Miel": "https://media.istockphoto.com/id/1445503284/fr/photo/miel-isol%C3%A9-sur-le-fond-blanc.jpg?s=612x612&w=0&k=20&c=KLj2iYJ7w60Pln3XAs_yDyTZhc-nBIHxnGncnSp29Y4=",
  "Café": "https://thumbs.dreamstime.com/b/granos-de-caf%C3%A9-tostados-en-fondo-r%C3%BAstico-texturado-fotograf%C3%ADa-alta-resoluci%C3%B3n-cierre-asados-esparcidos-una-superficie-c%C3%A1lida-393023802.jpg",
  "Cognac": "https://image.jimcdn.com/app/cms/image/transf/none/path/s1ef3dce6f026268a/backgroundarea/i6e331c83bd18352f/version/1499723507/image.jpg",
  "Bourbon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSNzDTMAyWf6sFbvoTjb55dUOIMfRF0mFOg&s",
  "Praliné": "https://www.hervecuisine.com/wp-content/uploads/2019/03/recette-praline%CC%81-maison-facile.jpg",
  "Coumarine": "https://t4.ftcdn.net/jpg/17/54/89/81/360_F_1754898160_roXxgZqwXTnerzjHd50qqjwizlkHFVvx.jpg",
  "Amande": "https://www.saveursetvie.fr/wp-content/uploads/2024/06/44bb2c3b-0776-4bd4-8e51-38e3b7862eeb-bienfaitsamandesseniors97f7dadf97.webp",
  "Amande amère": "https://www.laboetgato.fr/48520-large_default/amande-amere-500-g.jpg",
  "Réglisse": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlj2mRYrtQpL1hAiiIHEVKSoXJEFJGUWb1-g&s",

  // --- FRUITS ------------------------------------------
  "Pomme": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Pomme verte": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJA3sXB1DqfCZEMJFPymSEIXAoNeDQUbP5A&s",
  "Poire": "https://media.istockphoto.com/id/1299073137/fr/photo/poires-isol%C3%A9es-un-fruit-vert-et-demi-de-poire-avec-la-lame-sur-le-fond-blanc-tranche-de-poire.jpg?s=612x612&w=0&k=20&c=79UeSZyzkKAs9D5uVLSPFLLK1NnNiyS-5R9eFUYTPrA=",
  "Cassis": "https://thumbs.dreamstime.com/b/curry-noir-de-baies-avec-feuille-verte-fruits-frais-isol%C3%A9s-sur-fond-blanc-345087256.jpg",
  "Fraise": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGEdhbPH4Gulol5glAmc4m2wCNpC0-66ESg&s",
  "Framboise": "https://media.istockphoto.com/id/648967314/fr/photo/framboise-avec-feuilles-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ou-KHQxSEhrVS6CYNkrrz7bQcpclClikveOlG_4ilBI=",
  "Mangue": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIadzY6k35gyv_LM9D333pdWuNwiSsonvaQ&s",
  "Ananas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlGn3bDORTrIUISN5vcNEiEzkvwF_PizIAg&s",
  "Pêche": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwcwVGPVJlGvRQnS8pfJ4SmhEfOGBmy0OXQ&s",
  "Melon": "https://observatoire-des-aliments.fr/wp-content/uploads/2014/07/melon-copie.jpg",
  "Prune": "https://media.istockphoto.com/id/512307472/fr/photo/prunes.jpg?s=612x612&w=0&k=20&c=2eXNYHwqGhLhFEFRKmq_aGDV7PqgFrF9rBR_bQRMgGU=",
  "Mûre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvZJcXmR24Kj8Gz3VEzsvTSE-galTSNR7nQ&s",
  "Griotte": "https://www.vitabio.fr/img/modules/oh_ingredients/ingredients/16_picture.jpg",
  "Mirabelle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyvk1g3j-7hk8vPIGyAILF1xJuiA7JuHsSow&s",
  "Truffe noire": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwNuH8J4EwMdpxR1lilD3r-Spd-rDbkJzK5g&s",

  // --- MARINE / AQUATIC --------------------------------
  "Marine": "https://static.actu.fr/uploads/2026/01/f514ecff4af86f914ecff4af8dd14ev-1-960x612.jpg",
  "Notes marines": "https://medias.pourlascience.fr/api/v1/images/view/5d246010d286c24c0d17e855/wide_1300/image.jpg",
  "Algues": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKBHTrGGG4Z4nYID8BT6d38m4w_gcipbuQQ&s",
  "Lotus": "https://img.freepik.com/photos-premium/belle-fleur-lotus-surface-etang_38535-73.jpg",
  "Calone": "https://previews.123rf.com/images/miradrozdowski/miradrozdowski1209/miradrozdowski120900112/15119239-pieces-of-watermelon-and-cantaloupe-melon.jpg",
  "Aldéhydes": "https://thumbs.dreamstime.com/b/usine-d-herbe-de-poissons-de-lizardtail-de-heartleaf-de-cordata-de-houttuynia-29944862.jpg",

  // --- MUSK & LEATHER ----------------------------------
  "Musc": "https://media.istockphoto.com/id/1389488308/fr/photo/grandes-fleurs-de-mauve-musqu%C3%A9e.jpg?s=612x612&w=0&k=20&c=YZVQ1v3Heq5HJ-yedH9lxGRlLIaiuMMRt5aOvGh_SQs=",
  "Musc blanc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWXcH1sWreH_Df5QW77d32CQnU8TIPotZQA&s",
  "Ambroxan": "https://www.olfastory.com/sites/default/files/styles/400x400/public/ambroxan.jpg?itok=HMfqhe9H",
  "Ambrette": "https://matiere-premiere.com/cdn/shop/files/ambrette07webp_copie.webp?v=1747043888&width=640",
  "Cuir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoJIex_fU14J9ospvHmjeTTpG_-6Xjq5Gvw&s",
  "Tabac": "https://img.pikbest.com/ai/illus_our/20230427/798052d67767baa5e01d539c36e38154.jpg!w700wp",
  "Mousse de chêne": "https://cdn.shopify.com/s/files/1/0681/1772/5436/files/parfum-bougies-mousse-chene.webp",

  // --- DIVERS ------------------------------------------
  "Notes boisées": "https://images.unsplash.com/photo-1752028828275-9506afe8a2b4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
  "Notes fruitées": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Notes épicées": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Notes minérales": "https://www.olfastory.com/sites/default/files/styles/400x400/public/notes-minerales.jpg?itok=KtUG-nOt",
  "Sel": "https://media.istockphoto.com/id/470344279/fr/photo/sel-de-mer-dans-une-cuill%C3%A8re-en-bois.jpg?s=612x612&w=0&k=20&c=4B9nPTTzV2ZIE5diBFJQ6MXv_S5VkFEy5oYXcBQCkHo=",
  "Agrumes": "https://img.freepik.com/vecteurs-libre/composition-realiste-collection-agrumes_1284-15784.jpg?semt=ais_hybrid&w=740&q=80",
  "Épices": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Feuille de violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5SwkdSnYYli-D6Pxj1l55bYkTFv4LWaDZQ&s",
  "Fleur de Muscadier": "https://www.artsdelices.com/cdn/shop/products/macisavecsanoisdemuscade2.jpg?v=1647610293&width=1946",
  "Chêvrefeuille": "https://img-3.journaldesfemmes.fr/PZ6qri7g1gK65t3c2tyq6QxIFjs=/1500x/smart/2924ecf22dcd476abba1c69b0b704d20/ccmcms-jdf/10974349.jpg",
  "Aubépine": "https://www.bio-infos-sante.fr/wp-content/uploads/2022/08/aubepine.jpg",
  "Camomille": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajPSUapV-aycWOBqh8n4gDuKiNm3JscN-ZA&s",
  "Coriandre": "https://img-3.journaldesfemmes.fr/qS48r7dpmQALHwglrIZIGXJOXQI=/1500x/smart/36a73a71d6854e939058f80ad0a96ff1/ccmcms-jdf/39630015.jpg",
  "Graine de carotte": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYd6bBVBdlsvx6kIqowYo0_HzYrpYMpq61lw&s",
  "Élémi": "https://www.bonparfumeur.com/cdn/shop/articles/elemi-resine-sauvage-huile-essentielle_584d292b-9307-4454-9112-0d6dc4c10381.jpg?v=1748259801",
  "Résine d'élémi": "https://olfact.twic.pics/www.olfactivestudio.com/cdn/shop/articles/OS_ELEMI_3000x.jpg?v=1642210268&twic=v1/cover=820x820",
  "Iso E Super": "https://img.freepik.com/photos-premium/cristaux-blancs-fond-blanc_172420-123.jpg",
  "Bitter Orange": "https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg",
  "Patchouli indien": "https://i5.walmartimages.com/asr/55dc9976-926d-4cf5-aa5c-c50f908d481a.b4e1a25fb3ff4efc901f44be675dfea0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  "Feuille de patchouli": "https://www.docteurvalnet.com/wp-content/uploads/2023/04/patchouli_AdobeStock_238205357-1024x680.jpeg",
  "Jasmin d'eau": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Orchidée": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6yAYZ2T7P2K0dPRuIMfDHEIqpHKXxpRJqBg&s",
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
  const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
  const fallbackMatch = sortedKeys.find(k => {
    const keyLower = k.toLowerCase();
    return normalizedName.includes(keyLower) || keyLower.includes(normalizedName);
  });

  return fallbackMatch ? NOTES_IMAGES[fallbackMatch] : DEFAULT_IMAGE;
}

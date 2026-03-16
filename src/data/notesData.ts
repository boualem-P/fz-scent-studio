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
  "Lime": "https://i5.walmartimages.com/seo/Fresh-Lime-Each_12314833-2e54-4739-94a2-7db45b63109d.16ff07e3c111df9be4158853c2e505ef.jpeg",
  "Mandarine sanguine": "https://media.istockphoto.com/id/504384796/fr/photo/tangerines-m%C3%BBrs-frais.jpg?s=612x612&w=0&k=20&c=h60UUnfVB6ik_cT1b8lW31nU9iynyuH72QflMCOGkVQ=",
  "Citron de Sicile": "https://media.istockphoto.com/id/1389128157/fr/photo/fruit-citronn%C3%A9-avec-feuille-isol%C3%A9e-citron-entier-et-demi-avec-des-feuilles-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ilhfen4bwWI5Xfp7A9EoxcEZ7jm_kjsTlI9eL-y-AzI=",
  "Orange douce": "https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg",
  "Bergamote de Calabre": "https://www.grocerymart.com.my/202/bergamot-.jpg",

  // --- FLORALS -----------------------------------------
  "Rose": "https://upload.wikimedia.org/wikipedia/commons/5/51/Small_Red_Rose.JPG",
  "Jasmin": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Jasmin Sambac": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
  "Jasmin du Maroc": "https://media.istockphoto.com/id/862596276/fr/photo/fleurs-blanches-de-jasmin-sur-fond-isol%C3%A9-blanc.jpg?s=612x612&w=0&k=20&c=1WG34C782a96vaIdndA0I5-oqXxbzcr6SviOKesI5uw=",
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
  "Muscade": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNdJLp6eo1mzDioLyw0Vzyzf8RBkXkBp5aQ&s",
  "Noix de muscade": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNdJLp6eo1mzDioLyw0Vzyzf8RBkXkBp5aQ&s",
  "Safran": "https://pommedambre.com/app/uploads/2021/08/safran-moulu_13320678-1-scaled.jpeg",
  "Baies de Genièvre": "https://thumbs.dreamstime.com/b/baies-de-gen%C3%A9vrier-d-isolement-56630956.jpg",
  "Carvi": "https://png.pngtree.com/thumb_back/fh260/background/20240614/pngtree-cumin-seeds-pile-of-cumin-seeds-or-caraway-isolated-on-white-image_15754366.jpg",
  "Paprika": "https://media.istockphoto.com/id/1128101263/fr/photo/poudre-de-paprika-rouge-isol%C3%A9e-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=eMaVAIVToF6MFnOT9BF0mWmvNXTlBqNNBiPqQnYqh2E=",
  "Cumin": "https://media.istockphoto.com/id/825243922/fr/photo/graines-de-cumin-isol%C3%A9es-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=1HHX9V_k8Z6T0bZjbdEWk3hJt6UwCn2UJPaBCmNMpj0=",

  // --- AROMATICS ---------------------------------------
  "Menthe": "https://media.istockphoto.com/id/935393534/fr/photo/feuilles-de-menthe-fra%C3%AEche-isol%C3%A9s-sur-fond-blanc-menthe-menthe-poivr%C3%A9e-bouchent-n.jpg?s=612x612&w=0&k=20&c=faMcrD1M5Wp-wkBbjA9doe6X9BvzSfj1NluS7xN8Lfk=",
  "Menthe poivrée": "https://media.istockphoto.com/id/935393534/fr/photo/feuilles-de-menthe-fra%C3%AEche-isol%C3%A9s-sur-fond-blanc-menthe-menthe-poivr%C3%A9e-bouchent-n.jpg?s=612x612&w=0&k=20&c=faMcrD1M5Wp-wkBbjA9doe6X9BvzSfj1NluS7xN8Lfk=",
  "Basilic": "https://img.freepik.com/photos-gratuite/feuilles-vertes-fraiches-basilic-nom-latin-ocimum-basilicum_181624-40506.jpg?semt=ais_hybrid&w=740&q=80",
  "Romarin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Thym": "https://media.istockphoto.com/id/611746162/fr/photo/thym-frais-d%C3%A9tails-de-la-plante.jpg?s=612x612&w=0&k=20&c=XrRWpf-rCEhl4hzXPHv9IgQuf0N-J1snuLjZuGiGgS8=",
  "Sauge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2o2hG7cJq8HhhMwT26MzFZo4swaKwEayM0w&s",
  "Armoise": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Petit-grain": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzGZjJd83Ma1vEGSYekxmUoPQb064i2VXuQ&s",

  // --- WOODS -------------------------------------------
  "Santal": "https://www.dieti-natura.com/media/herbier/cache/b0c0919611ce43128a9a0d08c90f2b70/b/a/badge-santal-blanc.png",
  "Cèdre": "https://img.freepik.com/photos-gratuite/gros-plan-aiguilles-pin-vert-flou_181624-9273.jpg?w=360",
  "Cèdre de Virginie": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdPneTy0H8wjOdCkS2VbE5LwtIYwRL9MYbg&s",
  "Cèdre de l'Atlas": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Cèdre rouge": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Patchouli": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg",
  "Vétiver": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg",
  "Vétiver fumé": "https://t3.ftcdn.net/jpg/16/92/84/28/360_F_1692842888_Ry0pMEvILDRWOhvANhC78uXQfWccgc28.jpg",
  "Oud": "https://t3.ftcdn.net/jpg/01/40/25/80/360_F_140258049_BouSqnArYQtcl3PWCGMtEBG9spCkEDBF.jpg",
  "Gaïac": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyuJJ90i8osSX5S2tLiDacmsd1wM5iu0J3Q&s",
  "Bouleau": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUmLWLFbrebY-pMBUd7qf5iRgIe8TTjy6xQ&s",
  "Bois de Cachemire": "https://media.istockphoto.com/id/874320972/fr/photo/texture-bois-motif-grunge.jpg?s=612x612&w=0&k=20&c=HHhWpzkI37AJbEiSXwgUQiVp8pTBm3C98Njl-ff-C4M=",
  "Papyrus": "https://png.pngtree.com/png-vector/20241114/ourmid/pngtree-old-paper-scroll-ancient-papyrus-isolated-on-transparent-background-png-image_14317742.png",
  "Foin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqk7EGBIgXdIDfl9O_6rMqJLkdGgveq0dkHw&s",
  "Silex": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyuJJ90i8osSX5S2tLiDacmsd1wM5iu0J3Q&s",
  "Pélargonium": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ev56SrgogQ_YfNi-0QlkLMYQrPJA1QUsrw&s",

  // --- AMBER & RESINS ----------------------------------
  "Ambre": "https://media.istockphoto.com/id/1356213244/fr/photo/ambre-naturel-un-morceau-dambre-naturel-opaque-jaune-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=dDRryxccAfwaczmreErOsDimsz-6NAqnKaTARROe-AE=",
  "Ambre gris": "https://baleinesendirect.org/wp-content/uploads/2024/08/vrai-ambre-gris.jpg",
  "Amberwood": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJWK4U300snE-J9SboK8nhg2P-Q0pokoyhA&s",
  "Encens": "https://img.freepik.com/photos-gratuite/porte-encens-resine-encens-au-charbon-bois-brulant-myrrhe-table-bois-rustique_181624-60529.jpg",
  "Oliban": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0hUqwO3qmhTCR3otTPBkYLVjvZNYSDoTDg&s",
  "Myrrhe": "https://media.istockphoto.com/id/1409930753/fr/photo/r%C3%A9sine-de-myrrhe-isol%C3%A9e-sur-fond-blanc-pile-de-commiphora-myrrha-naturel-opoponax-de-myrrhe.jpg?s=612x612&w=0&k=20&c=aBq4IsCJTbKOp1_VG9wBgPd0BHSzbXgRHigW3SMYJYA=",
  "Benjoin": "https://media.istockphoto.com/id/596390248/fr/photo/loban-biologique.jpg?s=612x612&w=0&k=20&c=mCxUhbqCopoTYQrFVAM4wBgTCcD-tM3-Om0kPsIG4HQ=",
  "Labdanum": "https://t4.ftcdn.net/jpg/05/18/61/03/360_F_518610333_hdSPiHAQf3QEJXz0RRprSWdsmFi54Wa8.jpg",
  "Opoponax": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Styrax": "https://media.istockphoto.com/id/1328112394/fr/photo/fleur-blanche-du-storax-japonais.jpg?s=612x612&w=0&k=20&c=Sl8-3Cj9m8vP0hPzVq-Af_VBO0KCjKPaK2sVT6s8M58=",
  "Baume de Tolu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Résine de sapin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Ciste-Labdanum": "https://t4.ftcdn.net/jpg/05/18/61/03/360_F_518610333_hdSPiHAQf3QEJXz0RRprSWdsmFi54Wa8.jpg",

  // --- GOURMAND ----------------------------------------
  "Vanille": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Vanille de Madagascar": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Vanille noire": "https://media.istockphoto.com/id/1090972218/fr/photo/s%C3%A9cher-les-fruits-vanille-et-orchid%C3%A9e-vanille.jpg?s=612x612&w=0&k=20&c=ef1UsOrrByG41Fo8lHO0XIqOEkEDcfRfodFduAVwZZw=",
  "Tonka": "https://t4.ftcdn.net/jpg/04/92/84/15/360_F_492841519_FZHBpVybVJMUsNYyW7A7glnTCxsMKdQq.jpg",
  "Fève Tonka": "https://www.evasionsgourmandes.com/wp-content/uploads/2023/07/tonka.jpg",
  "Caramel": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s",
  "Chocolat": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",
  "Chocolat mexicain": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",
  "Cacao": "https://media.istockphoto.com/id/1400452697/fr/photo/barre-de-chocolat-noir-avec-f%C3%A8ves-de-cacao.jpg?s=612x612&w=0&k=20&c=MeDSWrVPCuJQeQtOkiLNIxhNAtp7mVjKNvVD95JcxgM=",
  "Miel": "https://media.istockphoto.com/id/1445503284/fr/photo/miel-isol%C3%A9-sur-le-fond-blanc.jpg?s=612x612&w=0&k=20&c=KLj2iYJ7w60Pln3XAs_yDyTZhc-nBIHxnGncnSp29Y4=",
  "Café": "https://thumbs.dreamstime.com/b/granos-de-caf%C3%A9-tostados-en-fondo-r%C3%BAstico-texturado-fotograf%C3%ADa-alta-resoluci%C3%B3n-cierre-asados-esparcidos-una-superficie-c%C3%A1lida-393023802.jpg",
  "Cognac": "https://image.jimcdn.com/app/cms/image/transf/none/path/s1ef3dce6f026268a/backgroundarea/i6e331c83bd18352f/version/1499723507/image.jpg",
  "Bourbon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeSNzDTMAyWf6sFbvoTjb55dUOIMfRF0mFOg&s",
  "Praliné": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WLP16T6JjklrvODAvgaa95R74oevMgMJMg&s",
  "Coumarine": "https://t4.ftcdn.net/jpg/17/54/89/81/360_F_1754898160_roXxgZqwXTnerzjHd50qqjwizlkHFVvx.jpg",
  "Amande": "https://www.saveursetvie.fr/wp-content/uploads/2024/06/44bb2c3b-0776-4bd4-8e51-38e3b7862eeb-bienfaitsamandesseniors97f7dadf97.webp",
  "Amande amère": "https://www.laboetgato.fr/48520-large_default/amande-amere-500-g.jpg",
  "Réglisse": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlj2mRYrtQpL1hAiiIHEVKSoXJEFJGUWb1-g&s",

  // --- FRUITS ------------------------------------------
  "Pomme": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Pomme verte": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Poire": "https://media.istockphoto.com/id/1299073137/fr/photo/poires-isol%C3%A9es-un-fruit-vert-et-demi-de-poire-avec-la-lame-sur-le-fond-blanc-tranche-de-poire.jpg?s=612x612&w=0&k=20&c=79UeSZyzkKAs9D5uVLSPFLLK1NnNiyS-5R9eFUYTPrA=",
  "Cassis": "https://thumbs.dreamstime.com/b/curry-noir-de-baies-avec-feuille-verte-fruits-frais-isol%C3%A9s-sur-fond-blanc-345087256.jpg",
  "Fraise": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGEdhbPH4Gulol5glAmc4m2wCNpC0-66ESg&s",
  "Framboise": "https://media.istockphoto.com/id/648967314/fr/photo/framboise-avec-feuilles-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Ou-KHQxSEhrVS6CYNkrrz7bQcpclClikveOlG_4ilBI=",
  "Mangue": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIadzY6k35gyv_LM9D333pdWuNwiSsonvaQ&s",
  "Ananas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlGn3bDORTrIUISN5vcNEiEzkvwF_PizIAg&s",
  "Pêche": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwcwVGPVJlGvRQnS8pfJ4SmhEfOGBmy0OXQ&s",
  "Melon": "https://observatoire-des-aliments.fr/wp-content/uploads/2014/07/melon-copie.jpg",
  "Prune": "https://media.istockphoto.com/id/512307472/fr/photo/prunes.jpg?s=612x612&w=0&k=20&c=2eXNYHwqGhLhFEFRKmq_aGDV7PqgFrF9rBR_bQRMgGU=",
  "Mûre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGEdhbPH4Gulol5glAmc4m2wCNpC0-66ESg&s",
  "Griotte": "https://media.istockphoto.com/id/512307472/fr/photo/prunes.jpg?s=612x612&w=0&k=20&c=2eXNYHwqGhLhFEFRKmq_aGDV7PqgFrF9rBR_bQRMgGU=",
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
  "Musc blanc": "https://media.istockphoto.com/id/1389488308/fr/photo/grandes-fleurs-de-mauve-musqu%C3%A9e.jpg?s=612x612&w=0&k=20&c=YZVQ1v3Heq5HJ-yedH9lxGRlLIaiuMMRt5aOvGh_SQs=",
  "Ambroxan": "https://www.olfastory.com/sites/default/files/styles/400x400/public/ambroxan.jpg?itok=HMfqhe9H",
  "Ambrette": "https://matiere-premiere.com/cdn/shop/files/ambrette07webp_copie.webp?v=1747043888&width=640",
  "Cuir": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdoJIex_fU14J9ospvHmjeTTpG_-6Xjq5Gvw&s",
  "Tabac": "https://img.pikbest.com/ai/illus_our/20230427/798052d67767baa5e01d539c36e38154.jpg!w700wp",
  "Mousse de chêne": "https://cdn.shopify.com/s/files/1/0681/1772/5436/files/parfum-bougies-mousse-chene.webp",

  // --- DIVERS ------------------------------------------
  "Notes boisées": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=150&q=80",
  "Notes fruitées": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlhJ9z_OYQIPCAKKd--_EpLf7EbkD4-vdyg&s",
  "Notes épicées": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Notes minérales": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyuJJ90i8osSX5S2tLiDacmsd1wM5iu0J3Q&s",
  "Sel": "https://media.istockphoto.com/id/470344279/fr/photo/sel-de-mer-dans-une-cuill%C3%A8re-en-bois.jpg?s=612x612&w=0&k=20&c=4B9nPTTzV2ZIE5diBFJQ6MXv_S5VkFEy5oYXcBQCkHo=",
  "Agrumes": "https://img.freepik.com/vecteurs-libre/composition-realiste-collection-agrumes_1284-15784.jpg?semt=ais_hybrid&w=740&q=80",
  "Épices": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy68QcnTdnE0gdP-PDGwPZNKArSN386GfYMA&s",
  "Feuille de violette": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5SwkdSnYYli-D6Pxj1l55bYkTFv4LWaDZQ&s",
  "Fleur de Muscadier": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Chêvrefeuille": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Aubépine": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Camomille": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeffXmqYV712w8PBTjmqY4JA6PhA5w53iBg&s",
  "Coriandre": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Graine de carotte": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8YzelrtQ5H88CRElbZdhawGJRHwS7hNRDQ&s",
  "Élémi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Résine d'élémi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMah0OIiKEXQItttBt4T3vNsNHwxA_m3WUQ&s",
  "Iso E Super": "https://img.freepik.com/photos-premium/cristaux-blancs-fond-blanc_172420-123.jpg",
  "Bitter Orange": "https://t4.ftcdn.net/jpg/00/61/19/53/360_F_61195341_rR4lMptEspj16GvOdmy0MaMznSRveh2M.jpg",
  "Patchouli indien": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg",
  "Feuille de patchouli": "https://t3.ftcdn.net/jpg/08/32/38/48/360_F_832384869_ZVhp8nPG0jSyBZAdQRvMP2aVVfXmxMD8.jpg",
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

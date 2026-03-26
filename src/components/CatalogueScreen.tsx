import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES, Perfume } from "@/data/database";
import { X, Search, Sparkles, Heart, Anchor, ArrowLeft } from "lucide-react";
import PerfumePage from "./PerfumePage";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { getNoteImage } from "@/data/notesData";
import { ACCORDS_LIBRARY } from "@/data/accords";
import { getAccordIdsForPerfume } from "@/data/parfumAccords";
import { useStock } from "@/data/useStock";
import { EpuiseOverlay } from "@/components/EpuiseOverlay";

interface CatalogueScreenProps {
  onMenu: () => void;
  availableNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  setInternalBackHandler?: (fn: (() => boolean) | null) => void;
  onHerbierChange?: (open: boolean) => void;
  userGender?: "homme" | "femme" | "unisexe";
}

// ── Fonction helper pour obtenir les labels des accords d'un parfum ──
function getPerfumeAccords(perfume: Perfume): string[] {
  const ids = getAccordIdsForPerfume(perfume.id);
  return ids
    .map(id => ACCORDS_LIBRARY[id]?.label)
    .filter(Boolean) as string[];
}

const PerfumeImage = ({ perfume }: { perfume: Perfume }) => {
  const { isAvailable } = useStock();
  const available = isAvailable(perfume.id);
  return (
    <div className="h-32 lg:h-36 flex items-center justify-center mb-3 relative group">
      <div className="w-20 h-28 rounded-sm bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 shadow-lg shadow-black/50 relative">
        {perfume.image ? (
          <img
            src={perfume.image}
            alt={perfume.name}
            className={`w-full h-full object-contain p-1 mix-blend-lighten transition-transform duration-700 group-hover:scale-110 ${!available ? "opacity-30" : ""}`}
          />
        ) : (
          <span className="font-display text-xl text-primary/40 tracking-widest uppercase">
            {perfume.name.substring(0, 2)}
          </span>
        )}
        <AnimatePresence>
          {!available && <EpuiseOverlay />}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-1 w-12 h-1 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-all" />
    </div>
  );
};

const BRAND_IMAGES: Record<string, string> = {
  "Dior":                      "https://spnews.com/downloads/6765/download/Dior_logo.png?cb=35a7196f26214e14e4fdac4b6d73ab3c",
  "Chanel":                    "https://www.shutterstock.com/image-vector/chanel-icon-logo-symbol-sign-600nw-2404629953.jpg",
  "YSL":                       "https://fimgs.net/mdimg/dizajneri/o.99.jpg",
  "Lancôme":                   "https://fimgs.net/mdimg/dizajneri/o.80.jpg",
  "Armani":                    "https://upload.wikimedia.org/wikipedia/commons/4/42/Giorgio_Armani_logo.jpg",
  "Hermès":                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ZcFq5Y-eh3L_kRtR4EL0gmaorA2NK8Krkg&s",
  "Versace":                   "https://fimgs.net/mdimg/dizajneri/o.97.jpg",
  "Creed":                     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNbn7GA8FGdCQ349e2nzzMSEe5hvgPzVZcg&s",
  "Le Labo":                   "https://fimgs.net/mdimg/dizajneri/o.403.jpg",
  "Tom Ford":                  "https://parisgallery.ae/cdn/shop/collections/TOM_FORD.jpg?v=1678697860",
  "Kilian Paris":              "https://framero.eu/image/cache/catalog/image/catalog/logo/kilian-paris-logo-600x315w.jpg",
  "Mancera":                   "https://fimgs.net/mdimg/dizajneri/o.1134.jpg",
  "Azzaro":                    "https://www.fragrantica.fr/mdimg/dizajneri/o.8.jpg",
  "Valentino":                 "https://fimgs.net/mdimg/dizajneri/o.100.jpg",
  "Dolce & Gabbana":           "https://fimgs.net/mdimg/dizajneri/o.56.jpg",
  "Prada":                     "https://www.icon-icon.com/wp-content/uploads/2018/06/prada_1247_l.jpg",
  "Jean Paul Gaultier":        "https://fimgs.net/mdimg/dizajneri/o.72.jpg",
  "Viktor&Rolf":               "https://priveperfumes.com/cdn/shop/collections/viktor-rolf-prive-perfumes-banner.webp?v=1743664405&width=1024",
  "Carolina Herrera":          "https://i.pinimg.com/564x/8b/7a/f9/8b7af96beeee9c6dcdc0f433a888d02c.jpg",
  "Guerlain":                  "https://www.icon-icon.com/wp-content/uploads/2018/06/logo-guerlain_9ce88303527f34ce3cb6ab0b6323cc9b68b9219e_0.jpg",
  "Parfums de Marly":          "https://media.licdn.com/dms/image/v2/D4E0BAQHf0rDex1LcXg/company-logo_200_200/B4EZmAbGTnKcAM-/0/1758796212353/parfums_de_marly_logo?e=2147483647&v=beta&t=MHpbviv2JD_4FJuxJQZXegtZe49fB71Ii1tl52g--x4",
  "Maison Francis Kurkdjian":  "https://cdn.salla.sa/YgEeo/9p7BXjv5NUHVvaxeQ7hOSbocgZhIVDTqTw49FpgJ.jpg",
  "Burberry":                  "https://perfumes.ec/cdn/shop/collections/Burberry.png?v=1713560150",
  "Acqua di Parma":            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7G1eC5Iy0FmM5gq63p9_SPXpOSe-Z62hzw&s",
  "Chloé":                     "https://i.pinimg.com/1200x/73/42/9f/73429f55db81d87f3210d42192448295.jpg",
  "Givenchy":                  "https://i.pinimg.com/736x/a6/13/00/a61300eeb04565d30b2c084e6d424fec.jpg",
  "Paco Rabanne":              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrdwJieDavm5qELxmGFwwRmsh2WpwWfNpQA&s",
};

const CatalogueScreen = ({ onMenu, availableNotes, setInternalBackHandler, onHerbierChange, userGender }: CatalogueScreenProps) => {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  const [isNotesMenuOpen, setIsNotesMenuOpen] = useState(false);
  const [noteSearchQuery, setNoteSearchQuery] = useState("");
  const [fromHerbier, setFromHerbier] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const openHerbier = () => {
    setIsNotesMenuOpen(true);
    onHerbierChange?.(true);
  };
  const closeHerbier = () => {
    setIsNotesMenuOpen(false);
    onHerbierChange?.(false);
  };

  const brands = useMemo(() =>
  [...new Set(PERFUMES.map(p => p.brand))].sort((a, b) => a.localeCompare(b)),
[]);

const filteredBrands = useMemo(() => {
  if (!brandSearchQuery) return brands;
  const q = brandSearchQuery.toLowerCase();
  // Marques qui matchent directement
  const directBrands = brands.filter(b => b.toLowerCase().includes(q));
  // Marques qui contiennent un parfum dont le nom matche
  const indirectBrands = brands.filter(b =>
    !directBrands.includes(b) &&
    PERFUMES.some(p => p.brand === b && p.name.toLowerCase().includes(q))
  );
  return [...directBrands, ...indirectBrands];
}, [brands, brandSearchQuery]);

  const filteredPerfumes = useMemo(() => {
    if (!selectedBrand) return [];
    const brandPerfumes = selectedBrand === "__ALL__"
      ? [...PERFUMES]
      : PERFUMES.filter(p => p.brand === selectedBrand);
    const sorted = brandPerfumes.sort((a, b) => a.name.localeCompare(b.name));
    if (!searchQuery) return sorted;
    const q = searchQuery.toLowerCase();
    return sorted.filter(p => {
      const allNotes = [...(p.topNotes || []), ...(p.heartNotes || []), ...(p.baseNotes || [])].map(n => n.toLowerCase());
      return p.name.toLowerCase().includes(q) || allNotes.some(n => n.includes(q));
    });
  }, [selectedBrand, searchQuery]);

  useEffect(() => {
    document.body.style.overflow = (selected || isNotesMenuOpen) ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selected, isNotesMenuOpen]);

  useEffect(() => {
    if (!setInternalBackHandler) return;
    setInternalBackHandler(() => {
      if (selected) { setSelected(null); return true; }
      if (isNotesMenuOpen) { closeHerbier(); return true; }
      if (selectedBrand) {
        setSelectedBrand(null);
        setSearchQuery("");
        setFromHerbier(false);
        return true;
      }
      return false;
    });
    return () => setInternalBackHandler(null);
  }, [setInternalBackHandler, selectedBrand, selected, isNotesMenuOpen]);

  const handleBackToHerbier = () => {
    setSearchQuery("");
    setFromHerbier(false);
    openHerbier();
  };

  const NoteSection = ({ title, notes, Icon, colorClass }: { title: string, notes: string[], Icon: any, colorClass: string }) => {
    const filteredNotes = notes.filter(n => n.toLowerCase().includes(noteSearchQuery.toLowerCase()));
    if (filteredNotes.length === 0 && noteSearchQuery) return null;
    return (
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8 border-b border-primary/10 pb-4">
          <div className={`p-3 rounded-full bg-black border border-primary/20 ${colorClass}`}><Icon size={24} /></div>
          <h3 className={`font-display text-2xl lg:text-3xl ${colorClass} tracking-[0.2em] uppercase italic`}>{title}</h3>
          <span className="ml-auto font-body text-[10px] text-primary/30 tracking-widest uppercase">{filteredNotes.length} Essences</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredNotes.map((note) => (
            <button key={note} onClick={() => {
              setSearchQuery(note);
              setFromHerbier(true);
              closeHerbier();
              if (!selectedBrand) {
                setSelectedBrand("__ALL__");
              }
            }}
              className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary/10 group-hover:border-primary/30 bg-black/40">
                <img src={getNoteImage(note)} alt={note} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=100")} />
              </div>
              <span className="text-[11px] text-primary/60 group-hover:text-primary uppercase tracking-[0.15em] truncate font-medium">{note}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-background relative p-6 lg:p-10 pb-40 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(43 72% 52% / 0.04) 0%, transparent 60%)" }} />

      <AnimatePresence mode="wait">

        {/* ═══════════ NIVEAU 1 — MAISONS ═══════════ */}
        {!selectedBrand && (
          <motion.div
            key="brands"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col relative z-20"
          >
            <div className="flex justify-end mb-4">
              <button onClick={openHerbier}
                className="group relative px-6 py-3 rounded-full bg-gradient-to-b from-amber-400/10 to-transparent border border-amber-500/30 text-amber-500 font-display text-[11px] tracking-[0.3em] uppercase hover:border-amber-500 transition-all overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles size={14} className="animate-pulse" /> Explorer l'Herbier
                </span>
                <div className="absolute inset-0 bg-amber-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-10">
              <motion.h2 variants={staggerItem} className="font-display text-4xl lg:text-5xl text-gold-gradient tracking-widest flex items-center justify-center gap-4 italic">
  Nos Maisons
</motion.h2>
<motion.div variants={staggerItem} className="flex items-center justify-center gap-4 mt-2">
  <span className="text-xs font-body text-primary/40 border border-primary/20 px-3 py-1 rounded-full">
    {brands.length} maisons
  </span>
  <span className="text-xs font-body text-primary/40 border border-primary/20 px-3 py-1 rounded-full">
    {PERFUMES.length} parfums
  </span>
</motion.div>
              <motion.div variants={staggerItem} className="gold-divider w-40 mx-auto mt-4" />
            </motion.div>

            <div className="relative w-full max-w-sm mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
              <input
                type="text"
                placeholder="Rechercher une maison..."
                value={brandSearchQuery}
                onChange={(e) => setBrandSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-primary/20 rounded-full py-3 pl-11 pr-10 text-sm text-primary outline-none focus:border-primary/60 backdrop-blur-xl transition-all"
              />
              {brandSearchQuery && (
                <button onClick={() => setBrandSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary">
                  <X size={14} />
                </button>
              )}
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show"
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
              {filteredBrands.map((brand) => {
                
                const count = PERFUMES.filter(p => p.brand === brand).length;
                  const brandImg = BRAND_IMAGES[brand];
                  return (
                    <motion.button
                      key={brand}
                      variants={staggerItem}
                      whileHover={{ scale: 1.02 }}
                      whileTap={springTap}
                      onClick={() => { setSelectedBrand(brand); setSearchQuery(""); setFromHerbier(false); }}
                      className="group h-40 w-full rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 flex flex-col items-end justify-end cursor-pointer transition-all duration-300 relative bg-zinc-900/60"
                    >
                      {brandImg && brandImg !== "URL_ICI" && (
                        <img
                          src={brandImg}
                          alt={brand}
                          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="relative z-10 w-full px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="block font-display text-amber-400 text-sm uppercase tracking-widest leading-relaxed">
                          {brand}
                        </span>
                        <span className="block text-[9px] text-primary/30 uppercase tracking-widest font-body">
                          {count} parfum{count > 1 ? "s" : ""}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              {filteredBrands.length === 0 && (
                <div className="col-span-full text-center py-20 opacity-30 uppercase text-[11px] tracking-[0.4em]">
                  Maison introuvable
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-20">
              <motion.button whileHover={springHover} whileTap={springTap} onClick={onMenu}
                className="px-12 py-4 font-display text-xs tracking-[0.4em] uppercase border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/50 transition-all gold-border-glow bg-black/20">
                Quitter le Catalogue
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════ NIVEAU 2 — PARFUMS ═══════════ */}
        {selectedBrand && (
          <motion.div
            key={`brand-${selectedBrand}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col relative z-20"
          >
            <AnimatePresence>
              {fromHerbier && searchQuery && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }} className="mb-4">
                  <button onClick={handleBackToHerbier} className="flex items-center gap-2 text-amber-500/70 hover:text-amber-400 transition-all group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-body">L'Herbier</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => { setSelectedBrand(null); setSearchQuery(""); setFromHerbier(false); }}
                className="flex items-center gap-2 text-primary/50 hover:text-primary transition-all group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-body">
                  {selectedBrand === "__ALL__" ? "Herbier" : "Maisons"}
                </span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="relative group w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                <input type="text" placeholder="Rechercher un parfum, une note..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setFromHerbier(false); }}
                  className="w-full bg-black/40 border border-primary/20 rounded-full py-3.5 pl-12 pr-12 text-sm text-primary outline-none focus:border-primary/60 backdrop-blur-xl transition-all shadow-2xl" />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(""); setFromHerbier(false); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"><X size={16} /></button>
                )}
              </div>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-16">
              <motion.h2 variants={staggerItem} className="font-display text-4xl lg:text-5xl text-gold-gradient tracking-widest flex items-center justify-center gap-4 italic">
                {fromHerbier && searchQuery ? (
                  <>
                    <span className="capitalize">{searchQuery}</span>
                    <span className="text-xs font-body text-amber-500/40 border border-amber-500/20 px-3 py-1 rounded-full not-italic">{filteredPerfumes.length}</span>
                  </>
                ) : (
                  <>
                    {selectedBrand === "__ALL__" ? "Toutes les Maisons" : selectedBrand}
                    <span className="text-xs font-body text-primary/30 border border-primary/20 px-3 py-1 rounded-full not-italic">{filteredPerfumes.length}</span>
                  </>
                )}
              </motion.h2>
              <motion.div variants={staggerItem} className="gold-divider w-40 mx-auto mt-4" />
              {fromHerbier && searchQuery && (
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="font-body text-[9px] text-amber-500/40 uppercase tracking-[0.5em] mt-3">
                  Parfums contenant cette essence
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show"
              className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto w-full">
              {filteredPerfumes.length > 0 ? (
                filteredPerfumes.map((perfume) => {
                  const accords = getPerfumeAccords(perfume);
                  return (
                    <motion.button key={perfume.id} variants={staggerItem} whileHover={springHover} whileTap={springTap}
                      onClick={() => setSelected(perfume)}
                      className="glass-card card-shimmer-effect p-5 flex flex-col items-center cursor-pointer group">

                      <PerfumeImage perfume={perfume} />

                      <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground mb-1">
                        {perfume.brand}
                      </p>

                      <h3 className="font-display text-[13px] text-primary tracking-wide text-center leading-tight h-8 flex items-center">
                        {perfume.name}
                      </h3>

                      <p className="text-[9px] text-muted-foreground/50 mt-2 uppercase tracking-tighter border-t border-white/5 pt-2 w-full text-center">
                        {perfume.concentration}
                      </p>

                      <div className="mt-3 flex flex-wrap justify-center gap-1">
                        {accords.slice(0, 3).map((acc) => (
                          <span
                            key={acc}
                            className="text-[8px] px-2 py-1 border border-amber-500/20 text-amber-500/60 rounded-full uppercase tracking-widest"
                          >
                            {acc}
                          </span>
                        ))}
                      </div>

                    </motion.button>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-32 opacity-30 uppercase text-[11px] tracking-[0.4em]">Sillage introuvable</div>
              )}
            </motion.div>

            {!selected && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-20">
                <motion.button whileHover={springHover} whileTap={springTap} onClick={onMenu}
                  className="px-12 py-4 font-display text-xs tracking-[0.4em] uppercase border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/50 transition-all gold-border-glow bg-black/20">
                  Quitter le Catalogue
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERBIER FULL-SCREEN */}
      <AnimatePresence>
        {isNotesMenuOpen && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[300] bg-[#050505] overflow-y-auto custom-scrollbar">
            <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% -20%, #d4af37 0%, transparent 50%)" }} />
            <div className="max-w-6xl mx-auto p-6 lg:p-16 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={16} />
                  <input type="text" placeholder="Chercher une essence..." value={noteSearchQuery}
                    onChange={(e) => setNoteSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-primary outline-none focus:border-amber-500/40 transition-all" />
                </div>
              </div>
              <div className="text-center mb-24">
                <h2 className="font-display text-5xl lg:text-7xl text-gold-gradient tracking-tighter mb-6 italic">L'Herbier Secret</h2>
                <p className="font-body text-[10px] text-primary/40 uppercase tracking-[0.5em]">Explorez les nuances de votre database</p>
                <p className="font-body text-[11px] text-amber-500/60 uppercase tracking-[0.4em] mt-3">
                  {availableNotes.top.length + availableNotes.heart.length + availableNotes.base.length} essences répertoriées
                </p>
                <div className="h-px w-48 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-8" />
              </div>
              <NoteSection title="Notes de Tête" notes={availableNotes.top} Icon={Sparkles} colorClass="text-amber-400" />
              <NoteSection title="Notes de Cœur" notes={availableNotes.heart} Icon={Heart} colorClass="text-amber-500" />
              <NoteSection title="Notes de Fond" notes={availableNotes.base} Icon={Anchor} colorClass="text-yellow-600" />
              <div className="py-20 text-center">
                <button onClick={closeHerbier}
                  className="px-10 py-4 border border-white/10 text-[10px] text-primary/30 hover:text-primary uppercase tracking-[0.3em] transition-all rounded-full hover:bg-white/5">
                  Fermer l'herbier
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fiche Parfum */}
      <AnimatePresence>
        {selected && (
          <motion.div key={`perfume-${selected.id}`} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[500] bg-[#1D1E1F] overflow-y-auto">
            <PerfumePage perfume={selected} onClose={() => setSelected(null)} onSelectPerfume={setSelected} userGender={userGender} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueScreen;

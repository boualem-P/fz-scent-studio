import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES, Perfume } from "@/data/perfumes";
import { X, Search, Sparkles, Heart, Anchor, ArrowLeft } from "lucide-react";
import PerfumePage from "./PerfumePage";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { getNoteImage } from "@/data/notesData";

interface CatalogueScreenProps {
  onMenu: () => void;
  availableNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  setInternalBackHandler?: (fn: (() => boolean) | null) => void;
}

const PerfumeImage = ({ perfume }: { perfume: Perfume }) => (
  <div className="h-32 lg:h-36 flex items-center justify-center mb-3 relative group">
    <div className="w-20 h-28 rounded-sm bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 shadow-lg shadow-black/50">
      {perfume.image ? (
        <img 
          src={perfume.image} 
          alt={perfume.name}
          className="w-full h-full object-contain p-1 mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <span className="font-display text-xl text-primary/40 tracking-widest uppercase">
          {perfume.name.substring(0, 2)}
        </span>
      )}
    </div>
    <div className="absolute bottom-1 w-12 h-1 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-all" />
  </div>
);

const CatalogueScreen = ({ onMenu, availableNotes, setInternalBackHandler }: CatalogueScreenProps) => {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotesMenuOpen, setIsNotesMenuOpen] = useState(false);
  const [noteSearchQuery, setNoteSearchQuery] = useState("");
  const [fromHerbier, setFromHerbier] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Marques uniques triées
  const brands = useMemo(() => 
    [...new Set(PERFUMES.map(p => p.brand))].sort((a, b) => a.localeCompare(b)),
  []);

  // Parfums filtrés pour le niveau 2
  const filteredPerfumes = useMemo(() => {
    if (!selectedBrand) return [];
    const brandPerfumes = PERFUMES.filter(p => p.brand === selectedBrand);
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

  // Back handler: niveau 2 → niveau 1
  useEffect(() => {
    if (!setInternalBackHandler) return;
    setInternalBackHandler(() => {
      if (selected) {
        setSelected(null);
        return true;
      }
      if (isNotesMenuOpen) {
        setIsNotesMenuOpen(false);
        return true;
      }
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
    setIsNotesMenuOpen(true);
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
            <button key={note} onClick={() => { setSearchQuery(note); setFromHerbier(true); setIsNotesMenuOpen(false); }}
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
            {/* Titre */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-16">
              <motion.h2 variants={staggerItem} className="font-display text-4xl lg:text-5xl text-gold-gradient tracking-widest flex items-center justify-center gap-4 italic">
                Nos Maisons
                <span className="text-xs font-body text-primary/30 border border-primary/20 px-3 py-1 rounded-full not-italic">
                  {brands.length}
                </span>
              </motion.h2>
              <motion.div variants={staggerItem} className="gold-divider w-40 mx-auto mt-4" />
            </motion.div>

            {/* Grille des marques */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show"
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
              {brands.map((brand) => {
                const count = PERFUMES.filter(p => p.brand === brand).length;
                return (
                  <motion.button
                    key={brand}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={springTap}
                    onClick={() => { setSelectedBrand(brand); setSearchQuery(""); setFromHerbier(false); }}
                    className="h-40 w-full rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-amber-500/30 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300"
                  >
                    <span className="font-display text-amber-400 text-sm uppercase tracking-widest text-center px-4 leading-relaxed">
                      {brand}
                    </span>
                    <span className="text-[9px] text-primary/30 uppercase tracking-widest font-body">
                      {count} parfum{count > 1 ? "s" : ""}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Bouton Quitter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-20">
              <motion.button whileHover={springHover} whileTap={springTap} onClick={onMenu}
                className="px-12 py-4 font-display text-xs tracking-[0.4em] uppercase border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/50 transition-all gold-border-glow bg-black/20">
                Quitter le Catalogue
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════ NIVEAU 2 — PARFUMS D'UNE MAISON ═══════════ */}
        {selectedBrand && (
          <motion.div
            key={`brand-${selectedBrand}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col relative z-20"
          >
            {/* Bouton retour herbier */}
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

            {/* Retour + Titre marque */}
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => { setSelectedBrand(null); setSearchQuery(""); setFromHerbier(false); }}
                className="flex items-center gap-2 text-primary/50 hover:text-primary transition-all group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-body">Maisons</span>
              </button>
            </div>

            {/* Recherche + Herbier */}
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

            {/* Titre */}
            <div className="flex justify-end mb-4">
  <button onClick={() => setIsNotesMenuOpen(true)}
    className="group relative px-6 py-3 rounded-full bg-gradient-to-b from-amber-400/10 to-transparent border border-amber-500/30 text-amber-500 font-display text-[11px] tracking-[0.3em] uppercase hover:border-amber-500 transition-all overflow-hidden">
    <span className="relative z-10 flex items-center gap-3"><Sparkles size={14} className="animate-pulse" /> Explorer l'Herbier</span>
    <div className="absolute inset-0 bg-amber-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
  </button>
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
                    {selectedBrand}
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

            {/* Grille parfums */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show"
              className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto w-full">
              {filteredPerfumes.length > 0 ? (
                filteredPerfumes.map((perfume) => (
                  <motion.button key={perfume.id} variants={staggerItem} whileHover={springHover} whileTap={springTap}
                    onClick={() => setSelected(perfume)}
                    className="glass-card card-shimmer-effect p-5 flex flex-col items-center cursor-pointer group">
                    <PerfumeImage perfume={perfume} />
                    <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground mb-1">{perfume.brand}</p>
                    <h3 className="font-display text-[13px] text-primary tracking-wide text-center leading-tight h-8 flex items-center">{perfume.name}</h3>
                    <p className="text-[9px] text-muted-foreground/50 mt-2 uppercase tracking-tighter border-t border-white/5 pt-2 w-full text-center">{perfume.concentration}</p>
                  </motion.button>
                ))
              ) : (
                <div className="col-span-full text-center py-32 opacity-30 uppercase text-[11px] tracking-[0.4em]">Sillage introuvable</div>
              )}
            </motion.div>

            {/* Bouton Quitter */}
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
                <button onClick={() => setIsNotesMenuOpen(false)} className="flex items-center gap-3 text-primary/50 hover:text-primary transition-all group">
                  <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
                  <span className="text-xs uppercase tracking-[0.3em]">Retour</span>
                </button>
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
                <div className="h-px w-48 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto mt-8" />
              </div>
              <NoteSection title="Notes de Tête" notes={availableNotes.top} Icon={Sparkles} colorClass="text-amber-400" />
              <NoteSection title="Notes de Cœur" notes={availableNotes.heart} Icon={Heart} colorClass="text-amber-500" />
              <NoteSection title="Notes de Fond" notes={availableNotes.base} Icon={Anchor} colorClass="text-yellow-600" />
              <div className="py-20 text-center">
                <button onClick={() => setIsNotesMenuOpen(false)}
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
            <PerfumePage perfume={selected} onClose={() => setSelected(null)} onSelectPerfume={setSelected} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueScreen;

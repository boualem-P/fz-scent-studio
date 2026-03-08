import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES, Perfume } from "@/data/perfumes";
import { X, Search, Leaf } from "lucide-react";
import CatalogueModal from "./CatalogueModal";
import NotesDiagnostic from "./NotesDiagnostic";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface CatalogueScreenProps {
  onMenu: () => void;
}

// Nouveau composant Image au lieu des initiales
const PerfumeImage = ({ perfume }: { perfume: Perfume }) => {
  return (
    <div className="h-32 lg:h-36 flex items-center justify-center mb-3 relative group">
      <div className="w-20 h-28 rounded-sm bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 shadow-lg shadow-black/50">
        {perfume.image ? (
          <img 
            src={perfume.image} 
            alt={perfume.name}
            className="w-full h-full object-contain p-1 mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="font-display text-xl text-primary/40 tracking-widest uppercase">
            {perfume.name.substring(0, 2)}
          </span>
        )}
      </div>
      {/* Reflet doré sous le flacon */}
      <div className="absolute bottom-1 w-12 h-1 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-all" />
    </div>
  );
};

const CatalogueScreen = ({ onMenu }: CatalogueScreenProps) => {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const MAX_SEARCH_LENGTH = 100;
  const sanitizeSearchInput = (input: string): string => {
    return input.slice(0, MAX_SEARCH_LENGTH).trim();
  };

  const filteredPerfumes = PERFUMES.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    perfume.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selected]);

  if (showNotes) {
    return <NotesDiagnostic onBack={() => setShowNotes(false)} />;
  }

  return (
    <div className="min-h-screen w-screen flex flex-col bg-background overflow-y-auto relative p-6 lg:p-8 pb-40 gold-frame">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(43 72% 52% / 0.04) 0%, transparent 60%)" }} />

      {/* Barre de Recherche + Bouton Notes */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-30 flex items-center gap-2">
        <div className="relative group w-48 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(sanitizeSearchInput(e.target.value))}
            className="w-full bg-black/40 border border-primary/20 rounded-full py-2 pl-10 pr-10 text-xs font-body tracking-wider text-primary outline-none focus:border-primary/60 transition-all placeholder:text-primary/30"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowNotes(true)}
          className="h-9 px-3 flex items-center gap-1.5 rounded-full bg-black/40 border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/50 backdrop-blur-xl transition-all text-[10px] font-body tracking-widest uppercase"
        >
          <Leaf size={14} />
          Notes
        </button>
      </div>

      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-10 relative z-20 mt-12 lg:mt-0">
        <motion.h2 variants={staggerItem} className="font-display text-3xl lg:text-4xl text-gold-gradient tracking-wider flex items-center justify-center gap-3">
          Catalogue 
          <span className="text-sm font-body text-primary/40 border border-primary/20 px-2 py-0.5 rounded-md">
            {filteredPerfumes.length}
          </span>
        </motion.h2>
        <motion.div variants={staggerItem} className="gold-divider w-32 mx-auto mt-3" />
      </motion.div>

      {/* Grid */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto w-full relative z-20">
        {filteredPerfumes.length > 0 ? (
          filteredPerfumes.map((perfume) => (
            <motion.button
              key={perfume.id}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => setSelected(perfume)}
              className="glass-card card-shimmer-effect p-4 flex flex-col items-center cursor-pointer transition-all duration-300 group"
            >
              <PerfumeImage perfume={perfume} />
              <p className="text-[9px] font-body tracking-[0.2em] uppercase text-muted-foreground mb-0.5">
                {perfume.brand}
              </p>
              <h3 className="font-display text-sm text-primary tracking-wide text-center leading-tight">
                {perfume.name}
              </h3>
              <p className="text-[9px] text-muted-foreground/60 mt-1 tracking-wider">
                {perfume.concentration}
              </p>
            </motion.button>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-primary/40 font-body tracking-widest uppercase text-xs">Aucun parfum trouvé</p>
          </div>
        )}
      </motion.div>

      {/* Bouton retour menu */}
      {!selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-8 relative z-20">
          <motion.button whileHover={springHover} whileTap={springTap} onClick={onMenu} className="px-10 py-3 font-display text-sm tracking-[0.25em] uppercase border border-primary/40 text-primary hover:bg-primary/10 transition-colors gold-border-glow">
            Retour au Menu
          </motion.button>
        </motion.div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <CatalogueModal perfume={selected} onClose={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueScreen;

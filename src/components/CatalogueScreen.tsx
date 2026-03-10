import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES, Perfume } from "@/data/perfumes";
import { X, Search, Leaf, ChevronDown } from "lucide-react";
import CatalogueModal from "./CatalogueModal";
import NotesDiagnostic from "./NotesDiagnostic";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { getNoteImage } from "@/data/notesData";

interface CatalogueScreenProps {
  onMenu: () => void;
  // On s'attend maintenant à recevoir un objet structuré ou on le calcule ici
  availableNotes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

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
      <div className="absolute bottom-1 w-12 h-1 bg-primary/20 blur-md rounded-full group-hover:bg-primary/40 transition-all" />
    </div>
  );
};

const CatalogueScreen = ({ onMenu, availableNotes }: CatalogueScreenProps) => {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [isNotesMenuOpen, setIsNotesMenuOpen] = useState(false);

  // Calcul interne si la prop n'est pas fournie (Sécurité)
  const notesByCategory = useMemo(() => {
    if (availableNotes) return availableNotes;
    
    const categories = { top: new Set<string>(), heart: new Set<string>(), base: new Set<string>() };
    PERFUMES.forEach(p => {
      p.topNotesDetailed?.forEach(n => categories.top.add(n.name));
      p.heartNotesDetailed?.forEach(n => categories.heart.add(n.name));
      p.baseNotesDetailed?.forEach(n => categories.base.add(n.name));
    });
    
    return {
      top: Array.from(categories.top).sort(),
      heart: Array.from(categories.heart).sort(),
      base: Array.from(categories.base).sort()
    };
  }, [availableNotes]);

  const filteredPerfumes = PERFUMES.filter((perfume) => {
    const searchLower = searchQuery.toLowerCase();
    const allNotes = [
      ...(perfume.topNotes || []),
      ...(perfume.heartNotes || []),
      ...(perfume.baseNotes || [])
    ].map(n => n.toLowerCase());

    return (
      perfume.name.toLowerCase().includes(searchLower) ||
      perfume.brand.toLowerCase().includes(searchLower) ||
      allNotes.some(note => note.includes(searchLower))
    );
  });

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selected]);

  if (showNotes) return <NotesDiagnostic onBack={() => setShowNotes(false)} />;

  const NoteSection = ({ title, notes, colorClass }: { title: string, notes: string[], colorClass: string }) => (
    <div className="mb-8 last:mb-2">
      <h4 className={`font-display text-[11px] ${colorClass} tracking-[0.3em] uppercase mb-4 border-b border-white/5 pb-2 italic flex justify-between items-center`}>
        {title}
        <span className="text-[9px] opacity-50 not-italic">{notes.length}</span>
      </h4>
      <div className="grid grid-cols-1 gap-1.5">
        {notes.map((note) => (
          <button
            key={note}
            onClick={() => {
              setSearchQuery(note);
              setIsNotesMenuOpen(false);
            }}
            className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-primary/10 group-hover:border-primary/40 bg-black/40">
              <img 
                src={getNoteImage(note)} 
                alt={note} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=100")} 
              />
            </div>
            <span className="text-[10px] text-primary/60 group-hover:text-primary uppercase tracking-[0.15em] truncate">
              {note}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen flex flex-col bg-background overflow-y-auto relative p-6 lg:p-8 pb-40 gold-frame">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(43 72% 52% / 0.04) 0%, transparent 60%)" }} />

      {/* Barre de Recherche + Menu Notes */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-[100] flex items-center gap-2">
        <div className="relative group w-48 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-primary/20 rounded-full py-2 pl-10 pr-10 text-xs font-body tracking-wider text-primary outline-none focus:border-primary/60 transition-all placeholder:text-primary/30 shadow-2xl backdrop-blur-md"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsNotesMenuOpen(!isNotesMenuOpen)}
            className={`h-9 px-4 flex items-center gap-2 rounded-full bg-black/60 border ${isNotesMenuOpen ? 'border-primary' : 'border-primary/20'} text-primary transition-all text-[10px] font-body tracking-widest uppercase backdrop-blur-xl shadow-xl`}
          >
            <Leaf size={14} className={isNotesMenuOpen ? "text-primary" : "text-primary/60"} />
            <span>Notes</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${isNotesMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isNotesMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute top-12 left-0 w-72 max-h-[70vh] overflow-y-auto bg-black/95 border border-primary/20 rounded-2xl backdrop-blur-3xl p-5 custom-scrollbar shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[110]"
              >
                <NoteSection title="Notes de Tête" notes={notesByCategory.top} colorClass="text-amber-400" />
                <NoteSection title="Notes de Cœur" notes={notesByCategory.heart} colorClass="text-amber-500" />
                <NoteSection title="Notes de Fond" notes={notesByCategory.base} colorClass="text-yellow-600" />
                
                <button 
                  onClick={() => setShowNotes(true)}
                  className="w-full mt-4 py-3 border-t border-white/5 text-[9px] text-primary/40 hover:text-primary uppercase tracking-[0.2em] transition-colors"
                >
                  Diagnostic Olfactif
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-10 relative z-20 mt-24 lg:mt-0">
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
              className="glass-card card-shimmer-effect p-4 flex flex-col items-center cursor-pointer group"
            >
              <PerfumeImage perfume={perfume} />
              <p className="text-[9px] font-body tracking-[0.2em] uppercase text-muted-foreground mb-0.5">{perfume.brand}</p>
              <h3 className="font-display text-sm text-primary tracking-wide text-center leading-tight">{perfume.name}</h3>
              <p className="text-[9px] text-muted-foreground/60 mt-1 uppercase tracking-tighter">{perfume.concentration}</p>
            </motion.button>
          ))
        ) : (
          <div className="col-span-full text-center py-20 opacity-40 uppercase text-[10px] tracking-widest">Aucune essence correspondante</div>
        )}
      </motion.div>

      {/* Retour Menu */}
      {!selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-12 relative z-20">
          <motion.button whileHover={springHover} whileTap={springTap} onClick={onMenu} className="px-10 py-3 font-display text-xs tracking-[0.3em] uppercase border border-primary/30 text-primary hover:bg-primary/5 transition-all gold-border-glow">
            Retour au Menu
          </motion.button>
        </motion.div>
      )}

      {/* Modal Détail */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <CatalogueModal perfume={selected} onClose={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueScreen;

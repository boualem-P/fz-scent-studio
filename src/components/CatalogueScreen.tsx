import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES, Perfume } from "@/data/perfumes";
import { X, Search } from "lucide-react"; // Importation de Search pour l'icône
import CatalogueModal from "./CatalogueModal";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface CatalogueScreenProps {
  onMenu: () => void;
}

const PerfumeInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(/[\s'-]+/)
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="h-32 lg:h-36 flex items-center justify-center mb-3">
      <div className="w-20 h-28 rounded-sm bg-gradient-to-b from-primary/20 to-transparent border border-primary/30 flex items-center justify-center">
        <span className="font-display text-2xl text-primary/80 tracking-wider">
          {initials}
        </span>
      </div>
    </div>
  );
};

const CatalogueScreen = ({ onMenu }: CatalogueScreenProps) => {
  const [selected, setSelected] = useState<Perfume | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche

  // Logique de filtrage
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
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-background overflow-y-auto relative p-6 lg:p-8 pb-40 gold-frame">
      {/* Gradient subtil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(43 72% 52% / 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.02]">
        <div className="font-display text-[180px] text-primary tracking-widest whitespace-nowrap select-none rotate-[-15deg]">
          Fz Parfums
        </div>
      </div>

      {/* Barre de Recherche (Haut Gauche) */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-30 w-48 md:w-64">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-primary/20 rounded-full py-2 pl-10 pr-10 text-xs font-body tracking-wider text-primary outline-none focus:border-primary/60 transition-all placeholder:text-primary/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center mb-10 relative z-20 mt-12 lg:mt-0"
      >
        <motion.h2
          variants={staggerItem}
          className="font-display text-3xl lg:text-4xl text-gold-gradient tracking-wider flex items-center justify-center gap-3"
        >
          Catalogue 
          <span className="text-sm font-body text-primary/40 border border-primary/20 px-2 py-0.5 rounded-md">
            {filteredPerfumes.length}
          </span>
        </motion.h2>
        <motion.div
          variants={staggerItem}
          className="gold-divider w-32 mx-auto mt-3"
        />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto w-full relative z-20"
      >
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
              <PerfumeInitials name={perfume.name} />
              <p className="text-[9px] font-body tracking-[0.2em] uppercase text-muted-foreground mb-0.5">
                {perfume.brand}
              </p>
              <h3 className="font-display text-sm text-primary tracking-wide text-center leading-tight">
                {perfume.name}
              </h3>
              <p className="text-[9px] text-muted-foreground/60 mt-1 tracking-wider">
                {perfume.concentration} • {perfume.year}
              </p>
            </motion.button>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-primary/40 font-body tracking-widest uppercase text-xs">
              Aucun parfum trouvé pour "{searchQuery}"
            </p>
          </div>
        )}
      </motion.div>

      {/* Bouton retour menu */}
      {!selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 relative z-20"
        >
          <motion.button
            whileHover={springHover}
            whileTap={springTap}
            onClick={onMenu}
            className="px-10 py-3 font-display text-sm tracking-[0.25em] uppercase
              border border-primary/40 text-primary
              hover:bg-primary/10 hover:border-primary/60
              transition-colors duration-300 gold-border-glow"
          >
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
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
              className="fixed top-5 right-5 z-[9999] p-2.5 rounded-full bg-black/80 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-lg"
            >
              <X size={22} />
            </button>

            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <CatalogueModal
                perfume={selected}
                onClose={() => setSelected(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueScreen;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES, Perfume } from "@/data/perfumes";
import CatalogueModal from "./CatalogueModal";
import GoldenRain from "./GoldenRain";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface CatalogueScreenProps {
  onMenu: () => void;
}

const CatalogueScreen = ({ onMenu }: CatalogueScreenProps) => {
  const [selected, setSelected] = useState<Perfume | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col bg-obsidian-gradient overflow-hidden relative p-6 lg:p-8 gold-frame">
      <GoldenRain />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.02]">
        <div className="font-display text-[180px] text-primary tracking-widest whitespace-nowrap select-none rotate-[-15deg]">
          Fz Parfums
        </div>
      </div>

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center mb-6 relative z-20"
      >
        <motion.h2 variants={staggerItem} className="font-display text-3xl lg:text-4xl text-gold-gradient tracking-wider">
          Catalogue
        </motion.h2>
        <motion.div variants={staggerItem} className="gold-divider w-32 mx-auto mt-3" />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto w-full relative z-20 overflow-y-auto"
      >
        {PERFUMES.map((perfume) => (
          <motion.button
            key={perfume.id}
            variants={staggerItem}
            whileHover={springHover}
            whileTap={springTap}
            onClick={() => setSelected(perfume)}
            className="glass-card card-shimmer-effect p-4 flex flex-col items-center cursor-pointer transition-all duration-300 group"
          >
            <div className="h-32 lg:h-36 flex items-center justify-center mb-3">
              <img
                src={perfume.imageUrl}
                alt={perfume.name}
                className="max-h-full object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
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
        ))}
      </motion.div>

      {/* Menu button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-4 relative z-20"
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

      <AnimatePresence>
        {selected && (
          <CatalogueModal perfume={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueScreen;

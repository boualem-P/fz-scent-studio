import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import PerfumeModal from "./PerfumeModal";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
}

const ResultsScreen = ({ results, onMenu }: ResultsScreenProps) => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-obsidian-gradient overflow-hidden relative px-8 pattern-fz">
      {/* Subtle watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="font-display text-[200px] text-primary tracking-widest whitespace-nowrap select-none rotate-[-15deg]">
          Fz Parfums
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-4xl text-gold-gradient tracking-wider">
          Vos Recommandations
        </h2>
        <div className="gold-divider w-40 mx-auto mt-4" />
      </motion.div>

      <div className="flex gap-8 max-w-5xl w-full justify-center">
        {results.map((result, i) => (
          <motion.button
            key={result.perfume.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPerfume(result.perfume)}
            className="flex-1 max-w-[280px] bg-card border border-border/50 p-6 flex flex-col items-center
              hover:border-primary/50 transition-all duration-300 gold-border-glow group cursor-pointer"
          >
            {/* Match percentage */}
            <div className="mb-4 relative">
              <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center
                group-hover:border-primary/70 transition-colors">
                <span className="font-display text-lg text-primary">
                  {result.matchPercent}%
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="h-44 flex items-center justify-center mb-4">
              <img
                src={result.perfume.imageUrl}
                alt={result.perfume.name}
                className="max-h-full object-contain drop-shadow-lg
                  group-hover:drop-shadow-2xl transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>

            <p className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground mb-1">
              {result.perfume.brand}
            </p>
            <h3 className="font-display text-lg text-primary tracking-wide">
              {result.perfume.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">
              Découvrir →
            </p>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
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
        {selectedPerfume && (
          <PerfumeModal
            perfume={selectedPerfume}
            onClose={() => setSelectedPerfume(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsScreen;

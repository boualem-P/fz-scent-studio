import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import CatalogueModal from "./CatalogueModal";
import { X } from "lucide-react";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
}

const PercentCircle = ({ percent }: { percent: number }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="hsl(43 72% 52% / 0.15)"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          stroke="hsl(43, 72%, 52%)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute font-display text-lg text-primary"
      >
        {percent}%
      </motion.span>
    </div>
  );
};

const PerfumeInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(/[\s'-]+/)
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="h-44 flex items-center justify-center mb-4 mt-2">
      <div
        className="w-24 h-36 rounded-sm border border-primary/30 flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[0_0_15px_hsl(43_72%_52%_/_0.3)]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(43 80% 65% / 0.2), transparent 70%)",
        }}
      >
        <span className="font-display text-3xl text-primary/80 tracking-widest">
          {initials}
        </span>
      </div>
    </div>
  );
};

const ResultsScreen = ({ results, onMenu }: ResultsScreenProps) => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  // 🔒 Bloque le scroll du background quand la modal est ouverte
  useEffect(() => {
    if (selectedPerfume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPerfume]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-background overflow-y-auto relative px-6 pb-40 pattern-fz">

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(43 72% 52% / 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="font-display text-[200px] text-primary tracking-widest whitespace-nowrap select-none rotate-[-15deg]">
          Fz Parfums
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center mb-10 relative z-20 pt-12"
      >
        <motion.h2
          variants={staggerItem}
          className="font-display text-4xl text-gold-gradient tracking-wider"
        >
          Vos Recommandations
        </motion.h2>
        <motion.div
          variants={staggerItem}
          className="gold-divider w-40 mx-auto mt-4"
        />
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-8 max-w-5xl w-full justify-center relative z-20"
      >
        {results.map((result) => (
          <motion.button
            key={result.perfume.id}
            variants={staggerItem}
            whileHover={springHover}
            whileTap={springTap}
            onClick={() => setSelectedPerfume(result.perfume)}
            className="w-full sm:w-[280px] glass-card card-shimmer-effect p-6 flex flex-col items-center transition-all duration-300 group cursor-pointer"
          >
            <PercentCircle percent={result.matchPercent} />
            <PerfumeInitials name={result.perfume.name} />

            <p className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground mb-1">
              {result.perfume.brand}
            </p>
            <h3 className="font-display text-lg text-primary tracking-wide text-center">
              {result.perfume.name}
            </h3>
            <p className="text-[9px] text-muted-foreground/60 mt-1">
              {result.perfume.concentration} • {result.perfume.year}
            </p>
          </motion.button>
        ))}
      </motion.div>

      {/* Bouton retour menu */}
      {!selectedPerfume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 relative z-20"
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

      {/* MODAL FIX */}
      <AnimatePresence>
        {selectedPerfume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* Croix toujours visible */}
              <button
                onClick={() => setSelectedPerfume(null)}
                className="absolute top-4 right-4 z-[300] p-2 rounded-full bg-black/70 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-lg"
              >
                <X size={20} />
              </button>

              <CatalogueModal
                perfume={selectedPerfume}
                onClose={() => setSelectedPerfume(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsScreen;

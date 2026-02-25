import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import CatalogueModal from "./CatalogueModal";
import { X, ArrowRight, RotateCcw } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  springHover,
  springTap,
} from "@/lib/animations";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
  onCatalogue: () => void;
}

const PercentCircle = ({ percent }: { percent: number }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} stroke="hsl(43 72% 52% / 0.15)" strokeWidth="2" fill="none" />
        <motion.circle
          cx="40" cy="40" r={radius}
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
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute font-display text-lg text-primary">
        {percent}%
      </motion.span>
    </div>
  );
};

const PerfumeInitials = ({ name }: { name: string }) => {
  const initials = name.split(/[\s'-]+/).filter(w => w.length > 0 && w[0] === w[0].toUpperCase()).map(w => w[0]).slice(0, 2).join("");
  return (
    <div className="h-44 flex items-center justify-center mb-4 mt-2">
      <div className="w-24 h-36 rounded-sm border border-primary/30 flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[0_0_15px_hsl(43_72%_52%_/_0.3)]"
           style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(43 80% 65% / 0.2), transparent 70%)" }}>
        <span className="font-display text-3xl text-primary/80 tracking-widest">{initials}</span>
      </div>
    </div>
  );
};

const ResultsScreen = ({ results, onMenu, onCatalogue }: ResultsScreenProps) => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedPerfume ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedPerfume]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-background overflow-y-auto relative px-6 pb-32 pattern-fz">
      
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center relative z-20">
          <p className="text-muted-foreground text-lg mb-8">Aucun parfum ne correspond exactement à votre sélection.</p>
          <motion.button onClick={onMenu} whileHover={springHover} whileTap={springTap} className="px-8 py-3 font-display text-sm tracking-[0.25em] uppercase border border-primary/40 text-primary transition-all gold-border-glow">
            Recommencer l'expérience
          </motion.button>
        </div>
      ) : (
        <>
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center mb-10 relative z-20 pt-16">
            <motion.h2 variants={staggerItem} className="font-display text-4xl text-gold-gradient tracking-wider">Vos Recommandations</motion.h2>
            <motion.div variants={staggerItem} className="gold-divider w-40 mx-auto mt-4" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-wrap gap-8 max-w-5xl w-full justify-center relative z-20">
            {results.map((result) => (
              <motion.button
                key={result.perfume.id}
                variants={staggerItem}
                whileHover={springHover}
                whileTap={springTap}
                onClick={() => setSelectedPerfume(result.perfume)}
                className="w-full sm:w-[280px] glass-card card-shimmer-effect p-6 flex flex-col items-center group cursor-pointer"
              >
                <PercentCircle percent={result.matchPercent} />
                <PerfumeInitials name={result.perfume.name} />
                <p className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground mb-1">{result.perfume.brand}</p>
                <h3 className="font-display text-lg text-primary tracking-wide text-center">{result.perfume.name}</h3>
                <p className="text-[9px] text-muted-foreground/60 mt-1">{result.perfume.concentration} • {result.perfume.year}</p>
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-6 mt-20 relative z-20"
          >
            <button
              onClick={onCatalogue}
              className="group flex items-center gap-3 px-10 py-4 bg-primary text-black font-display text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#F2D06B] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Explorer le Catalogue Complet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onMenu}
              className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-[10px] uppercase tracking-[0.3em]"
            >
              <RotateCcw size={12} />
              Recommencer l'analyse
            </button>
          </motion.div>
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedPerfume && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Conteneur de la fiche avec la croix à l'intérieur */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl border border-primary/20 bg-[#050505]">
              
              {/* Bouton X déplacé à l'intérieur */}
              <button 
                onClick={() => setSelectedPerfume(null)} 
                className="absolute top-4 right-4 z-[10001] p-2 rounded-full bg-black/40 text-primary/80 hover:text-primary hover:bg-black/60 transition-all backdrop-blur-sm border border-primary/10"
              >
                <X size={20} />
              </button>

              {/* Contenu Scrollable de la fiche */}
              <div className="overflow-y-auto max-h-[90vh]">
                <CatalogueModal perfume={selectedPerfume} onClose={() => setSelectedPerfume(null)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsScreen;

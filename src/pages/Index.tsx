import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Library, Home } from "lucide-react";
import LandingScreen from "@/components/LandingScreen";
import PyramidScreen from "@/components/PyramidScreen";
import ResultsScreen from "@/components/ResultsScreen";
import CatalogueScreen from "@/components/CatalogueScreen";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import GoldenRain from "@/components/GoldenRain";
import PerfumePage from "@/components/PerfumePage"; 
import { Gender, NoteCategory, matchPerfumes, Perfume } from "@/data/perfumes";

type Screen = "landing" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const handleGender = (g: Gender) => {
    setGender(g);
    setScreen("pyramid");
  };

  const handleValidate = useCallback((top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
    const matches = matchPerfumes(gender, top, heart, base);
    setResults(matches);
    setScreen("analyzing");
    setTimeout(() => setScreen("results"), 4000);
  }, [gender]);

  const handleMenu = () => {
    setScreen("landing");
    setSelectedPerfume(null);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white font-sans">
      {/* 1. BACKGROUND (Toujours en fond) */}
      <div className="fixed inset-0 z-0">
        <GoldenRain />
      </div>

      {/* 2. UI LAYER : BOUTONS FIXES (C'est ici qu'on règle ton problème de visibilité) */}
      <nav className="fixed inset-0 pointer-events-none z-[999]">
        {/* Bouton Profil (Gauche) */}
        <div className="absolute top-6 left-6 pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-12 h-12 rounded-full border border-primary/40 bg-black/80 text-primary backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center hover:scale-110 transition-transform duration-300"
            onClick={() => console.log("Profil cliqué")}
          >
            <User size={22} />
          </motion.button>
        </div>

        {/* Boutons Navigation (Droite) */}
        <div className="absolute top-6 right-6 pointer-events-auto flex gap-4">
          <button
            onClick={handleMenu}
            className="w-12 h-12 rounded-full border border-primary/40 bg-black/80 text-primary backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]"
          >
            <Home size={20} />
          </button>
          <button
            onClick={() => { setScreen("catalogue"); setSelectedPerfume(null); }}
            className="w-12 h-12 rounded-full border border-primary/40 bg-black/80 text-primary backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]"
          >
            <Library size={20} />
          </button>
        </div>
      </nav>

      {/* 3. MAIN CONTENT LAYER (Z-10) */}
      <main className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {/* OVERLAY FICHE PRODUIT */}
          {selectedPerfume && (
            <motion.div 
              key="details-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[500] bg-black overflow-y-auto"
            >
              <PerfumePage onClose={() => setSelectedPerfume(null)} />
            </motion.div>
          )}

          {/* ÉCRANS PRINCIPAUX */}
          {!selectedPerfume && (
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              {screen === "landing" && <LandingScreen onSelectGender={handleGender} />}
              {screen === "pyramid" && <PyramidScreen onValidate={handleValidate} onMenu={handleMenu} />}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && (
                <ResultsScreen 
                  results={results} 
                  onMenu={handleMenu} 
                  onCatalogue={() => setScreen("catalogue")}
                  onSelectPerfume={(p) => setSelectedPerfume(p)} 
                />
              )}
              {screen === "catalogue" && (
                <CatalogueScreen 
                  onMenu={handleMenu} 
                  onSelectPerfume={(p) => setSelectedPerfume(p)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;

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
  const [showProfile, setShowProfile] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowProfile(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 1. FOND (Z-0) */}
      <div className="fixed inset-0 z-0">
        <GoldenRain />
      </div>

      {/* 2. NAVIGATION (Z-210 pour être TOUJOURS au dessus) */}
      <div className="fixed top-6 right-6 z-[210] flex items-center gap-3">
        <button
          onClick={handleMenu}
          className="w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Accueil"
        >
          <Home size={18} />
        </button>
        <button
          onClick={() => { setScreen("catalogue"); setSelectedPerfume(null); }}
          className="w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Catalogue"
        >
          <Library size={18} />
        </button>
      </div>

      {/* PROFIL (Z-210) */}
      <AnimatePresence>
        {showProfile && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-6 left-6 z-[210] w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <User size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* 3. FICHE PRODUIT (Z-200) */}
        <AnimatePresence>
          {selectedPerfume && (
            <motion.div 
              key="details-overlay"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-0 z-[200] bg-black overflow-y-auto"
            >
              <PerfumePage onClose={() => setSelectedPerfume(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. CONTENU PRINCIPAL (Z-10) */}
        <AnimatePresence mode="wait">
          {!selectedPerfume && (
            <motion.div
              key={screen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
      
      {/* Bouton de test discret en bas à gauche */}
      <button 
        onClick={() => setSelectedPerfume({ id: 1, name: "Test", brand: "Test" } as any)}
        className="fixed bottom-4 left-4 z-[210] text-[8px] text-primary/10 hover:text-primary transition-opacity"
      >
        DEBUG: OPEN DETAIL
      </button>
    </div>
  );
};

export default Index;

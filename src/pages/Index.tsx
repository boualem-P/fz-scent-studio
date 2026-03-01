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
    <div className="relative min-h-screen bg-black overflow-hidden text-white">
      
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        {/* GoldenRain s'affiche PARTOUT sauf sur l'écran landing */}
        {screen !== "landing" && <GoldenRain />}
      </div>

      {/* NAVIGATION UI (Z-999 pour être toujours cliquable) */}
      <nav className="fixed inset-0 pointer-events-none z-[999]">
        {/* Bouton Profil à gauche */}
        <div className="absolute top-6 left-6 pointer-events-auto">
          <AnimatePresence>
            {showProfile && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all shadow-lg"
              >
                <User size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Boutons Home/Catalogue à droite */}
        <div className="absolute top-6 right-6 pointer-events-auto flex gap-3">
          <button
            onClick={handleMenu}
            className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all shadow-lg"
          >
            <Home size={20} />
          </button>
          <button
            onClick={() => { setScreen("catalogue"); setSelectedPerfume(null); }}
            className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all shadow-lg"
          >
            <Library size={20} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full h-full">
        {/* OVERLAY FICHE PRODUIT */}
        <AnimatePresence>
          {selectedPerfume && (
            <motion.div 
              key="details-overlay"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-0 z-[500] bg-black overflow-y-auto"
            >
              <PerfumePage onClose={() => setSelectedPerfume(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ÉCRANS PRINCIPAUX */}
        <AnimatePresence mode="wait">
          {!selectedPerfume && (
            <motion.div
              key={screen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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

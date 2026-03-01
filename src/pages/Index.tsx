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
      <GoldenRain />

      {/* NAVIGATION */}
      <div className="fixed top-6 right-6 z-[100] flex items-center gap-3">
        {screen !== "landing" && (
          <button
            onClick={handleMenu}
            className="w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <Home size={18} />
          </button>
        )}
        {screen !== "results" && (
          <button
            onClick={() => setScreen("catalogue")}
            className="w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <Library size={18} />
          </button>
        )}
      </div>

      {/* PROFIL */}
      <AnimatePresence>
        {showProfile && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-6 left-6 w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            <User size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* FICHE PRODUIT EN OVERLAY */}
        <AnimatePresence>
          {selectedPerfume && (
            <motion.div 
              key="details-overlay"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-[200] bg-black overflow-y-auto"
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
            >
              {screen === "landing" && <LandingScreen onSelectGender={handleGender} />}
              {screen === "pyramid" && <PyramidScreen onValidate={handleValidate} onMenu={handleMenu} />}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && (
                <ResultsScreen 
                  results={results} 
                  onMenu={handleMenu} 
                  onCatalogue={() => setScreen("catalogue")} 
                />
              )}
              {screen === "catalogue" && <CatalogueScreen onMenu={handleMenu} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* BOUTON TEST TEMPORAIRE (À supprimer après validation) */}
      <button 
        onClick={() => setSelectedPerfume({ id: 1 } as any)}
        className="fixed bottom-4 left-4 z-[200] text-[8px] text-primary/20 opacity-20 hover:opacity-100"
      >
        Debug: Open Detail
      </button>
    </div>
  );
};

export default Index;

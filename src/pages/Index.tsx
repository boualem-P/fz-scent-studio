import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Library, Home, ArrowLeft } from "lucide-react";
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

  const handleBack = () => {
    if (selectedPerfume) {
      setSelectedPerfume(null);
      return;
    }
    switch (screen) {
      case "pyramid": setScreen("landing"); break;
      case "results": setScreen("pyramid"); break;
      case "catalogue": setScreen("landing"); break;
      default: break;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">
      
      {/* 1. FOND (PLUIE DORÉE) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      {/* 2. INTERFACE DE NAVIGATION (Z-1001 pour être au dessus de la page produit) */}
      <nav className="fixed inset-0 pointer-events-none z-[1001]">
        <div className="absolute top-6 left-6 flex flex-col gap-4 pointer-events-auto">
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

          <AnimatePresence>
            {(screen !== "landing" || selectedPerfume) && (
              <motion.button
                key="back-button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={handleBack}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute top-6 right-6 pointer-events-auto flex gap-3">
          <button onClick={handleMenu} className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all shadow-lg">
            <Home size={20} />
          </button>
          <button onClick={() => { setScreen("catalogue"); setSelectedPerfume(null); }} className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all shadow-lg">
            <Library size={20} />
          </button>
        </div>
      </nav>

      {/* 3. PAGES ET OVERLAYS */}
      <main className="relative z-10 w-full h-full">
        {/* PAGE PRODUIT (Z-1000) */}
        <AnimatePresence>
          {selectedPerfume && (
            <motion.div 
              key={selectedPerfume.id} 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-[1000] bg-[#1D1E1F]"
            >
              <PerfumePage 
                perfume={selectedPerfume} 
                onClose={() => setSelectedPerfume(null)} 
                onSelectPerfume={(p) => setSelectedPerfume(p)}
              />
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
              {screen === "results" && <ResultsScreen results={results} onMenu={handleMenu} onCatalogue={() => setScreen("catalogue")} onSelectPerfume={setSelectedPerfume} />}
              {screen === "catalogue" && <CatalogueScreen onMenu={handleMenu} onSelectPerfume={setSelectedPerfume} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Library, Home, ArrowLeft } from "lucide-react";
import LandingScreen from "@/components/LandingScreen";
import PyramidScreen from "@/components/PyramidScreen";
import ResultsScreen from "@/components/ResultsScreen";
import CatalogueScreen from "@/components/CatalogueScreen";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import GoldenRain from "@/components/GoldenRain";
import PerfumePage from "@/components/PerfumePage"; 
import { Gender, NoteCategory, matchPerfumes, Perfume } from "@/data/perfumes";

const Index = () => {
  const [screen, setScreen] = useState<"landing" | "pyramid" | "analyzing" | "results" | "catalogue">("landing");
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

  // FONCTION DE SÉCURITÉ POUR LOVABLE : Force le rafraîchissement
  const handleSelectPerfume = (perfume: Perfume | null) => {
    if (perfume) {
      // On met d'abord à null pour forcer un "unmount" si un parfum était déjà ouvert
      setSelectedPerfume(null);
      setTimeout(() => {
        setSelectedPerfume(perfume);
      }, 10);
    } else {
      setSelectedPerfume(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden w-full">
      
      {/* 1. FOND VISUEL */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      {/* 2. NAVIGATION FIXE (Z-200 pour être au-dessus de la fiche) */}
      <nav className="fixed top-6 left-6 right-6 flex justify-between items-center z-[200] pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          {(screen !== "landing" || selectedPerfume) && (
            <button 
              onClick={() => selectedPerfume ? handleSelectPerfume(null) : setScreen("landing")}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-2xl"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
        <div className="flex gap-3 pointer-events-auto">
          <button onClick={() => {setScreen("landing"); handleSelectPerfume(null);}} className="w-12 h-12 rounded-full border border-primary/30 bg-black/80 text-primary backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl">
            <Home size={20} />
          </button>
          <button onClick={() => {setScreen("catalogue"); handleSelectPerfume(null);}} className="w-12 h-12 rounded-full border border-primary/30 bg-black/80 text-primary backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl">
            <Library size={20} />
          </button>
        </div>
      </nav>

      {/* 3. ÉCRANS PRINCIPAUX */}
      <main className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {!selectedPerfume && (
            <motion.div 
              key={screen} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="h-full w-full"
            >
              {screen === "landing" && <LandingScreen onSelectGender={handleGender} />}
              {screen === "pyramid" && <PyramidScreen onValidate={handleValidate} onMenu={() => setScreen("landing")} />}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && <ResultsScreen results={results} onMenu={() => setScreen("landing")} onCatalogue={() => setScreen("catalogue")} onSelectPerfume={handleSelectPerfume} />}
              {screen === "catalogue" && <CatalogueScreen onMenu={() => setScreen("landing")} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. OVERLAY FICHE PARFUM (Z-150) */}
      <AnimatePresence>
        {selectedPerfume && (
          <motion.div 
            key={`perfume-${selectedPerfume.id}`} 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-[#1D1E1F] overflow-y-auto"
          >
            <PerfumePage 
              perfume={selectedPerfume} 
              onClose={() => handleSelectPerfume(null)} 
              onSelectPerfume={handleSelectPerfume} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

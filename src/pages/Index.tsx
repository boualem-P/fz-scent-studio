import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Library, ArrowLeft, User } from "lucide-react";
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

  // LOGIQUE DE RETOUR INTELLIGENT
  const handleBack = () => {
    if (selectedPerfume) {
      setSelectedPerfume(null); // Ferme la fiche parfum et revient à l'écran précédent
      return;
    }

    switch (screen) {
      case "pyramid":
        setScreen("landing");
        break;
      case "results":
        setScreen("pyramid"); // Retourne à la pyramide pour changer ses notes
        break;
      case "catalogue":
        setScreen("landing"); // Ou "results" si tu veux une logique plus complexe
        break;
      case "analyzing":
        setScreen("pyramid");
        break;
      default:
        setScreen("landing");
    }
  };

  const handleValidate = useCallback((top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
    const matches = matchPerfumes(gender, top, heart, base);
    setResults(matches);
    setScreen("analyzing");
    setTimeout(() => setScreen("results"), 4000);
  }, [gender]);

  const handleSelectPerfume = (perfume: Perfume | null) => {
    if (perfume) {
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
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      {/* NAVIGATION MISE À JOUR */}
      <nav className="fixed top-6 left-6 right-6 flex justify-between items-start z-[200] pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* BOUTON RETOUR INTELLIGENT */}
          {(screen !== "landing" || selectedPerfume) && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-2xl"
              title="Retour"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          <button 
            onClick={() => {setScreen("landing"); setSelectedPerfume(null);}} 
            className="w-12 h-12 rounded-full border border-amber-500/30 bg-black/80 text-amber-500 backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
          >
            <User size={20} />
          </button>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={() => {setScreen("catalogue"); setSelectedPerfume(null);}} 
            className="w-12 h-12 rounded-full border border-white/10 bg-black/80 text-white backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
          >
            <Library size={20} />
          </button>
        </div>
      </nav>

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
              {screen === "landing" && (
                <LandingScreen 
                  onSelectGender={handleGender} 
                  onCatalogue={() => setScreen("catalogue")}
                  onProfile={() => {}} 
                />
              )}
              {screen === "pyramid" && <PyramidScreen onValidate={handleValidate} onMenu={() => setScreen("landing")} />}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && <ResultsScreen results={results} onMenu={() => setScreen("landing")} onCatalogue={() => setScreen("catalogue")} onSelectPerfume={handleSelectPerfume} />}
              {screen === "catalogue" && <CatalogueScreen onMenu={() => setScreen("landing")} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

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
              onClose={() => setSelectedPerfume(null)} 
              onSelectPerfume={handleSelectPerfume} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

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

type ScreenType = "landing" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<ScreenType>("landing");
  const [history, setHistory] = useState<ScreenType[]>([]);
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  // FONCTION DE NAVIGATION ROBUSTE
  const navigateTo = (nextScreen: ScreenType) => {
    if (nextScreen === screen) return;
    
    // On ajoute l'écran actuel à l'historique AVANT de changer
    setHistory((prev) => [...prev, screen]);
    setScreen(nextScreen);
  };

  // RETOUR PRÉCIS
  const handleBack = () => {
    // Si une fiche parfum est ouverte, on la ferme simplement
    if (selectedPerfume) {
      setSelectedPerfume(null);
      return;
    }

    // Si on a un historique, on prend le dernier élément
    if (history.length > 0) {
      const newHistory = [...history];
      const previousScreen = newHistory.pop(); // Récupère et enlève le dernier écran
      
      if (previousScreen) {
        // Sécurité : si le précédent était l'analyse, on remonte encore d'un cran
        if (previousScreen === "analyzing") {
          const skipAnalysis = newHistory.pop();
          setScreen(skipAnalysis || "landing");
          setHistory(newHistory);
        } else {
          setScreen(previousScreen);
          setHistory(newHistory);
        }
      }
    } else {
      // Si l'historique est vide, retour forcé à l'accueil
      setScreen("landing");
    }
  };

  const handleGender = (g: Gender) => { 
    setGender(g); 
    navigateTo("pyramid"); 
  };

  const handleValidate = useCallback((top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
    const matches = matchPerfumes(gender, top, heart, base);
    setResults(matches);
    
    // On navigue vers l'analyse
    navigateTo("analyzing");
    
    // Après 4s, on remplace l'écran par les résultats
    // Note: On ne veut pas que "analyzing" pollue l'historique lors du retour
    setTimeout(() => {
      setScreen("results");
    }, 4000);
  }, [gender, screen]);

  const handleSelectPerfume = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden w-full">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      <nav className="fixed top-6 left-6 right-6 flex justify-between items-start z-[200] pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* BOUTON RETOUR : Affiché si historique présent ou fiche ouverte */}
          {(history.length > 0 || selectedPerfume) && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-2xl"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          <button 
            onClick={() => { setScreen("landing"); setHistory([]); setSelectedPerfume(null); }} 
            className="w-12 h-12 rounded-full border border-amber-500/30 bg-black/80 text-amber-500 backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
          >
            <User size={20} />
          </button>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={() => { navigateTo("catalogue"); setSelectedPerfume(null); }} 
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
                  onCatalogue={() => navigateTo("catalogue")}
                  onProfile={() => {}} 
                />
              )}
              {screen === "pyramid" && <PyramidScreen onValidate={handleValidate} onMenu={() => setScreen("landing")} />}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && <ResultsScreen results={results} onMenu={() => setScreen("landing")} onCatalogue={() => navigateTo("catalogue")} onSelectPerfume={handleSelectPerfume} />}
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

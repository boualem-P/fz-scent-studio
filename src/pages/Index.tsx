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

// Définition des écrans selon ta logique
type ScreenType = "landing" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<ScreenType>("landing");
  const [history, setHistory] = useState<ScreenType[]>([]);
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  // FONCTION DE NAVIGATION PARFAITE
  const navigateTo = (nextScreen: ScreenType) => {
    if (nextScreen === screen) return;
    // On ajoute l'écran actuel à l'historique
    setHistory((prev) => [...prev, screen]);
    setScreen(nextScreen);
  };

  // LOGIQUE DE RETOUR STRICTE (TON SCHÉMA)
  const handleBack = () => {
    // Si une fiche parfum (Vos accords) est ouverte, on la ferme
    if (selectedPerfume) {
      setSelectedPerfume(null);
      return;
    }

    // On récupère le dernier écran de l'historique
    if (history.length > 0) {
      const newHistory = [...history];
      const previousScreen = newHistory.pop(); // On retire le dernier
      
      if (previousScreen) {
        setScreen(previousScreen);
        setHistory(newHistory);
      }
    } else {
      // Sécurité si historique vide
      setScreen("landing");
    }
  };

  const handleGender = (g: Gender) => { 
    setGender(g); 
    navigateTo("pyramid"); // Étape 2 : Cartes / Choix notes
  };

  const handleValidate = useCallback((top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
    const matches = matchPerfumes(gender, top, heart, base);
    setResults(matches);
    
    // Étape 3 : Architecture / Analyzing
    navigateTo("analyzing");
    
    // Étape 4 : Univers / Results (Automatique après loader)
    setTimeout(() => {
      setScreen("results");
    }, 4000);
  }, [gender]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden w-full">
      
      {/* Fond visuel */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-6 left-6 right-6 flex justify-between items-start z-[200] pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* BOUTON RETOUR : Cache uniquement sur le menu principal sans fiche ouverte */}
          {(screen !== "landing" || selectedPerfume) && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-amber-500/20 hover:border-amber-500/40 transition-all shadow-2xl"
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
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.02 }} 
              transition={{ duration: 0.4 }}
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
              {screen === "results" && (
                <ResultsScreen 
                  results={results} 
                  onMenu={() => { setScreen("landing"); setHistory([]); }} 
                  onCatalogue={() => navigateTo("catalogue")} 
                  onSelectPerfume={(p) => setSelectedPerfume(p)} 
                />
              )}
              {screen === "catalogue" && <CatalogueScreen onMenu={() => { setScreen("landing"); setHistory([]); }} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FICHE PARFUM (Vos accords parfaits) */}
      <AnimatePresence>
        {selectedPerfume && (
          <motion.div 
            key={`perfume-${selectedPerfume.id}`} 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[150] bg-[#1D1E1F] overflow-y-auto"
          >
            <PerfumePage 
              perfume={selectedPerfume} 
              onClose={() => setSelectedPerfume(null)} 
              onSelectPerfume={(p) => setSelectedPerfume(p)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

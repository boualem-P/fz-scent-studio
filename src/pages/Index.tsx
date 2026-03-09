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
import LightWipeTransition from "@/components/LightWipeTransition";

type ScreenType = "landing" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<ScreenType>("landing");
  const [history, setHistory] = useState<ScreenType[]>([]);
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  // 1. FONCTION DE NAVIGATION (Enregistre l'étape actuelle avant de changer)
  const navigateTo = (nextScreen: ScreenType) => {
    if (nextScreen === screen) return;
    setHistory((prev) => [...prev, screen]);
    setScreen(nextScreen);
  };

  // 2. LOGIQUE DE RETOUR BLINDÉE (Respecte ta logique 4-3-2-1)
  const handleBack = () => {
    // Si la fiche "Vos accords parfaits" (PerfumePage) est ouverte, on la ferme d'abord
    if (selectedPerfume) {
      setSelectedPerfume(null);
      return;
    }

    // Sinon, on remonte l'historique des écrans
    if (history.length > 0) {
      const newHistory = [...history];
      const previousScreen = newHistory.pop();
      
      if (previousScreen) {
        // Sécurité : Si l'écran précédent était le chargement, on remonte encore d'un cran
        if (previousScreen === "analyzing") {
          const skipLoader = newHistory.pop();
          setScreen(skipLoader || "landing");
          setHistory(newHistory);
        } else {
          setScreen(previousScreen);
          setHistory(newHistory);
        }
      }
    } else {
      // Si aucun historique, retour forcé au menu
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
    
    navigateTo("analyzing");
    
    // Transition automatique vers "Univers Olfactif" (Results)
    setTimeout(() => {
      setScreen("results");
    }, 4000);
  }, [gender]);

  const handleSelectPerfume = (perfume: Perfume) => {
    // Note : On ne change pas l'écran, on ouvre juste l'overlay
    setSelectedPerfume(perfume);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden w-full">
      
      {/* Fond de particules (actif partout sauf sur le menu) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      {/* NAVIGATION GLOBALE */}
      <nav className="fixed top-6 left-6 right-6 flex justify-between items-start z-[200] pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* BOUTON RETOUR INTELLIGENT */}
          {(screen !== "landing" || selectedPerfume) && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-2xl"
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
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              {screen === "landing" && (
                <LandingScreen 
                  onSelectGender={handleGender} 
                  onCatalogue={() => navigateTo("catalogue")}
                  onProfile={() => {}} 
                />
              )}
              
              {screen === "pyramid" && (
                <PyramidScreen 
                  onValidate={handleValidate} 
                  onMenu={handleBack} 
                />
              )}

              {screen === "analyzing" && <AnalyzingLoader />}

              {screen === "results" && (
                <ResultsScreen 
                  results={results} 
                  onMenu={handleBack} 
                  onCatalogue={() => navigateTo("catalogue")} 
                  onSelectPerfume={handleSelectPerfume} 
                />
              )}

              {screen === "catalogue" && (
                <CatalogueScreen 
                  onMenu={handleBack} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* OVERLAY FICHE PARFUM (Point 4 de ta logique) */}
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
              onClose={handleBack} 
              onSelectPerfume={handleSelectPerfume} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

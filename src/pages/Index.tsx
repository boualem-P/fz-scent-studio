import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Library, ArrowLeft } from "lucide-react";
import BudgetScreen from "@/components/BudgetScreen";
import ProfileSheet from "@/components/ProfileSheet";
import LandingScreen from "@/components/LandingScreen";
import PyramidScreen from "@/components/PyramidScreen";
import ResultsScreen from "@/components/ResultsScreen";
import CatalogueScreen from "@/components/CatalogueScreen";
import { NOTES_IMAGES } from "@/data/notesData";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import GoldenRain from "@/components/GoldenRain";
import PerfumePage from "@/components/PerfumePage"; 
import { Gender, NoteCategory, matchPerfumes, Perfume, PERFUMES } from "@/data/perfumes"; 
import LightWipeTransition from "@/components/LightWipeTransition";

type ScreenType = "landing" | "budget" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<ScreenType>("landing");
  const [history, setHistory] = useState<ScreenType[]>([]);
  const [gender, setGender] = useState<Gender>("homme");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(3);
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [showWipe, setShowWipe] = useState(false);
  const [isHerbierOpen, setIsHerbierOpen] = useState(false);

  const pyramidInternalBackRef = useRef<(() => boolean) | null>(null);
  const catalogueInternalBackRef = useRef<(() => boolean) | null>(null);

  const availableNotesByCategory = useMemo(() => {
  const allNotes = Object.keys(NOTES_IMAGES).sort((a, b) => a.localeCompare(b));
  const third = Math.ceil(allNotes.length / 3);
  return {
    top:   allNotes.slice(0, third),
    heart: allNotes.slice(third, third * 2),
    base:  allNotes.slice(third * 2),
  };
}, []);

  useEffect(() => {
    if (selectedPerfume || screen === "analyzing") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedPerfume, screen]);

  const navigateTo = useCallback((nextScreen: ScreenType) => {
    if (nextScreen === screen) return;

    if (screen === "landing" && nextScreen === "pyramid") {
      setShowWipe(true);
      setTimeout(() => {
        setHistory((prev) => [...prev, screen]);
        setScreen(nextScreen);
      }, 500);
    } else {
      setHistory((prev) => [...prev, screen]);
      setScreen(nextScreen);
    }
  }, [screen]);

  const handleGoToLanding = useCallback(() => {
    setHistory([]);
    setSelectedPerfume(null);
    setScreen("landing");
  }, []);

  const handleBack = useCallback(() => {
    if (selectedPerfume) {
      setSelectedPerfume(null);
      return;
    }

    if (screen === "pyramid" && pyramidInternalBackRef.current) {
      const handledInternally = pyramidInternalBackRef.current();
      if (handledInternally) return;
    }

    if (screen === "catalogue" && catalogueInternalBackRef.current) {
      const handledInternally = catalogueInternalBackRef.current();
      if (handledInternally) return;
    }

    if (history.length > 0) {
      const newHistory = [...history];
      const previousScreen = newHistory.pop();
      
      if (previousScreen === "analyzing") {
        const skipLoader = newHistory.pop();
        setScreen(skipLoader || "landing");
        setHistory(newHistory);
      } else {
        setScreen(previousScreen || "landing");
        setHistory(newHistory);
      }
    } else {
      setScreen("landing");
    }
  }, [history, selectedPerfume, screen]);

  const handleGender = (g: Gender) => { 
    setGender(g); 
    navigateTo("budget"); 
  };

  const handleAgeValidate = (age: number) => {
    navigateTo("pyramid");
  };

 const handleValidate = useCallback((
  top: NoteCategory[],
  heart: NoteCategory[],
  base: NoteCategory[],
  atmosphere?: string,
  radarIntensities?: Record<string, number>
) => {
  const matches = matchPerfumes(gender, top, heart, base, radarIntensities, atmosphere);
  setResults(matches);
  setScreen("analyzing");
  setTimeout(() => {
    setScreen("results");
  }, 4000);
}, [gender]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden w-full">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      <LightWipeTransition 
        isVisible={showWipe} 
        onComplete={() => setShowWipe(false)} 
      />

      <nav className="fixed top-6 left-6 right-6 flex justify-between items-start z-[200] pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* Bouton retour masqué quand l'herbier est ouvert */}
          {(screen !== "landing" || selectedPerfume) && !isHerbierOpen && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-2xl"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {screen === "landing" && !selectedPerfume && <ProfileSheet />}
        </div>

        {screen === "landing" && !selectedPerfume && (
  <div className="flex gap-3 pointer-events-auto">
    <button 
      onClick={() => { navigateTo("catalogue"); setSelectedPerfume(null); }} 
      className="w-12 h-12 rounded-full border border-white/10 bg-black/80 text-white backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
    >
      <Library size={20} />
    </button>
  </div>
)}
      </nav>

<main className="relative z-10 h-full w-full">
  <AnimatePresence mode="wait">
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
                  onProfile={() =>{}} 
                />
              )}
              {screen === "budget" && (
                <BudgetScreen
                  onValidate={handleAgeValidate}
                  onBack={handleBack}
                />
              )}
              {screen === "pyramid" && (
                <PyramidScreen
                  onValidate={handleValidate}
                  onMenu={handleBack}
                  setInternalBackHandler={(fn) => { pyramidInternalBackRef.current = fn; }}
                />
              )}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && (
                <ResultsScreen 
                  results={results} 
                  onMenu={handleBack}
                  onLanding={handleGoToLanding}
                  onCatalogue={() => navigateTo("catalogue")} 
                  onSelectPerfume={setSelectedPerfume} 
                />
              )}
              {screen === "catalogue" && (
                <CatalogueScreen 
                  onMenu={handleBack} 
                  availableNotes={availableNotesByCategory}
                  setInternalBackHandler={(fn) => { catalogueInternalBackRef.current = fn; }}
                  onHerbierChange={setIsHerbierOpen}
                  userGender={gender}
                />
              )}
            </motion.div>
        </AnimatePresence>
      </main>

<AnimatePresence>
  {selectedPerfume && (
    <motion.div 
      key={`perfume-${selectedPerfume.id}`} 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[500] bg-[#F5F0E8] overflow-y-auto"
    >
            <PerfumePage 
              perfume={selectedPerfume} 
              onClose={handleBack} 
              onSelectPerfume={setSelectedPerfume}
              userGender={gender}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

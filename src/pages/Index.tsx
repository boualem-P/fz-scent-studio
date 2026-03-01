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

const Index = () => {
  const [screen, setScreen] = useState<"landing" | "pyramid" | "analyzing" | "results" | "catalogue">("landing");
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const handleGender = (g: Gender) => { setGender(g); setScreen("pyramid"); };

  const handleValidate = useCallback((top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
    const matches = matchPerfumes(gender, top, heart, base);
    setResults(matches);
    setScreen("analyzing");
    setTimeout(() => setScreen("results"), 4000);
  }, [gender]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* PLUIE DORÉE (Z-0) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {screen !== "landing" && !selectedPerfume && <GoldenRain />}
      </div>

      {/* NAVIGATION (Z-50) */}
      <nav className="fixed top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          {(screen !== "landing" || selectedPerfume) && (
            <button 
              onClick={() => selectedPerfume ? setSelectedPerfume(null) : setScreen("landing")}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center text-white"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
        <div className="flex gap-3 pointer-events-auto">
          <button onClick={() => {setScreen("landing"); setSelectedPerfume(null);}} className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center"><Home size={20} /></button>
          <button onClick={() => {setScreen("catalogue"); setSelectedPerfume(null);}} className="w-12 h-12 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md flex items-center justify-center"><Library size={20} /></button>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {selectedPerfume ? (
            <motion.div 
              key={selectedPerfume.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-[100] bg-[#1D1E1F] overflow-y-auto"
            >
              <PerfumePage 
                perfume={selectedPerfume} 
                onClose={() => setSelectedPerfume(null)} 
                onSelectPerfume={setSelectedPerfume}
              />
            </motion.div>
          ) : (
            <motion.div key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full">
              {screen === "landing" && <LandingScreen onSelectGender={handleGender} />}
              {screen === "pyramid" && <PyramidScreen onValidate={handleValidate} onMenu={() => setScreen("landing")} />}
              {screen === "analyzing" && <AnalyzingLoader />}
              {screen === "results" && <ResultsScreen results={results} onMenu={() => setScreen("landing")} onCatalogue={() => setScreen("catalogue")} onSelectPerfume={setSelectedPerfume} />}
              {screen === "catalogue" && <CatalogueScreen onMenu={() => setScreen("landing")} onSelectPerfume={setSelectedPerfume} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;

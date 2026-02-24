import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react"; // Importation de l'icône
import LandingScreen from "@/components/LandingScreen";
import PyramidScreen from "@/components/PyramidScreen";
import ResultsScreen from "@/components/ResultsScreen";
import CatalogueScreen from "@/components/CatalogueScreen";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import { Gender, NoteCategory, matchPerfumes, Perfume } from "@/data/perfumes";

type Screen = "landing" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);

  const handleGender = (g: Gender) => {
    setGender(g);
    setScreen("pyramid");
  };

  const handleValidate = useCallback((top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
    const matches = matchPerfumes(gender, top, heart, base);
    setResults(matches);
    setScreen("analyzing");
    setTimeout(() => setScreen("results"), 4000); // Mis à 4s comme convenu
  }, [gender]);

  const handleMenu = () => setScreen("landing");

  return (
    <div className="relative min-h-screen bg-black">
      {/* BOUTON PROFIL FIXE (Apparaît sur toutes les pages) */}
      <button 
        onClick={() => console.log("Profil cliqué")}
        className="fixed top-6 right-24 z-[60] p-2.5 rounded-full border border-[#D4AF37]/30 bg-black/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 backdrop-blur-md shadow-lg"
        title="Mon Profil"
      >
        <User size={20} />
      </button>

      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <LandingScreen onSelectGender={handleGender} onCatalogue={() => setScreen("catalogue")} />
          </motion.div>
        )}
        {screen === "pyramid" && (
          <motion.div key="pyramid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <PyramidScreen onValidate={handleValidate} onMenu={handleMenu} />
          </motion.div>
        )}
        {screen === "analyzing" && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AnalyzingLoader />
          </motion.div>
        )}
        {screen === "results" && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ResultsScreen results={results} onMenu={handleMenu} />
          </motion.div>
        )}
        {screen === "catalogue" && (
          <motion.div key="catalogue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <CatalogueScreen onMenu={handleMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

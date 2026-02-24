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
      {/* CSS Golden Rain */}
      <div className="golden-rain" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="rain-drop" style={{
            left: `${(i * 2.5) % 100}%`,
            animationDelay: `${(i * 0.37) % 5}s`,
            animationDuration: `${3 + (i % 4) * 1.2}s`,
            opacity: 0.15 + (i % 5) * 0.08,
            width: `${1 + (i % 3) * 0.5}px`,
          }} />
        ))}
      </div>

      {/* BOUTON CATALOGUE FIXE */}
      <button 
        onClick={() => setScreen("catalogue")}
        className="fixed top-6 right-6 z-[60] px-6 py-2.5 font-display text-sm tracking-[0.2em] uppercase border border-primary/40 bg-background/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 backdrop-blur-md gold-border-glow"
      >
        Catalogue
      </button>

      {/* BOUTON PROFIL FIXE */}
      <button 
        onClick={() => console.log("Profil cliqué")}
        className="fixed top-6 right-44 z-[60] p-2.5 rounded-full border border-primary/30 bg-background/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 backdrop-blur-md"
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

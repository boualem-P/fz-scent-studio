import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Library, Home } from "lucide-react";
import LandingScreen from "@/components/LandingScreen";
import PyramidScreen from "@/components/PyramidScreen";
import ResultsScreen from "@/components/ResultsScreen";
import CatalogueScreen from "@/components/CatalogueScreen";
import AnalyzingLoader from "@/components/AnalyzingLoader";
import GoldenRain from "@/components/GoldenRain";
import { Gender, NoteCategory, matchPerfumes, Perfume } from "@/data/perfumes";

type Screen = "landing" | "pyramid" | "analyzing" | "results" | "catalogue";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [gender, setGender] = useState<Gender>("homme");
  const [results, setResults] = useState<{ perfume: Perfume; matchPercent: number }[]>([]);
  const [showProfile, setShowProfile] = useState(false);

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

  const handleMenu = () => setScreen("landing");

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <GoldenRain />

      {/* BOUTONS DE NAVIGATION FIXES */}
      <div className="fixed top-6 right-6 z-[100] flex items-center gap-3">
        {/* Bouton Home - Visible si on n'est pas sur Landing */}
        {screen !== "landing" && (
          <button
            onClick={handleMenu}
            className="w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center"
            title="Accueil"
          >
            <Home size={18} />
          </button>
        )}

        {/* Bouton Catalogue - Toujours visible */}
        <button
          onClick={() => setScreen("catalogue")}
          className="w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center"
          title="Catalogue"
        >
          <Library size={18} />
        </button>
      </div>

      {/* Bouton Profil (Gauche) */}
      <AnimatePresence>
        {showProfile && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-6 left-6 w-10 h-10 rounded-full border border-primary/30 bg-black/60 text-primary backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
            title="Mon Profil"
          >
            <User size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {screen === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LandingScreen onSelectGender={handleGender} onCatalogue={() => setScreen("catalogue")} />
            </motion.div>
          )}

          {screen === "pyramid" && (
            <motion.div key="pyramid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PyramidScreen onValidate={handleValidate} onMenu={handleMenu} />
            </motion.div>
          )}

          {screen === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnalyzingLoader />
            </motion.div>
          )}

          {screen === "results" && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResultsScreen results={results} onMenu={handleMenu} onCatalogue={() => setScreen("catalogue")} />
            </motion.div>
          )}

          {screen === "catalogue" && (
            <motion.div key="catalogue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CatalogueScreen onMenu={handleMenu} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;

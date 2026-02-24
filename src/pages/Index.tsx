import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, BookOpen } from "lucide-react";
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
    const timer = setTimeout(() => setShowProfile(true), 2000);
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

      {/* BOUTONS FIXES */}
      <div className="relative z-[100]">

        {/* Bouton Catalogue = icône seulement */}
        {screen !== "results" && (
          <button
            onClick={() => setScreen("catalogue")}
            className="fixed top-6 right-6 p-2.5 rounded-full border border-[#D4AF37]/30 bg-black/60 text-[#D4AF37] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]"
            title="Catalogue"
          >
            <BookOpen size={20} />
          </button>
        )}

        {/* Bouton Profil */}
        <AnimatePresence>
          {showProfile && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => console.log("Profil cliqué")}
              className="fixed top-6 left-6 p-2.5 rounded-full border border-[#D4AF37]/30 bg-black/60 text-[#D4AF37] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              title="Mon Profil"
            >
              <User size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

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
              <ResultsScreen results={results} onMenu={handleMenu} />
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

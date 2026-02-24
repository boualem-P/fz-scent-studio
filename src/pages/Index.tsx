import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
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
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Apparition après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowProfile(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Effet premium au scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGender = (g: Gender) => {
    setGender(g);
    setScreen("pyramid");
  };

  const handleValidate = useCallback(
    (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => {
      const matches = matchPerfumes(gender, top, heart, base);
      setResults(matches);
      setScreen("analyzing");
      setTimeout(() => setScreen("results"), 4000);
    },
    [gender]
  );

  const handleMenu = () => setScreen("landing");

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* Effet pluie dorée */}
      <div className="golden-rain fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: 0.1 + Math.random() * 0.3,
              width: `${1 + Math.random() * 1.5}px`,
            }}
          />
        ))}
      </div>

      {/* Bouton Catalogue */}
      <button
        onClick={() => setScreen("catalogue")}
        className="fixed top-6 right-6 z-[60] px-6 py-2.5 font-display text-sm tracking-[0.2em] uppercase border border-primary/40 bg-background/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 backdrop-blur-md gold-border-glow"
      >
        Catalogue
      </button>

      {/* Bouton Profil Premium */}
      <AnimatePresence>
        {showProfile && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: scrolled ? 0.7 : 1,
              x: 0,
              scale: scrolled ? 0.85 : 1,
              y: scrolled ? -4 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => console.log("Profil cliqué")}
            className="
              fixed top-6 left-4 md:left-6 z-[60]
              p-2 md:p-2.5
              rounded-full
              border border-primary/30
              bg-background/30
              text-primary
              backdrop-blur-md
              transition-all duration-300
              hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]
              hover:border-primary
              hover:bg-primary hover:text-primary-foreground
            "
            style={{
              animation: "floating 4s ease-in-out infinite",
            }}
            title="Mon Profil"
          >
            <User size={18} className="md:w-5 md:h-5" />
          </motion.button>
        )}
      </AnimatePresence>

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

      {/* Styles globaux nécessaires */}
      <style>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        .rain-drop {
          position: absolute;
          top: -10px;
          height: 120px;
          background: linear-gradient(to bottom, rgba(212,175,55,0.7), transparent);
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(110vh);
          }
        }
      `}</style>

    </div>
  );
};

export default Index;

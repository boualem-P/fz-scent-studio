import { useState, useCallback, useEffect, useMemo } from "react"; // Ajout de useMemo
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

  useEffect(() => {
    const timer = setTimeout(() => setShowProfile(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🌧️ MÉMORISATION DE LA PLUIE (Empêche le reset à chaque changement de page)
  const rainParticles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      height: `${40 + Math.random() * 120}px`,
      duration: `${3 + Math.random() * 3}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.15 + Math.random() * 0.3,
    }));
  }, []); // [] signifie : calculé une seule fois au chargement du site

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
      
      {/* 🌧️ CONTENEUR PLUIE PERSISTANT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {rainParticles.map((p) => (
          <div
            key={p.id}
            className="absolute top-0 w-[1px] bg-gradient-to-b from-primary/80 to-transparent animate-rain"
            style={{
              left: p.left,
              height: p.height,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* BOUTON CATALOGUE */}
      <button 
        onClick={() => setScreen("catalogue")}
        className="fixed top-6 right-6 z-[60] px-6 py-2.5 font-display text-sm tracking-[0.2em] uppercase border border-primary/40 bg-background/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 backdrop-blur-md gold-border-glow"
      >
        Catalogue
      </button>

      {/* 👤 BOUTON PROFIL */}
      <AnimatePresence>
        {showProfile && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => console.log("Profil cliqué")}
            className="fixed top-6 left-4 md:left-6 z-[60] p-2.5 rounded-full border border-primary/30 bg-background/60 text-primary backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_15px_hsl(43_72%_52%_/_0.5)] hover:scale-110 hover:border-primary/60"
            title="Mon Profil"
          >
            <User size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* CONTENU DES PAGES (Z-10 pour être devant la pluie) */}
      <div className="relative z-10">
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

      <style>
        {`
          @keyframes rain {
            0% { transform: translateY(-120px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(110vh); opacity: 0; }
          }
          .animate-rain {
            animation-name: rain;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Index;

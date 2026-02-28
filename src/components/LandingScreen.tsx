import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { User, Maximize, Minimize } from "lucide-react"; // Import des icônes de plein écran

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile: () => void;
}

const LandingScreen = ({ onSelectGender, onCatalogue, onProfile }: LandingScreenProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoSrc = "/bg-parfum.mp4";

  // Fonction pour basculer le mode plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Erreur lors du passage en plein écran: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Suivre le changement d'état du plein écran (si l'utilisateur appuie sur Echap)
  useEffect(() => {
    const handleSync = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleSync);
    return () => document.removeEventListener("fullscreenchange", handleSync);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden">
      
      {/* VIDÉO D'ARRIÈRE-PLAN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* BOUTON PROFIL (HAUT GAUCHE) */}
      <div className="absolute top-8 left-8 z-50">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onProfile}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-black/40 text-[#D4AF37] backdrop-blur-md"
        >
          <User size={18} />
        </motion.button>
      </div>

      {/* NOUVEAU : BOUTON PLEIN ÉCRAN (BAS GAUCHE) */}
      <div className="absolute bottom-8 left-8 z-50">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={toggleFullscreen}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-primary/20 bg-black/40 text-primary backdrop-blur-md hover:border-primary transition-all duration-500"
          title={isFullscreen ? "Quitter le plein écran" : "Mode plein écran"}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </motion.button>
      </div>

      {/* CONTENU CENTRAL */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mb-12 relative z-20">
        <motion.h1 variants={staggerItem} className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient tracking-tighter mb-4">
          Fz Parfums
        </motion.h1>
        <motion.p variants={staggerItem} className="font-serif italic text-lg md:text-2xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7EF8A] to-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
          L'art de flaconner l'inoubliable.
        </motion.p>
      </motion.div>

      {/* SECTION BOUTONS GENRE */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center gap-8 relative z-20">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              className="px-8 py-4 min-w-[140px] font-display text-sm tracking-[0.2em] uppercase border border-primary/30 bg-black/40 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-sm gold-border-glow shadow-lg"
            >
              {gender}
            </motion.button>
          ))}
        </div>
        <motion.button
          variants={staggerItem}
          onClick={onCatalogue}
          className="font-body text-[10px] uppercase tracking-[0.5em] text-primary/60 hover:text-primary transition-colors border-b border-primary/20 pb-1"
        >
          Découvrir la collection
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingScreen;

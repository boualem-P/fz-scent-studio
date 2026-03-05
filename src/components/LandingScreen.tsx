import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile: () => void;
}

const LandingScreen = ({ onSelectGender, onCatalogue }: LandingScreenProps) => {
  const videoSrc = "/bg-parfum.mp4";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6 text-center bg-black overflow-hidden">
      
      {/* 1. VIDÉO D'ARRIÈRE-PLAN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* 2. TITRE ET SOUS-TITRE (DÉPLACÉS EN HAUT) */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 mt-12 mb-auto" // mt-12 pour décoller du bord haut, mb-auto pour pousser le reste vers le bas
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary gold-text-glow tracking-[0.3em] uppercase mb-4"
        >
          Finesse
        </motion.h1>
        
        <motion.p 
          variants={staggerItem}
          className="font-body text-[10px] md:text-xs text-primary/70 uppercase tracking-[0.5em] max-w-md mx-auto leading-loose italic"
        >
          L'art de la haute parfumerie personnalisée
        </motion.p>
      </motion.div>

      {/* 3. BOUTONS DE SÉLECTION (REPLACÉS EN BAS) */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-8 relative z-20 mb-16" // mb-16 pour décoller du bas
      >
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

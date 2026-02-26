import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { User } from "lucide-react"; // Importation pour le bouton profil

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile: () => void; // Ajouté obligatoirement ici
}

const LandingScreen = ({ onSelectGender, onProfile }: LandingScreenProps) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden">
      
      {/* 1. FIX DU BOUTON PROFIL (Placé en haut à droite en priorité maximale) */}
      <div className="fixed top-8 right-8 z-[100]">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onProfile}
          className="p-3 rounded-full border border-[#D4AF37]/30 bg-black/60 text-[#D4AF37] backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        >
          <User size={24} />
        </motion.button>
      </div>

      {/* 2. FIX DE LA VIDÉO (Arrière-plan forcé) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          key="hero-video" // Force le rafraîchissement
          className="w-full h-full object-cover opacity-60"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-golden-particles-in-slow-motion-24334-large.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Filtre pour que le texte doré reste lisible */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* SECTION TITRE & SLOGAN (z-10 pour être devant) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-16 relative z-10"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient tracking-tighter mb-2"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-lg md:text-2xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7EF8A] to-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        <motion.div 
          variants={staggerItem}
          className="gold-divider w-24 mx-auto mt-6"
        />
      </motion.div>

      {/* SECTION BOUTONS */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-8 relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              className="px-8 py-4 min-w-[140px] font-display text-sm tracking-[0.2em] uppercase border border-primary/30 bg-black/40 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-sm gold-border-glow"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={staggerItem}
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.5em] text-primary/60 animate-pulse mt-4"
        >
          Cliquez pour commencer l'aventure
        </motion.p>
      </motion.div>

    </div>
  );
};

export default LandingScreen;

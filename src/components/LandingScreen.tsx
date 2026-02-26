import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { User } from "lucide-react";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile: () => void;
}

const LandingScreen = ({ onSelectGender, onCatalogue, onProfile }: LandingScreenProps) => {
  // Conversion du lien Drive pour un accès direct au flux vidéo
  const videoSrc = "https://drive.google.com/uc?export=download&id=1mbsT5qsmsINXPLOh6esIgugGF8BMugxz";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden">
      
      {/* 1. VIDÉO D'ARRIÈRE-PLAN (Ton fichier Drive) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={videoSrc} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        {/* Voile noir (Overlay) pour garantir que tes boutons dorés restent lisibles */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. BOUTON PROFIL (À gauche, petit et élégant) */}
      <div className="absolute top-8 left-8 z-50">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onProfile}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-black/40 text-primary backdrop-blur-md transition-all duration-500 hover:border-primary hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
        >
          <User size={18} />
        </motion.button>
      </div>

      {/* SECTION TITRE & SLOGAN */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-12 relative z-10"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient tracking-tighter mb-4"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-lg md:text-2xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7EF8A] to-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>
      </motion.div>

      {/* SECTION BOUTONS SELECTION */}
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
              className="px-8 py-4 min-w-[140px] font-display text-sm tracking-[0.2em] uppercase border border-primary/30 bg-black/40 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-sm gold-border-glow shadow-lg"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        {/* LIEN CATALOGUE SOUS LES BOUTONS */}
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

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
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden">
      
      {/* 1. VIDÉO D'ARRIÈRE-PLAN LUXE (Soie Dorée / Fluide Luxe) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          key="luxury-video-bg"
          className="w-full h-full object-cover opacity-40"
        >
          {/* Lien Cloudinary : Haute compatibilité avec les lecteurs Web */}
          <source 
            src="https://res.cloudinary.com/dyd911y6h/video/upload/v1626350352/luxury-gold-waves.mp4" 
            type="video/mp4" 
          />
          {/* Lien de secours si Cloudinary est saturé */}
          <source 
            src="https://www.w3schools.com/html/mov_bbb.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Voile noir pour le contraste du texte */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 2. BOUTON PROFIL (À GAUCHE, PETIT ET DISCRET) */}
      <div className="absolute top-8 left-8 z-50">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onProfile}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-black/40 text-[#D4AF37] backdrop-blur-md transition-all duration-500 hover:border-[#D4AF37]"
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

        {/* LIEN CATALOGUE */}
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

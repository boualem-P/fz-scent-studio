import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { User, Maximize } from "lucide-react";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile: () => void;
}

const LandingScreen = ({ onSelectGender, onCatalogue, onProfile }: LandingScreenProps) => {
  const videoSrc = "/videofz.mp4";

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6 text-center bg-black overflow-hidden">
      
      {/* 1. VIDÉO D'ARRIÈRE-PLAN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          key={videoSrc}
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

      {/* 2. BOUTON PROFIL (HAUT GAUCHE) */}
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

      {/* 3. BOUTON PLEIN ÉCRAN (BAS GAUCHE) */}
      <div className="absolute bottom-8 left-8 z-50">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={toggleFullScreen}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20 text-white/50 backdrop-blur-sm transition-all duration-500 hover:text-white hover:border-white/40"
        >
          <Maximize size={16} />
        </motion.button>
      </div>

      {/* 4. TITRE ET SOUS-TITRE (HAUT CENTRE) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 mt-12 mb-auto"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-gold-gradient tracking-tighter mb-4"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif text-[11px] md:text-sm tracking-[0.6em] text-primary/90 uppercase leading-relaxed italic"
        >
          L'art de flaconner l'inoubliable
        </motion.p>
      </motion.div>

      {/* 5. SELECTION GENRE - 2 BOUTONS VERTICAUX AVEC EFFET CATALOGUE */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-10 relative z-20 mb-12"
      >
        <div className="flex justify-center gap-8 md:gap-16">
          {(["homme", "femme"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              /* Utilisation de la même classe que le catalogue : card-shimmer-effect */
              className="glass-card card-shimmer-effect relative w-32 h-52 md:w-40 md:h-64 flex items-center justify-center overflow-hidden border border-primary/20 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-primary/60 shadow-2xl"
            >
              <span className="relative z-10 font-display text-xs md:text-sm tracking-[0.4em] uppercase text-primary group-hover:text-white transition-colors duration-500">
                {gender}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <motion.button
            variants={staggerItem}
            onClick={onCatalogue}
            className="font-body text-[10px] uppercase tracking-[0.5em] text-primary/60 hover:text-primary transition-colors border-b border-primary/20 pb-1"
          >
            Découvrir la collection
          </motion.button>
        </div>
      </motion.div>
      
    </div>
  );
};

export default LandingScreen;

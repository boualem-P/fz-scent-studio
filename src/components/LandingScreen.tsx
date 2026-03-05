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
  // SOURCE VIDÉO STABLE
  const videoSrc = "/videofz.mp4";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6 text-center bg-black overflow-hidden">
      
      {/* VIDÉO D'ARRIÈRE-PLAN */}
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
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* BOUTON PROFIL (Maintenu à sa position stable) */}
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

      {/* TITRE ET SLOGAN - DÉPLACÉS EN HAUT ET RÉDUITS */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 mt-12 mb-auto" // mb-auto pousse les boutons vers le bas
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-gold-gradient tracking-tighter mb-2"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-sm md:text-base tracking-[0.1em] text-primary/80 uppercase"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>
      </motion.div>

      {/* BOUTONS DE SÉLECTION (Maintenus en bas pour dégager le centre) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-8 relative z-20 mb-12"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              className="px-8 py-4 min-w-[140px] font-display text-sm tracking-[0.2em] uppercase border border-primary/30 bg-black/40 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-sm shadow-lg"
            >
              {gender}
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

          <motion.p
            variants={staggerItem}
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.5em] text-primary/40 animate-pulse"
          >
            Cliquez pour commencer l'aventure
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingScreen;

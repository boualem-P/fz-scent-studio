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
  // SOLUTION EFFICACE : Utilisation d'un lien direct optimisé pour le web (Gold Particles Luxe)
  const videoUrl = "https://res.cloudinary.com/dyd911y6h/video/upload/v1626350352/luxury-gold-waves.mp4";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[#050505] overflow-hidden">
      
      {/* ARRIÈRE-PLAN VIDÉO (FORCÉ) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          key="luxury-bg-video"
          className="w-full h-full object-cover opacity-50"
          // On ajoute un style inline pour être sûr que la vidéo couvre tout
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Overlay pour protéger la lisibilité */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* BOUTON PROFIL (GAUCHE, PETIT, STYLE CATALOGUE) */}
      <div className="absolute top-8 left-8 z-[100]">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={(e) => {
            e.stopPropagation();
            onProfile();
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-black/40 text-primary backdrop-blur-md hover:border-primary transition-all duration-500"
        >
          <User size={18} />
        </motion.button>
      </div>

      {/* CONTENU PRINCIPAL */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient tracking-tighter mb-2"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-lg md:text-2xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7EF8A] to-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] mb-12"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              className="px-8 py-4 min-w-[140px] font-display text-sm tracking-[0.2em] uppercase border border-primary/30 bg-black/40 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-sm gold-border-glow shadow-xl"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.button
          variants={staggerItem}
          onClick={onCatalogue}
          className="font-body text-[10px] uppercase tracking-[0.5em] text-primary/60 hover:text-primary transition-colors mt-12 border-b border-primary/10 pb-1"
        >
          Découvrir la collection
        </motion.button>
      </motion.div>

    </div>
  );
};

export default LandingScreen;

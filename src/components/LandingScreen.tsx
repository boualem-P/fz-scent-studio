import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden">
      
      {/* 1. LA VIDÉO D'ARRIÈRE-PLAN */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60" // Opacité réduite pour ne pas agresser l'œil
        >
          {/* Remplace l'URL ci-dessous par ton lien de vidéo (ex: Dropbox direct link, Cloudinary, ou fichier local) */}
          <source src="TON_LIEN_VIDEO.mp4" type="video/mp4" />
        </video>
        
        {/* 2. LE VOILE DE CONTRASTE (Crucial pour la lisibilité) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />
      </div>

      {/* SECTION TITRE & SLOGAN (z-10 pour passer au-dessus de la vidéo) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-16 relative z-10"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient tracking-tighter mb-2 drop-shadow-2xl"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-lg md:text-2xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7EF8A] to-[#D4AF37] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
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
              className="px-8 py-4 min-w-[140px] font-display text-sm tracking-[0.2em] uppercase border border-primary/30 bg-black/60 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-md gold-border-glow shadow-2xl"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={staggerItem}
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.5em] text-primary/80 animate-pulse mt-4 drop-shadow-md"
        >
          Cliquez pour commencer l'aventure
        </motion.p>
      </motion.div>

    </div>
  );
};

export default LandingScreen;

import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
      
      {/* SECTION TITRE & SLOGAN */}
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

        {/* ÉTAPE 5 : LE SLOGAN DORÉ */}
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

        {/* ÉTAPE 4 : INSTRUCTION DÉPLACÉE ICI (SOUS LES BOUTONS) */}
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

import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
}

const LandingScreen = ({ onSelectGender, onCatalogue }: LandingScreenProps) => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center overflow-y-auto relative bg-background pb-40">
      {/* Subtle gold radial gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 40%, hsl(43 72% 52% / 0.06) 0%, transparent 60%)"
      }} />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] gold-divider" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] gold-divider" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center mb-16 relative z-20"
      >
        <motion.h1
          variants={staggerItem}
          className="font-display text-7xl md:text-8xl lg:text-9xl tracking-widest uppercase text-gold-shimmer leading-tight"
        >
          Fz Parfums
        </motion.h1>
        <motion.div variants={staggerItem} className="gold-divider w-48 mx-auto mt-6 mb-3" />
        <motion.p
          variants={staggerItem}
          className="font-display text-lg md:text-xl italic tracking-wide text-primary/80 gold-glow-text"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-6 md:gap-10 relative z-20 justify-center"
      >
        {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
          <motion.button
            key={gender}
            variants={staggerItem}
            whileHover={springHover}
            whileTap={springTap}
            onClick={() => onSelectGender(gender)}
            className="px-12 py-5 font-display text-xl tracking-[0.25em] uppercase
              border border-primary/40 bg-secondary/50 text-primary
              hover:bg-primary/10 hover:border-primary/70
              transition-colors duration-300
              gold-border-glow backdrop-blur-sm card-shimmer-effect"
          >
            {gender.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground animate-pulse-gold mt-12 relative z-20"
      >
        Cliquez pour Commencer
      </motion.p>
    </div>
  );
};

export default LandingScreen;

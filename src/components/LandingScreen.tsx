import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import GoldenRain from "./GoldenRain";
import luxuryBg from "@/assets/luxury-bottle-bg.jpg";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${luxuryBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Golden rain */}
      <GoldenRain />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] gold-divider" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] gold-divider" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-16 relative z-20"
      >
        <h1 className="font-display text-7xl md:text-8xl lg:text-9xl tracking-wider text-gold-shimmer leading-tight">
          Fz Parfums
        </h1>
        <div className="gold-divider w-48 mx-auto mt-6 mb-6" />
        <motion.p
          className="font-body text-lg tracking-[0.3em] uppercase text-muted-foreground animate-pulse-gold"
        >
          Cliquez pour Commencer
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="flex gap-6 md:gap-10 relative z-20"
      >
        {(["homme", "femme", "mixte"] as Gender[]).map((gender, i) => (
          <motion.button
            key={gender}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectGender(gender)}
            className="px-12 py-5 font-display text-xl tracking-[0.25em] uppercase
              border border-primary/40 bg-secondary/50 text-primary
              hover:bg-primary/10 hover:border-primary/70
              transition-colors duration-300
              gold-border-glow backdrop-blur-sm"
          >
            {gender.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingScreen;

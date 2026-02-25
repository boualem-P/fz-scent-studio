import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[#050505] overflow-hidden">
      
      {/* 1. FOND ANIMÉ (Lueur pulsante) */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#d4af3710_0%,_transparent_70%)]"
      />

      {/* 2. LE FLACON EN ROTATION 3D AUTOMATIQUE */}
      <div className="relative z-10 mb-12" style={{ perspective: 1200 }}>
        <motion.div
          animate={{ 
            rotateY: [0, 360], // Rotation complète continue
            y: [0, -20, 0]    // Effet de flottaison (haut/bas)
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          {/* Éclat lumineux fixe derrière le flacon tournant */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af3722] blur-[100px] rounded-full" />
          
          <img 
            src="https://i.ibb.co/HDSMf6VY/hero-perfume.png" 
            alt="Fz Parfums Luxury" 
            className="h-72 md:h-96 w-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.9)] rounded-2xl border border-[#d4af3722]"
          />
        </motion.div>
      </div>

      {/* 3. TEXTES AVEC APPARITION DOUCE */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-20 relative"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl bg-gradient-to-b from-[#f7ef8a] to-[#d4af37] bg-clip-text text-transparent tracking-tighter mb-4"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-xl text-[#d4af37] opacity-80 mb-12 tracking-widest"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        {/* 4. BOUTONS TACTILES (Larges pour tablettes) */}
        <div className="flex flex-wrap justify-center gap-6">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectGender(gender)}
              className="px-12 py-5 min-w-[180px] font-display text-sm tracking-[0.4em] uppercase border-2 border-[#d4af3733] bg-black/40 text-[#d4af37] backdrop-blur-md active:bg-[#d4af37] active:text-black transition-colors duration-300 shadow-2xl"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={staggerItem}
          className="font-body text-[10px] uppercase tracking-[0.6em] text-[#d4af37]/40 mt-10 animate-bounce"
        >
          Touchez pour explorer
        </motion.p>
      </motion.div>

    </div>
  );
};

export default LandingScreen;

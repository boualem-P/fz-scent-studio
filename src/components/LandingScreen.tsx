import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { User } from "lucide-react"; // Crucial pour l'icône

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile: () => void; // RÉINTÉGRÉ ICI
}

// On ajoute onProfile et onCatalogue dans les arguments
const LandingScreen = ({ onSelectGender, onCatalogue, onProfile }: LandingScreenProps) => {
  return (
    // Correction : ajout du fond noir et de la position relative
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[#050505] overflow-hidden">
      
      {/* --- LE BOUTON PROFIL (FORCE L'AFFICHAGE) --- */}
      <div className="fixed top-8 right-8 z-[100]">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onProfile}
          className="p-3 rounded-full border border-[#D4AF37]/30 bg-black/50 text-[#D4AF37] backdrop-blur-md"
        >
          <User size={24} />
        </motion.button>
      </div>

      {/* SECTION TITRE & SLOGAN */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-16 relative z-10"
      >
        <motion.h1 
          variants={staggerItem}
          // Remplacement de la classe custom par du Tailwind pur pour éviter les bugs
          className="font-display text-6xl md:text-8xl lg:text-9xl bg-gradient-to-b from-[#F7EF8A] to-[#D4AF37] bg-clip-text text-transparent tracking-tighter mb-2"
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
              className="px-10 py-4 min-w-[160px] font-display text-xs tracking-[0.3em] uppercase border border-[#D4AF37]/30 bg-black/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.button
          variants={staggerItem}
          onClick={onCatalogue}
          className="font-body text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
        >
          Découvrir la collection
        </motion.button>

        <motion.p
          variants={staggerItem}
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#D4AF37]/40 animate-pulse mt-4"
        >
          Cliquez pour commencer l'aventure
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingScreen;

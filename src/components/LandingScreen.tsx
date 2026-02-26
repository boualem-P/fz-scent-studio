import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { User } from "lucide-react"; // Import de l'icône Profil

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
  onProfile?: () => void; // Ajout de la prop profil
}

const LandingScreen = ({ onSelectGender, onCatalogue, onProfile }: LandingScreenProps) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[#050505] overflow-hidden">
      
      {/* 1. BOUTON PROFIL FIXE (Correction Z-Index) */}
      <div className="absolute top-8 right-8 z-50"> 
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onProfile}
          className="p-3 rounded-full border border-[#d4af3744] bg-black/40 text-[#d4af37] backdrop-blur-md hover:border-[#d4af37] transition-all"
        >
          <User size={24} />
        </motion.button>
      </div>

      {/* 2. ARRIÈRE-PLAN LUXE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af3715_0%,_transparent_70%)] opacity-80" />
      </div>

      {/* 3. SECTION VISUELLE (Image ImgBB) */}
      <div className="relative z-10 mb-8">
        <motion.div
          animate={{ y: [0, -20, 0], rotateY: [0, 5, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative group"
        >
          <div className="absolute -inset-20 bg-[#d4af371a] blur-[120px] rounded-full opacity-60" />
          <img 
            src="https://i.ibb.co/whZ94tqz/hero-perfume.jpg" 
            alt="Fz Parfums Luxury" 
            className="h-72 md:h-96 lg:h-[480px] w-auto drop-shadow-[0_50px_60px_rgba(0,0,0,0.9)] rounded-2xl border border-[#d4af3710] relative z-10"
          />
        </motion.div>
      </div>

      {/* 4. CONTENU TEXTE ET BOUTONS */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-20 relative"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl lg:text-9xl bg-gradient-to-b from-[#f7ef8a] via-[#d4af37] to-[#b8860b] bg-clip-text text-transparent tracking-tighter mb-2"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-xl md:text-2xl text-[#d4af37] opacity-90 mb-10 tracking-[0.2em]"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
              <motion.button
                key={gender}
                variants={staggerItem}
                whileTap={{ scale: 0.92 }}
                onClick={() => onSelectGender(gender)}
                className="px-12 py-5 min-w-[180px] font-display text-xs tracking-[0.4em] uppercase border border-[#d4af3744] bg-black/40 text-[#d4af37] backdrop-blur-md active:bg-[#d4af37] active:text-black transition-all duration-500"
              >
                {gender}
              </motion.button>
            ))}
          </div>

          <motion.button
            variants={staggerItem}
            onClick={onCatalogue}
            className="mt-4 font-body text-[10px] uppercase tracking-[0.5em] text-[#d4af37] border-b border-[#d4af3744] pb-1"
          >
            Découvrir la collection
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingScreen;

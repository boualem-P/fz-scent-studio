import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springTap } from "@/lib/animations";

const LandingScreen = ({ onSelectGender }: { onSelectGender: (g: Gender) => void }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden px-4">
      
      {/* BACKGROUND : Lueur d'ambiance fixe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af3710_0%,_transparent_70%)]" />

      {/* FLACON : Rotation lente et flottaison */}
      <div className="relative z-10 mb-10" style={{ perspective: 1500 }}>
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            y: [0, -15, 0] 
          }}
          transition={{ 
            rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          {/* Ombre portée au sol pour la profondeur */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/60 blur-xl rounded-full" />
          
          <img 
            src="https://i.ibb.co/whZ94tqz/hero-perfume.jpg" 
            alt="Fz Parfums" 
            className="h-80 md:h-[450px] w-auto drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] rounded-lg"
          />
        </motion.div>
      </div>

      {/* CONTENU TEXTE */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-20 text-center"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl bg-gradient-to-b from-[#f7ef8a] to-[#d4af37] bg-clip-text text-transparent tracking-tighter mb-4"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-xl text-[#d4af37]/80 mb-12 tracking-widest"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        {/* BOUTONS LARGEUR TABLETTE */}
        <div className="flex flex-wrap justify-center gap-6">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelectGender(gender)}
              className="px-14 py-5 min-w-[200px] font-display text-sm tracking-[0.4em] uppercase border border-[#d4af37]/30 bg-black/40 text-[#d4af37] backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] active:bg-[#d4af37] active:text-black transition-colors duration-300"
            >
              {gender}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* FOOTER : Appel à l'action */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.8em] text-[#d4af37]"
      >
        Touchez pour commencer
      </motion.div>
    </div>
  );
};

export default LandingScreen;

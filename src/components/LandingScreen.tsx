import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Fond avec une simple lueur radiale très subtile */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af3708_0%,_transparent_60%)] pointer-events-none" />

      {/* Contenu Central */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-10 text-center flex flex-col items-center"
      >
        {/* Titre monumental */}
        <motion.h1 
          variants={staggerItem}
          className="font-display text-7xl md:text-9xl bg-gradient-to-b from-[#f7ef8a] to-[#d4af37] bg-clip-text text-transparent tracking-tighter"
        >
          Fz Parfums
        </motion.h1>

        {/* Slogan minimaliste */}
        <motion.p 
          variants={staggerItem}
          className="text-[#d4af37] font-serif italic text-xl tracking-[0.4em] mt-6 mb-16 opacity-80"
        >
          L'Essence de l'Inoubliable
        </motion.p>

        {/* Groupe de boutons de sélection */}
        <div className="flex flex-col md:flex-row gap-8 px-4">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={{ scale: 1.05, borderColor: "#d4af37" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectGender(gender)}
              className="px-12 py-4 border border-[#d4af3722] bg-transparent text-[#d4af37] font-display text-sm tracking-[0.5em] uppercase transition-all duration-700 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        {/* Indication tactile */}
        <motion.p 
          variants={staggerItem}
          className="mt-20 font-body text-[9px] uppercase tracking-[1.2em] text-[#d4af37] opacity-30 animate-pulse"
        >
          Choisissez votre univers
        </motion.p>
      </motion.div>

      {/* Décoration minimaliste (Lignes dorées très fines sur les côtés) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#d4af3733] to-transparent hidden md:block" />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#d4af3733] to-transparent hidden md:block" />

    </div>
  );
};

export default LandingScreen;

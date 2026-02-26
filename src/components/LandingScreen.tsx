import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { User } from "lucide-react"; // Assure-toi que lucide-react est bien dans ton package.json

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onProfile: () => void; // Obligatoire pour le clic
}

const LandingScreen = ({ onSelectGender, onProfile }: LandingScreenProps) => {
  return (
    // On ajoute h-screen et w-full pour verrouiller le cadre
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden">
      
      {/* --- LE BOUTON PROFIL (FORCE FIXE) --- */}
      <div className="fixed top-6 right-6 z-[9999] pointer-events-auto"> 
        <button
          onClick={(e) => {
            e.stopPropagation(); // Empêche le clic de se propager au fond
            onProfile();
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-[#d4af3766] bg-black/80 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
        >
          <User size={24} />
        </button>
      </div>

      {/* --- LE CONTENU CENTRAL --- */}
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af3708_0%,_transparent_60%)] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="z-10 text-center flex flex-col items-center px-4"
        >
          <motion.h1 
            variants={staggerItem}
            className="font-display text-7xl md:text-9xl bg-gradient-to-b from-[#f7ef8a] to-[#d4af37] bg-clip-text text-transparent tracking-tighter"
          >
            Fz Parfums
          </motion.h1>

          <motion.p 
            variants={staggerItem}
            className="text-[#d4af37] font-serif italic text-xl tracking-[0.4em] mt-6 mb-16 opacity-80"
          >
            L'Essence de l'Inoubliable
          </motion.p>

          <div className="flex flex-col md:flex-row gap-8">
            {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
              <motion.button
                key={gender}
                variants={staggerItem}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectGender(gender)}
                className="px-12 py-4 border border-[#d4af3722] bg-transparent text-[#d4af37] font-display text-sm tracking-[0.5em] uppercase transition-all duration-700 hover:border-[#d4af37]"
              >
                {gender}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default LandingScreen;

import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem } from "@/lib/animations";

const LandingScreen = ({ onSelectGender }: { onSelectGender: (g: Gender) => void }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.h1
          variants={staggerItem}
          className="font-display text-6xl md:text-8xl bg-gradient-to-b from-[hsl(51,80%,75%)] to-[hsl(43,75%,52%)] bg-clip-text text-transparent tracking-tighter mb-4"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-xl text-primary/80 mb-12 tracking-widest"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelectGender(gender)}
              className="px-14 py-5 min-w-[200px] font-display text-sm tracking-[0.4em] uppercase border border-primary/30 bg-black/40 text-primary backdrop-blur-md active:bg-primary active:text-black transition-colors duration-300 hover:border-primary/60"
            >
              {gender}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.8em] text-primary"
      >
        Touchez pour commencer
      </motion.div>
    </div>
  );
};

export default LandingScreen;

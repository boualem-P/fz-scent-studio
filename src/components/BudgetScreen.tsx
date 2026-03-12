import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetScreenProps {
  onSelect: (quantity: number) => void;
  onBack: () => void;
}

const SPHERE_CONFIG = [
  { id: 1, duration: 6.2, delay: 0.0, offsetClass: "mt-0" },
  { id: 2, duration: 7.1, delay: 0.5, offsetClass: "mt-6" },
  { id: 3, duration: 5.4, delay: 1.2, offsetClass: "mt-2" },
  { id: 4, duration: 8.3, delay: 0.8, offsetClass: "mt-8" },
  { id: 5, duration: 6.8, delay: 2.0, offsetClass: "mt-1" },
  { id: 6, duration: 7.5, delay: 1.5, offsetClass: "mt-5" },
  { id: 7, duration: 5.9, delay: 0.3, offsetClass: "mt-3" },
  { id: 8, duration: 8.7, delay: 2.3, offsetClass: "mt-7" },
  { id: 9, duration: 6.5, delay: 1.0, offsetClass: "mt-0" },
  { id: 10, duration: 7.8, delay: 1.8, offsetClass: "mt-4" },
];

const BudgetScreen = ({ onSelect, onBack }: BudgetScreenProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-y-auto pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-24 pb-4 flex flex-col items-center gap-3 px-6"
      >
        <h1 className="text-2xl font-display uppercase tracking-[0.3em] text-amber-500">
          Votre Sélection
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-zinc-400">
          Combien de créations souhaitez-vous découvrir ?
        </p>
        <div className="w-24 h-px bg-amber-500/40 mt-2" />
      </motion.div>

      {/* Wheel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="relative w-80 h-80 mx-auto mt-8"
      >
        {/* Center element */}
        <div
          className="absolute w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center"
          style={{
            left: 160,
            top: 160,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent)",
          }}
        >
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="font-black text-xs tracking-widest text-amber-500/40"
          >
            fz
          </motion.span>
        </div>

        {SPHERE_CONFIG.map((sphere, i) => {
          const TOTAL = 10;
          const WHEEL_RADIUS = 130;
          const CENTER = 160;
          const angle = (2 * Math.PI * i) / TOTAL - Math.PI / 2;
          const sx = CENTER + WHEEL_RADIUS * Math.cos(angle);
          const sy = CENTER + WHEEL_RADIUS * Math.sin(angle);
          const isSelected = selected === sphere.id;

          return (
            <motion.button
              key={sphere.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -4, 0, 3, 0],
                x: [0, 2, 0, -2, 0],
              }}
              transition={{
                opacity: { duration: 0.4, delay: sphere.delay * 0.3 },
                scale: { duration: 0.4, delay: sphere.delay * 0.3 },
                y: { duration: sphere.duration, repeat: Infinity, ease: "easeInOut", delay: sphere.delay },
                x: { duration: sphere.duration, repeat: Infinity, ease: "easeInOut", delay: sphere.delay },
              }}
              whileHover={{ scale: 1.15, boxShadow: "0 0 35px rgba(212,175,55,0.5)" }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelected(sphere.id)}
              className={`absolute w-14 h-14 rounded-full flex items-center justify-center cursor-pointer ${
                isSelected ? "border-2 border-amber-400" : "border border-amber-500/30"
              }`}
              style={{
                left: sx,
                top: sy,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle at 35% 35%, #3a2e00, #1a1400, #000000)",
                boxShadow: isSelected
                  ? "0 0 40px rgba(212,175,55,0.8), inset 0 0 20px rgba(212,175,55,0.2)"
                  : "0 0 20px rgba(212,175,55,0.15), inset 0 0 15px rgba(212,175,55,0.05)",
              }}
            >
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-amber-400/50"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="font-black text-sm text-amber-400 relative z-10"
              >
                X{sphere.id}
              </motion.span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Confirm Button */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6"
          >
            <button
              onClick={() => onSelect(selected)}
              className="w-full max-w-sm bg-white text-black rounded-full py-5 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-95 transition-transform"
            >
              Confirmer — X{selected}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetScreen;

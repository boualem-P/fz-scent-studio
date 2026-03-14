import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delete } from "lucide-react";

interface BudgetScreenProps {
  onValidate: (age: number) => void;
  onBack: () => void;
}

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "del"],
];

const BudgetScreen = ({ onValidate, onBack }: BudgetScreenProps) => {
  const [ageStr, setAgeStr] = useState("");
  const [pulse, setPulse] = useState(false);

  const age = ageStr ? parseInt(ageStr, 10) : null;
  const isValid = age !== null && age >= 16 && age <= 99;
  const isTooYoung = age !== null && age > 0 && age < 16 && ageStr.length >= 2;

  const handleKey = useCallback((key: string) => {
    if (key === "del") {
      setAgeStr((prev) => prev.slice(0, -1));
    } else if (key === "") {
      return;
    } else {
      setAgeStr((prev) => {
        if (prev.length >= 2) return prev;
        return prev + key;
      });
    }
    setPulse(true);
    setTimeout(() => setPulse(false), 150);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden">
      {/* Shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pt-28 pb-4 flex flex-col items-center gap-2 px-6 w-full text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-medium">
          Votre profil olfactif
        </p>
        <h1 className="text-3xl font-extralight italic text-white relative overflow-hidden">
          Quel est votre âge ?
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1"
        >
          Chaque essence est choisie pour vous
        </motion.p>
        <div className="w-16 h-px bg-amber-500/30 mt-3" />
      </motion.div>

      {/* Age display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center mt-8 mb-6"
      >
        <motion.div
          animate={pulse ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center w-32 h-20 rounded-2xl border border-amber-500/30 bg-white/[0.03]"
        >
          <span className="text-5xl font-black text-white tabular-nums tracking-wider">
            {ageStr || (
              <span className="text-zinc-600 text-3xl font-light">—</span>
            )}
          </span>
        </motion.div>

        {/* Too young message */}
        <AnimatePresence>
          {isTooYoung && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400/80 text-[10px] uppercase tracking-widest mt-3"
            >
              Âge minimum : 16 ans
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Numpad */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-3 gap-3 px-12 w-full max-w-xs"
      >
        {KEYS.flat().map((key, i) => {
          if (key === "") {
            return <div key={i} />;
          }

          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleKey(key)}
              className="h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white text-xl font-semibold hover:border-amber-500/40 hover:bg-amber-500/5 transition-colors active:bg-amber-500/10"
            >
              {key === "del" ? <Delete size={20} className="text-zinc-400" /> : key}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Confirm button */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6"
          >
            <button
              onClick={() => onValidate(age!)}
              className="w-full max-w-sm bg-white text-black rounded-full py-5 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-95 transition-transform"
            >
              Découvrir ma sélection →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetScreen;

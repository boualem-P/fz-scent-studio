import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetScreenProps {
  onSelect: (quantity: number) => void;
  onBack: () => void;
}

const CARDS = [
  { id: 1, img: "https://i.ibb.co/DPHS2KzP/1.png" },
  { id: 2, img: "https://i.ibb.co/RkXJtWfJ/2-2.png" },
  { id: 3, img: "https://i.ibb.co/dsK9VzHz/2.png" },
  { id: 4, img: "https://i.ibb.co/QvVHFsHZ/4-2.png" },
  { id: 5, img: "https://i.ibb.co/pjKtr2BD/3.png" },
  { id: 6, img: "https://i.ibb.co/BVPKVysV/6.png" },
  { id: 7, img: "https://i.ibb.co/zhBS4VrB/4.png" },
  { id: 8, img: "https://i.ibb.co/yFS1DkPk/8.png" },
  { id: 9, img: "https://i.ibb.co/67qWvD90/5.png" },
  { id: 10, img: "https://i.ibb.co/JW6wKySF/10.png" },
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
        className="pt-24 pb-6 flex flex-col items-center gap-3 px-6 w-full text-center"
      >
        <h1 className="text-2xl font-black uppercase tracking-[0.3em] text-amber-500">
          quelle intensité choisir ?
        </h1>
        <p className="text-[14px] uppercase tracking-widest text-zinc-400">
          taper pour selectionner
        </p>
        <div className="w-24 h-px bg-amber-500/40 mt-2" />
      </motion.div>

      {/* Masonry grid */}
      <div className="columns-2 gap-3 px-4 w-full max-w-md">
        {CARDS.map((card, i) => {
          const isSelected = selected === card.id;
          const isOdd = card.id % 2 !== 0;

          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(selected === card.id ? null : card.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer mb-3 w-full break-inside-avoid border ${
                isSelected ? "border-amber-400" : "border-amber-500/20"
              }`}
              style={{ height: isOdd ? "9rem" : "12rem" }}
            >
              {/* Image de fond */}
              <img
                src={card.img}
                alt={`X${card.id}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 ${
                  isSelected ? "bg-amber-500/20" : "bg-black/50"
                }`}
              />

              {/* Checkmark si sélectionné */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 text-amber-400 text-lg font-black z-10"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bouton Confirmer */}
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

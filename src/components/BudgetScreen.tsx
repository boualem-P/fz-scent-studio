import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetScreenProps {
  onSelect: (quantity: number) => void;
  onBack: () => void;
}

const CARDS = [
  { id: 1, img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400" },
  { id: 2, img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400" },
  { id: 3, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400" },
  { id: 4, img: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400" },
  { id: 5, img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400" },
  { id: 6, img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400" },
  { id: 7, img: "https://images.unsplash.com/photo-1547887538-047f4264e661?w=400" },
  { id: 8, img: "https://images.unsplash.com/photo-1564294736434-88a8d216c49e?w=400" },
  { id: 9, img: "https://images.unsplash.com/photo-1600612253971-7b89b4b97779?w=400" },
  { id: 10, img: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400" },
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
        className="pt-24 pb-6 flex flex-col items-center gap-3 px-6"
      >
        <h1 className="text-2xl font-black uppercase tracking-[0.3em] text-amber-500">
          Votre Sélection
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-zinc-400">
          Combien de créations souhaitez-vous découvrir ?
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
              onClick={() => setSelected(card.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer mb-3 w-full break-inside-avoid border ${
                isSelected ? "border-amber-400" : "border-amber-500/20"
              }`}
              style={{ height: isOdd ? "9rem" : "12rem" }}
            >
              {/* Background image */}
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

              {/* Checkmark */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 text-amber-400 text-lg font-black z-10"
                >
                  ✓
                </motion.span>
              )}

              {/* Label */}
              <div className="absolute bottom-3 left-3 z-10 text-left">
                <span className="font-black text-2xl text-white block leading-none">
                  X{card.id}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-400">
                  fois
                </span>
              </div>
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

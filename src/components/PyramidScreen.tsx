import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flower2, CheckCircle } from "lucide-react";
import {
  NoteCategory,
  NOTE_LABELS,
  TOP_NOTES,
  HEART_NOTES,
  BASE_NOTES,
} from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const NoteTag = ({
  note,
  selected,
  onClick,
}: {
  note: NoteCategory;
  selected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2.5 rounded-sm font-body text-sm tracking-wide transition-all duration-300 border
      ${
        selected
          ? "bg-primary/15 border-primary/70 text-primary gold-glow-strong"
          : "bg-secondary/40 border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
      }`}
  >
    {NOTE_LABELS[note]}
  </motion.button>
);

const SectionTitle = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3 mb-4">
    <Icon className="w-5 h-5 text-primary" />
    <div>
      <h3 className="font-display text-lg text-primary tracking-wider">{title}</h3>
      <p className="text-xs text-muted-foreground tracking-widest uppercase">{subtitle}</p>
    </div>
  </div>
);

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [selectedTop, setSelectedTop] = useState<NoteCategory[]>([]);
  const [selectedHeart, setSelectedHeart] = useState<NoteCategory[]>([]);
  const [selectedBase, setSelectedBase] = useState<NoteCategory[]>([]);

  const toggle = (
    note: NoteCategory,
    list: NoteCategory[],
    setter: React.Dispatch<React.SetStateAction<NoteCategory[]>>
  ) => {
    setter(list.includes(note) ? list.filter((n) => n !== note) : [...list, note]);
  };

  const hasSelection = selectedTop.length > 0 || selectedHeart.length > 0 || selectedBase.length > 0;

  return (
    <div className="h-screen w-screen flex flex-col bg-obsidian-gradient overflow-hidden relative p-8 lg:p-10">
      {/* Background pyramid illustration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="w-0 h-0 border-l-[250px] border-r-[250px] border-b-[400px] border-l-transparent border-r-transparent border-b-primary" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="font-display text-3xl text-gold-gradient tracking-wider">
          Pyramide Olfactive
        </h2>
        <div className="gold-divider w-32 mx-auto mt-3" />
      </motion.div>

      {/* Three sections */}
      <div className="flex-1 grid grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <SectionTitle icon={Sparkles} title="Notes de Tête" subtitle="The Spark" />
          <div className="flex flex-wrap gap-2.5">
            {TOP_NOTES.map((note) => (
              <NoteTag
                key={note}
                note={note}
                selected={selectedTop.includes(note)}
                onClick={() => toggle(note, selectedTop, setSelectedTop)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col"
        >
          <SectionTitle icon={Flower2} title="Notes de Cœur" subtitle="The Soul" />
          <div className="flex flex-wrap gap-2.5">
            {HEART_NOTES.map((note) => (
              <NoteTag
                key={note}
                note={note}
                selected={selectedHeart.includes(note)}
                onClick={() => toggle(note, selectedHeart, setSelectedHeart)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col"
        >
          <SectionTitle icon={CheckCircle} title="Notes de Fond" subtitle="The Sillage" />
          <div className="flex flex-wrap gap-2.5">
            {BASE_NOTES.map((note) => (
              <NoteTag
                key={note}
                note={note}
                selected={selectedBase.includes(note)}
                onClick={() => toggle(note, selectedBase, setSelectedBase)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-between items-center mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onMenu}
          className="px-8 py-3 font-display text-sm tracking-[0.2em] uppercase
            border border-border/50 text-muted-foreground
            hover:border-primary/40 hover:text-primary
            transition-colors duration-300"
        >
          Menu
        </motion.button>

        <AnimatePresence>
          {hasSelection && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onValidate(selectedTop, selectedHeart, selectedBase)}
              className="px-12 py-3 font-display text-base tracking-[0.25em] uppercase
                bg-primary/15 border border-primary/60 text-primary
                hover:bg-primary/25
                transition-colors duration-300 gold-glow"
            >
              Valider
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PyramidScreen;

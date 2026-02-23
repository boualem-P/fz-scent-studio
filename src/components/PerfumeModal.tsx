import { motion } from "framer-motion";
import { X, Sparkles, Flower2, TreePine, Droplets } from "lucide-react";
import { Perfume, NoteDetail } from "@/data/perfumes";
import { staggerContainer, staggerItem, luxuryEase } from "@/lib/animations";

interface PerfumeModalProps {
  perfume: Perfume;
  onClose: () => void;
}

const NoteBubble = ({ note }: { note: NoteDetail }) => (
  <motion.div variants={staggerItem} className="flex flex-col items-center gap-1.5 min-w-[55px]">
    <div className="w-12 h-12 rounded-full border border-primary/30 shadow-lg shadow-primary/10 flex items-center justify-center bg-primary/5">
      <Droplets className="w-4 h-4 text-primary/70" />
    </div>
    <span className="text-[8px] font-body text-foreground/70 tracking-wider text-center leading-tight max-w-[60px]">
      {note.name}
    </span>
  </motion.div>
);

const NoteRow = ({
  icon: Icon,
  label,
  notes,
}: {
  icon: React.ElementType;
  label: string;
  notes: NoteDetail[];
}) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-3.5 h-3.5 text-primary" />
      <span className="text-[10px] font-body tracking-[0.15em] uppercase text-primary/70">{label}</span>
    </div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex gap-3 flex-wrap"
    >
      {notes.map((note) => (
        <NoteBubble key={note.name} note={note} />
      ))}
    </motion.div>
  </div>
);

const PerfumeModal = ({ perfume, onClose }: PerfumeModalProps) => {
  const initials = perfume.name
    .split(/[\s'-]+/)
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.5, ease: luxuryEase }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card/95 border border-primary/30 gold-border-glow max-w-3xl w-full mx-6 flex overflow-hidden backdrop-blur-lg"
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/60" />

        {/* Glassmorphism placeholder */}
        <div className="w-1/3 bg-secondary/30 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase, delay: 0.2 }}
            className="w-32 h-48 rounded-sm bg-gradient-to-b from-primary/20 to-transparent border border-primary/30 flex items-center justify-center"
          >
            <span className="font-display text-4xl text-primary/80 tracking-wider">{initials}</span>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex-1 p-8 flex flex-col overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.p variants={staggerItem} className="text-xs font-body tracking-[0.3em] uppercase text-muted-foreground mb-1">
            {perfume.brand}
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-3xl text-gold-gradient mb-2">
            {perfume.name}
          </motion.h2>

          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-body tracking-wider text-muted-foreground uppercase">
              {perfume.gender === "homme" ? "Homme" : perfume.gender === "femme" ? "Femme" : "Mixte"}
            </span>
            <span className="text-primary/30">•</span>
            <span className="text-[10px] font-body tracking-wider text-muted-foreground">{perfume.concentration}</span>
            <span className="text-primary/30">•</span>
            <span className="text-[10px] font-body tracking-wider text-muted-foreground">{perfume.year}</span>
          </motion.div>

          <motion.div variants={staggerItem} className="gold-divider w-16 mb-4" />
          <motion.p variants={staggerItem} className="text-sm text-foreground/80 leading-relaxed font-body mb-6 italic">
            "{perfume.description}"
          </motion.p>

          <div className="mt-auto">
            <NoteRow icon={Sparkles} label="Notes de Tête" notes={perfume.topNotesDetailed} />
            <NoteRow icon={Flower2} label="Notes de Cœur" notes={perfume.heartNotesDetailed} />
            <NoteRow icon={TreePine} label="Notes de Fond" notes={perfume.baseNotesDetailed} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PerfumeModal;

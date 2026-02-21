import { motion } from "framer-motion";
import { Perfume, NOTE_LABELS } from "@/data/perfumes";
import { X, Droplets, Flower2, TreePine } from "lucide-react";

interface PerfumeModalProps {
  perfume: Perfume;
  onClose: () => void;
}

const NoteList = ({
  icon: Icon,
  label,
  notes,
}: {
  icon: React.ElementType;
  label: string;
  notes: string[];
}) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-body tracking-widest uppercase text-primary">{label}</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {notes.map((n) => (
        <span
          key={n}
          className="px-2.5 py-1 text-xs bg-secondary/60 border border-border/40 text-foreground rounded-sm"
        >
          {n}
        </span>
      ))}
    </div>
  </div>
);

const PerfumeModal = ({ perfume, onClose }: PerfumeModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-primary/30 gold-border-glow max-w-3xl w-full mx-6 flex overflow-hidden"
      >
        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/60" />

        {/* Image */}
        <div className="w-1/3 bg-secondary/30 flex items-center justify-center p-6">
          <img
            src={perfume.imageUrl}
            alt={perfume.name}
            className="max-h-[350px] object-contain drop-shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-xs font-body tracking-[0.3em] uppercase text-muted-foreground mb-1">
            {perfume.brand}
          </p>
          <h2 className="font-display text-3xl text-gold-gradient mb-4">{perfume.name}</h2>
          <div className="gold-divider w-16 mb-4" />
          <p className="text-sm text-foreground/80 leading-relaxed font-body mb-6 italic">
            "{perfume.description}"
          </p>

          <div className="mt-auto">
            <NoteList
              icon={Droplets}
              label="Notes de Tête"
              notes={perfume.topNotes.map((n) => NOTE_LABELS[n])}
            />
            <NoteList
              icon={Flower2}
              label="Notes de Cœur"
              notes={perfume.heartNotes.map((n) => NOTE_LABELS[n])}
            />
            <NoteList
              icon={TreePine}
              label="Notes de Fond"
              notes={perfume.baseNotes.map((n) => NOTE_LABELS[n])}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PerfumeModal;

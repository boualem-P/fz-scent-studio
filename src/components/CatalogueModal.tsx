import { motion } from "framer-motion";
import { X, Sparkles, Flower2, TreePine } from "lucide-react";
import { Perfume, NoteDetail } from "@/data/perfumes";
import { getNoteImage } from "@/data/notesData";
import { staggerContainer, staggerItem, luxuryEase } from "@/lib/animations";

interface CatalogueModalProps {
  perfume: Perfume;
  onClose: () => void;
}

const NoteBubble = ({ note }: { note: NoteDetail }) => {
  const imgUrl = getNoteImage(note.name);
  return (
    <motion.div variants={staggerItem} className="flex flex-col items-center gap-1.5 min-w-[60px]">
      <div className="w-14 h-14 rounded-full border border-primary/20 shadow-lg shadow-primary/10 overflow-hidden relative group">
        <img src={imgUrl} alt={note.name} className="w-full h-full object-cover ingredient-img" />
        <div className="absolute inset-0 ingredient-overlay" />
      </div>
      <span className="text-[9px] font-body text-foreground/70 tracking-wider text-center leading-tight max-w-[65px]">{note.name}</span>
    </motion.div>
  );
};

const NoteRow = ({ icon: Icon, label, notes }: { icon: any; label: string; notes: NoteDetail[] }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-[10px] font-body tracking-[0.15em] uppercase text-primary/70">{label}</span>
    </div>
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex gap-4 flex-wrap">
      {notes.map((note) => <NoteBubble key={note.name} note={note} />)}
    </motion.div>
  </div>
);

const CatalogueModal = ({ perfume, onClose }: CatalogueModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5, ease: luxuryEase }}
      onClick={(e) => e.stopPropagation()}
      className="relative bg-card/95 border border-primary/30 gold-border-glow w-full max-w-4xl flex flex-col md:flex-row overflow-hidden backdrop-blur-xl max-h-[90vh]"
    >
      {/* Bouton Fermer */}
      <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 text-primary/60 hover:text-primary transition-colors bg-black/20 rounded-full border border-primary/10">
        <X size={20} />
      </button>

      {/* Côté Image (Généreux) */}
      <div className="w-full md:w-2/5 bg-secondary/30 flex items-center justify-center p-12 relative min-h-[300px]">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          {perfume.image ? (
            <img 
              src={perfume.image} 
              alt={perfume.name} 
              className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] mix-blend-lighten"
            />
          ) : (
             <div className="text-primary/20 font-display text-8xl uppercase">{perfume.name.substring(0,1)}</div>
          )}
        </motion.div>
      </div>

      {/* Côté Contenu (Infos) */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto bg-black/40">
        <motion.p variants={staggerItem} className="text-[11px] font-body tracking-[0.4em] uppercase text-primary/60 mb-2">
          {perfume.brand}
        </motion.p>
        <motion.h2 variants={staggerItem} className="font-display text-4xl lg:text-5xl text-gold-gradient mb-4">
          {perfume.name}
        </motion.h2>

        <motion.div variants={staggerItem} className="flex items-center gap-4 mb-6 text-[10px] font-body tracking-[0.2em] text-muted-foreground uppercase border-y border-primary/10 py-3">
          <span>{perfume.gender}</span>
          <span className="text-primary/30">•</span>
          <span>{perfume.concentration}</span>
          <span className="text-primary/30">•</span>
          <span>{perfume.concentration}</span>
        </motion.div>

        <motion.p variants={staggerItem} className="text-base text-foreground/80 leading-relaxed font-body mb-10 italic border-l-2 border-primary/20 pl-6 py-2">
          {perfume.description}
        </motion.p>

        <div className="space-y-2">
          <NoteRow icon={Sparkles} label="Notes de Tête" notes={perfume.topNotesDetailed} />
          <NoteRow icon={Flower2} label="Notes de Cœur" notes={perfume.heartNotesDetailed} />
          <NoteRow icon={TreePine} label="Notes de Fond" notes={perfume.baseNotesDetailed} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CatalogueModal;

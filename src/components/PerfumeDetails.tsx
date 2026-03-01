import { motion } from "framer-motion";
import { X, Info } from "lucide-react";
import { Perfume, NOTE_LABELS } from "@/data/perfumes";
import { springHover } from "@/lib/animations";

interface PerfumeDetailsProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectRelated: (perfume: Perfume) => void;
  relatedPerfumes: Perfume[];
}

const PerfumeDetails = ({ perfume, onClose, onSelectRelated, relatedPerfumes }: PerfumeDetailsProps) => {
  const topLabels = perfume.topNotesDetailed.map(n => n.name);
  const heartLabels = perfume.heartNotesDetailed.map(n => n.name);
  const baseLabels = perfume.baseNotesDetailed.map(n => n.name);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto"
    >
      <div className="max-w-6xl w-full flex flex-col gap-6 my-auto">
        
        <div className="relative bg-[#0a0a0a] border border-primary/20 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 text-primary/60 hover:text-primary transition-colors"
          >
            <X size={24} />
          </button>

          {/* GAUCHE (40%) */}
          <div className="w-full md:w-[40%] bg-gradient-to-b from-primary/5 to-transparent flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-primary/10">
            <div className="w-32 h-44 rounded bg-gradient-to-b from-primary/20 to-transparent border border-primary/30 flex items-center justify-center">
              <span className="font-display text-3xl text-primary/80 tracking-wider">
                {perfume.name.split(/[\s'-]+/).filter(w => w[0] === w[0]?.toUpperCase()).map(w => w[0]).slice(0, 2).join("")}
              </span>
            </div>
          </div>

          {/* DROITE (60%) */}
          <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-2 uppercase tracking-tighter">
              {perfume.name}
            </h2>
            <p className="font-serif italic text-primary/60 text-lg mb-8">Par {perfume.brand}</p>

            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary/40 flex items-center gap-2">
                <Info size={14} /> Architecture Olfactive
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors cursor-default group">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-[10px] text-primary shrink-0 group-hover:border-primary">Tête</div>
                  <div className="text-sm tracking-widest uppercase">{topLabels.join(", ")}</div>
                </div>
                <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors cursor-default group">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-[10px] text-primary shrink-0 group-hover:border-primary">Cœur</div>
                  <div className="text-sm tracking-widest uppercase">{heartLabels.join(", ")}</div>
                </div>
                <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors cursor-default group">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-[10px] text-primary shrink-0 group-hover:border-primary">Fond</div>
                  <div className="text-sm tracking-widest uppercase">{baseLabels.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUGGESTIONS */}
        <div className="bg-black/40 backdrop-blur-sm border border-primary/10 rounded-2xl p-6">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary/40 mb-4 text-center">Sillages Similaires</h4>
          <div className="flex justify-center gap-4">
            {relatedPerfumes.slice(0, 3).map((related) => (
              <motion.button
                key={related.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectRelated(related)}
                className="w-20 flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-20 bg-primary/5 rounded border border-primary/10 flex items-center justify-center p-2 group-hover:border-primary/40 transition-colors">
                  <span className="text-xs text-primary/60 font-display">
                    {related.name.split(/[\s'-]+/).filter(w => w[0] === w[0]?.toUpperCase()).map(w => w[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-widest text-primary/60 text-center truncate w-full">{related.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerfumeDetails;
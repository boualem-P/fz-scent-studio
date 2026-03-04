import { motion } from "framer-motion";
import { X, ShoppingBag, Wind, Droplets, Zap } from "lucide-react";
import { Perfume } from "@/data/perfumes";
import { useMemo } from "react";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose }: PerfumePageProps) => {
  // Génère des accords visuels basés sur le nom du parfum pour la cohérence
  const visualAccords = useMemo(() => {
    const families = ['Boisé', 'Epicé', 'Floral', 'Agrumes', 'Animal'];
    const colors = ['#8A6240', '#B35A2D', '#E11D48', '#F4F933', '#60A5FA'];
    
    return families.map((label, i) => ({
      label,
      value: Math.floor(Math.random() * (95 - 40 + 1)) + 40, // Valeur entre 40 et 95
      color: colors[i]
    })).sort((a, b) => b.value - a.value).slice(0, 4);
  }, [perfume.id]);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white pb-20">
      {/* Header / Fermer */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* SECTION IMAGE */}
        <div className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            src={perfume.image} 
            className="w-full h-full object-cover"
            alt={perfume.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* CONTENU : ACCORDS À GAUCHE, INFOS À DROITE */}
        <div className="px-6 -mt-20 relative z-10 flex flex-col md:flex-row gap-12">
          
          {/* BLOC ACCORDS (SOUS LA PHOTO CÔTÉ GAUCHE) */}
          <div className="w-full md:w-72 shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black/60 backdrop-blur-2xl border border-white/5 p-6 rounded-3xl shadow-2xl"
            >
              <h3 className="text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                Accords Majeurs
              </h3>
              
              <div className="space-y-6">
                {visualAccords.map((acc, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-medium">
                        {acc.label}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {acc.value}%
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${acc.value}%` }}
                        transition={{ duration: 1.5, delay: 0.8 + (i * 0.1) }}
                        style={{ backgroundColor: acc.color }}
                        className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* BLOC TEXTE / INFOS */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-8xl font-light uppercase tracking-tighter mb-2 italic">
                {perfume.name}
              </h1>
              <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.5em] mb-10">
                {perfume.brand}
              </p>

              <p className="text-zinc-400 text-xl leading-relaxed font-light italic max-w-2xl mb-12">
                "{perfume.description}"
              </p>

              {/* PYRAMIDE OLFACTIVE */}
              <div className="grid grid-cols-3 gap-4 py-10 border-y border-white/5 max-w-2xl">
                <div className="flex flex-col items-center text-center">
                  <Wind size={20} className="text-amber-500/50 mb-4" />
                  <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Tête</span>
                  <span className="text-[11px] text-white font-medium uppercase px-2">{perfume.topNotes.join(", ")}</span>
                </div>
                <div className="flex flex-col items-center text-center border-x border-white/5">
                  <Droplets size={20} className="text-amber-500/50 mb-4" />
                  <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Cœur</span>
                  <span className="text-[11px] text-white font-medium uppercase px-2">{perfume.heartNotes.join(", ")}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Zap size={20} className="text-amber-500/50 mb-4" />
                  <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Fond</span>
                  <span className="text-[11px] text-white font-medium uppercase px-2">{perfume.baseNotes.join(", ")}</span>
                </div>
              </div>

              <div className="mt-12">
                <button className="w-full sm:w-80 bg-white text-black h-16 rounded-full flex items-center justify-center gap-3 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-amber-500 transition-all hover:scale-105 active:scale-95">
                  <ShoppingBag size={18} />
                  Réserver ce sillage
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

import { motion } from "framer-motion";
import { X, ShoppingBag, Wind, Droplets, Zap } from "lucide-react";
import { Perfume } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  accords?: { label: string; value: number; color: string }[]; // Accords dynamiques
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, accords, onClose }: PerfumePageProps) => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white pb-20">
      {/* Header / Close */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* Conteneur Image principale */}
        <div className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={perfume.image} 
            className="w-full h-full object-cover"
            alt={perfume.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* SECTION DES ACCORDS (SOUS LA PHOTO - CÔTÉ GAUCHE) */}
        <div className="px-6 -mt-12 relative z-10 flex flex-col md:flex-row gap-10">
          
          {/* Bloc Gauche : Accords */}
          <div className="w-full md:w-1/3">
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl">
              <h3 className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
                Accords Majeurs
              </h3>
              
              <div className="space-y-5">
                {accords && accords.length > 0 ? (
                  accords.map((acc, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-light">
                          {acc.label}
                        </span>
                        <span className="text-[9px] text-zinc-600 font-mono">
                          {acc.value}%
                        </span>
                      </div>
                      <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${acc.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          style={{ backgroundColor: acc.color }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-zinc-600 italic">Analyse olfactive standard...</p>
                )}
              </div>
            </div>
          </div>

          {/* Bloc Droit : Infos Parfum */}
          <div className="flex-1 flex flex-col pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter mb-2 italic">
                {perfume.name}
              </h1>
              <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.5em] mb-8">
                {perfume.brand}
              </p>

              <p className="text-zinc-400 text-lg leading-relaxed font-light italic max-w-2xl mb-12">
                {perfume.description}
              </p>

              {/* Pyramide Olfactive Visuelle */}
              <div className="grid grid-cols-3 gap-1 md:gap-4 py-8 border-y border-white/5 max-w-xl">
                <div className="flex flex-col items-center text-center px-2">
                  <Wind size={18} className="text-zinc-600 mb-3" />
                  <span className="text-[8px] uppercase tracking-widest text-zinc-500 mb-2">Tête</span>
                  <span className="text-[10px] text-white font-medium uppercase">{perfume.topNotes.join(", ")}</span>
                </div>
                <div className="flex flex-col items-center text-center px-2 border-x border-white/5">
                  <Droplets size={18} className="text-zinc-600 mb-3" />
                  <span className="text-[8px] uppercase tracking-widest text-zinc-500 mb-2">Cœur</span>
                  <span className="text-[10px] text-white font-medium uppercase">{perfume.heartNotes.join(", ")}</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <Zap size={18} className="text-zinc-600 mb-3" />
                  <span className="text-[8px] uppercase tracking-widest text-zinc-500 mb-2">Fond</span>
                  <span className="text-[10px] text-white font-medium uppercase">{perfume.baseNotes.join(", ")}</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 max-w-xl">
                <button className="flex-1 bg-white text-black h-16 rounded-full flex items-center justify-center gap-3 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-amber-500 transition-colors">
                  <ShoppingBag size={18} />
                  Découvrir le flacon
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

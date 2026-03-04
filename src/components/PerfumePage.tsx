import { motion } from "framer-motion";
import { X, ShoppingBag, Wind, Droplets, Zap, ShieldCheck, Star } from "lucide-react";
import { Perfume } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose }: PerfumePageProps) => {
  // Simulation des accords basée sur les familles olfactives du parfum
  const accords = [
    { label: "Intensité", value: 85, color: "#f59e0b" },
    { label: "Sillage", value: 70, color: "#d97706" },
    { label: "Tenue", value: 90, color: "#b45309" },
    { label: "Fraîcheur", value: 60, color: "#fbbf24" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white pb-20 overflow-x-hidden">
      {/* BOUTON FERMER */}
      <div className="fixed top-6 right-6 z-[200]">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:scale-110 transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* COLONNE GAUCHE : PHOTO + JAUGES */}
          <div className="w-full lg:w-[450px] shrink-0">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <img 
                src={perfume.image} 
                className="w-full h-full object-cover"
                alt={perfume.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* LES JAUGES D'ACCORDS (JUSTE SOUS LA PHOTO) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 space-y-6 px-2"
            >
              <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                Analyse du Sillage
              </h3>
              {accords.map((acc, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400">
                    <span>{acc.label}</span>
                    <span className="font-mono text-amber-500">{acc.value}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${acc.value}%` }}
                      transition={{ duration: 1.5, delay: 0.6 + (i * 0.1) }}
                      style={{ backgroundColor: acc.color }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* COLONNE DROITE : INFOS + NOTES OLFACTIVES */}
          <div className="flex-1 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[1px] w-8 bg-amber-500" />
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Haute Parfumerie</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-light uppercase tracking-tighter mb-4 italic leading-none">
                {perfume.name}
              </h1>
              <p className="text-zinc-500 text-lg font-light uppercase tracking-[0.2em] mb-8">
                {perfume.brand}
              </p>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 max-w-2xl">
                <p className="text-zinc-300 text-lg leading-relaxed font-light italic">
                  "{perfume.description}"
                </p>
              </div>

              {/* PYRAMIDE DÉTAILLÉE (SOUS-NOTES) */}
              <div className="space-y-8 max-w-2xl mb-12">
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-zinc-900 rounded-full text-amber-500 shrink-0"><Wind size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Notes de Tête</h4>
                    <p className="text-white text-lg font-light">{perfume.topNotes.join(" • ")}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-zinc-900 rounded-full text-amber-500 shrink-0"><Droplets size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Notes de Cœur</h4>
                    <p className="text-white text-lg font-light">{perfume.heartNotes.join(" • ")}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-zinc-900 rounded-full text-amber-500 shrink-0"><Zap size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Notes de Fond</h4>
                    <p className="text-white text-lg font-light">{perfume.baseNotes.join(" • ")}</p>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-white/5 pt-10">
                <button className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-amber-500 transition-all flex items-center justify-center gap-3">
                  <ShoppingBag size={18} />
                  Acquérir ce flacon
                </button>
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] uppercase tracking-widest ml-4">
                  <ShieldCheck size={16} />
                  <span>Authenticité Garantie</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

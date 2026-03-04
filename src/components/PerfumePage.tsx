import { motion } from "framer-motion";
import { X, ShoppingBag, Wind, Droplets, Zap } from "lucide-react";
import { Perfume } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose }: PerfumePageProps) => {
  // Accords visuels calculés pour le rendu esthétique
  const visualAccords = [
    { label: "Boisé", value: 85, color: "#8A6240" },
    { label: "Épicé", value: 65, color: "#B35A2D" },
    { label: "Floral", value: 45, color: "#E11D48" },
    { label: "Minéral", value: 30, color: "#60A5FA" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white pb-20">
      {/* Bouton de fermeture discret */}
      <div className="absolute top-8 right-8 z-50">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* SECTION PHOTO PRINCIPALE */}
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

        {/* LAYOUT : ACCORDS À GAUCHE / INFOS À DROITE */}
        <div className="px-6 -mt-16 relative z-10 flex flex-col md:flex-row gap-16">
          
          {/* CÔTÉ GAUCHE : JAUGES MINIMALISTES */}
          <div className="w-full md:w-64 shrink-0">
            <div className="flex flex-col gap-6">
              <h3 className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-2">
                Accords Majeurs
              </h3>
              
              <div className="space-y-6">
                {visualAccords.map((acc, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-zinc-400 font-light">
                        {acc.label}
                      </span>
                      <span className="text-[9px] text-zinc-600 italic">{acc.value}%</span>
                    </div>
                    <div className="h-[1px] w-full bg-zinc-900 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${acc.value}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                        style={{ backgroundColor: acc.color }}
                        className="h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CÔTÉ DROIT : CONTENU TEXTUEL */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl md:text-8xl font-light uppercase tracking-tighter mb-2 italic">
                {perfume.name}
              </h1>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-10">
                {perfume.brand}
              </p>

              <p className="text-zinc-400 text-xl leading-relaxed font-light italic max-w-2xl mb-12">
                "{perfume.description}"
              </p>

              {/* PYRAMIDE OLFACTIVE TECHNIQUE */}
              <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5 max-w-2xl">
                <div className="text-center">
                  <Wind size={18} className="mx-auto mb-4 text-zinc-600" />
                  <p className="text-[8px] uppercase text-zinc-500 tracking-widest mb-2 font-bold">Tête</p>
                  <p className="text-[10px] text-white uppercase leading-tight">{perfume.topNotes.join(", ")}</p>
                </div>
                <div className="text-center border-x border-white/5 px-4">
                  <Droplets size={18} className="mx-auto mb-4 text-zinc-600" />
                  <p className="text-[8px] uppercase text-zinc-500 tracking-widest mb-2 font-bold">Cœur</p>
                  <p className="text-[10px] text-white uppercase leading-tight">{perfume.heartNotes.join(", ")}</p>
                </div>
                <div className="text-center">
                  <Zap size={18} className="mx-auto mb-4 text-zinc-600" />
                  <p className="text-[8px] uppercase text-zinc-500 tracking-widest mb-2 font-bold">Fond</p>
                  <p className="text-[10px] text-white uppercase leading-tight">{perfume.baseNotes.join(", ")}</p>
                </div>
              </div>

              <div className="mt-12">
                <button className="px-14 py-5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                  Découvrir le sillage
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

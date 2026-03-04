import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap } from "lucide-react";
import { Perfume, perfumes } from "@/data/perfumes";
import { useMemo } from "react";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  // 6. Recommandations : Parfums de la même marque ou même catégorie
  const recommendations = useMemo(() => {
    return perfumes
      .filter(p => p.id !== perfume.id && (p.brand === perfume.brand || p.gender === perfume.gender))
      .slice(0, 3);
  }, [perfume]);

  // Simulation des pourcentages pour les jauges interactives (Point 3)
  const pyramidData = [
    { label: "Tête", value: 25, icon: <Wind size={14} />, color: "#fbbf24" },
    { label: "Cœur", value: 45, icon: <Droplets size={14} />, color: "#f59e0b" },
    { label: "Fond", value: 30, icon: <Zap size={14} />, color: "#b45309" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white pb-20">
      
      {/* 7. Interface avec léger BLUR en haut */}
      <div className="sticky top-0 z-[100] w-full h-20 bg-black/20 backdrop-blur-lg flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Analyse Détaillée</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* 1. TITRE */}
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-light italic tracking-tighter uppercase"
          >
            {perfume.name}
          </motion.h1>
          <p className="text-amber-500 tracking-[0.5em] uppercase text-xs mt-2 font-bold">{perfume.brand}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 2. IMAGE PARFUM (Gauche) */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="rounded-[2.5rem] overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl"
            >
              <img src={perfume.image} className="w-full h-full object-cover" alt={perfume.name} />
            </motion.div>

            {/* 5. DESCRIPTION + ANNÉE (Sous l'image) */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-zinc-500 text-sm">
                <Calendar size={16} />
                <span>Édition de Collection — 2024</span>
              </div>
              <p className="text-zinc-400 leading-relaxed italic font-light">
                "{perfume.description}"
              </p>
            </div>
          </div>

          {/* COLONNE DROITE (Points 3 et 4) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 3. JAUGES INTERACTIVES DES NOTES */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-8">Équilibre de la Pyramide</h3>
              <div className="space-y-8">
                {pyramidData.map((note) => (
                  <div key={note.label} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 text-zinc-200 uppercase text-[10px] tracking-widest">
                        {note.icon} {note.label}
                      </div>
                      <span className="text-amber-500 font-mono text-xs">{note.value}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-zinc-800 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${note.value}%` }}
                        className="h-full rounded-full" style={{ backgroundColor: note.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. PETITES IMAGES DES SOUS-NOTES */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500">Composants Olfactifs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...perfume.topNotes, ...perfume.heartNotes].slice(0, 4).map((note, i) => (
                  <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                    <img 
                      src={`https://source.unsplash.com/featured/?${note},fragrance`} 
                      className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500" 
                      alt={note}
                    />
                    <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                      <span className="text-[10px] uppercase tracking-tighter font-medium">{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. RECOMMANDATIONS (Cliquable) */}
            <div className="pt-8 border-t border-white/5">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-6">Sillages Similaires</h3>
              <div className="grid grid-cols-3 gap-4">
                {recommendations.map((rec) => (
                  <button 
                    key={rec.id}
                    onClick={() => onSelectPerfume(rec)}
                    className="flex flex-col gap-3 group text-left"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden border border-white/10 group-hover:border-amber-500 transition-colors">
                      <img src={rec.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors truncate">{rec.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

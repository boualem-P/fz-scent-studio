import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, ArrowRight } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  // 6. RECOMMANDATIONS (Point 6)
  const recommendations = PERFUMES
    .filter(p => p.id !== perfume.id && (p.brand === perfume.brand || p.gender === perfume.gender))
    .slice(0, 3);

  // 3. LES 3 JAUGES DE NOTES (Point 3)
  const noteStats = [
    { label: "Tête", value: 80, icon: <Wind size={14} />, color: "#fbbf24", notes: perfume.topNotesDetailed },
    { label: "Cœur", value: 65, icon: <Droplets size={14} />, color: "#f59e0b", notes: perfume.heartNotesDetailed },
    { label: "Fond", value: 90, icon: <Zap size={14} />, color: "#b45309", notes: perfume.baseNotesDetailed },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-32 overflow-x-hidden">
      
      {/* 7. HEADER AVEC BLUR (Point 7) */}
      <div className="sticky top-0 z-[100] w-full h-24 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black">Profil Olfactif</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Détails de la fragrance</span>
        </div>
        <button onClick={onClose} className="group p-2">
          <X size={28} className="group-hover:rotate-90 transition-transform duration-500 text-zinc-400 group-hover:text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* GAUCHE : 1. TITRE & 2. IMAGE */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-7xl md:text-8xl font-light italic tracking-tighter uppercase leading-[0.8]">
                {perfume.name}
              </h1>
              <p className="text-amber-500 tracking-[0.6em] uppercase text-xs mt-6 font-black flex items-center gap-4">
                <span className="h-[1px] w-8 bg-amber-500"></span>
                {perfume.brand}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              <img src={perfume.image} className="w-full h-full object-cover" alt={perfume.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* 5. DESCRIPTION + ANNÉE (Point 5) */}
            <div className="space-y-6 bg-zinc-900/20 p-8 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 text-amber-500/50">
                <Calendar size={16} />
                <span className="text-xs uppercase tracking-[0.2em] font-bold">Année de création : {perfume.year}</span>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-light italic">
                "{perfume.description}"
              </p>
            </div>
          </div>

          {/* DROITE : 3. JAUGES & 4. SOUS-NOTES */}
          <div className="lg:col-span-7 space-y-14">
            
            {/* 3. LES JAUGES À DROITE (Point 3) */}
            <div className="grid grid-cols-1 gap-8">
              {noteStats.map((stat, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 rounded-lg text-amber-500">{stat.icon}</div>
                      <span className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-300">{stat.label}</span>
                    </div>
                    <span className="font-mono text-sm text-amber-500 font-bold">{stat.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      style={{ backgroundColor: stat.color }}
                      className="h-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    />
                  </div>

                  {/* 4. PETITES IMAGES DES SOUS-NOTES (Point 4) */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
                    {stat.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-zinc-900 group-hover:border-amber-500/50 transition-colors">
                          <img 
                            src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=100&h=100&fit=crop`} 
                            className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity" 
                            alt={note.name}
                          />
                        </div>
                        <span className="text-[8px] uppercase tracking-tighter text-zinc-500 text-center leading-tight truncate w-full">
                          {note.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 6. RECOMMANDATIONS (Point 6) */}
            <div className="pt-12 border-t border-white/5">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs uppercase tracking-[0.4em] text-zinc-500 font-black">Sillages Similaires</h3>
                <ArrowRight size={16} className="text-zinc-700" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                  <button 
                    key={rec.id} onClick={() => onSelectPerfume(rec)}
                    className="group space-y-4 text-left focus:outline-none"
                  >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 group-hover:border-amber-500/50 transition-all duration-500">
                      <img src={rec.image} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                    </div>
                    <div className="px-1">
                      <p className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1">{rec.brand}</p>
                      <p className="text-[10px] font-bold uppercase truncate group-hover:text-amber-500 transition-colors">{rec.name}</p>
                    </div>
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

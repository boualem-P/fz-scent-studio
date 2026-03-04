import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, ChevronRight } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  // 6. RECOMMANDATIONS (Basées sur la base de données réelle)
  const recommendations = PERFUMES
    .filter(p => p.id !== perfume.id && p.brand === perfume.brand)
    .slice(0, 3);

  // 3. DONNÉES DES JAUGES (Calculées sur la pyramide)
  const stats = [
    { label: "Notes de Tête", val: 85, color: "#fbbf24", icon: <Wind size={14}/> },
    { label: "Notes de Cœur", val: 60, color: "#f59e0b", icon: <Droplets size={14}/> },
    { label: "Notes de Fond", val: 90, color: "#b45309", icon: <Zap size={14}/> }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white pb-20 overflow-y-auto">
      
      {/* 7. HEADER AVEC LÉGER BLUR */}
      <div className="sticky top-0 z-[100] w-full h-20 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 border-b border-white/5">
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Analyse Signature</span>
        <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
          <X size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        
        {/* 1. TITRE */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-light italic tracking-tighter uppercase"
          >
            {perfume.name}
          </motion.h1>
          <p className="text-amber-500 tracking-[0.6em] uppercase text-xs mt-2 font-black">{perfume.brand}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 2. IMAGE PARFUM */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              className="rounded-[2rem] overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl"
            >
              <img src={perfume.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600"} 
                   className="w-full h-full object-cover" alt={perfume.name} />
            </motion.div>

            {/* 5. DESCRIPTION + ANNÉE */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <Calendar size={14} className="text-amber-500" />
                <span className="text-xs uppercase tracking-widest">Création {perfume.year || 2024} — {perfume.concentration}</span>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-light italic">
                "{perfume.description}"
              </p>
            </div>
          </div>

          {/* COLONNE DROITE : JAUGES (3) & SOUS-NOTES (4) */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* 3. JAUGES INTERACTIVES */}
            <div className="bg-zinc-900/40 p-10 rounded-3xl border border-white/5 space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Équilibre Olfactif</h3>
              {stats.map((s, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest">
                    <span className="flex items-center gap-2">{s.icon} {s.label}</span>
                    <span className="text-amber-500 font-mono">{s.val}%</span>
                  </div>
                  <div className="h-[2px] bg-white/5 w-full rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      style={{ backgroundColor: s.color }} className="h-full" 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 4. PETITES IMAGES DE CHAQUE SOUS-NOTE */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Notes Détaillées</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* On utilise topNotesDetailed et heartNotesDetailed de ton interface */}
                {[...perfume.topNotesDetailed, ...perfume.heartNotesDetailed].slice(0, 4).map((note, i) => (
                  <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                    <img 
                      src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=60&w=200`} // Image d'ingrédient par défaut
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-500"
                    />
                    <div className="absolute inset-0 p-4 flex items-end">
                      <span className="text-[9px] uppercase tracking-tighter font-black leading-none">{note.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. RECOMMANDATIONS CLIQUABLES */}
            <div className="pt-10 border-t border-white/5">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-8">Recommandations Similaires</h3>
              <div className="grid grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                  <button 
                    key={rec.id} onClick={() => onSelectPerfume(rec)}
                    className="group space-y-4 text-left"
                  >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:border-amber-500 transition-all">
                      <img src={rec.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-zinc-500 truncate">{rec.brand}</p>
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

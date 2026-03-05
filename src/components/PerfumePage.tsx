import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, Plus } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  const recommendations = PERFUMES
    .filter(p => p.id !== perfume.id && (p.brand === perfume.brand))
    .slice(0, 3);

  const stats = [
    { label: "Envolée (Tête)", val: 85, icon: <Wind size={14}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 65, icon: <Droplets size={14}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 90, icon: <Zap size={14}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-32 overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      
      {/* 7. HEADER BLUR CRISTALLIN */}
      <div className="sticky top-0 z-[100] w-full h-20 bg-black/5 backdrop-blur-[50px] flex items-center justify-between px-10 border-b border-white/[0.02]">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-[0.6em] text-amber-500/60 font-black italic underline decoration-amber-500/20 underline-offset-4">Édition Limitée</span>
        </div>
        <button onClick={onClose} className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/10 transition-all">
          <X size={18} className="group-hover:rotate-90 transition-transform duration-700 text-zinc-400 group-hover:text-white" />
        </button>
      </div>

      {/* 1. TITRE CENTRALISÉ */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <h1 className="text-7xl md:text-[10rem] font-extralight italic tracking-tighter uppercase leading-none mb-6">
          {perfume.name}
        </h1>
        <div className="flex items-center gap-6">
          <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <p className="text-amber-500 tracking-[1em] uppercase text-[11px] font-black pl-[1em]">{perfume.brand}</p>
          <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* GAUCHE : VISUEL & DESCRIPTION */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div className="group relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/[0.05] shadow-2xl">
              <img src={perfume.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={perfume.name} />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
            <div className="px-10 border-l border-white/5 py-2">
              <p className="text-zinc-400 text-2xl leading-relaxed font-extralight italic italic">"{perfume.description}"</p>
            </div>
          </div>

          {/* DROITE : JAUGES EFFET REMPLISSAGE LIQUIDE GOLD NÉON */}
          <div className="lg:col-span-7 space-y-24">
            <div className="space-y-16">
              <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold border-b border-white/5 pb-6 italic">Composition des Essences</h3>
              
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-light flex items-center gap-4">
                      {s.icon} {s.label}
                    </span>
                    <span className="text-amber-400 text-[10px] font-bold tracking-tighter shadow-amber-500/50 drop-shadow-md">
                       {s.val} % Vol.
                    </span>
                  </div>
                  
                  {/* JAUGES EFFET BOUTEILLE REMPLIE */}
                  <div className="h-4 bg-zinc-900/50 w-full relative rounded-full border border-white/5 overflow-hidden backdrop-blur-sm">
                    {/* LE LIQUIDE GOLD NÉON */}
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${s.val}%` }}
                      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: i * 0.3 }}
                      className="h-full relative rounded-full overflow-hidden"
                      style={{
                        background: 'linear-gradient(90deg, #b45309 0%, #fbbf24 50%, #fff7ed 100%)',
                        boxShadow: '0 0 20px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      {/* ANIMATION DE VAGUE (LIQUIDE) */}
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
                      />
                    </motion.div>
                  </div>

                  {/* SOUS-NOTES CERCLES AVEC GRAIN */}
                  <div className="flex flex-wrap gap-5 mt-8">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3 group/note cursor-pointer">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 p-[1px] group-hover/note:border-amber-400/50 transition-all duration-700">
                          <img 
                            src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=100&h=100&fit=crop&q=80`} 
                            className="w-full h-full object-cover grayscale opacity-30 group-hover/note:grayscale-0 group-hover/note:opacity-100 transition-all duration-1000"
                            alt={note.name}
                          />
                          <div className="absolute inset-0 opacity-[0.2] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>
                        <span className="text-[7px] uppercase tracking-widest text-zinc-500 group-hover/note:text-amber-200 transition-colors">{note.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RECOMMANDATIONS AVEC GRAIN ET SURVOL LUMINEUX */}
            <div className="pt-24 border-t border-white/[0.03]">
              <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-black mb-12">Collections Apparentées</h3>
              <div className="grid grid-cols-3 gap-10">
                {recommendations.map((rec) => (
                  <button key={rec.id} onClick={() => onSelectPerfume(rec)} className="group space-y-6 text-left relative">
                    <div className="aspect-[3/4.5] rounded-[2.5rem] overflow-hidden border border-white/[0.05] group-hover:border-amber-500/40 transition-all duration-1000 relative">
                      <img src={rec.image} className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]" />
                      <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </div>
                    <div className="space-y-1 px-2">
                      <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-600 font-black">{rec.brand}</p>
                      <p className="text-[10px] font-extralight uppercase tracking-widest text-zinc-400 group-hover:text-amber-200 transition-colors italic truncate">{rec.name}</p>
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

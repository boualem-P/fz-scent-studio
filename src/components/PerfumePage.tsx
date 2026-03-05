import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, Plus } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  // 6. RECOMMANDATIONS (Point 6 - Filtrage par marque)
  const recommendations = PERFUMES
    .filter(p => p.id !== perfume.id && (p.brand === perfume.brand))
    .slice(0, 3);

  // 3. DONNÉES DES JAUGES (Point 3 - Tons Métaux Précieux)
  const stats = [
    { label: "Envolée (Tête)", val: 85, icon: <Wind size={18}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 65, icon: <Droplets size={18}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 92, icon: <Zap size={18}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-32 overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      
      {/* 7. HEADER BLUR CRISTALLIN (Point 7) */}
      <div className="sticky top-0 z-[100] w-full h-20 bg-black/5 backdrop-blur-[50px] flex items-center justify-between px-10 border-b border-white/[0.02]">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-[0.6em] text-amber-500/60 font-black italic underline decoration-amber-500/20 underline-offset-8">Édition de Collection</span>
        </div>
        <button 
          onClick={onClose} 
          className="group w-12 h-12 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/10 transition-all duration-500"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-700 text-zinc-400 group-hover:text-white font-light" />
        </button>
      </div>

      {/* 1. TITRE & MARQUE (CENTRALISÉ & DÉCALÉ HAUT-MILIEU) */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center justify-center py-28 px-6 text-center"
      >
        <h1 className="text-7xl md:text-[11rem] font-extralight italic tracking-tighter uppercase leading-none mb-10">
          {perfume.name}
        </h1>
        <div className="flex items-center gap-10">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-amber-500/90 tracking-[1em] uppercase text-[13px] font-black pl-[1em]">{perfume.brand}</p>
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* 2. & 5. VISUEL GAUCHE (PHOTO + DESCRIPTION) */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="group relative aspect-[3/4.2] rounded-[3.5rem] overflow-hidden border border-white/[0.05] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]"
            >
              <img src={perfume.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={perfume.name} />
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0 duration-1000" />
              
              <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-black/40 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/10">
                <Calendar size={14} className="text-amber-200/70" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-300 italic">Assemblage {perfume.year}</span>
              </div>
            </motion.div>

            <div className="px-10 border-l border-white/5 space-y-8">
              <p className="text-zinc-400 text-3xl leading-relaxed font-extralight italic">
                "{perfume.description}"
              </p>
              <div className="flex items-center gap-4">
                <span className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">Essence : {perfume.concentration}</span>
              </div>
            </div>
          </div>

          {/* 3. & 4. SECTION DROITE (JAUGES BOUTEILLE & SOUS-NOTES) */}
          <div className="lg:col-span-7 space-y-24">
            
            <div className="space-y-20">
              <h3 className="text-[12px] uppercase tracking-[0.6em] text-zinc-600 font-bold border-b border-white/5 pb-8 italic">
                Pyramide Moléculaire
              </h3>
              
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-8">
                    {/* NOM DES NOTES (AGRANDI) */}
                    <span className="text-[16px] md:text-[18px] uppercase tracking-[0.4em] text-zinc-100 font-light flex items-center gap-5">
                      <span className="text-amber-500/50">{s.icon}</span> 
                      {s.label}
                    </span>
                    
                    {/* POURCENTAGE (AGRANDI NÉON) */}
                    <span className="text-amber-400 text-[24px] md:text-[28px] font-extralight tracking-tighter italic" 
                          style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
                       {s.val}<span className="text-[10px] ml-2 opacity-40 font-sans tracking-normal font-bold">% VOL</span>
                    </span>
                  </div>
                  
                  {/* JAUGES EFFET BOUTEILLE (REMPLISSAGE LIQUIDE GOLD) */}
                  <div className="h-5 bg-zinc-950/80 w-full relative rounded-full border border-white/10 overflow-hidden backdrop-blur-md shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${s.val}%` }}
                      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: i * 0.3 }}
                      className="h-full relative rounded-full overflow-hidden shadow-[0_0_35px_rgba(251,191,36,0.4)]"
                      style={{
                        background: 'linear-gradient(90deg, #92400e 0%, #fbbf24 50%, #fffbeb 100%)',
                      }}
                    >
                      {/* ANIMATION VAGUE LIQUIDE */}
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full opacity-40 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                      />
                      <div className="absolute inset-0 inner-glow shadow-[inset_0_0_15px_rgba(255,255,255,0.4)]" />
                    </motion.div>
                  </div>

                  {/* 4. SOUS-NOTES CERCLES (AGRANDI AVEC GRAIN PHOTO) */}
                  <div className="flex flex-wrap gap-8 mt-12">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-4 group/note cursor-pointer">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 p-[1px] group-hover/note:border-amber-400/80 transition-all duration-1000 scale-100 group-hover/note:scale-110">
                          <img 
                            src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=120&h=120&fit=crop&q=80`} 
                            className="w-full h-full object-cover grayscale opacity-20 group-hover/note:grayscale-0 group-hover/note:opacity-100 transition-all duration-1000"
                            alt={note.name}
                          />
                          {/* EFFET GRAIN SUR LES COMPOSANTS */}
                          <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 group-hover/note:text-amber-200 transition-colors font-medium">
                          {note.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 6. RECOMMANDATIONS (EFFET GRAIN PHOTO) */}
            <div className="pt-24 border-t border-white/[0.04]">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.6em] text-zinc-700 font-black italic">Sillages Analogues</h3>
                <Plus size={14} className="text-zinc-800" />
              </div>
              
              <div className="grid grid-cols-3 gap-10">
                {recommendations.map((rec) => (
                  <button key={rec.id} onClick={() => onSelectPerfume(rec)} className="group space-y-6 text-left relative">
                    <div className="aspect-[3/4.6] rounded-[2.5rem] overflow-hidden border border-white/[0.05] group-hover:border-amber-500/40 transition-all duration-1000 relative bg-zinc-900">
                      <img src={rec.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]" />
                      
                      {/* FILM NOISE OVERLAY */}
                      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                    <div className="space-y-2 px-2">
                      <p className="text-[8px] uppercase tracking-[0.5em] text-zinc-600 font-black italic">{rec.brand}</p>
                      <p className="text-[11px] font-extralight uppercase tracking-[0.2em] text-zinc-300 group-hover:text-amber-200 transition-colors truncate italic leading-none">{rec.name}</p>
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

import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, Plus } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  // 6. RECOMMANDATIONS (Point 6)
  const recommendations = PERFUMES
    .filter(p => p.id !== perfume.id && (p.brand === perfume.brand))
    .slice(0, 3);

  // 3. SECTION JAUGES (Point 3 - Tons Métaux Précieux)
  const stats = [
    { label: "Envolée (Tête)", val: 85, color: "#D4AF37", icon: <Wind size={14}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 60, color: "#C0C0C0", icon: <Droplets size={14}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 90, color: "#CD7F32", icon: <Zap size={14}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-32 overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      
      {/* 7. HEADER BLUR CRISTALLIN (Point 7) */}
      <div className="sticky top-0 z-[100] w-full h-20 bg-black/10 backdrop-blur-[40px] flex items-center justify-between px-10 border-b border-white/[0.03]">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-[0.6em] text-amber-500/60 font-black italic">Maison de Haute Parfumerie</span>
        </div>
        <button 
          onClick={onClose} 
          className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/10 transition-all duration-500"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-700 font-light text-zinc-400 group-hover:text-white" />
        </button>
      </div>

      {/* 1. TITRE & SOUS-TITRE (DÉCALÉS HAUT MILIEU-CENTRE) */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center justify-center py-24 px-6 text-center"
      >
        <h1 className="text-7xl md:text-[11rem] font-extralight italic tracking-tighter uppercase leading-none mb-8">
          {perfume.name}
        </h1>
        <div className="flex items-center gap-8">
          <span className="h-[1px] w-12 bg-white/10" />
          <p className="text-amber-500/90 tracking-[0.9em] uppercase text-[12px] font-black">{perfume.brand}</p>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* 2. & 5. IMAGE ET DESCRIPTION (Gauche) */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="group relative aspect-[3/4.2] rounded-[3.5rem] overflow-hidden border border-white/[0.05] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]"
            >
              <img src={perfume.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={perfume.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
              
              <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-black/40 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10">
                <Calendar size={14} className="text-amber-200/70" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-300 italic">Distillation {perfume.year}</span>
              </div>
            </motion.div>

            <div className="px-10 border-l border-white/5 space-y-6">
              <p className="text-zinc-400 text-2xl leading-relaxed font-extralight italic">
                "{perfume.description}"
              </p>
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold italic">Concentration : {perfume.concentration}</p>
            </div>
          </div>

          {/* 3. & 4. JAUGES & SOUS-NOTES (Droite) */}
          <div className="lg:col-span-7 space-y-24">
            
            <div className="space-y-16">
              <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold border-b border-white/5 pb-6">Architecture Moléculaire</h3>
              
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-6 px-1">
                    <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-400 font-light flex items-center gap-4">
                      <span className="p-2 rounded-full bg-white/[0.03]">{s.icon}</span>
                      {s.label}
                    </span>
                    <span className="text-amber-200/40 font-mono text-[9px]">{s.val}% VOL</span>
                  </div>
                  
                  {/* Jauge Fil de Luxe */}
                  <div className="h-[1px] bg-white/[0.05] w-full relative">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.2 }}
                      style={{ backgroundColor: s.color }} 
                      className="h-full relative shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />
                    </motion.div>
                  </div>

                  {/* 4. SOUS-NOTES CERCLES (Passage Gris -> Couleur Luxe) */}
                  <div className="flex flex-wrap gap-6 mt-10">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-4 group/note">
                        <div className="relative w-14 h-14 rounded-full p-[1px] bg-white/10 group-hover/note:bg-amber-500/50 transition-colors duration-700">
                          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-black relative">
                            <img 
                              src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=100&h=100&fit=crop&q=80`} 
                              className="w-full h-full object-cover grayscale opacity-20 group-hover/note:grayscale-0 group-hover/note:opacity-100 transition-all duration-1000"
                              alt={note.name}
                            />
                            {/* Effet Grain sur les petites images */}
                            <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                          </div>
                        </div>
                        <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-600 group-hover/note:text-amber-200 transition-colors duration-500">{note.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 6. RECOMMANDATIONS AVEC EFFET GRAIN (Film Grain) */}
            <div className="pt-24 border-t border-white/[0.03]">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold italic">Sillages Analogues</h3>
                <Plus size={14} className="text-zinc-800" />
              </div>
              
              <div className="grid grid-cols-3 gap-10">
                {recommendations.map((rec) => (
                  <button 
                    key={rec.id} onClick={() => onSelectPerfume(rec)}
                    className="group space-y-6 text-left relative"
                  >
                    <div className="aspect-[3/4.5] rounded-[2.5rem] overflow-hidden border border-white/[0.05] group-hover:border-amber-500/30 transition-all duration-1000 relative">
                      <img src={rec.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]" />
                      
                      {/* EFFET GRAIN PHOTO (Point 8) */}
                      <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                    <div className="space-y-2 px-2">
                      <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-600 font-black">{rec.brand}</p>
                      <p className="text-[11px] font-extralight uppercase tracking-[0.2em] text-zinc-300 group-hover:text-amber-200 transition-colors truncate italic">{rec.name}</p>
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

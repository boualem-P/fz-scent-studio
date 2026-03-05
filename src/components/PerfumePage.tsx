import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, Plus } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  // 6. RECOMMANDATIONS (Point 6 - Filtrage par marque ou famille)
  const recommendations = PERFUMES
    .filter(p => p.id !== perfume.id && (p.brand === perfume.brand))
    .slice(0, 3);

  // 3. SECTION JAUGES (Point 3 - Tons Champagne & Bronze)
  const stats = [
    { label: "Envolée (Tête)", val: 85, color: "#D4AF37", icon: <Wind size={14}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 60, color: "#C0C0C0", icon: <Droplets size={14}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 90, color: "#CD7F32", icon: <Zap size={14}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-32 overflow-x-hidden selection:bg-amber-200 selection:text-black">
      
      {/* 7. HEADER BLUR CRISTALLIN (Effet verre dépoli haut de gamme) */}
      <div className="sticky top-0 z-[100] w-full h-24 bg-black/10 backdrop-blur-[30px] flex items-center justify-between px-12 border-b border-white/[0.03]">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.6em] text-amber-500/80 font-black">Haute Expertise</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-light">Composition N° {perfume.id.split('-')[1] || '01'}</span>
        </div>
        <button 
          onClick={onClose} 
          className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-all duration-500"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-700 font-light" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-16">
        
        {/* 1. TITRE ÉDITORIAL (Typographie Luxe) */}
        <div className="mb-20 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-extralight italic tracking-tighter uppercase leading-[0.8] mb-6"
          >
            {perfume.name}
          </motion.h1>
          <div className="flex items-center justify-center lg:justify-start gap-6">
            <span className="h-[1px] w-16 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <p className="text-amber-500/90 tracking-[0.8em] uppercase text-[11px] font-black">{perfume.brand}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* 2. & 5. IMAGE ET DESCRIPTION (Gauche) */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="group relative aspect-[3/4.5] rounded-[4rem] overflow-hidden border border-white/[0.05] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
            >
              <img src={perfume.image} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt={perfume.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <Calendar size={14} className="text-amber-200" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-200 italic">Cru {perfume.year}</span>
              </div>
            </motion.div>

            <div className="px-6 border-l border-amber-500/20 py-2">
              <p className="text-zinc-400 text-xl leading-relaxed font-extralight italic">
                "{perfume.description}"
              </p>
            </div>
          </div>

          {/* 3. & 4. JAUGES & SOUS-NOTES (Droite) */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* JAUGES MINIMALISTES */}
            <div className="space-y-12">
              <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">Structure du Sillage</h3>
              
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-4 px-1">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-light flex items-center gap-3">
                      {s.icon} {s.label}
                    </span>
                    <span className="text-amber-200/50 font-mono text-[10px] italic">{s.val}% Concentration</span>
                  </div>
                  
                  {/* Jauge ultra-fine luxe */}
                  <div className="h-[1px] bg-white/[0.05] w-full relative">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ backgroundColor: s.color }} 
                      className="h-full relative shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
                    </motion.div>
                  </div>

                  {/* 4. SOUS-NOTES EN CERCLES ORGANIQUES */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3">
                        <div className="relative w-16 h-16 rounded-full p-[1px] bg-gradient-to-b from-white/10 to-transparent">
                          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-black">
                            <img 
                              src={`https://images.unsplash.com/photo-1557170343-bc4236b8564e?w=100&h=100&fit=crop&q=80`} 
                              className="w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-crosshair"
                              alt={note.name}
                            />
                          </div>
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-medium">{note.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 6. RECOMMANDATIONS (Galerie prestige) */}
            <div className="pt-20 border-t border-white/[0.03]">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">Variations de la Maison</h3>
                <Plus size={16} className="text-zinc-800" />
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                {recommendations.map((rec) => (
                  <button 
                    key={rec.id} onClick={() => onSelectPerfume(rec)}
                    className="group space-y-6 text-left"
                  >
                    <div className="aspect-[3/4.5] rounded-[2.5rem] overflow-hidden border border-white/[0.05] group-hover:border-amber-500/30 transition-all duration-1000">
                      <img src={rec.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                    </div>
                    <div className="space-y-1 px-2">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 font-bold">{rec.brand}</p>
                      <p className="text-[10px] font-light uppercase tracking-widest group-hover:text-amber-200 transition-colors truncate">{rec.name}</p>
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

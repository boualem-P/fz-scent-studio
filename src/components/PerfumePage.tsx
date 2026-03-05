import { motion } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, ChevronRight } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";
import { useRef, useEffect, useState } from "react";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // --- DÉTECTEUR DE SCROLL POUR L'EFFET BLUR (Point 7) ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // RECOMMANDATIONS AMÉLIORÉES
  const recommendations = PERFUMES.filter((p) => {
    if (p.id === perfume.id) return false;
    return p.brand === perfume.brand || p.topNotes.some(n => perfume.topNotes.includes(n));
  }).slice(0, 8);

  const stats = [
    { label: "Envolée (Tête)", val: 85, icon: <Wind size={18}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 65, icon: <Droplets size={18}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 92, icon: <Zap size={18}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-40 overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      
      {/* 7. HEADER AVEC EFFET BLUR DYNAMIQUE AU SCROLL */}
      <header 
        className={`sticky top-0 z-[100] w-full h-20 flex items-center justify-between px-10 transition-all duration-700 border-b ${
          isScrolled 
          ? "bg-black/40 backdrop-blur-[25px] border-white/5 shadow-2xl" 
          : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex flex-col">
          <span className={`text-[8px] uppercase tracking-[0.6em] font-black italic transition-colors duration-500 ${isScrolled ? "text-amber-500" : "text-amber-500/40"}`}>
            Signature Collection
          </span>
          {isScrolled && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] uppercase tracking-widest text-zinc-500 font-light">
              {perfume.name}
            </motion.span>
          )}
        </div>
        <button 
          onClick={onClose} 
          className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/20 transition-all"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-500 text-zinc-400 group-hover:text-white" />
        </button>
      </header>

      {/* 1. TITRE CENTRALISÉ HAUT-MILIEU */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
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
            <motion.div className="group relative aspect-[3/4.2] rounded-[3.5rem] overflow-hidden border border-white/[0.05] shadow-2xl">
              <img src={perfume.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" alt={perfume.name} />
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
              <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-black/40 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/10">
                <Calendar size={14} className="text-amber-200/70" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-300 italic italic">Assemblage {perfume.year}</span>
              </div>
            </motion.div>
            <div className="px-10 border-l border-white/5 py-2">
              <p className="text-zinc-400 text-3xl leading-relaxed font-extralight italic italic">"{perfume.description}"</p>
            </div>
          </div>

          {/* DROITE : JAUGES & NOTES (TAILLES AGRANDIES) */}
          <div className="lg:col-span-7 space-y-24">
            <div className="space-y-20">
              <h3 className="text-[12px] uppercase tracking-[0.6em] text-zinc-600 font-bold border-b border-white/5 pb-8 italic italic">Pyramide Olfactive</h3>
              
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-6 px-1">
                    <span className="text-[16px] md:text-[18px] uppercase tracking-[0.4em] text-zinc-200 font-light flex items-center gap-5">
                      <span className="text-amber-500/50">{s.icon}</span> {s.label}
                    </span>
                    <span className="text-amber-400 text-[24px] md:text-[28px] font-extralight tracking-tighter italic" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.4)' }}>
                       {s.val}<span className="text-[10px] ml-1 opacity-50 font-bold">% VOL</span>
                    </span>
                  </div>
                  
                  {/* JAUGES BOUTEILLE GOLD NÉON */}
                  <div className="h-5 bg-zinc-950 w-full relative rounded-full border border-white/10 overflow-hidden backdrop-blur-md">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: i * 0.3 }}
                      className="h-full relative rounded-full overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                      style={{ background: 'linear-gradient(90deg, #92400e 0%, #fbbf24 50%, #fffbeb 100%)' }}
                    >
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full opacity-40 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                    </motion.div>
                  </div>

                  {/* SOUS-NOTES CERCLES */}
                  <div className="flex flex-wrap gap-8 mt-12">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-4 group/note cursor-pointer">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 p-[1px] group-hover/note:border-amber-400/70 transition-all duration-1000 scale-100 group-hover/note:scale-110">
                          <img src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=120&h=120&fit=crop&q=80`} 
                            className="w-full h-full object-cover grayscale opacity-20 group-hover/note:grayscale-0 group-hover/note:opacity-100 transition-all duration-1000" alt={note.name} />
                          <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 group-hover/note:text-amber-200 transition-colors font-medium">{note.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CARROUSSEL DE RECOMMANDATIONS --- */}
        <div className="mt-40 pt-20 border-t border-white/[0.04]">
          <div className="flex items-center justify-between mb-16 px-4">
            <h3 className="text-[11px] uppercase tracking-[0.6em] text-zinc-600 font-black italic">Sillages Analogues</h3>
            <div className="flex gap-4 items-center">
               <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-light italic">Slide to explore</span>
               <ChevronRight size={14} className="text-zinc-700" />
            </div>
          </div>

          <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -((recommendations.length * 340) - window.innerWidth + 100) }}
              className="flex gap-10 w-max pb-10"
            >
              {recommendations.map((rec) => (
                <motion.button 
                  key={rec.id} onClick={() => onSelectPerfume(rec)}
                  className="group w-[300px] text-left space-y-6"
                  whileHover={{ y: -10 }}
                >
                  <div className="aspect-[3/4.6] rounded-[2.5rem] overflow-hidden border border-white/[0.05] group-hover:border-amber-500/40 transition-all duration-1000 relative bg-zinc-900">
                    <img src={rec.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]" />
                    <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  </div>
                  <div className="space-y-2 px-4">
                    <p className="text-[8px] uppercase tracking-[0.5em] text-zinc-600 font-black italic italic">{rec.brand}</p>
                    <p className="text-[12px] font-extralight uppercase tracking-[0.3em] text-zinc-300 group-hover:text-amber-200 transition-colors truncate italic italic">{rec.name}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

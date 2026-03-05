import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, ChevronRight, Plus } from "lucide-react";
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

  // Détecteur de scroll pour l'effet Blur du Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Algorithme de recommandations (Même marque ou notes communes)
  const recommendations = PERFUMES.filter((p) => {
    if (p.id === perfume.id) return false;
    return p.brand === perfume.brand || p.topNotes.some(n => perfume.topNotes.includes(n));
  }).slice(0, 8);

  const stats = [
    { label: "Envolée (Tête)", val: 85, icon: <Wind size={20}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 65, icon: <Droplets size={20}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 92, icon: <Zap size={20}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-40 overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      
      {/* --- HEADER AVEC EFFET FLOU GIVRÉ DYNAMIQUE --- */}
      <header className="sticky top-0 z-[100] w-full h-20 flex items-center justify-between px-10 transition-all duration-500">
        {/* Calque de flou forcé (méthode la plus compatible) */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10 bg-zinc-900/60 backdrop-blur-[30px] border-b border-white/10 shadow-2xl"
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col relative z-10">
          <span className={`text-[9px] uppercase tracking-[0.6em] font-black italic transition-colors duration-500 ${isScrolled ? "text-amber-500" : "text-amber-500/40"}`}>
            Signature Collection
          </span>
          {isScrolled && (
            <motion.span 
              initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="text-[10px] uppercase tracking-widest text-white/80 font-light mt-1"
            >
              {perfume.name}
            </motion.span>
          )}
        </div>

        <button 
          onClick={onClose} 
          className="relative z-10 group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/20 transition-all"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-500 text-white" />
        </button>
      </header>

      {/* --- TITRE CENTRALISÉ HAUT-MILIEU --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <h1 className="text-7xl md:text-[11rem] font-extralight italic tracking-tighter uppercase leading-none mb-8">
          {perfume.name}
        </h1>
        <div className="flex items-center gap-10">
          <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent to-white/30" />
          <p className="text-amber-500 tracking-[1em] uppercase text-[12px] font-black pl-[1em]">{perfume.brand}</p>
          <div className="h-[0.5px] w-20 bg-gradient-to-l from-transparent to-white/30" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* --- GAUCHE : VISUEL & DESCRIPTION --- */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div className="group relative aspect-[3/4.5] rounded-[4rem] overflow-hidden border border-white/[0.05] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
              <img src={perfume.image} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={perfume.name} />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-black/40 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/10">
                <Calendar size={14} className="text-amber-200/70" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-300 italic italic">Assemblage {perfume.year}</span>
              </div>
            </motion.div>
            <div className="px-10 border-l border-white/5 py-2">
              <p className="text-zinc-400 text-3xl leading-relaxed font-extralight italic italic">"{perfume.description}"</p>
            </div>
          </div>

          {/* --- DROITE : JAUGES & NOTES (AGRANDIES + GOLD NÉON) --- */}
          <div className="lg:col-span-7 space-y-24">
            <div className="space-y-20">
              <h3 className="text-[12px] uppercase tracking-[0.6em] text-zinc-600 font-bold border-b border-white/5 pb-8 italic italic">Architecture des Essences</h3>
              
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-8 px-1">
                    <span className="text-[18px] uppercase tracking-[0.4em] text-zinc-200 font-light flex items-center gap-6">
                      <span className="text-amber-500/50">{s.icon}</span> {s.label}
                    </span>
                    <span className="text-amber-400 text-[28px] font-extralight tracking-tighter italic" style={{ textShadow: '0 0 25px rgba(251, 191, 36, 0.5)' }}>
                       {s.val}<span className="text-[11px] ml-2 opacity-40 font-bold tracking-normal">% VOL</span>
                    </span>
                  </div>
                  
                  {/* JAUGES BOUTEILLE GOLD NÉON */}
                  <div className="h-6 bg-zinc-950 w-full relative rounded-full border border-white/10 overflow-hidden backdrop-blur-md shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: i * 0.3 }}
                      className="h-full relative rounded-full overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                      style={{ background: 'linear-gradient(90deg, #92400e 0%, #fbbf24 50%, #fffbeb 100%)' }}
                    >
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full opacity-50 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                    </motion.div>
                  </div>

                  {/* SOUS-NOTES CERCLES (AGRANDIS AVEC GRAIN PHOTO) */}
                  <div className="flex flex-wrap gap-8 mt-12">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-4 group/note cursor-pointer">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 p-[1px] group-hover/note:border-amber-400/80 transition-all duration-1000 scale-100 group-hover/note:scale-110">
                          <img src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=120&h=120&fit=crop&q=80`} 
                            className="w-full h-full object-cover grayscale opacity-20 group-hover/note:grayscale-0 group-hover/note:opacity-100 transition-all duration-1000" alt={note.name} />
                          <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover/note:text-amber-200 transition-colors font-medium">{note.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CARROUSSEL DE RECOMMANDATIONS FLUIDE --- */}
        <div className="mt-48 pt-24 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-16 px-4">
            <div className="space-y-2">
              <h3 className="text-[12px] uppercase tracking-[0.6em] text-zinc-600 font-black italic italic">Collections Analogues</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/40 italic">Inspirations de la maison</p>
            </div>
            <div className="flex gap-4 items-center">
               <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-light italic italic">Slide to explore</span>
               <ChevronRight size={16} className="text-zinc-700" />
            </div>
          </div>

          <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -((recommendations.length * 360) - window.innerWidth + 100) }}
              className="flex gap-12 w-max pb-16 px-4"
            >
              {recommendations.map((rec) => (
                <motion.button 
                  key={rec.id} onClick={() => onSelectPerfume(rec)}
                  className="group w-[320px] text-left space-y-8"
                  whileHover={{ y: -15 }}
                >
                  <div className="aspect-[3/4.6] rounded-[3rem] overflow-hidden border border-white/[0.05] group-hover:border-amber-500/40 transition-all duration-1000 relative bg-zinc-900 shadow-2xl">
                    <img src={rec.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2.5s]" />
                    <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-end p-8">
                       <Plus size={20} className="text-amber-500" />
                    </div>
                  </div>
                  <div className="space-y-2 px-4">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-black italic italic">{rec.brand}</p>
                    <p className="text-[13px] font-extralight uppercase tracking-[0.2em] text-zinc-300 group-hover:text-amber-200 transition-colors truncate italic italic">{rec.name}</p>
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

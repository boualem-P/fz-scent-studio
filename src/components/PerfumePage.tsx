import { motion } from "framer-motion";
import { X, Wind, Droplets, Sparkles, Calendar, Award, ArrowRight } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/perfumes";
import { useEffect, useMemo } from "react";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume | null) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [perfume]);

  const recommendations = useMemo(() => {
    return PERFUMES
      .filter(p => p.id !== perfume.id && (p.gender === perfume.gender || p.gender === "mixte"))
      .map(p => {
        const currentNotes = new Set([...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes]);
        const targetNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes];
        const commonNotes = targetNotes.filter(n => currentNotes.has(n));
        return { perfume: p, score: commonNotes.length };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [perfume]);

  const stats = [
    { label: "Notes de Tête", value: 35, icon: <Wind size={16} />, color: "from-amber-200 to-amber-500", notes: perfume.topNotesDetailed },
    { label: "Notes de Cœur", value: 45, icon: <Droplets size={16} />, color: "from-amber-400 to-amber-600", notes: perfume.heartNotesDetailed },
    { label: "Notes de Fond", value: 20, icon: <Sparkles size={16} />, color: "from-amber-600 to-amber-800", notes: perfume.baseNotesDetailed },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30 pb-20">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500 font-black mb-1">Collection Privée</span>
          <h2 className="text-xl font-light tracking-[0.2em] uppercase">{perfume.brand}</h2>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full border border-white/10 bg-black/50 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-500 group">
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
      </header>

      <main className="container mx-auto px-6 pt-32">
        {/* SECTION PRINCIPALE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,1)] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-50"></div>
            {perfume.image ? (
              <img src={perfume.image} alt={perfume.name} className="w-3/4 h-3/4 object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
            ) : (
              <div className="text-amber-500/5 text-[15rem] font-serif uppercase">{perfume.name[0]}</div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col">
            <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-6 leading-none">{perfume.name}</h1>
            <div className="flex items-center gap-4 mb-10">
              <span className="px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-bold uppercase tracking-widest">{perfume.concentration}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
            <p className="text-2xl text-zinc-400 font-light leading-relaxed italic mb-16 opacity-80">"{perfume.description}"</p>

            {/* JAUGES ET INGRÉDIENTS DÉTAILLÉS */}
            <div className="space-y-20">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-amber-500">{stat.icon}</div>
                      <span className="text-sm tracking-[0.2em] uppercase font-semibold text-zinc-300">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-serif italic text-amber-500">{stat.value}%</span>
                  </div>
                  
                  {/* BARRE EPAISSE */}
                  <div className="h-4 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-white/5 mb-8">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stat.value}%` }} transition={{ duration: 2, ease: "circOut" }} className={`h-full bg-gradient-to-r ${stat.color} shadow-[0_0_15px_rgba(251,191,36,0.3)]`} />
                  </div>

                  {/* GRILLE D'IMAGES DES INGRÉDIENTS (EFFET WOOW) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {stat.notes.map((note, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="relative group/note cursor-default"
                      >
                        <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 mb-2">
                          <img 
                            src={`https://source.unsplash.com/400x400/?${note.name},plant,nature`} 
                            alt={note.name}
                            className="w-full h-full object-cover opacity-60 group-hover/note:opacity-100 group-hover/note:scale-110 transition-all duration-700 grayscale group-hover/note:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        </div>
                        <p className="text-[10px] text-center uppercase tracking-widest font-bold text-zinc-500 group-hover/note:text-amber-500 transition-colors">{note.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RECOMMANDATIONS */}
        <section className="mt-32 border-t border-white/5 pt-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extralight tracking-tight mb-2">Dans le même esprit</h3>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map(({ perfume: p }, index) => (
              <motion.div key={p.id} onClick={() => onSelectPerfume(p)} className="group cursor-pointer p-8 rounded-3xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all hover:border-amber-500/20">
                <div className="aspect-square mb-8 overflow-hidden rounded-2xl bg-black/40 p-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em] mb-2">{p.brand}</p>
                    <h4 className="text-2xl font-light tracking-tight">{p.name}</h4>
                  </div>
                  <ArrowRight className="text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-2 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PerfumePage;

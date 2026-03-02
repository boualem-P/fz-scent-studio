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
  
  // Remonter en haut de page quand on change de parfum
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [perfume]);

  // Algorithme pour trouver des recommandations similaires
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
    { label: "Notes de Tête", value: 35, icon: <Wind size={16} />, color: "from-amber-200 to-amber-500" },
    { label: "Notes de Cœur", value: 45, icon: <Droplets size={16} />, color: "from-amber-400 to-amber-600" },
    { label: "Notes de Fond", value: 20, icon: <Sparkles size={16} />, color: "from-amber-600 to-amber-800" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold mb-1">Haute Parfumerie</span>
          <h2 className="text-xl font-light tracking-widest uppercase">{perfume.brand}</h2>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full border border-white/10 bg-black/50 flex items-center justify-center hover:bg-white/10 transition-all group">
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      <main className="container mx-auto px-6 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* IMAGE */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border border-white/5 flex items-center justify-center shadow-2xl">
            {perfume.image ? (
              <img src={perfume.image} alt={perfume.name} className="w-4/5 h-4/5 object-contain" />
            ) : (
              <div className="text-amber-500/10 text-9xl font-serif">{perfume.brand[0]}</div>
            )}
          </motion.div>

          {/* INFOS */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">{perfume.name}</h1>
            <div className="flex gap-6 mb-8 text-zinc-500 text-xs tracking-widest uppercase border-b border-white/10 pb-6">
              <span>{perfume.year}</span>
              <span className="text-amber-500/50">•</span>
              <span>{perfume.gender}</span>
              <span className="text-amber-500/50">•</span>
              <span>{perfume.concentration}</span>
            </div>
            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-12 italic">"{perfume.description}"</p>

            {/* JAUGES */}
            <div className="space-y-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs tracking-widest uppercase text-zinc-400">{stat.label}</span>
                    <span className="text-amber-500 font-serif italic text-lg">{stat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stat.value}%` }} transition={{ duration: 1.5 }} className={`h-full bg-gradient-to-r ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION RECOMMANDATIONS SIMILAIRES */}
        <section className="border-t border-white/10 pt-16 pb-32">
          <div className="flex flex-col mb-12">
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 text-center">Poursuivre l'exploration</span>
            <h3 className="text-3xl font-light text-center tracking-tight">Recommandations Similaires</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(({ perfume: p }, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectPerfume(p)}
                className="group cursor-pointer bg-zinc-900/30 border border-white/5 rounded-xl p-6 hover:bg-zinc-800/50 transition-all hover:border-amber-500/30"
              >
                <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-black flex items-center justify-center p-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">{p.brand}</h4>
                    <p className="text-lg font-light">{p.name}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <ArrowRight size={14} />
                  </div>
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

import { motion } from "framer-motion";
import { X, Wind, Droplets, Sparkles, Calendar, Award } from "lucide-react";
import { Perfume, NOTE_LABELS } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume | null) => void;
}

const PerfumePage = ({ perfume, onClose }: PerfumePageProps) => {
  // Simulation de pourcentages pour le design des jauges
  const stats = [
    { label: "Notes de Tête", value: 35, icon: <Wind size={16} />, color: "from-amber-200 to-amber-500" },
    { label: "Notes de Cœur", value: 45, icon: <Droplets size={16} />, color: "from-amber-400 to-amber-600" },
    { label: "Notes de Fond", value: 20, icon: <Sparkles size={16} />, color: "from-amber-600 to-amber-800" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30">
      {/* HEADER FIXE AVEC EFFET FLOU */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold mb-1">Haute Parfumerie</span>
          <h2 className="text-xl font-light tracking-widest uppercase">{perfume.brand}</h2>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full border border-white/10 bg-black/50 flex items-center justify-center hover:bg-white/10 transition-all group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* SECTION IMAGE - EFFET ÉCRIN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border border-white/5 flex items-center justify-center group shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
            {perfume.image ? (
              <img 
                src={perfume.image} 
                alt={perfume.name}
                className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="text-amber-500/20 text-9xl font-serif">P</div>
            )}
            <div className="absolute bottom-8 left-8">
              <span className="px-4 py-1 border border-amber-500/30 rounded-full text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md text-amber-500">
                {perfume.concentration}
              </span>
            </div>
          </motion.div>

          {/* SECTION INFOS - TYPOGRAPHIE LUXE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">{perfume.name}</h1>
            
            <div className="flex gap-6 mb-8 text-zinc-500 text-xs tracking-widest uppercase border-b border-white/10 pb-6">
              <span className="flex items-center gap-2"><Calendar size={14}/> {perfume.year}</span>
              <span className="flex items-center gap-2"><Award size={14}/> {perfume.gender}</span>
            </div>

            <p className="text-lg text-zinc-400 leading-relaxed font-light mb-12 italic">
              "{perfume.description}"
            </p>

            {/* JAUGES OLFACTIVES ÉPAISSES AVEC POURCENTAGES */}
            <div className="space-y-8 mb-12">
              <h3 className="text-xs tracking-[0.3em] uppercase text-amber-500 font-bold">Architecture du Parfum</h3>
              {stats.map((stat, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium">
                      {stat.icon} {stat.label}
                    </span>
                    <span className="text-amber-500 font-serif italic text-lg">{stat.value}%</span>
                  </div>
                  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* DÉTAILS DES NOTES - STYLE ÉLÉGANT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
              <div>
                <h4 className="text-[10px] tracking-widest uppercase text-zinc-500 mb-4">Tête</h4>
                <div className="flex flex-wrap gap-2">
                  {perfume.topNotesDetailed.map((n, i) => (
                    <span key={i} className="text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded-md">{n.name}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] tracking-widest uppercase text-zinc-500 mb-4">Cœur</h4>
                <div className="flex flex-wrap gap-2">
                  {perfume.heartNotesDetailed.map((n, i) => (
                    <span key={i} className="text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded-md">{n.name}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] tracking-widest uppercase text-zinc-500 mb-4">Fond</h4>
                <div className="flex flex-wrap gap-2">
                  {perfume.baseNotesDetailed.map((n, i) => (
                    <span key={i} className="text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded-md">{n.name}</span>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PerfumePage;

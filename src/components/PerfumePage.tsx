import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Heart } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume | null;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll à chaque changement de parfum
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  }, [perfume?.id]);

  if (!perfume) return null;

  const suggestions = perfumes
    .filter(p => p.id !== perfume.id)
    .filter(p => p.brand === perfume.brand || p.gender === perfume.gender)
    .slice(0, 6);

  return (
    <div 
      ref={scrollRef}
      className="h-full w-full bg-[#1D1E1F] text-white pb-20 font-sans overflow-y-auto"
    >
      {/* HEADER */}
      <nav className="sticky top-0 z-[1100] bg-[#1D1E1F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button onClick={onClose} className="p-2 text-white/70 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 leading-none mb-1">{perfume.brand}</h1>
          <p className="text-xl font-serif italic text-white leading-none">{perfume.name}</p>
        </div>
        <div className="w-10" /> {/* Spacer pour l'équilibre */}
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* IMAGE ET ACCORDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 flex items-center justify-center p-12">
             <img src={perfume.image} alt={perfume.name} className="max-h-full w-auto object-contain drop-shadow-2xl" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Accords Principaux</h3>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${100 - (i * 15)}%` }} 
                  className="h-full bg-primary/60" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* SUGGESTIONS (La partie qui posait problème) */}
        <section className="space-y-6 pt-10 border-t border-white/5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Suggestions similaires</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
            {suggestions.map((suggested) => (
              <div 
                key={suggested.id} 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Click sur:", suggested.name);
                    onSelectPerfume(suggested);
                }}
                className="min-w-[160px] bg-white/5 rounded-2xl border border-white/5 p-4 flex flex-col items-center cursor-pointer hover:bg-white/10 hover:border-primary/30 transition-all group pointer-events-auto"
              >
                 <div className="h-24 w-full flex items-center justify-center mb-4 pointer-events-none">
                    <img src={suggested.image} alt={suggested.name} className="max-h-full object-contain group-hover:scale-110 transition-transform" />
                 </div>
                 <div className="text-center pointer-events-none">
                    <p className="text-[10px] font-bold text-white uppercase truncate w-32">{suggested.name}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerfumePage;

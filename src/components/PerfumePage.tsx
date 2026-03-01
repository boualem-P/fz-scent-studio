import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Calendar } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume | null;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Forcer le scroll en haut au montage (très important)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [perfume?.id]);

  if (!perfume) return null;

  // Filtrage des suggestions (même marque ou même genre)
  const suggestions = perfumes
    .filter(p => p.id !== perfume.id)
    .filter(p => p.brand === perfume.brand || p.gender === perfume.gender)
    .slice(0, 6);

  return (
    <div 
      ref={scrollRef}
      className="h-full w-full bg-[#1D1E1F] text-white pb-20 overflow-y-auto"
    >
      {/* HEADER FIXE */}
      <nav className="sticky top-0 z-[50] bg-[#1D1E1F]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 mb-1">{perfume.brand}</h1>
          <p className="text-xl font-serif italic text-white">{perfume.name}</p>
        </div>
        <div className="w-10" /> 
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* VISUEL PRINCIPAL */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-12">
             <img src={perfume.image} alt={perfume.name} className="max-h-full w-auto object-contain drop-shadow-2xl" />
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Accords Olfactifs</h3>
            {[90, 75, 60, 45].map((val, i) => (
              <div key={i} className="h-1.5 w-full bg-white/5 rounded-full">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${val}%` }} 
                  className="h-full bg-primary/40 rounded-full" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION SUGGESTIONS (Boutons cliquables) */}
        <section className="pt-10 border-t border-white/5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6">Vous aimerez aussi</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
            {suggestions.map((suggested) => (
              <button 
                key={suggested.id} 
                onClick={() => onSelectPerfume(suggested)}
                className="min-w-[160px] bg-white/5 rounded-2xl border border-white/5 p-4 flex flex-col items-center gap-4 hover:bg-white/10 hover:border-primary/50 transition-all snap-start focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                 <div className="h-24 w-full flex items-center justify-center">
                    <img src={suggested.image} alt={suggested.name} className="max-h-full object-contain pointer-events-none" />
                 </div>
                 <div className="text-center">
                    <p className="text-[8px] font-bold text-primary/60 uppercase">{suggested.brand}</p>
                    <p className="text-[10px] font-bold text-white uppercase truncate w-32">{suggested.name}</p>
                 </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerfumePage;

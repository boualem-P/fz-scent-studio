import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Droplets } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume | null;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [perfume?.id]);

  if (!perfume) return null;

  const mainAccords = [
    { label: "Agrumes", value: 95, color: "#EAB308" },
    { label: "Ambré", value: 80, color: "#B45309" },
    { label: "Boisé", value: 70, color: "#451A03" },
    { label: "Épicé", value: 50, color: "#0D9488" }
  ];

  const suggestions = perfumes.filter(p => p.id !== perfume.id).slice(0, 6);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#1D1E1F] text-white pb-20 overflow-x-hidden">
      
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[#1D1E1F]/90 backdrop-blur-md border-b border-white/5 p-6 flex justify-between items-center">
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary tracking-[.3em] uppercase">{perfume.brand}</p>
          <h1 className="text-xl font-serif italic">{perfume.name}</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-16">
        
        {/* VISUEL ET ACCORDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 border border-white/10 shadow-2xl">
            <img src={perfume.image} alt={perfume.name} className="max-h-full object-contain drop-shadow-2xl" />
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Accords Principaux</h3>
            {mainAccords.map((a, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase"><span>{a.label}</span></div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${a.value}%` }}
                    className="h-full" style={{ backgroundColor: a.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto border-y border-white/5 py-10">
          <div className="flex justify-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
            <Calendar size={14} /> Edition 2021
          </div>
          <p className="text-2xl font-serif italic text-white/80 leading-relaxed">
            "{perfume.name} par {perfume.brand} est une création captivante qui définit l'élégance moderne."
          </p>
        </div>

        {/* PYRAMIDE OLFACTIVE */}
        <div className="space-y-12 py-10">
          <div className="flex flex-col items-center gap-2">
            <Droplets size={24} className="text-primary/50" />
            <h3 className="text-[10px] font-bold uppercase tracking-[.4em] text-white/30">Pyramide Olfactive</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {['Notes de Tête', 'Notes de Cœur', 'Notes de Fond'].map((title, idx) => (
              <div key={idx} className="space-y-6 text-center">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-[.3em]">{title}</p>
                <div className="flex flex-wrap justify-center gap-8">
                  {["Bergamote", "Lavande", "Ambre"].map((n, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=150&h=150&fit=crop`} className="w-full h-full object-cover opacity-60" alt={n} />
                      </div>
                      <span className="text-[9px] font-bold uppercase text-white/40">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUGGESTIONS */}
        <div className="space-y-8 pt-10">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/20">Reminiscences</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
            {suggestions.map((s) => (
              <button 
                key={s.id} onClick={() => onSelectPerfume(s)}
                className="min-w-[160px] bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/10 transition-all snap-start"
              >
                <div className="h-24 flex items-center justify-center">
                  <img src={s.image} alt={s.name} className="max-h-full object-contain" />
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-bold text-primary uppercase">{s.brand}</p>
                  <p className="text-[10px] font-bold uppercase truncate w-28">{s.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfumePage;

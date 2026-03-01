import React, { useEffect, useRef } from 'react';
import { X, Calendar, Droplets } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sécurité absolue pour le scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    window.scrollTo(0, 0);
  }, [perfume.id]);

  const accords = [
    { n: "Agrumes", v: 90, c: "#facc15" },
    { n: "Ambré", v: 80, c: "#b45309" },
    { n: "Boisé", v: 70, c: "#451a03" },
    { n: "Aromatique", v: 60, c: "#0d9488" }
  ];

  const similars = perfumes.filter(p => p.id !== perfume.id).slice(0, 6);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] bg-[#1D1E1F] text-white overflow-y-auto w-full h-full"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* ESPACE POUR LA NAV */}
      <div className="h-24 w-full" /> 

      <div className="max-w-4xl mx-auto p-6 space-y-16 pb-32">
        
        {/* VISUEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="aspect-square bg-white/[0.03] rounded-[2rem] border border-white/10 flex items-center justify-center p-8">
            <img src={perfume.image} alt={perfume.name} className="max-h-full object-contain" />
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Accords Principaux</h3>
            <div className="space-y-4">
              {accords.map((a, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[9px] uppercase font-bold opacity-60"><span>{a.n}</span></div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full transition-all duration-1000" style={{ width: `${a.v}%`, backgroundColor: a.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="text-center py-10 border-y border-white/5 space-y-4">
          <p className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Calendar size={12} /> Edition Spéciale
          </p>
          <h2 className="text-3xl font-serif italic text-white/90 leading-tight">
            "{perfume.name} : une signature olfactive unique."
          </h2>
        </div>

        {/* PYRAMIDE */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <Droplets className="mx-auto text-primary/40" size={24} />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Pyramide Olfactive</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Tête", "Cœur", "Fond"].map((t, i) => (
              <div key={i} className="text-center space-y-4">
                <span className="text-[9px] font-bold opacity-30 uppercase">{t}</span>
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=100" className="w-full h-full object-cover rounded-xl opacity-40" alt="note" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUGGESTIONS - ACTION DIRECTE */}
        <div className="space-y-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-20 text-center">Vous aimerez aussi</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {similars.map((p) => (
              <button 
                key={p.id} 
                onClick={(e) => {
                  e.preventDefault();
                  onSelectPerfume(p);
                  if (containerRef.current) containerRef.current.scrollTo(0, 0);
                }}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3 active:scale-95 transition-transform"
              >
                <img src={p.image} alt={p.name} className="h-20 object-contain" />
                <p className="text-[10px] font-bold uppercase text-white truncate w-full text-center">{p.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

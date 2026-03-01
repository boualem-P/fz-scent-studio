import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Droplets } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Remonte en haut de la page dès que le parfum change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [perfume.id]);

  const accords = [
    { n: "Agrumes", v: 90, c: "#facc15" },
    { n: "Ambré", v: 80, c: "#b45309" },
    { n: "Boisé", v: 70, c: "#451a03" },
    { n: "Aromatique", v: 60, c: "#0d9488" }
  ];

  // Suggestions : On prend d'autres parfums au hasard pour l'exemple
  const similars = perfumes.filter(p => p.id !== perfume.id).slice(0, 6);

  return (
    <div ref={containerRef} className="h-full w-full bg-[#1D1E1F] text-white overflow-x-hidden">
      
      {/* HEADER ESPACÉ POUR LA NAV GLOBALE */}
      <div className="h-24 w-full" /> 

      <div className="max-w-4xl mx-auto p-6 space-y-20 pb-32">
        
        {/* VISUEL PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="aspect-square bg-white/[0.02] rounded-[3rem] border border-white/10 flex items-center justify-center p-12 shadow-inner"
          >
            <img src={perfume.image} alt={perfume.name} className="max-h-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]" />
          </motion.div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 italic">Accords Principaux</h3>
              <div className="space-y-4 pt-4">
                {accords.map((a, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/50"><span>{a.n}</span></div>
                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${a.v}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full" style={{ backgroundColor: a.c }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION STYLE MAGAZINE */}
        <section className="text-center py-10 border-y border-white/5">
           <div className="flex justify-center gap-3 mb-6">
              <span className="px-4 py-1 rounded-full border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/5 flex items-center gap-2">
                <Calendar size={12} /> Lancé en 2021
              </span>
           </div>
           <h2 className="text-3xl md:text-5xl font-serif italic text-white/90 leading-tight">
             "{perfume.name} est une déclaration d'élégance, un sillage inoubliable."
           </h2>
        </section>

        {/* PYRAMIDE OLFACTIVE ILLUSTRÉE */}
        <section className="space-y-16">
          <div className="flex flex-col items-center gap-2">
            <Droplets className="text-primary/40" size={30} />
            <h3 className="text-[12px] font-black uppercase tracking-[0.6em] text-white/20">La Pyramide</h3>
          </div>
          
          <div className="space-y-20">
            {['Notes de Tête', 'Notes de Cœur', 'Notes de Fond'].map((title, idx) => (
              <div key={idx} className="space-y-8">
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{title}</p>
                <div className="flex flex-wrap justify-center gap-12">
                  {["Bergamote", "Poivre", "Ambre"].map((note, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center p-2">
                         <img src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=150&h=150&fit=crop`} alt={note} className="w-full h-full object-cover rounded-2xl opacity-40 hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[10px] font-bold uppercase text-white/40 tracking-tighter">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUGGESTIONS (REMINISCENCES) */}
        <section className="space-y-10 pt-20">
          <div className="flex flex-col gap-1">
            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/20">Reminiscences</h3>
            <p className="text-[10px] text-primary/40 uppercase tracking-widest font-bold">Ce parfum me rappelle...</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x">
            {similars.map((p) => (
              <button 
                key={p.id} 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Navigation vers :", p.name);
                  onSelectPerfume(p);
                }}
                className="min-w-[220px] bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-6 hover:bg-white/[0.06] hover:border-primary/30 transition-all snap-start group"
              >
                <div className="h-32 w-full flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">{p.brand}</p>
                  <p className="text-[13px] font-bold uppercase text-white tracking-tight">{p.name}</p>
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

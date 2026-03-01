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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [perfume?.id]);

  if (!perfume) return null;

  const accords = [
    { n: "Agrumes", v: 95, c: "#EAB308" },
    { n: "Ambré", v: 80, c: "#B45309" },
    { n: "Boisé", v: 70, c: "#451A03" },
    { n: "Épicé", v: 50, c: "#0D9488" }
  ];

  const similars = perfumes.filter(p => p.id !== perfume.id).slice(0, 6);

  return (
    <div ref={scrollRef} className="min-h-screen w-full bg-[#1D1E1F] text-white overflow-x-hidden">
      {/* HEADER FICHE */}
      <div className="sticky top-0 z-[210] bg-[#1D1E1F]/95 backdrop-blur-lg border-b border-white/5 p-6 flex justify-between items-center">
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={24} /></button>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary tracking-[.4em] uppercase">{perfume.brand}</p>
          <h1 className="text-xl font-serif italic text-white">{perfume.name}</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-20 pb-20">
        
        {/* VISUEL & ACCORDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-10">
          <div className="aspect-square bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-10 shadow-2xl">
            <img src={perfume.image} alt={perfume.name} className="max-h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
          </div>
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[.3em] text-white/30">Accords Principaux</h3>
            {accords.map((a, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60"><span>{a.n}</span></div>
                <div className="h-5 w-full bg-white/5 rounded-sm overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${a.v}%` }} transition={{ duration: 1 }} className="h-full" style={{ backgroundColor: a.c }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="text-center space-y-6 border-y border-white/5 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            <Calendar size={14} /> Edition 2021
          </div>
          <p className="text-2xl md:text-3xl font-serif italic text-white/80 leading-relaxed max-w-2xl mx-auto">
            "{perfume.name} est une fragrance d'exception qui capture l'essence même du luxe et de la sophistication."
          </p>
        </section>

        {/* PYRAMIDE OLFACTIVE */}
        <section className="space-y-16">
          <div className="flex flex-col items-center gap-3">
            <Droplets size={28} className="text-primary/40" />
            <h3 className="text-[12px] font-bold uppercase tracking-[.5em] text-white/20">Pyramide Olfactive</h3>
          </div>
          <div className="grid grid-cols-1 gap-16">
            {['Notes de Tête', 'Notes de Cœur', 'Notes de Fond'].map((title, idx) => (
              <div key={idx} className="space-y-8">
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[.4em]">{title}</p>
                <div className="flex flex-wrap justify-center gap-10">
                  {["Bergamote", "Iris", "Cèdre"].map((note, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group">
                      <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                        <img src={`https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop`} alt={note} className="w-full h-full object-cover opacity-60" />
                      </div>
                      <span className="text-[10px] font-bold uppercase text-white/40 tracking-tighter">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUGGESTIONS */}
        <section className="space-y-10 pt-10">
          <h3 className="text-[11px] font-bold uppercase tracking-[.3em] text-white/20">Reminiscences</h3>
          <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x">
            {similars.map((p) => (
              <button 
                key={p.id} 
                onClick={() => {
                  onSelectPerfume(p);
                  if (scrollRef.current) scrollRef.current.scrollTop = 0;
                }}
                className="min-w-[180px] bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] flex flex-col items-center gap-6 hover:bg-white/[0.08] transition-all snap-start group"
              >
                <div className="h-32 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-primary/60 uppercase mb-1">{p.brand}</p>
                  <p className="text-[11px] font-bold uppercase text-white truncate w-32">{p.name}</p>
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

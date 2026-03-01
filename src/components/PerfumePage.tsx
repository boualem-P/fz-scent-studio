import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Calendar, Droplets, Info } from 'lucide-react';
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

  // Accords de type Fragrantica avec couleurs techniques
  const mainAccords = [
    { label: "Agrumes", value: 100, color: "#facc15" },
    { label: "Ambré", value: 85, color: "#b45309" },
    { label: "Boisé", value: 72, color: "#451a03" },
    { label: "Aromatique", value: 60, color: "#0d9488" },
    { label: "Épicé frais", value: 45, color: "#4ade80" },
  ];

  const suggestions = perfumes
    .filter(p => p.id !== perfume.id)
    .filter(p => p.brand === perfume.brand || p.gender === perfume.gender)
    .slice(0, 6);

  // Composant interne pour les rangs de la pyramide
  const PyramidRow = ({ title, notes }: { title: string, notes: {n: string, img: string}[] }) => (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 w-full">
        <div className="h-px bg-white/10 flex-grow" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">{title}</span>
        <div className="h-px bg-white/10 flex-grow" />
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {notes.map((note, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 group max-w-[80px]">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/5 bg-white/[0.03] p-1 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/40">
              <img src={note.img} alt={note.n} className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100" />
            </div>
            <span className="text-[9px] font-bold text-center text-white/50 uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
              {note.n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={scrollRef} className="h-full w-full bg-[#1D1E1F] text-white pb-24 overflow-y-auto no-scrollbar scroll-smooth">
      
      {/* HEADER PREMIUM */}
      <nav className="sticky top-0 z-[100] bg-[#1D1E1F]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-5 flex justify-between items-center">
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-all"><X size={24} /></button>
        <div className="text-center">
          <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/80 mb-1">{perfume.brand}</h1>
          <p className="text-xl font-serif italic text-white/90 leading-none">{perfume.name}</p>
        </div>
        <div className="flex gap-2">
           <button className="p-2 text-white/20 hover:text-red-500 transition-colors"><Heart size={22} /></button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-20">
        
        {/* SECTION 1 : ACCORDS & VISUEL */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* L'image principale avec un halo luxueux */}
          <div className="relative group aspect-[4/5] flex items-center justify-center bg-gradient-to-tr from-white/5 to-transparent rounded-[2.5rem] border border-white/10 overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             <img src={perfume.image} alt={perfume.name} className="max-h-[80%] w-auto object-contain z-10 drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)]" />
          </div>

          {/* Les Accords horizontaux type Fragrantica */}
          <div className="space-y-10 pt-4">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Info size={14} className="text-primary/40" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Accords Principaux</h3>
              </div>
              <div className="space-y-4">
                {mainAccords.map((accord, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                      <span>{accord.label}</span>
                    </div>
                    <div className="h-5 w-full bg-white/[0.03] rounded-sm overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${accord.value}%` }} transition={{ delay: 0.3 + (i*0.1), duration: 1.2, ease: "circOut" }}
                        className="h-full shadow-[inset_-10px_0_10px_rgba(0,0,0,0.1)]" style={{ backgroundColor: accord.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : DESCRIPTION ÉDITION */}
        <section className="max-w-3xl mx-auto text-center space-y-8">
           <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/5 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
             <Calendar size={14} /> Edition 2021
           </div>
           <p className="text-2xl md:text-3xl font-serif italic text-white/80 leading-snug">
             "{perfume.name} est une symphonie olfactive capturant l'essence même de l'audace et de l'élégance intemporelle."
           </p>
        </section>

        {/* SECTION 3 : PYRAMIDE ILLUSTRÉE (Le coeur de Fragrantica) */}
        <section className="space-y-16 py-16 px-8 bg-white/[0.02] border border-white/5 rounded-[3rem]">
           <div className="flex flex-col items-center gap-4">
              <Droplets className="text-primary/60" size={28} />
              <h3 className="text-[12px] font-black uppercase tracking-[0.6em] text-white/40">Notes Olfactives</h3>
           </div>

           <div className="grid gap-20">
              <PyramidRow title="Notes de Tête" notes={[
                {n: "Bergamote", img: "https://images.unsplash.com/photo-1596722265008-8e8952329759?w=150"},
                {n: "Lavande", img: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?w=150"},
                {n: "Citron", img: "https://images.unsplash.com/photo-1590502593457-4c5f387b320d?w=150"}
              ]} />
              <PyramidRow title="Notes de Cœur" notes={[
                {n: "Iris de Toscane", img: "https://images.unsplash.com/photo-1560707854-fb9a10eeaebb?w=150"},
                {n: "Ambre", img: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=150"},
                {n: "Cacao", img: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=150"}
              ]} />
              <PyramidRow title="Notes de Fond" notes={[
                {n: "Vétiver", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=150"},
                {n: "Cèdre", img: "https://images.unsplash.com/photo-1622322062630-f3a388907823?w=150"},
                {n: "Patchouli", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=150"}
              ]} />
           </div>
        </section>

        {/* SECTION 4 : RÉMINISCENCE (Ce parfum me rappelle...) */}
        <section className="space-y-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-white/30">Réminiscences</h3>
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Ce parfum me rappelle...</p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar snap-x">
            {suggestions.map((suggested) => (
              <button 
                key={suggested.id} 
                onClick={() => onSelectPerfume(suggested)}
                className="min-w-[200px] bg-white/[0.03] rounded-[2rem] border border-white/5 p-6 flex flex-col items-center gap-6 hover:bg-white/[0.08] hover:border-primary/40 transition-all snap-start group outline-none"
              >
                 <div className="h-32 w-full flex items-center justify-center">
                    <img src={suggested.image} alt={suggested.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                 </div>
                 <div className="text-center w-full">
                    <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest mb-1.5">{suggested.brand}</p>
                    <p className="text-[12px] font-bold text-white uppercase truncate">{suggested.name}</p>
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

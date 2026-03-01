import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Calendar, Droplets } from 'lucide-react';
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

  // Accords inspirés de ton screenshot Fragrantica
  const mainAccords = [
    { label: "Agrumes", value: 100, color: "#EAB308" },
    { label: "Ambré", value: 85, color: "#92400E" },
    { label: "Boisé", value: 75, color: "#451A03" },
    { label: "Épicé frais", value: 65, color: "#4ADE80" },
    { label: "Aromatique", value: 55, color: "#2DD4BF" },
  ];

  const suggestions = perfumes
    .filter(p => p.id !== perfume.id)
    .filter(p => p.brand === perfume.brand || p.gender === perfume.gender)
    .slice(0, 6);

  // Helper pour afficher les groupes de notes
  const NoteGroup = ({ title, notes }: { title: string, notes: string[] }) => (
    <div className="space-y-4">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-2 text-center">{title}</h4>
      <div className="flex flex-wrap justify-center gap-6">
        {notes.map((note, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-white/5 transition-transform group-hover:scale-110">
              <img 
                src={`https://source.unsplash.com/100x100/?${note},nature`} 
                alt={note} 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <span className="text-[9px] font-medium text-white/60 uppercase tracking-tighter">{note}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={scrollRef} className="h-full w-full bg-[#1D1E1F] text-white pb-24 overflow-y-auto no-scrollbar">
      {/* HEADER STICKY */}
      <nav className="sticky top-0 z-[50] bg-[#1D1E1F]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X size={22} /></button>
        <div className="text-center">
          <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/70 mb-0.5">{perfume.brand}</h1>
          <p className="text-lg font-serif italic text-white/90">{perfume.name}</p>
        </div>
        <button className="p-2"><Heart size={20} className="text-white/20 hover:text-red-500 transition-colors" /></button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-16">
        
        {/* SECTION 1 : VISUEL & ACCORDS (Style Fragrantica) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="aspect-[4/5] bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent)]" />
             <img src={perfume.image} alt={perfume.name} className="max-h-full w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] z-10" />
          </div>

          <div className="space-y-8 self-center">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Accords Principaux</h3>
              <div className="space-y-3">
                {mainAccords.map((accord, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest mb-1.5 text-white/80">
                      <span>{accord.label}</span>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded-sm overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${accord.value}%` }} 
                        transition={{ delay: 0.5 + (i*0.1), duration: 1 }}
                        className="h-full" 
                        style={{ backgroundColor: accord.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : DESCRIPTION & INFOS */}
        <section className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Calendar size={12} />
            Édition 2021
          </div>
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/80 italic">
            "{perfume.name} est une fragrance qui définit l'élégance moderne. Un sillage captivant qui mêle tradition et audace."
          </p>
        </section>

        {/* SECTION 3 : PYRAMIDE OLFACTIVE (Sous-notes) */}
        <section className="space-y-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
          <div className="flex flex-col items-center gap-2 mb-8">
            <Droplets className="text-primary/40" size={24} />
            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/30">Pyramide Olfactive</h3>
          </div>
          
          <div className="grid gap-16">
            <NoteGroup title="Notes de Tête" notes={["Bergamote", "Citron", "Menthe", "Poivre Rose"]} />
            <NoteGroup title="Notes de Cœur" notes={["Gingembre", "Jasmin", "Melon", "Noix de Muscade"]} />
            <NoteGroup title="Notes de Fond" notes={["Cèdre", "Ambre", "Santal", "Encens", "Patchouli"]} />
          </div>
        </section>

        {/* SECTION 4 : SUGGESTIONS (Boutons cliquables) */}
        <section className="space-y-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 px-2">Ce parfum me rappelle...</h3>
          <div className="flex gap-5 overflow-x-auto pb-8 no-scrollbar snap-x">
            {suggestions.map((suggested) => (
              <button 
                key={suggested.id} 
                onClick={() => onSelectPerfume(suggested)}
                className="min-w-[180px] bg-white/[0.03] rounded-[1.5rem] border border-white/5 p-5 flex flex-col items-center gap-5 hover:bg-white/[0.07] hover:border-primary/30 transition-all snap-start group outline-none"
              >
                 <div className="h-32 w-full flex items-center justify-center">
                    <img src={suggested.image} alt={suggested.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="text-center w-full">
                    <p className="text-[8px] font-black text-primary/60 uppercase tracking-tighter mb-1">{suggested.brand}</p>
                    <p className="text-[11px] font-bold text-white uppercase truncate">{suggested.name}</p>
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

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Heart } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume | null;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  // Remonter en haut automatiquement quand le parfum change
  useEffect(() => {
    const container = document.getElementById('perfume-page-container');
    if (container) container.scrollTo(0, 0);
  }, [perfume?.id]);

  if (!perfume) return null;

  // LOGIQUE DE SUGGESTION AMÉLIORÉE
  const suggestions = perfumes
    .filter(p => p.id !== perfume.id)
    .filter(p => p.brand === perfume.brand || p.gender === perfume.gender)
    .slice(0, 6);

  const accords = [
    { label: "Boisé", value: 90, color: "#451A03" },
    { label: "Agrumes", value: 80, color: "#EAB308" },
    { label: "Aromatique", value: 70, color: "#2DD4BF" },
    { label: "Épicé frais", value: 60, color: "#4ADE80" },
    { label: "Ambre", value: 50, color: "#92400E" },
  ];

  return (
    <motion.div 
      id="perfume-page-container"
      className="h-full w-full bg-[#1D1E1F] text-white pb-20 font-sans overflow-y-auto"
    >
      {/* NAVIGATION BAR FIXE */}
      <nav className="sticky top-0 z-50 bg-[#1D1E1F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all text-white/70 hover:text-white">
          <X size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 leading-none mb-1">{perfume.brand}</h1>
          <p className="text-xl font-serif italic text-white leading-none">{perfume.name}</p>
        </div>
        <div className="flex gap-4">
          <Heart size={20} className="text-white/20 hover:text-red-500 cursor-pointer transition-colors" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        
        {/* SECTION 1: PHOTO & ACCORDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-4">
          <div className="aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center p-12 group">
             <img 
                src={perfume.image || "/placeholder.svg"} 
                alt={perfume.name}
                className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
             />
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Accords Principaux</h3>
            {accords.map((accord, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{accord.label}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${accord.value}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: accord.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: DESCRIPTION */}
        <section className="text-center space-y-6 py-10 border-y border-white/5">
           <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/5 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em] border border-primary/20">
              <Calendar size={12} />
              Édition 2021
           </div>
           <p className="text-white/60 font-serif leading-relaxed italic text-xl max-w-xl mx-auto">
             "{perfume.name} par {perfume.brand} est une création exceptionnelle qui capture l'essence de la sophistication."
           </p>
        </section>

        {/* SECTION 3: NOTES OLFACTIVES (IMAGES) */}
        <section className="space-y-10">
           <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">Notes Olfactives</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: "Bergamote", img: "https://images.unsplash.com/photo-1596722265008-8e8952329759?w=200" },
                { n: "Patchouli", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=200" },
                { n: "Cuir", img: "https://images.unsplash.com/photo-1524383525204-629433e5623e?w=200" },
                { n: "Vanille", img: "https://images.unsplash.com/photo-1539735354046-5174207a5f19?w=200" }
              ].map((note, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 group-hover:border-primary/50 group-hover:-translate-y-2">
                    <img src={note.img} alt={note.n} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">{note.n}</span>
                </div>
              ))}
           </div>
        </section>

        {/* SECTION 4: SUGGESTIONS DYNAMIQUES */}
        <section className="space-y-6 pt-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Suggestions similaires</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
            {suggestions.map((suggested) => (
              <motion.div 
                key={suggested.id} 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectPerfume(suggested)}
                className="min-w-[160px] bg-white/5 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-between hover:bg-white/10 transition-all cursor-pointer group snap-start"
              >
                 <div className="h-24 w-full flex items-center justify-center mb-4">
                    <img 
                      src={suggested.image} 
                      alt={suggested.name} 
                      className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                 </div>
                 <div className="text-center w-full">
                    <p className="text-[8px] font-bold text-primary/60 uppercase truncate">{suggested.brand}</p>
                    <p className="text-[10px] font-bold text-white uppercase truncate">{suggested.name}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default PerfumePage;

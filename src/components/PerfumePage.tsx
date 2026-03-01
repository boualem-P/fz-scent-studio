import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Heart, Droplets } from 'lucide-react';
import { Perfume, perfumes } from "@/data/perfumes"; // On importe la liste globale

interface PerfumePageProps {
  perfume: Perfume | null;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void; // Nouvelle prop pour la navigation
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  if (!perfume) return null;

  // LOGIQUE DE SUGGESTION : 
  // On filtre le catalogue pour trouver des parfums de la même marque 
  // ou on prend les 4 premiers qui ne sont pas le parfum actuel.
  const suggestions = perfumes
    .filter(p => p.id !== perfume.id)
    .filter(p => p.brand === perfume.brand || p.gender === perfume.gender)
    .slice(0, 5);

  const accords = [
    { label: "Boisé", value: 90, color: "#451A03" },
    { label: "Agrumes", value: 80, color: "#EAB308" },
    { label: "Aromatique", value: 70, color: "#2DD4BF" },
    { label: "Épicé frais", value: 60, color: "#4ADE80" },
    { label: "Ambre", value: 50, color: "#92400E" },
  ];

  return (
    <motion.div className="min-h-screen w-full bg-[#1D1E1F] text-white pb-20 font-sans">
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#1D1E1F]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-2xl">
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all">
          <X size={24} className="text-white/70" />
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
                    transition={{ delay: 0.3 + i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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

        {/* SECTION 3: NOTES OLFACTIVES */}
        <section className="space-y-10">
           <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">Notes Olfactives</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* On peut boucler sur les notes réelles du parfum si elles existent dans ton data */}
              {["Bergamote", "Patchouli", "Cuir", "Vanille"].map((note, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 group-hover:border-primary/50 group-hover:-translate-y-2">
                    <img src={`https://source.unsplash.com/200x200/?${note}`} alt={note} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">{note}</span>
                </div>
              ))}
           </div>
        </section>

        {/* SECTION 4: CAROUSSEL DYNAMIQUE & CLIQUABLE */}
        <section className="space-y-6 pt-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Suggestions similaires</h3>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
            {suggestions.map((suggestedPerfume) => (
              <motion.div 
                key={suggestedPerfume.id} 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onSelectPerfume(suggestedPerfume);
                  // On remonte en haut de page pour la nouvelle fiche
                  document.querySelector('main')?.parentElement?.scrollTo(0,0);
                }}
                className="min-w-[160px] bg-white/5 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-between hover:bg-white/10 transition-all cursor-pointer group snap-start"
              >
                 <div className="h-24 w-full flex items-center justify-center mb-4">
                    <img src={suggestedPerfume.image} alt={suggestedPerfume.name} className="max-h-full object-contain group-hover:scale-110 transition-transform" />
                 </div>
                 <div className="text-center">
                    <p className="text-[8px] font-bold text-primary/60 uppercase">{suggestedPerfume.brand}</p>
                    <p className="text-[10px] font-bold text-white uppercase truncate w-32">{suggestedPerfume.name}</p>
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

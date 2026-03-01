import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Share2, Heart, Droplets } from 'lucide-react';
import { Perfume } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume | null;
  onClose: () => void;
}

const PerfumePage = ({ perfume, onClose }: PerfumePageProps) => {
  // Sécurité si aucun parfum n'est sélectionné
  if (!perfume) return null;

  // Accords simulés (Tu pourras les rendre dynamiques plus tard)
  const accords = [
    { label: "Boisé", value: 90, color: "#451A03" },
    { label: "Agrumes", value: 80, color: "#EAB308" },
    { label: "Aromatique", value: 70, color: "#2DD4BF" },
    { label: "Épicé frais", value: 60, color: "#4ADE80" },
    { label: "Ambre", value: 50, color: "#92400E" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen w-full bg-[#fcfcfc] text-slate-900 pb-20"
    >
      {/* HEADER BAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all">
          <X size={24} className="text-slate-600" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">{perfume.brand}</h1>
          <p className="text-lg font-serif italic text-slate-900 leading-none">{perfume.name}</p>
        </div>
        <div className="flex gap-4">
          <Heart size={20} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        
        {/* SECTION 1: PHOTO & ACCORDS (BATONNETS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-4">
          {/* Gauche: Photo */}
          <div className="aspect-square bg-white rounded-2xl border border-slate-100 shadow-xl flex items-center justify-center p-10 group">
             <img 
                src={perfume.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"} 
                alt={perfume.name}
                className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-110"
             />
          </div>

          {/* Droite: Batonnets (Statistiques) */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Accords Principaux</h3>
            {accords.map((accord, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">{accord.label}</span>
                </div>
                <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${accord.value}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full shadow-inner"
                    style={{ backgroundColor: accord.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: DESCRIPTION & ANNÉE */}
        <section className="text-center space-y-4 py-8 border-y border-slate-100">
           <div className="inline-flex items-center gap-2 px-4 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <Calendar size={12} />
              Sortie : 2021
           </div>
           <p className="text-slate-600 font-serif leading-relaxed italic text-lg max-w-xl mx-auto">
             "Une interprétation moderne de l'élégance, mêlant des notes vibrantes et une profondeur boisée captivante."
           </p>
        </section>

        {/* SECTION 3: NOTES (PETITES IMAGES) */}
        <section className="space-y-8">
           <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Notes du Parfum</h3>
           <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { n: "Bergamote", img: "https://images.unsplash.com/photo-1596722265008-8e8952329759?w=100" },
                { n: "Patchouli", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=100" },
                { n: "Cuir", img: "https://images.unsplash.com/photo-1524383525204-629433e5623e?w=100" },
                { n: "Vanille", img: "https://images.unsplash.com/photo-1539735354046-5174207a5f19?w=100" }
              ].map((note, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-white">
                    <img src={note.img} alt={note.n} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-500">{note.n}</span>
                </div>
              ))}
           </div>
        </section>

        {/* SECTION CAROUSSEL SIMILAIRE (Simplifié) */}
        <section className="space-y-6 pt-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Vous aimerez aussi</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[1, 2, 3].map((id) => (
              <div key={id} className="min-w-[150px] aspect-[3/4] bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                 <Droplets className="text-slate-200 mb-2" size={30} />
                 <span className="text-[10px] font-bold text-center uppercase">Fragrance {id}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default PerfumePage;

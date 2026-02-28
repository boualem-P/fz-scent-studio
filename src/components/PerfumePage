import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Droplets, Wind, Mountain } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// On simule les données - À adapter avec tes vrais imports plus tard
const perfumeData = {
  id: 1,
  name: "Bleu de Chanel Eau de Parfum",
  brand: "Chanel",
  for: "men",
  image: "/bleu-chanel.png", // Assure-toi que l'image est dans public/
  notes: {
    top: ["Pamplemousse", "Citron", "Menthe"],
    middle: ["Gingembre", "Jasmin"],
    base: ["Encens", "Cèdre", "Santal"]
  },
  ingredientsImages: [
    { name: "Pamplemousse", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=200&h=200&fit=crop" },
    { name: "Menthe", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=200&h=200&fit=crop" },
    { name: "Cèdre", image: "https://images.unsplash.com/photo-1601309579730-2921509307ba?w=200&h=200&fit=crop" },
    { name: "Encens", image: "https://images.unsplash.com/photo-1572360685215-680509635b7a?w=200&h=200&fit=crop" },
    { name: "Gingembre", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
  ],
  relatedPerfumes: [
    { id: 2, name: "Bleu de Chanel Parfum", image: "/bleu-parfum.png" },
    { id: 3, name: "Versace Dylan Blue", image: "/dylan-blue.png" },
    { id: 4, name: "Club de Nuit Iconic", image: "/iconic.png" },
  ],
  accords: [
    { subject: "Agrumes", A: 120, fullMark: 150 },
    { subject: "Ambré", A: 98, fullMark: 150 },
    { subject: "Boisé", A: 86, fullMark: 150 },
    { subject: "Épicé", A: 99, fullMark: 150 },
    { subject: "Aromatique", A: 85, fullMark: 150 },
    { subject: "Fumé", A: 65, fullMark: 150 },
  ]
};

const PerfumePage = ({ onClose }: { onClose?: () => void }) => {
  const [selectedPerfume, setSelectedPerfume] = useState(perfumeData);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 md:p-8 bg-black overflow-y-auto text-white">
      
      {/* 1. LE RECTANGLE PRINCIPAL (40/60) */}
      <div className="relative bg-[#0a0a0a] border border-primary/20 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] w-full max-w-7xl shadow-2xl mt-10">
        
        {/* BOUTON FERMER (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-primary/40 hover:text-primary transition-all hover:rotate-90 duration-300"
        >
          <X size={32} />
        </button>

        {/* GAUCHE (40%) : PHOTO DU PARFUM */}
        <div className="w-full md:w-[40%] bg-gradient-to-b from-primary/10 to-transparent flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-primary/10">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedPerfume.image} 
            alt={selectedPerfume.name}
            className="max-h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
          />
          <div className="mt-8 text-center">
            <h1 className="font-serif italic text-2xl text-primary/60">{selectedPerfume.brand}</h1>
            <h2 className="font-display text-4xl text-gold-gradient uppercase tracking-tighter mt-1">{selectedPerfume.name}</h2>
          </div>
        </div>

        {/* DROITE (60%) : MAP INTERACTIVE (Radar Chart) */}
        <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-xs uppercase tracking-[0.4em] text-primary/40 mb-8 flex items-center gap-2">
            <Info size={16} /> Architecture Moléculaire & Accords
          </h3>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedPerfume.accords}>
                <PolarGrid stroke="#D4AF37" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#D4AF37', fontSize: 12, opacity: 0.6 }} />
                <Radar
                  name="Accord"
                  dataKey="A"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. SECTION INFÉRIEURE : IMAGES DES NOTES */}
      <div className="w-full max-w-7xl mt-8 bg-black/40 backdrop-blur-md border border-primary/10 rounded-3xl p-10">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-primary/40 mb-10 text-center">Matières Premières</h4>
        <div className="flex flex-wrap justify-center gap-12">
          {selectedPerfume.ingredientsImages.map((note, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full border border-primary/20 p-1 group hover:border-primary transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <img src={note.image} alt={note.name} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60">{note.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. SECTION SUGGESTIONS */}
      <div className="w-full max-w-7xl mt-8 mb-20 bg-black/40 backdrop-blur-md border border-primary/10 rounded-3xl p-10">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-primary/40 mb-10 text-center">Sillages Proches</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedPerfume.relatedPerfumes.map((related) => (
            <motion.button
              key={related.id}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.05)" }}
              className="flex items-center gap-6 p-4 rounded-2xl border border-primary/10 group transition-all"
            >
              <div className="w-20 h-24 bg-black rounded-lg border border-primary/5 p-2 overflow-hidden">
                <img src={related.image} alt={related.name} className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <span className="text-[8px] uppercase tracking-[0.3em] text-primary/40">Alternative</span>
                <p className="text-sm font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary">{related.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PerfumePage;

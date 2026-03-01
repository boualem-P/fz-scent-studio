import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// Données statiques déplacées à l'extérieur pour plus de stabilité
const PERFUME_DATA = {
  id: 1,
  name: "Bleu de Chanel Eau de Parfum",
  brand: "Chanel",
  for: "men",
  image: "/bleu-chanel.png", 
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
    { subject: "Agrumes", A: 120 },
    { subject: "Ambré", A: 98 },
    { subject: "Boisé", A: 86 },
    { subject: "Épicé", A: 99 },
    { subject: "Aromatique", A: 85 },
    { subject: "Fumé", A: 65 },
  ]
};

interface PerfumePageProps {
  onClose?: () => void;
}

const PerfumePage = ({ onClose }: PerfumePageProps) => {
  const [selectedPerfume] = useState(PERFUME_DATA);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 md:p-8 bg-black overflow-y-auto text-white font-sans">
      
      {/* 1. RECTANGLE PRINCIPAL */}
      <div className="relative bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] w-full max-w-7xl shadow-2xl mt-10">
        
        {/* BOUTON FERMER */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-[#D4AF37]/40 hover:text-[#D4AF37] transition-all hover:rotate-90 duration-300"
          aria-label="Fermer"
        >
          <X size={32} />
        </button>

        {/* GAUCHE : PHOTO */}
        <div className="w-full md:w-[40%] bg-gradient-to-b from-[#D4AF37]/10 to-transparent flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/5">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedPerfume.image} 
            alt={selectedPerfume.name}
            className="max-h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
          />
          <div className="mt-8 text-center">
            <h1 className="font-serif italic text-2xl text-[#D4AF37]/60">{selectedPerfume.brand}</h1>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mt-1 bg-gradient-to-r from-[#D4AF37] via-[#FBF5B7] to-[#D4AF37] bg-clip-text text-transparent">
              {selectedPerfume.name}
            </h2>
          </div>
        </div>

        {/* DROITE : GRAPHique RADAR */}
        <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]/40 mb-8 flex items-center gap-2">
            <Info size={16} /> Profil Olfactif & Accords
          </h3>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedPerfume.accords}>
                <PolarGrid stroke="#D4AF37" strokeOpacity={0.1} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#D4AF37', fontSize: 11, opacity: 0.5 }} />
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

      {/* 2. MATIÈRES PREMIÈRES */}
      <div className="w-full max-w-7xl mt-8 bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-10">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/40 mb-10 text-center">Essences Dominantes</h4>
        <div className="flex flex-wrap justify-center gap-12">
          {selectedPerfume.ingredientsImages.map((note, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full border border-[#D4AF37]/20 p-1 overflow-hidden shadow-lg group">
                <img 
                  src={note.image} 
                  alt={note.name} 
                  className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60">{note.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. SUGGESTIONS */}
      <div className="w-full max-w-7xl mt-8 mb-20 bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-10">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37]/40 mb-10 text-center">Alternatives</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedPerfume.relatedPerfumes.map((related) => (
            <motion.button
              key={related.id}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.03)" }}
              className="flex items-center gap-6 p-4 rounded-2xl border border-white/5 group transition-all"
            >
              <div className="w-16 h-20 bg-black/40 rounded border border-white/5 p-2">
                <img src={related.image} alt={related.name} className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37]/40">Sillage similaire</span>
                <p className="text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-[#D4AF37] transition-colors">{related.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PerfumePage;

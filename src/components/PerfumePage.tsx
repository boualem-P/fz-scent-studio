import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadarItem } from 'recharts';

// Données de test internes
const MOCK_DATA = {
  id: 1,
  name: "Bleu de Chanel Eau de Parfum",
  brand: "Chanel",
  image: "/bleu-chanel.png", 
  ingredients: [
    { name: "Pamplemousse", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=200&h=200&fit=crop" },
    { name: "Menthe", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=200&h=200&fit=crop" },
    { name: "Cèdre", image: "https://images.unsplash.com/photo-1601309579730-2921509307ba?w=200&h=200&fit=crop" },
    { name: "Encens", image: "https://images.unsplash.com/photo-1572360685215-680509635b7a?w=200&h=200&fit=crop" },
    { name: "Gingembre", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop" },
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
  onClose: () => void;
}

const PerfumePage = ({ onClose }: PerfumePageProps) => {
  const [perfume] = useState(MOCK_DATA);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 md:p-8 bg-black overflow-y-auto text-white font-sans">
      
      {/* CARD PRINCIPALE */}
      <div className="relative bg-[#0a0a0a] border border-primary/20 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] w-full max-w-7xl shadow-2xl mt-10">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-primary/40 hover:text-primary transition-all hover:rotate-90 duration-300"
        >
          <X size={32} />
        </button>

        {/* GAUCHE: IMAGE */}
        <div className="w-full md:w-[40%] bg-gradient-to-b from-primary/10 to-transparent flex flex-col items-center justify-center p-12 border-b md:border-b-0 md:border-r border-white/5">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={perfume.image} 
            className="max-h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
          />
          <div className="mt-8 text-center">
            <h1 className="font-serif italic text-2xl text-primary/60">{perfume.brand}</h1>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mt-1 bg-gradient-to-r from-primary via-[#FBF5B7] to-primary bg-clip-text text-transparent">
              {perfume.name}
            </h2>
          </div>
        </div>

        {/* DROITE: RADAR */}
        <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-xs uppercase tracking-[0.4em] text-primary/40 mb-8 flex items-center gap-2">
            <Info size={16} /> Profil Olfactif
          </h3>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={perfume.accords}>
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

      {/* SECTION INGRÉDIENTS */}
      <div className="w-full max-w-7xl mt-8 bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-10 mb-20">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-primary/40 mb-10 text-center">Matières Premières</h4>
        <div className="flex flex-wrap justify-center gap-12">
          {perfume.ingredients.map((note, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full border border-primary/20 p-1 overflow-hidden group shadow-xl">
                <img 
                  src={note.image} 
                  alt={note.name} 
                  className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60">{note.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

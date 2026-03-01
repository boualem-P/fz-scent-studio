import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Share2, Heart } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Perfume } from "@/data/perfumes";

interface PerfumePageProps {
  perfume: Perfume; // On passe maintenant le vrai parfum sélectionné
  onClose: () => void;
}

const PerfumePage = ({ perfume, onClose }: PerfumePageProps) => {
  // Simulation de données détaillées (À connecter à ta BDD plus tard)
  const stats = [
    { label: "Citrus", value: 95, color: "#EAB308" },
    { label: "Amber", value: 85, color: "#92400E" },
    { label: "Woody", value: 75, color: "#451A03" },
    { label: "Fresh Spicy", value: 65, color: "#4ADE80" },
    { label: "Aromatic", value: 55, color: "#2DD4BF" },
  ];

  const mapData = [
    { subject: 'Agrumes', A: 120 },
    { subject: 'Animal', A: 60 },
    { subject: 'Boisé', A: 90 },
    { subject: 'Épicé', A: 70 },
    { subject: 'Floral', A: 40 },
    { subject: 'Vert', A: 80 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#fafafa] text-slate-900 font-sans pb-20"
    >
      {/* HEADER FIXE */}
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X size={24} />
        </button>
        <h1 className="text-xl font-bold uppercase tracking-widest">{perfume.name}</h1>
        <div className="flex gap-4">
          <Share2 size={20} className="text-slate-400 cursor-pointer hover:text-primary" />
          <Heart size={20} className="text-slate-400 cursor-pointer hover:text-red-500" />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6 space-y-12">
        
        {/* SECTION 1 : VISUEL & ACCORDS (BATONNETS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
          <div className="flex justify-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <img 
              src={perfume.image || "/placeholder.svg"} 
              alt={perfume.name} 
              className="max-h-[400px] object-contain drop-shadow-2xl"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Main Accords</h3>
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium uppercase italic">
                    <span>{stat.label}</span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-sm overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="h-full"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 : DESCRIPTION & ANNÉE */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-bold">
            <Calendar size={18} />
            <span>Lancé en 2014</span>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto italic">
            "{perfume.name} est une fragrance intense et raffinée qui exprime la force et l'élégance masculine. Une signature olfactive pour l'homme qui refuse les diktats."
          </p>
        </section>

        {/* SECTION 3 : NOTES OLFACTIVES (IMAGES) */}
        <section className="space-y-6">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Notes Olfactives</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {["Pamplemousse", "Encens", "Gingembre", "Cèdre"].map((note, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                  <img src={`https://source.unsplash.com/200x200/?${note}`} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-tighter">{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 : MAP DES NOTES (RADAR) */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Profil Graphique</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mapData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
              <Radar
                name="Profil"
                dataKey="A"
                stroke="#D4AF37"
                fill="#D4AF37"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </section>

        {/* SECTION 5 : SUGGESTIONS (CAROUSSEL) */}
        <section className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Suggestions similaires</h3>
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="min-w-[180px] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex-shrink-0">
                <img src="/placeholder.svg" className="h-32 w-full object-contain mb-4" />
                <h4 className="text-xs font-bold uppercase text-center">Alternative {item}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default PerfumePage;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERFUMES } from "@/data/perfumes";
import PerfumeCard from "@/components/PerfumeCard";
import PerfumePage from "@/components/PerfumePage";
import { Perfume } from "@/data/perfumes";

const Index = () => {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* --- VIDÉO D'ARRIÈRE-PLAN (MISE À JOUR) --- */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60" // Opacité réglée pour laisser respirer le texte
        >
          <source src="/bg-parfum.mp4" type="video/mp4" />
          {/* Fallback au cas où la vidéo ne charge pas */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay pour le contraste des textes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* --- CONTENU DE LA PAGE --- */}
      <div className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h2 className="text-[10px] uppercase tracking-[0.8em] text-amber-500 font-black mb-4">
              La Haute Parfumerie
            </h2>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white uppercase italic">
              FZ Parfums
            </h1>
          </motion.div>

          {/* GRILLE DES PARFUMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PERFUMES.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                onClick={() => setSelectedPerfume(perfume)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* --- MODALE DÉTAILLÉE (C'est ici que s'affiche ta PerfumePage) --- */}
      <AnimatePresence>
        {selectedPerfume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black"
          >
            <PerfumePage
              perfume={selectedPerfume}
              onClose={() => setSelectedPerfume(null)}
              onSelectPerfume={(p) => setSelectedPerfume(p)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;

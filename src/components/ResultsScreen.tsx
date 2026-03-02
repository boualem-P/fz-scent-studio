import { motion } from "framer-motion";
import { Perfume, NOTE_LABELS } from "@/data/perfumes";
import { RefreshCw, Library, ChevronRight } from "lucide-react";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
  onCatalogue: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const ResultsScreen = ({ results, onMenu, onCatalogue, onSelectPerfume }: ResultsScreenProps) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-black text-white selection:bg-amber-500/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 mb-4">
            Vos Correspondances
          </h2>
          <p className="text-zinc-400 font-serif italic text-lg">
            Les essences qui résonnent avec votre profil olfactif.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {results.map((result, index) => (
            <motion.div
              key={result.perfume.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => onSelectPerfume(result.perfume)}
              className="group cursor-pointer relative bg-zinc-900/30 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/60 hover:border-amber-500/40 transition-all duration-500 backdrop-blur-sm"
            >
              {/* Badge Score Premium */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-400 px-4 py-1 rounded-full shadow-xl z-10">
                <span className="text-black text-xs font-black tracking-tighter italic">
                  {result.matchPercent}% D'AFFINITÉ
                </span>
              </div>

              {/* Conteneur Image avec effet de lueur au hover */}
              <div className="aspect-[4/5] mb-8 overflow-hidden rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-white/5 relative">
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-500" />
                
                {result.perfume.image ? (
                  <img 
                    src={result.perfume.image} 
                    alt={result.perfume.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                ) : (
                  <div className="text-zinc-700 text-8xl font-serif group-hover:text-amber-500/20 transition-colors duration-500">
                    {result.perfume.brand.charAt(0)}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-amber-500/80 text-[10px] uppercase tracking-[0.3em] font-bold">
                    {result.perfume.brand}
                  </span>
                  <h3 className="text-2xl font-serif text-white group-hover:text-amber-200 transition-colors">
                    {result.perfume.name}
                  </h3>
                </div>

                {/* Affichage des familles olfactives dominantes */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {Array.from(new Set([...result.perfume.topNotes, ...result.perfume.heartNotes])).slice(0, 3).map((cat) => (
                    <span key={cat} className="text-[9px] px-2 py-1 border border-zinc-700 rounded-md text-zinc-400 uppercase tracking-widest">
                      {NOTE_LABELS[cat] || cat}
                    </span>
                  ))}
                </div>

                <p className="pt-4 text-zinc-400 text-sm leading-relaxed line-clamp-2 italic font-serif">
                  "{result.perfume.description}"
                </p>

                <div className="pt-6 flex items-center text-amber-500 text-xs font-bold gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  DÉCOUVRIR LA PYRAMIDE <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Boutons d'action */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8">
          <button 
            onClick={onMenu} 
            className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors uppercase text-xs tracking-[0.2em]"
          >
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" /> 
            Modifier mes préférences
          </button>
          
          <button 
            onClick={onCatalogue} 
            className="flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-amber-500 hover:text-white transition-all rounded-full font-bold uppercase text-xs tracking-[0.2em] shadow-2xl shadow-white/5"
          >
            <Library size={18} /> Explorer tout le catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;

import { motion } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import { RefreshCw, Library } from "lucide-react";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
  onCatalogue: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const ResultsScreen = ({ results, onMenu, onCatalogue, onSelectPerfume }: ResultsScreenProps) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">Vos Correspondances</h2>
          <p className="text-zinc-400 font-serif italic">Les essences qui résonnent avec votre pyramide.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={result.perfume.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectPerfume(result.perfume)}
              className="group cursor-pointer relative bg-zinc-900/40 border border-white/10 p-6 rounded-2xl hover:border-amber-500/50 transition-all duration-500"
            >
              {/* Conteneur Image ou Fallback visuel */}
              <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center border border-white/5">
                {result.perfume.image ? (
                  <img 
                    src={result.perfume.image} 
                    alt={result.perfume.name}
                    className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                ) : (
                  <div className="text-amber-500/20 text-6xl font-serif group-hover:text-amber-500/40 transition-colors">
                    {result.perfume.brand.substring(0, 1)}
                  </div>
                )}
              </div>

              {/* Badge Score */}
              <div className="absolute top-4 right-4 bg-amber-500 px-3 py-1 rounded-full shadow-lg shadow-amber-500/20">
                <span className="text-black text-xs font-bold">{result.matchPercent}% Match</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
                {result.perfume.name}
              </h3>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">{result.perfume.brand}</p>
              <p className="mt-4 text-zinc-400 text-sm line-clamp-2 italic">
                "{result.perfume.description}"
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <button 
            onClick={onMenu} 
            className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-all rounded-full"
          >
            <RefreshCw size={18} /> Recommencer
          </button>
          <button 
            onClick={onCatalogue} 
            className="flex items-center gap-2 px-8 py-4 bg-amber-600 text-white hover:bg-amber-500 transition-all rounded-full font-bold"
          >
            <Library size={18} /> Voir le Catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;

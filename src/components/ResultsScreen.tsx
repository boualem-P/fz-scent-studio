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
    <div className="min-h-screen pt-24 pb-12 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">Vos Correspondances</h2>
          <p className="text-white/60 font-serif italic">Les essences qui résonnent avec votre pyramide.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <motion.div
              key={result.perfume.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectPerfume(result.perfume)}
              className="group cursor-pointer relative bg-zinc-900/50 border border-white/10 p-6 rounded-2xl hover:border-amber-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-white/5 flex items-center justify-center">
                <img 
                  src={result.perfume.image || "/placeholder.svg"} 
                  alt={result.perfume.name}
                  className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                <span className="text-amber-500 text-xs font-bold">{result.matchPercent}% Match</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{result.perfume.name}</h3>
              <p className="text-white/40 text-sm uppercase tracking-widest">{result.perfume.brand}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <button onClick={onMenu} className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-all rounded-full">
            <RefreshCw size={18} /> Recommencer
          </button>
          <button onClick={onCatalogue} className="flex items-center gap-2 px-8 py-4 bg-amber-600 text-white hover:bg-amber-500 transition-all rounded-full font-bold">
            <Library size={18} /> Voir le Catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;

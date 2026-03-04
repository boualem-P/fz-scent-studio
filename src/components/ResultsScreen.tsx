import { motion } from "framer-motion";
import { Perfume, NOTE_LABELS } from "@/data/perfumes";
import { RefreshCw, Library, ChevronRight, Sparkles, ShoppingBag } from "lucide-react";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
  onCatalogue: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const ResultsScreen = ({ results, onMenu, onCatalogue, onSelectPerfume }: ResultsScreenProps) => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-black text-white selection:bg-amber-500/30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Style Luxe */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-20"
        >
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Votre Signature</span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic mb-6">
            L'Éveil des Sens
          </h2>
          <div className="h-[1px] w-24 bg-amber-500/50 mx-auto mb-6" />
          <p className="text-zinc-500 font-light text-lg max-w-xl mx-auto">
            Voici les essences qui ont capturé l'âme de votre profil olfactif.
          </p>
        </motion.div>

        {/* Grille de Résultats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {results.map((result, index) => (
            <motion.div
              key={result.perfume.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group relative"
            >
              {/* Carte de Parfum */}
              <div 
                onClick={() => onSelectPerfume(result.perfume)}
                className="relative bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 transition-all duration-700 hover:border-amber-500/30 hover:bg-zinc-900/40 cursor-pointer overflow-hidden backdrop-blur-xl"
              >
                {/* Aura de fond au hover */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full group-hover:bg-amber-500/10 transition-all duration-700" />

                {/* Badge Affinité */}
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles size={12} className="text-amber-500" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-amber-500 uppercase">
                    {result.matchPercent}% d'affinité
                  </span>
                </div>

                {/* Image du flacon */}
                <div className="aspect-square mb-10 relative z-10 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-full h-full"
                  >
                    {result.perfume.image ? (
                      <img 
                        src={result.perfume.image} 
                        alt={result.perfume.name}
                        className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800/50 rounded-2xl flex items-center justify-center text-6xl font-serif text-zinc-700">
                        {result.perfume.brand.charAt(0)}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Infos */}
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-1">
                      {result.perfume.brand}
                    </p>
                    <h3 className="text-3xl font-light tracking-tight text-white group-hover:text-amber-100 transition-colors uppercase italic">
                      {result.perfume.name}
                    </h3>
                  </div>

                  {/* Tags Olfactifs */}
                  <div className="flex justify-center gap-2">
                    {Array.from(new Set([...result.perfume.topNotes])).slice(0, 2).map((cat) => (
                      <span key={cat} className="text-[8px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400 uppercase tracking-widest">
                        {NOTE_LABELS[cat] || cat}
                      </span>
                    ))}
                  </div>

                  <p className="text-zinc-500 text-xs italic font-light leading-relaxed line-clamp-2 px-4">
                    "{result.perfume.description}"
                  </p>
                </div>

                {/* Bouton Voir Détails Intégré */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                   <div className="flex items-center gap-2 text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                      Découvrir l'élixir <ChevronRight size={14} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions de Fin de Parcours */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-10">
          <button 
            onClick={onMenu} 
            className="flex items-center gap-3 text-zinc-500 hover:text-amber-500 transition-colors uppercase text-[10px] font-bold tracking-[0.3em]"
          >
            <RefreshCw size={14} /> Réinitialiser mon profil
          </button>
          
          <button 
            onClick={onCatalogue} 
            className="group flex items-center gap-4 px-12 py-6 bg-white text-black hover:bg-amber-500 hover:text-white transition-all rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <Library size={18} /> Explorer le catalogue
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultsScreen;

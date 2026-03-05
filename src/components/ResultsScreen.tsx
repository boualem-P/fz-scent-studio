import { motion } from "framer-motion";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { Perfume } from "@/data/perfumes";
import { Trophy, RotateCcw, Library } from "lucide-react";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
  onCatalogue: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const ResultsScreen = ({ results, onMenu, onCatalogue, onSelectPerfume }: ResultsScreenProps) => {
  if (results.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h2 className="font-display text-3xl text-primary">Aucun résultat</h2>
          <p className="text-muted-foreground max-w-md">
            Aucun parfum ne correspond à votre sélection. Essayez d'autres combinaisons de notes.
          </p>
          <button
            onClick={onMenu}
            className="px-8 py-3 border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all"
          >
            Recommencer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full max-w-4xl space-y-8"
      >
        <motion.div variants={staggerItem} className="text-center space-y-3">
          <Trophy className="w-10 h-10 text-primary mx-auto" />
          <h2 className="font-display text-4xl md:text-5xl text-primary tracking-tight">
            Vos Accords
          </h2>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            {results.length} parfum{results.length > 1 ? "s" : ""} sélectionné{results.length > 1 ? "s" : ""}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {results.map(({ perfume, matchPercent }, index) => (
            <motion.button
              key={perfume.id}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => onSelectPerfume(perfume)}
              className="group relative p-6 border border-primary/20 bg-black/40 backdrop-blur-sm text-left hover:border-primary/60 transition-all duration-500 rounded-sm"
            >
              {index === 0 && (
                <span className="absolute -top-3 left-4 px-3 py-0.5 bg-primary text-black text-[10px] font-display tracking-widest uppercase">
                  Meilleur accord
                </span>
              )}

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-2xl">
                  {perfume.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-display text-lg text-primary group-hover:text-primary/90 transition-colors">
                    {perfume.name}
                  </h3>
                  <p className="text-muted-foreground text-xs tracking-wider uppercase mt-1">
                    {perfume.brand}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Compatibilité</span>
                    <span className="text-primary font-display">{matchPercent}%</span>
                  </div>
                  <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchPercent}%` }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                    />
                  </div>
                </div>

                <p className="text-muted-foreground/60 text-xs line-clamp-2">
                  {perfume.concentration} · {perfume.gender}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div variants={staggerItem} className="flex justify-center gap-4 pt-4">
          <button
            onClick={onMenu}
            className="flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary/70 hover:text-primary hover:border-primary/40 transition-all text-xs tracking-widest uppercase"
          >
            <RotateCcw size={14} />
            Recommencer
          </button>
          <button
            onClick={onCatalogue}
            className="flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary/70 hover:text-primary hover:border-primary/40 transition-all text-xs tracking-widest uppercase"
          >
            <Library size={14} />
            Catalogue
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;

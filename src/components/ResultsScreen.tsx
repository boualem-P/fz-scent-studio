import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { Perfume } from "@/data/perfumes";
import { RotateCcw, Home, Sparkles, Crown } from "lucide-react";
import { useStock } from "@/data/useStock";
import { EpuiseOverlay } from "@/components/EpuiseOverlay";
import { useEffect, useRef } from "react";

interface ResultsScreenProps {
  results: { perfume: Perfume; matchPercent: number }[];
  onMenu: () => void;
  onLanding: () => void;
  onCatalogue: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const GOLD_COLORS = ["#D4AF37", "#F59E0B", "#FFF0A0"];

interface Leaf {
  x: number; y: number; w: number; h: number;
  speed: number; rotation: number; rotSpeed: number;
  swayAmp: number; swayFreq: number; swayOffset: number;
  opacity: number; opacityDir: number; color: string;
}
interface Particle { x: number; y: number; vy: number; vx: number; alpha: number; }

function createLeaf(canvasW: number, canvasH: number, startTop = false): Leaf {
  const size = 4 + Math.random() * 6;
  return {
    x: Math.random() * canvasW,
    y: startTop ? -size - Math.random() * canvasH * 0.3 : Math.random() * canvasH,
    w: size, h: size * (0.5 + Math.random() * 0.5),
    speed: 0.5 + Math.random() * 1.5, rotation: Math.random() * Math.PI * 2,
    rotSpeed: 0.02 * (0.5 + Math.random() * 1.5), swayAmp: 15 + Math.random() * 25,
    swayFreq: 0.008 + Math.random() * 0.012, swayOffset: Math.random() * Math.PI * 2,
    opacity: 0.3 + Math.random() * 0.5, opacityDir: 1,
    color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
  };
}
function createParticle(canvasW: number, canvasH: number): Particle {
  return {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    vy: 0.2 + Math.random() * 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    alpha: 0.05 + Math.random() * 0.1
  };
}

const PerfumeInitial = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center font-display text-5xl md:text-6xl text-gold-gradient select-none">
    {name.charAt(0)}
  </div>
);

const ResultsScreen = ({ results, onMenu, onLanding, onCatalogue, onSelectPerfume }: ResultsScreenProps) => {
  const { isAvailable } = useStock();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
            className="px-8 py-3 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Recommencer
          </button>
        </motion.div>
      </div>
    );
  }

  const topResult = results[0];
  const otherResults = results.slice(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-20 pb-40">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl space-y-10 relative z-10"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <Crown className="w-12 h-12 text-primary mx-auto drop-shadow-[0_0_12px_hsl(43_72%_52%/0.5)]" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl text-gold-shimmer tracking-tight">
            Vos Accords Parfaits
          </h2>
          <div className="gold-divider w-32 mx-auto" />
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-body">
            {results.length} parfum{results.length > 1 ? "s" : ""} sélectionné{results.length > 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Top Result - Hero Card */}
        <motion.button
          variants={staggerItem}
          whileHover={springHover}
          whileTap={springTap}
          onClick={() => onSelectPerfume(topResult.perfume)}
          className="group relative w-full glass-card card-shimmer-effect gold-frame p-0 overflow-hidden text-left transition-all duration-700 rounded-sm"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-72 h-64 md:h-auto bg-background/40 flex-shrink-0 overflow-hidden">
              {topResult.perfume.image ? (
                <img
                  src={topResult.perfume.image}
                  alt={topResult.perfume.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    !isAvailable(topResult.perfume.id)
                      ? "opacity-40"
                      : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                  }`}
                />
              ) : (
                <PerfumeInitial name={topResult.perfume.name} />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 pointer-events-none" />
              <AnimatePresence>
                {!isAvailable(topResult.perfume.id) && <EpuiseOverlay />}
              </AnimatePresence>
              <span className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-display tracking-[0.25em] uppercase rounded-sm gold-glow z-20">
                <Sparkles size={12} />
                Meilleur accord
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center space-y-6">
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-primary group-hover:text-gold-light transition-colors duration-500">
                  {topResult.perfume.name}
                </h3>
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mt-2 font-body">
                  {topResult.perfume.brand}
                </p>
              </div>
              <p className="text-muted-foreground/70 text-sm leading-relaxed line-clamp-2 max-w-lg">
                {topResult.perfume.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground tracking-widest uppercase">Compatibilité</span>
                  <span className="text-primary font-display text-lg">{topResult.matchPercent}%</span>
                </div>
                <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topResult.matchPercent}%` }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(43 60% 38%), hsl(43 72% 52%), hsl(43 80% 65%))" }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground/50 text-xs tracking-wider">
                <span>{topResult.perfume.concentration}</span>
                <span className="w-1 h-1 rounded-full bg-primary/30" />
                <span>{topResult.perfume.gender}</span>
                <span className="w-1 h-1 rounded-full bg-primary/30" />
                <span>{topResult.perfume.brand}</span>
              </div>
            </div>
          </div>
        </motion.button>

        {/* Other Results */}
        {otherResults.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {otherResults.map(({ perfume, matchPercent }, index) => (
              <motion.button
                key={perfume.id}
                variants={staggerItem}
                whileHover={springHover}
                whileTap={springTap}
                onClick={() => onSelectPerfume(perfume)}
                className="group relative glass-card card-shimmer-effect p-0 overflow-hidden text-left transition-all duration-500 rounded-sm gold-border-glow"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="relative w-28 md:w-36 flex-shrink-0 bg-background/40 overflow-hidden">
                    {perfume.image ? (
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          !isAvailable(perfume.id)
                            ? "opacity-40"
                            : "opacity-70 group-hover:opacity-100 group-hover:scale-105"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full min-h-[160px] flex items-center justify-center">
                        <span className="font-display text-4xl text-gold-gradient">{perfume.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 pointer-events-none" />
                    <AnimatePresence>
                      {!isAvailable(perfume.id) && <EpuiseOverlay />}
                    </AnimatePresence>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-xl text-primary group-hover:text-gold-light transition-colors duration-500">
                        {perfume.name}
                      </h3>
                      <p className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase mt-1">
                        {perfume.brand}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground tracking-wider">Compatibilité</span>
                        <span className="text-primary font-display text-base">{matchPercent}%</span>
                      </div>
                      <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${matchPercent}%` }}
                          transition={{ delay: 1 + index * 0.3, duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, hsl(43 60% 38%), hsl(43 72% 52%))" }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground/40 text-[10px] tracking-wider">
                      <span>{perfume.concentration}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-primary/20" />
                      <span>{perfume.gender}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Actions */}
        <motion.div variants={staggerItem} className="flex justify-center gap-5 pt-6">
          <button
            onClick={onMenu}
            className="group flex items-center gap-2.5 px-8 py-3.5 glass-card gold-border-glow hover:gold-glow transition-all duration-500 text-xs tracking-[0.25em] uppercase text-primary/70 hover:text-primary"
          >
            <RotateCcw size={14} className="group-hover:rotate-[-360deg] transition-transform duration-700" />
            Recommencer
          </button>
          <button
            onClick={onLanding}
            className="group flex items-center gap-2.5 px-8 py-3.5 glass-card gold-border-glow hover:gold-glow transition-all duration-500 text-xs tracking-[0.25em] uppercase text-primary/70 hover:text-primary"
          >
            <Home size={14} className="group-hover:scale-110 transition-transform duration-500" />
            Menu
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Check, X, Sparkles, Moon, Sun, Briefcase, Heart, ArrowRight } from "lucide-react";
import { PERFUMES, Perfume } from "@/data/perfumes";

interface DiscoveryJourneyProps {
  onComplete: (profile: any) => void;
}

const DiscoveryJourney = ({ onComplete }: DiscoveryJourneyProps) => {
  const [step, setStep] = useState<'swipe' | 'atmosphere'>('swipe');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  
  // Données pour le Swipe (On prend 5 parfums variés pour tester les goûts)
  const swipeStack = useMemo(() => PERFUMES.slice(0, 6), []);
  const currentPerfume = swipeStack[currentIndex];

  // Animation de Swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const goldGlow = useTransform(x, [0, 200], ["rgba(245,158,11,0)", "rgba(245,158,11,0.5)"]);
  const darkGlow = useTransform(x, [0, -200], ["rgba(0,0,0,0)", "rgba(39,39,42,0.8)"]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') setLikes([...likes, currentPerfume.id]);
    else setDislikes([...dislikes, currentPerfume.id]);

    if (currentIndex < swipeStack.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('atmosphere');
    }
  };

  const contexts = [
    { id: 'soir', label: 'Soirée Gala', icon: <Moon size={24}/>, desc: "Intense & Magnétique" },
    { id: 'jour', label: 'Quotidien', icon: <Sun size={24}/>, desc: "Frais & Lumineux" },
    { id: 'travail', label: 'Business', icon: <Briefcase size={24}/>, desc: "Assuré & Subtil" },
    { id: 'rendezvous', label: 'Rendez-vous', icon: <Heart size={24}/>, desc: "Sensuel & Captivant" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* BACKGROUND : LA CONSTELLATION (B) */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/20 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-amber-500/10 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'swipe' ? (
          <motion.div 
            key="swipe-section"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative w-full max-w-sm flex flex-col items-center"
          >
            <div className="text-center mb-12">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">Étape A : Affinités</span>
              <h2 className="text-3xl font-light tracking-tight italic">L'Accord de l'Instant</h2>
            </div>

            {/* CARTE DE SWIPE */}
            <div className="relative w-full aspect-[3/4] perspective-1000">
              <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) handleSwipe('right');
                  else if (info.offset.x < -100) handleSwipe('left');
                }}
                className="w-full h-full bg-zinc-900 rounded-[2rem] border border-white/10 overflow-hidden relative cursor-grab active:cursor-grabbing shadow-2xl"
              >
                <motion.div style={{ backgroundColor: goldGlow }} className="absolute inset-0 z-10 pointer-events-none" />
                <motion.div style={{ backgroundColor: darkGlow }} className="absolute inset-0 z-10 pointer-events-none" />
                
                <img src={currentPerfume.image} className="w-full h-full object-cover opacity-80" alt={currentPerfume.name} />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-1">{currentPerfume.brand}</p>
                  <h3 className="text-2xl font-light">{currentPerfume.name}</h3>
                </div>
              </motion.div>
            </div>

            <div className="flex gap-12 mt-12">
              <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full border border-white/5 bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"><X/></button>
              <button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full border border-amber-500/20 bg-amber-500/10 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"><Check/></button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="atmosphere-section"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-16">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">Étape C : Contexte</span>
              <h2 className="text-5xl font-extralight tracking-tight mb-4">L'Atmosphère</h2>
              <p className="text-zinc-500 italic">Où cet élixir doit-il vous accompagner ?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contexts.map((ctx) => (
                <button
                  key={ctx.id}
                  onClick={() => onComplete({ likes, context: ctx.id })}
                  className="group relative p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-amber-500/30 transition-all text-left flex items-center gap-6 overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    {ctx.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-light mb-1">{ctx.label}</h4>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{ctx.desc}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="text-amber-500" />
                  </div>
                  {/* Effet doré au survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoveryJourney;

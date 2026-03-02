import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Check, X, Moon, Sun, Briefcase, Heart, ArrowRight, Sparkles } from "lucide-react";
import { PERFUMES } from "@/data/perfumes";

export const DiscoveryJourney = ({ onComplete }: { onComplete: (results: any) => void }) => {
  const [step, setStep] = useState<'swipe' | 'context'>('swipe');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState<string[]>([]);

  const currentPerfume = PERFUMES[currentIndex % PERFUMES.length];

  // Animation Swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleSwipe = (dir: 'left' | 'right') => {
    if (dir === 'right') setLikes([...likes, currentPerfume.id]);
    if (currentIndex < 5) setCurrentIndex(prev => prev + 1);
    else setStep('context');
  };

  if (step === 'context') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Étape C</span>
          <h2 className="text-4xl font-extralight text-white">L'Atmosphère</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {[
            { id: 'soir', label: 'Soirée Gala', icon: <Moon className="text-amber-500" /> },
            { id: 'travail', label: 'Business', icon: <Briefcase className="text-amber-500" /> },
            { id: 'rendezvous', label: 'Rendez-vous', icon: <Heart className="text-amber-500" /> },
            { id: 'quotidien', label: 'Quotidien', icon: <Sun className="text-amber-500" /> }
          ].map(ctx => (
            <button 
              key={ctx.id}
              onClick={() => onComplete({ likes, context: ctx.id })}
              className="flex items-center gap-4 p-6 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-amber-500/50 transition-all group"
            >
              <div className="p-3 bg-black rounded-xl group-hover:scale-110 transition-transform">{ctx.icon}</div>
              <span className="text-white font-light tracking-wide">{ctx.label}</span>
              <ArrowRight className="ml-auto text-zinc-700 group-hover:text-amber-500 transition-colors" size={16} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* BACKGROUND CONSTELLATION (B) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">Étape A : Vos Affinités</span>
          <h2 className="text-2xl font-light text-white italic">"Dites-nous ce qui vous fait vibrer"</h2>
        </div>

        <div className="relative w-full aspect-[3/4]">
          <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) handleSwipe('right');
              else if (info.offset.x < -100) handleSwipe('left');
            }}
            className="w-full h-full bg-zinc-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
          >
            <img src={currentPerfume.image} alt="" className="w-full h-full object-cover opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-0 right-0 px-8 text-center">
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{currentPerfume.brand}</p>
              <h3 className="text-3xl font-light text-white leading-tight">{currentPerfume.name}</h3>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-8 mt-10">
          <button onClick={() => handleSwipe('left')} className="p-5 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white transition-all"><X size={28}/></button>
          <button onClick={() => handleSwipe('right')} className="p-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"><Check size={28}/></button>
        </div>
      </div>
    </div>
  );
};

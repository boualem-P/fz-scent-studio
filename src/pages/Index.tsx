import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Check, X, Moon, Sun, Briefcase, Heart } from "lucide-react";

const TEST_PERFUMES = [
  { id: "1", name: "Oud Noir", brand: "L'Atelier", image: "https://images.unsplash.com/photo-1544467328-345179a4b70b?q=80&w=1000&auto=format&fit=crop" },
  { id: "2", name: "Rose d'Or", brand: "Signature", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" },
  { id: "3", name: "Ambre Gris", brand: "Héritage", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop" }
];

const Index = () => {
  const [step, setStep] = useState<'swipe' | 'context'>('swipe');
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleSwipe = (dir: 'left' | 'right') => {
    if (currentIndex < TEST_PERFUMES.length - 1) setCurrentIndex(prev => prev + 1);
    else setStep('context');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 overflow-hidden font-sans">
      
      {/* EFFET CONSTELLATION (B) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'swipe' ? (
          <motion.div 
            key="swipe"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-sm flex flex-col items-center"
          >
            <div className="text-center mb-8">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">Étape A : Affinités</span>
              <h1 className="text-3xl font-light italic tracking-tight uppercase">L'Accord de l'Instant</h1>
            </div>

            <div className="relative w-full aspect-[3/4] touch-none">
              <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) handleSwipe('right');
                  else if (info.offset.x < -100) handleSwipe('left');
                }}
                className="w-full h-full bg-zinc-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing"
              >
                <img src={TEST_PERFUMES[currentIndex].image} alt="" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-0 right-0 px-8 text-center">
                  <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">{TEST_PERFUMES[currentIndex].brand}</p>
                  <h3 className="text-3xl font-extralight">{TEST_PERFUMES[currentIndex].name}</h3>
                </div>
              </motion.div>
            </div>

            <div className="flex gap-10 mt-10">
              <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full border border-white/5 bg-zinc-900/50 flex items-center justify-center text-zinc-500 hover:text-white transition-all"><X /></button>
              <button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full border border-amber-500/20 bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:bg-amber-500 hover:text-black transition-all"><Check /></button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="context"
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Étape C : Destination</span>
            <h2 className="text-5xl font-extralight text-white mb-12 uppercase tracking-tighter">L'Atmosphère</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Soirée de Gala', icon: <Moon /> },
                { label: 'Rendez-vous', icon: <Heart /> },
                { label: 'Business', icon: <Briefcase /> },
                { label: 'Quotidien', icon: <Sun /> }
              ].map((ctx, i) => (
                <button key={i} className="flex items-center gap-6 p-8 bg-zinc-900/40 border border-white/5 rounded-3xl hover:border-amber-500/40 hover:bg-zinc-800/50 transition-all group text-left">
                  <div className="p-4 bg-black rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">{ctx.icon}</div>
                  <span className="text-xl font-light">{ctx.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

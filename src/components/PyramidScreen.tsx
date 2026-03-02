import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft, ArrowRight } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const FAMILIES = ['AGRUMES', 'ANIMAL', 'BOISÉ', 'ÉPICÉ', 'FLORAL', 'FRUITÉ', 'SUCRÉ', 'VERT'];

// Données fictives pour le swipe (A garder ou adapter)
const NOTES_DATA = {
  top: [{ id: "hesperides", label: "Orange", img: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400", sub: "Hespéridées" }],
  heart: [{ id: "florales", label: "Fleurs", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400", sub: "Florales" }],
  base: [{ id: "boisees", label: "Forêt", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400", sub: "Boisées" }]
};

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map'>('swipe');
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  
  // Intensités de 0.2 à 1
  const [intensities, setIntensities] = useState<number[]>(FAMILIES.map(() => 0.5));

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep] as keyof typeof NOTES_DATA] || NOTES_DATA.top;
  const currentNote = notesAvailable[noteIndex] || notesAvailable[0];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);

  useLayoutEffect(() => { x.set(0); }, [noteIndex, currentStep, x]);

  const handleSwipe = (liked: boolean) => {
    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      setScreen('map');
    }
  };

  // --- LOGIQUE RADAR TACTILE ---
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;

  const getPointPos = (index: number, intensity: number) => {
    const angle = (Math.PI * 2 * index) / FAMILIES.length - Math.PI / 2;
    return {
      x: center + radius * intensity * Math.cos(angle),
      y: center + radius * intensity * Math.sin(angle)
    };
  };

  const updateIntensity = (index: number, info: any) => {
    // Calcul de la distance entre le centre du radar et la position du doigt
    const dx = info.point.x - (window.innerWidth / 2); // Approximation centrée
    const dy = info.point.y - 350; // Ajustement selon la position verticale du radar
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalisation de l'intensité entre 0.1 et 1
    let newIntensity = Math.min(Math.max(distance / radius, 0.1), 1);
    
    const newInts = [...intensities];
    newInts[index] = newIntensity;
    setIntensities(newInts);
  };

  const points = intensities.map((inst, i) => getPointPos(i, inst));
  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 touch-none select-none">
      <AnimatePresence mode="wait">
        {screen === 'swipe' ? (
          <motion.div key="sw" className="w-full max-w-sm flex flex-col items-center">
            {/* ... Partie Swipe inchangée pour la stabilité ... */}
            <h2 className="text-xl font-light mb-8 italic uppercase tracking-widest text-zinc-500 text-center">Sculptez votre sillage</h2>
            <div className="relative w-full aspect-[3/4] mb-12">
                <motion.div
                  key={currentNote.id}
                  style={{ x, rotate }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, i) => {
                    if (i.offset.x > 100) handleSwipe(true);
                    else if (i.offset.x < -100) handleSwipe(false);
                  }}
                  className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <img src={currentNote.img} className="w-full h-2/3 object-cover" />
                  <div className="p-8 text-center bg-white h-1/3 flex flex-col justify-center">
                    <h3 className="text-3xl font-light text-black mb-1 tracking-tighter">{currentNote.label}</h3>
                    <p className="text-amber-600 text-xs font-bold uppercase tracking-widest">{currentNote.sub}</p>
                  </div>
                </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-light mb-2 uppercase tracking-[0.2em] text-amber-500">Signature</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-12">Faites glisser les points dorés</p>
            
            <div className="relative">
              <svg width={size} height={size}>
                {/* Axes et cercles de fond */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                  <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#1a1a1a" strokeWidth="1" />
                ))}
                {FAMILIES.map((_, i) => {
                  const p = getPointPos(i, 1);
                  return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#1a1a1a" strokeWidth="1" />;
                })}

                {/* Zone remplie */}
                <motion.polygon 
                  points={polygonPath} 
                  fill="rgba(245, 158, 11, 0.15)" 
                  stroke="#f59e0b" 
                  strokeWidth="2" 
                />

                {/* Points Interactifs - DRAGGABLE */}
                {points.map((p, i) => (
                  <motion.g key={i}>
                    {/* Zone de contact large pour le doigt */}
                    <motion.circle
                      cx={p.x} cy={p.y} r="25"
                      fill="transparent"
                      className="cursor-pointer"
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0}
                      onDrag={(_, info) => updateIntensity(i, info)}
                    />
                    {/* Le point visible */}
                    <circle 
                      cx={p.x} cy={p.y} r="6" 
                      fill="#f59e0b" 
                      className="pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
                    />
                  </motion.g>
                ))}
              </svg>

              {/* Labels */}
              {FAMILIES.map((f, i) => {
                const p = getPointPos(i, 1.25);
                return (
                  <div key={i} className="absolute text-[8px] font-bold tracking-widest text-zinc-500 whitespace-nowrap" 
                       style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>
                    {f}
                  </div>
                );
              })}
            </div>

            <button onClick={() => onValidate([],[],[])} className="mt-20 w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-amber-500 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              Révéler mon parfum
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

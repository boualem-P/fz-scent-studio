import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft, ArrowRight } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const NOTES_DATA = {
  top: [
    { id: "hesperides", label: "Orange", img: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400", sub: "Notes hespéridées" },
    { id: "marines", label: "Bord de Mer", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", sub: "Notes aquatiques" }
  ],
  heart: [
    { id: "florales", label: "Bouquet de Fleurs", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400", sub: "Notes florales" },
    { id: "fruitees", label: "Panier de Fruits", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400", sub: "Notes fruitées" }
  ],
  base: [
    { id: "boisees", label: "Forêt d'Automne", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400", sub: "Notes boisées" },
    { id: "ambrees", label: "Vanille", img: "https://images.unsplash.com/photo-1595589949475-394e277c082b?q=80&w=400", sub: "Épices chaudes" }
  ]
};

const FAMILIES = ['AGRUMES', 'ANIMAL', 'BOISÉ', 'ÉPICÉ', 'FLORAL', 'FRUITÉ', 'SUCRÉ', 'VERT'];

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map'>('swipe');
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  
  // Intensités de 0.2 à 1 (pour ne pas être à 0 au centre)
  const [intensities, setIntensities] = useState<number[]>(FAMILIES.map(() => 0.5));

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep] as keyof typeof NOTES_DATA];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opRight = useTransform(x, [50, 150], [0, 1]);
  const opLeft = useTransform(x, [-150, -50], [1, 0]);

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

  // Logique du Radar Manuel
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;

  const getPointPos = (index: number, intensity: number) => {
    const angle = (Math.PI * 2 * index) / FAMILIES.length - Math.PI / 2;
    return {
      x: center + radius * intensity * Math.cos(angle),
      y: center + radius * intensity * Math.sin(angle)
    };
  };

  const points = intensities.map((inst, i) => getPointPos(i, inst));
  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  const handleNodeClick = (index: number) => {
    const newInts = [...intensities];
    newInts[index] = newInts[index] >= 1 ? 0.2 : newInts[index] + 0.2;
    setIntensities(newInts);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 select-none">
      <AnimatePresence mode="wait">
        {screen === 'swipe' ? (
          <motion.div key="sw" className="w-full max-w-sm flex flex-col items-center">
            <h2 className="text-xl font-light mb-8 italic uppercase tracking-widest text-zinc-500">Affinez vos désirs</h2>
            
            <div className="relative w-full aspect-[3/4] mb-12">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentNote.id}
                  style={{ x, rotate }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, i) => {
                    if (i.offset.x > 100) handleSwipe(true);
                    else if (i.offset.x < -100) handleSwipe(false);
                  }}
                  initial={{ opacity: 0, scale: 0.9, x: 0 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <img src={currentNote.img} className="w-full h-2/3 object-cover grayscale-[20%]" />
                  <motion.div style={{ opacity: opRight }} className="absolute top-1/2 right-6 bg-amber-500 p-4 rounded-full text-black z-20 shadow-xl"><Smile size={32}/></motion.div>
                  <motion.div style={{ opacity: opLeft }} className="absolute top-1/2 left-6 bg-zinc-800 p-4 rounded-full text-white z-20 shadow-xl"><Frown size={32}/></motion.div>
                  
                  <div className="p-8 text-center bg-white h-1/3 flex flex-col justify-center">
                    <h3 className="text-3xl font-light text-black mb-1 tracking-tighter">{currentNote.label}</h3>
                    <p className="text-amber-600 text-xs font-bold uppercase tracking-widest">{currentNote.sub}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div key="map" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-light mb-2 uppercase tracking-[0.2em] text-amber-500">Signature</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-8">Sculptez votre sillage</p>
            
            {/* RADAR SVG PERSONNALISÉ */}
            <div className="relative">
              <svg width={size} height={size} className="drop-shadow-2xl">
                {/* Grilles de fond */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                  <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#222" strokeWidth="1" />
                ))}
                {FAMILIES.map((_, i) => {
                  const p = getPointPos(i, 1);
                  return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#222" strokeWidth="1" />;
                })}

                {/* Forme du Radar */}
                <polygon points={polygonPath} fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2" className="transition-all duration-300" />

                {/* Points Interactifs (Les Nœuds) */}
                {points.map((p, i) => (
                  <g key={i} onClick={() => handleNodeClick(i)} className="cursor-pointer group">
                    <circle cx={p.x} cy={p.y} r="8" fill="#f59e0b" className="transition-all duration-300 group-hover:r-12" />
                    <circle cx={p.x} cy={p.y} r="15" fill="transparent" />
                  </g>
                ))}
              </svg>

              {/* Libellés autour du radar */}
              {FAMILIES.map((f, i) => {
                const p = getPointPos(i, 1.25);
                return (
                  <div key={i} className="absolute text-[9px] font-bold tracking-tighter text-zinc-400" 
                       style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>
                    {f}
                  </div>
                );
              })}
            </div>

            <p className="mt-12 text-[9px] text-zinc-600 uppercase tracking-[0.3em] text-center">Appuyez sur les points dorés pour intensifier</p>

            <button onClick={() => onValidate([],[],[])} className="mt-10 w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-amber-500 transition-all shadow-xl active:scale-95">
              Révéler l'élixir
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

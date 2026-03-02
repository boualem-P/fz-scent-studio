import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const FAMILIES = ['AGRUMES', 'ANIMAL', 'BOISÉ', 'ÉPICÉ', 'FLORAL', 'FRUITÉ', 'SUCRÉ', 'VERT'];

// --- BASE DE DONNÉES COMPLÈTE DES CARTES ---
const NOTES_DATA: Record<string, { id: NoteCategory, label: string, img: string, sub: string }[]> = {
  top: [
    { id: "hesperides", label: "Citron & Bergamote", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=400", sub: "Fraîcheur vive" },
    { id: "marines", label: "Brise Marine", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", sub: "Notes aquatiques" },
    { id: "aromatiques", label: "Menthe & Lavande", img: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?q=80&w=400", sub: "Herbes fraîches" }
  ],
  heart: [
    { id: "florales", label: "Rose & Jasmin", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400", sub: "Cœur romantique" },
    { id: "fruitees", label: "Pêche & Fruits Rouges", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400", sub: "Douceur fruitée" },
    { id: "epicees", label: "Poivre & Gingembre", img: "https://images.unsplash.com/photo-1599940824399-b87987cb94e5?q=80&w=400", sub: "Épices froides" }
  ],
  base: [
    { id: "boisees", label: "Santal & Cèdre", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400", sub: "Structure boisée" },
    { id: "ambrees", label: "Ambre & Musc", img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400", sub: "Sillage profond" },
    { id: "gourmandes", label: "Vanille & Caramel", img: "https://images.unsplash.com/photo-1595589949475-394e277c082b?q=80&w=400", sub: "Notes sucrées" },
    { id: "animales", label: "Cuir & Tabac", img: "https://images.unsplash.com/photo-1524292332606-07524d713fd8?q=80&w=400", sub: "Caractère intense" }
  ]
};

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map'>('swipe');
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [intensities, setIntensities] = useState<number[]>(FAMILIES.map(() => 0.5));
  
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const steps = ["top", "heart", "base"];
  const stepLabels = ["Notes de Tête", "Notes de Cœur", "Notes de Fond"];
  const stepIcons = [<Wind size={16}/>, <Droplets size={16}/>, <Sparkles size={16}/>];
  
  const notesAvailable = NOTES_DATA[steps[currentStep]];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opRight = useTransform(x, [50, 150], [0, 1]);
  const opLeft = useTransform(x, [-150, -50], [1, 0]);

  useLayoutEffect(() => { x.set(0); }, [noteIndex, currentStep, x]);

  const handleSwipe = (liked: boolean) => {
    const key = steps[currentStep] as keyof typeof selections;
    const newSelections = { ...selections };
    if (liked) {
      newSelections[key] = [...newSelections[key], currentNote.id];
      setSelections(newSelections);
    }

    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      setScreen('map');
    }
  };

  // --- LOGIQUE RADAR ---
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
    // Calcul de la distance relative au centre (on utilise le milieu du SVG)
    const rect = document.getElementById('radar-svg')?.getBoundingClientRect();
    if (!rect) return;
    
    const dx = info.point.x - (rect.left + rect.width / 2);
    const dy = info.point.y - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 text-amber-500 mb-2 font-black uppercase tracking-[0.4em] text-[10px]">
                {stepIcons[currentStep]} {stepLabels[currentStep]}
              </div>
              <h2 className="text-2xl font-light italic text-white/90">Affinez vos désirs</h2>
            </div>
            
            <div className="relative w-full aspect-[3/4] mb-12">
              <AnimatePresence mode="popLayout" initial={false}>
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
                  exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.4 } }}
                  className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <img src={currentNote.img} className="w-full h-2/3 object-cover" alt="" />
                  <motion.div style={{ opacity: opRight }} className="absolute top-1/2 right-6 bg-amber-500 p-4 rounded-full text-black z-20 shadow-xl"><Smile size={32}/></motion.div>
                  <motion.div style={{ opacity: opLeft }} className="absolute top-1/2 left-6 bg-zinc-800 p-4 rounded-full text-white z-20 shadow-xl"><Frown size={32}/></motion.div>
                  
                  <div className="p-8 text-center bg-white h-1/3 flex flex-col justify-center">
                    <h3 className="text-3xl font-light text-black mb-1 tracking-tighter">{currentNote.label}</h3>
                    <p className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.3em]">{currentNote.sub}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{noteIndex + 1} / {notesAvailable.length}</p>
          </motion.div>
        ) : (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-light mb-2 uppercase tracking-[0.2em] text-amber-500">Signature</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-12">Sculptez votre intensité</p>
            
            <div className="relative">
              <svg id="radar-svg" width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                  <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#1a1a1a" strokeWidth="1" />
                ))}
                {FAMILIES.map((_, i) => {
                  const p = getPointPos(i, 1);
                  return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#1a1a1a" strokeWidth="1" />;
                })}
                <motion.polygon points={polygonPath} fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />

                {points.map((p, i) => (
                  <motion.g key={i}>
                    <motion.circle
                      cx={p.x} cy={p.y} r="25" fill="transparent" className="cursor-pointer"
                      drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDrag={(_, info) => updateIntensity(i, info)}
                    />
                    <circle cx={p.x} cy={p.y} r="6" fill="#f59e0b" className="pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                  </motion.g>
                ))}
              </svg>

              {FAMILIES.map((f, i) => {
                const p = getPointPos(i, 1.25);
                return (
                  <div key={i} className="absolute text-[8px] font-bold tracking-widest text-zinc-500" 
                       style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>
                    {f}
                  </div>
                );
              })}
            </div>

            <button onClick={() => onValidate(selections.top, selections.heart, selections.base)} className="mt-20 w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-amber-500 transition-all shadow-xl">
              Révéler mon élixir
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pb-10 w-full max-w-xs flex justify-between items-center opacity-30">
        <button onClick={onMenu} className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors">
          <ArrowLeft size={14}/> Retour
        </button>
      </div>
    </div>
  );
};

export default PyramidScreen;

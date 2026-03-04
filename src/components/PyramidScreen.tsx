import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Moon, Sun, Briefcase, Heart, ArrowRight, Smile, Frown, Loader2 } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  // Ajout du paramètre opionnel accords pour la transmission
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[], atmosphere?: string, accords?: any[]) => void;
  onMenu: () => void;
}

const FAMILIES = ['AGRUMES', 'ANIMAL', 'BOISÉ', 'ÉPICÉ', 'FLORAL', 'FRUITÉ', 'SUCRÉ', 'VERT'];

const NOTES_DATA: Record<string, { id: NoteCategory, label: string, img: string, sub: string }[]> = {
  top: [
    { id: "hesperides", label: "Citron & Bergamote", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=400", sub: "Fraîcheur vive" },
    { id: "marines", label: "Brise Marine", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", sub: "Notes aquatiques" }
  ],
  heart: [
    { id: "florales", label: "Rose & Jasmin", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400", sub: "Cœur romantique" },
    { id: "epicees", label: "Poivre & Gingembre", img: "https://images.unsplash.com/photo-1599940824399-b87987cb94e5?q=80&w=400", sub: "Épices froides" }
  ],
  base: [
    { id: "boisees", label: "Santal & Cèdre", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400", sub: "Structure boisée" },
    { id: "gourmandes", label: "Vanille & Caramel", img: "https://images.unsplash.com/photo-1595589949475-394e277c082b?q=80&w=400", sub: "Notes sucrées" }
  ]
};

const ATMOSPHERES = [
  { id: 'soir', label: 'Soirée de Gala', icon: <Moon size={24}/>, desc: "Intense & Magnétique", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400" },
  { id: 'quotidien', label: 'Signature Quotidienne', icon: <Sun size={24}/>, desc: "Léger & Lumineux", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400" },
  { id: 'business', label: 'Business & Influence', icon: <Briefcase size={24}/>, desc: "Assuré & Subtil", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400" },
  { id: 'rendezvous', label: 'Rendez-vous', icon: <Heart size={24}/>, desc: "Sensuel & Captivant", img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=400" },
];

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map' | 'atmosphere'>('swipe');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [intensities, setIntensities] = useState<number[]>(FAMILIES.map(() => 0.5));
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep]];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const frownOpacity = useTransform(x, [-120, 0], [1, 0.6]);
  const smileOpacity = useTransform(x, [0, 120], [0.6, 1]);

  // CALCULE LES ACCORDS DYNAMIQUEMENT SELON LE RADAR
  const calculateAccords = () => {
    const colors = ["#F4F933", "#E11D48", "#8A6240", "#9CD66A", "#B35A2D", "#60A5FA", "#F59E0B", "#10B981"];
    return FAMILIES.map((label, i) => ({
      label: label.charAt(0) + label.slice(1).toLowerCase(),
      value: Math.round(intensities[i] * 100),
      color: colors[i]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4); // On prend les 4 accords majeurs
  };

  const triggerTransition = (nextScreen: 'swipe' | 'map' | 'atmosphere', text: string) => {
    setAnalysisText(text);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setScreen(nextScreen);
    }, 3000);
  };

  const handleSwipe = (liked: boolean) => {
    const key = steps[currentStep] as keyof typeof selections;
    if (liked) setSelections(prev => ({ ...prev, [key]: [...prev[key], currentNote.id] }));

    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      triggerTransition('map', "Harmonisation des essences...");
    }
    x.set(0); 
  };

  const size = 300;
  const center = size / 2;
  const radius = size * 0.38;
  const getPointPos = (index: number, intensity: number) => {
    const angle = (Math.PI * 2 * index) / FAMILIES.length - Math.PI / 2;
    return { x: center + radius * intensity * Math.cos(angle), y: center + radius * intensity * Math.sin(angle) };
  };

  const updateIntensity = (index: number, info: any) => {
    const rect = document.getElementById('radar-svg')?.getBoundingClientRect();
    if (!rect) return;
    const dx = info.point.x - (rect.left + rect.width / 2);
    const dy = info.point.y - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const newInts = [...intensities];
    newInts[index] = Math.min(Math.max(distance / radius, 0.1), 1);
    setIntensities(newInts);
  };

  const points = intensities.map((inst, i) => getPointPos(i, inst));
  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 touch-none select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-10 text-center">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-t-2 border-amber-500 rounded-full mb-8" />
             <p className="text-amber-500 font-light italic tracking-[0.2em] text-sm uppercase">{analysisText}</p>
          </motion.div>
        ) : screen === 'swipe' ? (
          <motion.div key="swipe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm flex flex-col items-center">
            <h2 className="text-xl font-light mb-8 italic uppercase tracking-widest text-zinc-400">Affinez vos désirs</h2>
            <div className="relative w-full aspect-[3/4.2] mb-12">
              <div className="absolute inset-x-[-60px] top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-0">
                <motion.div style={{ opacity: frownOpacity }}><Frown size={40} /></motion.div>
                <motion.div style={{ opacity: smileOpacity }}><Smile size={40} /></motion.div>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${currentStep}-${noteIndex}`}
                  style={{ x }} drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => { if (info.offset.x > 100) handleSwipe(true); else if (info.offset.x < -100) handleSwipe(false); }}
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-[2rem] overflow-hidden"
                >
                  <img src={currentNote.img} className="w-full h-2/3 object-cover" />
                  <div className="p-6 text-center h-1/3 flex flex-col justify-center bg-white">
                    <h3 className="text-xl font-light text-black uppercase tracking-tighter">{currentNote.label}</h3>
                    <p className="text-amber-600 text-[10px] font-bold uppercase">{currentNote.sub}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : screen === 'map' ? (
          <motion.div key="map" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-10">Architecture</h2>
            <div className="relative">
              <svg id="radar-svg" width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => ( <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#222" /> ))}
                <polygon points={polygonPath} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                {points.map((p, i) => (
                  <motion.g key={i}>
                    <motion.circle cx={p.x} cy={p.y} r="20" fill="transparent" drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} onDrag={(_, info) => updateIntensity(i, info)} />
                    <circle cx={p.x} cy={p.y} r="5" fill="#f59e0b" />
                  </motion.g>
                ))}
              </svg>
              {FAMILIES.map((f, i) => { const p = getPointPos(i, 1.25); return <div key={i} className="absolute text-[8px] font-bold text-zinc-500 uppercase" style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}>{f}</div>; })}
            </div>
            <button onClick={() => triggerTransition('atmosphere', "Définition de l'univers...")} className="mt-16 w-full bg-white text-black py-4 rounded-full font-bold uppercase text-[10px] tracking-widest">Suivant</button>
          </motion.div>
        ) : (
          <motion.div key="atm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-lg">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-center mb-10">Univers</h2>
            <div className="grid grid-cols-1 gap-4 px-4">
              {ATMOSPHERES.map((atm) => (
                <button 
                  key={atm.id} 
                  onClick={() => onValidate(selections.top, selections.heart, selections.base, atm.id, calculateAccords())}
                  className="group relative h-24 rounded-2xl border border-white/5 bg-zinc-900/40 overflow-hidden flex items-center p-6"
                >
                  <img src={atm.img} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                  <div className="relative z-10 flex items-center gap-6 w-full">
                    <div className="text-amber-500">{atm.icon}</div>
                    <div className="text-left">
                      <h4 className="text-lg font-light">{atm.label}</h4>
                      <p className="text-[8px] uppercase tracking-widest text-zinc-500">{atm.desc}</p>
                    </div>
                    <ArrowRight className="ml-auto text-zinc-700 group-hover:text-amber-500" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

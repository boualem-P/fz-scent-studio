import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft, ArrowRight } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

// Données des notes pour le Swipe (A)
const NOTES_DATA: Record<string, { id: NoteCategory, label: string, img: string }[]> = {
  top: [
    { id: "hesperides", label: "Agrumes", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=400" },
    { id: "aromatiques", label: "Aromates", img: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?q=80&w=400" },
    { id: "marines", label: "Marines", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" }
  ],
  heart: [
    { id: "florales", label: "Fleurs", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400" },
    { id: "fruitees", label: "Fruits", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400" }
  ],
  base: [
    { id: "boisees", label: "Bois", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400" },
    { id: "ambrees", label: "Ambre", img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400" }
  ]
};

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map'>('swipe');
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [intensities, setIntensities] = useState<Record<string, number>>({
    Frais: 50, Boisé: 50, Floral: 50, Oriental: 50, Sucré: 50
  });
  
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const stepInfo = [
    { id: "top", label: "Notes de Tête", icon: <Wind size={16}/> },
    { id: "heart", label: "Notes de Cœur", icon: <Droplets size={16}/> },
    { id: "base", label: "Notes de Fond", icon: <Sparkles size={16}/> }
  ][currentStep];

  const notesAvailable = NOTES_DATA[stepInfo.id as keyof typeof NOTES_DATA];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacityIconLeft = useTransform(x, [-150, -50], [1, 0]);
  const opacityIconRight = useTransform(x, [50, 150], [0, 1]);

  useEffect(() => { x.set(0); }, [noteIndex, currentStep, x]);

  const handleNextSwipe = (liked: boolean) => {
    const key = stepInfo.id as keyof typeof selections;
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
      setScreen('map'); // Passage à l'étape B
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-24 px-6 overflow-hidden">
      
      <AnimatePresence mode="wait">
        {screen === 'swipe' ? (
          <motion.div 
            key="swipe-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full"
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 text-amber-500 mb-2 font-black uppercase tracking-[0.4em] text-[10px]">
                {stepInfo.icon} {stepInfo.label}
              </div>
              <h2 className="text-3xl font-light uppercase tracking-tighter italic text-white/90">L'Accord de l'Instant</h2>
            </div>

            <div className="relative w-full max-w-[320px] aspect-[3/4] mb-20">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${currentStep}-${currentNote.id}`}
                  style={{ x, rotate }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) handleNextSwipe(true);
                    else if (info.offset.x < -100) handleNextSwipe(false);
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.4 } }}
                  className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
                >
                  <img src={currentNote.img} alt="" className="w-full h-full object-cover opacity-50 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                  
                  <motion.div style={{ opacity: opacityIconRight }} className="absolute top-10 right-10 text-amber-500 bg-black/60 p-4 rounded-full border border-amber-500/50">
                    <Smile size={48} strokeWidth={2.5} />
                  </motion.div>
                  <motion.div style={{ opacity: opacityIconLeft }} className="absolute top-10 left-10 text-white/50 bg-black/60 p-4 rounded-full border border-white/20">
                    <Frown size={48} strokeWidth={2.5} />
                  </motion.div>

                  <div className="absolute bottom-12 left-0 right-0 text-center px-6">
                    <p className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.5em] mb-2 italic">Essence</p>
                    <h3 className="text-4xl font-extralight tracking-tight">{currentNote.label}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="map-screen"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full max-w-2xl"
          >
            <div className="text-center mb-10">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">Étape B : Affinage</span>
              <h2 className="text-4xl font-light uppercase italic">Le Radar de Signature</h2>
              <p className="text-zinc-500 text-sm mt-2">Ajustez l'intensité des familles olfactives</p>
            </div>

            {/* MAP INTERACTIVE (SLIDERS LUXE) */}
            <div className="w-full space-y-8 bg-zinc-900/30 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl">
              {Object.entries(intensities).map(([family, value]) => (
                <div key={family} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{family}</span>
                    <span className="text-amber-500 font-serif italic text-lg">{value}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={value}
                    onChange={(e) => setIntensities({...intensities, [family]: parseInt(e.target.value)})}
                    className="w-full h-[2px] bg-zinc-800 appearance-none cursor-pointer accent-amber-500"
                    style={{ background: `linear-gradient(to right, #f59e0b ${value}%, #27272a ${value}%)` }}
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={() => onValidate(selections.top, selections.heart, selections.base)}
              className="mt-12 flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-amber-500 transition-all group"
            >
              Découvrir ma sélection <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pb-10 w-full max-w-xs flex justify-between items-center opacity-30">
        <button onClick={onMenu} className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
          <ArrowLeft size={14}/> Retour
        </button>
        <span className="text-[10px] uppercase tracking-widest font-black text-amber-500">
          {screen === 'swipe' ? `${noteIndex + 1} / ${notesAvailable.length}` : 'Finalisation'}
        </span>
      </div>
    </div>
  );
};

export default PyramidScreen;

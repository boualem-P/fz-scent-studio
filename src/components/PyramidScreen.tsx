import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft, Moon, Sun, Briefcase, Heart, ArrowRight } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[], atmosphere?: string) => void;
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
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [intensities, setIntensities] = useState<number[]>(FAMILIES.map(() => 0.5));
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep]];
  const currentNote = notesAvailable[noteIndex];
  
  // Préparation de la carte suivante pour l'effet visuel
  const nextNote = notesAvailable[noteIndex + 1] || (currentStep < 2 ? NOTES_DATA[steps[currentStep + 1]][0] : null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacityIcons = useTransform(x, [-120, 0, 120], [1, 0, 1]);

  useLayoutEffect(() => { 
    x.set(0); 
    y.set(0); 
  }, [noteIndex, currentStep, screen]);

  const handleSwipe = (liked: boolean) => {
    const key = steps[currentStep] as keyof typeof selections;
    if (liked) setSelections(prev => ({ ...prev, [key]: [...prev[key], currentNote.id] }));

    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      setScreen('map');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 touch-none select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'swipe' ? (
          <motion.div key="sw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm flex flex-col items-center">
            
            <header className="text-center mb-10">
               <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Étape {currentStep + 1} sur 3</p>
               <h2 className="text-2xl font-light uppercase tracking-tighter italic text-white/90">Affinez votre sillage</h2>
            </header>
            
            <div className="relative w-full aspect-[3/4.2] mb-12 flex items-center justify-center">
              
              {/* LA CARTE EN ATTENTE (Celle qui va arriver) */}
              <AnimatePresence>
                {nextNote && (
                  <motion.div 
                    key={nextNote.id + "-bg"}
                    initial={{ scale: 0.85, opacity: 0.3, y: 15, rotate: 2 }}
                    animate={{ scale: 0.92, opacity: 0.5, y: 10, rotate: 2 }}
                    exit={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                    className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-zinc-200 pointer-events-none"
                    style={{ zIndex: 1 }}
                  >
                    <img src={nextNote.img} className="w-full h-2/3 object-cover grayscale-[30%]" />
                    <div className="p-8 text-center bg-white h-1/3 flex flex-col justify-center">
                      <h3 className="text-2xl font-light text-black/20 mb-1">{nextNote.label}</h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LA CARTE ACTIVE (Celle qu'on manipule) */}
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={currentNote.id} 
                  style={{ x, y, rotate, zIndex: 10 }} 
                  drag 
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.9}
                  onDragEnd={(_, info) => { 
                    if (info.offset.x > 130) handleSwipe(true); 
                    else if (info.offset.x < -130) handleSwipe(false); 
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ 
                    x: x.get() > 0 ? 600 : -600, 
                    opacity: 0, 
                    rotate: x.get() > 0 ? 45 : -45,
                    transition: { duration: 0.4, ease: "easeIn" }
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border border-zinc-100"
                >
                  <div className="w-full h-2/3 relative pointer-events-none">
                    <img src={currentNote.img} className="w-full h-full object-cover" />
                    
                    {/* Indicateurs visuels Like/Dislike */}
                    <motion.div style={{ opacity: opacityIcons }} className="absolute inset-0 flex items-center justify-between px-10 bg-black/5">
                       <Frown size={80} className="text-white/40" />
                       <Smile size={80} className="text-amber-500/60" />
                    </motion.div>
                  </div>

                  <div className="p-8 text-center bg-white h-1/3 flex flex-col justify-center pointer-events-none">
                    <span className="text-amber-600 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{currentNote.sub}</span>
                    <h3 className="text-3xl font-light text-black tracking-tighter leading-none mb-1 uppercase">
                      {currentNote.label}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col items-center gap-2 opacity-40">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em]">Explorer l'essence</p>
                <div className="flex gap-4">
                    <div className="w-8 h-[1px] bg-zinc-700" />
                    <div className="w-1 h-1 rounded-full bg-amber-500" />
                    <div className="w-8 h-[1px] bg-zinc-700" />
                </div>
            </div>
          </motion.div>
        ) : screen === 'map' ? (
          // Le reste de ton code (Radar et Atmosphère) reste identique...
          <div className="text-center p-10">
            <h2 className="text-amber-500 uppercase tracking-widest mb-10">Profil Olfactif Établi</h2>
            <button onClick={() => setScreen('atmosphere')} className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase text-[10px]">Continuer</button>
          </div>
        ) : (
          <div className="text-center p-10">
            <h2 className="text-white uppercase tracking-widest mb-10">Choix de l'Atmosphère</h2>
            <button onClick={() => onValidate(selections.top, selections.heart, selections.base)} className="bg-amber-500 text-black px-10 py-4 rounded-full font-bold uppercase text-[10px]">Révéler mon parfum</button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

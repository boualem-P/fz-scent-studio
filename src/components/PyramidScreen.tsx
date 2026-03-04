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
    { id: "marines", label: "Brise Marine", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", sub: "Notes aquatiques" },
    { id: "aromatiques", label: "Lavande Sauvage", img: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?q=80&w=400", sub: "Herbes fraîches" }
  ],
  heart: [
    { id: "florales", label: "Rose & Jasmin", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400", sub: "Cœur romantique" },
    { id: "fruitees", label: "Fruits Rouges", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400", sub: "Douceur fruitée" }
  ],
  base: [
    { id: "boisees", label: "Santal & Cèdre", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400", sub: "Structure boisée" },
    { id: "ambrees", label: "Ambre Gris", img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400", sub: "Sillage profond" }
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
  const hasNextCard = noteIndex < notesAvailable.length - 1 || currentStep < 2;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacityIcons = useTransform(x, [-100, 0, 100], [1, 0, 1]);

  // Réinitialisation forcée au milieu
  useLayoutEffect(() => {
    x.set(0);
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

  // Logique Radar (Simplifiée pour la clarté)
  const size = 300;
  const center = size / 2;
  const radius = size * 0.38;
  const getPointPos = (index: number, intensity: number) => {
    const angle = (Math.PI * 2 * index) / FAMILIES.length - Math.PI / 2;
    return { x: center + radius * intensity * Math.cos(angle), y: center + radius * intensity * Math.sin(angle) };
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 touch-none select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'swipe' ? (
          <motion.div key="sw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm flex flex-col items-center">
            
            <header className="text-center mb-12">
               <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Étape {currentStep + 1}/3</p>
               <h2 className="text-3xl font-light italic tracking-tight uppercase">Vos Affinités</h2>
            </header>

            <div className="relative w-full aspect-[3/4.5] mb-12">
              {/* CARTE DE FOND (STACK EFFECT) */}
              {hasNextCard && (
                <div className="absolute inset-0 bg-zinc-800 rounded-[2.5rem] scale-[0.94] translate-y-4 rotate-2 opacity-40 border border-white/10" />
              )}

              {/* CARTE ACTIVE */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${currentStep}-${currentNote.id}`} // Key unique pour recentrer
                  style={{ x, rotate }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, i) => {
                    if (i.offset.x > 100) handleSwipe(true);
                    else if (i.offset.x < -100) handleSwipe(false);
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ x: x.get() > 0 ? 600 : -600, opacity: 0, transition: { duration: 0.3 } }}
                  whileTap={{ cursor: "grabbing" }}
                  className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/20 cursor-grab"
                >
                  {/* Toute cette zone est maintenant Swipable */}
                  <div className="relative h-full w-full flex flex-col">
                    <img src={currentNote.img} className="w-full h-3/5 object-cover pointer-events-none" alt="" />
                    
                    {/* Indicateurs de swipe */}
                    <motion.div style={{ opacity: opacityIcons }} className="absolute inset-0 pointer-events-none flex items-center justify-between px-10">
                       <Frown size={60} className="text-black/20" />
                       <Smile size={60} className="text-amber-500/40" />
                    </motion.div>

                    <div className="flex-1 p-8 text-center bg-white flex flex-col justify-center pointer-events-none">
                      <span className="text-amber-600 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{currentNote.sub}</span>
                      <h3 className="text-4xl font-light text-black tracking-tighter leading-none mb-4 uppercase italic">
                        {currentNote.label}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">Balayez pour choisir</p>

          </motion.div>
        ) : screen === 'map' ? (
           <motion.div key="map">
              {/* Garder le code du radar précédent ici */}
              <h2 className="text-center text-amber-500 uppercase tracking-widest">Étape B : Le Radar</h2>
              <button onClick={() => setScreen('atmosphere')} className="mt-20 bg-white text-black px-10 py-4 rounded-full uppercase text-[10px] font-bold tracking-widest">Continuer</button>
           </motion.div>
        ) : (
          <motion.div key="atm">
             {/* Garder le code de l'atmosphère précédent ici */}
             <h2 className="text-center text-amber-500 uppercase tracking-widest">Étape C : Atmosphère</h2>
             <button onClick={() => onValidate(selections.top, selections.heart, selections.base)} className="mt-20 bg-white text-black px-10 py-4 rounded-full uppercase text-[10px] font-bold tracking-widest">Valider</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const STEPS = [
  { id: "top", label: "Notes de Tête", icon: <Wind size={16}/> },
  { id: "heart", label: "Notes de Cœur", icon: <Droplets size={16}/> },
  { id: "base", label: "Notes de Fond", icon: <Sparkles size={16}/> }
];

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
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const stepInfo = STEPS[currentStep];
  const notesAvailable = NOTES_DATA[stepInfo.id];
  const currentNote = notesAvailable[noteIndex];

  // Motion values pour le swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacityIconLeft = useTransform(x, [-150, -50], [1, 0]);
  const opacityIconRight = useTransform(x, [50, 150], [0, 1]);

  const handleNext = (liked: boolean) => {
    const key = stepInfo.id as keyof typeof selections;
    
    // Si aimé, on ajoute à la sélection
    const newSelections = { ...selections };
    if (liked) {
      newSelections[key] = [...newSelections[key], currentNote.id];
      setSelections(newSelections);
    }

    // Navigation
    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      onValidate(newSelections.top, newSelections.heart, newSelections.base);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-24 px-6 overflow-hidden">
      
      {/* Header Interne */}
      <div className="text-center mb-12 z-10">
        <div className="flex items-center justify-center gap-2 text-amber-500 mb-2">
          {stepInfo.icon}
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">{stepInfo.label}</span>
        </div>
        <h2 className="text-3xl font-light text-white uppercase tracking-tighter">Votre Ressenti</h2>
      </div>

      {/* Zone de Swipe */}
      <div className="relative w-full max-w-[320px] aspect-[3/4] mb-20">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentNote.id}
            style={{ x, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) handleNext(true);
              else if (info.offset.x < -100) handleNext(false);
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: x.get() > 0 ? 400 : -400, opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
          >
            <img src={currentNote.img} alt="" className="w-full h-full object-cover opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
            
            {/* Indicateurs de swipe */}
            <motion.div style={{ opacity: opacityIconRight }} className="absolute top-10 right-10 text-amber-500 bg-black/50 p-4 rounded-full backdrop-blur-md border border-amber-500/50">
              <Smile size={40} />
            </motion.div>
            <motion.div style={{ opacity: opacityIconLeft }} className="absolute top-10 left-10 text-zinc-500 bg-black/50 p-4 rounded-full backdrop-blur-md border border-white/20">
              <Frown size={40} />
            </motion.div>

            <div className="absolute bottom-12 left-0 right-0 text-center px-6">
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-2">Note Olfactive</p>
              <h3 className="text-4xl font-extralight text-white tracking-tight">{currentNote.label}</h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="mt-auto pb-12 w-full max-w-xs flex justify-between items-center opacity-40">
        <button onClick={onMenu} className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors">
          <ArrowLeft size={14}/> Retour
        </button>
        <div className="text-[10px] font-bold tracking-[0.2em] text-amber-500">
          {noteIndex + 1} / {notesAvailable.length}
        </div>
      </div>
    </div>
  );
};

export default PyramidScreen;

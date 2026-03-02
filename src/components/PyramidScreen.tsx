import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Droplets, Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const STEPS = [
  { id: "top", label: "Notes de Tête", icon: <Wind />, desc: "La première impression, vive et éphémère" },
  { id: "heart", label: "Notes de Cœur", icon: <Droplets />, desc: "L'âme du parfum, son caractère véritable" },
  { id: "base", label: "Notes de Fond", icon: <Sparkles />, desc: "Le sillage sacré, votre signature durable" }
];

// Sélection raffinée des notes les plus importantes (Luxe)
const NOTES_BY_STEP: Record<string, { id: NoteCategory, label: string }[]> = {
  top: [
    { id: "hesperides", label: "Agrumes" },
    { id: "aromatiques", label: "Herbes Fraîches" },
    { id: "marines", label: "Océanique" },
    { id: "epices-fraiches", label: "Épices Froides" }
  ],
  heart: [
    { id: "florales", label: "Bouquet Floral" },
    { id: "fruitees", label: "Fruits Exotiques" },
    { id: "notes-vertes", label: "Nature Sauvage" },
    { id: "epices-chaudes", label: "Épices Sensuelles" }
  ],
  base: [
    { id: "boisees", label: "Bois Précieux" },
    { id: "ambrees", label: "Ambre Oriental" },
    { id: "musquees", label: "Musc Blanc" },
    { id: "gourmandes", label: "Notes Sucrées" },
    { id: "mousses", label: "Mousse de Chêne" }
  ]
};

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const stepInfo = STEPS[currentStep];
  const stepNotes = NOTES_BY_STEP[stepInfo.id];

  const toggleNote = (noteId: NoteCategory) => {
    const key = stepInfo.id as keyof typeof selections;
    setSelections(prev => ({
      ...prev,
      [key]: prev[key].includes(noteId) 
        ? prev[key].filter(id => id !== noteId) 
        : [...prev[key], noteId]
    }));
  };

  const next = () => {
    if (currentStep < 2) setCurrentStep(prev => prev + 1);
    else onValidate(selections.top, selections.heart, selections.base);
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
    else onMenu();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 pt-24">
      
      {/* INDICATEUR DE PROGRESSION */}
      <div className="flex gap-4 mb-12">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1 w-12 rounded-full transition-all duration-500 ${i <= currentStep ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-zinc-800"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-4xl flex flex-col items-center"
        >
          {/* HEADER DE L'ÉTAPE */}
          <div className="text-center mb-16">
            <div className="text-amber-500 mb-4 flex justify-center scale-150">{stepInfo.icon}</div>
            <h2 className="text-4xl font-light tracking-widest uppercase mb-2">{stepInfo.label}</h2>
            <p className="text-zinc-500 font-light italic">{stepInfo.desc}</p>
          </div>

          {/* GRILLE DE NOTES ÉLÉGANTE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-20">
            {stepNotes.map((note) => {
              const isSelected = (selections[stepInfo.id as keyof typeof selections] as NoteCategory[]).includes(note.id);
              return (
                <button
                  key={note.id}
                  onClick={() => toggleNote(note.id)}
                  className={`relative aspect-square rounded-2xl border transition-all duration-500 flex flex-col items-center justify-center p-6 group ${
                    isSelected 
                    ? "border-amber-500 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.1)]" 
                    : "border-white/5 bg-zinc-900/30 hover:border-white/20"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full border mb-4 flex items-center justify-center transition-all ${
                    isSelected ? "bg-amber-500 border-amber-500 text-black scale-110" : "border-white/10 text-white group-hover:border-amber-500/50"
                  }`}>
                    {isSelected ? <Check size={20} /> : <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] text-center ${isSelected ? "text-amber-500" : "text-zinc-500"}`}>
                    {note.label}
                  </span>
                  
                  {/* EFFET D'IMAGE BOTANIQUE EN FOND (OPTIONNEL) */}
                  <img 
                    src={`https://source.unsplash.com/200x200/?${note.label},plant`} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none"
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION BAS DE PAGE */}
      <div className="fixed bottom-12 left-0 right-0 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button onClick={back} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> {currentStep === 0 ? "Retour" : "Étape précédente"}
          </button>
          
          <button 
            onClick={next}
            disabled={selections[stepInfo.id as keyof typeof selections].length === 0}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all ${
              selections[stepInfo.id as keyof typeof selections].length > 0
              ? "bg-amber-500 text-black shadow-[0_10px_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95"
              : "bg-zinc-900 text-zinc-600 cursor-not-allowed opacity-50"
            }`}
          >
            {currentStep === 2 ? "Révéler ma signature" : "Continuer"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PyramidScreen;

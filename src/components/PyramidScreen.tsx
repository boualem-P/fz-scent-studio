import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Droplets, Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const STEPS = [
  { id: "top", label: "Notes de Tête", icon: <Wind />, desc: "L'envolée immédiate, fraîche et pétillante" },
  { id: "heart", label: "Notes de Cœur", icon: <Droplets />, desc: "L'âme du parfum, son caractère et sa signature" },
  { id: "base", label: "Notes de Fond", icon: <Sparkles />, desc: "Le sillage sacré, profond et persistant" }
];

// Configuration des notes avec mots-clés pour des images précises
const NOTES_BY_STEP: Record<string, { id: NoteCategory, label: string, query: string }[]> = {
  top: [
    { id: "hesperides", label: "Agrumes", query: "citrus-fruit" },
    { id: "aromatiques", label: "Aromatiques", query: "lavender-herbs" },
    { id: "marines", label: "Marines", query: "ocean-waves" },
    { id: "epices-fraiches", label: "Épices Froides", query: "cardamom-mint" }
  ],
  heart: [
    { id: "florales", label: "Florales", query: "luxury-flowers" },
    { id: "fruitees", label: "Fruitées", query: "fresh-fruits" },
    { id: "notes-vertes", label: "Notes Vertes", query: "green-leaves" },
    { id: "epices-chaudes", label: "Épices Chaudes", query: "cinnamon-cloves" }
  ],
  base: [
    { id: "boisees", label: "Boisées", query: "sandalwood-cedar" },
    { id: "ambrees", label: "Ambrées", query: "amber-resin" },
    { id: "musquees", label: "Musquées", query: "white-musk" },
    { id: "gourmandes", label: "Gourmandes", query: "vanilla-chocolate" },
    { id: "mousses", label: "Mousses", query: "oakmoss-forest" }
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 pt-24 pb-32">
      
      {/* PROGRESSION DISCRÈTE */}
      <div className="flex gap-3 mb-16">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1 w-16 rounded-full transition-all duration-700 ${i <= currentStep ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]" : "bg-white/10"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-16">
            <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Étape {currentStep + 1} sur 3</span>
            <h2 className="text-5xl font-extralight tracking-tight mb-4 uppercase">{stepInfo.label}</h2>
            <p className="text-zinc-500 font-light italic text-lg">{stepInfo.desc}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stepNotes.map((note) => {
              const isSelected = (selections[stepInfo.id as keyof typeof selections] as NoteCategory[]).includes(note.id);
              return (
                <button
                  key={note.id}
                  onClick={() => toggleNote(note.id)}
                  className={`relative aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-700 group border ${
                    isSelected ? "border-amber-500 scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.5)]" : "border-white/5"
                  }`}
                >
                  {/* IMAGE REPRÉSENTATIVE */}
                  <img 
                    src={`https://source.unsplash.com/600x800/?${note.query},botanical,macro`} 
                    alt={note.label} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      isSelected ? "scale-110 opacity-80 grayscale-0" : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60"
                    }`}
                  />
                  
                  {/* OVERLAY GRADIENT */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 ${isSelected ? "opacity-90" : "opacity-60"}`}></div>

                  {/* CONTENT */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                    <div className={`w-10 h-10 rounded-full border mb-4 flex items-center justify-center transition-all duration-500 ${
                      isSelected ? "bg-amber-500 border-amber-500 text-black" : "border-white/30 bg-black/20 backdrop-blur-md"
                    }`}>
                      {isSelected ? <Check size={18} strokeWidth={3} /> : <div className="w-1 h-1 bg-white rounded-full" />}
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${isSelected ? "text-amber-500" : "text-white"}`}>
                      {note.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION BAS DE PAGE */}
      <div className="fixed bottom-10 left-0 right-0 px-8 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-xl border border-white/5 p-4 rounded-full shadow-2xl">
          <button onClick={() => currentStep > 0 ? setCurrentStep(c => c - 1) : onMenu()} className="flex items-center gap-3 px-6 py-2 text-zinc-400 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">
            <ArrowLeft size={16} /> Retour
          </button>
          
          <button 
            onClick={next}
            disabled={selections[stepInfo.id as keyof typeof selections].length === 0}
            className={`flex items-center gap-4 px-10 py-4 rounded-full font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500 ${
              selections[stepInfo.id as keyof typeof selections].length > 0
              ? "bg-amber-500 text-black shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:tracking-[0.35em]"
              : "bg-white/5 text-zinc-600 cursor-not-allowed"
            }`}
          >
            {currentStep === 2 ? "Finaliser mon élixir" : "Suivant"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PyramidScreen;

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Droplets, Sparkles, Check, ArrowRight, ArrowLeft, Triangle } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const STEPS = [
  { id: "top", label: "Tête", icon: <Wind size={14}/>, desc: "L'ouverture" },
  { id: "heart", label: "Cœur", icon: <Droplets size={14}/>, desc: "L'identité" },
  { id: "base", label: "Fond", icon: <Sparkles size={14}/>, desc: "Le sillage" }
];

const NOTES_DATA: Record<string, { id: NoteCategory, label: string, color: string }[]> = {
  top: [
    { id: "hesperides", label: "Agrumes", color: "from-yellow-200 to-amber-400" },
    { id: "aromatiques", label: "Aromates", color: "from-emerald-200 to-teal-500" },
    { id: "marines", label: "Marines", color: "from-blue-200 to-cyan-500" },
    { id: "epices-fraiches", label: "Épices F.", color: "from-zinc-200 to-slate-500" }
  ],
  heart: [
    { id: "florales", label: "Fleurs", color: "from-pink-200 to-rose-500" },
    { id: "fruitees", label: "Fruits", color: "from-orange-200 to-red-500" },
    { id: "notes-vertes", label: "Vertes", color: "from-green-200 to-emerald-600" },
    { id: "epices-chaudes", label: "Épices C.", color: "from-orange-300 to-amber-700" }
  ],
  base: [
    { id: "boisees", label: "Bois", color: "from-stone-300 to-orange-900" },
    { id: "ambrees", label: "Ambre", color: "from-amber-400 to-orange-800" },
    { id: "musquees", color: "from-slate-100 to-zinc-400", label: "Muscs" },
    { id: "gourmandes", label: "Vanille", color: "from-yellow-600 to-amber-900" },
    { id: "mousses", label: "Mousses", color: "from-green-800 to-stone-900" }
  ]
};

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const stepInfo = STEPS[currentStep];
  const stepNotes = NOTES_DATA[stepInfo.id];

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

  // Calcul du résumé des sélections pour l'affichage permanent
  const totalSelected = selections.top.length + selections.heart.length + selections.base.length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center overflow-hidden">
      
      {/* HEADER LUXE */}
      <header className="fixed top-0 w-full z-50 p-8 flex justify-between items-start">
        <button onClick={onMenu} className="text-zinc-500 hover:text-white transition-colors uppercase text-[10px] tracking-[0.3em]">Quitter</button>
        <div className="text-center">
          <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.5em] mb-2">Architecte Olfactif</p>
          <div className="flex gap-2 justify-center">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 w-8 rounded-full transition-all duration-700 ${i <= currentStep ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="text-amber-500 font-serif italic text-xl">{totalSelected}</span>
          <p className="text-zinc-600 text-[8px] uppercase tracking-widest">Essences</p>
        </div>
      </header>

      {/* ZONE DE FLOTTAISON DES BULLES */}
      <main className="flex-1 w-full max-w-4xl relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[500px] flex items-center justify-center"
          >
            {/* TITRE CENTRAL DISCRET */}
            <div className="absolute z-0 text-center pointer-events-none">
              <h2 className="text-8xl font-black text-white/[0.03] uppercase tracking-tighter leading-none select-none">
                {stepInfo.label}
              </h2>
            </div>

            {/* LES BULLES */}
            <div className="relative w-full h-full flex items-center justify-center">
              {stepNotes.map((note, index) => {
                const isSelected = (selections[stepInfo.id as keyof typeof selections] as NoteCategory[]).includes(note.id);
                
                // Positionnement "organique" circulaire
                const angle = (index / stepNotes.length) * Math.PI * 2;
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.button
                    key={note.id}
                    onClick={() => toggleNote(note.id)}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ 
                      x, 
                      y, 
                      opacity: 1,
                      transition: { delay: index * 0.1, duration: 1 }
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute group"
                  >
                    {/* LA BULLE (Sphère) */}
                    <div className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-700 border shadow-2xl ${
                      isSelected 
                      ? "border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-black" 
                      : "border-white/10 bg-zinc-900/40 backdrop-blur-md"
                    }`}>
                      {/* Reflet de lumière sur la bulle */}
                      <div className="absolute top-4 left-4 w-6 h-6 bg-white/10 rounded-full blur-md" />
                      
                      <div className={`text-[9px] uppercase tracking-widest font-bold mb-1 transition-colors ${isSelected ? "text-amber-500" : "text-zinc-400"}`}>
                        {note.label}
                      </div>

                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-amber-500 mt-1">
                          <Check size={16} strokeWidth={3} />
                        </motion.div>
                      )}

                      {/* Dégradé de couleur discret au fond de la bulle */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${note.color} opacity-[0.03] group-hover:opacity-10 transition-opacity`} />
                    </div>

                    {/* Effet d'orbite autour de la bulle sélectionnée */}
                    {isSelected && (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-10px] border border-amber-500/20 rounded-full border-dashed"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER NAVIGATION */}
      <footer className="w-full p-12 flex flex-col items-center gap-8 bg-gradient-to-t from-black via-black to-transparent">
        <div className="flex flex-col items-center max-w-xs text-center">
          <p className="text-zinc-500 text-xs font-light italic leading-relaxed mb-6 opacity-60">
            "{stepInfo.desc} : Sélectionnez les essences qui résonnent avec votre âme."
          </p>
        </div>

        <div className="flex items-center gap-12">
          <button 
            onClick={() => currentStep > 0 && setCurrentStep(c => c - 1)}
            className={`text-[10px] uppercase tracking-[0.3em] transition-all ${currentStep === 0 ? "opacity-0 pointer-events-none" : "text-zinc-500 hover:text-white"}`}
          >
            Précédent
          </button>

          <button 
            onClick={next}
            disabled={selections[stepInfo.id as keyof typeof selections].length === 0}
            className={`relative group px-12 py-5 rounded-full overflow-hidden transition-all duration-500 ${
              selections[stepInfo.id as keyof typeof selections].length > 0
              ? "bg-white text-black scale-105"
              : "bg-zinc-900 text-zinc-700 opacity-50"
            }`}
          >
            <div className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]">
              {currentStep === 2 ? "Finaliser" : "Suivant"} <ArrowRight size={14} />
            </div>
            {/* Effet brillant au survol */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </footer>

      {/* DÉCORATION D'ARRIÈRE-PLAN */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default PyramidScreen;

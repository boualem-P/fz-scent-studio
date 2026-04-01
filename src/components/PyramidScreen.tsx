import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NoteCategory } from "@/data/perfumes";
import { NOTES_IMAGES } from "@/data/notesData";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface PyramidScreenProps {
  onValidate: (
    top: NoteCategory[],
    heart: NoteCategory[],
    base: NoteCategory[],
    atmosphere?: string,
    radarIntensities?: Record<string, number>
  ) => void;
  onMenu: () => void;
  setInternalBackHandler: (fn: () => boolean) => void;
}

type Step = "top" | "heart" | "base" | "atmosphere";

const STEPS: Step[] = ["top", "heart", "base", "atmosphere"];

const STEP_LABELS: Record<Step, string> = {
  top: "Notes de Tête",
  heart: "Notes de Cœur",
  base: "Notes de Fond",
  atmosphere: "Occasion",
};

const STEP_DESCRIPTIONS: Record<Step, string> = {
  top: "Les premières impressions, fraîches et volatiles",
  heart: "Le cœur du parfum, son caractère profond",
  base: "La signature qui perdure sur la peau",
  atmosphere: "Pour quelle occasion cherchez-vous un parfum ?",
};

const NOTE_FAMILIES: Record<string, string[]> = {
  top: ["hesperides", "aromatiques", "marines", "epices-fraiches", "fruits-legers"],
  heart: ["florales", "fruitees", "epices-chaudes", "notes-vertes"],
  base: ["boisees", "ambrees", "gourmandes", "musquees", "mousses"],
};

const FAMILY_LABELS: Record<string, string> = {
  hesperides: "Hespéridés",
  aromatiques: "Aromatiques",
  marines: "Marines",
  "epices-fraiches": "Épices Fraîches",
  "fruits-legers": "Fruits Légers",
  florales: "Florales",
  fruitees: "Fruités",
  "epices-chaudes": "Épices Chaudes",
  "notes-vertes": "Notes Vertes",
  boisees: "Boisées",
  ambrees: "Ambrées",
  gourmandes: "Gourmandes",
  musquees: "Musquées",
  mousses: "Mousses",
};

const ATMOSPHERES = [
  { id: "soir", label: "Soirée", emoji: "🌙" },
  { id: "quotidien", label: "Quotidien", emoji: "☀️" },
  { id: "business", label: "Business", emoji: "💼" },
  { id: "rendezvous", label: "Rendez-vous", emoji: "💕" },
  { id: "aid", label: "Aïd", emoji: "🕌" },
  { id: "mariage", label: "Mariage", emoji: "💍" },
  { id: "famille", label: "En famille", emoji: "👨‍👩‍👧‍👦" },
  { id: "ramadan", label: "Ramadan", emoji: "🌙" },
];

const PyramidScreen = ({ onValidate, onMenu, setInternalBackHandler }: PyramidScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTop, setSelectedTop] = useState<NoteCategory[]>([]);
  const [selectedHeart, setSelectedHeart] = useState<NoteCategory[]>([]);
  const [selectedBase, setSelectedBase] = useState<NoteCategory[]>([]);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string | undefined>();

  const step = STEPS[currentStep];

  // Internal back handler for parent navigation
  useEffect(() => {
    setInternalBackHandler(() => {
      if (currentStep > 0) {
        setCurrentStep((s) => s - 1);
        return true;
      }
      return false;
    });
  }, [currentStep, setInternalBackHandler]);

  const toggleNote = useCallback(
    (note: NoteCategory) => {
      const setter =
        step === "top" ? setSelectedTop : step === "heart" ? setSelectedHeart : setSelectedBase;
      setter((prev) =>
        prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note]
      );
    },
    [step]
  );

  const currentSelection =
    step === "top" ? selectedTop : step === "heart" ? selectedHeart : selectedBase;

  const canProceed =
    step === "atmosphere" ? true : currentSelection.length > 0;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onValidate(selectedTop, selectedHeart, selectedBase, selectedAtmosphere);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-24 pb-40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl space-y-8"
      >
        {/* Progress */}
        <motion.div variants={staggerItem} className="flex gap-2 justify-center">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 max-w-16 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </motion.div>

        {/* Header */}
        <motion.div variants={staggerItem} className="text-center space-y-3">
          <h2 className="font-display text-3xl md:text-4xl text-primary tracking-tight">
            {STEP_LABELS[step]}
          </h2>
          <p className="text-muted-foreground text-sm tracking-wide">
            {STEP_DESCRIPTIONS[step]}
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === "atmosphere" ? (
              <div className="grid grid-cols-2 gap-4">
                {ATMOSPHERES.map((atm) => (
                  <button
                    key={atm.id}
                    onClick={() =>
                      setSelectedAtmosphere(
                        selectedAtmosphere === atm.id ? undefined : atm.id
                      )
                    }
                    className={`glass-card p-5 text-center transition-all duration-300 rounded-sm ${
                      selectedAtmosphere === atm.id
                        ? "gold-border-glow ring-1 ring-primary/50"
                        : "hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-2xl block mb-2">{atm.emoji}</span>
                    <span className="text-sm tracking-wider text-primary/80">
                      {atm.label}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {NOTE_FAMILIES[step]?.map((family) => {
                  const isSelected = currentSelection.includes(family);
                  return (
                    <button
                      key={family}
                      onClick={() => toggleNote(family)}
                      className={`glass-card p-5 text-center transition-all duration-300 rounded-sm ${
                        isSelected
                          ? "gold-border-glow ring-1 ring-primary/50"
                          : "hover:bg-primary/5"
                      }`}
                    >
                      <span className="text-sm tracking-wider text-primary/80">
                        {FAMILY_LABELS[family] || family}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <motion.div variants={staggerItem} className="flex justify-center pt-4">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-10 py-3.5 text-xs tracking-[0.25em] uppercase transition-all duration-500 rounded-sm ${
              canProceed
                ? "glass-card gold-border-glow text-primary hover:gold-glow"
                : "glass-card text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            {currentStep === STEPS.length - 1 ? "Découvrir" : "Suivant"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PyramidScreen;

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Anchor, Check, ChevronRight, Moon, Sun, Briefcase, PartyPopper, Users, Star, ArrowRight } from "lucide-react";
import { NOTES_IMAGES, getNoteImage } from "@/data/notesData";
import { NOTE_LABELS, NoteCategory } from "@/data/perfumes";
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
  setInternalBackHandler?: (fn: (() => boolean) | null) => void;
}

type Step = "top" | "heart" | "base" | "atmosphere";

const ATMOSPHERES = [
  { id: "soir", label: "Soirée", icon: Moon },
  { id: "quotidien", label: "Quotidien", icon: Sun },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "rendezvous", label: "Rendez-vous", icon: Heart },
  { id: "aid", label: "Aïd", icon: Star },
  { id: "mariage", label: "Mariage", icon: PartyPopper },
  { id: "famille", label: "En famille", icon: Users },
  { id: "ramadan", label: "Ramadan", icon: Star },
];

const TOP_CATEGORIES = ["hesperides", "aromatiques", "marines", "epices-fraiches", "fruits-legers"];
const HEART_CATEGORIES = ["florales", "fruitees", "epices-chaudes", "notes-vertes"];
const BASE_CATEGORIES = ["boisees", "ambrees", "gourmandes", "musquees", "mousses"];

const STEP_CONFIG: Record<Step, { label: string; subtitle: string; icon: typeof Sparkles; categories: string[] }> = {
  top: {
    label: "Notes de Tête",
    subtitle: "Première impression, fraîcheur et légèreté",
    icon: Sparkles,
    categories: TOP_CATEGORIES,
  },
  heart: {
    label: "Notes de Cœur",
    subtitle: "L'âme du parfum, caractère et personnalité",
    icon: Heart,
    categories: HEART_CATEGORIES,
  },
  base: {
    label: "Notes de Fond",
    subtitle: "La signature durable, profondeur et sillage",
    icon: Anchor,
    categories: BASE_CATEGORIES,
  },
  atmosphere: {
    label: "L'Atmosphère",
    subtitle: "Pour quelle occasion cherchez-vous votre parfum ?",
    icon: Moon,
    categories: [],
  },
};

const STEPS: Step[] = ["top", "heart", "base", "atmosphere"];

const PyramidScreen = ({ onValidate, onMenu, setInternalBackHandler }: PyramidScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTop, setSelectedTop] = useState<string[]>([]);
  const [selectedHeart, setSelectedHeart] = useState<string[]>([]);
  const [selectedBase, setSelectedBase] = useState<string[]>([]);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string | null>(null);

  const step = STEPS[currentStep];
  const config = STEP_CONFIG[step];

  // Internal back handler for navigation
  useEffect(() => {
    if (setInternalBackHandler) {
      setInternalBackHandler(() => {
        if (currentStep > 0) {
          setCurrentStep((s) => s - 1);
          return true;
        }
        return false;
      });
    }
    return () => {
      if (setInternalBackHandler) setInternalBackHandler(null);
    };
  }, [currentStep, setInternalBackHandler]);

  const currentSelections = step === "top" ? selectedTop : step === "heart" ? selectedHeart : selectedBase;
  const setCurrentSelections = step === "top" ? setSelectedTop : step === "heart" ? setSelectedHeart : setSelectedBase;

  const toggleCategory = useCallback(
    (cat: string) => {
      if (step === "atmosphere") return;
      setCurrentSelections((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      );
    },
    [step, setCurrentSelections]
  );

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep]);

  const handleAtmosphere = useCallback(
    (atm: string) => {
      setSelectedAtmosphere(atm);
      // Build simple radar intensities from selections
      const allSelected = [...selectedTop, ...selectedHeart, ...selectedBase];
      const radarIntensities: Record<string, number> = {};
      allSelected.forEach((cat) => {
        radarIntensities[cat] = 1.0;
      });
      onValidate(selectedTop, selectedHeart, selectedBase, atm, radarIntensities);
    },
    [selectedTop, selectedHeart, selectedBase, onValidate]
  );

  const handleSkipAtmosphere = useCallback(() => {
    const allSelected = [...selectedTop, ...selectedHeart, ...selectedBase];
    const radarIntensities: Record<string, number> = {};
    allSelected.forEach((cat) => {
      radarIntensities[cat] = 1.0;
    });
    onValidate(selectedTop, selectedHeart, selectedBase, undefined, radarIntensities);
  }, [selectedTop, selectedHeart, selectedBase, onValidate]);

  const canProceed = step === "atmosphere" || currentSelections.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 pb-12 px-4 relative">
      {/* Step indicator */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              i <= currentStep ? "bg-primary" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg flex flex-col items-center"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-3 block">
              Étape {currentStep + 1}/{STEPS.length}
            </span>
            <h2 className="text-3xl font-extralight text-white mb-2">{config.label}</h2>
            <p className="text-white/40 text-sm">{config.subtitle}</p>
          </div>

          {/* Content */}
          {step !== "atmosphere" ? (
            <>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-3 mb-10 w-full"
              >
                {config.categories.map((cat) => {
                  const isSelected = currentSelections.includes(cat);
                  const label = NOTE_LABELS[cat] || cat;
                  return (
                    <motion.button
                      key={cat}
                      variants={staggerItem}
                      onClick={() => toggleCategory(cat)}
                      className={`px-5 py-3 rounded-2xl border text-sm font-light tracking-wide transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isSelected && <Check size={14} className="text-primary" />}
                        {label}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Next button */}
              <motion.button
                onClick={handleNext}
                disabled={!canProceed}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: canProceed ? 1 : 0.3, y: 0 }}
                className={`flex items-center gap-3 px-8 py-4 rounded-full border text-sm tracking-wider uppercase transition-all ${
                  canProceed
                    ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                    : "border-white/10 text-white/20 cursor-not-allowed"
                }`}
              >
                Suivant
                <ChevronRight size={16} />
              </motion.button>
            </>
          ) : (
            /* Atmosphere step */
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 w-full mb-8"
            >
              {ATMOSPHERES.map((atm) => {
                const Icon = atm.icon;
                return (
                  <motion.button
                    key={atm.id}
                    variants={staggerItem}
                    onClick={() => handleAtmosphere(atm.id)}
                    className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="p-2.5 bg-black/50 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <span className="text-white/70 font-light tracking-wide text-sm group-hover:text-white transition-colors">
                      {atm.label}
                    </span>
                  </motion.button>
                );
              })}

              <motion.button
                variants={staggerItem}
                onClick={handleSkipAtmosphere}
                className="col-span-2 flex items-center justify-center gap-2 p-4 border border-white/5 rounded-2xl text-white/30 hover:text-white/60 hover:border-white/10 transition-all text-sm"
              >
                Passer cette étape
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

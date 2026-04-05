import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MoodScreenProps {
  onComplete: (atmosphere: string) => void;
}

type Energy = "calme" | "energique" | "fatigue";
type Intention = "seduire" | "impressionner" | "rassurer" | "discret";
type Context = "quotidien" | "soiree" | "occasion";

interface StepConfig {
  question: string;
  options: { value: string; label: string; icon: string }[];
}

const STEPS: StepConfig[] = [
  {
    question: "Comment te sens-tu aujourd'hui ?",
    options: [
      { value: "calme", label: "Calme", icon: "🌿" },
      { value: "energique", label: "Énergique", icon: "⚡" },
      { value: "fatigue", label: "Fatigué", icon: "🌙" },
    ],
  },
  {
    question: "Qu'est-ce que tu recherches ?",
    options: [
      { value: "seduire", label: "Séduire", icon: "💫" },
      { value: "impressionner", label: "Impressionner", icon: "👑" },
      { value: "rassurer", label: "Rassurer", icon: "🤝" },
      { value: "discret", label: "Être discret", icon: "🎩" },
    ],
  },
  {
    question: "Dans quel contexte ?",
    options: [
      { value: "quotidien", label: "Journée classique", icon: "☀️" },
      { value: "soiree", label: "Soirée", icon: "🌃" },
      { value: "occasion", label: "Occasion spéciale", icon: "✨" },
    ],
  },
];

function mapMoodToAtmosphere(
  energy: Energy,
  intention: Intention,
  context: Context
): string {
  // Soirée contexts
  if (context === "soiree") {
    if (intention === "seduire") return "rendezvous";
    if (intention === "impressionner") return "soir";
    return "soir";
  }

  // Occasion spéciale
  if (context === "occasion") {
    if (intention === "seduire") return "rendezvous";
    if (intention === "impressionner") return "mariage";
    if (intention === "rassurer") return "famille";
    return "aid";
  }

  // Journée classique
  if (intention === "discret") return "business";
  if (intention === "impressionner") return "business";
  if (intention === "seduire") return "rendezvous";
  if (intention === "rassurer" && energy === "fatigue") return "famille";

  return "quotidien";
}

const MoodScreen = ({ onComplete }: MoodScreenProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = useCallback(
    (value: string) => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);

      if (step < 2) {
        setStep((s) => s + 1);
      } else {
        const atmosphere = mapMoodToAtmosphere(
          newAnswers[0] as Energy,
          newAnswers[1] as Intention,
          newAnswers[2] as Context
        );
        onComplete(atmosphere);
      }
    },
    [answers, step, onComplete]
  );

  const current = STEPS[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      {/* Progress dots */}
      <div className="flex gap-2 mb-10">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= step
                ? "w-8 bg-gold"
                : "w-4 bg-white/15"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full max-w-md"
        >
          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-display text-center text-foreground mb-2">
            {current.question}
          </h2>
          <p className="text-sm text-muted-foreground mb-10 text-center">
            Étape {step + 1} / 3
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3 w-full">
            {current.options.map((opt, i) => (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleSelect(opt.value)}
                className="group relative w-full py-4 px-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm text-left transition-all duration-300 hover:border-gold/40 hover:bg-gold/[0.06] hover:shadow-[0_0_30px_-8px_rgba(212,175,55,0.15)] active:scale-[0.98]"
              >
                <span className="flex items-center gap-4">
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-base font-body text-foreground group-hover:text-gold transition-colors">
                    {opt.label}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MoodScreen;

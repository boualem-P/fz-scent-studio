import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LightWipeTransitionProps {
  isVisible: boolean;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
}

const LightWipeTransition = ({ isVisible, onComplete }: LightWipeTransitionProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Génère 60 particules aléatoires
      const generated = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 1.2 + 0.8,
        delay: Math.random() * 0.6,
        opacity: Math.random() * 0.7 + 0.3,
        blur: Math.random() * 2,
      }));
      setParticles(generated);
    }
  }, [isVisible]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Voile doré de fond */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Particules dorées */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, rgba(255,215,0,${p.opacity}) 0%, rgba(245,158,11,${p.opacity * 0.6}) 50%, transparent 100%)`,
                filter: `blur(${p.blur}px)`,
                boxShadow: `0 0 ${p.size * 2}px rgba(245,158,11,0.6)`,
                top: "-10px",
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, p.opacity, p.opacity, 0],
                x: [0, (Math.random() - 0.5) * 40],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeIn",
              }}
            />
          ))}

          {/* Ligne horizontale dorée qui descend */}
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(245,158,11,0.8), rgba(255,255,255,0.9), rgba(245,158,11,0.8), transparent)",
              boxShadow: "0 0 12px 4px rgba(245,158,11,0.4)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
          />

          {/* Texte luxe central */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.98] }}
            transition={{ duration: 1.4, times: [0, 0.2, 0.7, 1] }}
          >
            <p className="text-amber-500/60 font-light italic tracking-[0.4em] text-xs uppercase">
              Votre essence vous attend...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightWipeTransition;
```

---

## Fichier 2 — `index.tsx` reste **identique** 

Bonne nouvelle — pas besoin de modifier `index.tsx` ! Le composant `LightWipeTransition` est déjà intégré avec le bon `showWipe` state depuis la dernière version. ✅

---

## Résultat 🎬
```
Clic HOMME ou FEMME
       ↓
Écran noir
60 particules dorées tombent (~1.2s)
Ligne lumineuse descend
"Votre essence vous attend..."
       ↓
Cartes interactives apparaissent

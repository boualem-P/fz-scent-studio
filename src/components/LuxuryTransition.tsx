import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

interface LuxuryTransitionProps {
  show: boolean;
  onComplete: () => void;
}

const LuxuryTransition = ({ show, onComplete }: LuxuryTransitionProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 0.3,
        duration: 0.5 + Math.random() * 0.3,
      })),
    []
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={(def) => {
            if ((def as { opacity: number }).opacity === 0) {
              onComplete();
            }
          }}
        >
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "#050429" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: 0.85, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
            onAnimationComplete={() => onComplete()}
          />

          {/* Golden sweep band */}
          <motion.div
            className="absolute inset-y-0 w-[40%]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.25) 30%, rgba(212,175,55,0.5) 50%, rgba(212,175,55,0.25) 70%, transparent 100%)",
              filter: "blur(8px)",
              boxShadow: "0 0 60px 20px rgba(212,175,55,0.15)",
            }}
            initial={{ left: "-40%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          {/* Fine golden line */}
          <motion.div
            className="absolute inset-y-0 w-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 10%, rgba(212,175,55,0.9) 40%, rgba(255,255,255,0.95) 50%, rgba(212,175,55,0.9) 60%, transparent 90%)",
              boxShadow: "0 0 12px 4px rgba(212,175,55,0.5)",
            }}
            initial={{ left: "-2px" }}
            animate={{ left: "102%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          {/* Gold dust particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: "hsl(43 72% 52%)",
                boxShadow: "0 0 4px rgba(212,175,55,0.6)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.7, 0], scale: [0, 1.2, 0] }}
              transition={{
                duration: p.duration,
                delay: 0.15 + p.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuxuryTransition;

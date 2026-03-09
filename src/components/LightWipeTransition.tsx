import { motion, AnimatePresence } from "framer-motion";

interface LightWipeTransitionProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const LightWipeTransition = ({ isVisible, onComplete }: LightWipeTransitionProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          onAnimationComplete={onComplete}
        >
          {/* Vague principale dorée */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(245,158,11,0.15) 50%, transparent 60%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Ligne lumineuse fine */}
          <motion.div
            className="absolute inset-y-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.8), rgba(255,255,255,0.9), rgba(245,158,11,0.8), transparent)",
              boxShadow: "0 0 20px 8px rgba(245,158,11,0.4), 0 0 60px 20px rgba(245,158,11,0.15)",
            }}
            initial={{ left: "-2px" }}
            animate={{ left: "102%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Halo de lumière derrière la ligne */}
          <motion.div
            className="absolute inset-y-0 w-32"
            style={{
              background: "linear-gradient(to right, transparent, rgba(245,158,11,0.06), rgba(255,255,255,0.04), transparent)",
            }}
            initial={{ left: "-128px" }}
            animate={{ left: "105%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightWipeTransition;

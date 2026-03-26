import { motion } from "framer-motion";

export const EpuiseOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-black/75 flex items-center justify-center pointer-events-none z-10"
  >
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        fontSize: "0.85rem",
        fontWeight: 900,
        letterSpacing: "0.4em",
        color: "rgba(255,255,255,0.90)",
        border: "2px solid rgba(255,255,255,0.5)",
        padding: "5px 12px",
        borderRadius: "4px",
        transform: "rotate(-20deg)",
        textShadow: "0 0 20px rgba(239,68,68,0.8)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      Épuisé
    </motion.span>
  </motion.div>
);

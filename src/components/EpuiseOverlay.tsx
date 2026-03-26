import { motion } from "framer-motion";

export const EpuiseOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center z-10"
    style={{
      pointerEvents: "none",
      background: "rgba(0,0,0,0.35)",
    }}
  >
    <span
      style={{
        fontSize: "0.75rem",
        fontWeight: 900,
        letterSpacing: "0.4em",
        color: "rgba(255,255,255,0.85)",
        border: "1.5px solid rgba(255,255,255,0.4)",
        padding: "4px 10px",
        borderRadius: "3px",
        transform: "rotate(-20deg)",
        textShadow: "0 0 12px rgba(239,68,68,0.6)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      Épuisé
    </span>
  </motion.div>
);

// Shared Framer Motion animation presets for Awwwards-level experience

export const luxuryEase = [0.16, 1, 0.3, 1] as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

export const springHover = {
  scale: 1.02,
  y: -5,
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

export const springTap = {
  scale: 0.97,
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.5, ease: luxuryEase },
};

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Création de 40 particules d'or avec des positions aléatoires
  const particles = Array.from({ length: 40 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[#050505] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 1. SYSTÈME DE PARTICULES 3D DYNAMIQUE */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              x: useSpring(useTransform(mouseX, (v) => v * (Math.random() * 2)), { stiffness: 50, damping: 30 }),
              y: useSpring(useTransform(mouseY, (v) => v * (Math.random() * 2)), { stiffness: 50, damping: 30 }),
              scale: Math.random() * 2,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af370a_0%,_transparent_70%)]" />
      </div>

      {/* 2. TITRE AVEC EFFET DE PROFONDEUR (PARALLAXE) */}
      <motion.div
        style={{
          x: useSpring(useTransform(mouseX, (v) => v * -0.5), { stiffness: 100, damping: 30 }),
          y: useSpring(useTransform(mouseY, (v) => v * -0.5), { stiffness: 100, damping: 30 }),
        }}
        className="relative z-10 mb-16"
      >
        <motion.h1 
          className="font-display text-6xl md:text-8xl lg:text-9xl bg-gradient-to-b from-[#f7ef8a] via-[#d4af37] to-[#b8860b] bg-clip-text text-transparent tracking-tighter filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          Fz Parfums
        </motion.h1>
        
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-40 mx-auto mt-4"
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </motion.div>

      {/* 3. SECTION BOUTONS STYLE "FLOATING" */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-8 relative z-20"
      >
        <div className="flex flex-wrap justify-center gap-6">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                boxShadow: "0 0 25px rgba(212, 175, 55, 0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectGender(gender)}
              className="px-10 py-4 min-w-[150px] font-display text-xs tracking-[0.4em] uppercase border border-[#d4af3733] bg-black/40 text-[#d4af37] backdrop-blur-xl transition-all duration-500"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={staggerItem}
          className="font-body text-[10px] uppercase tracking-[0.6em] text-[#d4af37]/50 mt-4"
        >
          Entrez dans la fragrance
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingScreen;

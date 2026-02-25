import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
  onCatalogue: () => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  // --- LOGIQUE ANIMATION 3D ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Lissage du mouvement (pour que ce soit fluide et non saccadé)
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Transformation en rotation (max 15 degrés)
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  return (
    <div 
      className="relative min-h-screen w-screen flex flex-col items-center justify-center p-6 text-center bg-[#050505] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. ARRIÈRE-PLAN LUXE (Gradient & Particules) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      </div>

      {/* 2. SECTION FLACON 3D */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ perspective: 1000 }}
        className="relative z-10 mb-8"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative group cursor-pointer"
        >
          {/* Halo lumineux derrière le flacon */}
          <div className="absolute -inset-12 bg-primary/20 blur-[100px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />
          
          <img 
            src="/hero-perfume.png" 
            alt="Fz Parfums Luxury" 
            className="h-64 md:h-80 lg:h-[400px] w-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.7)] select-none pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* 3. SECTION TITRE & SLOGAN */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mb-12 relative z-20"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-gold-gradient tracking-tighter mb-2"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-lg md:text-xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F7EF8A] to-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        <motion.div 
          variants={staggerItem}
          className="gold-divider w-24 mx-auto mt-6"
        />
      </motion.div>

      {/* 4. SECTION BOUTONS */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-6 relative z-20"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={{ ...springHover, scale: 1.05 }}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              className="px-8 py-3 min-w-[130px] font-display text-[10px] tracking-[0.25em] uppercase border border-primary/30 bg-black/60 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-md gold-border-glow shadow-xl"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={staggerItem}
          className="font-body text-[9px] uppercase tracking-[0.4em] text-primary/40 animate-pulse mt-4"
        >
          Choisissez votre univers
        </motion.p>
      </motion.div>

    </div>
  );
};

export default LandingScreen;

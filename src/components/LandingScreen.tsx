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

  // Lissage du mouvement pour un effet "soyeux"
  const mouseX = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 25 });

  // Transformation en rotation (max 12 degrés pour rester élégant)
  const rotateX = useTransform(mouseY, [-500, 500], [12, -12]);
  const rotateY = useTransform(mouseX, [-500, 500], [-12, 12]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. ARRIÈRE-PLAN LUXE */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Halo doré central pour donner de la profondeur */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af3715_0%,_transparent_70%)] opacity-80" />
      </div>

      {/* 2. SECTION FLACON 3D (Ton image ImgBB) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{ perspective: 1200 }}
        className="relative z-10 mb-6"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative group cursor-pointer"
        >
          {/* Halo brillant derrière le flacon qui réagit au survol */}
          <div className="absolute -inset-20 bg-[#d4af3722] blur-[120px] rounded-full opacity-50 group-hover:opacity-90 transition-opacity duration-1000" />
          
          <img 
            src="https://i.ibb.co/whZ94tqz/hero-perfume.jpg" 
            alt="Fz Parfums Luxury" 
            className="h-64 md:h-80 lg:h-[450px] w-auto drop-shadow-[0_45px_45px_rgba(0,0,0,0.8)] select-none pointer-events-none rounded-xl"
          />
        </motion.div>
      </motion.div>

      {/* 3. TEXTES ET BOUTONS */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-20 flex flex-col items-center"
      >
        <motion.h1 
          variants={staggerItem}
          className="font-display text-5xl md:text-7xl lg:text-8xl bg-gradient-to-b from-[#f7ef8a] to-[#d4af37] bg-clip-text text-transparent tracking-tighter mb-2"
        >
          Fz Parfums
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-serif italic text-lg md:text-xl tracking-[0.15em] text-[#d4af37] opacity-90 mb-10"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>

        {/* SECTION BOUTONS */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={{ scale: 1.05, borderColor: "#d4af37", backgroundColor: "rgba(212, 175, 55, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectGender(gender)}
              className="px-8 py-3 min-w-[140px] font-display text-[10px] tracking-[0.3em] uppercase border border-[#d4af3744] bg-black/60 text-[#d4af37] hover:text-white transition-all duration-500 backdrop-blur-md"
            >
              {gender}
            </motion.button>
          ))}
        </div>

        <motion.p
          variants={staggerItem}
          className="font-body text-[9px] uppercase tracking-[0.4em] text-[#d4af37] opacity-40 animate-pulse mt-8"
        >
          Sélectionnez votre univers
        </motion.p>
      </motion.div>

    </div>
  );
};

export default LandingScreen;

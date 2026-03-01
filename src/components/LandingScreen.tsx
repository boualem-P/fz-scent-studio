import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gender } from "@/data/perfumes";
import { staggerContainer, staggerItem, springHover, springTap } from "@/lib/animations";
import { Maximize, Minimize } from "lucide-react";

interface LandingScreenProps {
  onSelectGender: (gender: Gender) => void;
}

const LandingScreen = ({ onSelectGender }: LandingScreenProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoSrc = "/bg-parfum.mp4";

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleSync = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleSync);
    return () => document.removeEventListener("fullscreenchange", handleSync);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-black overflow-hidden">
      
      {/* VIDÉO D'ARRIÈRE-PLAN AVEC ACCÉLÉRATION MATÉRIELLE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-50 transform-gpu scale-105 will-change-transform"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* BOUTON PLEIN ÉCRAN */}
      <div className="absolute bottom-8 left-8 z-[100]">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={toggleFullscreen}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-black/60 text-primary backdrop-blur-sm hover:border-primary transition-all shadow-lg"
          title="Mode plein écran"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </motion.button>
      </div>

      {/* CONTENU CENTRAL */}
      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="show" 
        className="mb-12 relative z-20"
      >
        <motion.h1 
          variants={staggerItem} 
          className="font-display text-7xl md:text-8xl lg:text-9xl text-gold-gradient tracking-tighter mb-4"
        >
          Fz Parfums
        </motion.h1>
        <motion.p 
          variants={staggerItem} 
          className="font-serif italic text-lg md:text-2xl tracking-[0.1em] text-primary/80"
        >
          L'art de flaconner l'inoubliable.
        </motion.p>
      </motion.div>

      {/* SECTION BOUTONS GENRE */}
      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="show" 
        className="flex flex-col items-center gap-8 relative z-20"
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {(["homme", "femme", "mixte"] as Gender[]).map((gender) => (
            <motion.button
              key={gender}
              variants={staggerItem}
              whileHover={springHover}
              whileTap={springTap}
              onClick={() => onSelectGender(gender)}
              className="px-10 py-5 min-w-[160px] font-display text-xs tracking-[0.3em] uppercase border border-primary/30 bg-black/60 text-primary hover:bg-primary hover:text-black transition-all duration-500 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.05)]"
            >
              {gender}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingScreen;

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delete } from "lucide-react";

interface BudgetScreenProps {
  onValidate: (age: number) => void;
  onBack: () => void;
}

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "del"],
];

const GOLD_COLORS = ["#D4AF37", "#F59E0B", "#FFF0A0"];

interface Leaf {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
  swayAmp: number;
  swayFreq: number;
  swayOffset: number;
  opacity: number;
  opacityDir: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  alpha: number;
}

function createLeaf(canvasW: number, canvasH: number, startTop = false): Leaf {
  const size = 4 + Math.random() * 6;
  return {
    x: Math.random() * canvasW,
    y: startTop ? -size - Math.random() * canvasH * 0.3 : Math.random() * canvasH,
    w: size,
    h: size * (0.5 + Math.random() * 0.5),
    speed: 0.5 + Math.random() * 1.5,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: 0.02 * (0.5 + Math.random() * 1.5),
    swayAmp: 15 + Math.random() * 25,
    swayFreq: 0.008 + Math.random() * 0.012,
    swayOffset: Math.random() * Math.PI * 2,
    opacity: 0.3 + Math.random() * 0.5,
    opacityDir: 1,
    color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
  };
}

function createParticle(canvasW: number, canvasH: number): Particle {
  return {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    vy: 0.2 + Math.random() * 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    alpha: 0.05 + Math.random() * 0.1,
  };
}

const BudgetScreen = ({ onValidate, onBack }: BudgetScreenProps) => {
  const [ageStr, setAgeStr] = useState("");
  const [pulse, setPulse] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const age = ageStr ? parseInt(ageStr, 10) : null;
  const isValid = age !== null && age >= 15 && age <= 99;
  const isTooYoung = age !== null && age > 0 && age < 15 && ageStr.length >= 2;

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const leaves: Leaf[] = Array.from({ length: 18 }, () =>
      createLeaf(canvas.width, canvas.height)
    );
    const particles: Particle[] = Array.from({ length: 40 }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Particles
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y > canvas.height) {
          p.y = -2;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
        ctx.fill();
      }

      // Leaves
      for (const l of leaves) {
        l.y += l.speed;
        l.rotation += l.rotSpeed * l.speed;

        // Opacity pulse
        l.opacity += 0.003 * l.opacityDir;
        if (l.opacity >= 0.8) l.opacityDir = -1;
        if (l.opacity <= 0.3) l.opacityDir = 1;

        const swayX = l.swayAmp * Math.sin(frame * l.swayFreq + l.swayOffset);

        if (l.y > canvas.height + l.h) {
          Object.assign(l, createLeaf(canvas.width, canvas.height, true));
        }

        const dx = l.x + swayX;

        ctx.save();
        ctx.translate(dx, l.y);
        ctx.rotate(l.rotation);
        ctx.globalAlpha = l.opacity;
        ctx.fillStyle = l.color;

        // Diamond/rhombus shape
        ctx.beginPath();
        ctx.moveTo(0, -l.h / 2);
        ctx.lineTo(l.w / 2, 0);
        ctx.lineTo(0, l.h / 2);
        ctx.lineTo(-l.w / 2, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleKey = useCallback((key: string) => {
    if (key === "del") {
      setAgeStr((prev) => prev.slice(0, -1));
    } else if (key === "") {
      return;
    } else {
      setAgeStr((prev) => {
        if (prev.length >= 2) return prev;
        return prev + key;
      });
    }
    setPulse(true);
    setTimeout(() => setPulse(false), 150);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden z-10">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pt-28 pb-4 flex flex-col items-center gap-2 px-6 w-full text-center"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-medium">
          Votre profil olfactif
        </p>
        <h1 className="text-3xl font-extralight italic text-white relative overflow-hidden">
          Quel est votre âge ?
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1"
        >
          Chaque essence est choisie pour vous
        </motion.p>
        <div className="w-16 h-px bg-amber-500/30 mt-3" />
      </motion.div>

      {/* Age display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center mt-8 mb-6"
      >
        <motion.div
          animate={pulse ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center w-32 h-20 rounded-2xl border border-amber-500/30 bg-white/[0.03]"
        >
          <span className="text-5xl font-black text-white tabular-nums tracking-wider">
            {ageStr || (
              <span className="text-zinc-600 text-3xl font-light">—</span>
            )}
          </span>
        </motion.div>

        <AnimatePresence>
          {isTooYoung && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400/80 text-[10px] uppercase tracking-widest mt-3"
            >
              Âge minimum : 15 ans
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Numpad */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 grid grid-cols-3 gap-3 px-12 w-full max-w-xs"
      >
        {KEYS.flat().map((key, i) => {
          if (key === "") {
            return <div key={i} />;
          }

          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleKey(key)}
              className="h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-white text-xl font-semibold hover:border-amber-500/40 hover:bg-amber-500/5 transition-colors active:bg-amber-500/10"
            >
              {key === "del" ? <Delete size={20} className="text-zinc-400" /> : key}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Confirm button */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6"
          >
            <button
              onClick={() => onValidate(age!)}
              className="w-full max-w-sm bg-white text-black rounded-full py-5 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-95 transition-transform"
            >
              Découvrir ma sélection →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetScreen;

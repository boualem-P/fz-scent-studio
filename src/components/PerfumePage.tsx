import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, ChevronRight, Plus } from "lucide-react";
import { Perfume, PERFUMES, generateHotspots } from "@/data/database";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";

const HOTSPOT_POSITIONS = [
  { id: "cap", top: "12%", left: "50%" },
  { id: "heart", top: "45%", left: "50%" },
  { id: "base", top: "78%", left: "50%" },
];

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{x:number;y:number;vx:number;vy:number;size:number;color:string;alpha:number;baseSpeed:number;type:'sparkle'|'dust';streak:number}>>([]);
  const animFrameRef = useRef<number>(0);
  const mouseSpeedRef = useRef(0);

  // 3D Parallax tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });
  // Mist reactive drift (opposite to tilt)
  const mistX = useTransform(mouseX, [0, 1], [15, -15]);
  const mistY = useTransform(mouseY, [0, 1], [10, -10]);

  const prevMousePos = useRef({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set(nx);
    mouseY.set(ny);
    const dx = e.clientX - prevMousePos.current.x;
    const dy = e.clientY - prevMousePos.current.y;
    mouseSpeedRef.current = Math.min(Math.sqrt(dx*dx + dy*dy), 40);
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gold Dust Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPARKLE_COLORS = ["#D4AF37", "#F59E0B", "#FFF7ED"];
    const DUST_COLORS = ["#D4AF37", "#92400e", "#B8860B"];
    const COUNT = 110;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    if (particlesRef.current.length === 0) {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () => {
        const isSparkle = Math.random() < 0.35;
        const baseSpeed = isSparkle ? (1.5 + Math.random() * 2.5) : (2 + Math.random() * 3);
        return {
          x: Math.random() * w, y: Math.random() * h,
          vx: baseSpeed * (0.7 + Math.random() * 0.3),
          vy: -baseSpeed * (0.5 + Math.random() * 0.5),
          size: isSparkle ? (1 + Math.random() * 2.5) : (0.5 + Math.random() * 1.5),
          color: isSparkle
            ? SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]
            : DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
          alpha: isSparkle ? (0.4 + Math.random() * 0.5) : (0.08 + Math.random() * 0.15),
          baseSpeed,
          type: isSparkle ? 'sparkle' as const : 'dust' as const,
          streak: isSparkle ? 0 : (3 + Math.random() * 8),
        };
      });
    }

    let turbulenceDecay = 0;

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, w, h);

      const speed = mouseSpeedRef.current;
      mouseSpeedRef.current *= 0.93;

      const intensity = Math.min(speed / 15, 1);
      if (intensity > 0.1) {
        turbulenceDecay = Math.min(turbulenceDecay + intensity * 0.15, 1);
      } else {
        turbulenceDecay *= 0.97;
      }

      const cx = w / 2, cy = h / 2;

      particlesRef.current.forEach(p => {
        const boost = 1 + intensity * 3;

        const dx = p.x - cx, dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = w * 0.4;
        const swirlFactor = turbulenceDecay * Math.max(0, 1 - dist / maxDist) * 3;
        const angle = Math.atan2(dy, dx) + Math.PI * 0.5;

        p.x += p.vx * boost + Math.cos(angle) * swirlFactor + (Math.random() - 0.5) * intensity * 3;
        p.y += p.vy * boost + Math.sin(angle) * swirlFactor + (Math.random() - 0.5) * intensity * 2;

        if (p.x > w + 20) { p.x = -20; p.y = h * (0.5 + Math.random() * 0.5); }
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w * 0.5; }
        if (p.x < -20) p.x = w + 20;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }

        const edgeFadeX = Math.min(p.x / (w * 0.15), 1, (w - p.x) / (w * 0.25));
        const edgeFadeY = Math.min(p.y / (h * 0.1), 1, (h - p.y) / (h * 0.1));
        const edgeFade = Math.max(0, Math.min(edgeFadeX, edgeFadeY));

        const dynamicAlpha = p.alpha * (0.7 + intensity * 0.3) * edgeFade;
        if (dynamicAlpha < 0.01) return;

        ctx.save();
        ctx.globalAlpha = dynamicAlpha;

        if (p.type === 'sparkle') {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size * (3 + intensity * 5);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const streakLen = p.streak * boost;
          const vAngle = Math.atan2(p.vy, p.vx);
          const grad = ctx.createLinearGradient(
            p.x - Math.cos(vAngle) * streakLen, p.y - Math.sin(vAngle) * streakLen,
            p.x, p.y
          );
          grad.addColorStop(0, "transparent");
          grad.addColorStop(1, p.color);
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x - Math.cos(vAngle) * streakLen, p.y - Math.sin(vAngle) * streakLen);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const recommendations = PERFUMES.filter((p) => {
    if (p.id === perfume.id) return false;
    return p.brand === perfume.brand || p.topNotes.some(n => perfume.topNotes.includes(n));
  }).slice(0, 8);

  const stats = [
    { label: "Envolée (Tête)", val: 85, icon: <Wind size={20}/>, notes: perfume.topNotesDetailed },
    { label: "Sillage (Cœur)", val: 65, icon: <Droplets size={20}/>, notes: perfume.heartNotesDetailed },
    { label: "Empreinte (Fond)", val: 92, icon: <Zap size={20}/>, notes: perfume.baseNotesDetailed }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pb-40 overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      
      {/* --- GOLD DUST CANVAS --- */}
      <canvas ref={canvasRef} className="gold-dust-canvas" />

      {/* --- HEADER --- */}
      <div className="sticky top-0 z-[999] w-full h-24 pointer-events-none">
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(5, 5, 5, 0.7)',
                backdropFilter: 'blur(30px) saturate(150%)',
                WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            />
          )}
        </AnimatePresence>

        <header className="relative z-20 h-20 w-full flex items-center justify-between px-10 pointer-events-auto">
          <div className="flex flex-col">
            <span className={`text-[9px] uppercase tracking-[0.6em] font-black italic transition-colors duration-500 ${isScrolled ? "text-amber-500" : "text-amber-500/30"}`}>
              Signature Collection
            </span>
            {isScrolled && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[11px] uppercase tracking-widest text-zinc-200 font-light mt-1">
                {perfume.name}
              </motion.span>
            )}
          </div>

          <button onClick={onClose} className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/20 transition-all">
            <X size={18} className="text-white group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </header>
      </div>

      {/* --- TITRE --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="w-full flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-extralight italic tracking-tighter uppercase leading-none mb-8">
          {perfume.name}
        </h1>
        <div className="flex items-center gap-10">
          <div className="h-[0.5px] w-20 bg-white/20" />
          <p className="text-amber-500 tracking-[1em] uppercase text-[12px] font-black pl-[1em]">{perfume.brand}</p>
          <div className="h-[0.5px] w-20 bg-white/20" />
        </div>
      </motion.div>

      {/* --- GRILLE PRINCIPALE --- */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* VISUEL AGRANDI */}
          <div className="lg:col-span-5 space-y-16">
            <div 
              ref={imageContainerRef}
              className="perfume-img-container perfume-studio-lighting gold-frame !h-[550px] md:!h-[650px] bg-zinc-950/20"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 800 }}
            >
              {/* Golden Mist Layer */}
              <motion.div className="golden-mist-layer" style={{ x: mistX, y: mistY, willChange: "transform" }}>
                <div className="mist-blob mist-blob-1" />
                <div className="mist-blob mist-blob-2" />
                <div className="mist-blob mist-blob-3" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="golden-particle" style={{
                    left: `${15 + Math.random() * 70}%`,
                    bottom: `${Math.random() * 40}%`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${4 + Math.random() * 5}s`,
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    opacity: 0.15 + Math.random() * 0.25,
                  }} />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <img 
                  src={perfume.image} 
                  className="perfume-img" 
                  alt={perfume.name} 
                />
                <div className="perfume-shine-overlay" />

                {/* Luxury Hotspots */}
                {HOTSPOTS.map((hs) => (
                  <div key={hs.id} className="absolute z-10" style={{ top: hs.top, left: hs.left, transform: "translate(-50%, -50%)" }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveHotspot(activeHotspot === hs.id ? null : hs.id); }}
                      className="hotspot-btn group relative w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <span className="absolute inset-0 rounded-full bg-amber-400/40 hotspot-ping" />
                      <span className="absolute inset-0 rounded-full bg-amber-400/20 hotspot-ping" style={{ animationDelay: "0.5s" }} />
                      <span className="relative w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_hsl(43_72%_52%/0.6)]" />
                    </button>

                    <AnimatePresence>
                      {activeHotspot === hs.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.85, y: 8 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="hotspot-tooltip absolute left-1/2 -translate-x-1/2 mt-4 w-56 z-50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="hotspot-tooltip-inner p-5 rounded-xl">
                            <h4 className="font-display text-amber-200 text-sm font-semibold mb-2 tracking-wide">{hs.title}</h4>
                            <p className="text-[11px] leading-relaxed text-zinc-400 font-light">{hs.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>

              {/* Click outside to close hotspot */}
              {activeHotspot && (
                <div className="absolute inset-0 z-[5]" onClick={() => setActiveHotspot(null)} />
              )}

              <div className="absolute bottom-10 left-10 z-20 flex items-center gap-4 bg-black/60 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/10">
                <Calendar size={14} className="text-amber-200/70" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-300 italic">Lancement {perfume.year}</span>
              </div>
            </div>
            <div className="relative">
                <span className="absolute -top-10 -left-4 text-8xl text-white/5 font-serif">"</span>
                <p className="text-zinc-400 text-2xl md:text-3xl leading-relaxed font-extralight italic px-10 border-l border-amber-500/20">
                    {perfume.description}
                </p>
            </div>
          </div>

          {/* JAUGES ET NOTES */}
          <div className="lg:col-span-7 space-y-24">
            <div className="space-y-20">
              <h3 className="text-[12px] uppercase tracking-[0.6em] text-zinc-600 font-bold border-b border-white/5 pb-8">Architecture des Essences</h3>
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-[18px] uppercase tracking-[0.4em] text-zinc-200 font-light flex items-center gap-6 italic">
                      <span className="text-amber-500/50">{s.icon}</span> {s.label}
                    </span>
                    <span className="text-amber-400 text-[28px] font-extralight tracking-tighter italic" style={{ textShadow: '0 0 25px rgba(251, 191, 36, 0.4)' }}>
                       {s.val}<span className="text-[11px] ml-2 opacity-40 font-bold">% INTENSITÉ</span>
                    </span>
                  </div>
                  <div className="h-4 bg-zinc-950 w-full relative rounded-full border border-white/10 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
                      transition={{ duration: 2.5, delay: i * 0.2, ease: "circOut" }}
                      className="h-full relative rounded-full"
                      style={{ background: 'linear-gradient(90deg, #92400e 0%, #fbbf24 50%, #fffbeb 100%)' }}
                    >
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" />
                    </motion.div>
                  </div>
                  <div className="flex flex-wrap gap-8 mt-12">
                    {s.notes.map((note, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-4 group/note">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 p-[1px] group-hover/note:border-amber-400/80 transition-all duration-700">
                          <img src={`https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=200&h=200&fit=crop&q=80`} 
                            className="w-full h-full object-cover grayscale opacity-30 group-hover/note:grayscale-0 group-hover/note:opacity-100 transition-all duration-1000" alt={note.name} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover/note:text-amber-200 transition-colors font-medium">{note.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CARROUSSEL RECOMMANDATIONS --- */}
        <div className="mt-48 pt-24 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-16 px-4">
            <h3 className="text-[12px] uppercase tracking-[0.6em] text-zinc-600 font-black italic">Sillages Analogues</h3>
            <div className="flex gap-4 items-center">
               <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-light">Défiler pour explorer</span>
               <ChevronRight size={16} className="text-zinc-700" />
            </div>
          </div>
          <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -((recommendations.length * 340) - window.innerWidth + 100) }}
              className="flex gap-10 w-max pb-16 px-4"
            >
              {recommendations.map((rec) => (
                <motion.button key={rec.id} onClick={() => onSelectPerfume(rec)} className="group w-[300px] text-left space-y-8" whileHover={{ y: -10 }}>
                  <div className="perfume-img-container gold-frame !h-[400px] bg-zinc-900/30">
                    <img 
                      src={rec.image} 
                      className="perfume-img opacity-70 group-hover:opacity-100 transition-opacity" 
                      alt={rec.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-8">
                       <div className="flex items-center gap-3">
                            <Plus size={16} className="text-amber-500" />
                            <span className="text-[10px] uppercase tracking-widest text-amber-500">Voir la fiche</span>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-2 px-4">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-black italic">{rec.brand}</p>
                    <p className="text-[14px] font-light uppercase tracking-[0.1em] text-zinc-300 group-hover:text-amber-200 transition-colors truncate">{rec.name}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PerfumePage;

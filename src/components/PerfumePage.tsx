import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Wind, Droplets, Zap, ChevronRight, Plus } from "lucide-react";
import { Perfume, getRelatedPerfumes } from "@/data/database";
import { useRef, useEffect, useState, useMemo } from "react";
import { getNoteImage } from "@/data/notesData";
import NoteZoomModal from "@/components/NoteZoomModal";

interface PerfumePageProps {
  perfume: Perfume;
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

type DeviceType = "mobile" | "tablet" | "desktop";

const getDevice = (): DeviceType => {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoomedNote, setZoomedNote] = useState<{ name: string; image: string } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{x:number;y:number;vx:number;vy:number;size:number;color:string;alpha:number;glowSize:number;phase:number;pulsePhase:number}>>([]);
  const animFrameRef = useRef<number>(0);
  const mouseSpeedRef = useRef(0);
  const timeRef = useRef(0);

  // Détection device au montage + resize
  useEffect(() => {
    const update = () => setDevice(getDevice());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
    const COLORS = ["#D4AF37", "#F59E0B", "#FFF7ED"];
    const COUNT = 90;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    if (particlesRef.current.length === 0) {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8, vy: -0.3 - Math.random() * 0.6,
        size: 0.8 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.08 + Math.random() * 0.25,
        glowSize: 4 + Math.random() * 8,
        phase: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    }
    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const time = timeRef.current;
      const speed = mouseSpeedRef.current;
      mouseSpeedRef.current *= 0.92;
      const intensity = Math.min(speed / 15, 1);
      const bottleCx = w * 0.5, bottleCy = h * 0.45;
      const pushRadius = Math.min(w, h) * 0.25;
      particlesRef.current.forEach(p => {
        const boost = 1 + intensity * 1.5;
        const sway = Math.sin(time * 1.2 + p.phase) * 0.8;
        p.x += (p.vx + sway * 0.3) * boost;
        p.y += p.vy * boost;
        const dx = p.x - bottleCx, dy = p.y - bottleCy;
        const distToBottle = Math.sqrt(dx*dx + dy*dy);
        if (distToBottle < pushRadius && intensity > 0.1) {
          const pushStrength = (1 - distToBottle / pushRadius) * intensity * 3;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * pushStrength;
          p.y += Math.sin(angle) * pushStrength;
        }
        if (p.x > w) p.x = 0; if (p.x < 0) p.x = w;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const cx = w/2, cy = h/2;
        const distFromCenter = Math.sqrt((p.x-cx)**2 + (p.y-cy)**2);
        const edgeFade = Math.max(0, 1 - (distFromCenter / (Math.max(w,h)*0.5)) * 0.3);
        const pulse = 0.7 + 0.3 * Math.sin(time * 2.5 + p.pulsePhase);
        const dynamicAlpha = p.alpha * pulse * (0.6 + intensity * 0.4) * edgeFade;
        if (dynamicAlpha < 0.01) return;
        ctx.save();
        ctx.globalAlpha = dynamicAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glowSize * pulse * (1 + intensity * 1.2);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    animFrameRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", resize); };
  }, []);

  const recommendations = useMemo(() => getRelatedPerfumes(perfume, 5), [perfume]);

  const stats = [
    { label: "Tête", val: 85, icon: <Wind size={14}/>, notes: perfume.topNotesDetailed },
    { label: "Cœur", val: 65, icon: <Droplets size={14}/>, notes: perfume.heartNotesDetailed },
    { label: "Fond", val: 92, icon: <Zap size={14}/>, notes: perfume.baseNotesDetailed },
  ];

  // ─── Blocs réutilisables ───────────────────────────────────────────

  const StatsList = ({ compact = false }: { compact?: boolean }) => (
    <div className={compact ? "space-y-3" : "space-y-5"}>
      <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-bold border-b border-white/5 pb-2">
        Architecture des Essences
      </h3>
      {stats.map((s, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className={`${compact ? "text-[10px]" : "text-[11px]"} uppercase tracking-[0.25em] text-zinc-300 font-light flex items-center gap-1.5`}>
              <span className="text-amber-500/60">{s.icon}</span> {s.label}
            </span>
            <span className="text-amber-400 text-xs font-light">
              {s.val}<span className="text-[7px] ml-0.5 opacity-40">%</span>
            </span>
          </div>
          <div className="h-1.5 bg-zinc-900 w-full rounded-full border border-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
              transition={{ duration: 2, delay: i * 0.2, ease: "circOut" }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #92400e 0%, #fbbf24 60%, #fffbeb 100%)' }}
            />
          </div>
          {/* Notes : chips sur tablette, bulles sur mobile/PC */}
          {compact ? (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {s.notes.map((note, idx) => (
                <div key={idx}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/5 cursor-pointer hover:border-amber-500/30 transition-colors group/note"
                  onClick={() => setZoomedNote({ name: note.name, image: getNoteImage(note.name) })}>
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                    <img src={getNoteImage(note.name)} loading="lazy" className="w-full h-full object-cover" alt={note.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=40&h=40&fit=crop&q=80"; }} />
                  </div>
                  <span className="text-[9px] uppercase tracking-wide text-zinc-500 group-hover/note:text-amber-300 transition-colors whitespace-nowrap">
                    {note.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 pt-1">
              {s.notes.map((note, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer group/note"
                  onClick={() => setZoomedNote({ name: note.name, image: getNoteImage(note.name) })}>
                  <div className="note-bubble-container !w-10 !h-10">
                    <img src={getNoteImage(note.name)} loading="lazy" className="note-bubble-img" alt={note.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop&q=80"; }} />
                  </div>
                  <span className="text-[8px] uppercase tracking-wide text-zinc-600 group-hover/note:text-amber-300 transition-colors max-w-[44px] text-center leading-tight">
                    {note.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const CarouselBlock = ({ cardW, cardH, dragLeft }: { cardW: number; cardH: number; dragLeft: number }) => (
    <div className="mt-8 pt-5 border-t border-white/[0.05]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-black italic">Sillages Analogues</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600">Défiler</span>
          <ChevronRight size={11} className="text-zinc-700" />
        </div>
      </div>
      <div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div drag="x" dragConstraints={{ right: 0, left: dragLeft }}
          className="flex gap-3 w-max pb-3">
          {recommendations.map((rec) => (
            <motion.button key={rec.id} onClick={() => onSelectPerfume(rec)}
              className="group text-left space-y-1.5" style={{ width: cardW }} whileHover={{ y: -3 }}>
              <div className="perfume-img-container gold-frame bg-zinc-900/30" style={{ height: cardH }}>
                <img src={rec.image} className="perfume-img opacity-70 group-hover:opacity-100 transition-opacity" alt={rec.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-2.5">
                  <div className="flex items-center gap-1">
                    <Plus size={9} className="text-amber-500" />
                    <span className="text-[7px] uppercase tracking-widest text-amber-500">Voir</span>
                  </div>
                </div>
              </div>
              <div className="px-1 space-y-0.5">
                <p className="text-[7px] uppercase tracking-[0.4em] text-zinc-600 italic">{rec.brand}</p>
                <p className="text-[10px] font-light uppercase tracking-wide text-zinc-300 group-hover:text-amber-200 transition-colors truncate">{rec.name}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );

  // ─── Header commun ─────────────────────────────────────────────────
  const Header = () => (
    <div className="sticky top-0 z-[999] w-full pointer-events-none">
      <AnimatePresence>
        {isScrolled && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          />
        )}
      </AnimatePresence>
      <header className="relative z-20 h-14 w-full flex items-center justify-between px-5 pointer-events-auto">
        <div className="flex flex-col">
          <span className={`text-[8px] uppercase tracking-[0.5em] font-black italic transition-colors ${isScrolled ? "text-amber-500" : "text-amber-500/30"}`}>
            Signature Collection
          </span>
          {isScrolled && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="text-[10px] uppercase tracking-widest text-zinc-200 font-light">
              {perfume.name}
            </motion.span>
          )}
        </div>
        <button onClick={onClose} className="group w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/20 transition-all">
          <X size={16} className="text-white group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </header>
    </div>
  );

  // ──────────────────────────────────────────────────────────────────
  //  RENDU SELON DEVICE
  // ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      <canvas ref={canvasRef} className="gold-dust-canvas" />
      <Header />

      {/* ── TABLETTE ── */}
      {device === "tablet" && (
        <div className="px-6 pt-4 pb-10 relative z-10">

          {/* Titre */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-5">
            <h1 className="text-4xl font-extralight italic tracking-tight uppercase leading-none">{perfume.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-amber-500 tracking-[0.4em] uppercase text-[10px] font-black">{perfume.brand}</p>
              <div className="h-px flex-1 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Calendar size={10} className="text-amber-200/50" />
                <span className="text-[9px] uppercase tracking-widest text-zinc-500">{perfume.year}</span>
              </div>
            </div>
          </motion.div>

          {/* Image gauche + infos droite */}
          <div className="flex gap-6 items-start">

            {/* Image */}
            <div className="flex-shrink-0 w-[240px] space-y-3">
              <div className="perfume-img-container perfume-studio-lighting gold-frame !h-[300px] bg-zinc-950/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img src={perfume.image} className="perfume-img" alt={perfume.name} />
                  <div className="perfume-shine-overlay" />
                </motion.div>
              </div>
              <div className="px-3 py-2.5 border-l-2 border-amber-500/30 bg-white/[0.02] rounded-r-lg">
                <p className="text-zinc-500 text-[11px] leading-relaxed font-extralight italic">{perfume.description}</p>
              </div>
            </div>

            {/* Jauges + Notes style chips */}
            <div className="flex-1">
              <StatsList compact={true} />
            </div>
          </div>

          <CarouselBlock cardW={140} cardH={170} dragLeft={-(recommendations.length * 155 - 700)} />
        </div>
      )}

      {/* ── MOBILE & PC (layout existant) ── */}
      {device !== "tablet" && (
        <div className="max-w-5xl mx-auto px-4 pt-4 pb-16 relative z-10">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-6">
            <h1 className="text-3xl lg:text-5xl font-extralight italic tracking-tight uppercase leading-none mb-2">{perfume.name}</h1>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-12 bg-white/20" />
              <p className="text-amber-500 tracking-[0.5em] uppercase text-[10px] font-black">{perfume.brand}</p>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            <div className="space-y-4">
              <div className="perfume-img-container perfume-studio-lighting gold-frame !h-[280px] lg:!h-[320px] bg-zinc-950/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img src={perfume.image} className="perfume-img" alt={perfume.name} />
                  <div className="perfume-shine-overlay" />
                </motion.div>
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10">
                  <Calendar size={11} className="text-amber-200/70" />
                  <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-300">{perfume.year}</span>
                </div>
              </div>
              <div className="relative px-4 py-3 border-l border-amber-500/20 bg-white/[0.02] rounded-r-xl">
                <p className="text-zinc-400 text-sm leading-relaxed font-extralight italic">{perfume.description}</p>
              </div>
            </div>

            <StatsList compact={false} />
          </div>

          <CarouselBlock cardW={160} cardH={200} dragLeft={-(recommendations.length * 175 - 600)} />
        </div>
      )}

      <NoteZoomModal
        noteName={zoomedNote?.name ?? null}
        noteImage={zoomedNote?.image ?? ""}
        onClose={() => setZoomedNote(null)}
      />
    </div>
  );
};

export default PerfumePage;

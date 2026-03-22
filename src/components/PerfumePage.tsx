import { motion, AnimatePresence } from "framer-motion";
import { X, Wind, Droplets, Zap, ChevronRight, Plus, ChevronLeft } from "lucide-react";
import { Perfume, PERFUMES } from "@/data/database";
import { useRef, useEffect, useState, useMemo } from "react";
import { getNoteImage } from "@/data/notesData";
import { ACCORDS_LIBRARY } from "@/data/accords";
import { getAccordIdsForPerfume } from "@/data/parfumAccords";

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

function getRelatedPerfumes(perfume: Perfume, minCount: number = 5): Perfume[] {
  const validGenders = (() => {
    switch (perfume.gender) {
      case "femme":   return ["femme", "unisexe"];
      case "homme":   return ["homme", "unisexe"];
      case "unisexe": return ["unisexe", "femme", "homme"];
      default:        return ["femme", "homme", "unisexe"];
    }
  })();
  const allNotes = [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes];
  const genderMatches = PERFUMES.filter(p => p.id !== perfume.id && validGenders.includes(p.gender));
  const scored = genderMatches.map((p) => {
    const pNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes];
    const commonNotes = allNotes.filter(n => pNotes.some(pn => pn.toLowerCase() === n.toLowerCase())).length;
    const sameBrand = p.brand === perfume.brand ? 2 : 0;
    return { perfume: p, score: commonNotes + sameBrand };
  });
  scored.sort((a, b) => b.score - a.score);
  const noteMatches = scored.filter(s => s.score > 0).map(s => s.perfume);
  if (noteMatches.length >= minCount) return noteMatches.slice(0, 8);
  const remaining = genderMatches.filter(p => !noteMatches.some(m => m.id === p.id));
  return [...noteMatches, ...remaining].slice(0, Math.max(minCount, 8));
}

function getPerfumesWithNote(noteName: string): Perfume[] {
  const q = noteName.toLowerCase();
  return PERFUMES.filter(p => {
    const allNotes = [
      ...p.topNotes, ...p.heartNotes, ...p.baseNotes,
      ...(p.topNotesDetailed || []).map(n => n.name),
      ...(p.heartNotesDetailed || []).map(n => n.name),
      ...(p.baseNotesDetailed || []).map(n => n.name),
    ];
    return allNotes.some(n => n.toLowerCase().includes(q));
  });
}

// ── Config sillage (arc+flacon validé session 3) ───────────────
const SILLAGE_CONFIG = {
  "discret":   { label: "Discret",   sublabel: "Proche de la peau", arcs: 1 },
  "modéré":    { label: "Modéré",    sublabel: "Perceptible",        arcs: 2 },
  "fort":      { label: "Fort",      sublabel: "Très perceptible",   arcs: 3 },
  "très fort": { label: "Très Fort", sublabel: "Enveloppant",        arcs: 4 },
} as const;

const LONGEVITE_CONFIG = {
  "2-4h": { label: "2 - 4 h", sublabel: "Légère",  dashOffset: 75 },
  "4-6h": { label: "4 - 6 h", sublabel: "Modérée", dashOffset: 50 },
  "6-8h": { label: "6 - 8 h", sublabel: "Intense", dashOffset: 25 },
  "8h+":  { label: "8 h +",   sublabel: "Extrême", dashOffset: 0  },
} as const;

// ── Couleurs Jour / Nuit ───────────────────────────────────────
const JOUR_COLOR = "#E8C97A";
const JOUR_TEXT  = "#7a5a00";
const NUIT_COLOR = "#2C2C4A";
const NUIT_TEXT  = "#ffffff";

const PerfumePage = ({ perfume, onClose, onSelectPerfume }: PerfumePageProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [notePanelNote, setNotePanelNote] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; color: string; alpha: number;
    glowSize: number; phase: number; pulsePhase: number;
  }>>([]);
  const animFrameRef = useRef<number>(0);
  const mouseSpeedRef = useRef(0);
  const timeRef = useRef(0);

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
        const distToBottle = Math.sqrt(dx * dx + dy * dy);
        if (distToBottle < pushRadius && intensity > 0.1) {
          const pushStrength = (1 - distToBottle / pushRadius) * intensity * 3;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * pushStrength;
          p.y += Math.sin(angle) * pushStrength;
        }
        if (p.x > w) p.x = 0; if (p.x < 0) p.x = w;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const cx = w / 2, cy = h / 2;
        const distFromCenter = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
        const edgeFade = Math.max(0, 1 - (distFromCenter / (Math.max(w, h) * 0.5)) * 0.3);
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
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const recommendations = useMemo(() => getRelatedPerfumes(perfume, 5), [perfume]);

  const perfumeAccords = useMemo(() => {
    const ids = getAccordIdsForPerfume(perfume.id);
    return ids.map(id => ACCORDS_LIBRARY[id]).filter(Boolean).slice(0, 6);
  }, [perfume.id]);

  const notePanelResults = useMemo(() => {
    if (!notePanelNote) return [];
    return getPerfumesWithNote(notePanelNote).filter(p => p.id !== perfume.id).slice(0, 10);
  }, [notePanelNote, perfume.id]);

  const stats = [
    { label: "Tête",  val: 85, icon: <Wind size={12} />,     notes: perfume.topNotesDetailed },
    { label: "Cœur",  val: 65, icon: <Droplets size={12} />, notes: perfume.heartNotesDetailed },
    { label: "Fond",  val: 92, icon: <Zap size={12} />,      notes: perfume.baseNotesDetailed },
  ];

  const allNotes = useMemo(() => [
    ...perfume.topNotesDetailed.map(n => ({ ...n, layer: "Tête" })),
    ...perfume.heartNotesDetailed.map(n => ({ ...n, layer: "Cœur" })),
    ...perfume.baseNotesDetailed.map(n => ({ ...n, layer: "Fond" })),
  ], [perfume]);

  // ─── AccordsBlock ──────────────────────────────────────────────
  const AccordsBlock = () => (
    <div className="space-y-2">
      <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold pb-1">
        Accords Principaux
      </h3>
      <div className="space-y-1.5">
        {perfumeAccords.map((accord, i) => {
          const widthPct = Math.max(60, 100 - i * 8);
          return (
            <motion.div
              key={accord.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="relative h-8 rounded-md overflow-hidden"
              style={{ backgroundColor: `${accord.color}18` }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPct}%` }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.7, ease: "circOut" }}
                className="absolute inset-y-0 left-0 rounded-md"
                style={{ backgroundColor: accord.color }}
              />
              <span
                className="absolute inset-0 flex items-center px-3 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
              >
                {accord.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // ─── MiniStats ─────────────────────────────────────────────────
  const MiniStats = () => (
    <div className="space-y-2 mt-3">
      <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold">
        Architecture des Essences
      </h3>
      {stats.map((s, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1">
              <span className="text-amber-500/60">{s.icon}</span> {s.label}
            </span>
            <span className="text-zinc-600 text-[10px]">{s.val}%</span>
          </div>
          <div className="h-1 bg-zinc-200 w-full rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${s.val}%` }}
              transition={{ duration: 1.5, delay: i * 0.15, ease: "circOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #92400e 0%, #fbbf24 60%, #fffbeb 100%)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // ─── AllNotesBlock — grille carrés ────────────────────────────
  const AllNotesBlock = ({ compact = false }: { compact?: boolean }) => (
    <div className={compact ? "mt-5" : "mt-6 pt-5 border-t border-black/10"}>
      <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-3">
        Notes Olfactives
      </h3>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))" }}>
        {allNotes.map((note, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.025, duration: 0.3 }}
            onClick={() => setNotePanelNote(note.name)}
            className="group flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-black/8 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-sm"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden border border-black/6 bg-zinc-50">
              <img
                src={getNoteImage(note.name)}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt={note.name}
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop&q=80"; }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-wide text-zinc-600 group-hover:text-amber-700 transition-colors text-center leading-tight font-medium w-full line-clamp-2">
              {note.name}
            </span>
            <span className="text-[7px] uppercase tracking-widest text-zinc-300 group-hover:text-amber-300 transition-colors">
              {note.layer}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  // ─── JourNuitBlock — jauge proportionnelle (colonne droite) ───
  const JourNuitBlock = ({ compact = false }: { compact?: boolean }) => {
    if (perfume.jourPct === undefined) return null;
    const jourPct = perfume.jourPct ?? 50;
    const nuitPct = 100 - jourPct;

    const SunIcon = ({ color }: { color: string }) => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    );

    const MoonIcon = ({ color }: { color: string }) => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    );

    return (
      <div className={compact ? "mt-4" : "mt-6 pt-5 border-t border-black/10"}>
        <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-3">
          Journée
        </h3>
        <div className="bg-white rounded-xl border border-black/8 px-3 pt-3 pb-3">
          <div className="rounded-lg overflow-hidden flex" style={{ height: "32px" }}>
            {jourPct > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${jourPct}%` }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex items-center justify-center gap-1.5 overflow-hidden"
                style={{ backgroundColor: JOUR_COLOR, width: `${jourPct}%` }}
              >
                <SunIcon color={JOUR_TEXT} />
                {jourPct >= 20 && (
                  <span style={{ fontSize: "10px", fontWeight: 700, color: JOUR_TEXT, whiteSpace: "nowrap" }}>
                    {jourPct >= 40 ? `Jour · ${jourPct}%` : `${jourPct}%`}
                  </span>
                )}
              </motion.div>
            )}
            {nuitPct > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${nuitPct}%` }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex items-center justify-center gap-1.5 overflow-hidden"
                style={{ backgroundColor: NUIT_COLOR, width: `${nuitPct}%` }}
              >
                <MoonIcon color={NUIT_TEXT} />
                {nuitPct >= 20 && (
                  <span style={{ fontSize: "10px", fontWeight: 700, color: NUIT_TEXT, whiteSpace: "nowrap" }}>
                    {nuitPct >= 40 ? `Nuit · ${nuitPct}%` : `${nuitPct}%`}
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── ProfilOlfactif — arc jauge + flacon SVG (validé session 3) ──
  const ProfilOlfactif = () => {
    if (!perfume.sillage && !perfume.longevite) return null;

    const sillage   = perfume.sillage   ? SILLAGE_CONFIG[perfume.sillage]    : null;
    const longevite = perfume.longevite ? LONGEVITE_CONFIG[perfume.longevite] : null;

    // Flacon vaporisateur + demi-cercles concentriques
    const FlaconsVapeur = ({ arcs }: { arcs: number }) => (
      <svg viewBox="0 0 72 72" style={{ width: "64px", display: "block", margin: "0 auto 6px" }}>
        {/* Corps flacon */}
        <rect x="12" y="32" width="20" height="30" rx="4" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4"/>
        <rect x="17" y="25" width="10" height="9" rx="2" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.2"/>
        <line x1="12" y1="38" x2="32" y2="38" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.2"/>
        {/* Tête pompe */}
        <rect x="15" y="17" width="14" height="4" rx="2" fill="#1a1a1a"/>
        <rect x="21" y="13" width="2" height="5" rx="1" fill="#1a1a1a"/>
        {/* Demi-cercles selon niveau */}
        {arcs >= 1 && <path d="M 34 26 A 10 10 0 0 1 34 46" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" opacity="0.78"/>}
        {arcs >= 2 && <path d="M 34 19 A 17 17 0 0 1 34 53" fill="none" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" opacity="0.42"/>}
        {arcs >= 3 && <path d="M 34 12 A 24 24 0 0 1 34 60" fill="none" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" opacity="0.18"/>}
        {arcs >= 4 && <path d="M 34 5 A 31 31 0 0 1 34 67" fill="none" stroke="#1a1a1a" strokeWidth="0.7" strokeLinecap="round" opacity="0.08"/>}
      </svg>
    );

    return (
      <div className="mt-5 pt-5 border-t border-black/10">
        <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-4">
          Profil Olfactif
        </h3>
        <div className="grid grid-cols-2 gap-3">

          {/* Longévité — arc jauge montre */}
          {longevite && (
            <div className="bg-white rounded-xl border border-black/8 px-3 pt-3 pb-3 text-center">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-2">Longévité</p>
              <svg viewBox="0 0 80 48" style={{ width: "76px", display: "block", margin: "0 auto 6px" }}>
                {/* Arc fond */}
                <path d="M 8 44 A 32 32 0 0 1 72 44" fill="none" stroke="#f0ede8" strokeWidth="5" strokeLinecap="round"/>
                {/* Arc actif */}
                <path d="M 8 44 A 32 32 0 0 1 72 44" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray="100" strokeDashoffset={longevite.dashOffset}/>
                <text x="40" y="36" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a1a1a" fontFamily="Georgia, serif">
                  {longevite.label}
                </text>
              </svg>
              <p className="text-[9px] font-semibold text-zinc-700" style={{ fontFamily: "Georgia, serif" }}>{longevite.sublabel}</p>
            </div>
          )}

          {/* Sillage — flacon vaporisateur */}
          {sillage && (
            <div className="bg-white rounded-xl border border-black/8 px-3 pt-3 pb-3 text-center">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-2">Sillage</p>
              <FlaconsVapeur arcs={sillage.arcs} />
              <p className="text-[10px] font-semibold text-zinc-800" style={{ fontFamily: "Georgia, serif" }}>{sillage.label}</p>
              <p className="text-[8px] text-zinc-400 mt-0.5 uppercase tracking-[0.2em]">{sillage.sublabel}</p>
            </div>
          )}

        </div>
      </div>
    );
  };

  // ─── CarouselBlock ─────────────────────────────────────────────
  const CarouselBlock = ({ cardW, cardH, dragLeft }: { cardW: number; cardH: number; dragLeft: number }) => (
    <div className="mt-8 pt-5 border-t border-black/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-black italic">Sillages Analogues</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-400">Défiler</span>
          <ChevronRight size={11} className="text-zinc-400" />
        </div>
      </div>
      <div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div drag="x" dragConstraints={{ right: 0, left: dragLeft }} className="flex gap-3 w-max pb-3">
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
                <p className="text-[7px] uppercase tracking-[0.4em] text-zinc-400 italic">{rec.brand}</p>
                <p className="text-[10px] font-light uppercase tracking-wide text-zinc-600 group-hover:text-amber-700 transition-colors truncate">{rec.name}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );

  // ─── Header ────────────────────────────────────────────────────
  const Header = () => (
    <div className="sticky top-0 z-[999] w-full pointer-events-none">
      <AnimatePresence>
        {isScrolled && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(245,240,232,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
          />
        )}
      </AnimatePresence>
      <header className="relative z-20 h-14 w-full flex items-center justify-between px-5 pointer-events-auto">
        <div className="flex flex-col">
          <span className={`text-[8px] uppercase tracking-[0.5em] font-black italic transition-colors ${isScrolled ? "text-zinc-800" : "text-zinc-400/50"}`}>
            Signature Collection
          </span>
          {isScrolled && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="text-[10px] uppercase tracking-widest text-zinc-700 font-light">
              {perfume.name}
            </motion.span>
          )}
        </div>
        <button onClick={onClose} className="group w-9 h-9 flex items-center justify-center rounded-full border border-black/10 bg-black/5 hover:bg-black/10 transition-all">
          <X size={16} className="text-zinc-700 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </header>
    </div>
  );

  // ─── NotePanel ─────────────────────────────────────────────────
  const NotePanel = () => (
    <AnimatePresence>
      {notePanelNote && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setNotePanelNote(null)}
            className="fixed inset-0 z-[600] bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[601] w-full max-w-sm bg-[#F5F0E8] border-l border-black/10 flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 p-5 border-b border-black/10">
              <button
                onClick={() => setNotePanelNote(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition-all"
              >
                <ChevronLeft size={16} className="text-zinc-600" />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10">
                  <img
                    src={getNoteImage(notePanelNote)}
                    alt={notePanelNote}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop&q=80"; }}
                  />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-400">Note olfactive</p>
                  <p className="text-sm font-semibold uppercase tracking-wide text-zinc-800">{notePanelNote}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-4">
                {notePanelResults.length} parfum{notePanelResults.length > 1 ? "s" : ""} avec cette note
              </p>
              {notePanelResults.length === 0 ? (
                <p className="text-zinc-400 text-sm text-center mt-10">Aucun autre parfum trouvé</p>
              ) : (
                <div className="space-y-2">
                  {notePanelResults.map((p, i) => (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { setNotePanelNote(null); onSelectPerfume(p); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5 hover:border-amber-300 hover:bg-amber-50 transition-all group text-left"
                    >
                      <div className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 flex items-center justify-center">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] uppercase tracking-widest text-zinc-400">{p.brand}</p>
                        <p className="text-sm font-medium text-zinc-800 group-hover:text-amber-700 truncate">{p.name}</p>
                        <p className="text-[9px] text-zinc-400 mt-0.5">{p.concentration}</p>
                      </div>
                      <ChevronRight size={14} className="text-zinc-300 group-hover:text-amber-500 flex-shrink-0" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // ──────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-[#F5F0E8] text-black overflow-x-hidden selection:bg-amber-200 selection:text-black font-sans">
      <canvas ref={canvasRef} className="gold-dust-canvas" />
      <Header />
      <NotePanel />

      {/* ── LAYOUT PRINCIPAL (tablette + desktop) ──
          Gauche : Image + MiniStats + ProfilOlfactif (arc+flacon)
          Droite : Accords + Notes carrés + Jauge Jour/Nuit
      */}
      {device !== "mobile" && (
        <div className="max-w-5xl mx-auto px-6 pt-4 pb-16 relative z-10">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
            <h1 className="text-4xl lg:text-5xl font-extralight italic tracking-tight uppercase leading-none">{perfume.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-zinc-700 tracking-[0.4em] uppercase text-[10px] font-black">{perfume.brand}</p>
              <div className="h-px flex-1 bg-black/10" />
              <span className="text-[9px] uppercase tracking-widest text-zinc-400">{perfume.concentration}</span>
            </div>
          </motion.div>

          <div className="flex gap-6 items-start">

            {/* Colonne gauche */}
            <div className="flex-shrink-0 w-[220px] lg:w-[260px]">
              <div className="perfume-img-container perfume-studio-lighting gold-frame !h-[300px] lg:!h-[340px] bg-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={perfume.image} className="perfume-img" alt={perfume.name} />
                  <div className="perfume-shine-overlay" />
                </motion.div>
              </div>
              <MiniStats />
              <ProfilOlfactif />
            </div>

            {/* Colonne droite */}
            <div className="flex-1 min-w-0">
              <AccordsBlock />
              <AllNotesBlock compact />
              <JourNuitBlock compact />
            </div>

          </div>

          {/* Description pleine largeur */}
          <div className="mt-6 px-4 py-3 border-l-2 border-amber-400/40 bg-white/60 rounded-r-xl">
            <p className="text-zinc-500 text-sm leading-relaxed font-extralight italic">{perfume.description}</p>
          </div>

          <CarouselBlock
            cardW={device === "tablet" ? 140 : 160}
            cardH={device === "tablet" ? 170 : 200}
            dragLeft={-(recommendations.length * (device === "tablet" ? 155 : 175) - 600)}
          />
        </div>
      )}

      {/* ── LAYOUT MOBILE ── */}
      {device === "mobile" && (
        <div className="px-4 pt-4 pb-16 relative z-10">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-center">
            <h1 className="text-3xl font-extralight italic tracking-tight uppercase leading-none">{perfume.name}</h1>
            <p className="text-zinc-700 tracking-[0.4em] uppercase text-[10px] font-black mt-1">{perfume.brand}</p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400 mt-0.5">{perfume.concentration}</p>
          </motion.div>

          <div className="perfume-img-container perfume-studio-lighting gold-frame !h-[260px] bg-white mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={perfume.image} className="perfume-img" alt={perfume.name} />
              <div className="perfume-shine-overlay" />
            </motion.div>
          </div>

          <MiniStats />

          <div className="mt-5">
            <AccordsBlock />
          </div>

          <AllNotesBlock />
          <JourNuitBlock />

          <div className="mt-5 px-3 py-3 border-l-2 border-amber-400/40 bg-white/60 rounded-r-xl">
            <p className="text-zinc-500 text-sm leading-relaxed font-extralight italic">{perfume.description}</p>
          </div>

          <ProfilOlfactif />

          <CarouselBlock cardW={130} cardH={160} dragLeft={-(recommendations.length * 145 - 400)} />
        </div>
      )}
    </div>
  );
};

export default PerfumePage;

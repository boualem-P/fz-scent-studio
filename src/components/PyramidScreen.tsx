import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Smile, Frown, Loader2 } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[], atmosphere?: string, radarIntensities?: Record<string, number>) => void;
  onMenu: () => void;
  setInternalBackHandler: (fn: () => boolean) => void;
}

const FAMILIES = ['AGRUMES', 'ANIMAL', 'BOISÉ', 'ÉPICÉ', 'FLORAL', 'FRUITÉ', 'SUCRÉ', 'MARINE'];

const RADAR_TO_FAMILY: Record<string, string[]> = {
  'AGRUMES': ['hesperides'],
  'ANIMAL':  ['musquees', 'cuir', 'animal'],
  'BOISÉ':   ['boisees', 'mousses', 'notes-vertes'],
  'ÉPICÉ':   ['epicees', 'epices-fraiches', 'epices-chaudes'],
  'FLORAL':  ['florales'],
  'FRUITÉ':  ['fruitees', 'fruits-legers'],
  'SUCRÉ':   ['gourmandes'],
  'MARINE':  ['marines'],
};

const NOTES_DATA: Record<string, { id: NoteCategory, label: string, img: string, sub: string, tags: string[] }[]> = {
  top: [
    { id: "hesperides", label: "Lumière du Matin", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXwYm46Mp9tr5luXGPCodZofYO4jN0XimA&s", sub: "Éclat Hespéridé", tags: ["Bergamote", "Citron", "Mandarine"] },
    { id: "marines", label: "Souffle Marin", img: "https://png.pngtree.com/thumb_back/fh260/background/20241101/pngtree-tranquil-underwater-landscape-featuring-colorful-rocks-surrounded-by-diverse-aquatic-flora-image_16484128.jpg", sub: "Fraîcheur Aquatique & Pure", tags: ["Sel marin", "Algues", "Air iodé"] },
    { id: "fruitees", label: "Douceur Fruitée", img: "https://static.vecteezy.com/system/resources/thumbnails/053/277/426/small/spring-fruit-scene-designed-to-integrate-seamlessly-with-your-text-or-graphics-photo.jpeg", sub: "Léger & Pétillant", tags: ["Pêche", "Framboise", "Cassis"] }
  ],
  heart: [
    { id: "florales", label: "Jardin Secret", img: "https://img.freepik.com/photos-premium/jardin-banc-fleurs-dans-herbe_1022944-31664.jpg", sub: "Floral & Délicat", tags: ["Rose", "Jasmin", "Néroli"] },
    { id: "epicees", label: "Nuit Précieuse", img: "https://img.freepik.com/photos-gratuite/architecture-mosquee-fantastique-pour-celebration-du-nouvel-an-islamique_23-2151457419.jpg?semt=ais_hybrid&w=740&q=80", sub: "Mystère Oriental Épicé", tags: ["Safran", "Cannelle", "Poivre noir"] },
    { id: "musquees", label: "Chaleur Dorée", img: "https://i.ibb.co/Wp7ygw9k/fzp.png", sub: "Sillage Ambré", tags: ["Musc", "Ambre", "Patchouli"] }
  ],
  base: [
    { id: "boisees", label: "Bois Sacré", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400", sub: "Profondeur Boisée", tags: ["Santal", "Cèdre", "Vétiver"] },
    { id: "gourmandes", label: "Secret Sucré", img: "https://i.ibb.co/8StFqcr/88535382628.png", sub: "Tentation Gourmande", tags: ["Vanille", "Tonka", "Caramel"] }
  ]
};

// ── ICÔNES SVG PERSONNALISÉES ───────────────────────────────────
const IconParfum = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6l1 3H8L9 3z"/>
    <path d="M8 6c0 0-2 1-2 6s2 9 6 9 6-4 6-9-2-6-2-6"/>
    <path d="M10 3c0-1 .5-2 2-2s2 1 2 2"/>
    <circle cx="12" cy="13" r="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

const IconSoiree = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Costard homme */}
    <path d="M5 22V10l3-4 2 3-2 3h8l-2-3 2-3 3 4v12"/>
    <path d="M10 6l2 3 2-3"/>
    {/* Robe femme */}
    <path d="M16 6c1 0 2 .5 2 2l1 14H15l1-14c0-1.5.5-2 0-2z" opacity="0.6"/>
  </svg>
);

const IconCroissant = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" opacity="0.3"/>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    <circle cx="17" cy="6" r="1" fill="currentColor"/>
    <circle cx="19" cy="9" r="0.7" fill="currentColor"/>
    <circle cx="15" cy="4" r="0.7" fill="currentColor"/>
  </svg>
);

// ── 8 ATMOSPHÈRES ADAPTÉES AU MARCHÉ ALGÉRIEN ──────────────────
const ATMOSPHERES = [
  {
    id: 'quotidien',
    label: 'Mon quotidien',
    icon: <IconParfum />,
    desc: "Frais, discret & efficace",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400",
    group: 'quotidien',
  },
  {
    id: 'business',
    label: 'Au bureau',
    icon: <span className="text-2xl">💼</span>,
    desc: "Assuré & professionnel",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400",
    group: 'quotidien',
  },
  {
    id: 'aid',
    label: 'Aïd & Fêtes',
    icon: <IconCroissant />,
    desc: "Oriental, festif & généreux",
    img: "https://img.freepik.com/photos-gratuite/architecture-mosquee-fantastique-pour-celebration-du-nouvel-an-islamique_23-2151457419.jpg?semt=ais_hybrid&w=740&q=80",
    group: 'occasions',
  },
  {
    id: 'mariage',
    label: 'Mariage & Fiançailles',
    icon: <span className="text-2xl">💍</span>,
    desc: "Somptueux & inoubliable",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400",
    group: 'occasions',
  },
  {
    id: 'soir',
    label: 'Soirée & Sorties',
    icon: <IconSoiree />,
    desc: "Intense & magnétique",
    img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=400",
    group: 'occasions',
  },
  {
    id: 'rendezvous',
    label: 'Rendez-vous',
    icon: <span className="text-2xl">❤️</span>,
    desc: "Sensuel & captivant",
    img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=400",
    group: 'intime',
  },
  {
    id: 'famille',
    label: 'En famille',
    icon: <span className="text-2xl">🏠</span>,
    desc: "Chaleureux & bienveillant",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400",
    group: 'intime',
  },
  {
    id: 'ramadan',
    label: 'Ramadan',
    icon: <span className="text-2xl">🕌</span>,
    desc: "Doux, oud & spirituel",
    img: "https://img.freepik.com/photos-gratuite/architecture-mosquee-fantastique-pour-celebration-du-nouvel-an-islamique_23-2151457419.jpg?semt=ais_hybrid&w=740&q=80",
    group: 'intime',
  },
];

// ── Types pour le canvas ────────────────────────────────────────
const GOLD_COLORS = ["#D4AF37", "#F59E0B", "#FFF0A0"];

interface Leaf {
  x: number; y: number; w: number; h: number;
  speed: number; rotation: number; rotSpeed: number;
  swayAmp: number; swayFreq: number; swayOffset: number;
  opacity: number; opacityDir: number; color: string;
}

interface Particle {
  x: number; y: number; vy: number; vx: number; alpha: number;
}

function createLeaf(canvasW: number, canvasH: number, startTop = false): Leaf {
  const size = 4 + Math.random() * 6;
  return {
    x: Math.random() * canvasW,
    y: startTop ? -size - Math.random() * canvasH * 0.3 : Math.random() * canvasH,
    w: size, h: size * (0.5 + Math.random() * 0.5),
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

const PyramidScreen = ({ onValidate, onMenu, setInternalBackHandler }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map' | 'atmosphere'>('swipe');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [intensities, setIntensities] = useState<number[]>(FAMILIES.map(() => 0.5));
  const [selections, setSelections] = useState<{ top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[] }>({
    top: [], heart: [], base: []
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep]];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const frownOpacity = useTransform(x, [-120, 0], [1, 0.6]);
  const smileOpacity = useTransform(x, [0, 120], [0.6, 1]);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.8 };

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

    const leaves: Leaf[] = Array.from({ length: 18 }, () => createLeaf(canvas.width, canvas.height));
    const particles: Particle[] = Array.from({ length: 40 }, () => createParticle(canvas.width, canvas.height));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const p of particles) {
        p.y += p.vy; p.x += p.vx;
        if (p.y > canvas.height) { p.y = -2; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
        ctx.fill();
      }

      for (const l of leaves) {
        l.y += l.speed;
        l.rotation += l.rotSpeed * l.speed;
        l.opacity += 0.003 * l.opacityDir;
        if (l.opacity >= 0.8) l.opacityDir = -1;
        if (l.opacity <= 0.3) l.opacityDir = 1;
        const swayX = l.swayAmp * Math.sin(frame * l.swayFreq + l.swayOffset);
        if (l.y > canvas.height + l.h) Object.assign(l, createLeaf(canvas.width, canvas.height, true));
        ctx.save();
        ctx.translate(l.x + swayX, l.y);
        ctx.rotate(l.rotation);
        ctx.globalAlpha = l.opacity;
        ctx.fillStyle = l.color;
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
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    setInternalBackHandler(() => {
      if (isAnalyzing) return true;
      if (screen === 'atmosphere') { setScreen('map'); return true; }
      if (screen === 'map') { setScreen('swipe'); setCurrentStep(0); setNoteIndex(0); return true; }
      return false;
    });
  }, [screen, isAnalyzing, setInternalBackHandler]);

  const triggerTransition = (nextScreen: 'swipe' | 'map' | 'atmosphere', text: string) => {
    setAnalysisText(text);
    setIsAnalyzing(true);
    setTimeout(() => { setIsAnalyzing(false); setScreen(nextScreen); }, 4000);
  };

  const handleSwipe = (liked: boolean) => {
    const key = steps[currentStep] as keyof typeof selections;
    if (liked) setSelections(prev => ({ ...prev, [key]: [...prev[key], currentNote.id] }));
    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      triggerTransition('map', "Harmonisation des essences sélectionnées...");
    }
    x.set(0);
  };

  const buildRadarIntensities = (): Record<string, number> => {
    const result: Record<string, number> = {};
    FAMILIES.forEach((family, i) => {
      const families = RADAR_TO_FAMILY[family] || [];
      families.forEach(f => { result[f] = intensities[i]; });
    });
    return result;
  };

  const size = 340;
  const center = size / 2;
  const radius = size * 0.32;

  const getPointPos = (index: number, intensity: number) => {
    const angle = (Math.PI * 2 * index) / FAMILIES.length - Math.PI / 2;
    return { x: center + radius * intensity * Math.cos(angle), y: center + radius * intensity * Math.sin(angle) };
  };

  const updateIntensity = (index: number, info: any) => {
    const rect = document.getElementById('radar-svg')?.getBoundingClientRect();
    if (!rect) return;
    const dx = info.point.x - (rect.left + rect.width / 2);
    const dy = info.point.y - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const newInts = [...intensities];
    newInts[index] = Math.min(Math.max(distance / radius, 0.1), 1);
    setIntensities(newInts);
  };

  const points = intensities.map((inst, i) => getPointPos(i, inst));
  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  const groupQuotidien = ATMOSPHERES.filter(a => a.group === 'quotidien');
  const groupOccasions = ATMOSPHERES.filter(a => a.group === 'occasions');
  const groupIntime    = ATMOSPHERES.filter(a => a.group === 'intime');

  // ── Bouton atmosphère — alignement centré ───────────────────
  const AtmButton = ({ atm, className }: { atm: typeof ATMOSPHERES[0], className: string }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onValidate(selections.top, selections.heart, selections.base, atm.id, buildRadarIntensities())}
      className={`group relative rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden flex flex-col items-center justify-center p-4 hover:border-amber-500/50 transition-all text-center ${className}`}
    >
      <img src={atm.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-500" alt={atm.label} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-1">
        <div className="text-amber-400 mb-1">{atm.icon}</div>
        <h4 className="text-white font-bold text-sm leading-tight text-center">{atm.label}</h4>
        <p className="text-amber-400/70 text-[9px] uppercase tracking-widest text-center">{atm.desc}</p>
      </div>
    </motion.button>
  );

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 touch-none select-none overflow-x-hidden overflow-y-auto">


      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      <AnimatePresence mode="wait">

        {isAnalyzing ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-10 text-center"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-t-2 border-b-2 border-amber-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-amber-500 opacity-50">
                <Loader2 size={24} className="animate-spin" />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-500 font-light italic tracking-[0.2em] text-sm uppercase"
            >
              {analysisText}
            </motion.p>
          </motion.div>

        ) : screen === 'swipe' ? (

          <motion.div
            key="swipe-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-sm flex flex-col items-center"
          >
            <h2 className="text-xl font-light mb-8 italic uppercase tracking-widest text-zinc-400">
              Affinez vos désirs
            </h2>

            <div className="relative w-full mb-12" style={{ height: '520px' }}>
              <div className="absolute inset-x-[-75px] top-1/2 -translate-y-1/2 flex justify-between items-center z-0 px-2 pointer-events-none">
                <motion.div style={{ opacity: frownOpacity }} className="text-white drop-shadow-lg">
                  <Frown size={48} strokeWidth={1.5} />
                </motion.div>
                <motion.div style={{ opacity: smileOpacity }} className="text-white drop-shadow-lg">
                  <Smile size={48} strokeWidth={1.5} />
                </motion.div>
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${steps[currentStep]}-${noteIndex}`}
                  style={{ x }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) handleSwipe(true);
                    else if (info.offset.x < -100) handleSwipe(false);
                  }}
                  initial={{ x: 0, scale: 0.9, opacity: 0 }}
                  animate={{ x: 0, scale: 1, opacity: 1 }}
                  exit={{ x: x.get() > 0 ? 600 : -600, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-zinc-100 z-10 flex flex-col"
                >
                  <div className="absolute inset-0 z-50 touch-none" />
                  <div className="w-full flex-shrink-0 pointer-events-none" style={{ height: '52%' }}>
                    <img src={currentNote.img} draggable="false" className="w-full h-full object-cover" alt={currentNote.label} />
                  </div>
                  <div className="w-full flex-1 px-5 py-3 text-center bg-white flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <h3 className="text-lg font-semibold text-black uppercase tracking-tight leading-tight">{currentNote.label}</h3>
                    <p className="text-amber-500 text-[11px] font-bold uppercase tracking-widest">{currentNote.sub}</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-[1px] w-10 bg-amber-400/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                      <div className="h-[1px] w-10 bg-amber-400/50" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                      {currentNote.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
              Balayez pour choisir
            </p>
          </motion.div>

        ) : screen === 'map' ? (

          <motion.div
            key="map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center mb-10 text-center">
              <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-white">Architecture Olfactive</h2>
              <div className="w-12 h-[1px] bg-amber-500 my-4 opacity-50" />
              <p className="text-amber-500/80 text-[10px] font-bold uppercase tracking-[0.15em]">
                Modelez l'intensité de vos accords
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <svg id="radar-svg" width={size} height={size} className="overflow-visible">
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                  <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#222" strokeWidth="0.5" />
                ))}
                {FAMILIES.map((_, i) => {
                  const p = getPointPos(i, 1);
                  return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#333" strokeDasharray="2 2" />;
                })}
                <motion.polygon
                  points={polygonPath}
                  fill="rgba(245, 158, 11, 0.15)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  animate={{ points: polygonPath }}
                  transition={{ type: "spring", ...springConfig }}
                />
                {points.map((p, i) => (
                  <motion.g key={i} animate={{ x: p.x, y: p.y }} transition={{ type: "spring", ...springConfig }}>
                    <motion.circle
                      cx={0} cy={0} r="35"
                      fill="transparent"
                      className="cursor-pointer"
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDrag={(_, info) => updateIntensity(i, info)}
                      whileTap={{ scale: 1.2 }}
                    />
                    <motion.circle
                      cx={0} cy={0}
                      r={4 + (intensities[i] * 6)}
                      fill="#f59e0b"
                      className="pointer-events-none"
                      style={{ filter: `blur(${intensities[i] * 5}px)`, opacity: 0.5 }}
                    />
                    <circle cx={0} cy={0} r="5" fill="#fff" className="pointer-events-none" />
                  </motion.g>
                ))}
                {FAMILIES.map((f, i) => {
                  const p = getPointPos(i, 1.55);
                  const isActive = intensities[i] > 0.7;
                  return (
                    <text
                      key={i} x={p.x} y={p.y}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="14" fontWeight="800"
                      fill={isActive ? '#f59e0b' : '#71717a'}
                      style={{ textTransform: 'uppercase', letterSpacing: '0.08em', pointerEvents: 'none' }}
                    >
                      {f}
                    </text>
                  );
                })}
              </svg>
            </div>

            <button
              onClick={() => triggerTransition('atmosphere', "Définition de l'environnement olfactif...")}
              className="mt-16 w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] active:scale-95 transition-transform"
            >
              Finaliser le profil
            </button>
          </motion.div>

        ) : (

          <motion.div
            key="atm"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-lg flex flex-col items-center pb-10"
          >
            <div className="flex flex-col items-center mb-8 text-center">
              <h2 className="text-3xl font-bold uppercase tracking-[0.35em] text-white">Votre Moment</h2>
              <div className="w-12 h-[1px] bg-amber-500 my-4 opacity-50" />
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Pour quelle occasion vous parfumez-vous ?
              </p>
            </div>

            <div className="w-full px-2 flex flex-col gap-3">

              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 px-1 mb-1">Le quotidien</p>
              <div className="grid grid-cols-2 gap-3">
                {groupQuotidien.map(atm => (
                  <AtmButton key={atm.id} atm={atm} className="h-28" />
                ))}
              </div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 px-1 mt-2 mb-1">Les grandes occasions</p>
              <div className="grid grid-cols-3 gap-3">
                {groupOccasions.map(atm => (
                  <AtmButton key={atm.id} atm={atm} className="h-36" />
                ))}
              </div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 px-1 mt-2 mb-1">L'intime</p>
              <AtmButton atm={groupIntime[0]} className="h-32 w-full" />
              <div className="grid grid-cols-2 gap-3">
                {groupIntime.slice(1).map(atm => (
                  <AtmButton key={atm.id} atm={atm} className="h-28" />
                ))}
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

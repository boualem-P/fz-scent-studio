import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Moon, Sun, Briefcase, Heart, ArrowRight, Smile, Frown, Loader2 } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[], atmosphere?: string, radarIntensities?: Record<string, number>) => void;
  onMenu: () => void;
  setInternalBackHandler: (fn: () => boolean) => void;
}

const FAMILIES = ['AGRUMES', 'ANIMAL', 'BOISÉ', 'ÉPICÉ', 'FLORAL', 'FRUITÉ', 'SUCRÉ', 'VERT'];

// Correspondance axe radar → familles olfactives
const RADAR_TO_FAMILY: Record<string, NoteCategory[]> = {
  'AGRUMES': ['hesperides'],
  'ANIMAL':  ['musquees'],
  'BOISÉ':   ['boisees'],
  'ÉPICÉ':   ['epicees'],
  'FLORAL':  ['florales'],
  'FRUITÉ':  ['fruitees'],
  'SUCRÉ':   ['gourmandes'],
  'VERT':    ['marines'],
};

const NOTES_DATA: Record<string, { id: NoteCategory, label: string, img: string, sub: string }[]> = {
  top: [
    { 
      id: "hesperides", 
      label: "Lumière du Matin", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXwYm46Mp9tr5luXGPCodZofYO4jN0XimA&s", 
      sub: "Fraîcheur & Légèreté" 
    },
    { 
      id: "marines", 
      label: "Souffle Marin", 
      img: "https://png.pngtree.com/thumb_back/fh260/background/20241101/pngtree-tranquil-underwater-landscape-featuring-colorful-rocks-surrounded-by-diverse-aquatic-flora-image_16484128.jpg", 
      sub: "Fraîcheur Océanique & Pure" 
    },
    { 
      id: "fruitees", 
      label: "Douceur Fruitée", 
      img: "https://static.vecteezy.com/system/resources/thumbnails/053/277/426/small/spring-fruit-scene-designed-to-integrate-seamlessly-with-your-text-or-graphics-photo.jpeg", 
      sub: "Léger & Pétillant" 
    }
  ],
  heart: [
    { 
      id: "florales", 
      label: "Jardin Secret", 
      img: "https://img.freepik.com/photos-premium/jardin-banc-fleurs-dans-herbe_1022944-31664.jpg", 
      sub: "Floral & Délicat" 
    },
    { 
      id: "epicees", 
      label: "Nuit Précieuse", 
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400", 
      sub: "Intense & Mystérieux" 
    },
    { 
      id: "musquees", 
      label: "Chaleur Dorée", 
      img: "https://png.pngtree.com/thumb_back/fh260/background/20241017/pngtree-heavenly-stairs-leading-to-the-golden-gates-of-heaven-image_16409825.jpg", 
      sub: "Ambré & Enveloppant" 
    }
  ],
  base: [
    { 
      id: "boisees", 
      label: "Bois Sacré", 
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400", 
      sub: "Chaleureux & Profond" 
    },
    { 
      id: "gourmandes", 
      label: "Secret Sucré", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS3Ep3wqjOI04sfMmjIifqwGl-xq6UjhTlZg&s", 
      sub: "Sensuel & Enveloppant" 
    }
  ]
};

const ATMOSPHERES = [
  { id: 'soir', label: 'Soirée de Gala', icon: <Moon size={24}/>, desc: "Intense & Magnétique", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400" },
  { id: 'quotidien', label: 'Signature Quotidienne', icon: <Sun size={24}/>, desc: "Léger & Lumineux", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400" },
  { id: 'business', label: 'Business & Influence', icon: <Briefcase size={24}/>, desc: "Assuré & Subtil", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400" },
  { id: 'rendezvous', label: 'Rendez-vous', icon: <Heart size={24}/>, desc: "Sensuel & Captivant", img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=400" },
];

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

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep]];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const frownOpacity = useTransform(x, [-120, 0], [1, 0.6]);
  const smileOpacity = useTransform(x, [0, 120], [0.6, 1]);

  // ── LOGIQUE RETOUR INTERNE ─────────────────────────────────────────────────
  useEffect(() => {
    setInternalBackHandler(() => {
      if (isAnalyzing) return true;
      if (screen === 'atmosphere') { setScreen('map'); return true; }
      if (screen === 'map') { setScreen('swipe'); setCurrentStep(0); setNoteIndex(0); return true; }
      return false;
    });
  }, [screen, isAnalyzing, setInternalBackHandler]);
  // ──────────────────────────────────────────────────────────────────────────

  const triggerTransition = (nextScreen: 'swipe' | 'map' | 'atmosphere', text: string) => {
    setAnalysisText(text);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setScreen(nextScreen);
    }, 4000);
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

  // Construit le dictionnaire radarIntensities { familyId: intensity } à passer à onValidate
  const buildRadarIntensities = (): Record<string, number> => {
    const result: Record<string, number> = {};
    FAMILIES.forEach((family, i) => {
      const families = RADAR_TO_FAMILY[family] || [];
      families.forEach(f => { result[f] = intensities[i]; });
    });
    return result;
  };

  const size = 300;
  const center = size / 2;
  const radius = size * 0.38;

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6 touch-none select-none overflow-hidden">
      <AnimatePresence mode="wait">

        {/* LOADER */}
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

          /* ÉCRAN SWIPE */
          <motion.div
            key="swipe-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm flex flex-col items-center relative"
          >
            <h2 className="text-xl font-light mb-8 italic uppercase tracking-widest text-zinc-400">
              Affinez vos désirs
            </h2>

            <div className="relative w-full mb-12" style={{ height: '520px' }}>

              {/* ICONES GAUCHE / DROITE */}
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
                  {/* Couche invisible de capture du drag */}
                  <div className="absolute inset-0 z-50 touch-none" />

                  {/* IMAGE — 55% */}
                  <div className="w-full flex-shrink-0 pointer-events-none" style={{ height: '55%' }}>
                    <img
                      src={currentNote.img}
                      draggable="false"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* TEXTE — 45% */}
                  <div className="w-full flex-1 px-5 py-4 text-center bg-white flex flex-col items-center justify-center gap-2 pointer-events-none">

                    {/* TITRE */}
                    <h3 className="text-lg font-semibold text-black uppercase tracking-tight leading-tight">
                      {currentNote.label}
                    </h3>

                    {/* SOUS-TITRE */}
                    <p className="text-amber-500 text-[11px] font-bold uppercase tracking-widest">
                      {currentNote.sub}
                    </p>

                    {/* SÉPARATEUR */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-[1px] w-10 bg-amber-400/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                      <div className="h-[1px] w-10 bg-amber-400/50" />
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

          /* ÉCRAN RADAR */
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center mb-10 text-center">
              <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-white">Architecture Olfactive</h2>
              <div className="w-12 h-[1px] bg-amber-500 my-4 opacity-50" />
              <p className="text-amber-500/80 text-[10px] font-bold uppercase tracking-[0.15em]">
                Modelez l'intensité de vos accords
              </p>
            </div>

            <div className="relative">
              <svg id="radar-svg" width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                  <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#222" />
                ))}
                {FAMILIES.map((_, i) => {
                  const p = getPointPos(i, 1);
                  return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#222" />;
                })}
                <polygon points={polygonPath} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                {points.map((p, i) => (
                  <motion.g key={i}>
                    <motion.circle
                      cx={p.x} cy={p.y} r="25"
                      fill="transparent"
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDrag={(_, info) => updateIntensity(i, info)}
                    />
                    <circle cx={p.x} cy={p.y} r="6" fill="#f59e0b" className="pointer-events-none shadow-xl" />
                  </motion.g>
                ))}
              </svg>
              {FAMILIES.map((f, i) => {
                const p = getPointPos(i, 1.28);
                return (
                  <div
                    key={i}
                    className="absolute text-[9px] font-black text-zinc-500 uppercase tracking-tighter"
                    style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
                  >
                    {f}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => triggerTransition('atmosphere', "Définition de l'environnement olfactif...")}
              className="mt-16 w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px]"
            >
              Finaliser le profil
            </button>
          </motion.div>

        ) : (

          /* ÉCRAN UNIVERS OLFACTIF */
          <motion.div
            key="atm"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center mb-10 text-center">
              <h2 className="text-3xl font-bold uppercase tracking-[0.35em] text-white">Univers Olfactif</h2>
              <div className="w-12 h-[1px] bg-amber-500 my-4 opacity-50" />
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Définissez le sillage de votre destinée
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full px-4">
              {ATMOSPHERES.map((atm) => (
                <button
                  key={atm.id}
                  onClick={() => onValidate(selections.top, selections.heart, selections.base, atm.id, buildRadarIntensities())}
                  className="group relative h-28 rounded-2xl border border-white/5 bg-zinc-900/40 overflow-hidden flex items-center p-6 hover:border-amber-500/50 transition-all text-left"
                >
                  <img src={atm.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative z-10 flex items-center gap-6 w-full">
                    <div className="p-4 bg-black/60 rounded-xl text-amber-500">{atm.icon}</div>
                    <div>
                      <h4 className="text-xl font-light">{atm.label}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-zinc-500">{atm.desc}</p>
                    </div>
                    <ArrowRight className="ml-auto text-zinc-700 group-hover:text-amber-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

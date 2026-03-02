import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Wind, Droplets, Sparkles, Smile, Frown, ArrowLeft, ArrowRight } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { NoteCategory } from "@/data/perfumes";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const NOTES_DATA = {
  top: [
    { id: "hesperides", label: "Orange", img: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400", sub: "Notes hespéridées" },
    { id: "marines", label: "Bord de Mer", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", sub: "Notes aquatiques" }
  ],
  heart: [
    { id: "florales", label: "Bouquet de Fleurs", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400", sub: "Notes florales" },
    { id: "fruitees", label: "Panier de Fruits", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400", sub: "Notes fruitées" }
  ],
  base: [
    { id: "boisees", label: "Forêt d'Automne", img: "https://images.unsplash.com/photo-1585675100414-add2e465a136?q=80&w=400", sub: "Notes boisées" },
    { id: "ambrees", label: "Vanille", img: "https://images.unsplash.com/photo-1595589949475-394e277c082b?q=80&w=400", sub: "Épices chaudes" }
  ]
};

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [screen, setScreen] = useState<'swipe' | 'map'>('swipe');
  const [currentStep, setCurrentStep] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [radarData, setRadarData] = useState([
    { subject: 'AGRUMES', A: 50, full: 100 },
    { subject: 'ANIMAL', A: 50, full: 100 },
    { subject: 'BOISÉ', A: 50, full: 100 },
    { subject: 'ÉPICÉ', A: 50, full: 100 },
    { subject: 'FLORAL', A: 50, full: 100 },
    { subject: 'FRUITÉ', A: 50, full: 100 },
    { subject: 'SUCRÉ', A: 50, full: 100 },
    { subject: 'VERT', A: 50, full: 100 },
  ]);

  const steps = ["top", "heart", "base"];
  const notesAvailable = NOTES_DATA[steps[currentStep] as keyof typeof NOTES_DATA];
  const currentNote = notesAvailable[noteIndex];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opRight = useTransform(x, [50, 150], [0, 1]);
  const opLeft = useTransform(x, [-150, -50], [1, 0]);

  // FIX DU CENTRAGE : Réinitialise X dès que la note change
  useLayoutEffect(() => {
    x.set(0);
  }, [noteIndex, currentStep, x]);

  const handleSwipe = (liked: boolean) => {
    if (noteIndex < notesAvailable.length - 1) {
      setNoteIndex(prev => prev + 1);
    } else if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      setNoteIndex(0);
    } else {
      setScreen('map');
    }
  };

  const handleRadarClick = (data: any) => {
    if (!data) return;
    const index = data.activeTooltipIndex;
    const newData = [...radarData];
    newData[index].A = newData[index].A >= 100 ? 20 : newData[index].A + 20;
    setRadarData(newData);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 px-6">
      <AnimatePresence mode="wait">
        {screen === 'swipe' ? (
          <motion.div key="sw" className="w-full max-w-sm flex flex-col items-center">
            <h2 className="text-xl font-light mb-8 italic uppercase tracking-widest text-zinc-400">Quelles odeurs vous transportent ?</h2>
            
            <div className="relative w-full aspect-[3/4] mb-12">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentNote.id}
                  style={{ x, rotate }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, i) => {
                    if (i.offset.x > 100) handleSwipe(true);
                    else if (i.offset.x < -100) handleSwipe(false);
                  }}
                  initial={{ opacity: 0, scale: 0.9, x: 0 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-xl overflow-hidden shadow-2xl"
                >
                  <img src={currentNote.img} className="w-full h-2/3 object-cover" />
                  <motion.div style={{ opacity: opRight }} className="absolute top-1/2 right-4 bg-emerald-400 p-3 rounded-full text-white z-20"><Smile size={32}/></motion.div>
                  <motion.div style={{ opacity: opLeft }} className="absolute top-1/2 left-4 bg-rose-400 p-3 rounded-full text-white z-20"><Frown size={32}/></motion.div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-medium text-black mb-2">{currentNote.label}</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Équivalent en parfumerie</p>
                    <p className="text-amber-600 text-sm font-light italic">{currentNote.sub}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-light mb-4 uppercase tracking-tighter">Votre profil olfactif</h2>
            
            <div className="w-full h-80 my-8">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData} onClick={handleRadarClick}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 10 }} />
                  <Radar name="Profil" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[10px] text-zinc-500 uppercase mb-10 tracking-widest text-center">Appuyez sur les axes pour ajuster</p>

            <button onClick={() => onValidate([],[],[])} className="w-full bg-white text-black py-4 rounded-none font-bold uppercase tracking-[0.3em] hover:bg-amber-500 transition-colors">
              Valider
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PyramidScreen;

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { NOTES_IMAGES } from "@/data/notesData";
import NoteZoomModal from "@/components/NoteZoomModal";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface NotesDiagnosticProps {
  onBack: () => void;
}

// Categories extracted from notesData.ts comment structure
const CATEGORIES: { label: string; keys: string[] }[] = [
  {
    label: "Hespéridés",
    keys: ["Bergamote", "Citron", "Orange", "Mandarine", "Pamplemousse", "Yuzu", "Verveine", "Néroli"],
  },
  {
    label: "Florales",
    keys: ["Rose", "Jasmin", "Tubéreuse", "Ylang-Ylang", "Fleur d'Oranger", "Géranium", "Pivoine", "Iris", "Violette", "Mimosa", "Lavande", "Fleur de Tabac"],
  },
  {
    label: "Épicées",
    keys: ["Poivre", "Poivre Rose", "Poivre de Sichuan", "Gingembre", "Cardamome", "Cannelle", "Clou de Girofle", "Muscade", "Safran", "Baies de Genièvre", "Épices"],
  },
  {
    label: "Aromatiques",
    keys: ["Menthe", "Basilic", "Romarin", "Thym", "Eucalyptus", "Sauge"],
  },
  {
    label: "Boisées",
    keys: ["Santal", "Cèdre", "Patchouli", "Vétiver", "Gaïac", "Oud", "Bouleau", "Palissandre"],
  },
  {
    label: "Ambrées & Résines",
    keys: ["Ambre", "Ambre gris", "Encens", "Myrrhe", "Benjoin", "Labdanum"],
  },
  {
    label: "Gourmandes",
    keys: ["Vanille", "Fève Tonka", "Tonka", "Caramel", "Chocolat", "Cacao", "Praliné", "Miel", "Café", "Coumarine"],
  },
  {
    label: "Fruitées",
    keys: ["Pomme", "Pomme verte", "Poire", "Bourgeon de Cassis", "Fraise", "Framboise", "Mûre", "Mangue", "Ananas", "Pêche", "Abricot"],
  },
  {
    label: "Marines / Aquatiques",
    keys: ["Iode", "Algues", "Lotus", "Concombre", "Calone", "Aldéhydes"],
  },
  {
    label: "Vertes",
    keys: ["Feuille de violette", "Herbe coupée", "Galbanum"],
  },
  {
    label: "Musquées & Cuirées",
    keys: ["Musc", "Musc blanc", "Cuir", "Civette", "Tabac"],
  },
  {
    label: "Mousses",
    keys: ["Mousse de Chêne"],
  },
];

const NoteCard = ({ name, url }: { name: string; url: string }) => {
  const [broken, setBroken] = useState(false);

  return (
    <motion.div variants={staggerItem} className="flex flex-col items-center gap-2">
      <div
        className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-lg ${
          broken ? "border-red-500 shadow-red-500/30" : "border-primary/50 shadow-primary/20"
        }`}
      >
        <img
          src={url}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={() => setBroken(true)}
        />
      </div>
      <span className="text-[10px] font-body tracking-wider text-center text-foreground/80 max-w-[5rem] leading-tight">
        {name}
      </span>
      {broken && (
        <span className="text-[8px] font-body uppercase tracking-widest text-red-400">Cassée</span>
      )}
    </motion.div>
  );
};

const NotesDiagnostic = ({ onBack }: NotesDiagnosticProps) => {
  const totalNotes = Object.keys(NOTES_IMAGES).length;

  return (
    <div className="min-h-screen w-screen flex flex-col bg-background overflow-y-auto relative p-6 lg:p-8 pb-40 gold-frame">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(43 72% 52% / 0.04) 0%, transparent 60%)" }} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-primary/30 bg-black/40 backdrop-blur-xl flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
        >
          <ArrowLeft size={18} />
        </motion.button>
        <div>
          <h2 className="font-display text-2xl lg:text-3xl text-gold-gradient tracking-wider">
            Diagnostic Notes
          </h2>
          <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground mt-1">
            {totalNotes} notes référencées — images cassées en rouge
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-10 relative z-20 max-w-7xl mx-auto w-full">
        {CATEGORIES.map((cat) => (
          <motion.section
            key={cat.label}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <h3 className="font-display text-lg text-primary tracking-wider mb-1">{cat.label}</h3>
            <div className="gold-divider w-20 mb-4" />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-5"
            >
              {cat.keys.map((key) => (
                <NoteCard
                  key={key}
                  name={key}
                  url={NOTES_IMAGES[key] || ""}
                />
              ))}
            </motion.div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default NotesDiagnostic;

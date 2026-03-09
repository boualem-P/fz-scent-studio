import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { NOTES_IMAGES, getNoteImage } from "@/data/notesData";
import NoteZoomModal from "@/components/NoteZoomModal";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface NotesDiagnosticProps {
  onBack: () => void;
}

/**
 * Catégories dérivées dynamiquement : chaque catégorie définit un test
 * d'appartenance. Toute clé de NOTES_IMAGES non classée tombe dans "Autres".
 */
const CATEGORY_RULES: { label: string; test: (key: string) => boolean }[] = [
  {
    label: "Hespéridés",
    test: (k) =>
      /bergamote|citron|orange|mandarine|pamplemousse|yuzu|verveine|néroli|bigarade/i.test(k),
  },
  {
    label: "Florales",
    test: (k) =>
      /rose|absolu de rose|jasmin|tubéreuse|ylang|fleur d'oranger|géranium|pivoine|iris|violette|mimosa|lavande|fleur de tabac|pétales|héliotrope/i.test(k),
  },
  {
    label: "Épicées",
    test: (k) =>
      /poivre|gingembre|cardamome|cannelle|clou de girofle|muscade|safran|baies de genièvre|épices|carvi|coriandre|baies roses/i.test(k),
  },
  {
    label: "Aromatiques",
    test: (k) => /menthe|basilic|romarin|thym|eucalyptus|sauge/i.test(k),
  },
  {
    label: "Boisées",
    test: (k) =>
      /santal|cèdre|patchouli|vétiver|gaïac|oud|bouleau|palissandre|bois de cachemire|bois ambrés/i.test(k),
  },
  {
    label: "Ambrées & Résines",
    test: (k) =>
      /ambre|encens|myrrhe|benjoin|labdanum|ciste|opoponax|styrax/i.test(k),
  },
  {
    label: "Gourmandes",
    test: (k) =>
      /vanille|fève tonka|tonka|caramel|chocolat|cacao|praliné|miel|café|coumarine|infusion de vanille|sucre roux/i.test(k),
  },
  {
    label: "Fruitées",
    test: (k) =>
      /pomme|poire|cassis|fraise|framboise|mûre|mangue|ananas|pêche|abricot|nectar|lait de coco/i.test(k),
  },
  {
    label: "Marines / Aquatiques",
    test: (k) =>
      /iode|marine|marin|algues|lotus|concombre|calone|aldéhydes/i.test(k),
  },
  {
    label: "Vertes",
    test: (k) => /feuille de violette|herbe coupée|galbanum|notes vertes/i.test(k),
  },
  {
    label: "Musquées & Cuirées",
    test: (k) => /musc|cuir|civette|tabac|notes poudrées/i.test(k),
  },
  {
    label: "Mousses",
    test: (k) => /mousse/i.test(k),
  },
];

function buildDynamicCategories(): { label: string; keys: string[] }[] {
  const allKeys = Object.keys(NOTES_IMAGES);
  const assigned = new Set<string>();
  const result: { label: string; keys: string[] }[] = [];

  for (const rule of CATEGORY_RULES) {
    const matched = allKeys.filter((k) => !assigned.has(k) && rule.test(k));
    if (matched.length > 0) {
      result.push({ label: rule.label, keys: matched });
      matched.forEach((k) => assigned.add(k));
    }
  }

  // Catch-all for uncategorized notes
  const remaining = allKeys.filter((k) => !assigned.has(k));
  if (remaining.length > 0) {
    result.push({ label: "Autres", keys: remaining });
  }

  return result;
}

const CATEGORIES = buildDynamicCategories();

const NoteCard = ({ name, url, onZoom }: { name: string; url: string; onZoom: () => void }) => {
  const [broken, setBroken] = useState(false);

  return (
    <motion.div variants={staggerItem} className="flex flex-col items-center gap-2 cursor-pointer" onClick={onZoom}>
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
  const [zoomedNote, setZoomedNote] = useState<{ name: string; image: string } | null>(null);

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
                  url={getNoteImage(key)}
                  onZoom={() => setZoomedNote({ name: key, image: getNoteImage(key) })}
                />
              ))}
            </motion.div>
          </motion.section>
        ))}
      </div>

      {/* Zoom Modal */}
      <NoteZoomModal
        noteName={zoomedNote?.name ?? null}
        noteImage={zoomedNote?.image ?? ""}
        onClose={() => setZoomedNote(null)}
      />
    </div>
  );
};

export default NotesDiagnostic;

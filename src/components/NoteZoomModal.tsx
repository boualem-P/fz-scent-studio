import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NoteZoomModalProps {
  noteName: string | null;
  noteImage: string;
  category?: string;
  onClose: () => void;
}

const POETIC: Record<string, string> = {
  // Hespéridés
  Bergamote: "Note de Tête — Fraîcheur Citronnée",
  Citron: "Note de Tête — Éclat Solaire",
  Orange: "Note de Tête — Douceur Fruitée",
  Mandarine: "Note de Tête — Zeste Pétillant",
  Pamplemousse: "Note de Tête — Vivacité Amère",
  Yuzu: "Note de Tête — Brise Japonaise",
  Verveine: "Note de Tête — Herbe Citronnée",
  Néroli: "Note de Tête — Fleur d'Oranger",
  // Florales
  Rose: "Note de Cœur — Reine des Fleurs",
  Jasmin: "Note de Cœur — Nuit Envoûtante",
  Tubéreuse: "Note de Cœur — Ivresse Blanche",
  "Ylang-Ylang": "Note de Cœur — Exotisme Voluptueux",
  "Fleur d'Oranger": "Note de Cœur — Douceur Nuptiale",
  Iris: "Note de Cœur — Poudre Noble",
  Pivoine: "Note de Cœur — Fraîcheur Rosée",
  Violette: "Note de Cœur — Mélancolie Douce",
  Lavande: "Note de Tête — Souffle Provençal",
  // Boisées
  Santal: "Note de Fond — Bois Crémeux",
  Cèdre: "Note de Fond — Élégance Sèche",
  Patchouli: "Note de Fond — Terre Mystique",
  Vétiver: "Note de Fond — Racine Fumée",
  Oud: "Note de Fond — Or Noir du Désert",
  // Ambrées
  Ambre: "Note de Fond — Chaleur Éternelle",
  Encens: "Note de Fond — Spiritualité Sacrée",
  Myrrhe: "Note de Fond — Résine Antique",
  // Gourmandes
  Vanille: "Note de Fond — Douceur Absolue",
  "Fève Tonka": "Note de Fond — Amande Gourmande",
  Caramel: "Note de Fond — Sucre Brûlé",
  Chocolat: "Note de Fond — Cacao Intense",
  Café: "Note de Cœur — Torréfaction Noble",
  // Musquées
  Musc: "Note de Fond — Peau Seconde",
  Cuir: "Note de Fond — Noblesse Brute",
};

const NoteZoomModal = ({ noteName, noteImage, category, onClose }: NoteZoomModalProps) => {
  if (!noteName) return null;

  const description = category || POETIC[noteName] || "Note Olfactive";

  return (
    <AnimatePresence>
      {noteName && (
        <motion.div
          key="note-zoom-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Glassmorphism backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

          {/* Content */}
          <motion.div
            key="note-zoom-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute -top-2 -right-2 z-20 w-10 h-10 rounded-full border border-primary/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              aria-label="Fermer"
            >
              <X size={18} />
            </motion.button>

            {/* Image container */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-primary/60 shadow-[0_0_40px_hsl(43_72%_52%/0.25),0_0_80px_hsl(43_72%_52%/0.1)]">
              <img
                src={noteImage}
                alt={noteName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80";
                }}
              />
            </div>

            {/* Name */}
            <h3 className="font-display text-2xl sm:text-3xl text-gold-gradient tracking-wider text-center">
              {noteName}
            </h3>

            {/* Poetic description */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-body text-center">
              {description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteZoomModal;

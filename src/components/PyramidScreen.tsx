import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flower2, CheckCircle, Citrus, Wind, Waves, Flame, Apple, Cherry, Leaf, TreePine, Gem, Cookie, Heart, Sprout, type LucideIcon } from "lucide-react";
import { NoteCategory } from "@/data/perfumes";
import {
  IngredientGroup,
  TOP_INGREDIENTS,
  HEART_INGREDIENTS,
  BASE_INGREDIENTS,
} from "@/data/ingredients";
import { staggerContainer, staggerItem, springHover, springTap, luxuryEase } from "@/lib/animations";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

const IngredientChip = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    variants={staggerItem}
    whileHover={springHover}
    whileTap={springTap}
    onClick={onClick}
    className={`px-2.5 py-1 rounded-sm font-body text-[11px] tracking-wide transition-all duration-300 border leading-tight
      ${
        selected
          ? "bg-primary/15 border-primary/70 text-primary gold-glow-strong"
          : "bg-secondary/30 border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary/70"
      }`}
  >
    {label}
  </motion.button>
);

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "hesperides": Citrus,
  "aromatiques": Wind,
  "marines": Waves,
  "epices-fraiches": Flame,
  "fruits-legers": Apple,
  "florales": Flower2,
  "fruitees": Cherry,
  "epices-chaudes": Flame,
  "notes-vertes": Leaf,
  "boisees": TreePine,
  "ambrees": Gem,
  "gourmandes": Cookie,
  "musquees": Heart,
  "mousses": Sprout,
};

const GroupSection = ({
  group,
  selectedIngredients,
  onToggle,
}: {
  group: IngredientGroup;
  selectedIngredients: Set<string>;
  onToggle: (ingredient: string, category: NoteCategory) => void;
}) => {
  const CategoryIcon = CATEGORY_ICONS[group.category] || Sparkles;
  return (
    <div className="mb-2.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        <CategoryIcon className="w-3.5 h-3.5 text-primary" />
        <p className="text-[10px] font-body tracking-[0.15em] uppercase text-primary/60">
          {group.label}
        </p>
      </div>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-wrap gap-1.5">
        {group.ingredients.map((ingredient) => (
          <IngredientChip
            key={ingredient}
            label={ingredient}
            selected={selectedIngredients.has(ingredient)}
            onClick={() => onToggle(ingredient, group.category)}
          />
        ))}
      </motion.div>
    </div>
  );
};

const SectionTitle = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-2.5 mb-3">
    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
    <div>
      <h3 className="font-display text-base text-primary tracking-wider">{title}</h3>
      <p className="text-[9px] text-muted-foreground tracking-widest uppercase">{subtitle}</p>
    </div>
  </div>
);

const PyramidScreen = ({ onValidate, onMenu }: PyramidScreenProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [ingredientCategories, setIngredientCategories] = useState<Map<string, NoteCategory>>(new Map());

  const toggleIngredient = useCallback((ingredient: string, category: NoteCategory) => {
    setSelectedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(ingredient)) next.delete(ingredient);
      else next.add(ingredient);
      return next;
    });
    setIngredientCategories((prev) => {
      const next = new Map(prev);
      if (next.has(ingredient)) next.delete(ingredient);
      else next.set(ingredient, category);
      return next;
    });
  }, []);

  const handleValidate = () => {
    const topCategories = new Set<NoteCategory>();
    const heartCategories = new Set<NoteCategory>();
    const baseCategories = new Set<NoteCategory>();

    const topCats = new Set(TOP_INGREDIENTS.map((g) => g.category));
    const heartCats = new Set(HEART_INGREDIENTS.map((g) => g.category));
    const baseCats = new Set(BASE_INGREDIENTS.map((g) => g.category));

    ingredientCategories.forEach((cat) => {
      if (topCats.has(cat)) topCategories.add(cat);
      else if (heartCats.has(cat)) heartCategories.add(cat);
      else if (baseCats.has(cat)) baseCategories.add(cat);
    });

    onValidate(
      Array.from(topCategories),
      Array.from(heartCategories),
      Array.from(baseCategories)
    );
  };

  const hasSelection = selectedIngredients.size > 0;

  return (
    <div className="min-h-screen w-screen flex flex-col bg-background overflow-y-auto relative p-6 lg:p-8 pb-40 gold-frame">
      {/* Subtle gold radial gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 30%, hsl(43 72% 52% / 0.04) 0%, transparent 60%)"
      }} />

      {/* Background pyramid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
        <div className="w-0 h-0 border-l-[250px] border-r-[250px] border-b-[400px] border-l-transparent border-r-transparent border-b-primary" />
      </div>

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center mb-4 relative z-20"
      >
        <motion.h2 variants={staggerItem} className="font-display text-2xl lg:text-3xl text-gold-gradient tracking-wider">
          Pyramide Olfactive
        </motion.h2>
        <motion.div variants={staggerItem} className="gold-divider w-28 mx-auto mt-2" />
      </motion.div>

      {/* Three columns */}
      <div className="flex-1 grid grid-cols-3 gap-6 max-w-7xl mx-auto w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase, delay: 0.2 }}
          className="flex flex-col"
        >
          <SectionTitle icon={Sparkles} title="Notes de Tête" subtitle="The Spark" />
          {TOP_INGREDIENTS.map((group) => (
            <GroupSection key={group.category} group={group} selectedIngredients={selectedIngredients} onToggle={toggleIngredient} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase, delay: 0.35 }}
          className="flex flex-col"
        >
          <SectionTitle icon={Flower2} title="Notes de Cœur" subtitle="The Soul" />
          {HEART_INGREDIENTS.map((group) => (
            <GroupSection key={group.category} group={group} selectedIngredients={selectedIngredients} onToggle={toggleIngredient} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase, delay: 0.5 }}
          className="flex flex-col"
        >
          <SectionTitle icon={CheckCircle} title="Notes de Fond" subtitle="The Sillage" />
          {BASE_INGREDIENTS.map((group) => (
            <GroupSection key={group.category} group={group} selectedIngredients={selectedIngredients} onToggle={toggleIngredient} />
          ))}
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center mt-8 relative z-20"
      >
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onMenu}
          className="px-8 py-3 font-display text-sm tracking-[0.2em] uppercase
            border border-primary/40 text-primary
            hover:border-primary/60 hover:bg-primary/10
            transition-colors duration-300 gold-border-glow"
        >
          Menu
        </motion.button>

        <AnimatePresence>
          {hasSelection && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={springHover}
              whileTap={springTap}
              onClick={handleValidate}
              className="px-16 py-4 font-display text-lg tracking-[0.3em] uppercase
                bg-primary/15 border border-primary/60 text-primary
                hover:bg-primary hover:text-primary-foreground
                transition-all duration-300 gold-glow card-shimmer-effect"
            >
              Valider
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PyramidScreen;

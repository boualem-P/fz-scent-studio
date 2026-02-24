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
import { getIngredientImage } from "@/data/olfactory-visuals";
import { staggerContainer, staggerItem, springHover, springTap, luxuryEase } from "@/lib/animations";

interface PyramidScreenProps {
  onValidate: (top: NoteCategory[], heart: NoteCategory[], base: NoteCategory[]) => void;
  onMenu: () => void;
}

/* ===================== */
/*   INGREDIENT CHIP     */
/* ===================== */

const IngredientChip = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  const imgUrl = getIngredientImage(label);

  return (
    <motion.button
      variants={staggerItem}
      whileHover={springHover}
      whileTap={springTap}
      onClick={onClick}
      className={`relative overflow-hidden rounded-sm border transition-all duration-300 w-[72px] h-[72px] flex flex-col items-center justify-end p-1 group
        ${
          selected
            ? "border-primary/70 gold-glow-strong"
            : "border-primary/20 hover:border-primary/40"
        }`}
    >
      {/* Background image */}
      <img
        src={imgUrl}
        alt={label}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ingredient-img ${!selected ? "ingredient-img-idle" : ""}`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 ingredient-overlay" />
      {/* Label */}
      <span className="relative z-10 text-[8px] font-body font-semibold tracking-wide text-white text-center leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </motion.button>
  );
};

/* ===================== */
/*   CATEGORY ICONS      */
/* ===================== */

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

/* ===================== */
/*   GROUP SECTION       */
/* ===================== */

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
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-2">
        <CategoryIcon className="w-4 h-4 text-[#F9F3B5]" />
        <p className="text-sm font-display tracking-wide underline decoration-[#F9F3B5] text-[#F9F3B5]">
          {group.label}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-2"
      >
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

/* ===================== */
/*   SECTION TITLE       */
/* ===================== */

const SectionTitle = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-2.5 mb-4">
    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
    <div>
      <h3 className="font-display text-base text-primary tracking-wider">{title}</h3>
      <p className="text-[9px] text-muted-foreground tracking-widest uppercase">{subtitle}</p>
    </div>
  </div>
);

/* ===================== */
/*   MAIN COMPONENT      */
/* ===================== */

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

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center mb-6 relative z-20"
      >
        <motion.h2 variants={staggerItem} className="font-display text-2xl lg:text-3xl text-gold-gradient tracking-wider">
          Pyramide Olfactive
        </motion.h2>
        <motion.div variants={staggerItem} className="gold-divider w-28 mx-auto mt-2" />
      </motion.div>

      <div className="flex-1 grid grid-cols-3 gap-6 max-w-7xl mx-auto w-full relative z-20">

        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: luxuryEase, delay: 0.2 }}>
          <SectionTitle icon={Sparkles} title="Notes de Tête" subtitle="The Spark" />
          {TOP_INGREDIENTS.map((group) => (
            <GroupSection key={group.category} group={group} selectedIngredients={selectedIngredients} onToggle={toggleIngredient} />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: luxuryEase, delay: 0.35 }}>
          <SectionTitle icon={Flower2} title="Notes de Cœur" subtitle="The Soul" />
          {HEART_INGREDIENTS.map((group) => (
            <GroupSection key={group.category} group={group} selectedIngredients={selectedIngredients} onToggle={toggleIngredient} />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: luxuryEase, delay: 0.5 }}>
          <SectionTitle icon={CheckCircle} title="Notes de Fond" subtitle="The Sillage" />
          {BASE_INGREDIENTS.map((group) => (
            <GroupSection key={group.category} group={group} selectedIngredients={selectedIngredients} onToggle={toggleIngredient} />
          ))}
        </motion.div>
      </div>

      <motion.div className="flex justify-between items-center mt-10 relative z-20">
        <motion.button
          whileHover={springHover}
          whileTap={springTap}
          onClick={onMenu}
          className="px-8 py-3 font-display text-sm tracking-[0.2em] uppercase border border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/10 transition-colors duration-300 gold-border-glow"
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
              className="px-16 py-4 font-display text-lg tracking-[0.3em] uppercase bg-primary/15 border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 gold-glow card-shimmer-effect"
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

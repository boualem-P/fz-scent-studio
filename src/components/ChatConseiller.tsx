import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { PERFUMES } from "@/data/perfumes";
import expert from "@/data/perfumeExpertRules";
import type { Perfume } from "@/data/database";

/* ─── Types ─────────────────────────────────────────────── */
interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
  perfume?: Perfume;
  perfume2?: Perfume;
  suggestions?: string[];
}

interface SessionMemory {
  preferences: Set<string>;
  lastPerfumeId?: string;
  askedTags: Set<string>;
}

interface PersistentMemory {
  preferences: string[];
  lastVisit: string;
  totalVisits: number;
  favoriteTags: string[];
}

interface PerfumeProfile {
  accords: string[];
  tags: string[];
  sweetnessLevel: number;
  freshnessLevel: number;
  intensityLevel: number;
  woodyLevel: number;
  spicyLevel: number;
  floralLevel: number;
}

/* ─── Sofia's personality ───────────────────────────────── */
const PERSONALITY_INTROS: string[] = [
  "Oh, quelle belle recherche ! Laisse-moi te guider…",
  "Mmm, j'adore cette idée ! Voici ce que je te propose…",
  "Tu as du goût, je le sens déjà ! Écoute ça…",
  "Laisse-moi te confier un secret olfactif…",
  "C'est fascinant ce que tu cherches ! J'ai exactement ce qu'il te faut…",
  "Oh, ce choix me touche… Voici ma recommandation…",
  "J'ai une pépite pour toi, tu vas adorer…",
  "Intéressant… Je vois très bien le profil que tu recherches…",
  "Ah, tu me parles dans ma langue ! Voici mon coup de cœur…",
  "Je sens que tu vas craquer pour celui-ci…",
  "Quelle magnifique quête olfactive ! Découvre ceci…",
  "Mon intuition me dit que tu vas aimer ce que je vais te montrer…",
  "Oh là là, j'ai la fragrance parfaite en tête pour toi…",
];

const PERSONALITY_TRANSITIONS: string[] = [
  "Et voici pourquoi il est spécial :",
  "Ce qui le rend unique :",
  "Laisse-moi te décrire ses atouts :",
  "Ses notes racontent une histoire magnifique :",
  "Ce parfum, c'est une vraie émotion :",
  "Voici ce qui en fait une pièce d'exception :",
  "Son caractère en quelques mots :",
  "Ce qui me fascine chez lui :",
  "Tu vas comprendre pourquoi je l'adore :",
  "Son secret ? Le voici :",
  "Plonge dans son univers :",
];

const SOFIA_FALLBACK_INTROS: string[] = [
  "Hmm, dis-moi en plus ! En attendant, laisse-moi te faire découvrir…",
  "Je n'ai pas tout compris, mais mon instinct me souffle ceci…",
  "Surprise olfactive ! Voici une découverte que j'aime particulièrement…",
  "Laisse-moi te proposer quelque chose d'inattendu…",
];

const SOMMELIER_QUESTIONS: string[] = [
  "Pour quel moment de la journée cherches-tu ? ☀️ Jour ou 🌙 Soir ?",
  "Tu préfères quelque chose de frais et léger, ou de chaud et enveloppant ?",
  "Plutôt intense et affirmé, ou discret et subtil ?",
];

const WELCOME_BACK_TEMPLATES: string[] = [
  "Bon retour ! Je me souviens que tu aimes les fragrances {pref}… On continue l'exploration ?",
  "Ravie de te revoir ! La dernière fois, tu penchais vers du {pref}… Envie de quelque chose de similaire ?",
  "Te revoilà ! Tu as un faible pour le {pref}, si je me souviens bien… On approfondit ?",
];

/* ─── Thinking phrases ──────────────────────────────────── */
const THINKING_PHRASES = [
  "Sofia réfléchit…",
  "Analyse olfactive en cours…",
  "Je consulte ma mémoire parfumée…",
  "Exploration de la collection…",
  "Je cherche la perle rare…",
  "Un instant, je compose…",
  "Laisse-moi sentir…",
];

/* ─── Welcome ───────────────────────────────────────────── */
const WELCOME_MSG: ChatMessage = {
  id: 0,
  role: "ai",
  text: "Bienvenue ! Je suis Sofia, ta conseillère parfum ✨\nDis-moi ce que tu recherches : une occasion, une saison, une ambiance… Je te guiderai vers le parfum idéal.",
  suggestions: ["Parfum pour une soirée", "Parfum viril pour homme", "Parfum sensuel pour femme", "Surprise moi"],
};

/* ─── Starter prompts ───────────────────────────────────── */
const STARTER_PROMPTS = [
  "Parfum pour une soirée",
  "Parfum été homme",
  "Parfum séduisant",
];

/* ─── App guide detection ───────────────────────────────── */
const APP_GUIDE_PATTERNS: { test: RegExp; response: string }[] = [
  {
    test: /comment\s*(ça|ca)\s*marche|fonctionn|utiliser|expliqu/i,
    response:
      "L'application te guide en 4 étapes élégantes :\n\n1️⃣ **Profil** — Choisis ton univers\n2️⃣ **Budget** — Définis ta fourchette\n3️⃣ **Humeur** — Partage ton état d'esprit\n4️⃣ **Exploration** — Découvre tes fragrances idéales par swipe\n\nChaque choix affine les recommandations pour te proposer le parfum parfait !",
  },
  {
    test: /c.est quoi\s*(les\s*)?carte|swipe|glisser/i,
    response:
      "Les cartes te présentent différentes familles olfactives 🌿\n\nGlisse à **droite** pour dire « j'aime », à **gauche** pour passer. L'algorithme analyse tes préférences et compose ton profil olfactif unique.",
  },
  {
    test: /comment\s*choisir|quel\s*parfum|aide|conseill?e/i,
    response:
      "Deux options s'offrent à toi :\n\n✨ **Le parcours guidé** — Suis les étapes depuis l'accueil\n💬 **Ce chat** — Décris simplement ce que tu cherches !\n\nN'hésite pas à me préciser une occasion, une saison ou une ambiance !",
  },
  {
    test: /à\s*quoi\s*sert|pourquoi|but|objectif/i,
    response:
      "Cette application est ton **conseiller parfum personnel** 🌸\n\nElle analyse tes goûts, ton humeur et l'occasion pour te recommander la fragrance idéale. Aucune expertise requise — laisse-toi guider !",
  },
  {
    test: /humeur|mood|étape|profil/i,
    response:
      "L'écran d'humeur pose 3 questions rapides :\n\n• Ton énergie du moment\n• Ton intention (séduire, impressionner…)\n• Le contexte (soirée, journée…)\n\nCes réponses affinent les suggestions pour qu'elles correspondent à ton état d'esprit.",
  },
];

/* ─── Olfactory profile engine ──────────────────────────── */
const SWEET_KEYWORDS = ["vanille", "tonka", "caramel", "miel", "chocolat", "praliné", "ambre", "benzoin", "gourmand", "sucrée", "pêche", "fraise", "framboise", "mangue", "abricot", "pomme", "poire", "cerise", "fruit"];
const FRESH_KEYWORDS = ["citron", "bergamote", "orange", "agrume", "pamplemousse", "mandarine", "yuzu", "marine", "aquatique", "fraîch", "menthe", "concombre", "thé vert", "gingembre", "calone", "verveine", "eau", "ozoni"];
const WOODY_KEYWORDS = ["cèdre", "santal", "vétiver", "patchouli", "bois", "oud", "chêne", "gaïac", "pin", "cyprès", "acajou"];
const SPICY_KEYWORDS = ["poivre", "cannelle", "safran", "clou", "muscade", "cardamome", "cumin", "épic"];
const FLORAL_KEYWORDS = ["rose", "jasmin", "fleur", "iris", "néroli", "violette", "tubéreuse", "ylang", "pivoine", "muguet", "oranger", "lavande", "magnolia", "gardénia", "lilas", "mimosa", "géranium"];

function computeLevel(notes: string[], keywords: string[]): number {
  const joined = notes.join(" ").toLowerCase();
  let hits = 0;
  for (const kw of keywords) {
    if (joined.includes(kw)) hits++;
  }
  return Math.min(hits / 3, 1);
}

const profileCache = new Map<string, PerfumeProfile>();

function getPerfumeProfile(perfume: Perfume): PerfumeProfile {
  const cached = profileCache.get(perfume.id);
  if (cached) return cached;

  const allNotes = [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes];

  const sweetnessLevel = computeLevel(allNotes, SWEET_KEYWORDS);
  const freshnessLevel = computeLevel(allNotes, FRESH_KEYWORDS);
  const woodyLevel = computeLevel(allNotes, WOODY_KEYWORDS);
  const spicyLevel = computeLevel(allNotes, SPICY_KEYWORDS);
  const floralLevel = computeLevel(allNotes, FLORAL_KEYWORDS);

  const sillageMap: Record<string, number> = { "discret": 0.2, "modéré": 0.4, "fort": 0.7, "très fort": 0.85, "énorme": 1.0 };
  const intensityLevel = sillageMap[perfume.sillage] ?? 0.5;

  const accords: string[] = [];
  const tags: string[] = [];

  if (sweetnessLevel > 0.3) { accords.push("sucré"); tags.push("gourmand"); }
  if (freshnessLevel > 0.3) { accords.push("frais"); tags.push("frais"); }
  if (woodyLevel > 0.3) { accords.push("boisé"); tags.push("boisé"); }
  if (spicyLevel > 0.3) { accords.push("épicé"); tags.push("épicé"); }
  if (floralLevel > 0.3) { accords.push("floral"); tags.push("floral"); }
  if (intensityLevel >= 0.7) tags.push("intense");
  if (intensityLevel <= 0.3) tags.push("léger");

  const profile: PerfumeProfile = { accords, tags, sweetnessLevel, freshnessLevel, intensityLevel, woodyLevel, spicyLevel, floralLevel };
  profileCache.set(perfume.id, profile);
  return profile;
}

function getAccordLabel(profile: PerfumeProfile): string {
  const levels: [string, number][] = [
    ["sucré vanillé", profile.sweetnessLevel],
    ["frais agrumé", profile.freshnessLevel],
    ["boisé profond", profile.woodyLevel],
    ["épicé chaleureux", profile.spicyLevel],
    ["floral élégant", profile.floralLevel],
  ];
  levels.sort((a, b) => b[1] - a[1]);
  const top = levels.filter(l => l[1] > 0.2).slice(0, 2);
  if (top.length === 0) return "équilibré";
  return top.map(l => l[0]).join(", ");
}

function getVibeLabel(profile: PerfumeProfile): string {
  const vibes: string[] = [];
  if (profile.sweetnessLevel > 0.5) vibes.push("enveloppant");
  if (profile.freshnessLevel > 0.5) vibes.push("vivifiant");
  if (profile.woodyLevel > 0.5) vibes.push("profond");
  if (profile.spicyLevel > 0.5) vibes.push("charismatique");
  if (profile.floralLevel > 0.5) vibes.push("délicat");
  if (profile.intensityLevel >= 0.7) vibes.push("puissant");
  if (profile.intensityLevel <= 0.3) vibes.push("subtil");
  return vibes.length > 0 ? vibes.slice(0, 3).join(", ") : "harmonieux";
}

/* ─── Keyword filters ───────────────────────────────────── */
interface KeywordRule {
  test: RegExp;
  filter: (p: Perfume, prof: PerfumeProfile) => boolean;
  tag: string;
  prefTag: string;
  weight: number;
}

const KEYWORD_RULES: KeywordRule[] = [
  { test: /soir[ée]e|nuit|gala|sortir/i, filter: (p, prof) => prof.intensityLevel >= 0.6 && (p.seasonData.winter > 50 || p.seasonData.autumn > 50), tag: "soirée", prefTag: "intense", weight: 1.5 },
  { test: /intense|puissant|fort/i, filter: (_p, prof) => prof.intensityLevel >= 0.6, tag: "intense", prefTag: "intense", weight: 1.3 },
  { test: /sucr[ée]|vanill[ée]|gourmand|doux|caramel|tonka|chocolat/i, filter: (_p, prof) => prof.sweetnessLevel > 0.3, tag: "sucré", prefTag: "sucré", weight: 1.4 },
  { test: /frais|fraîch|léger|légère|citron|agrume|aquatique/i, filter: (_p, prof) => prof.freshnessLevel > 0.3, tag: "frais", prefTag: "frais", weight: 1.4 },
  { test: /bois[ée]|cèdre|santal|vétiver|patchouli|oud/i, filter: (_p, prof) => prof.woodyLevel > 0.3, tag: "boisé", prefTag: "boisé", weight: 1.3 },
  { test: /épic[ée]|poivre|cannelle|safran|muscade/i, filter: (_p, prof) => prof.spicyLevel > 0.3, tag: "épicé", prefTag: "épicé", weight: 1.3 },
  { test: /floral|fleur|rose|jasmin|iris|tubéreuse/i, filter: (_p, prof) => prof.floralLevel > 0.3, tag: "floral", prefTag: "floral", weight: 1.3 },
  { test: /sédu|romantique|rendez|charm/i, filter: (_p, prof) => prof.intensityLevel >= 0.4 && (prof.sweetnessLevel > 0.2 || prof.floralLevel > 0.2), tag: "séduction", prefTag: "séduisant", weight: 1.2 },
  { test: /hiver|froid|chaud|ambre/i, filter: (p) => p.seasonData.winter >= 60, tag: "hiver", prefTag: "chaud", weight: 1.2 },
  { test: /été|soleil|plage/i, filter: (p) => p.seasonData.summer >= 60, tag: "été", prefTag: "frais", weight: 1.2 },
  { test: /printemps/i, filter: (p) => p.seasonData.spring >= 60, tag: "printemps", prefTag: "floral", weight: 1.1 },
  { test: /automne|cuir|feuille/i, filter: (p) => p.seasonData.autumn >= 60, tag: "automne", prefTag: "boisé", weight: 1.1 },
  { test: /travail|bureau|discret|jour|quotidien/i, filter: (_p, prof) => prof.intensityLevel <= 0.4, tag: "quotidien", prefTag: "discret", weight: 1.2 },
  { test: /homme|masculin|viril/i, filter: (p) => p.gender === "homme" || p.gender === "unisexe", tag: "masculin", prefTag: "masculin", weight: 1.0 },
  { test: /femme|féminin|elle/i, filter: (p) => p.gender === "femme" || p.gender === "unisexe", tag: "féminin", prefTag: "féminin", weight: 1.0 },
  { test: /unisexe|mixte|neutre|non.?gen/i, filter: (p) => p.gender === "unisexe", tag: "unisexe", prefTag: "unisexe", weight: 1.0 },
];

/* ─── Olfactory profile helper ──────────────────────────── */
function getOlfactoryProfile(p: Perfume): string {
  const allNotes = [...p.topNotes.slice(0, 2), ...p.heartNotes.slice(0, 1), ...p.baseNotes.slice(0, 1)];
  return allNotes.join(", ");
}

/* ─── Suggestions based on context ──────────────────────── */
function getSuggestions(tags: string[], memory: SessionMemory): string[] {
  const pool: string[] = [];
  if (!tags.includes("intense") && !memory.askedTags.has("intense")) pool.push("Plus intense");
  if (!tags.includes("discret") && !memory.askedTags.has("discret")) pool.push("Plus discret");
  if (!tags.includes("frais") && !memory.askedTags.has("frais")) pool.push("Quelque chose de frais");
  if (!tags.includes("sucré") && !memory.askedTags.has("sucré")) pool.push("Plus sucré");
  if (!tags.includes("boisé") && !memory.askedTags.has("boisé")) pool.push("Plus boisé");
  if (!tags.includes("chaud") && !memory.askedTags.has("hiver")) pool.push("Pour l'hiver");
  if (!tags.includes("floral") && !memory.askedTags.has("floral")) pool.push("Plus floral");
  if (!tags.includes("séduisant") && !memory.askedTags.has("séduisant")) pool.push("Plus séduisant");
  return pool.slice(0, 3);
}

/* ─── Persistent memory helpers ─────────────────────────── */
function loadPersistentMemory(): PersistentMemory | null {
  try {
    const raw = localStorage.getItem("fz_chat_memory");
    if (!raw) return null;
    return JSON.parse(raw) as PersistentMemory;
  } catch { return null; }
}

function savePersistentMemory(mem: PersistentMemory): void {
  try {
    localStorage.setItem("fz_chat_memory", JSON.stringify(mem));
  } catch { /* silently fail */ }
}

/* ─── Random pick helper ────────────────────────────────── */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Compare helper ────────────────────────────────────── */
function findPerfumeByName(name: string): Perfume | undefined {
  const n = name.toLowerCase().trim();
  return PERFUMES.find(p => p.name.toLowerCase() === n)
    || PERFUMES.find(p => p.name.toLowerCase().includes(n))
    || PERFUMES.find(p => n.includes(p.name.toLowerCase()));
}

function buildComparisonText(p1: Perfume, p2: Perfume): string {
  const prof1 = getPerfumeProfile(p1);
  const prof2 = getPerfumeProfile(p2);
  const accord1 = getAccordLabel(prof1);
  const accord2 = getAccordLabel(prof2);
  const vibe1 = getVibeLabel(prof1);
  const vibe2 = getVibeLabel(prof2);

  const seasonLabels: Record<string, string> = { winter: "hiver", spring: "printemps", summer: "été", autumn: "automne" };
  const bestSeason1 = seasonLabels[Object.entries(p1.seasonData).sort((a, b) => b[1] - a[1])[0][0]];
  const bestSeason2 = seasonLabels[Object.entries(p2.seasonData).sort((a, b) => b[1] - a[1])[0][0]];

  // Common notes
  const notes1 = new Set([...p1.topNotes, ...p1.heartNotes, ...p1.baseNotes].map(n => n.toLowerCase()));
  const notes2 = [...p2.topNotes, ...p2.heartNotes, ...p2.baseNotes].map(n => n.toLowerCase());
  const common = notes2.filter(n => notes1.has(n));

  let text = `Ah, un duel olfactif ! Comparons ces deux merveilles :\n\n`;
  text += `🌸 **${p1.name}** — ${p1.brand}\n`;
  text += `✨ ${accord1} · ${vibe1}\n`;
  text += `📍 Sillage : ${p1.sillage} · Saison idéale : ${bestSeason1}\n\n`;
  text += `🌸 **${p2.name}** — ${p2.brand}\n`;
  text += `✨ ${accord2} · ${vibe2}\n`;
  text += `📍 Sillage : ${p2.sillage} · Saison idéale : ${bestSeason2}\n\n`;

  if (common.length > 0) {
    text += `🤝 Notes en commun : ${common.slice(0, 3).join(", ")}\n`;
  }

  // Recommendation
  if (prof1.intensityLevel > prof2.intensityLevel) {
    text += `\n💡 Mon conseil : **${p1.name}** pour marquer les esprits, **${p2.name}** pour la subtilité.`;
  } else {
    text += `\n💡 Mon conseil : **${p2.name}** pour l'impact, **${p1.name}** pour l'élégance discrète.`;
  }

  return text;
}

/* ─── Sommelier synthesis ───────────────────────────────── */
function sommelierSynthesize(answers: string[], memory: SessionMemory): { text: string; perfume?: Perfume; suggestions: string[] } {
  const joined = answers.join(" ").toLowerCase();

  // Build virtual query from answers
  const wantEvening = /soir|nuit/i.test(joined);
  const wantWarm = /chaud|enveloppant|intense/i.test(joined);
  const wantFresh = /frais|léger|light/i.test(joined);
  const wantIntense = /intense|affirmé|fort/i.test(joined);
  const wantDiscrete = /discret|subtil/i.test(joined);

  const scored = PERFUMES.map(p => {
    const prof = getPerfumeProfile(p);
    let score = 0;
    if (wantEvening && prof.intensityLevel >= 0.5) score += 1.5;
    if (wantWarm && (prof.woodyLevel > 0.3 || prof.spicyLevel > 0.3 || prof.sweetnessLevel > 0.3)) score += 1.3;
    if (wantFresh && prof.freshnessLevel > 0.3) score += 1.3;
    if (wantIntense && prof.intensityLevel >= 0.6) score += 1.2;
    if (wantDiscrete && prof.intensityLevel <= 0.4) score += 1.2;
    if (p.id === memory.lastPerfumeId) score -= 3;
    return { perfume: p, score, profile: prof };
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  const best = scored.length > 0 ? scored[Math.floor(Math.random() * Math.min(3, scored.length))] : null;

  if (best) {
    memory.lastPerfumeId = best.perfume.id;
    const accord = getAccordLabel(best.profile);
    const vibe = getVibeLabel(best.profile);
    const notes = getOlfactoryProfile(best.perfume);
    const intro = pick(PERSONALITY_INTROS);
    const transition = pick(PERSONALITY_TRANSITIONS);

    const text = `${intro}\n\nAprès analyse de tes 3 réponses, voici mon verdict :\n\n🌸 **${best.perfume.name}**\n${best.perfume.brand} · ${best.perfume.concentration}\n\n${transition}\n\n🎵 Notes clés : ${notes}\n✨ Accord dominant : ${accord}\n🎭 Profil : ${vibe}`;
    return { text, perfume: best.perfume, suggestions: ["Plus intense", "Autre chose", "Merci Sofia !"] };
  }

  const fallback = PERFUMES[Math.floor(Math.random() * PERFUMES.length)];
  return { text: `${pick(SOFIA_FALLBACK_INTROS)}\n\n🌸 **${fallback.name}** — ${fallback.brand}`, perfume: fallback, suggestions: ["Plus intense", "Plus frais"] };
}

/* ─── Multi-criteria AI response ────────────────────────── */
function getAIResponse(message: string, memory: SessionMemory): { text: string; perfume?: Perfume; perfume2?: Perfume; suggestions: string[] } {
  const m = message.toLowerCase();
  const wantsFemale = /femme|féminin|elle/i.test(m);
  const wantsMale = /homme|masculin|viril/i.test(m);

  // Check app guide first
  for (const guide of APP_GUIDE_PATTERNS) {
    if (guide.test.test(m)) {
      return { text: guide.response, suggestions: ["Recommande-moi un parfum", "Comment choisir ?"] };
    }
  }

  // ── Comparison detection ──
  const compareRegex = /compar|versus|vs\.?|ou bien|lequel.*entre|différence entre/i;
  if (compareRegex.test(m)) {
    // Try to extract two perfume names
    const perfumeNames = PERFUMES.map(p => p.name.toLowerCase());
    const found: Perfume[] = [];
    for (const p of PERFUMES) {
      if (m.includes(p.name.toLowerCase()) && found.length < 2 && !found.find(f => f.id === p.id)) {
        found.push(p);
      }
    }
    if (found.length === 2) {
      const text = buildComparisonText(found[0], found[1]);
      return { text, perfume: found[0], perfume2: found[1], suggestions: ["Lequel pour une soirée ?", "Un autre comparatif"] };
    }
    if (found.length === 1) {
      // Compare with a random different one
      const other = PERFUMES.find(p => p.id !== found[0].id && p.gender === found[0].gender);
      if (other) {
        const text = buildComparisonText(found[0], other);
        return { text, perfume: found[0], perfume2: other, suggestions: ["Lequel pour une soirée ?", "Un autre comparatif"] };
      }
    }
  }

  // ── Reverse analysis (find similar) ──
  const reverseRegex = /ressemble|proche de|dans le style|j.?aime\s+\w+|comme\s+[A-Z]/i;
  if (reverseRegex.test(m)) {
    // Check if they mention a perfume in our collection
    const inCollection = PERFUMES.find(p => m.includes(p.name.toLowerCase()));
    if (inCollection) {
      // Find similar
      const prof = getPerfumeProfile(inCollection);
      const similar = PERFUMES
        .filter(p => p.id !== inCollection.id)
        .map(p => {
          const pp = getPerfumeProfile(p);
          const diff = Math.abs(pp.sweetnessLevel - prof.sweetnessLevel)
            + Math.abs(pp.freshnessLevel - prof.freshnessLevel)
            + Math.abs(pp.woodyLevel - prof.woodyLevel)
            + Math.abs(pp.spicyLevel - prof.spicyLevel)
            + Math.abs(pp.floralLevel - prof.floralLevel);
          return { perfume: p, diff, profile: pp };
        })
        .sort((a, b) => a.diff - b.diff);

      if (similar.length > 0) {
        const best = similar[0];
        memory.lastPerfumeId = best.perfume.id;
        const accord = getAccordLabel(best.profile);
        const vibe = getVibeLabel(best.profile);
        const text = `${pick(PERSONALITY_INTROS)}\n\nSi tu aimes **${inCollection.name}**, tu vas adorer :\n\n🌸 **${best.perfume.name}**\n${best.perfume.brand} · ${best.perfume.concentration}\n\n✨ Accord dominant : ${accord}\n🎭 Profil : ${vibe}\n\nIls partagent un ADN olfactif très proche !`;
        return { text, perfume: best.perfume, suggestions: ["Encore plus proche", "Quelque chose de différent"] };
      }
    } else {
      // Not in collection — use keywords to match
      const matchedRules = KEYWORD_RULES.filter(kw => kw.test.test(m));
      if (matchedRules.length > 0) {
        const scored = PERFUMES.map(p => {
          const prof = getPerfumeProfile(p);
          let score = 0;
          for (const rule of matchedRules) {
            if (rule.filter(p, prof)) score += rule.weight;
          }
          if (p.id === memory.lastPerfumeId) score -= 3;
          return { perfume: p, score, profile: prof };
        }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

        if (scored.length > 0) {
          const best = scored[0];
          memory.lastPerfumeId = best.perfume.id;
          const accord = getAccordLabel(best.profile);
          const text = `Je ne connais pas ce parfum, mais d'après ce que tu décris, voici ce qui s'en approche le plus dans notre collection :\n\n🌸 **${best.perfume.name}**\n${best.perfume.brand}\n\n✨ Accord dominant : ${accord}`;
          return { text, perfume: best.perfume, suggestions: ["Plus proche encore", "Autre style"] };
        }
      }

      // Generic reverse fallback
      const randomPick = PERFUMES.filter(p => p.id !== memory.lastPerfumeId);
      const rp = randomPick[Math.floor(Math.random() * randomPick.length)] || PERFUMES[0];
      memory.lastPerfumeId = rp.id;
      const text = `Je ne connais pas ce parfum, mais d'après ce que tu décris, voici ce qui s'en approche :\n\n🌸 **${rp.name}** — ${rp.brand}\n\n_${rp.description}_`;
      return { text, perfume: rp, suggestions: ["Plus intense", "Plus frais"] };
    }
  }

  // ── Standard multi-criteria matching ──
  const matchedRules = KEYWORD_RULES.filter((kw) => kw.test.test(m));
  const matchedTags = matchedRules.map((r) => r.tag);

  matchedRules.forEach((r) => {
    memory.preferences.add(r.prefTag);
    memory.askedTags.add(r.tag);
  });

  if (matchedRules.length > 0) {
    const scored = PERFUMES
      .filter((p) => {
        if (wantsFemale) return p.gender === "femme" || p.gender === "unisexe";
        if (wantsMale) return p.gender === "homme" || p.gender === "unisexe";
        return true;
      })
      .map((p) => {
        const prof = getPerfumeProfile(p);
        let score = 0;
        for (const rule of matchedRules) {
          if (rule.filter(p, prof)) score += rule.weight;
        }
        if (memory.preferences.has("frais") && prof.freshnessLevel > 0.4) score += 0.3;
        if (memory.preferences.has("intense") && prof.intensityLevel >= 0.6) score += 0.3;
        if (memory.preferences.has("discret") && prof.intensityLevel <= 0.4) score += 0.3;
        if (memory.preferences.has("sucré") && prof.sweetnessLevel > 0.4) score += 0.3;
        if (memory.preferences.has("boisé") && prof.woodyLevel > 0.4) score += 0.3;
        if (memory.preferences.has("floral") && prof.floralLevel > 0.4) score += 0.3;
        if (memory.preferences.has("épicé") && prof.spicyLevel > 0.4) score += 0.3;
        if (p.id === memory.lastPerfumeId) score -= 3;
        return { perfume: p, score, profile: prof };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      const topN = scored.slice(0, Math.min(3, scored.length));
      const best = topN[Math.floor(Math.random() * topN.length)];
      memory.lastPerfumeId = best.perfume.id;

      const intro = pick(PERSONALITY_INTROS);
      const transition = pick(PERSONALITY_TRANSITIONS);
      const profile = getOlfactoryProfile(best.perfume);
      const accord = getAccordLabel(best.profile);
      const vibe = getVibeLabel(best.profile);

      const seasonBest = Object.entries(best.perfume.seasonData).sort((a, b) => Number(b[1]) - Number(a[1]))[0];
      const seasonLabels: Record<string, string> = { winter: "hiver", spring: "printemps", summer: "été", autumn: "automne" };
      const bestSeason = seasonLabels[seasonBest[0]] ?? seasonBest[0];

      const text = `${intro}\n\n🌸 **${best.perfume.name}**\n${best.perfume.brand} · ${best.perfume.concentration}\n\n${transition}\n\n🎵 Notes clés : ${profile}\n✨ Accord dominant : ${accord}\n🎭 Profil : ${vibe}\n📍 Sillage : ${best.perfume.sillage} · Idéal en ${bestSeason}`;

      return { text, perfume: best.perfume, suggestions: getSuggestions(matchedTags, memory) };
    }
  }

  // Fallback
  const random = PERFUMES.filter((p) => p.id !== memory.lastPerfumeId);
  const fallback = random[Math.floor(Math.random() * random.length)] || PERFUMES[0];
  memory.lastPerfumeId = fallback.id;

  const prof = getPerfumeProfile(fallback);
  const profile = getOlfactoryProfile(fallback);
  const accord = getAccordLabel(prof);
  const vibe = getVibeLabel(prof);
  const intro = pick(SOFIA_FALLBACK_INTROS);
  const text = `${intro}\n\n🌸 **${fallback.name}**\n${fallback.brand} · ${fallback.concentration}\n\n_${fallback.description}_\n\n🎵 Notes clés : ${profile}\n✨ Accord dominant : ${accord}\n🎭 Profil : ${vibe}\n\nPrécise l'occasion ou l'ambiance souhaitée pour affiner !`;

  return { text, perfume: fallback, suggestions: ["Pour une soirée", "Quelque chose de frais", "Plus sucré"] };
}

/* ─── Component ─────────────────────────────────────────── */
const ChatConseiller = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState(THINKING_PHRASES[0]);
  const [hasUserSent, setHasUserSent] = useState(false);
  const [sommelierMode, setSommelierMode] = useState(false);
  const [sommelierStep, setSommelierStep] = useState(0);
  const [sommelierAnswers, setSommelierAnswers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(1);
  const memoryRef = useRef<SessionMemory>({ preferences: new Set(), askedTags: new Set() });
  const persistentRef = useRef<PersistentMemory | null>(null);
  const welcomeBackSent = useRef(false);

  // Pre-compute profiles on mount
  useEffect(() => {
    PERFUMES.forEach((p) => getPerfumeProfile(p));
  }, []);

  // Load persistent memory on mount
  useEffect(() => {
    const saved = loadPersistentMemory();
    if (saved) {
      persistentRef.current = { ...saved, totalVisits: saved.totalVisits + 1, lastVisit: new Date().toISOString() };
      // Restore preferences into session memory
      saved.preferences.forEach(p => memoryRef.current.preferences.add(p));
    } else {
      persistentRef.current = { preferences: [], lastVisit: new Date().toISOString(), totalVisits: 1, favoriteTags: [] };
    }
    savePersistentMemory(persistentRef.current);
  }, []);

  // Welcome back message when chat opens
  useEffect(() => {
    if (open && !welcomeBackSent.current && persistentRef.current && persistentRef.current.totalVisits > 1 && persistentRef.current.favoriteTags.length > 0) {
      welcomeBackSent.current = true;
      const pref = persistentRef.current.favoriteTags.slice(0, 2).join(" et ");
      const template = pick(WELCOME_BACK_TEMPLATES);
      const text = template.replace("{pref}", pref);
      const wbMsg: ChatMessage = { id: idCounter.current++, role: "ai", text, suggestions: ["Pareil qu'avant", "Quelque chose de nouveau"] };
      setMessages(prev => [...prev, wbMsg]);
    }
  }, [open]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  // Save preferences to persistent memory
  const syncPersistent = useCallback(() => {
    if (!persistentRef.current) return;
    const prefs = Array.from(memoryRef.current.preferences);
    persistentRef.current.preferences = prefs;
    // Update favorite tags (tags mentioned 3+ times tracked via simple count)
    const tagCounts: Record<string, number> = {};
    prefs.forEach(p => { tagCounts[p] = (tagCounts[p] || 0) + 1; });
    // Since preferences is a Set we track favorites by how many sessions they appear
    persistentRef.current.favoriteTags = [...new Set([...persistentRef.current.favoriteTags, ...prefs])].slice(0, 5);
    savePersistentMemory(persistentRef.current);
  }, []);

  const sendMessage = useCallback((text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;

    if (!hasUserSent) setHasUserSent(true);

    const userMsg: ChatMessage = { id: idCounter.current++, role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setThinkingText(pick(THINKING_PHRASES));

    const delay = 1500;

    // ── Sommelier mode handling ──
    if (sommelierMode) {
      setTimeout(() => {
        const newAnswers = [...sommelierAnswers, msg];
        setSommelierAnswers(newAnswers);
        const nextStep = sommelierStep + 1;

        if (nextStep < SOMMELIER_QUESTIONS.length) {
          setSommelierStep(nextStep);
          const aiMsg: ChatMessage = {
            id: idCounter.current++, role: "ai",
            text: `Merci ! ${pick(["Noté !", "Parfait !", "Excellent choix !"])} ${SOMMELIER_QUESTIONS[nextStep]}`,
            suggestions: nextStep === 1 ? ["Frais et léger", "Chaud et enveloppant"] : ["Intense et affirmé", "Discret et subtil"],
          };
          setMessages(prev => [...prev, aiMsg]);
          setTyping(false);
        } else {
          // Synthesize final recommendation
          setSommelierMode(false);
          setSommelierStep(0);
          setSommelierAnswers([]);
          const result = sommelierSynthesize(newAnswers, memoryRef.current);
          const aiMsg: ChatMessage = { id: idCounter.current++, role: "ai", text: result.text, perfume: result.perfume, suggestions: result.suggestions };
          setMessages(prev => [...prev, aiMsg]);
          setTyping(false);
          syncPersistent();
        }
      }, delay);
      return;
    }

    // ── Sommelier trigger ──
    const vagueRegex = /^(je sais pas|aide.?moi|surprise|un conseil|help|bonjour|salut|hey|bonsoir|coucou|slt)$/i;
    if (msg.length < 15 || vagueRegex.test(msg.trim())) {
      setTimeout(() => {
        setSommelierMode(true);
        setSommelierStep(0);
        setSommelierAnswers([]);
        const aiMsg: ChatMessage = {
          id: idCounter.current++, role: "ai",
          text: `Pas de souci ! Laisse-moi te guider comme un sommelier du parfum 🍷\n\n${SOMMELIER_QUESTIONS[0]}`,
          suggestions: ["Jour ☀️", "Soir 🌙"],
        };
        setMessages(prev => [...prev, aiMsg]);
        setTyping(false);
      }, delay);
      return;
    }

    // ── Standard response ──
    setTimeout(() => {
      const result = getAIResponse(msg, memoryRef.current);
      const aiMsg: ChatMessage = { id: idCounter.current++, role: "ai", text: result.text, perfume: result.perfume, perfume2: result.perfume2, suggestions: result.suggestions };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
      syncPersistent();
    }, delay);
  }, [input, typing, hasUserSent, sommelierMode, sommelierStep, sommelierAnswers, syncPersistent]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleSuggestionClick = (s: string) => {
    sendMessage(s);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border border-amber-400/30 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(43 80% 45%) 100%)",
          boxShadow: "0 0 20px hsla(43,76%,52%,0.35)",
        }}
        whileHover={{ scale: 1.12, boxShadow: "0 0 30px hsla(43,76%,52%,0.55)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le conseiller parfum"
      >
        {open ? (
          <X size={22} className="text-black" />
        ) : (
          <img src="/logo.png" alt="logo" className="w-12 h-12 object-contain" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl border border-amber-500/20 overflow-hidden"
            style={{
              width: "min(380px, 90vw)",
              height: "min(520px, 70vh)",
              background: "hsla(244,85%,9%,0.94)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 15px hsla(43,76%,52%,0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-amber-500/15">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-amber-400" />
                <span className="font-display text-sm text-amber-200 tracking-wide">Sofia · Conseillère parfum</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors" aria-label="Fermer">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap transition-colors duration-200 ${
                      msg.role === "user"
                        ? "bg-amber-500/20 text-amber-100 rounded-br-md hover:bg-amber-500/25"
                        : "bg-white/5 text-white/85 rounded-bl-md border border-white/5 hover:bg-white/[0.07]"
                    }`}
                  >
                    {/* Perfume images */}
                    {msg.perfume && msg.perfume2 ? (
                      <div className="mb-2 flex justify-center gap-3">
                        <div className="text-center">
                          <img src={msg.perfume.image} alt={msg.perfume.name} className="w-14 h-14 object-contain rounded-lg bg-white/10 p-1" loading="lazy" />
                        </div>
                        <span className="self-center text-amber-400/60 text-xs font-medium">VS</span>
                        <div className="text-center">
                          <img src={msg.perfume2.image} alt={msg.perfume2.name} className="w-14 h-14 object-contain rounded-lg bg-white/10 p-1" loading="lazy" />
                        </div>
                      </div>
                    ) : msg.perfume ? (
                      <div className="mb-2 flex justify-center">
                        <img src={msg.perfume.image} alt={msg.perfume.name} className="w-16 h-16 object-contain rounded-lg bg-white/10 p-1" loading="lazy" />
                      </div>
                    ) : null}
                    {msg.text}

                    {/* Suggestions */}
                    {msg.role === "ai" && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-white/5">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleSuggestionClick(s)}
                            className="text-[11px] px-2.5 py-1 rounded-full border border-amber-500/25 text-amber-300/80 hover:bg-amber-500/15 hover:text-amber-200 transition-all duration-200"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Starter prompts */}
              {!hasUserSent && messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {STARTER_PROMPTS.map((p) => (
                    <motion.button
                      key={p}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleSuggestionClick(p)}
                      className="text-[12px] px-3 py-1.5 rounded-full border border-amber-500/20 text-amber-300/70 hover:bg-amber-500/15 hover:text-amber-200 transition-all duration-200"
                    >
                      {p}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-2.5 text-amber-300/50 text-[12px] italic">
                    {thinkingText}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-amber-500/15 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Décris-moi ton parfum idéal…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(43 80% 45%) 100%)" }}
                aria-label="Envoyer"
              >
                <Send size={15} className="text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatConseiller;

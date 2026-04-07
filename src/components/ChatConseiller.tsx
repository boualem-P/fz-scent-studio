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
  suggestions?: string[];
}

interface SessionMemory {
  preferences: Set<string>;
  lastPerfumeId?: string;
  askedTags: Set<string>;
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

/* ─── Thinking phrases ──────────────────────────────────── */
const THINKING_PHRASES = [
  "Analyse en cours…",
  "Je réfléchis à votre profil…",
  "Exploration olfactive…",
  "Je cherche la perle rare…",
  "Consultation de la collection…",
  "Analyse de votre profil olfactif…",
  "Parcours de la collection…",
];

/* ─── Welcome ───────────────────────────────────────────── */
const WELCOME_MSG: ChatMessage = {
  id: 0,
  role: "ai",
  text: "Bienvenue chez votre conseiller parfum ✨\nDites-moi ce que vous recherchez : une occasion, une saison, une ambiance… Je vous guiderai vers le parfum idéal.",
  suggestions: ["Parfum pour une soirée", "Parfum été homme", "Parfum séduisant"],
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
      "L'application vous guide en 4 étapes élégantes :\n\n1️⃣ **Profil** — Choisissez votre univers\n2️⃣ **Budget** — Définissez votre fourchette\n3️⃣ **Humeur** — Partagez votre état d'esprit\n4️⃣ **Exploration** — Découvrez vos fragrances idéales par swipe\n\nChaque choix affine les recommandations pour vous proposer le parfum parfait.",
  },
  {
    test: /c.est quoi\s*(les\s*)?carte|swipe|glisser/i,
    response:
      "Les cartes vous présentent différentes familles olfactives 🌿\n\nGlissez à **droite** pour dire « j'aime », à **gauche** pour passer. L'algorithme analyse vos préférences et compose votre profil olfactif unique.",
  },
  {
    test: /comment\s*choisir|quel\s*parfum|aide|conseill?e/i,
    response:
      "Deux options s'offrent à vous :\n\n✨ **Le parcours guidé** — Suivez les étapes depuis l'accueil pour obtenir une recommandation personnalisée\n💬 **Ce chat** — Décrivez simplement ce que vous cherchez et je vous suggère un parfum adapté\n\nN'hésitez pas à me préciser une occasion, une saison ou une ambiance !",
  },
  {
    test: /à\s*quoi\s*sert|pourquoi|but|objectif/i,
    response:
      "Cette application est votre **conseiller parfum personnel** 🌸\n\nElle analyse vos goûts, votre humeur et l'occasion pour vous recommander la fragrance idéale parmi notre collection. Aucune expertise requise — laissez-vous guider !",
  },
  {
    test: /humeur|mood|étape|profil/i,
    response:
      "L'écran d'humeur pose 3 questions rapides :\n\n• Votre énergie du moment\n• Votre intention (séduire, impressionner…)\n• Le contexte (soirée, journée…)\n\nCes réponses permettent d'affiner les suggestions pour qu'elles correspondent à votre état d'esprit.",
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
  {
    test: /soir[ée]e|nuit|gala|sortir/i,
    filter: (p, prof) => prof.intensityLevel >= 0.6 && (p.seasonData.winter > 50 || p.seasonData.autumn > 50),
    tag: "soirée", prefTag: "intense", weight: 1.5,
  },
  {
    test: /intense|puissant|fort/i,
    filter: (_p, prof) => prof.intensityLevel >= 0.6,
    tag: "intense", prefTag: "intense", weight: 1.3,
  },
  {
    test: /sucr[ée]|vanill[ée]|gourmand|doux|caramel|tonka|chocolat/i,
    filter: (_p, prof) => prof.sweetnessLevel > 0.3,
    tag: "sucré", prefTag: "sucré", weight: 1.4,
  },
  {
    test: /frais|fraîch|léger|légère|citron|agrume|aquatique/i,
    filter: (_p, prof) => prof.freshnessLevel > 0.3,
    tag: "frais", prefTag: "frais", weight: 1.4,
  },
  {
    test: /bois[ée]|cèdre|santal|vétiver|patchouli|oud/i,
    filter: (_p, prof) => prof.woodyLevel > 0.3,
    tag: "boisé", prefTag: "boisé", weight: 1.3,
  },
  {
    test: /épic[ée]|poivre|cannelle|safran|muscade/i,
    filter: (_p, prof) => prof.spicyLevel > 0.3,
    tag: "épicé", prefTag: "épicé", weight: 1.3,
  },
  {
    test: /floral|fleur|rose|jasmin|iris|tubéreuse/i,
    filter: (_p, prof) => prof.floralLevel > 0.3,
    tag: "floral", prefTag: "floral", weight: 1.3,
  },
  {
    test: /sédu|romantique|rendez|charm/i,
    filter: (p, prof) => prof.intensityLevel >= 0.4 && (prof.sweetnessLevel > 0.2 || prof.floralLevel > 0.2),
    tag: "séduction", prefTag: "séduisant", weight: 1.2,
  },
  {
    test: /hiver|froid|chaud|ambre/i,
    filter: (p) => p.seasonData.winter >= 60,
    tag: "hiver", prefTag: "chaud", weight: 1.2,
  },
  {
    test: /été|soleil|plage/i,
    filter: (p) => p.seasonData.summer >= 60,
    tag: "été", prefTag: "frais", weight: 1.2,
  },
  {
    test: /printemps/i,
    filter: (p) => p.seasonData.spring >= 60,
    tag: "printemps", prefTag: "floral", weight: 1.1,
  },
  {
    test: /automne|cuir|feuille/i,
    filter: (p) => p.seasonData.autumn >= 60,
    tag: "automne", prefTag: "boisé", weight: 1.1,
  },
  {
    test: /travail|bureau|discret|jour|quotidien/i,
    filter: (_p, prof) => prof.intensityLevel <= 0.4,
    tag: "quotidien", prefTag: "discret", weight: 1.2,
  },
  {
    test: /homme|masculin|viril/i,
    filter: (p) => p.gender === "homme" || p.gender === "unisexe",
    tag: "masculin", prefTag: "masculin", weight: 1.0,
  },
  {
    test: /femme|féminin|elle/i,
    filter: (p) => p.gender === "femme" || p.gender === "unisexe",
    tag: "féminin", prefTag: "féminin", weight: 1.0,
  },
  {
    test: /unisexe|mixte|neutre|non.?gen/i,
    filter: (p) => p.gender === "unisexe",
    tag: "unisexe", prefTag: "unisexe", weight: 1.0,
  },
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

/* ─── Multi-criteria AI response ────────────────────────── */
function getAIResponse(message: string, memory: SessionMemory): { text: string; perfume?: Perfume; suggestions: string[] } {
  const m = message.toLowerCase();

  // Check app guide first
  for (const guide of APP_GUIDE_PATTERNS) {
    if (guide.test.test(m)) {
      return { text: guide.response, suggestions: ["Recommande-moi un parfum", "Comment choisir ?"] };
    }
  }

  // Multi-criteria matching
  const matchedRules = KEYWORD_RULES.filter((kw) => kw.test.test(m));
  const matchedTags = matchedRules.map((r) => r.tag);

  // Track asked tags
  matchedRules.forEach((r) => {
    memory.preferences.add(r.prefTag);
    memory.askedTags.add(r.tag);
  });

  if (matchedRules.length > 0) {
    // Weighted scoring
    const scored = PERFUMES.map((p) => {
      const prof = getPerfumeProfile(p);
      let score = 0;
      for (const rule of matchedRules) {
        if (rule.filter(p, prof)) score += rule.weight;
      }
      // Memory preference bonuses
      if (memory.preferences.has("frais") && prof.freshnessLevel > 0.4) score += 0.3;
      if (memory.preferences.has("intense") && prof.intensityLevel >= 0.6) score += 0.3;
      if (memory.preferences.has("discret") && prof.intensityLevel <= 0.4) score += 0.3;
      if (memory.preferences.has("sucré") && prof.sweetnessLevel > 0.4) score += 0.3;
      if (memory.preferences.has("boisé") && prof.woodyLevel > 0.4) score += 0.3;
      if (memory.preferences.has("floral") && prof.floralLevel > 0.4) score += 0.3;
      if (memory.preferences.has("épicé") && prof.spicyLevel > 0.4) score += 0.3;
      // Avoid repeat
      if (p.id === memory.lastPerfumeId) score -= 3;
      return { perfume: p, score, profile: prof };
    })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      const topN = scored.slice(0, Math.min(3, scored.length));
      const pick = topN[Math.floor(Math.random() * topN.length)];
      memory.lastPerfumeId = pick.perfume.id;

      const criteriaLabel = matchedTags.length > 1
        ? `Pour votre recherche ${matchedTags.join(" + ")}`
        : `Pour une ambiance ${matchedTags[0]}`;

      const profile = getOlfactoryProfile(pick.perfume);
      const accord = getAccordLabel(pick.profile);
      const vibe = getVibeLabel(pick.profile);

      const seasonBest = Object.entries(pick.perfume.seasonData)
        .sort((a, b) => b[1] - a[1])[0];
      const seasonLabels: Record<string, string> = { winter: "hiver", spring: "printemps", summer: "été", autumn: "automne" };
      const bestSeason = seasonLabels[seasonBest[0]] ?? seasonBest[0];

      const text = `${criteriaLabel}, voici ma recommandation :\n\n🌸 **${pick.perfume.name}**\n${pick.perfume.brand} · ${pick.perfume.concentration}\n\n_${pick.perfume.description}_\n\n🎵 Notes clés : ${profile}\n✨ Accord dominant : ${accord}\n🎭 Profil : ${vibe}\n📍 Sillage : ${pick.perfume.sillage} · Idéal en ${bestSeason}`;

      return { text, perfume: pick.perfume, suggestions: getSuggestions(matchedTags, memory) };
    }
  }

  // Fallback
  const random = PERFUMES.filter((p) => p.id !== memory.lastPerfumeId);
  const pick = random[Math.floor(Math.random() * random.length)] || PERFUMES[0];
  memory.lastPerfumeId = pick.id;

  const prof = getPerfumeProfile(pick);
  const profile = getOlfactoryProfile(pick);
  const accord = getAccordLabel(prof);
  const vibe = getVibeLabel(prof);
  const text = `Laissez-moi vous proposer une découverte :\n\n🌸 **${pick.name}**\n${pick.brand} · ${pick.concentration}\n\n_${pick.description}_\n\n🎵 Notes clés : ${profile}\n✨ Accord dominant : ${accord}\n🎭 Profil : ${vibe}\n\nPrécisez l'occasion ou l'ambiance souhaitée pour affiner !`;

  return { text, perfume: pick, suggestions: ["Pour une soirée", "Quelque chose de frais", "Plus sucré"] };
}

/* ─── Component ─────────────────────────────────────────── */
const ChatConseiller = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [thinkingText, setThinkingText] = useState(THINKING_PHRASES[0]);
  const [hasUserSent, setHasUserSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(1);
  const memoryRef = useRef<SessionMemory>({ preferences: new Set(), askedTags: new Set() });

  // Pre-compute profiles on mount
  useMemo(() => {
    PERFUMES.forEach((p) => getPerfumeProfile(p));
  }, []);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const sendMessage = useCallback((text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;

    if (!hasUserSent) setHasUserSent(true);

    const userMsg: ChatMessage = { id: idCounter.current++, role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setThinkingText(THINKING_PHRASES[Math.floor(Math.random() * THINKING_PHRASES.length)]);

    const delay = 1500;
    setTimeout(() => {
      const { text: reply, perfume, suggestions } = getAIResponse(msg, memoryRef.current);
      const aiMsg: ChatMessage = { id: idCounter.current++, role: "ai", text: reply, perfume, suggestions };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, delay);
  }, [input, typing, hasUserSent]);

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
  <img src="/logo.png" className="w-12 h-12 object-contain" />
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
                <span className="font-display text-sm text-amber-200 tracking-wide">Conseiller parfum IA</span>
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
                    {/* Perfume image */}
                    {msg.perfume && (
                      <div className="mb-2 flex justify-center">
                        <img
                          src={msg.perfume.image}
                          alt={msg.perfume.name}
                          className="w-16 h-16 object-contain rounded-lg bg-white/10 p-1"
                          loading="lazy"
                        />
                      </div>
                    )}
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
                placeholder="Décrivez votre parfum idéal…"
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

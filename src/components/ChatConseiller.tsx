import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { PERFUMES } from "@/data/perfumes";
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
}

/* ─── Thinking phrases ──────────────────────────────────── */
const THINKING_PHRASES = [
  "Analyse en cours…",
  "Je réfléchis à votre profil…",
  "Exploration olfactive…",
  "Je cherche la perle rare…",
  "Consultation de la collection…",
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

/* ─── Keyword filters ───────────────────────────────────── */
interface KeywordRule {
  test: RegExp;
  filter: (p: Perfume) => boolean;
  tag: string;
  prefTag: string;
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    test: /soir[ée]e|nuit|gala|sortir/i,
    filter: (p) => (p.sillage === "fort" || p.sillage === "très fort") && (p.seasonData.winter > 50 || p.seasonData.autumn > 50),
    tag: "soirée",
    prefTag: "intense",
  },
  {
    test: /intense|puissant|fort/i,
    filter: (p) => p.sillage === "fort" || p.sillage === "très fort" || p.sillage === "énorme",
    tag: "intense",
    prefTag: "intense",
  },
  {
    test: /sédu|romantique|rendez|charm/i,
    filter: (p) => (p.sillage === "fort" || p.sillage === "modéré") && p.seasonData.autumn > 30,
    tag: "séduction",
    prefTag: "séduisant",
  },
  {
    test: /hiver|froid|chaud|ambre|oud|épic/i,
    filter: (p) => p.seasonData.winter >= 60,
    tag: "hiver",
    prefTag: "chaud",
  },
  {
    test: /été|soleil|plage|frais|fraîch|légère?|citron|agrume/i,
    filter: (p) => p.seasonData.summer >= 60,
    tag: "été",
    prefTag: "frais",
  },
  {
    test: /printemps|fleur|floral|doux|rose|jasmin/i,
    filter: (p) => p.seasonData.spring >= 60,
    tag: "printemps",
    prefTag: "floral",
  },
  {
    test: /automne|bois[ée]|cuir|feuille/i,
    filter: (p) => p.seasonData.autumn >= 60,
    tag: "automne",
    prefTag: "boisé",
  },
  {
    test: /travail|bureau|discret|jour|quotidien/i,
    filter: (p) => p.sillage === "discret" || p.sillage === "modéré",
    tag: "quotidien",
    prefTag: "discret",
  },
  {
    test: /homme|masculin|viril/i,
    filter: (p) => p.gender === "homme",
    tag: "masculin",
    prefTag: "masculin",
  },
  {
    test: /femme|féminin|elle/i,
    filter: (p) => p.gender === "femme",
    tag: "féminin",
    prefTag: "féminin",
  },
  {
    test: /unisexe|mixte|neutre|non.?gen/i,
    filter: (p) => p.gender === "unisexe",
    tag: "unisexe",
    prefTag: "unisexe",
  },
];

/* ─── Olfactory profile helper ──────────────────────────── */
function getOlfactoryProfile(p: Perfume): string {
  const allNotes = [...p.topNotes.slice(0, 2), ...p.heartNotes.slice(0, 1), ...p.baseNotes.slice(0, 1)];
  return allNotes.join(", ");
}

/* ─── Suggestions based on context ──────────────────────── */
function getSuggestions(tags: string[]): string[] {
  const pool: string[] = [];
  if (!tags.includes("intense")) pool.push("Plus intense");
  if (!tags.includes("discret")) pool.push("Plus discret");
  if (!tags.includes("frais")) pool.push("Pour l'été");
  if (!tags.includes("chaud")) pool.push("Pour l'hiver");
  if (!tags.includes("séduisant")) pool.push("Plus séduisant");
  if (!tags.includes("floral")) pool.push("Plus floral");
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

  // Add memory preferences
  matchedRules.forEach((r) => memory.preferences.add(r.prefTag));

  if (matchedRules.length > 0) {
    // Score perfumes by how many criteria they match
    const scored = PERFUMES.map((p) => {
      let score = 0;
      for (const rule of matchedRules) {
        if (rule.filter(p)) score++;
      }
      // Bonus if matches memory preferences
      if (memory.preferences.has("frais") && p.seasonData.summer >= 50) score += 0.3;
      if (memory.preferences.has("intense") && (p.sillage === "fort" || p.sillage === "très fort")) score += 0.3;
      if (memory.preferences.has("discret") && (p.sillage === "discret" || p.sillage === "modéré")) score += 0.3;
      // Avoid repeating last suggestion
      if (p.id === memory.lastPerfumeId) score -= 2;
      return { perfume: p, score };
    })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      // Pick from top 3 randomly for variety
      const topN = scored.slice(0, Math.min(3, scored.length));
      const pick = topN[Math.floor(Math.random() * topN.length)].perfume;
      memory.lastPerfumeId = pick.id;

      const criteriaLabel = matchedTags.length > 1
        ? `Pour votre recherche ${matchedTags.join(" + ")}`
        : `Pour une ambiance ${matchedTags[0]}`;

      const profile = getOlfactoryProfile(pick);

      const text = `${criteriaLabel}, voici ma recommandation :\n\n🌸 **${pick.name}**\n${pick.brand} · ${pick.concentration}\n\n_${pick.description}_\n\n🎵 Profil olfactif : ${profile}\nSillage : ${pick.sillage ?? "non renseigné"}`;

      return { text, perfume: pick, suggestions: getSuggestions(matchedTags) };
    }
  }

  // Fallback with memory context
  const random = PERFUMES.filter((p) => p.id !== memory.lastPerfumeId);
  const pick = random[Math.floor(Math.random() * random.length)] || PERFUMES[0];
  memory.lastPerfumeId = pick.id;

  const profile = getOlfactoryProfile(pick);
  const text = `Laissez-moi vous proposer une découverte :\n\n🌸 **${pick.name}**\n${pick.brand} · ${pick.concentration}\n\n_${pick.description}_\n\n🎵 Profil olfactif : ${profile}\n\nPrécisez l'occasion ou l'ambiance souhaitée pour affiner !`;

  return { text, perfume: pick, suggestions: ["Pour une soirée", "Quelque chose de frais", "Plus discret"] };
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
  const memoryRef = useRef<SessionMemory>({ preferences: new Set() });

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

    const delay = 600 + Math.random() * 500;
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
  <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
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

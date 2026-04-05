import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { PERFUMES } from "@/data/perfumes";

interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
}

const WELCOME_MSG: ChatMessage = {
  id: 0,
  role: "ai",
  text: "Bienvenue chez votre conseiller parfum ✨\nDites-moi ce que vous recherchez : une occasion, une saison, une ambiance… Je vous guiderai vers le parfum idéal.",
};

function getAIResponse(message: string): string {
  const m = message.toLowerCase();

  const keywords: { test: RegExp; filter: (p: typeof PERFUMES[number]) => boolean; intro: string }[] = [
    {
      test: /soir[ée]e|nuit|gala|sortir|intense|sédu/,
      filter: (p) => (p.sillage === "fort" || p.sillage === "très fort") && (p.seasonData.winter > 50 || p.seasonData.autumn > 50),
      intro: "Pour une soirée, je vous conseille un parfum intense et envoûtant :",
    },
    {
      test: /hiver|froid|chaud|ambre|oud|épic/,
      filter: (p) => p.seasonData.winter >= 60,
      intro: "Pour l'hiver, optez pour des notes chaudes et enveloppantes :",
    },
    {
      test: /été|soleil|plage|frais|fraîch|légère?|citron|agrume/,
      filter: (p) => p.seasonData.summer >= 60,
      intro: "Pour l'été, voici une fragrance fraîche et lumineuse :",
    },
    {
      test: /printemps|fleur|floral|doux|rose|jasmin/,
      filter: (p) => p.seasonData.spring >= 60,
      intro: "Pour le printemps, une composition florale raffinée :",
    },
    {
      test: /automne|bois[ée]|cuir|feuille/,
      filter: (p) => p.seasonData.autumn >= 60,
      intro: "Pour l'automne, je recommande une fragrance boisée et chaleureuse :",
    },
    {
      test: /travail|bureau|discret|jour|quotidien/,
      filter: (p) => p.sillage === "discret" || p.sillage === "modéré",
      intro: "Pour le quotidien, voici un parfum élégant et discret :",
    },
    {
      test: /homme|masculin|viril/,
      filter: (p) => p.gender === "homme",
      intro: "Voici une suggestion masculine raffinée :",
    },
    {
      test: /femme|féminin|elle/,
      filter: (p) => p.gender === "femme",
      intro: "Voici une suggestion féminine élégante :",
    },
    {
      test: /unisexe|mixte|neutre|non.?gen/,
      filter: (p) => p.gender === "unisexe",
      intro: "Voici un parfum unisexe sophistiqué :",
    },
  ];

  for (const kw of keywords) {
    if (kw.test.test(m)) {
      const matches = PERFUMES.filter(kw.filter);
      if (matches.length > 0) {
        const pick = matches[Math.floor(Math.random() * matches.length)];
        return `${kw.intro}\n\n🌸 **${pick.name}** — ${pick.brand}\n_${pick.description}_\n\nConcentration : ${pick.concentration}\nSillage : ${pick.sillage ?? "non renseigné"}`;
      }
    }
  }

  // fallback : parfum aléatoire
  const random = PERFUMES[Math.floor(Math.random() * PERFUMES.length)];
  return `Bonne question ! En attendant d'affiner votre profil, laissez-moi vous proposer :\n\n🌸 **${random.name}** — ${random.brand}\n_${random.description}_\n\nN'hésitez pas à me préciser l'occasion (soirée, travail, été…) pour que je vous guide au mieux !`;
}

const ChatConseiller = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(1);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: ChatMessage = { id: idCounter.current++, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 500 + Math.random() * 400;
    setTimeout(() => {
      const reply = getAIResponse(text);
      const aiMsg: ChatMessage = { id: idCounter.current++, role: "ai", text: reply };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, delay);
  }, [input, typing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Bulle flottante */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border border-amber-400/30 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)",
          boxShadow: "0 0 20px rgba(212,175,55,0.35)",
        }}
        whileHover={{ scale: 1.12, boxShadow: "0 0 30px rgba(212,175,55,0.55)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le conseiller parfum"
      >
        {open ? <X size={22} className="text-black" /> : <MessageCircle size={22} className="text-black" />}
      </motion.button>

      {/* Panel Chat */}
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
              height: "min(500px, 70vh)",
              background: "rgba(5,4,41,0.92)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 15px rgba(212,175,55,0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-amber-500/15">
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
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
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-amber-500/20 text-amber-100 rounded-br-md"
                        : "bg-white/5 text-white/85 rounded-bl-md border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-2.5 text-white/50 text-[13px] flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>•</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>•</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>•</span>
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
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)" }}
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

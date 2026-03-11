import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, Lock, Package, Search, CheckCircle, XCircle, Delete } from "lucide-react";
import { PERFUMES } from "@/data/perfumes";

const PIN_CODE = "0000";
const STORAGE_KEY = "fz_stock_status";

type StockMap = Record<string, boolean>;

function loadStock(): StockMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const init: StockMap = {};
  PERFUMES.forEach((p) => { init[p.id] = true; });
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(init)); } catch {}
  return init;
}

const ProfileSheet = () => {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [stock, setStock] = useState<StockMap>({});
  const [search, setSearch] = useState("");

  useEffect(() => { setStock(loadStock()); }, []);

  const availableCount = useMemo(
    () => Object.values(stock).filter(Boolean).length,
    [stock]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return PERFUMES;
    const q = search.toLowerCase();
    return PERFUMES.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [search]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPin("");
    setAuthenticated(false);
    setPinError(false);
    setSearch("");
  }, []);

  const handlePinDigit = useCallback(
    (d: string) => {
      if (pinError) return;
      const next = pin + d;
      if (next.length < 4) { setPin(next); return; }
      setPin(next);
      if (next === PIN_CODE) {
        setTimeout(() => setAuthenticated(true), 300);
      } else {
        setPinError(true);
        setTimeout(() => { setPin(""); setPinError(false); }, 800);
      }
    },
    [pin, pinError]
  );

  const handlePinDelete = useCallback(() => {
    if (pinError) return;
    setPin((p) => p.slice(0, -1));
  }, [pinError]);

  const toggleStock = useCallback((id: string, value: boolean) => {
    setStock((prev) => {
      const next = { ...prev, [id]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const keys = ["1","2","3","4","5","6","7","8","9","","0","del"] as const;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-center text-amber-500 hover:border-amber-500/50 transition-all shadow-2xl"
      >
        <User size={20} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm"
            />

            {/* Slide panel */}
            <motion.div
              key="panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[301] w-full max-w-2xl bg-[#080808] border-r border-white/5 flex flex-col"
            >
              <AnimatePresence mode="wait">
                {!authenticated ? (
                  /* ── PIN SCREEN ── */
                  <motion.div
                    key="pin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="flex flex-col items-center justify-center h-full px-8 gap-8"
                  >
                    {/* Close */}
                    <button onClick={handleClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
                      <X size={20} />
                    </button>

                    {/* Lock icon */}
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Lock size={28} className="text-amber-500" />
                    </div>

                    <div className="text-center space-y-1">
                      <h2 className="text-white text-lg font-medium tracking-[0.25em] uppercase">
                        Accès Restreint
                      </h2>
                      <p className="text-white/20 text-xs">Entrez votre code PIN</p>
                    </div>

                    {/* Dots */}
                    <div className="flex gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={pinError ? { x: [0, -6, 6, -6, 6, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200 ${
                            pinError
                              ? "border-red-500 bg-red-500"
                              : i < pin.length
                              ? "border-amber-500 bg-amber-500"
                              : "border-white/20 bg-transparent"
                          }`}
                        />
                      ))}
                    </div>

                    {pinError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs"
                      >
                        Code incorrect
                      </motion.p>
                    )}

                    {/* Numpad */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
                      {keys.map((k, i) => {
                        if (k === "") return <div key={i} />;
                        if (k === "del")
                          return (
                            <button
                              key="del"
                              onClick={handlePinDelete}
                              className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:border-amber-500/40 hover:text-amber-400 transition-colors"
                            >
                              <Delete size={18} />
                            </button>
                          );
                        return (
                          <button
                            key={k}
                            onClick={() => handlePinDigit(k)}
                            className="aspect-square rounded-2xl bg-white/5 border border-white/10 text-white text-lg font-medium hover:border-amber-500/40 hover:bg-amber-500/5 transition-colors"
                          >
                            {k}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  /* ── STOCK SCREEN ── */
                  <motion.div
                    key="stock"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-5 border-b border-white/5">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Package size={18} className="text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-white text-sm font-semibold tracking-wide">
                          Gestion du Stock
                        </h2>
                        <p className="text-amber-500/50 text-[11px]">
                          {availableCount}/{PERFUMES.length} disponibles
                        </p>
                      </div>
                      <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                        <X size={20} />
                      </button>
                    </div>

                    {/* Search */}
                    <div className="px-5 py-3">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Rechercher un parfum..."
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto px-5 pb-5">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {filtered.map((p) => {
                          const inStock = stock[p.id] !== false;
                          return (
                            <div
                              key={p.id}
                              className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
                            >
                              {/* Image */}
                              <div className="relative h-36 bg-zinc-900 flex items-center justify-center">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  draggable={false}
                                  className={`h-full w-full object-contain mix-blend-lighten p-3 transition-all ${
                                    !inStock ? "blur-sm opacity-30" : ""
                                  }`}
                                />
                                {!inStock && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                      Épuisé
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="p-3 space-y-2">
                                <p className="text-[9px] uppercase tracking-widest text-white/30">
                                  {p.brand}
                                </p>
                                <p className="text-[11px] font-medium text-white line-clamp-1">
                                  {p.name}
                                </p>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => toggleStock(p.id, true)}
                                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-colors ${
                                      inStock
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                        : "bg-white/[0.03] border-white/10 text-white/20 hover:border-emerald-500/30 hover:text-emerald-400/60"
                                    }`}
                                  >
                                    <CheckCircle size={10} /> Stock
                                  </button>
                                  <button
                                    onClick={() => toggleStock(p.id, false)}
                                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-colors ${
                                      !inStock
                                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                                        : "bg-white/[0.03] border-white/10 text-white/20 hover:border-red-500/30 hover:text-red-400/60"
                                    }`}
                                  >
                                    <XCircle size={10} /> Épuisé
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileSheet;

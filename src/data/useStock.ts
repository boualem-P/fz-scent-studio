import { useState, useEffect } from "react";

const STORAGE_KEY = "fz_stock_status";

export function useStock() {
  const [stock, setStock] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setStock(JSON.parse(raw));
      } catch {}
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const isAvailable = (perfumeId: string): boolean => {
    if (Object.keys(stock).length === 0) return true;
    return stock[perfumeId] !== false;
  };

  return { isAvailable };
}

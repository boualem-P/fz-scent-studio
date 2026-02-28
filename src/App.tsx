import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PerfumeDetails from "./components/PerfumeDetails"; // On importe ta nouvelle fiche
import { Perfume, perfumes } from "./data/perfumes"; // On importe tes données

const queryClient = new QueryClient();

const App = () => {
  // État pour savoir quel parfum afficher dans le rectangle 40/60
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* On passe la fonction setSelectedPerfume à la page Index pour qu'elle puisse ouvrir un parfum */}
            <Route 
              path="/" 
              element={<Index onOpenPerfume={(p) => setSelectedPerfume(p)} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* AFFICHAGE DE LA FENÊTRE RECTANGULAIRE (40/60) SI UN PARFUM EST SÉLECTIONNÉ */}
        {selectedPerfume && (
          <PerfumeDetails 
            perfume={selectedPerfume} 
            onClose={() => setSelectedPerfume(null)} 
            // Suggestions : On filtre les parfums de la même famille (ex: Boisé)
            relatedPerfumes={perfumes.filter(p => 
              p.family === selectedPerfume.family && p.id !== selectedPerfume.id
            )}
            onSelectRelated={(p) => setSelectedPerfume(p)}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Freelance from "./pages/Freelance";
import FreelanceProfile from "./pages/FreelanceProfile";
import Proximite from "./pages/Proximite";
import Repetiteurs from "./pages/Repetiteurs";
import Livraison from "./pages/Livraison";
import SuiviLivraison from "./pages/SuiviLivraison";
import Emplois from "./pages/Emplois";
import CommentCaMarche from "./pages/CommentCaMarche";
import Tarifs from "./pages/Tarifs";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/freelance/:id" element={<FreelanceProfile />} />
          <Route path="/proximite" element={<Proximite />} />
          <Route path="/repetiteurs" element={<Repetiteurs />} />
          <Route path="/livraison" element={<Livraison />} />
          <Route path="/suivi-livraison" element={<SuiviLivraison />} />
          <Route path="/suivi-livraison/:id" element={<SuiviLivraison />} />
          <Route path="/emplois" element={<Emplois />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

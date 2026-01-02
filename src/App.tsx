import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/MainLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Advisor from "./pages/Advisor";
import Preferences from "./pages/Preferences";
import Analytics from "@/pages/Analytics";
import CreativeHub from "./pages/CreativeHub";
import Competitors from "./pages/Competitors";
import Trends from "./pages/Trends";
import ContentStudio from "./pages/ContentStudio";
import ContentCalendar from "./pages/ContentCalendar";
import BrandArchitect from "./pages/BrandArchitect";
import ViralLab from "./pages/ViralLab";
import AudienceInsights from "./pages/AudienceInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <ToasterSonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/creative" element={<CreativeHub />} />
          <Route path="/competitors" element={<Competitors />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/studio" element={<ContentStudio />} />
          <Route path="/calendar" element={<ContentCalendar />} />
          <Route path="/architect" element={<BrandArchitect />} />
          <Route path="/lab" element={<ViralLab />} />
          <Route path="/audience" element={<AudienceInsights />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

export default App;

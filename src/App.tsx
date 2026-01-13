import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TenantPortal from "./pages/TenantPortal";
import PricingPage from "./pages/PricingPage";
import BailleursSociauxPage from "./pages/BailleursSociauxPage";
import SecurityPage from "./pages/SecurityPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ROIPage from "./pages/ROIPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import AboutPage from "./pages/AboutPage";
import DemoPage from "./pages/DemoPage";
import VideoPage from "./pages/VideoPage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RequestsPage from "./pages/dashboard/RequestsPage";
import NotFound from "./pages/NotFound";

// Tenant Portal Pages
import TenantHome from "./pages/tenant/TenantHome";
import DeclareProblem from "./pages/tenant/DeclareProblem";
import TrackRequest from "./pages/tenant/TrackRequest";
import Confirmation from "./pages/tenant/Confirmation";
import AddUpdate from "./pages/tenant/AddUpdate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/locataire" element={<TenantPortal />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/bailleurs-sociaux" element={<BailleursSociauxPage />} />
          <Route path="/securite" element={<SecurityPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/roi" element={<ROIPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/video" element={<VideoPage />} />
          
          {/* Dynamic Tenant Portal routes */}
          <Route path="/locataire/:bailleurSlug" element={<TenantHome />} />
          <Route path="/locataire/:bailleurSlug/declarer" element={<DeclareProblem />} />
          <Route path="/locataire/:bailleurSlug/suivi" element={<TrackRequest />} />
          <Route path="/locataire/:bailleurSlug/confirmation/:trackingId" element={<Confirmation />} />
          <Route path="/locataire/:bailleurSlug/update/:trackingId" element={<AddUpdate />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="tenants" element={<DashboardPage />} />
            <Route path="providers" element={<DashboardPage />} />
            <Route path="reports" element={<DashboardPage />} />
            <Route path="settings" element={<DashboardPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

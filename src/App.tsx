import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import DataProductsPage from "./pages/DataProductsPage";
import ComparePage from "./pages/ComparePage";
import UseCasesPage from "./pages/UseCasesPage";
import CompliancePage from "./pages/CompliancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<DataProductsPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

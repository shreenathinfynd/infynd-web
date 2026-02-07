import { useState, useEffect } from "react";
import { products, type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building, Users, Info, Shield, Database, Search, CheckCircle, Sparkles, Globe, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LiveProductCanvasProps {
  query: string;
}

const LiveProductCanvas = ({ query }: LiveProductCanvasProps) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [view, setView] = useState<"company" | "contact">("company");
  const [animatedCount, setAnimatedCount] = useState(0);

  const filtered = selectedProduct.coverageRegions.filter(
    (r) => selectedCountry === "all" || r.country === selectedCountry
  );
  const totalFiltered = filtered.reduce((sum, r) => sum + r.records, 0);

  // Animate count
  useEffect(() => {
    setAnimatedCount(0);
    const target = totalFiltered;
    const duration = 800;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedCount(target);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [totalFiltered]);

  const sampleData = view === "company" ? selectedProduct.sampleDataCompany : selectedProduct.sampleDataContact;
  const columns = sampleData.length > 0 ? Object.keys(sampleData[0]) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-8"
    >
      {/* Query echo */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Search className="h-3.5 w-3.5" />
          <span>Results for:</span>
        </div>
        <p className="text-lg font-display font-semibold text-foreground">&ldquo;{query}&rdquo;</p>
      </div>

      {/* Product selector pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedProduct(p); setSelectedCountry("all"); }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedProduct.id === p.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/30"
            }`}
          >
            {p.shortName}
          </button>
        ))}
      </div>

      {/* Live volume + filters */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {/* Volume counter */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Live Volume</div>
            <div className="font-display text-5xl font-bold text-primary">
              {animatedCount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">matching records</div>
            <div className="mt-4">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {selectedProduct.coverageRegions.map((r) => (
                    <SelectItem key={r.country} value={r.country}>{r.country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-1 mt-4 justify-center">
              {selectedProduct.complianceStandards.map((std) => (
                <Badge key={std} variant="secondary" className="text-[10px]">
                  <Shield className="h-2.5 w-2.5 mr-0.5" />{std}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Region cards */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 4).map((region) => (
              <motion.div
                key={region.country}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-sm text-foreground">{region.country}</span>
                    </div>
                    <div className="font-display text-2xl font-bold text-foreground">{region.records.toLocaleString()}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {region.industries.slice(0, 3).map((ind) => (
                        <Badge key={ind} variant="outline" className="text-[10px]">{ind}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Sample data grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-foreground">Sample Data Preview</h3>
          <div className="flex gap-2">
            <Button variant={view === "company" ? "default" : "outline"} size="sm" onClick={() => setView("company")}>
              <Building className="h-3.5 w-3.5 mr-1" /> Company
            </Button>
            <Button variant={view === "contact" ? "default" : "outline"} size="sm" onClick={() => setView("contact")}>
              <Users className="h-3.5 w-3.5 mr-1" /> Contact
            </Button>
          </div>
        </div>
        <div className="rounded-xl border overflow-x-auto bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col}>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help text-xs">
                        {col} <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">Field: <strong>{col}</strong> — Sourced and verified from multiple data providers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col} className="text-sm">{String(row[col])}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">* Sample data shown is anonymised. Actual data includes full details.</p>
      </div>

      {/* Trust Layer - Data Build Process (diagram-led) */}
      <div className="mb-10">
        <h3 className="font-display font-semibold text-lg text-foreground mb-6">Data Build Process</h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {selectedProduct.buildSteps.map((step, i) => (
            <div key={step.step} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-sm">{step.step}</span>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 text-center max-w-[80px] leading-tight">{step.title}</span>
              </div>
              {i < selectedProduct.buildSteps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <CheckCircle className="h-3.5 w-3.5 text-orchestrator-success" />
          <span>Every record passes through all {selectedProduct.buildSteps.length} verification stages</span>
        </div>
      </div>

      {/* Explore full detail */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={() => navigate(`/products/${selectedProduct.slug}`)}
        >
          View Full Product Detail <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LiveProductCanvas;

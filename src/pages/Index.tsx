import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScanningAnimation from "@/components/orchestrator/ScanningAnimation";
import WorldMap from "@/components/orchestrator/WorldMap";
import SegmentSelector from "@/components/orchestrator/SegmentSelector";
import LiveProductCanvas from "@/components/orchestrator/LiveProductCanvas";

type FlowStep = "landing" | "scanning" | "world-map" | "segment" | "canvas";

const promptChips = [
  "Find fintech contacts for B2B prospecting",
  "UK SME commercial data",
  "Compliance support & help desk",
  "Healthcare data for pharma sales",
  "New business leads this month",
  "Global email data coverage",
];

const Index = () => {
  const [step, setStep] = useState<FlowStep>("landing");
  const [query, setQuery] = useState("");

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    setQuery(text.trim());
    setStep("scanning");
  };

  const handleScanComplete = useCallback(() => {
    setStep("world-map");
    // Auto-advance to segment after world map display
    setTimeout(() => setStep("segment"), 2500);
  }, []);

  const handleSegmentSelect = () => {
    setStep("canvas");
  };

  if (step === "canvas") {
    return <LiveProductCanvas query={query} />;
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-20"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
                <Sparkles className="h-3 w-3" />
                AI-Powered Data Intelligence
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                InFynd Intelligence
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Describe your data need and let our AI orchestrator connect you with the right data assets.
              </p>
            </motion.div>

            {/* Command Centre Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full max-w-xl mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(query)}
                  className="w-full h-14 rounded-2xl border bg-card pl-12 pr-28 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 placeholder:text-muted-foreground transition-all"
                  placeholder="Describe your data need..."
                />
                <Button
                  onClick={() => handleSubmit(query)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
                  size="sm"
                >
                  Ask Me
                </Button>
              </div>
            </motion.div>

            {/* Prompt Chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 max-w-2xl"
            >
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => { setQuery(chip); handleSubmit(chip); }}
                  className="px-4 py-2 rounded-full text-sm border bg-card hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
                >
                  {chip}
                </button>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-6 mt-16 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>32 Global Regions</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orchestrator-success" />
                <span>Secure & Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center px-6"
          >
            <ScanningAnimation onComplete={handleScanComplete} />
          </motion.div>
        )}

        {step === "world-map" && (
          <motion.div
            key="world-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Global Site Scan</h2>
            <p className="text-sm text-muted-foreground mb-6">Identifying relevant data regions...</p>
            <WorldMap />
          </motion.div>
        )}

        {step === "segment" && (
          <motion.div
            key="segment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center px-6"
          >
            <SegmentSelector onSelect={handleSegmentSelect} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

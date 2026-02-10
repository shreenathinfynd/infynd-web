import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Search, Shield, Globe, Database, ArrowRight, MapPin, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

type Stage = "idle" | "scanning" | "modules" | "result";

const keywordMap: Record<string, string[]> = {
  postal: ["postal", "mail", "mailing", "direct mail", "catalogue", "address"],
  tele: ["tele", "telemarketing", "phone", "call", "outbound", "tps", "switchboard", "direct dial"],
  email: ["email", "e-mail", "inbox", "newsletter", "email marketing"],
  newbiz: ["new business", "new companies", "startup", "newly incorporated", "new leads"],
  soho: ["soho", "small office", "home office", "micro business", "freelance", "sole trader", "insurance"],
  poi: ["poi", "analytics", "location", "footfall", "points of interest", "geospatial"],
  healthcare: ["healthcare", "health", "pharma", "nhs", "hospital", "medical", "hcp", "doctor"],
  enrichment: ["enrichment", "append", "cleansing", "match", "data quality", "enrich"],
};

const countryKeywords: Record<string, string[]> = {
  "United Kingdom": ["uk", "united kingdom", "britain", "british", "england", "scotland", "wales"],
  "United States": ["us", "usa", "united states", "america", "american"],
  Germany: ["germany", "german", "deutschland"],
  France: ["france", "french"],
  Australia: ["australia", "australian"],
  India: ["india", "indian"],
  Canada: ["canada", "canadian"],
  Ireland: ["ireland", "irish"],
  Singapore: ["singapore"],
  Netherlands: ["netherlands", "dutch", "holland"],
  Spain: ["spain", "spanish"],
  Belgium: ["belgium", "belgian"],
};

const mapPoints: Record<string, { cx: number; cy: number }> = {
  "United Kingdom": { cx: 470, cy: 160 },
  "United States": { cx: 180, cy: 210 },
  Germany: { cx: 505, cy: 180 },
  France: { cx: 480, cy: 200 },
  Australia: { cx: 810, cy: 400 },
  India: { cx: 670, cy: 280 },
  Canada: { cx: 200, cy: 140 },
  Ireland: { cx: 455, cy: 165 },
  Singapore: { cx: 730, cy: 320 },
  Netherlands: { cx: 492, cy: 172 },
  Spain: { cx: 465, cy: 220 },
  Belgium: { cx: 488, cy: 185 },
};

const promptChips = [
  "Show me UK email data for retail",
  "What telemarketing data is TPS screened?",
  "Compare postal vs email coverage",
  "Healthcare data for pharma sales",
  "New business leads this month",
  "SOHO data for insurance",
];

function matchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  const matched: { product: Product; score: number }[] = [];
  for (const product of products) {
    const keywords = keywordMap[product.id] || [];
    let score = 0;
    for (const kw of keywords) { if (q.includes(kw)) score += 2; }
    for (const uc of product.useCases) { if (q.includes(uc.toLowerCase().slice(0, 8))) score += 1; }
    for (const region of product.coverageRegions) {
      for (const ind of region.industries) { if (q.includes(ind.toLowerCase())) score += 1; }
    }
    if (score > 0) matched.push({ product, score });
  }
  matched.sort((a, b) => b.score - a.score);
  if (matched.length === 0) return products.slice(0, 2);
  return matched.slice(0, 3).map((m) => m.product);
}

function matchCountries(query: string): string[] {
  const q = query.toLowerCase();
  const found: string[] = [];
  for (const [country, keywords] of Object.entries(countryKeywords)) {
    for (const kw of keywords) { if (q.includes(kw)) { found.push(country); break; } }
  }
  return found.length > 0 ? found : ["Global"];
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const navigate = useNavigate();

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  const triggerSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    clearTimers();
    setStage("scanning");
    const countries = matchCountries(q);
    setHighlightedCountries(countries);
    setMatchedProducts([]);

    const matched = matchProducts(q);
    const isCompare = q.toLowerCase().includes("compare") ||
      q.toLowerCase().includes("vs") ||
      q.toLowerCase().includes("diff") ||
      q.toLowerCase().includes("better");

    const t1 = setTimeout(() => { setMatchedProducts(matched); setStage("modules"); }, 2000);
    const t2 = setTimeout(() => {
      if (isCompare && matched.length > 0) {
        navigate(`/compare?ids=${matched.map(p => p.id).join(",")}`);
      } else {
        setStage("result");
      }
    }, 3800);
    timersRef.current = [t1, t2];
  }, [navigate]);

  const handleSearch = useCallback(() => { triggerSearch(query); }, [query, triggerSearch]);

  const handleChip = (chip: string) => { setQuery(chip); triggerSearch(chip); };

  const handleReset = () => {
    clearTimers();
    setStage("idle");
    setQuery("");
    setHighlightedCountries([]);
    setMatchedProducts([]);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {/* ─── IDLE: Hero + Search ─── */}
        {stage === "idle" && (
          <motion.section
            key="page-idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden py-20 lg:py-28 px-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
            <div className="relative max-w-4xl mx-auto text-center">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                Explore data by asking,{" "}<span className="text-primary">not browsing</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                The unified product experience platform for B2B data. Explore, compare, and understand every dataset — no sales call needed.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="relative max-w-xl mx-auto mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    className="w-full h-14 rounded-2xl border bg-card pl-12 pr-32 text-base shadow-lg shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                    placeholder="Ask anything about our data products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl h-10 px-5 gap-2" disabled={!query.trim()}>
                    <Sparkles className="h-4 w-4" /> Ask me
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap justify-center gap-2 mt-4">
                {promptChips.map((chip) => (
                  <button key={chip} onClick={() => handleChip(chip)}
                    className="px-4 py-2 rounded-full text-sm bg-card border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                    {chip}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ─── STAGE 1: Scanning ─── */}
        {stage === "scanning" && (
          <motion.section
            key="page-scanning"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="min-h-[80vh] flex items-center justify-center px-6 py-16"
          >
            <div className="w-full max-w-4xl">
              <div className="bg-card rounded-2xl border shadow-2xl p-8 overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-base font-semibold text-foreground">Scanning global coverage</span>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-auto" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">Searching: <span className="text-foreground font-medium">"{query}"</span></p>

                <svg viewBox="0 0 960 500" className="w-full h-auto">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--muted))" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="960" height="500" fill="url(#grid)" />
                  <ellipse cx="200" cy="190" rx="120" ry="90" fill="hsl(var(--muted))" opacity="0.15" />
                  <ellipse cx="260" cy="370" rx="60" ry="80" fill="hsl(var(--muted))" opacity="0.15" />
                  <ellipse cx="490" cy="180" rx="60" ry="50" fill="hsl(var(--muted))" opacity="0.15" />
                  <ellipse cx="500" cy="320" rx="60" ry="80" fill="hsl(var(--muted))" opacity="0.15" />
                  <ellipse cx="680" cy="220" rx="120" ry="80" fill="hsl(var(--muted))" opacity="0.15" />
                  <ellipse cx="810" cy="390" rx="50" ry="35" fill="hsl(var(--muted))" opacity="0.15" />
                  {Object.entries(mapPoints).map(([country, pos]) => {
                    const isHighlighted = highlightedCountries.includes(country) || highlightedCountries.includes("Global");
                    return (
                      <g key={country}>
                        {isHighlighted && (
                          <>
                            <motion.circle cx={pos.cx} cy={pos.cy} r={4} fill="hsl(var(--primary))" initial={{ r: 4, opacity: 0.8 }} animate={{ r: 28, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }} />
                            <motion.circle cx={pos.cx} cy={pos.cy} r={4} fill="hsl(var(--primary))" initial={{ r: 4, opacity: 0.6 }} animate={{ r: 18, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.3 }} />
                          </>
                        )}
                        <circle cx={pos.cx} cy={pos.cy} r={isHighlighted ? 6 : 3} fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} opacity={isHighlighted ? 1 : 0.3} />
                        {isHighlighted && (
                          <text x={pos.cx} y={pos.cy - 14} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">{country}</text>
                        )}
                      </g>
                    );
                  })}
                  <motion.line x1={0} y1={0} x2={0} y2={500} stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" initial={{ x1: 0, x2: 0 }} animate={{ x1: 960, x2: 960 }} transition={{ duration: 1.8, ease: "easeInOut" }} />
                </svg>

                <div className="mt-4 flex items-center gap-2">
                  {highlightedCountries.map((c) => (
                    <Badge key={c} variant="outline" className="text-xs gap-1.5 animate-fade-in"><MapPin className="h-3 w-3 text-primary" /> {c}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── STAGE 2: Modules ─── */}
        {stage === "modules" && (
          <motion.section
            key="page-modules"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="min-h-[80vh] flex items-center justify-center px-6 py-16"
          >
            <div className="w-full max-w-4xl">
              <div className="bg-card rounded-2xl border shadow-2xl p-8 text-left">
                <div className="flex items-center gap-2 mb-6">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="text-base font-semibold text-foreground">Fetching matching product modules</span>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-auto" />
                </div>
                <p className="text-sm text-muted-foreground mb-6">Analysing: <span className="text-foreground font-medium">"{query}"</span></p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {matchedProducts.map((product, i) => (
                    <motion.div key={product.id} initial={{ opacity: 0, x: -30, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: i * 0.2, type: "spring", stiffness: 180, damping: 14 }}>
                      <div className="flex items-center gap-3 bg-secondary/50 border rounded-xl px-5 py-3">
                        <span className="h-3 w-3 rounded-full bg-primary animate-pulse shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.totalRecords} records · {product.countries} countries</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {highlightedCountries.map((c, i) => (
                    <motion.div key={c} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                      <Badge variant="outline" className="px-3 py-1.5 text-xs gap-1.5"><MapPin className="h-3 w-3 text-primary" /> {c}</Badge>
                    </motion.div>
                  ))}
                  {matchedProducts.flatMap(p => p.complianceStandards.slice(0, 1)).filter((v, i, a) => a.indexOf(v) === i).map((std, i) => (
                    <motion.div key={std} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                      <Badge variant="secondary" className="px-3 py-1.5 text-xs gap-1"><Shield className="h-3 w-3" /> {std}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── STAGE 3: Results ─── */}
        {stage === "result" && (
          <motion.section
            key="page-result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[80vh] flex items-center justify-center px-6 py-16"
          >
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-base font-semibold text-foreground">Recommended data products</span>
                </div>
                <button onClick={handleReset} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <RotateCcw className="h-4 w-4" /> New search
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedProducts.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}>
                    <Link to={`/products/${product.slug}`} className="block bg-card rounded-xl border p-5 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 group">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.tagline}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="text-xs">{product.totalRecords} records</Badge>
                        <Badge variant="outline" className="text-xs">{product.countries} countries</Badge>
                        {product.complianceStandards.slice(0, 2).map((c) => (
                          <Badge key={c} variant="secondary" className="text-xs gap-1"><Shield className="h-3 w-3" /> {c}</Badge>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

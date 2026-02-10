import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, ArrowRight, MapPin, Globe, Database, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

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

const mapPoints: Record<string, { cx: number; cy: number; align?: "top" | "bottom" | "left" | "right" }> = {
  "United Kingdom": { cx: 460, cy: 190, align: "top" },
  "United States": { cx: 240, cy: 260, align: "left" },
  Germany: { cx: 510, cy: 210, align: "right" },
  France: { cx: 475, cy: 240, align: "bottom" },
  Australia: { cx: 780, cy: 450, align: "bottom" },
  India: { cx: 640, cy: 300, align: "bottom" },
  Canada: { cx: 200, cy: 160, align: "top" },
  Ireland: { cx: 435, cy: 195, align: "left" },
  Singapore: { cx: 700, cy: 350, align: "right" },
  Netherlands: { cx: 490, cy: 185, align: "top" },
  Spain: { cx: 455, cy: 280, align: "bottom" },
  Belgium: { cx: 485, cy: 215, align: "right" },
};

function matchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  const matched: { product: Product; score: number }[] = [];
  for (const product of products) {
    const keywords = keywordMap[product.id] || [];
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw)) score += 2;
    }
    for (const uc of product.useCases) {
      if (q.includes(uc.toLowerCase().slice(0, 8))) score += 1;
    }
    for (const region of product.coverageRegions) {
      for (const ind of region.industries) {
        if (q.includes(ind.toLowerCase())) score += 1;
      }
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
    for (const kw of keywords) {
      if (q.includes(kw)) {
        found.push(country);
        break;
      }
    }
  }
  return found.length > 0 ? found : ["United Kingdom"];
}

interface SearchExperienceProps {
  externalQuery?: string;
}

const SearchExperience = ({ externalQuery }: SearchExperienceProps) => {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const triggerSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    clearTimers();

    setStage("scanning");
    const countries = matchCountries(q);
    setHighlightedCountries(countries);
    setMatchedProducts([]);

    const t1 = setTimeout(() => {
      const prods = matchProducts(q);
      setMatchedProducts(prods);
      setStage("modules");
    }, 2000);

    const t2 = setTimeout(() => {
      setStage("result");
    }, 3800);

    timersRef.current = [t1, t2];
  }, []);

  const handleSearch = useCallback(() => {
    triggerSearch(query);
  }, [query, triggerSearch]);

  // Handle external query from prompt chips (format: "text_timestamp")
  useEffect(() => {
    if (externalQuery) {
      const actualQuery = externalQuery.replace(/_\d+$/, "");
      setQuery(actualQuery);
      triggerSearch(actualQuery);
    }
  }, [externalQuery, triggerSearch]);

  const handleReset = () => {
    clearTimers();
    setStage("idle");
    setQuery("");
    setHighlightedCountries([]);
    setMatchedProducts([]);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <AnimatePresence mode="wait">
      {stage === "idle" && (
        <motion.div
          key="screen-idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              className="w-full h-14 rounded-2xl border bg-card pl-12 pr-32 text-base shadow-lg shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              placeholder="Ask anything about our data products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl h-10 px-5 gap-2"
              disabled={!query.trim()}
            >
              <Sparkles className="h-4 w-4" />
              Ask me
            </Button>
          </div>
        </motion.div>
      )}

      {stage === "scanning" && (
        <motion.div
          key="screen-scanning"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl border shadow-2xl p-8 overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-foreground">
                Scanning global coverage
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-auto"
              />
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Searching: <span className="text-foreground font-medium">"{query}"</span>
            </p>

            <svg viewBox="0 0 960 600" className="w-full h-auto">
              <defs>
                <radialGradient id="globe-gradient" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Globe Background */}
              <circle cx="480" cy="300" r="280" fill="url(#globe-gradient)" opacity="0.5" />
              <circle cx="480" cy="300" r="280" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
              <ellipse cx="480" cy="300" rx="280" ry="100" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
              <ellipse cx="480" cy="300" rx="280" ry="200" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
              <line x1="480" y1="20" x2="480" y2="580" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
              <path d="M 200 300 Q 480 50 760 300" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
              <path d="M 200 300 Q 480 550 760 300" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />

              {/* Simplified Continents (Abstract) */}
              <path d="M 180 140 Q 250 120 300 180 T 260 280 T 180 260 Z" fill="hsl(var(--muted))" opacity="0.1" /> {/* NA */}
              <path d="M 420 160 Q 480 140 540 180 T 520 260 T 450 280 T 420 240 Z" fill="hsl(var(--muted))" opacity="0.1" /> {/* EU */}
              <path d="M 600 240 Q 700 200 780 280 T 700 380 T 620 320 Z" fill="hsl(var(--muted))" opacity="0.1" /> {/* AS */}
              <path d="M 750 420 Q 800 400 840 440 T 800 480 T 740 460 Z" fill="hsl(var(--muted))" opacity="0.1" /> {/* AU */}

              {Object.entries(mapPoints).map(([country, pos]) => {
                const isHighlighted = highlightedCountries.includes(country);

                // Label positioning logic
                let labelX = pos.cx;
                let labelY = pos.cy - 14;
                let textAnchor = "middle";

                if (pos.align === "bottom") { labelY = pos.cy + 20; }
                if (pos.align === "left") { labelX = pos.cx - 12; labelY = pos.cy + 4; textAnchor = "end"; }
                if (pos.align === "right") { labelX = pos.cx + 12; labelY = pos.cy + 4; textAnchor = "start"; }

                return (
                  <g key={country}>
                    {isHighlighted && (
                      <>
                        <motion.circle cx={pos.cx} cy={pos.cy} r={4} fill="hsl(var(--primary))"
                          initial={{ r: 4, opacity: 0.8 }} animate={{ r: 28, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }} />
                        <motion.circle cx={pos.cx} cy={pos.cy} r={4} fill="hsl(var(--primary))"
                          initial={{ r: 4, opacity: 0.6 }} animate={{ r: 18, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.3 }} />
                      </>
                    )}
                    <circle cx={pos.cx} cy={pos.cy} r={isHighlighted ? 6 : 3}
                      fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                      opacity={isHighlighted ? 1 : 0.4} />
                    {isHighlighted && (
                      <text x={labelX} y={labelY} textAnchor={textAnchor}
                        fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">
                        {country}
                      </text>
                    )}
                  </g>
                );
              })}

              <motion.line x1={0} y1={0} x2={0} y2={600}
                stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4"
                initial={{ x1: 0, x2: 0 }} animate={{ x1: 960, x2: 960 }}
                transition={{ duration: 1.8, ease: "easeInOut" }} />
            </svg>

            <div className="mt-4 flex items-center gap-2">
              {highlightedCountries.map((c) => (
                <Badge key={c} variant="outline" className="text-xs gap-1.5 animate-fade-in">
                  <MapPin className="h-3 w-3 text-primary" /> {c}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {stage === "modules" && (
        <motion.div
          key="screen-modules"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl border shadow-2xl p-8 text-left">
            <div className="flex items-center gap-2 mb-6">
              <Database className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-foreground">
                Fetching matching product modules
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-auto"
              />
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Analysing: <span className="text-foreground font-medium">"{query}"</span>
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {matchedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -30, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 180, damping: 14 }}
                >
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
                <motion.div key={c} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}>
                  <Badge variant="outline" className="px-3 py-1.5 text-xs gap-1.5">
                    <MapPin className="h-3 w-3 text-primary" /> {c}
                  </Badge>
                </motion.div>
              ))}
              {matchedProducts.flatMap(p => p.complianceStandards.slice(0, 1)).filter((v, i, a) => a.indexOf(v) === i).map((std, i) => (
                <motion.div key={std} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}>
                  <Badge variant="secondary" className="px-3 py-1.5 text-xs gap-1">
                    <Shield className="h-3 w-3" /> {std}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {stage === "result" && (
        <motion.div
          key="screen-result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-foreground">
                Recommended data products
              </span>
            </div>
            <button onClick={handleReset}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4" /> New search
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="block bg-card rounded-xl border p-5 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs">{product.totalRecords} records</Badge>
                    <Badge variant="outline" className="text-xs">{product.countries} countries</Badge>
                    {product.complianceStandards.slice(0, 2).map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs gap-1">
                        <Shield className="h-3 w-3" /> {c}
                      </Badge>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchExperience;

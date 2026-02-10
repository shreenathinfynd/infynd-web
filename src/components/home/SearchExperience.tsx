import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, ArrowRight, MapPin, Globe, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, Product } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

type Stage = "idle" | "scanning" | "modules" | "result";

// Keyword→product matching
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

// Simple SVG map points for countries
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

function matchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  const matched: { product: Product; score: number }[] = [];
  for (const product of products) {
    const keywords = keywordMap[product.id] || [];
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw)) score += 2;
    }
    // Check use cases and industries
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
  if (matched.length === 0) {
    // Default: return first 2
    return products.slice(0, 2);
  }
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
  return found.length > 0 ? found : ["United Kingdom"]; // default UK
}

const iconMap: Record<string, React.ElementType> = {
  Mail: Database,
  Phone: Database,
  AtSign: Database,
  Rocket: Database,
  Home: Database,
  MapPin: MapPin,
  Heart: Database,
  Sparkles: Sparkles,
};

const SearchExperience = () => {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  const handleSearch = useCallback(() => {
    const q = query.trim();
    if (!q) return;

    // Reset
    setStage("scanning");
    const countries = matchCountries(q);
    setHighlightedCountries(countries);

    // Stage B after 1.5s
    setTimeout(() => {
      const prods = matchProducts(q);
      setMatchedProducts(prods);
      setStage("modules");
    }, 1800);

    // Stage C after 3.5s
    setTimeout(() => {
      setStage("result");
    }, 3500);
  }, [query]);

  const handleReset = () => {
    setStage("idle");
    setQuery("");
    setHighlightedCountries([]);
    setMatchedProducts([]);
  };

  return (
    <div className="space-y-8">
      {/* Search Bar with Ask Me button */}
      <div className="relative max-w-xl mx-auto">
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
          disabled={!query.trim() || stage === "scanning"}
        >
          <Sparkles className="h-4 w-4" />
          Ask me
        </Button>
      </div>

      {/* Staged Animation Area */}
      <AnimatePresence mode="wait">
        {stage !== "idle" && (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Stage A: Map Scan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-card rounded-2xl border shadow-lg p-6 mb-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {stage === "scanning" ? "Scanning global coverage..." : "Coverage identified"}
                </span>
                {stage === "scanning" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full"
                  />
                )}
              </div>

              {/* Simple World Map SVG */}
              <svg viewBox="0 0 960 500" className="w-full h-48 md:h-64">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--muted))" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="960" height="500" fill="url(#grid)" />

                {/* Continent outlines (simplified) */}
                {/* North America */}
                <ellipse cx="200" cy="190" rx="120" ry="90" fill="hsl(var(--muted))" opacity="0.15" />
                {/* South America */}
                <ellipse cx="260" cy="370" rx="60" ry="80" fill="hsl(var(--muted))" opacity="0.15" />
                {/* Europe */}
                <ellipse cx="490" cy="180" rx="60" ry="50" fill="hsl(var(--muted))" opacity="0.15" />
                {/* Africa */}
                <ellipse cx="500" cy="320" rx="60" ry="80" fill="hsl(var(--muted))" opacity="0.15" />
                {/* Asia */}
                <ellipse cx="680" cy="220" rx="120" ry="80" fill="hsl(var(--muted))" opacity="0.15" />
                {/* Australia */}
                <ellipse cx="810" cy="390" rx="50" ry="35" fill="hsl(var(--muted))" opacity="0.15" />

                {/* All country dots */}
                {Object.entries(mapPoints).map(([country, pos]) => {
                  const isHighlighted = highlightedCountries.includes(country);
                  return (
                    <g key={country}>
                      {/* Ping animation for highlighted */}
                      {isHighlighted && (
                        <>
                          <motion.circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={4}
                            fill="hsl(var(--primary))"
                            initial={{ r: 4, opacity: 0.8 }}
                            animate={{ r: 25, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                          />
                          <motion.circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r={4}
                            fill="hsl(var(--primary))"
                            initial={{ r: 4, opacity: 0.6 }}
                            animate={{ r: 18, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.3 }}
                          />
                        </>
                      )}
                      <circle
                        cx={pos.cx}
                        cy={pos.cy}
                        r={isHighlighted ? 6 : 3}
                        fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                        opacity={isHighlighted ? 1 : 0.3}
                      />
                      {isHighlighted && (
                        <text
                          x={pos.cx}
                          y={pos.cy - 12}
                          textAnchor="middle"
                          fill="hsl(var(--foreground))"
                          fontSize="11"
                          fontWeight="600"
                        >
                          {country}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Scan line animation */}
                {stage === "scanning" && (
                  <motion.line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={500}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    opacity="0.3"
                    initial={{ x1: 0, x2: 0 }}
                    animate={{ x1: 960, x2: 960 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                )}
              </svg>
            </motion.div>

            {/* Stage B: Product Module Tags */}
            <AnimatePresence>
              {(stage === "modules" || stage === "result") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Matching product modules...
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchedProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                      >
                        <Badge
                          variant="secondary"
                          className="px-4 py-2 text-sm gap-2 cursor-default"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          {product.shortName}
                          <span className="text-muted-foreground font-normal">
                            {product.totalRecords}
                          </span>
                        </Badge>
                      </motion.div>
                    ))}
                    {highlightedCountries.map((c, i) => (
                      <motion.div
                        key={c}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Badge variant="outline" className="px-3 py-2 text-sm gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {c}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage C: Final Product Cards */}
            <AnimatePresence>
              {stage === "result" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Recommended for you
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      New search
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
                          className="block bg-card rounded-xl border p-5 hover:shadow-lg hover:border-primary/30 transition-all group"
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
                            <Badge variant="outline" className="text-xs">
                              {product.totalRecords} records
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.countries} countries
                            </Badge>
                            {product.complianceStandards.slice(0, 2).map((c) => (
                              <Badge key={c} variant="secondary" className="text-xs gap-1">
                                <Shield className="h-3 w-3" />
                                {c}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchExperience;

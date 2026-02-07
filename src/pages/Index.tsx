import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { products, type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Shield, Globe, Database, Sparkles, ArrowRight, Columns2 } from "lucide-react";
import { motion } from "framer-motion";
import { parseQuery } from "@/lib/queryParser";
import NodePulseMap from "@/components/query/NodePulseMap";
import SegmentMorph from "@/components/query/SegmentMorph";
import ModuleStack from "@/components/query/ModuleStack";
import DataDictionaryPanel from "@/components/query/DataDictionaryPanel";
import SmartComparison from "@/components/query/SmartComparison";
import SecurePurge from "@/components/query/SecurePurge";

const promptChips = [
  "Show me UK email data for retail",
  "What telemarketing data is TPS screened?",
  "Compare postal vs email coverage",
  "Healthcare data for pharma sales",
  "New business leads this month",
  "SOHO data for insurance",
];

const trustStats = [
  { icon: Database, value: "180M+", label: "Total Records" },
  { icon: Globe, value: "52", label: "Countries" },
  { icon: Shield, value: "GDPR", label: "Compliant" },
  { icon: Sparkles, value: "99.2%", label: "Accuracy Rate" },
];

const Index = () => {
  const [query, setQuery] = useState("");
  const [hasQueried, setHasQueried] = useState(false);
  const [dictProduct, setDictProduct] = useState<Product | null>(null);
  const [dictOpen, setDictOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const intent = useMemo(() => (query.length > 2 ? parseQuery(query) : null), [query]);

  const handleInput = useCallback((value: string) => {
    setQuery(value);
    if (value.length > 2) setHasQueried(true);
  }, []);

  const handleChip = useCallback((chip: string) => {
    setQuery(chip);
    setHasQueried(true);
  }, []);

  const handlePurge = useCallback(() => {
    setQuery("");
    setHasQueried(false);
    setCompareOpen(false);
    setDictOpen(false);
    setDictProduct(null);
  }, []);

  const openDictionary = useCallback((product: Product) => {
    setDictProduct(product);
    setDictOpen(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Explore data by asking,{" "}
            <span className="text-primary">not browsing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Type your query below — we'll surface the right datasets, regions, and fields instantly.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-xl mx-auto mb-6"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              className="w-full h-14 rounded-2xl border bg-card pl-12 pr-4 text-base shadow-lg shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              placeholder="Ask anything about our data products..."
              value={query}
              onChange={(e) => handleInput(e.target.value)}
            />
          </motion.div>

          {/* Prompt Chips */}
          {!hasQueried && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {promptChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  className="px-4 py-2 rounded-full text-sm bg-card border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
                >
                  {chip}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Query Results Area */}
      {hasQueried && intent && (
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Controls bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <SegmentMorph segment={intent.segment} />
              <div className="flex items-center gap-2">
                {intent.matchedProducts.length >= 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCompareOpen(!compareOpen)}
                    className="gap-2"
                  >
                    <Columns2 className="h-4 w-4" />
                    {compareOpen ? "Close Compare" : "Compare Top 2"}
                  </Button>
                )}
                <SecurePurge onPurge={handlePurge} />
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left: Map + Comparison */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-xl border bg-card p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                    Node Pulse — Region Detection
                  </div>
                  <NodePulseMap activeRegion={intent.region} />
                  {intent.region && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-center"
                    >
                      <Badge className="bg-primary/10 text-primary border-primary/20">{intent.region}</Badge>
                    </motion.div>
                  )}
                </div>

                {compareOpen && intent.matchedProducts.length >= 2 && (
                  <SmartComparison
                    products={intent.matchedProducts.slice(0, 2)}
                    open={compareOpen}
                    onClose={() => setCompareOpen(false)}
                  />
                )}
              </div>

              {/* Right: Module Stack */}
              <div className="lg:col-span-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                  Module Stack — {intent.matchedProducts.length} active layer{intent.matchedProducts.length !== 1 ? "s" : ""}
                </div>
                <ModuleStack
                  products={intent.matchedProducts}
                  onOpenDictionary={openDictionary}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Banner */}
      <section className="border-y bg-card py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Universe Grid - shown when no query */}
      {!hasQueried && (
        <section className="py-16 lg:py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">Our Data Products</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Eight comprehensive datasets covering every B2B outreach channel, from postal to digital.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product, i) => {
                const Icon = { Mail: Search, Phone: Search, AtSign: Search, Rocket: Search, Home: Search, MapPin: Search, Heart: Search, Sparkles }[product.icon] as React.ElementType || Sparkles;
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link to={`/products/${product.slug}`}>
                      <div className="group rounded-xl border bg-card p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-1">{product.shortName}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.tagline}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{product.totalRecords}</Badge>
                          <Badge variant="outline" className="text-xs">{product.countries} countries</Badge>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Not sure which product you need?
          </h2>
          <p className="text-muted-foreground mb-8">
            Use our guided explorer or chat with our assistant to find the perfect dataset.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/use-cases">
                Explore Use Cases <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">Request a Sample</Button>
          </div>
        </div>
      </section>

      {/* Data Dictionary Panel */}
      <DataDictionaryPanel product={dictProduct} open={dictOpen} onClose={() => setDictOpen(false)} />
    </div>
  );
};

export default Index;

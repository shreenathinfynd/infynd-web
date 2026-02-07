import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles, Search, Shield, Globe, Database, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

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
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-6">
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
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The unified product experience platform for B2B data. Explore, compare, and understand every dataset — no sales call needed.
          </motion.p>

          {/* Search / Ask Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-xl mx-auto mb-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              className="w-full h-14 rounded-2xl border bg-card pl-12 pr-4 text-base shadow-lg shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              placeholder="Ask anything about our data products..."
            />
          </motion.div>

          {/* Prompt Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {promptChips.map((chip) => (
              <button
                key={chip}
                className="px-4 py-2 rounded-full text-sm bg-card border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
              >
                {chip}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

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

      {/* Product Universe Grid */}
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
              const Icon = iconMap[product.icon] || Sparkles;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
                      <CardContent className="p-5">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-1">{product.shortName}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.tagline}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">{product.totalRecords}</Badge>
                          <Badge variant="outline" className="text-xs">{product.countries} countries</Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {product.complianceStandards.slice(0, 2).map((std) => (
                            <span key={std} className="inline-flex items-center text-[10px] text-infynd-teal">
                              <Shield className="h-3 w-3 mr-0.5" />
                              {std}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles, Search, Shield, Globe, Database, ArrowRight, Building2, Users, Layers, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import infyndLogo from "@/assets/infynd-logo.png";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

const dataCategories = [
  {
    title: "B2B Data",
    description: "Access verified business data to target prospects and boost sales.",
    icon: Building2,
  },
  {
    title: "B2C Data",
    description: "Understand consumer trends to power smarter marketing campaigns.",
    icon: Users,
  },
  {
    title: "Personalised Custom Build Data",
    description: "Get datasets tailored to your unique business goals and needs.",
    icon: Layers,
  },
  {
    title: "Industry Based Data",
    description: "Use sector-specific insights to refine and focus your strategy.",
    icon: BarChart3,
  },
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
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Trusted by 500+ companies worldwide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]"
          >
            Explore data by asking,{" "}
            <span className="text-primary">not browsing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
          >
            The unified product experience platform for B2B data. Explore, compare, and understand every dataset — no sales call needed.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              className="w-full h-13 rounded-full border bg-background pl-12 pr-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
              placeholder="Ask anything about our data products..."
            />
          </motion.div>
        </div>
      </section>

      {/* Data Categories — clean list style like reference */}
      <section className="py-16 px-6 border-t">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0 divide-y">
            {dataCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-4 py-6"
              >
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="border-y bg-secondary/50 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-display font-bold text-2xl text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Our Data Products</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Eight comprehensive datasets covering every B2B outreach channel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, i) => {
              const Icon = iconMap[product.icon] || Sparkles;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <div className="group rounded-xl border bg-card p-5 hover:border-primary/20 hover:shadow-md transition-all duration-200 h-full">
                      <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-sm text-foreground mb-1">{product.shortName}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{product.tagline}</p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="secondary" className="text-[10px] px-2 py-0">{product.totalRecords}</Badge>
                        <Badge variant="outline" className="text-[10px] px-2 py-0">{product.countries} countries</Badge>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {product.complianceStandards.slice(0, 2).map((std) => (
                          <span key={std} className="inline-flex items-center text-[10px] text-primary/70">
                            <Shield className="h-3 w-3 mr-0.5" />
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Not sure which product you need?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Use our guided explorer or compare products side-by-side.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/use-cases">
                Explore Use Cases <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
              <Link to="/compare">Compare Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

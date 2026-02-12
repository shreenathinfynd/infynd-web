import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

const ProductEvolutionSlide = () => (
  <section className="min-h-screen flex items-center py-20 px-6 bg-muted/30">
    <div className="max-w-6xl mx-auto w-full">
      {/* Phase Marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          3
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Designed for Modern Go-To-Market
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Products shaped by how revenue teams actually work.
        </p>

        {/* Universe Cards */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          {[
            { name: "Global Universe", tagline: "28+ countries, 50M+ records across every major market", records: "50M+", countries: 28, icon: Sparkles, slug: "global-b2b-data" },
            { name: "UK Universe", tagline: "The most comprehensive UK B2B dataset available", records: "6M+", countries: 1, icon: Home, slug: "uk-b2b-data" },
            { name: "Ireland Universe", tagline: "Complete coverage of the Irish business landscape", records: "318K+", countries: 1, icon: MapPin, slug: "ireland-b2b-data" },
          ].map((universe, i) => (
            <motion.div
              key={universe.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
            >
              <Link to={`/products/${universe.slug}`} state={{ fromPresentation: true }} className="block h-full">
                <Card className="relative h-full transition-all duration-300 cursor-pointer group hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors duration-300">
                        <universe.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{universe.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{universe.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      <Badge variant="secondary" className="text-[10px]">{universe.records}</Badge>
                      <Badge variant="outline" className="text-[10px]">{universe.countries} {universe.countries === 1 ? 'country' : 'countries'}</Badge>
                    </div>
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Explore universe <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter(p => !p.id.includes('universe')).map((product, i) => {
            const Icon = iconMap[product.icon] || Sparkles;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
              >
                <Link to={`/products/${product.slug}`} state={{ fromPresentation: true }} className="block h-full">
                  <Card className="relative h-full transition-all duration-300 cursor-pointer group hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{product.shortName}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{product.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        <Badge variant="secondary" className="text-[10px]">{product.totalRecords}</Badge>
                        <Badge variant="outline" className="text-[10px]">{product.countries} countries</Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.complianceStandards.slice(0, 2).map((std) => (
                          <span key={std} className="inline-flex items-center text-[10px] text-primary/70">
                            <Shield className="h-3 w-3 mr-0.5" />{std}
                          </span>
                        ))}
                      </div>

                      <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Explore product <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
        >
          "Every product was shaped by how revenue teams actually work."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default ProductEvolutionSlide;

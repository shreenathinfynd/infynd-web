import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

interface ModuleStackProps {
  products: Product[];
  onOpenDictionary: (product: Product) => void;
  className?: string;
}

const ModuleStack = ({ products, onOpenDictionary, className }: ModuleStackProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <AnimatePresence mode="popLayout">
        {products.map((product, i) => {
          const Icon = iconMap[product.icon] || Sparkles;
          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.08 }}
              className="group relative rounded-xl border bg-card p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Link
                      to={`/products/${product.slug}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors truncate"
                    >
                      {product.shortName}
                    </Link>
                    <Badge variant="secondary" className="text-[10px] shrink-0">{product.totalRecords}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{product.tagline}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px]">{product.countries} countries</Badge>
                    {product.complianceStandards.slice(0, 2).map((std) => (
                      <span key={std} className="inline-flex items-center text-[10px] text-muted-foreground">
                        <Shield className="h-3 w-3 mr-0.5 text-infynd-teal" />
                        {std}
                      </span>
                    ))}
                    <button
                      onClick={(e) => { e.preventDefault(); onOpenDictionary(product); }}
                      className="ml-auto text-[10px] text-primary hover:underline"
                    >
                      Data Dictionary →
                    </button>
                  </div>
                </div>
              </div>

              {/* Active layer indicator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary origin-left"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {products.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Type a query to discover relevant data products...
        </div>
      )}
    </div>
  );
};

export default ModuleStack;

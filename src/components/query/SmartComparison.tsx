import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Shield, Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

interface SmartComparisonProps {
  products: Product[];
  open: boolean;
  onClose: () => void;
  className?: string;
}

const SmartComparison = ({ products, open, onClose, className }: SmartComparisonProps) => {
  if (!open || products.length < 2) return null;

  const left = products[0];
  const right = products[1];

  // Find overlapping countries
  const leftCountries = new Set(left.coverageRegions.map((r) => r.country));
  const rightCountries = new Set(right.coverageRegions.map((r) => r.country));
  const overlap = [...leftCountries].filter((c) => rightCountries.has(c));

  const rows = [
    { label: "Total Records", left: left.totalRecords, right: right.totalRecords },
    { label: "Countries", left: left.countries.toString(), right: right.countries.toString() },
    { label: "Compliance", left: left.complianceStandards.join(", "), right: right.complianceStandards.join(", ") },
    { label: "Fields Available", left: left.dataDictionary.length.toString(), right: right.dataDictionary.length.toString() },
  ];

  const LeftIcon = iconMap[left.icon] || Sparkles;
  const RightIcon = iconMap[right.icon] || Sparkles;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={cn("rounded-xl border bg-card overflow-hidden", className)}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <span className="text-sm font-semibold text-foreground">Smart Comparison</span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 divide-x">
          {/* Headers */}
          <div className="p-4 flex items-center gap-3 border-b">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <LeftIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm text-foreground">{left.shortName}</span>
          </div>
          <div className="p-4 flex items-center gap-3 border-b">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <RightIcon className="h-4 w-4 text-accent" />
            </div>
            <span className="font-semibold text-sm text-foreground">{right.shortName}</span>
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div key={row.label} className="contents">
              <div className="px-4 py-2.5 border-b">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{row.label}</div>
                <div className="text-sm font-medium text-foreground">{row.left}</div>
              </div>
              <div className="px-4 py-2.5 border-b">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{row.label}</div>
                <div className="text-sm font-medium text-foreground">{row.right}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Coverage Overlap */}
        <div className="p-4 bg-muted/20">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Coverage Overlap</div>
          <div className="flex flex-wrap gap-1.5">
            {overlap.map((country) => (
              <Badge key={country} className="text-[10px] bg-primary/10 text-primary border-primary/20">
                {country}
              </Badge>
            ))}
            {overlap.length === 0 && (
              <span className="text-xs text-muted-foreground">No overlapping regions</span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartComparison;

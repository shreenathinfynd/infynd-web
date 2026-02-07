import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, ArrowRight, Sparkles, Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, X, GitCompare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

const comparisonRows = [
  { label: "Total Records", render: (p: typeof products[0]) => p.totalRecords },
  { label: "Countries", render: (p: typeof products[0]) => String(p.countries) },
  { label: "Category", render: (p: typeof products[0]) => p.category },
  { label: "Compliance", render: (p: typeof products[0]) => p.complianceStandards.join(", ") },
  { label: "Use Cases", render: (p: typeof products[0]) => p.useCases.slice(0, 3).join(", ") },
  { label: "Fields Available", render: (p: typeof products[0]) => String(p.dataDictionary.length) },
];

const DataProductsPage = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  const toggleProduct = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  const selectedProducts = products.filter((p) => selected.has(p.id));

  return (
    <div className="py-8 px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Data Products</h1>
        <p className="text-muted-foreground">
          Browse our complete range of B2B data products. Select up to 3 to compare side-by-side.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {products.map((product, i) => {
          const Icon = iconMap[product.icon] || Sparkles;
          const isSelected = selected.has(product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card
                className={`relative h-full transition-all duration-200 ${
                  isSelected
                    ? "border-primary shadow-md ring-1 ring-primary/20"
                    : "hover:border-primary/20 hover:shadow-sm"
                }`}
              >
                <CardContent className="p-5">
                  {/* Checkbox */}
                  <div className="absolute top-4 right-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleProduct(product.id)}
                      disabled={!isSelected && selected.size >= 3}
                      aria-label={`Select ${product.name} for comparison`}
                    />
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="pr-6">
                      <h3 className="font-display font-semibold text-foreground">{product.shortName}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{product.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    <Badge variant="secondary" className="text-[10px]">{product.totalRecords}</Badge>
                    <Badge variant="outline" className="text-[10px]">{product.countries} countries</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.complianceStandards.slice(0, 2).map((std) => (
                      <span key={std} className="inline-flex items-center text-[10px] text-primary/70">
                        <Shield className="h-3 w-3 mr-0.5" />{std}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/products/${product.slug}`}
                    className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Custom Data CTA */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center mt-4 mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Can't find what you're looking for?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          We can build custom datasets tailored to your specific business needs. Tell us what you need and we'll make it happen.
        </p>
        <Button size="lg" className="rounded-full px-8">
          <Mail className="h-4 w-4 mr-2" /> Request Custom Data
        </Button>
      </div>

      {/* Sticky Compare Bar */}
      <AnimatePresence>
        {selected.size >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-card border shadow-xl rounded-full px-6 py-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {selectedProducts.map((p) => (
                  <Badge key={p.id} variant="secondary" className="text-xs flex items-center gap-1">
                    {p.shortName}
                    <button onClick={() => toggleProduct(p.id)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="rounded-full" onClick={() => setShowCompare(!showCompare)}>
                <GitCompare className="h-4 w-4 mr-1" />
                {showCompare ? "Hide Comparison" : "Compare Now"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Table */}
      <AnimatePresence>
        {showCompare && selectedProducts.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border bg-card p-6 mb-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-foreground">Product Comparison</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCompare(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48 font-medium">Attribute</TableHead>
                      {selectedProducts.map((p) => (
                        <TableHead key={p.id} className="font-semibold">{p.shortName}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonRows.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell className="font-medium text-muted-foreground">{row.label}</TableCell>
                        {selectedProducts.map((p) => (
                          <TableCell key={p.id}>{row.render(p)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataProductsPage;

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { Product } from "@/data/products";

interface DataDictionaryPanelProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const DataDictionaryPanel = ({ product, open, onClose }: DataDictionaryPanelProps) => {
  const [search, setSearch] = useState("");

  if (!product) return null;

  const filtered = product.dataDictionary.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="font-display">{product.shortName} — Data Dictionary</SheetTitle>
          <SheetDescription>
            Searchable field reference with origin and freshness metadata.
          </SheetDescription>
        </SheetHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fields..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((field) => (
            <div key={field.name} className="rounded-lg border p-3 hover:border-primary/20 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <code className="text-sm font-semibold text-foreground">{field.name}</code>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-10 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${field.confidenceScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{field.confidenceScore}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{field.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px]">{field.sourceType}</Badge>
                <Badge variant="secondary" className="text-[10px]">{field.updateFrequency}</Badge>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No fields match "{search}"</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DataDictionaryPanel;

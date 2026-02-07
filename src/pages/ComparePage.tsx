import { useState } from "react";
import { products } from "@/data/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const ComparePage = () => {
  const [selected, setSelected] = useState<string[]>([products[0].id, products[2].id]);

  const updateSelection = (index: number, value: string) => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addSlot = () => {
    if (selected.length < 3) {
      const unused = products.find((p) => !selected.includes(p.id));
      if (unused) setSelected((prev) => [...prev, unused.id]);
    }
  };

  const selectedProducts = selected.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  const rows = [
    { label: "Total Records", render: (p: typeof products[0]) => p.totalRecords },
    { label: "Countries", render: (p: typeof products[0]) => p.countries.toString() },
    { label: "Category", render: (p: typeof products[0]) => p.category },
    { label: "Compliance", render: (p: typeof products[0]) => p.complianceStandards.join(", ") },
    { label: "Use Cases", render: (p: typeof products[0]) => p.useCases.slice(0, 3).join(", ") },
    { label: "Fields Available", render: (p: typeof products[0]) => p.dataDictionary.length.toString() },
  ];

  return (
    <div className="py-8 px-6 max-w-6xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Compare Products</h1>
      <p className="text-muted-foreground mb-8">Side-by-side comparison of up to 3 data products.</p>

      <div className="flex gap-4 mb-8 flex-wrap">
        {selected.map((id, i) => (
          <Select key={i} value={id} onValueChange={(v) => updateSelection(i, v)}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {selected.length < 3 && (
          <button onClick={addSlot} className="px-4 py-2 rounded-md border border-dashed text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
            + Add product
          </button>
        )}
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left font-medium text-muted-foreground w-48">Attribute</th>
              {selectedProducts.map((p) => (
                <th key={p.id} className="p-4 text-left font-semibold text-foreground">{p.shortName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b">
                <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-foreground">{row.render(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;

import { type FilledRatesData } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, Users, UserMinus } from "lucide-react";
import { motion } from "framer-motion";

const formatRate = (val: number | string) => {
  if (typeof val === "string") return val;
  if (val === 0) return <span className="text-muted-foreground/40">0.00%</span>;
  return `${val.toFixed(2)}%`;
};

const RateBar = ({ value }: { value: number | string }) => {
  if (typeof value === "string") return <span className="text-muted-foreground/40">—</span>;
  const color =
    value >= 90 ? "bg-emerald-500" :
    value >= 70 ? "bg-primary" :
    value >= 40 ? "bg-amber-500" :
    value > 0 ? "bg-orange-500" :
    "bg-muted";
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground">{formatRate(value)}</span>
    </div>
  );
};

const groupColors: Record<string, string> = {
  "Company Core Profile": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Geographic Footprint": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Corporate Contact Intelligence": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "Digital Presence": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Organizational Scale": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Industry Classification": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "Workforce Signals": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Technology Intelligence": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Leadership & Workforce Intelligence": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
};

const FilledRatesSection = ({ data }: { data: FilledRatesData }) => {
  const { headline, rows } = data;

  return (
    <div className="space-y-6">
      {/* Headline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Companies", value: headline.totalCompanies, icon: Building, color: "from-blue-500/10 to-blue-600/5" },
          { label: "SDM People", value: headline.sdmPeople, icon: Users, color: "from-emerald-500/10 to-emerald-600/5" },
          { label: "Non-SDM People", value: headline.nonSdmPeople, icon: UserMinus, color: "from-amber-500/10 to-amber-600/5" },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="overflow-hidden">
              <CardContent className={`p-5 bg-gradient-to-br ${stat.color}`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-background/80 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                    <div className="font-display text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> ≥ 90%</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> 70–89%</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> 40–69%</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orange-500" /> &lt; 40%</span>
      </div>

      {/* Filled Rates Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="min-w-[140px]">Data Group</TableHead>
                  <TableHead className="min-w-[160px]">Field</TableHead>
                  <TableHead className="min-w-[160px]">
                    <div className="flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5" /> Total Companies
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[160px]">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> SDM People
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[160px]">
                    <div className="flex items-center gap-1.5">
                      <UserMinus className="h-3.5 w-3.5" /> Non-SDM People
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell>
                      <Badge variant="secondary" className={`text-[10px] whitespace-nowrap border-0 ${groupColors[row.group] || ""}`}>
                        {row.group}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-sm text-foreground">{row.field}</TableCell>
                    <TableCell><RateBar value={row.totalCompanies} /></TableCell>
                    <TableCell><RateBar value={row.sdmPeople} /></TableCell>
                    <TableCell><RateBar value={row.nonSdmPeople} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        * Filled rates represent the percentage of records where each field contains a valid, non-null value. SDM = Senior Decision Maker.
      </p>
    </div>
  );
};

export default FilledRatesSection;

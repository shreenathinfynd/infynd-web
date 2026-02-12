import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Building, Crown, Users, Phone, MapPin, Globe, Tag, Briefcase, Info, Zap, Target, Route, UserCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

/* ── Volume Snapshot Stats ── */
const volumeStats = [
  {
    label: "Total UK Companies Covered",
    value: "2.06M+",
    subtitle: "Callable UK businesses",
    icon: Building,
    gradient: "from-blue-500/15 via-blue-400/10 to-transparent",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    label: "Senior Decision Makers (SDM)",
    value: "975K+",
    subtitle: "Direct decision-maker access",
    icon: Crown,
    gradient: "from-amber-500/15 via-amber-400/10 to-transparent",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Non-SDM Contacts",
    value: "478K+",
    subtitle: "Influencers & users",
    icon: Users,
    gradient: "from-emerald-500/15 via-emerald-400/10 to-transparent",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
];

/* ── Company-Level Coverage Fields ── */
const companyFields = [
  { name: "Company Name", value: 100, icon: Building },
  { name: "Phone Number", value: 100, icon: Phone },
  { name: "Website", value: 95, icon: Globe },
  { name: "Sub-Industry", value: 94, icon: Tag },
  { name: "Postcode", value: 92, icon: MapPin },
  { name: "SIC / Industry Code", value: 90, icon: Briefcase },
  { name: "Company Tags", value: 89, icon: Tag },
  { name: "Address", value: 88, icon: MapPin },
];

/* ── Decision-Maker Coverage ── */
const sdmFields = [
  { name: "Job Title", value: 100 },
  { name: "Job Level", value: 100 },
  { name: "First & Last Name", value: 99 },
  { name: "Direct Email", value: 71 },
  { name: "LinkedIn Profile", value: 64 },
];

const nonSdmFields = [
  { name: "Job Title", value: 100 },
  { name: "Job Level", value: 100 },
  { name: "First & Last Name", value: 98 },
  { name: "Direct Email", value: 35 },
  { name: "LinkedIn Profile", value: 83 },
];

/* ── Filled Rates Data ── */
const filledRatesData = [
  { field: "Mailable", total: "2,060,959", sdm: "975,830", nonSdm: "478,927", isHeader: true },
  { field: "CRN", total: "58.30%", sdm: "84.20%", nonSdm: "65.68%" },
  { field: "td_company_name", total: "100.00%", sdm: "100.00%", nonSdm: "100.00%" },
  { field: "td_Address_1", total: "85.88%", sdm: "87.96%", nonSdm: "88.19%" },
  { field: "td_post_code", total: "90.22%", sdm: "96.28%", nonSdm: "91.93%" },
  { field: "phone", total: "100.00%", sdm: "100.00%", nonSdm: "100.00%" },
  { field: "website", total: "94.65%", sdm: "96.87%", nonSdm: "97.53%" },
  { field: "Company email", total: "51.01%", sdm: "71.34%", nonSdm: "11.48%" },
  { field: "linkedin", total: "50.44%", sdm: "64.10%", nonSdm: "71.62%" },
  { field: "location_type", total: "100.00%", sdm: "100.00%", nonSdm: "100.00%" },
  { field: "employee_range", total: "43.29%", sdm: "64.26%", nonSdm: "67.69%" },
  { field: "turnover_range", total: "0.03%", sdm: "0.06%", nonSdm: "0.05%" },
  { field: "sic_code", total: "89.46%", sdm: "90.25%", nonSdm: "92.09%" },
  { field: "Sub_industry", total: "93.82%", sdm: "95.03%", nonSdm: "96.07%" },
  { field: "hiring", total: "0.00%", sdm: "0.00%", nonSdm: "0.00%" },
  { field: "techstack", total: "0.00%", sdm: "0.00%", nonSdm: "0.00%" },
  { field: "tags", total: "88.59%", sdm: "90.84%", nonSdm: "92.60%" },
  { field: "title", total: "", sdm: "71.11%", nonSdm: "46.97%" },
  { field: "first_name", total: "", sdm: "99.98%", nonSdm: "99.99%" },
  { field: "last_name", total: "", sdm: "98.81%", nonSdm: "95.96%" },
  { field: "jobtitle", total: "", sdm: "100.00%", nonSdm: "100.00%" },
  { field: "job_title_level", total: "", sdm: "100.00%", nonSdm: "100.00%" },
  { field: "people_email", total: "", sdm: "54.46%", nonSdm: "34.77%" },
  { field: "people_linkedin", total: "", sdm: "42.74%", nonSdm: "82.69%" },
];

/* ── Optimisation Points ── */
const optimisationPoints = [
  { icon: Phone, text: "100% phone coverage across all records" },
  { icon: MapPin, text: "Strong address & postcode accuracy for regional targeting" },
  { icon: Crown, text: "Senior decision-maker prioritisation" },
  { icon: Route, text: "Industry-mapped for smart routing & scripting" },
];

/* ── Progress Bar Component ── */
const ProgressBar = ({ value, size = "md" }: { value: number; size?: "sm" | "md" }) => {
  const getColor = (v: number) => {
    if (v >= 95) return "bg-emerald-500";
    if (v >= 85) return "bg-primary";
    if (v >= 70) return "bg-amber-500";
    return "bg-orange-400";
  };

  return (
    <div className={`relative w-full ${size === "sm" ? "h-2" : "h-3"} bg-muted rounded-full overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`absolute inset-y-0 left-0 ${getColor(value)} rounded-full`}
      />
    </div>
  );
};

/* ── Main Component ── */
const TelemarketingCoverageBlock = () => {
  return (
    <div className="space-y-10">
      {/* ─── 1. Volume Snapshot ─── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <h3 className="font-display text-xl font-semibold text-foreground">Volume Snapshot</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Total addressable records in the Telemarketing dataset</TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {volumeStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className={`p-6 bg-gradient-to-br ${stat.gradient}`}>
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <div className="font-display text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
                      <div className="text-sm font-medium text-foreground/80 mt-0.5">{stat.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.subtitle}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>





      {/* ─── 5. Filled Rates Table ─── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <h3 className="font-display text-xl font-semibold text-foreground">Telemarketing Filled Rates</h3>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Percentage of records where each field is populated across all segments.
            </TooltipContent>
          </Tooltip>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold text-foreground">Field</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Total Companies</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">SDM People</TableHead>
                    <TableHead className="font-semibold text-foreground text-right">Non-SDM People</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filledRatesData.map((row, i) => (
                    <TableRow
                      key={row.field}
                      className={row.isHeader ? "bg-primary/5 font-semibold" : i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                    >
                      <TableCell className={`text-sm ${row.isHeader ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                        {row.field}
                      </TableCell>
                      <TableCell className={`text-sm text-right tabular-nums ${row.isHeader ? "font-semibold text-foreground" : ""}`}>
                        {row.total || "—"}
                      </TableCell>
                      <TableCell className={`text-sm text-right tabular-nums ${row.isHeader ? "font-semibold text-foreground" : ""}`}>
                        {row.sdm || "—"}
                      </TableCell>
                      <TableCell className={`text-sm text-right tabular-nums ${row.isHeader ? "font-semibold text-foreground" : ""}`}>
                        {row.nonSdm || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ─── 6. Transparency Note ─── */}
      <section>
        <div className="flex items-start gap-2 p-4 rounded-lg bg-muted/30 border border-muted">
          <UserCheck className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Not all fields are applicable to every company or role. Coverage reflects real-world availability and is continuously improved through monthly refresh cycles.
            Missing fields can be enriched on request via our Data Enhancement services.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TelemarketingCoverageBlock;

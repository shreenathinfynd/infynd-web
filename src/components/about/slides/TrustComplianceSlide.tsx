import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, FileCheck, Scale, Database, Users, CheckCircle, Phone, Mail, ArrowRight, CheckSquare, X } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import merchantGraph from "@/assets/merchant-terminal-graph.png";

const items = [
  { icon: FileCheck, title: "Public-source data only", desc: "No scraped personal data" },
  { icon: Scale, title: "Legitimate interest framework", desc: "GDPR-aligned processing" },
  { icon: Database, title: "Field-level traceability", desc: "Know where every field comes from" },
  { icon: Shield, title: "PECR & TPS compliance", desc: "Marketing preference screening" },
  { icon: Users, title: "Suppression by design", desc: "Opt-outs respected automatically" },
  { icon: CheckCircle, title: "Audit-ready documentation", desc: "Enterprise compliance packs" },
];

const iconMap: Record<string, React.ElementType> = {
  Phone,
  Mail,
  Database,
};

const tableHeaders = ["Region", "Total", "Phoneable", "Emailable", "Total", "Emailable"];
const tableRow = ["United Kingdom", "3.2M (2M Micro Businesses)", "2.8M", "900k", "10M", "6.7M"];

const solutionPoints = [
  "20% increase in DMC to Connect rate",
  "Increase in overall data volume",
  "SIC to MCC Mapping",
  "Greater Consistency",
];

const MerchantTerminalExpanded = ({ onClose }: { onClose: () => void }) => {
  const cs = caseStudies[0];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="col-span-full rounded-lg bg-background border border-border shadow-xl overflow-hidden text-foreground"
    >
      {/* Title bar */}
      <div className="flex items-stretch">
        <div className="bg-primary text-primary-foreground px-3 py-4 flex items-center justify-center">
          <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Tele Marketing
          </span>
        </div>
        <div className="flex-1 p-4 pb-2">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-xl md:text-2xl font-bold">
              Merchant Terminal: <span className="font-extrabold">Tele-Marketing Data</span>
            </h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors shrink-0 ml-2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Data Table */}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-2 py-1"></th>
                  <th className="border border-border px-2 py-1"></th>
                  <th colSpan={2} className="border border-border px-2 py-1 text-center font-semibold">Business level</th>
                  <th colSpan={2} className="border border-border px-2 py-1 text-center font-semibold">Contact level</th>
                </tr>
                <tr className="bg-muted/60">
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="border border-border px-2 py-1 text-center font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-primary/5">
                  {tableRow.map((val, i) => (
                    <td key={i} className="border border-border px-2 py-1 text-center font-medium">{val}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Body: Overview + Graph */}
      <div className="grid md:grid-cols-5 gap-4 p-4 pt-2">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h4 className="text-sm font-bold mb-1">Company Overview:</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {cs.overview}
            </p>
          </div>
          <div className="space-y-1.5">
            {solutionPoints.map((point) => (
              <div key={point} className="flex items-start gap-2">
                <CheckSquare className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                <span className="text-xs font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-muted/30 rounded-md p-2 border border-border">
            <p className="text-[10px] font-semibold text-center mb-1">Case Study</p>
            <img
              src={merchantGraph}
              alt="DMC to Connect % and APP to DMC % by Date and Provider"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>

      <Link to={`/case-studies/${cs.slug}`} className="block px-4 pb-3">
        <span className="inline-flex items-center gap-1 text-xs text-primary hover:gap-2 transition-all font-medium">
          View full case study <ArrowRight className="h-3 w-3" />
        </span>
      </Link>
    </motion.div>
  );
};

const TrustComplianceSlide = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">Trust Layer</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Trust, Compliance, and Transparency
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Built for audits, not just campaigns.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="p-5 rounded-lg bg-muted/30 border space-y-2"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
          >
            "Compliance is not a checkbox. It's built into the process."
          </motion.p>

          {/* Case Studies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="pt-8 border-t"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Success Stories
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              See how our data solutions have helped businesses achieve their goals.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                {expandedId === "merchant-terminal" ? (
                  <MerchantTerminalExpanded key="expanded" onClose={() => setExpandedId(null)} />
                ) : (
                  <motion.div
                    key="compact-merchant"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 1.2 }}
                    onClick={() => setExpandedId("merchant-terminal")}
                    className="p-4 rounded-lg bg-background border hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        Tele-Marketing
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                      Leading Payment Processor
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      Expanding market coverage through strategic tele-appointment setting
                    </p>
                    <div className="flex items-center gap-1 text-xs text-primary group-hover:gap-2 transition-all">
                      View case study <ArrowRight className="h-3 w-3" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {caseStudies.slice(1).map((caseStudy, i) => {
                const Icon = iconMap[caseStudy.icon] || Database;
                return (
                  <Link
                    key={caseStudy.id}
                    to={`/case-studies/${caseStudy.slug}`}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + i * 0.1 }}
                      className="p-4 rounded-lg bg-background border hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                          {caseStudy.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                        {caseStudy.client}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {caseStudy.subtitle}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-primary group-hover:gap-2 transition-all">
                        View case study <ArrowRight className="h-3 w-3" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustComplianceSlide;

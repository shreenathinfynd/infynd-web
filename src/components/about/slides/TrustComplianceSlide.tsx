import { motion } from "framer-motion";
import { Shield, FileCheck, Scale, Database, Users, CheckCircle } from "lucide-react";

const items = [
  { icon: FileCheck, title: "Public-source data only", desc: "No scraped personal data" },
  { icon: Scale, title: "Legitimate interest framework", desc: "GDPR-aligned processing" },
  { icon: Database, title: "Field-level traceability", desc: "Know where every field comes from" },
  { icon: Shield, title: "PECR & TPS compliance", desc: "Marketing preference screening" },
  { icon: Users, title: "Suppression by design", desc: "Opt-outs respected automatically" },
  { icon: CheckCircle, title: "Audit-ready documentation", desc: "Enterprise compliance packs" },
];

const TrustComplianceSlide = () => (
  <section className="min-h-screen flex items-center py-20 px-6">
    <div className="max-w-4xl mx-auto w-full">
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
      </motion.div>
    </div>
  </section>
);

export default TrustComplianceSlide;

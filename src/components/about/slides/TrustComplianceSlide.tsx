import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, FileCheck, Scale, Database, Users, CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

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

const TrustComplianceSlide = () => (
  <section className="min-h-screen flex items-center py-20 px-6">
    <div className="max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Slide Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            5
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

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
            {caseStudies.map((caseStudy, i) => {
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
                    transition={{ delay: 1.2 + i * 0.1 }}
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

export default TrustComplianceSlide;

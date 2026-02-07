import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Database, Users, Layers, Globe, CheckCircle, ArrowRight, Building, Cpu, Heart, FileCheck, Scale, Sparkles } from "lucide-react";
import infyndTeam from "@/assets/infynd-team.png";

/* ── Animation Variants ── */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

/* ── Section 1: Origin Story ── */
const OriginStoryBlock = () => (
  <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl text-center space-y-8"
    >
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
        It Started With a Data Problem
      </h1>
      <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
        <p>
          InFynd was created to solve a problem most businesses quietly accept:
          <span className="block text-foreground font-medium mt-1">data that looks complete, but doesn't perform.</span>
        </p>
        <p>
          We saw organisations buying large datasets that failed when it mattered most — during outreach, targeting, and conversion.
        </p>
        <p className="text-foreground/80">
          So we didn't start by selling data.
          <span className="block font-medium text-foreground">We started by rebuilding how data is created.</span>
        </p>
      </div>
    </motion.div>
  </section>
);

/* ── Timeline Marker Component ── */
const TimelineMarker = ({ phase, delay = 0 }: { phase: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, type: "spring" }}
    className="flex items-center gap-3 mb-6"
  >
    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
      {phase}
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
  </motion.div>
);

/* ── Section 2: Foundation Phase ── */
const FoundationPhaseBlock = () => (
  <section className="py-20 px-6 bg-muted/30">
    <div className="max-w-4xl mx-auto">
      <TimelineMarker phase="1" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Building Data the Hard Way
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The early years were spent learning — not scaling.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {[
            { icon: Database, text: "Custom-built datasets per client" },
            { icon: Building, text: "Industry-by-industry learning" },
            { icon: Users, text: "Manual verification from day one" },
            { icon: Shield, text: "Early focus on UK & Europe compliance" },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-background border"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
        >
          "Accuracy and trust were prioritised long before scale."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

/* ── Section 3: Scale Phase ── */
const ScalePhaseBlock = () => (
  <section className="py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <TimelineMarker phase="2" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          From Lists to Infrastructure
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          What began as projects evolved into platforms.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {[
            { icon: Cpu, text: "Proprietary crawling & enrichment pipelines" },
            { icon: Layers, text: "Multi-layer validation systems" },
            { icon: Users, text: "Human verification as a core layer" },
            { icon: Globe, text: "Support for sales, marketing, analytics & AI" },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
        >
          "InFynd evolved from a data provider into a data engine."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

/* ── Section 4: Product Evolution ── */
const ProductEvolutionBlock = () => (
  <section className="py-20 px-6 bg-muted/30">
    <div className="max-w-4xl mx-auto">
      <TimelineMarker phase="3" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Designed for Modern Go-To-Market
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Products shaped by how revenue teams actually work.
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          {["Telemarketing", "Email", "Postal", "New Business", "SOHO", "Healthcare", "POI & Analytics"].map((product, i) => (
            <motion.div
              key={product}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-full bg-background border text-sm font-medium text-foreground"
            >
              {product}
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          {[
            "Enrichment & Match capabilities",
            "Intent, tech stack, job changes",
            "CRM & workflow integration",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-lg bg-background border text-center"
            >
              <p className="text-sm text-muted-foreground">{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
        >
          "Every product was shaped by how revenue teams actually work."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

/* ── Section 5: Trust & Compliance ── */
const TrustAndComplianceBlock = () => (
  <section className="py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
          {[
            { icon: FileCheck, title: "Public-source data only", desc: "No scraped personal data" },
            { icon: Scale, title: "Legitimate interest framework", desc: "GDPR-aligned processing" },
            { icon: Database, title: "Field-level traceability", desc: "Know where every field comes from" },
            { icon: Shield, title: "PECR & TPS compliance", desc: "Marketing preference screening" },
            { icon: Users, title: "Suppression by design", desc: "Opt-outs respected automatically" },
            { icon: CheckCircle, title: "Audit-ready documentation", desc: "Enterprise compliance packs" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
        >
          "Compliance is not a checkbox. It's built into the process."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

/* ── Section 6: Present Day ── */
const PresentDayBlock = () => (
  <section className="py-20 px-6 bg-muted/30">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wide">Today</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Where InFynd Is Today
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {[
            "Serving multiple industries across B2B",
            "Supporting UK, Europe, and global datasets",
            "Used by sales, marketing, analytics, and AI teams",
            "Operating as a long-term data partner",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <p className="text-foreground">{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-background border mt-8"
        >
          <p className="text-lg text-foreground text-center font-medium">
            "InFynd today is the result of years spent doing data the difficult way — so clients don't have to."
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ── Section 7: Why It Matters (with team image) ── */
const WhyItMattersBlock = () => (
  <section className="relative py-32 px-6 overflow-hidden">
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${infyndTeam})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
    </div>

    {/* Content */}
    <div className="relative max-w-3xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <Heart className="h-10 w-10 text-primary mx-auto" />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Why This Matters to You
        </h2>
        
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>When you work with InFynd, you're not buying a list.</p>
          <p className="text-foreground">
            You're working with a team that understands how data affects revenue, reputation, and risk.
          </p>
          <p>That's why most of our work starts small — and grows over time.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <p className="text-sm text-muted-foreground mb-4 italic">
            If this aligns with how you think about data…
          </p>
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link to="/products">
              Talk to Sales <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ── Main Page ── */
const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <OriginStoryBlock />
      <FoundationPhaseBlock />
      <ScalePhaseBlock />
      <ProductEvolutionBlock />
      <TrustAndComplianceBlock />
      <PresentDayBlock />
      <WhyItMattersBlock />
    </div>
  );
};

export default AboutPage;

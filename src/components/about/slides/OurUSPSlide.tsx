import { motion } from "framer-motion";
import { AlertTriangle, Cog, ShieldCheck } from "lucide-react";
import infyndLogo from "@/assets/infynd-logo.png";
import worldMapImg from "@/assets/world-map-pins.png";
import badgeIso27001 from "@/assets/badge-iso-27001.png";
import badgeIso9001 from "@/assets/badge-iso-9001.png";
import badgeLdc from "@/assets/badge-ldc-top50.png";
import badgeGdpr from "@/assets/badge-gdpr.png";

const bullets = [
  {
    icon: AlertTriangle,
    label: "Problem",
    text: "Data looks complete but fails when used — costing teams time, pipeline, and trust.",
  },
  {
    icon: Cog,
    label: "Solution",
    text: "A custom-built data engine combining extraction, enrichment, and industry intelligence.",
  },
  {
    icon: ShieldCheck,
    label: "Trust",
    text: "Human-verified, compliance-first, and engineered for high-conversion outreach.",
  },
];

const badges = [
  { src: badgeIso27001, alt: "ISO 27001 Certified" },
  { src: badgeIso9001, alt: "ISO 9001 Certified" },
  { src: badgeGdpr, alt: "GDPR Aligned" },
  { src: badgeLdc, alt: "LDC Top 50 2025" },
];

const OurUSPSlide = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
    {/* Main content */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 w-[92%] max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 mb-8 border-b border-border/50">
        <img src={infyndLogo} alt="InFynd" className="h-9 w-auto" />
        <div className="h-7 w-px bg-border/40" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground tracking-tight leading-tight">
            InFynd
          </h2>
          <p className="text-base md:text-lg font-medium text-primary mt-0.5">
            Built to Fix What Data Got Wrong
          </p>
        </div>
      </div>

      {/* Body: 2-column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Content */}
        <div className="lg:col-span-7 space-y-7">
          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] leading-relaxed text-muted-foreground"
          >
            InFynd was built to solve a problem most businesses quietly accept:{" "}
            <strong className="text-foreground">data that looks complete, but fails when it's used.</strong>{" "}
            We rebuilt how B2B data is created — from the ground up.
          </motion.p>

          {/* Bullet points */}
          <div className="space-y-5">
            {bullets.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.15 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <b.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground tracking-wide">
                    {b.label}
                  </span>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mt-0.5">
                    {b.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Credential line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-muted-foreground/70 border-l-2 border-primary/25 pl-4 italic"
          >
            A global B2B data generation platform with operations in the UK and India,
            serving businesses of all sizes with end-to-end, compliant data solutions.
          </motion.p>
        </div>

        {/* Right: Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          <div className="relative w-full max-w-sm">
            <img
              src={worldMapImg}
              alt="InFynd global presence"
              className="w-full h-auto"
            />
            {/* UK pulse */}
            <div className="absolute top-[28%] left-[42%] flex items-center gap-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-[10px] font-semibold text-primary bg-background/90 px-1.5 py-0.5 rounded shadow-sm">
                UK Office
              </span>
            </div>
            {/* India pulse */}
            <div className="absolute top-[48%] left-[62%] flex items-center gap-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" style={{ animationDelay: "0.5s" }} />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-[10px] font-semibold text-primary bg-background/90 px-1.5 py-0.5 rounded shadow-sm">
                India Office
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 pt-6 border-t border-border/40 flex items-center justify-between"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
          Trusted & Certified
        </span>
        <div className="flex items-center gap-7">
          {badges.map((badge) => (
            <img
              key={badge.alt}
              src={badge.src}
              alt={badge.alt}
              className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
          <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <ShieldCheck className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold text-muted-foreground tracking-wide">CCPA</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default OurUSPSlide;

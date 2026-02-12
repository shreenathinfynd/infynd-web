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
    text: "Data looks complete but fails when used.",
  },
  {
    icon: Cog,
    label: "Solution",
    text: "A custom-built data engine for extraction and intelligence.",
  },
  {
    icon: ShieldCheck,
    label: "Trust",
    text: "Human-verified, compliance-first, and high-conversion.",
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
    {/* Dot grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage: "radial-gradient(hsl(var(--muted-foreground) / 0.25) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    {/* Subtle digital nodes — decorative circles */}
    <div className="absolute top-16 left-20 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-20 right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

    {/* Left sidebar accent */}
    <div className="absolute left-0 top-0 bottom-0 w-10 bg-primary flex items-center justify-center z-10">
      <span
        className="text-primary-foreground font-bold text-[10px] tracking-[0.4em] uppercase whitespace-nowrap"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        ABOUT INFYND
      </span>
    </div>

    {/* Floating glassmorphism window */}
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 w-[92%] max-w-6xl mx-auto rounded-2xl border border-border/60 shadow-2xl backdrop-blur-xl"
      style={{
        background: "linear-gradient(135deg, hsl(var(--background) / 0.85), hsl(var(--background) / 0.7))",
        boxShadow: "0 8px 60px -12px hsl(var(--foreground) / 0.08), 0 2px 12px -4px hsl(var(--foreground) / 0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-10 pt-8 pb-4 border-b border-border/40">
        <img src={infyndLogo} alt="InFynd" className="h-8 w-auto" />
        <div className="h-6 w-px bg-border/60" />
        <h2 className="text-xl md:text-2xl font-bold font-display text-primary tracking-tight">
          Built to Fix What Data Got Wrong
        </h2>
      </div>

      {/* Body: 2-column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Bullet points */}
        <div className="lg:col-span-7 px-10 py-8 space-y-6">
          {bullets.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="flex items-start gap-4"
            >
              <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <b.icon className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>
              <div>
                <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                  {b.label}
                </span>
                <p className="text-[15px] text-muted-foreground leading-relaxed mt-0.5">
                  {b.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Credential line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs text-muted-foreground/70 border-l-2 border-primary/20 pl-4 italic mt-6"
          >
            A global B2B data generation platform with operations in the UK and India,
            serving businesses of all sizes with end-to-end, compliant data solutions.
          </motion.p>
        </div>

        {/* Right: Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 flex items-center justify-center p-6 relative"
        >
          <div className="relative w-full max-w-sm">
            <img
              src={worldMapImg}
              alt="InFynd global presence"
              className="w-full h-auto opacity-80"
            />
            {/* UK pulse */}
            <div className="absolute top-[28%] left-[42%] flex items-center gap-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-[10px] font-semibold text-primary bg-background/90 px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
                UK Office
              </span>
            </div>
            {/* India pulse */}
            <div className="absolute top-[48%] left-[62%] flex items-center gap-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" style={{ animationDelay: "0.5s" }} />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-[10px] font-semibold text-primary bg-background/90 px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
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
        className="px-10 py-5 border-t border-border/40 flex items-center justify-between"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium">
          Trusted & Certified
        </span>
        <div className="flex items-center gap-6">
          {badges.map((badge) => (
            <img
              key={badge.alt}
              src={badge.src}
              alt={badge.alt}
              className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
          {/* CCPA text badge */}
          <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
            <ShieldCheck className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold text-muted-foreground tracking-wide">CCPA</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default OurUSPSlide;

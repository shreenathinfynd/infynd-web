import { motion } from "framer-motion";
import { Layers, ShieldCheck, Workflow } from "lucide-react";
import worldMapImg from "@/assets/world-map-pins.png";

const footnotes = [
  { icon: Layers, text: "Custom-built data, not off-the-shelf lists" },
  { icon: Workflow, text: "Proprietary pipelines & multi-layer validation" },
  { icon: ShieldCheck, text: "GDPR, CCPA & Data Protection Act aligned" },
];

const OurUSPSlide = () => (
  <section className="relative min-h-screen bg-background text-foreground flex overflow-hidden">
    {/* Left Sidebar */}
    <div className="w-10 shrink-0 bg-primary flex items-center justify-center">
      <span
        className="text-primary-foreground font-bold text-[10px] tracking-[0.4em] uppercase whitespace-nowrap"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        ABOUT INFYND
      </span>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Story (7/12) */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
              InFynd
            </h2>
            <p className="text-lg md:text-xl font-medium text-primary">
              Built to Fix What Data Got Wrong
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              InFynd was built to solve a problem most businesses quietly accept:
              <br />
              <strong className="text-foreground">data that looks complete, but fails when it's used.</strong>
            </p>
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              We saw teams buying large datasets that didn't convert, connect, or comply.
              So instead of reselling lists, we rebuilt how data is created.
            </p>
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              Today, InFynd operates as a <strong className="text-foreground">data engine</strong> — combining custom-built extraction,
              industry-specific intelligence, human verification, and compliance-first design.
            </p>
          </motion.div>

          {/* Credential line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground/80 border-l-2 border-primary/30 pl-4 italic"
          >
            A global B2B data generation platform with operations in the UK and India,
            serving businesses of all sizes with end-to-end, compliant data solutions.
          </motion.p>

          {/* Footnote strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-6 pt-4 border-t border-border"
          >
            {footnotes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground/70">
                <item.icon className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
                <span className="text-xs tracking-wide">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Map (5/12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative">
            <img src={worldMapImg} alt="InFynd global presence — UK and India offices" className="w-full h-auto" />
            {/* Office labels */}
            <div className="absolute top-[28%] left-[42%] text-[11px] font-semibold text-primary bg-background/80 px-2 py-0.5 rounded">
              UK Office
            </div>
            <div className="absolute top-[52%] left-[62%] text-[11px] font-semibold text-primary bg-background/80 px-2 py-0.5 rounded">
              India Office
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default OurUSPSlide;

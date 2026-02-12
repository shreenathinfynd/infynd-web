import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";

const steps = [
  { label: "Data Collection\n& Cleansing", status: "Collecting", description: "InFynd gathers millions of publicly available data points and removes inconsistencies to create a clean, structured dataset." },
  { label: "Data Enrichment\n(Machine Learning)", status: "Enriching", description: "Existing data is enriched using the latest cleansed datasets through machine learning and intelligent data modelling." },
  { label: "Automated\nValidation", status: "Validating", description: "All data is validated through our internal email verification processes and telephone validation (HLR / LLR)." },
  { label: "Quality Evaluation\n& Scoring", status: "Scoring", description: "Data is evaluated for accuracy, relevance, recurrence, and quality, with lead scoring applied to prioritise high-value records." },
  { label: "Compliance\nChecks", status: "Checking", description: "Compliance checks are performed against TPS, CTPS, and MPS registers. Where applicable, notification emails are issued to contacts whose email addresses are held." },
  { label: "Human Verification\n& Delivery", status: "Verifying", description: "Before delivery or platform upload, data is manually verified by InFynd's data quality team to ensure maximum accuracy." },
];

const uspPoints = [
  "Proprietary data crawling algorithms",
  "Originators of risky / catch-all email detection",
  "GDPR & CCPA compliant",
  "Real-time, custom-built, human-verified data",
];

const StepCard = ({ step, index, isActive }: { step: typeof steps[0]; index: number; isActive: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.1 }}
    className={`relative rounded-lg border px-4 py-5 text-center transition-all duration-700 ease-in-out w-[200px] ${
      isActive
        ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
        : "border-border bg-background"
    }`}
  >
    <div
      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-700 ${
        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {index + 1}
    </div>
    <span className="text-[13px] font-semibold whitespace-pre-line leading-tight text-foreground">
      {step.label}
    </span>
    <p className="mt-2 text-[11px] leading-[1.35] text-muted-foreground">
      {step.description}
    </p>
    <motion.span
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="block mt-1.5 text-[10px] text-primary font-medium italic"
    >
      {step.status}
    </motion.span>
  </motion.div>
);

const PulsingArrow = ({ icon: Icon, delay = 0, className = "" }: { icon: React.ElementType; delay?: number; className?: string }) => (
  <motion.div
    animate={{ opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
    className={className}
  >
    <Icon className="w-4 h-4 text-primary/60" />
  </motion.div>
);

const DataProcessSlide = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-[92%] max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground tracking-tight leading-tight">
            InFynd's <span className="text-primary">Data Building Process</span>
          </h2>
          <p className="text-base md:text-lg font-medium text-muted-foreground mt-1">
            Six stages. One continuous loop.
          </p>
        </div>

        {/* Body: Cards + USP */}
        <div className="flex gap-10 items-start">
          {/* Process cards grid */}
          <div className="flex-1 flex flex-col items-center">
            {/* Top row: cards 1, 2, 3 */}
            <div className="flex items-center gap-2">
              <StepCard step={steps[0]} index={0} isActive={activeStep === 0} />
              <PulsingArrow icon={ArrowRight} delay={0} />
              <StepCard step={steps[1]} index={1} isActive={activeStep === 1} />
              <PulsingArrow icon={ArrowRight} delay={0.3} />
              <StepCard step={steps[2]} index={2} isActive={activeStep === 2} />
            </div>

            {/* Arrow down aligned under card 3 / above card 4 */}
            <div className="self-end my-3 mr-[100px]">
              <PulsingArrow icon={ArrowDown} delay={0.6} />
            </div>

            {/* Bottom row: cards 6, 5, 4 (reversed) */}
            <div className="flex items-center gap-2">
              <StepCard step={steps[5]} index={5} isActive={activeStep === 5} />
              <PulsingArrow icon={ArrowLeft} delay={1.2} />
              <StepCard step={steps[4]} index={4} isActive={activeStep === 4} />
              <PulsingArrow icon={ArrowLeft} delay={0.9} />
              <StepCard step={steps[3]} index={3} isActive={activeStep === 3} />
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                    activeStep === i ? "bg-primary scale-125" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* USP Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-56 shrink-0 rounded-lg border bg-muted/20 p-5"
          >
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
              USP
            </h3>
            <ul className="space-y-3">
              {uspPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default DataProcessSlide;

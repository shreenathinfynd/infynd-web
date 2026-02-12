import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const steps = [
  { label: "Data Collection\n& Cleansing", status: "Collecting" },
  { label: "Data Enrichment\n(Machine Learning)", status: "Enriching" },
  { label: "Automated\nValidation", status: "Validating" },
  { label: "Quality Evaluation\n& Scoring", status: "Scoring" },
  { label: "Compliance\nChecks", status: "Checking" },
  { label: "Human Verification\n& Delivery", status: "Verifying" },
];

const uspPoints = [
  "180M+ B2B records globally",
  "6.5M validated UK email contacts",
  "Up to 98% email deliverability",
  "GDPR & CCPA compliant",
  "TPS / CTPS screened",
  "Real-time, custom-built datasets",
];

const DataProcessSlide = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen bg-background text-foreground flex overflow-hidden">
      {/* Left vertical label */}
      <div className="w-10 shrink-0 bg-primary flex items-center justify-center">
        <span
          className="text-primary-foreground font-bold text-sm tracking-[0.25em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          The Process
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-10 py-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-10"
        >
          InFynd's <span className="text-primary">Data Building Process</span>
        </motion.h2>

        <div className="flex gap-8 items-start">
          {/* Process cards area */}
          <div className="flex-1">
            {/* Step cards row */}
            <div className="flex items-center gap-1">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center">
                  {/* Step card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`relative rounded-lg border px-4 py-5 text-center transition-all duration-700 ease-in-out ${
                      activeStep === i
                        ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                        : "border-border bg-background"
                    }`}
                    style={{ width: 130, minHeight: 90 }}
                  >
                    {/* Step number */}
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-700 ${
                        activeStep === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>

                    <span className="text-xs font-semibold whitespace-pre-line leading-tight text-foreground">
                      {step.label}
                    </span>

                    {/* Micro status */}
                    <motion.span
                      animate={{ opacity: activeStep === i ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="block mt-2 text-[10px] text-primary font-medium italic"
                    >
                      {step.status}
                    </motion.span>
                  </motion.div>

                  {/* Arrow between steps */}
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <motion.div
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary/60" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Return loop arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 flex items-center justify-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 text-muted-foreground/60"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-[11px] italic">
                  Continuous refresh — data is revalidated and improved in every cycle
                </span>
              </motion.div>
            </motion.div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
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

          {/* USP Panel (static, no animation) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-56 shrink-0 rounded-lg border bg-muted/20 p-5"
          >
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
              Why InFynd
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
      </div>
    </section>
  );
};

export default DataProcessSlide;

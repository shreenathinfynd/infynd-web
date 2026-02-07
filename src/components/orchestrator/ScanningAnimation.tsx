import { motion } from "framer-motion";
import { Radar, Globe, Search, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ScanningAnimationProps {
  onComplete: () => void;
}

const steps = [
  { icon: Radar, label: "Initializing orchestrator...", duration: 800 },
  { icon: Globe, label: "Scanning global data assets...", duration: 1200 },
  { icon: Search, label: "Matching relevant datasets...", duration: 1000 },
  { icon: CheckCircle, label: "Assets identified", duration: 600 },
];

const ScanningAnimation = ({ onComplete }: ScanningAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), steps[currentStep].duration);
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Pulsing radar */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-scan-pulse" />
        <div className="absolute inset-2 rounded-full bg-primary/20 animate-scan-pulse" style={{ animationDelay: "0.3s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Radar className="h-7 w-7 text-primary" />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2 w-full max-w-xs">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <step.icon className={`h-4 w-4 ${i < currentStep ? "text-orchestrator-success" : i === currentStep ? "text-primary" : "text-muted-foreground/40"}`} />
            <span className={`text-sm ${i === currentStep ? "text-foreground font-medium" : i < currentStep ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
              {step.label}
            </span>
            {i < currentStep && <CheckCircle className="h-3 w-3 text-orchestrator-success ml-auto" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScanningAnimation;

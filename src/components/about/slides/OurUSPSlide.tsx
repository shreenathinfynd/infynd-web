import { motion } from "framer-motion";
import { Check } from "lucide-react";

const uspPoints = [
  "Real-time, custom-built datasets verified by human intelligence",
  "180M+ global B2B records, with 6.5M validated UK email contacts",
  "New business intelligence designed to fuel predictable pipeline",
  "Built with GDPR and CCPA compliance at the core",
  "TPS and CTPS screened to ensure compliant engagement",
  "Precision-engineered data delivering up to 98% email deliverability",
];


const OurUSPSlide = () => (
  <section className="relative min-h-screen bg-background text-foreground flex">
    {/* Left Sidebar */}
    <div className="w-10 shrink-0 bg-primary flex items-center justify-center">
      <span
        className="text-primary-foreground font-bold text-sm tracking-[0.25em] uppercase"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        About InFynd
      </span>
    </div>

    {/* Main content */}
    <div className="flex-1 relative px-12 py-10 overflow-hidden">
      {/* Intro paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base leading-relaxed max-w-4xl mb-8"
      >
        <span className="font-bold">InFynd</span> is a leading B2B Data and Deliverability business with offices in the UK and India. At InFynd, we focus on delivering comprehensive, end-to-end data solutions coupled with exceptional customer service, continuously innovating to meet our clients' evolving needs.
      </motion.p>

      {/* Our USP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-primary mb-5">Our USP</h2>
        <ul className="space-y-2.5 max-w-3xl">
          {uspPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 w-5 h-5 border-2 border-foreground flex items-center justify-center">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  </section>
);

export default OurUSPSlide;

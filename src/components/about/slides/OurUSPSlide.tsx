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

const badges = [
  { text: "Strength", subtext: "180+ & Growing", bg: "bg-foreground" },
  { text: "Operations @", subtext: "Coimbatore", bg: "bg-foreground" },
  { text: "Head Quarters @", subtext: "United Kingdom", bg: "bg-primary" },
  { text: "Founded in", subtext: "2020", bg: "bg-foreground" },
  { text: "B2B Data", subtext: "Provider", bg: "bg-primary" },
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

      {/* Circular badges - staircase on right */}
      <div className="absolute right-12 top-10 bottom-10 flex flex-col items-end justify-center gap-4">
        {badges.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            style={{ marginRight: `${(badges.length - 1 - i) * 28}px` }}
            className={`${b.bg} rounded-full w-24 h-24 flex flex-col items-center justify-center text-primary-foreground shadow-xl`}
          >
            <span className="text-[10px] font-semibold text-center leading-tight px-2">{b.text}</span>
            <span className="text-sm font-bold text-center leading-tight px-2">{b.subtext}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OurUSPSlide;

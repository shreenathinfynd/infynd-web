import { motion } from "framer-motion";
import { Check } from "lucide-react";
import worldMapImg from "@/assets/world-map-locations.png";

const uspPoints = [
  "Real-time, custom-built datasets verified by human intelligence",
  "180M+ global B2B records, with 6.5M validated UK email contacts",
  "New business intelligence designed to fuel predictable pipeline",
  "Built with GDPR and CCPA compliance at the core",
  "TPS and CTPS screened to ensure compliant engagement",
  "Precision-engineered data delivering up to 98% email deliverability",
];

const OurUSPSlide = () => (
  // Changed h-screen to min-h-screen and reduced overall padding
  <section className="relative min-h-[600px] bg-background text-foreground flex overflow-hidden border-b border-border">
    {/* Left Sidebar - Narrowed slightly for better proportions */}
    <div className="w-8 shrink-0 bg-primary flex items-center justify-center">
      <span
        className="text-primary-foreground font-bold text-[10px] tracking-[0.3em] uppercase"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        About InFynd
      </span>
    </div>

    {/* Main content - Using a 2-column grid to use horizontal space better */}
    <div className="flex-1 px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="z-10 flex flex-col justify-center">
        {/* Intro paragraph - Reduced margin-bottom */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base leading-snug max-w-xl mb-6 text-muted-foreground"
        >
          <strong className="text-foreground">InFynd</strong> is a leading B2B Data and Deliverability business with
          offices in the UK and India. We focus on end-to-end data solutions, continuously innovating to meet evolving
          client needs.
        </motion.p>

        {/* Our USP - Tighter spacing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            Our USP
            <div className="h-[2px] w-12 bg-primary/20 rounded-full" />
          </h2>
          <ul className="space-y-3">
            {uspPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <div className="mt-1 shrink-0 w-4 h-4 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Check className="w-2.5 h-2.5" strokeWidth={4} />
                </div>
                <span className="text-sm font-medium leading-tight">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* World Map Image - Integrated into the grid instead of floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative flex justify-center lg:justify-end"
      >
        <img
          src={worldMapImg}
          alt="InFynd global presence"
          className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  </section>
);

export default OurUSPSlide;

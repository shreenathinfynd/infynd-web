import { motion } from "framer-motion";
import { Square, Check } from "lucide-react";

const uspPoints = [
  "Real-time, custom-built datasets verified by human intelligence",
  "180M+ global B2B records, with 6.5M validated UK email contacts",
  "New business intelligence designed to fuel predictable pipeline",
  "Built with GDPR and CCPA compliance at the core",
  "TPS and CTPS screened to ensure compliant engagement",
  "Precision-engineered data delivering up to 98% email deliverability",
];

const badges = [
  { text: "Strength", subtext: "180+ & Growing", bg: "bg-foreground", top: "6%", right: "4%" },
  { text: "Operations @", subtext: "Coimbatore", bg: "bg-foreground", top: "30%", right: "8%" },
  { text: "Head Quarters @", subtext: "United Kingdom", bg: "bg-primary", top: "46%", right: "16%" },
  { text: "Founded in", subtext: "2020", bg: "bg-foreground", top: "62%", right: "24%" },
  { text: "B2B Data", subtext: "Provider", bg: "bg-primary", top: "78%", right: "32%" },
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

      {/* World map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-4 left-12 w-[500px]"
      >
        <svg viewBox="0 0 800 400" className="w-full opacity-90">
          <g fill="hsl(var(--primary))" stroke="none">
            <path d="M 80 80 L 140 70 L 180 80 L 200 100 L 220 110 L 230 130 L 220 150 L 200 160 L 180 170 L 160 180 L 140 190 L 120 185 L 100 175 L 85 165 L 75 150 L 70 130 L 75 110 Z" />
            <path d="M 160 200 L 175 195 L 185 200 L 195 210 L 200 230 L 205 250 L 200 270 L 190 285 L 175 295 L 165 290 L 155 280 L 150 260 L 148 240 L 150 220 Z" />
            <path d="M 320 90 L 350 85 L 370 90 L 385 95 L 395 105 L 390 120 L 380 130 L 365 135 L 350 133 L 335 128 L 325 118 L 318 105 Z" />
            <path d="M 330 145 L 360 140 L 385 145 L 400 155 L 410 175 L 415 200 L 410 225 L 400 245 L 385 260 L 365 268 L 345 265 L 330 255 L 320 235 L 318 210 L 320 185 L 325 165 Z" />
            <path d="M 420 85 L 480 80 L 540 85 L 580 95 L 610 105 L 630 120 L 640 140 L 635 160 L 620 175 L 600 185 L 575 190 L 550 192 L 525 188 L 500 180 L 475 170 L 455 155 L 440 140 L 430 120 L 425 100 Z" />
            <path d="M 600 240 L 630 235 L 655 240 L 670 250 L 675 265 L 670 280 L 655 290 L 635 292 L 615 288 L 600 278 L 595 263 L 598 250 Z" />
          </g>
        </svg>
      </motion.div>

      {/* ISO Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="absolute top-[22%] right-[18%] w-20 h-20"
      >
        <div className="w-full h-full rounded-full border-4 border-primary bg-background flex flex-col items-center justify-center shadow-lg">
          <span className="text-[9px] font-bold text-primary uppercase tracking-tight">Certified</span>
          <span className="text-xl font-extrabold text-primary leading-none">ISO</span>
          <span className="text-[7px] text-muted-foreground">9001:2015</span>
        </div>
      </motion.div>

      {/* Circular badges */}
      {badges.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
          className={`absolute ${b.bg} rounded-full w-24 h-24 flex flex-col items-center justify-center text-primary-foreground shadow-xl`}
          style={{ top: b.top, right: b.right }}
        >
          <span className="text-[10px] font-semibold text-center leading-tight px-2">{b.text}</span>
          <span className="text-sm font-bold text-center leading-tight px-2">{b.subtext}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default OurUSPSlide;

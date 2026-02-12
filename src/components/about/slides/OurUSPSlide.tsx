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
  // min-h-screen ensures it fills the height; items-center centers it vertically
  <section className="relative min-h-screen bg-white text-slate-900 flex overflow-hidden">
    {/* 1. Left Sidebar - Thinner and more subtle */}
    <div className="w-10 shrink-0 bg-[#E33B2E] flex items-center justify-center">
      <span
        className="text-white font-bold text-[10px] tracking-[0.4em] uppercase whitespace-nowrap"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        ABOUT INFYND
      </span>
    </div>

    {/* 2. Main Content Wrapper */}
    <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
      {/* Container to limit width and center on huge screens */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Text Content (6/12 columns) */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-lg leading-relaxed text-slate-600 mb-2">
              <strong className="text-slate-900">InFynd</strong> is a leading B2B Data and Deliverability business with
              offices in the UK and India.
            </p>
            <p className="text-slate-500 text-sm">
              We focus on delivering comprehensive, end-to-end data solutions coupled with exceptional customer service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-[#E33B2E] uppercase tracking-tight">Our USP</h2>
              <div className="h-[1px] flex-1 bg-slate-200" />
            </div>

            <ul className="grid grid-cols-1 gap-4">
              {uspPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center border border-red-200 group-hover:bg-[#E33B2E] group-hover:text-white transition-colors">
                    <Check className="w-3 h-3 text-[#E33B2E] group-hover:text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-medium text-slate-700 leading-snug group-hover:text-slate-950 transition-colors">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right Column: Visual (5/12 columns) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative"
        >
          {/* Subtle background decoration to fill space */}
          <div className="absolute -inset-10 bg-slate-50 rounded-full blur-3xl opacity-50 -z-10" />

          <div className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
            <img src={worldMapImg} alt="InFynd global presence" className="w-full h-auto drop-shadow-sm" />
          </div>
        </motion.div>
      </div>
    </div>

    {/* Optional: Simple Footer Indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 uppercase tracking-widest font-medium">
      Use arrows or click to navigate
    </div>
  </section>
);

export default OurUSPSlide;

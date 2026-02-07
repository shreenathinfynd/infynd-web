import { motion } from "framer-motion";
import { Globe, Building, Users, Shield, Award } from "lucide-react";
import infyndHero from "@/assets/infynd-hero-slide.png";

const badges = [
  { icon: Globe, label: "B2B Data Provider", color: "bg-primary" },
  { icon: Building, label: "Founded in 2020", color: "bg-foreground" },
  { icon: Building, label: "HQ @ United Kingdom", color: "bg-primary" },
  { icon: Users, label: "Operations @ India", color: "bg-foreground" },
  { icon: Award, label: "ISO 9001:2015", color: "bg-primary/80" },
  { icon: Users, label: "180+ & Growing", color: "bg-muted-foreground" },
  { icon: Shield, label: "GDPR Compliant", color: "bg-primary" },
];

const HeroSlide = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image - No overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${infyndHero})` }}
    />

    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold">
          <span className="text-foreground">InFynd</span>{" "}
          <span className="text-primary">Group</span>
        </h1>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 font-medium">
            The data, AI & Growth Engine
          </p>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-8"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`${badge.color} text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg`}
            >
              <badge.icon className="h-4 w-4" />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Global Presence Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pt-8 flex items-center justify-center gap-8 text-foreground/70"
        >
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            <span>United Kingdom</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            <span>India</span>
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll/Next Hint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-32 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-foreground/50 text-sm"
      >
        Click next to continue →
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSlide;

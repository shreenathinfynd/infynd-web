import { motion } from "framer-motion";
import infyndTeam from "@/assets/infynd-team.png";

const topChip = { label: "Founder", sublabel: "Harish Praveen", variant: "primary" as const };

const bottomChips = [
  { label: "Founded in", sublabel: "2020", variant: "outline" as const },
  { label: "B2B Data", sublabel: "Provider", variant: "primary" as const },
  { label: "Head Quarters @", sublabel: "United Kingdom", variant: "outline" as const },
  { label: "Operations @", sublabel: "Coimbatore", variant: "primary" as const },
  { label: "Strength", sublabel: "150+ & Growing", variant: "outline" as const },
];

const chipStyles = {
  primary: "bg-primary text-primary-foreground",
  outline: "bg-background text-foreground border border-border",
};

const HeroSlide = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${infyndTeam})` }}
    />
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-6 pt-24 pb-32 flex-1">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 mb-16"
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold">
          <span className="text-white">InFynd</span>{" "}
          <span className="text-primary">Group</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold italic">
          The Data, AI & Growth Engine
        </p>
      </motion.div>

      {/* Founder Chip - centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-auto"
      >
        <div className={`${chipStyles[topChip.variant]} px-8 py-3 rounded-full text-center shadow-lg`}>
          <div className="text-sm font-semibold">{topChip.label}</div>
          <div className="text-sm font-medium">{topChip.sublabel}</div>
        </div>
      </motion.div>

      {/* Bottom Chips Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-auto"
      >
        {bottomChips.map((chip, i) => (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className={`${chipStyles[chip.variant]} px-6 py-3 rounded-full text-center shadow-lg min-w-[140px]`}
          >
            <div className="text-sm font-semibold">{chip.label}</div>
            <div className="text-sm font-medium">{chip.sublabel}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Scroll Hint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-white/50 text-sm"
      >
        Click next to continue →
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSlide;

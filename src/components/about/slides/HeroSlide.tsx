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
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${infyndTeam})` }}
    />
    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center -mt-24">

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

      
    </div>

  </section>
);

export default HeroSlide;

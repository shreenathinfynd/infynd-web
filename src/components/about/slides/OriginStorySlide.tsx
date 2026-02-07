import { motion } from "framer-motion";

const OriginStorySlide = () => (
  <section className="min-h-screen flex items-center justify-center px-6 py-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl text-center space-y-8"
    >
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
        It Started With a Data Problem
      </h1>
      <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
        <p>
          InFynd was created to solve a problem most businesses quietly accept:
          <span className="block text-foreground font-medium mt-1">data that looks complete, but doesn't perform.</span>
        </p>
        <p>
          We saw organisations buying large datasets that failed when it mattered most — during outreach, targeting, and conversion.
        </p>
        <p className="text-foreground/80">
          So we didn't start by selling data.
          <span className="block font-medium text-foreground">We started by rebuilding how data is created.</span>
        </p>
      </div>
    </motion.div>
  </section>
);

export default OriginStorySlide;

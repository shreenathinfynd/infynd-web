import { motion } from "framer-motion";
import { Cpu, Layers, Users, Globe } from "lucide-react";

const items = [
  { icon: Cpu, text: "Proprietary crawling & enrichment pipelines" },
  { icon: Layers, text: "Multi-layer validation systems" },
  { icon: Users, text: "Human verification as a core layer" },
  { icon: Globe, text: "Support for sales, marketing, analytics & AI" },
];

const ScaleSlide = () => (
  <section className="min-h-screen flex items-center py-20 px-6">
    <div className="max-w-4xl mx-auto w-full">
      {/* Phase Marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          2
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          From Lists to Infrastructure
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          What began as projects evolved into platforms.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {items.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-muted-foreground italic pt-4 border-l-2 border-primary/30 pl-4"
        >
          "InFynd evolved from a data provider into a data engine."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default ScaleSlide;

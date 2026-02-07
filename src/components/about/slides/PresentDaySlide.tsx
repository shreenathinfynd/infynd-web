import { motion } from "framer-motion";
import { Sparkles, CheckCircle } from "lucide-react";

const items = [
  "Serving multiple industries across B2B",
  "Supporting UK, Europe, and global datasets",
  "Used by sales, marketing, analytics, and AI teams",
  "Operating as a long-term data partner",
];

const PresentDaySlide = () => (
  <section className="min-h-screen flex items-center py-20 px-6 bg-muted/30">
    <div className="max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wide">Today</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Where InFynd Is Today
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg border bg-background"
            >
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <p className="text-foreground">{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-background border mt-8"
        >
          <p className="text-lg text-foreground text-center font-medium">
            "InFynd today is the result of years spent doing data the difficult way — so clients don't have to."
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default PresentDaySlide;

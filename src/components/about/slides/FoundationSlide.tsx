import { motion } from "framer-motion";
import { Database, Building, Users, Shield } from "lucide-react";

const items = [
  { icon: Database, text: "Custom-built datasets per client" },
  { icon: Building, text: "Industry-by-industry learning" },
  { icon: Users, text: "Manual verification from day one" },
  { icon: Shield, text: "Early focus on UK & Europe compliance" },
];

const FoundationSlide = () => (
  <section className="min-h-screen flex items-center py-20 px-6 bg-muted/30">
    <div className="max-w-4xl mx-auto w-full">
      {/* Phase Marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          1
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
          Building Data the Hard Way
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The early years were spent learning — not scaling.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {items.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-background border"
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
          "Accuracy and trust were prioritised long before scale."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default FoundationSlide;

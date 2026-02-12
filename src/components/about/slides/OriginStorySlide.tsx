import { motion } from "framer-motion";
import { SignalZero, Users, Workflow } from "lucide-react";

const blocks = [
  {
    icon: SignalZero,
    heading: "It Started With a Data Problem",
    lines: [
      "Most business data looks complete —",
      "but fails when it's used.",
      "",
      "We saw teams buying large datasets",
      "that didn't convert, connect, or comply.",
    ],
  },
  {
    icon: Users,
    heading: "Building Data the Hard Way",
    lines: [
      "Instead of reselling lists,",
      "we rebuilt how data is created.",
      "",
      "Custom-built datasets,",
      "manual verification,",
      "and compliance-first thinking.",
    ],
  },
  {
    icon: Workflow,
    heading: "From Lists to Infrastructure",
    lines: [
      "As demand grew,",
      "InFynd evolved into a data engine.",
      "",
      "Proprietary pipelines,",
      "multi-layer validation,",
      "and repeatable systems.",
    ],
  },
];

const OriginStorySlide = () => (
  <section className="relative h-screen bg-background text-foreground flex flex-col justify-center px-16 py-12 overflow-hidden">
    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center"
    >
      InFynd:{" "}
      <span className="text-primary">Built to Fix What Data Got Wrong</span>
    </motion.h2>

    {/* Timeline + Blocks */}
    <div className="relative max-w-6xl mx-auto w-full">
      {/* Timeline connector line */}
      <div className="absolute top-10 left-0 right-0 h-px bg-border hidden md:block" />

      <div className="grid md:grid-cols-3 gap-10">
        {blocks.map((block, i) => (
          <motion.div
            key={block.heading}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="hidden md:flex items-center justify-center mb-8">
              <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md z-10" />
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <block.icon className="w-5 h-5 text-primary" />
            </div>

            {/* Heading */}
            <h3 className="text-lg font-bold text-foreground mb-4">
              {block.heading}
            </h3>

            {/* Content lines */}
            <div className="space-y-0.5">
              {block.lines.map((line, j) =>
                line === "" ? (
                  <div key={j} className="h-3" />
                ) : (
                  <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                )
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Footnote */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-xs text-muted-foreground/60 text-center mt-14 italic"
    >
      Accuracy, trust, and transparency were prioritised long before scale.
    </motion.p>
  </section>
);

export default OriginStorySlide;

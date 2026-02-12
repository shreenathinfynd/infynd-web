import { motion } from "framer-motion";

const steps = [
  { label: "Gather public data\nand clean", angle: -90 },
  { label: "Enrich data with\nMachine Learning", angle: -30 },
  { label: "Validate emails\nand phone", angle: 30 },
  { label: "Evaluate score and\nscrutinize data", angle: 90 },
  { label: "Compliance Checks\n(CTPS, TPS, MPS)", angle: 150 },
  { label: "Human Verification\nBy Data Quality Team", angle: 210 },
];

const DataProcessSlide = () => {
  // Dimensions for the coordinate system
  const radius = 260;
  const centerX = 320;
  const centerY = 320;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-background overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-10"
      >
        Our Data Quality Process
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
        style={{ width: 640, height: 640 }}
      >
        {/* SVG Layer for the guide circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 640">
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.2)"
            strokeWidth="2"
          />
        </svg>

        {/* Step nodes mapped along the circle */}
        {steps.map((step, i) => {
          const rad = (step.angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(rad);
          const y = centerY + radius * Math.sin(rad);

          // Color logic: Red for top/sides, Dark for others to match your image
          const isRed = i === 0 || i === 2 || i === 4;

          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0,
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              className={`absolute flex items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-bold leading-tight shadow-xl border border-white/10 ${
                isRed ? "bg-[#E33B2E] text-white" : "bg-[#1A1F2C] text-white"
              }`}
              style={{
                width: 170,
                minHeight: 80,
                zIndex: 10,
              }}
            >
              <span className="whitespace-pre-line">{step.label}</span>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="mt-10 text-muted-foreground text-sm italic">Use arrows or click to navigate</p>
    </section>
  );
};

export default DataProcessSlide;

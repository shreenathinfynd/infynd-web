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
        {/* SVG Layer for Circle and Arrows */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 640">
          {/* Main Path Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.2)"
            strokeWidth="2"
          />

          {/* Arrow indicators */}
          {steps.map((step, i) => {
            const nextStep = steps[(i + 1) % steps.length];

            // Normalize angle for the wrap-around (from 210 back to -90)
            let startAngle = step.angle;
            let endAngle = nextStep.angle;
            if (endAngle < startAngle) endAngle += 360;

            const midAngleDeg = (startAngle + endAngle) / 2;
            const midAngleRad = (midAngleDeg * Math.PI) / 180;

            // Position arrow on the circle line
            const ax = centerX + radius * Math.cos(midAngleRad);
            const ay = centerY + radius * Math.sin(midAngleRad);

            // Calculate rotation for the arrow head to follow the curve
            const tangentAngle = midAngleRad + Math.PI / 2;

            return (
              <polygon
                key={i}
                points={`
                  ${ax + 8 * Math.cos(tangentAngle)},${ay + 8 * Math.sin(tangentAngle)} 
                  ${ax - 8 * Math.cos(tangentAngle)},${ay - 8 * Math.sin(tangentAngle)} 
                  ${ax + 12 * Math.cos(midAngleRad)},${ay + 12 * Math.sin(midAngleRad)}
                `}
                fill="hsl(var(--muted-foreground) / 0.4)"
              />
            );
          })}
        </svg>

        {/* Step nodes */}
        {steps.map((step, i) => {
          const rad = (step.angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(rad);
          const y = centerY + radius * Math.sin(rad);

          // Color logic based on your image (Red for specific steps, Dark for others)
          // Adjust the indices if the color sequence needs to be different
          const isRed = i === 0 || i === 2 || i === 4;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x, y, translateX: "-50%", translateY: "-50%" }}
              animate={{ opacity: 1, scale: 1, x, y, translateX: "-50%", translateY: "-50%" }}
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
                width: 160,
                minHeight: 70,
                zIndex: 10,
              }}
            >
              <span className="whitespace-pre-line">{step.label}</span>
            </motion.div>
          );
        })}
      </motion.div>

      <p className="mt-10 text-muted-foreground text-sm">Use arrows or click to navigate</p>
    </section>
  );
};

export default DataProcessSlide;

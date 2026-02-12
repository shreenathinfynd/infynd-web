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
  const radius = 260;
  const centerX = 320;
  const centerY = 320;

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center"
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
          {/* Circle ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 640 640"
          >
            <circle
              cx={centerX}
              cy={centerY}
              r={radius - 20}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.2)"
              strokeWidth="3"
            />
            {/* Arrow indicators */}
            {steps.map((step, i) => {
              const midAngle = ((step.angle + steps[(i + 1) % steps.length].angle) / 2) * (Math.PI / 180);
              const ax = centerX + (radius - 20) * Math.cos(midAngle);
              const ay = centerY + (radius - 20) * Math.sin(midAngle);
              const tangentAngle = midAngle + Math.PI / 2;
              return (
                <polygon
                  key={i}
                  points={`${ax + 8 * Math.cos(tangentAngle)},${ay + 8 * Math.sin(tangentAngle)} ${ax - 8 * Math.cos(tangentAngle)},${ay - 8 * Math.sin(tangentAngle)} ${ax + 12 * Math.cos(midAngle)},${ay + 12 * Math.sin(midAngle)}`}
                  fill="hsl(var(--muted-foreground) / 0.3)"
                />
              );
            })}
          </svg>

          {/* Step nodes */}
          {steps.map((step, i) => {
            const rad = (step.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                className={`absolute flex items-center justify-center rounded-lg px-4 py-3 text-center text-sm font-semibold leading-tight shadow-md ${
                  isEven
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground text-background"
                }`}
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  width: 150,
                  minHeight: 60,
                }}
              >
                <span className="whitespace-pre-line">{step.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DataProcessSlide;

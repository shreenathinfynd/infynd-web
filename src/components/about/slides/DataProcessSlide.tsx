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
  // All positioning uses percentages so it scales with the container
  const radiusPct = 38; // % of container size

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center"
        >
          Our Data Quality Process
        </motion.h2>

        {/* Square aspect-ratio container */}
        <div className="w-full max-w-[500px] aspect-square relative">
          {/* SVG circle + arrows — viewBox matches the percentage system */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx="50"
              cy="50"
              r={radiusPct}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.18)"
              strokeWidth="0.5"
            />
            {/* Directional arrows between steps */}
            {steps.map((step, i) => {
              const nextAngle = steps[(i + 1) % steps.length].angle;
              let mid = (step.angle + nextAngle) / 2;
              if (i === steps.length - 1) mid = (step.angle + nextAngle + 360) / 2;
              const midRad = (mid * Math.PI) / 180;
              const ax = 50 + radiusPct * Math.cos(midRad);
              const ay = 50 + radiusPct * Math.sin(midRad);
              const tangent = midRad + Math.PI / 2;
              const s = 1.2;
              const t = 2;
              return (
                <polygon
                  key={i}
                  points={`${ax + s * Math.cos(tangent)},${ay + s * Math.sin(tangent)} ${ax - s * Math.cos(tangent)},${ay - s * Math.sin(tangent)} ${ax + t * Math.cos(midRad)},${ay + t * Math.sin(midRad)}`}
                  fill="hsl(var(--muted-foreground) / 0.3)"
                />
              );
            })}
          </svg>

          {/* Step nodes — positioned with % left/top + translate(-50%,-50%) */}
          {steps.map((step, i) => {
            const rad = (step.angle * Math.PI) / 180;
            const leftPct = 50 + radiusPct * Math.cos(rad);
            const topPct = 50 + radiusPct * Math.sin(rad);
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`absolute flex items-center justify-center rounded-lg px-3 py-2 text-center text-[10px] sm:text-xs font-semibold leading-tight shadow-md ${
                  isEven
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground text-background"
                }`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: "translate(-50%, -50%)",
                  width: "clamp(90px, 22%, 130px)",
                  minHeight: 44,
                }}
              >
                <span className="whitespace-pre-line">{step.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DataProcessSlide;

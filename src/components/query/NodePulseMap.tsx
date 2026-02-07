import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Simplified world map dots with region centers
const regionCoords: Record<string, { cx: number; cy: number; label: string }> = {
  "United Kingdom": { cx: 480, cy: 140, label: "UK" },
  "United States": { cx: 200, cy: 180, label: "US" },
  "Germany": { cx: 510, cy: 150, label: "DE" },
  "France": { cx: 490, cy: 165, label: "FR" },
  "India": { cx: 640, cy: 220, label: "IN" },
  "Australia": { cx: 750, cy: 340, label: "AU" },
  "Global": { cx: 450, cy: 200, label: "Global" },
  "Japan": { cx: 770, cy: 175, label: "JP" },
  "Canada": { cx: 210, cy: 130, label: "CA" },
  "Ireland": { cx: 465, cy: 140, label: "IE" },
  "Netherlands": { cx: 495, cy: 145, label: "NL" },
};

// Simplified continent outlines as dot clusters
const mapDots = [
  // North America
  ...[180, 200, 220, 240, 260].flatMap((x) =>
    [120, 140, 160, 180, 200].map((y) => ({ x: x + (Math.random() - 0.5) * 15, y: y + (Math.random() - 0.5) * 10 }))
  ),
  // Europe
  ...[460, 480, 500, 520, 540].flatMap((x) =>
    [120, 140, 160, 175].map((y) => ({ x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 8 }))
  ),
  // Asia
  ...[600, 630, 660, 690, 720, 750].flatMap((x) =>
    [140, 160, 180, 200, 220].map((y) => ({ x: x + (Math.random() - 0.5) * 15, y: y + (Math.random() - 0.5) * 12 }))
  ),
  // Africa
  ...[490, 510, 530, 550].flatMap((x) =>
    [220, 250, 280, 310].map((y) => ({ x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 12 }))
  ),
  // South America
  ...[260, 280, 300].flatMap((x) =>
    [260, 290, 320, 350].map((y) => ({ x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 12 }))
  ),
  // Australia
  ...[720, 740, 760].flatMap((x) =>
    [320, 340, 360].map((y) => ({ x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 8 }))
  ),
];

interface NodePulseMapProps {
  activeRegion: string | null;
  className?: string;
}

const NodePulseMap = ({ activeRegion, className }: NodePulseMapProps) => {
  const activeCoord = activeRegion ? regionCoords[activeRegion] : null;

  return (
    <div className={cn("relative w-full", className)}>
      <svg viewBox="0 0 900 420" className="w-full h-auto" style={{ maxHeight: 260 }}>
        {/* Background dots */}
        {mapDots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={1.5}
            className="fill-muted-foreground/15"
          />
        ))}

        {/* Region markers */}
        {Object.entries(regionCoords).map(([name, coord]) => {
          const isActive = activeRegion === name || activeRegion === "Global";
          return (
            <g key={name}>
              <AnimatePresence>
                {isActive && (
                  <>
                    <motion.circle
                      initial={{ r: 4, opacity: 0 }}
                      animate={{ r: 28, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      cx={coord.cx}
                      cy={coord.cy}
                      className="fill-primary/20"
                    />
                    <motion.circle
                      initial={{ r: 4, opacity: 0 }}
                      animate={{ r: 18, opacity: 0.3 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      cx={coord.cx}
                      cy={coord.cy}
                      className="fill-primary/30"
                    />
                  </>
                )}
              </AnimatePresence>
              <motion.circle
                cx={coord.cx}
                cy={coord.cy}
                r={isActive ? 6 : 3}
                className={cn(
                  "transition-colors duration-300",
                  isActive ? "fill-primary" : "fill-muted-foreground/30"
                )}
                animate={{ r: isActive ? 6 : 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {isActive && (
                <motion.text
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  x={coord.cx}
                  y={coord.cy - 14}
                  textAnchor="middle"
                  className="fill-primary text-[11px] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {coord.label}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default NodePulseMap;

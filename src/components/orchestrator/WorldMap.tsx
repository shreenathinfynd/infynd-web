import { motion } from "framer-motion";

const nodes = [
  { x: 48, y: 28, label: "United Kingdom", delay: 0.3, primary: true },
  { x: 52, y: 32, label: "Europe", delay: 0.5 },
  { x: 22, y: 38, label: "North America", delay: 0.7 },
  { x: 72, y: 48, label: "Asia Pacific", delay: 0.9 },
  { x: 50, y: 62, label: "Africa", delay: 1.1 },
  { x: 30, y: 58, label: "South America", delay: 1.3 },
];

const WorldMap = () => (
  <div className="relative w-full max-w-lg mx-auto aspect-[16/10]">
    {/* Stylized grid background */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" fill="none">
      {/* Grid lines */}
      {[15, 25, 35, 45, 55].map((y) => (
        <line key={`h${y}`} x1="5" y1={y} x2="95" y2={y} stroke="hsl(var(--border))" strokeWidth="0.15" strokeDasharray="1 1" />
      ))}
      {[15, 30, 45, 60, 75, 85].map((x) => (
        <line key={`v${x}`} x1={x} y1="5" x2={x} y2="60" stroke="hsl(var(--border))" strokeWidth="0.15" strokeDasharray="1 1" />
      ))}
      {/* Connection lines */}
      <line x1="48" y1="28" x2="52" y2="32" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.3" />
      <line x1="48" y1="28" x2="22" y2="38" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.3" />
      <line x1="48" y1="28" x2="72" y2="48" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.3" />
    </svg>

    {/* Nodes */}
    {nodes.map((node) => (
      <motion.div
        key={node.label}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: node.delay, duration: 0.4, type: "spring" }}
        className="absolute"
        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className={`relative flex items-center justify-center`}>
          <div className={`h-3 w-3 rounded-full ${node.primary ? "bg-primary animate-glow-ring" : "bg-muted-foreground/40"}`} />
          {node.primary && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: node.delay + 0.3, duration: 0.3 }}
              className="absolute top-5 whitespace-nowrap"
            >
              <span className="text-[10px] font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {node.label}
              </span>
              <div className="text-[9px] text-muted-foreground text-center mt-0.5">Detected region</div>
            </motion.div>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

export default WorldMap;

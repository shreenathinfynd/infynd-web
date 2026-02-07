import { motion } from "framer-motion";
import { Users, Building2 } from "lucide-react";

interface SegmentSelectorProps {
  onSelect: (segment: "consumer" | "business") => void;
}

const SegmentSelector = ({ onSelect }: SegmentSelectorProps) => (
  <div className="max-w-md mx-auto">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-sm text-muted-foreground mb-6"
    >
      Identifying segment — select your target audience
    </motion.p>
    <div className="grid grid-cols-2 gap-4">
      {[
        { key: "consumer" as const, icon: Users, label: "Consumer", desc: "Individual contacts & households" },
        { key: "business" as const, icon: Building2, label: "Business", desc: "Companies & professionals" },
      ].map((seg, i) => (
        <motion.button
          key={seg.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          onClick={() => onSelect(seg.key)}
          className="group relative p-6 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-lg transition-all text-center"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
            <seg.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="font-display font-semibold text-foreground text-lg">{seg.label}</div>
          <div className="text-xs text-muted-foreground mt-1">{seg.desc}</div>
        </motion.button>
      ))}
    </div>
  </div>
);

export default SegmentSelector;

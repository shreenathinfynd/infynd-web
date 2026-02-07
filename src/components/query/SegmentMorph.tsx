import { motion, AnimatePresence } from "framer-motion";
import { Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SegmentMorphProps {
  segment: "business" | "consumer" | null;
  className?: string;
}

const SegmentMorph = ({ segment, className }: SegmentMorphProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={segment || "none"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-2"
        >
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-300",
              segment === "business"
                ? "bg-primary/10 text-primary"
                : segment === "consumer"
                ? "bg-accent/10 text-accent"
                : "bg-muted text-muted-foreground"
            )}
          >
            {segment === "consumer" ? (
              <User className="h-5 w-5" />
            ) : (
              <Building2 className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Segment</div>
            <div className="text-sm font-semibold text-foreground">
              {segment === "consumer" ? "Consumer (B2C)" : segment === "business" ? "Business (B2B)" : "Detecting..."}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SegmentMorph;

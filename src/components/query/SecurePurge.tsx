import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SecurePurgeProps {
  onPurge: () => void;
  className?: string;
}

const SecurePurge = ({ onPurge, className }: SecurePurgeProps) => {
  const [purging, setPurging] = useState(false);

  const handlePurge = () => {
    setPurging(true);
    setTimeout(() => {
      onPurge();
      setPurging(false);
    }, 1200);
  };

  return (
    <>
      {/* White-out overlay */}
      <AnimatePresence>
        {purging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "linear" }}
              >
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-3" />
              </motion.div>
              <p className="font-display font-semibold text-foreground">Clean Sweep Complete</p>
              <p className="text-sm text-muted-foreground mt-1">All session data has been purged</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="outline"
        size="sm"
        onClick={handlePurge}
        className={cn("gap-2 text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20", className)}
      >
        <ShieldCheck className="h-4 w-4" />
        Wipe Session
      </Button>
    </>
  );
};

export default SecurePurge;

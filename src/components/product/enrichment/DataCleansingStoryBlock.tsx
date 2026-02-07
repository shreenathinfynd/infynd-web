import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Trash2, RefreshCw, FileX, FileCheck, Globe, Building } from "lucide-react";

const cleansingSteps = [
  { icon: Trash2, title: "Duplicate Removal", description: "Identify and merge redundant records" },
  { icon: Building, title: "Name Standardisation", description: "Normalise company names and formats" },
  { icon: FileX, title: "Invalid Record Suppression", description: "Flag or remove bad data at source" },
  { icon: RefreshCw, title: "Format Normalisation", description: "Consistent phone, address, role formats" },
  { icon: Globe, title: "Country & Industry Alignment", description: "Harmonise geographic and sector codes" },
  { icon: FileCheck, title: "De-duplication Scoring", description: "Confidence-scored match candidates" },
];

const DataCleansingStoryBlock = () => {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Section Header */}
        <div className="space-y-3">
          <Badge variant="outline" className="text-xs font-medium tracking-wide uppercase">
            Step 1 — The Foundation
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Every Dataset Starts Imperfect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Most customer data is incomplete, duplicated, or outdated.
            <span className="block mt-1 text-foreground/80">Before enrichment begins, data must be made trustworthy.</span>
          </p>
        </div>

        {/* Visual Before State */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-sm font-medium text-destructive">Before Cleansing</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2 rounded bg-background/50 text-muted-foreground line-through opacity-60">
                    Acme Corp, ACME CORP LTD, acme corporation
                  </div>
                  <div className="p-2 rounded bg-background/50 text-muted-foreground line-through opacity-60">
                    +44 20 7946 0958, 02079460958, 0044-20-7946
                  </div>
                  <div className="p-2 rounded bg-background/50 text-muted-foreground line-through opacity-60">
                    London, LONDON, Greater London, UK-LON
                  </div>
                  <div className="p-2 rounded bg-background/50 text-destructive/60">
                    [Empty], NULL, N/A, --
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-primary">After Cleansing</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2 rounded bg-background/50 text-foreground">
                    Acme Corp Ltd
                  </div>
                  <div className="p-2 rounded bg-background/50 text-foreground">
                    +44 20 7946 0958
                  </div>
                  <div className="p-2 rounded bg-background/50 text-foreground">
                    London, Greater London, United Kingdom
                  </div>
                  <div className="p-2 rounded bg-background/50 text-primary">
                    ✓ Record Validated
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Cleansing Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
          {cleansingSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
            >
              <Card className="h-full hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <step.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{step.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-muted"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">20–30%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">This step alone typically improves usable data by 20–30%.</span>
            {" "}Cleansing is the foundation of any successful data project.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DataCleansingStoryBlock;

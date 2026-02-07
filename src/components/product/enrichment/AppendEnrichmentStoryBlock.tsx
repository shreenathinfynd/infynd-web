import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Bot, UserCheck, Plus, Trash2, Edit, CheckCircle, Clock, Zap } from "lucide-react";

const admvSteps = [
  { icon: Plus, letter: "A", name: "Add", description: "New fields appended", color: "text-emerald-600 bg-emerald-500/10" },
  { icon: Trash2, letter: "D", name: "Delete", description: "Obsolete data removed", color: "text-destructive bg-destructive/10" },
  { icon: Edit, letter: "M", name: "Modify", description: "Outdated values updated", color: "text-amber-600 bg-amber-500/10" },
  { icon: CheckCircle, letter: "V", name: "Verify", description: "Human-checked accuracy", color: "text-primary bg-primary/10" },
];

const enrichmentFields = [
  { field: "Direct Email", before: 42, after: 71 },
  { field: "Phone Number", before: 65, after: 92 },
  { field: "LinkedIn URL", before: 38, after: 64 },
  { field: "Job Title", before: 78, after: 96 },
  { field: "Company Size", before: 55, after: 88 },
];

const AppendEnrichmentStoryBlock = () => {
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
            Step 3 — Human + Machine
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Completing the Missing Picture
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            When automation reaches its limit, humans step in.
            <span className="block mt-1 text-foreground/80">The result: data you can actually use.</span>
          </p>
        </div>

        {/* Human + Machine Flow */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Automation First */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Automated Enrichment</h3>
                    <p className="text-xs text-muted-foreground">AI-powered field completion</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["API lookups across 40+ sources", "Real-time validation checks", "Pattern-based inference", "Confidence scoring per field"].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Zap className="h-3 w-3 text-primary shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Human Verification */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="h-full border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Human Verification</h3>
                    <p className="text-xs text-muted-foreground">Expert review for edge cases</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Manual research for unmatched records", "Quality assurance sampling", "Industry-specific validation", "Turnaround SLAs maintained"].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-3 w-3 text-primary shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ADMV Logic */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-semibold text-foreground mb-4">ADMV Logic — Structured Data Operations</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {admvSteps.map((step, i) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`p-4 rounded-lg ${step.color} text-center`}
                >
                  <div className="text-2xl font-bold mb-1">{step.letter}</div>
                  <div className="text-sm font-medium">{step.name}</div>
                  <div className="text-xs opacity-70 mt-1">{step.description}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Field Enrichment Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-sm font-semibold text-foreground">Field Coverage Before & After</h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  <span className="text-muted-foreground">Before</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">After</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {enrichmentFields.map((field, i) => (
                <motion.div
                  key={field.field}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{field.field}</span>
                    <span className="font-medium text-foreground">
                      <span className="text-muted-foreground/50 line-through mr-2">{field.before}%</span>
                      {field.after}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: `${field.before}%` }}
                      animate={{ width: `${field.after}%` }}
                      transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Turnaround */}
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card className="bg-muted/20">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24–72 hrs</div>
                  <div className="text-sm text-muted-foreground">Typical enrichment turnaround</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary">+25%</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Datasets with 45% initial match often reach 65–70% usable completeness</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AppendEnrichmentStoryBlock;

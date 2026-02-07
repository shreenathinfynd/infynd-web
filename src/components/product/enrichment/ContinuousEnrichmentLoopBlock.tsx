import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { RefreshCw, UserMinus, TrendingUp, Calendar, Database, ArrowRight } from "lucide-react";

const loopSteps = [
  { icon: RefreshCw, title: "Ongoing Enrichment", description: "Continuous field updates as new data surfaces" },
  { icon: UserMinus, title: "Job Change Tracking", description: "Detect role changes and company moves" },
  { icon: TrendingUp, title: "Company Growth Signals", description: "Funding, hiring, expansion alerts" },
  { icon: Calendar, title: "Scheduled Refresh Cycles", description: "Monthly, quarterly, or custom cadence" },
  { icon: Database, title: "CRM Sync Readiness", description: "Direct integration with Salesforce, HubSpot" },
];

const ContinuousEnrichmentLoopBlock = () => {
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
            Step 5 — Ongoing Growth
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Data Is Not a One-Time Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Markets change. People move. Companies evolve.
            <span className="block mt-1 text-foreground/80">Stay current with continuous enrichment.</span>
          </p>
        </div>

        {/* Circular Flow Visual */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="relative">
              {/* Center Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-8"
              >
                <RefreshCw className="h-10 w-10 text-primary-foreground" />
              </motion.div>

              {/* Loop Steps in Circle */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {loopSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="relative"
                  >
                    <Card className="h-full border-dashed hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 text-center">
                        <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                          <step.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h4 className="text-sm font-medium text-foreground mb-1">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                    {/* Arrow connector (except last) */}
                    {i < loopSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Circular Arrow Back */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="hidden md:flex justify-center mt-4"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-muted-foreground/20" />
                  <span className="italic">Cycle repeats</span>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-muted-foreground/20" />
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Refresh Cadence Options */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { cadence: "Monthly", description: "Best for high-velocity sales teams", recommended: true },
            { cadence: "Quarterly", description: "Balanced for most organisations", recommended: false },
            { cadence: "Custom", description: "Tailored to your sales cycle", recommended: false },
          ].map((option, i) => (
            <motion.div
              key={option.cadence}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <Card className={option.recommended ? "border-primary/30 bg-primary/5" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{option.cadence}</h4>
                    {option.recommended && (
                      <Badge variant="default" className="text-[10px]">Recommended</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Final Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="p-5 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
        >
          <p className="text-sm text-center">
            <span className="text-foreground font-medium">Your data is a living asset.</span>
            <span className="text-muted-foreground"> InFynd keeps it working for you — not against you.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContinuousEnrichmentLoopBlock;

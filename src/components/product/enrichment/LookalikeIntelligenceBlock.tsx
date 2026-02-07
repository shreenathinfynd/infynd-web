import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Target, Users, TrendingUp, Globe, Building, Sparkles, BarChart3, Network } from "lucide-react";

const lookalikeSteps = [
  { icon: Target, title: "Analyse Top Accounts", description: "Study your highest-performing customers" },
  { icon: BarChart3, title: "Identify Shared Signals", description: "Extract common firmographic patterns" },
  { icon: Users, title: "Map Role Patterns", description: "Understand seniority and function alignment" },
  { icon: Globe, title: "Expand Across Regions", description: "Apply patterns to new markets" },
  { icon: Sparkles, title: "Score Similarity", description: "Rank prospects by closeness to ideal" },
];

const icpTraits = [
  { trait: "Industry", value: "SaaS & Technology" },
  { trait: "Company Size", value: "50–500 employees" },
  { trait: "Revenue", value: "£5M–£50M" },
  { trait: "Location", value: "UK, DACH, Nordics" },
  { trait: "Tech Stack", value: "Salesforce, HubSpot" },
  { trait: "Growth Signal", value: "Recently funded" },
];

const LookalikeIntelligenceBlock = () => {
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
            Step 4 — From Data to Opportunity
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Your Best Customers Reveal Patterns
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            InFynd finds more of them.
            <span className="block mt-1 text-foreground/80">Lookalikes aren't guesses — they're evidence-based expansions.</span>
          </p>
        </div>

        {/* ICP Card + Network Visual */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* ICP Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="h-full border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ideal Customer Profile</h3>
                    <p className="text-xs text-muted-foreground">Extracted from your top accounts</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {icpTraits.map((item, i) => (
                    <motion.div
                      key={item.trait}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">{item.trait}</span>
                      <Badge variant="secondary" className="text-xs">{item.value}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expanding Network Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="md:col-span-3"
          >
            <Card className="h-full bg-muted/20">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                <div className="relative">
                  {/* Central Node */}
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                      <Building className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Expanding Rings */}
                  <div className="flex justify-center gap-3 flex-wrap">
                    {["98% match", "92% match", "87% match", "84% match", "79% match", "75% match"].map((match, i) => (
                      <motion.div
                        key={match}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                        className="flex flex-col items-center"
                      >
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                          i < 2 ? "border-primary bg-primary/10" : i < 4 ? "border-amber-500 bg-amber-500/10" : "border-muted-foreground/30 bg-muted"
                        }`}>
                          <Building className={`h-4 w-4 ${
                            i < 2 ? "text-primary" : i < 4 ? "text-amber-600" : "text-muted-foreground"
                          }`} />
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1">{match}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex justify-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>Your ICP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full border-2 border-primary bg-primary/10" />
                      <span>High similarity</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full border-2 border-amber-500 bg-amber-500/10" />
                      <span>Medium similarity</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* How Lookalikes Are Built */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {lookalikeSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.3 }}
            >
              <Card className="h-full hover:border-primary/20 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Outcome Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { value: "5–10x", label: "Pipeline expansion potential" },
            { value: "40%", label: "Higher conversion on lookalikes" },
            { value: "< 48 hrs", label: "Lookalike list delivery" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <Card className="bg-muted/20 text-center">
                <CardContent className="p-5">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LookalikeIntelligenceBlock;

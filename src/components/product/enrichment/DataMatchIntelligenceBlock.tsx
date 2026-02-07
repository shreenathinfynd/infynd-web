import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Building, Globe, MapPin, User, BarChart3, Link2 } from "lucide-react";

const matchSignals = [
  { icon: Building, name: "Company Name Similarity", description: "Fuzzy matching with alias detection" },
  { icon: Globe, name: "Domain & Website Signals", description: "URL patterns and redirects" },
  { icon: MapPin, name: "Address & Postcode Logic", description: "Geographic proximity scoring" },
  { icon: User, name: "Role & Seniority Patterns", description: "Title hierarchy matching" },
  { icon: BarChart3, name: "Confidence Scoring", description: "Weighted match probability" },
  { icon: Link2, name: "Multi-source Linking", description: "Cross-reference verification" },
];

const confidenceLevels = [
  { level: "High", range: "85–100%", color: "bg-emerald-500", description: "Auto-matched with confidence" },
  { level: "Medium", range: "60–84%", color: "bg-amber-500", description: "Reviewed for accuracy" },
  { level: "Low", range: "< 60%", color: "bg-orange-400", description: "Flagged for manual check" },
];

const DataMatchIntelligenceBlock = () => {
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
            Step 2 — Intelligent Linking
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Finding What Already Exists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Not all matches are obvious.
            <span className="block mt-1 text-foreground/80">InFynd uses multi-signal matching — not just IDs.</span>
          </p>
        </div>

        {/* Matching Visual */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Left Dataset */}
              <div className="md:col-span-2 p-6 bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium">Your Dataset</span>
                </div>
                <div className="space-y-2">
                  {["TechFlow Solutions", "Apex Group Ltd", "DataWave UK"].map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="p-2 rounded bg-background text-sm font-mono"
                    >
                      {name}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Match Indicator */}
              <div className="md:col-span-1 p-6 flex flex-col items-center justify-center bg-primary/5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="space-y-3 text-center"
                >
                  {confidenceLevels.map((level, i) => (
                    <motion.div
                      key={level.level}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`h-3 w-3 rounded-full ${level.color}`} />
                      <span className="text-xs font-medium">{level.level}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right Dataset */}
              <div className="md:col-span-2 p-6 bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium">InFynd Database</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "TechFlow Solutions Ltd", confidence: "high" },
                    { name: "Apex Group Holdings", confidence: "medium" },
                    { name: "DataWave Technologies", confidence: "high" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`p-2 rounded text-sm font-mono flex items-center justify-between ${
                        item.confidence === "high" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-amber-500/10 border border-amber-500/20"
                      }`}
                    >
                      <span>{item.name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.confidence === "high" ? "98%" : "72%"}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Signals */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {matchSignals.map((signal, i) => (
            <motion.div
              key={signal.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
            >
              <Card className="h-full hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <signal.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{signal.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{signal.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Confidence Levels */}
        <Card className="bg-muted/20">
          <CardContent className="p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4">Match Confidence Scoring</h4>
            <div className="grid sm:grid-cols-3 gap-4">
              {confidenceLevels.map((level, i) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`h-10 w-10 rounded-full ${level.color} flex items-center justify-center shrink-0`}>
                    <span className="text-xs font-bold text-white">{level.range.split("–")[0] || "<60"}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{level.level} Confidence</div>
                    <div className="text-xs text-muted-foreground">{level.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transparency Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Partial matches are flagged, not forced.</span>
            {" "}We don't inflate match rates — transparency builds trust.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DataMatchIntelligenceBlock;

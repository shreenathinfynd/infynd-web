import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";

const CaseStudiesCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <CardContent className="relative p-8 md:p-10">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-3 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wide">Real Results</span>
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Want to See How Others Use This Data?
              </h3>
              
              <p className="text-muted-foreground max-w-xl">
                Discover how sales and marketing teams have transformed their outreach, 
                improved conversion rates, and built reliable pipelines with InFynd data.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>ROI breakdowns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Industry examples</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Implementation stories</span>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="md:col-span-2 flex flex-col items-center md:items-end gap-4">
              <div className="text-center md:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground mb-4">
                  <BookOpen className="h-4 w-4" />
                  <span>Case studies available on request</span>
                </div>
              </div>
              
              <Button size="lg" className="rounded-full px-8 group">
                Request Case Studies
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-muted-foreground text-center md:text-right">
                We'll share relevant examples based on your industry
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CaseStudiesCTA;

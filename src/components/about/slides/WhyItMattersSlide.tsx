import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import infyndTeam from "@/assets/infynd-team.png";

const WhyItMattersSlide = () => (
  <section className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${infyndTeam})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/60 to-background/50" />
    </div>

    <div className="relative max-w-3xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <Heart className="h-10 w-10 text-primary mx-auto" />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Why This Matters to You
        </h2>

        <div className="space-y-4 text-lg text-muted-foreground">
          <p className="text-foreground/90">When you work with InFynd, you're not buying a list.</p>
          <p className="text-foreground">
            You're working with a team that understands how data affects revenue, reputation, and risk.
          </p>
          <p className="text-foreground/90">That's why most of our work starts small — and grows over time.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <p className="text-sm text-foreground/70 mb-4 italic">
            If this aligns with how you think about data…
          </p>
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link to="/products">
              Talk to Sales <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default WhyItMattersSlide;

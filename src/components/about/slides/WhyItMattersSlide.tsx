import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import infyndLogo from "@/assets/infynd-logo.png";

const WhyItMattersSlide = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
    <div className="relative max-w-3xl mx-auto text-center space-y-10 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        <img src={infyndLogo} alt="InFynd" className="h-12 w-auto mx-auto" />

        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Thank You
        </h2>

        <div className="space-y-3 text-lg text-muted-foreground">
          <p>We appreciate your time and interest in InFynd.</p>
          <p className="text-foreground font-medium">
            Let's build something great together — powered by data you can trust.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-6 flex flex-col items-center gap-4"
        >
          <Button size="lg" className="rounded-full px-10" asChild>
            <Link to="/products">
              Explore Our Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground/60 italic">
            www.infynd.com
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default WhyItMattersSlide;

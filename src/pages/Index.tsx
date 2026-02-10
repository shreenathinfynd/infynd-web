import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles, Search, Shield, Globe, Database, ArrowRight, Building2, Users, Layers, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import SearchExperience from "@/components/home/SearchExperience";

const promptChips = [
  "Show me UK email data for retail",
  "What telemarketing data is TPS screened?",
  "Compare postal vs email coverage",
  "Healthcare data for pharma sales",
  "New business leads this month",
  "SOHO data for insurance",
];

const Index = () => {
  const [chipQuery, setChipQuery] = useState<string | undefined>();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Explore data by asking,{" "}
            <span className="text-primary">not browsing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            The unified product experience platform for B2B data. Explore, compare, and understand every dataset — no sales call needed.
          </motion.p>

          {/* Interactive Search Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchExperience externalQuery={chipQuery} />
          </motion.div>

          {/* Prompt Chips — clickable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {promptChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setChipQuery(chip + "_" + Date.now())}
                className="px-4 py-2 rounded-full text-sm bg-card border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

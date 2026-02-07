import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Users, TrendingUp, Megaphone, Briefcase, Heart } from "lucide-react";

const useCases = [
  {
    title: "Run outbound sales campaigns",
    icon: Megaphone,
    description: "Reach decision-makers by phone, email, or post with verified contact data.",
    recommended: ["tele", "email", "postal"],
  },
  {
    title: "Target new business registrations",
    icon: TrendingUp,
    description: "Be the first to reach newly incorporated companies within 24-48 hours.",
    recommended: ["newbiz", "enrichment"],
  },
  {
    title: "Market to healthcare professionals",
    icon: Heart,
    description: "Reach verified HCPs, hospitals, and pharma companies with compliant data.",
    recommended: ["healthcare", "email"],
  },
  {
    title: "Enrich and cleanse my CRM",
    icon: Target,
    description: "Fill gaps, correct errors, and append missing fields to your existing database.",
    recommended: ["enrichment"],
  },
  {
    title: "Reach micro-businesses and sole traders",
    icon: Briefcase,
    description: "Access the hard-to-find SOHO segment that traditional B2B data misses.",
    recommended: ["soho", "tele"],
  },
  {
    title: "Plan retail store locations",
    icon: Users,
    description: "Use POI data and footfall analytics for site selection and competitive analysis.",
    recommended: ["poi"],
  },
];

const UseCasesPage = () => (
  <div className="py-8 px-6 max-w-6xl mx-auto">
    <h1 className="font-display text-3xl font-bold text-foreground mb-2">Use Case Navigator</h1>
    <p className="text-muted-foreground mb-10">Tell us what you want to achieve and we'll recommend the right data products.</p>

    <div className="grid md:grid-cols-2 gap-6">
      {useCases.map((uc) => {
        const recommended = uc.recommended.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
        return (
          <Card key={uc.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <uc.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground mb-1">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{uc.description}</p>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground">Recommended:</span>
                    <div className="flex flex-wrap gap-2">
                      {recommended.map((p) => (
                        <Link key={p.id} to={`/products/${p.slug}`}>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 transition-colors">
                            {p.shortName} <ArrowRight className="h-3 w-3 ml-1" />
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default UseCasesPage;

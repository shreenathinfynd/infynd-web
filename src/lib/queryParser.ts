import { products, type Product } from "@/data/products";

export interface QueryIntent {
  region: string | null;
  segment: "business" | "consumer" | null;
  matchedProducts: Product[];
  keywords: string[];
}

const regionMap: Record<string, string[]> = {
  "United Kingdom": ["uk", "united kingdom", "britain", "british", "england", "london", "manchester"],
  "United States": ["us", "usa", "united states", "america", "american"],
  "Germany": ["germany", "german", "deutschland"],
  "France": ["france", "french"],
  "India": ["india", "indian"],
  "Australia": ["australia", "australian"],
  "Global": ["global", "worldwide", "international", "all countries"],
};

const productKeywords: Record<string, string[]> = {
  postal: ["postal", "mail", "mailing", "direct mail", "catalogue", "address"],
  tele: ["tele", "telemarketing", "phone", "call", "calling", "telephone", "outbound"],
  email: ["email", "e-mail", "newsletter", "inbox"],
  newbiz: ["new business", "new companies", "incorporation", "startup", "start-up", "newly registered"],
  soho: ["soho", "small office", "home office", "sole trader", "freelance", "micro"],
  poi: ["poi", "point of interest", "location", "footfall", "analytics", "store planning", "geospatial"],
  healthcare: ["healthcare", "health", "medical", "pharma", "hospital", "doctor", "nhs", "clinical", "hcp"],
  enrichment: ["enrichment", "append", "match", "cleanse", "data quality", "dedupe"],
};

const consumerKeywords = ["consumer", "b2c", "personal", "individual", "people", "residential"];
const businessKeywords = ["business", "b2b", "corporate", "company", "companies", "enterprise", "commercial"];

export function parseQuery(query: string): QueryIntent {
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  // Detect region
  let region: string | null = null;
  for (const [name, keywords] of Object.entries(regionMap)) {
    if (keywords.some((kw) => q.includes(kw))) {
      region = name;
      break;
    }
  }

  // Detect segment
  let segment: "business" | "consumer" | null = null;
  if (consumerKeywords.some((kw) => q.includes(kw))) segment = "consumer";
  if (businessKeywords.some((kw) => q.includes(kw))) segment = "business";

  // Match products
  const matchedIds = new Set<string>();
  for (const [id, keywords] of Object.entries(productKeywords)) {
    if (keywords.some((kw) => q.includes(kw))) {
      matchedIds.add(id);
    }
  }

  // Also match by industry keywords in use cases
  const industryKeywords = ["retail", "finance", "insurance", "pharma", "technology", "manufacturing"];
  for (const kw of industryKeywords) {
    if (q.includes(kw)) {
      products.forEach((p) => {
        if (
          p.useCases.some((uc) => uc.toLowerCase().includes(kw)) ||
          p.coverageRegions.some((r) => r.industries.some((i) => i.toLowerCase().includes(kw)))
        ) {
          matchedIds.add(p.id);
        }
      });
    }
  }

  // If no products matched and query has substance, show all
  const matchedProducts = matchedIds.size > 0
    ? products.filter((p) => matchedIds.has(p.id))
    : q.length > 2 ? products.slice(0, 4) : [];

  return {
    region,
    segment: segment || "business",
    matchedProducts,
    keywords: words.filter((w) => w.length > 2),
  };
}

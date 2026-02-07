import { useParams, Link, useLocation } from "react-router-dom";
import { getProductBySlug, getRelatedProducts, addOns, type Product } from "@/data/products";
import FilledRatesSection from "@/components/product/FilledRatesSection";
import TelemarketingCoverageBlock from "@/components/product/TelemarketingCoverageBlock";
import EnrichmentStoryExperience from "@/components/product/EnrichmentStoryExperience";
import CaseStudiesCTA from "@/components/product/CaseStudiesCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Shield, ArrowRight, ArrowLeft, Info, Users, Building, ChevronRight, Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};

/* ── Coverage Tab ── */
const CoverageTab = ({ product }: { product: Product }) => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const allIndustries = [...new Set(product.coverageRegions.flatMap((r) => r.industries))];
  const filtered = product.coverageRegions
    .filter((r) => selectedCountry === "all" || r.country === selectedCountry)
    .filter((r) => selectedIndustry === "all" || r.industries.includes(selectedIndustry));
  const totalFiltered = filtered.reduce((sum, r) => sum + r.records, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-48"><SelectValue placeholder="All Countries" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {product.coverageRegions.map((r) => (
              <SelectItem key={r.country} value={r.country}>{r.country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-48"><SelectValue placeholder="All Industries" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {allIndustries.map((ind) => (
              <SelectItem key={ind} value={ind}>{ind}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-primary/5 rounded-xl p-6 text-center">
        <div className="font-display text-4xl font-bold text-primary">{totalFiltered.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground mt-1">records match your filters</div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((region) => (
          <Card key={region.country}>
            <CardContent className="p-4">
              <div className="font-semibold text-foreground">{region.country}</div>
              <div className="text-2xl font-display font-bold text-primary mt-1">{region.records.toLocaleString()}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {region.industries.map((ind) => (
                  <Badge key={ind} variant="secondary" className="text-[10px]">{ind}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ── Sample Data Tab ── */
const SampleDataTab = ({ product }: { product: Product }) => {
  const [view, setView] = useState<"company" | "contact">("company");
  const data = view === "company" ? product.sampleDataCompany : product.sampleDataContact;
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant={view === "company" ? "default" : "outline"} size="sm" onClick={() => setView("company")}>
          <Building className="h-4 w-4 mr-1" /> Company View
        </Button>
        <Button variant={view === "contact" ? "default" : "outline"} size="sm" onClick={() => setView("contact")}>
          <Users className="h-4 w-4 mr-1" /> Contact View
        </Button>
      </div>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col}>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1 cursor-help">
                      {col} <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Field: {col}</TooltipContent>
                  </Tooltip>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col} className="text-sm">{String(row[col])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">* Sample data shown is anonymised. Actual data includes full details.</p>
    </div>
  );
};

/* ── Add-Ons Section ── */
const AddOnsSection = () => {
  const [active, setActive] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const activeAddOns = addOns.filter((a) => active.has(a.id));

  return (
    <div className="border-t pt-8 mt-8">
      <h3 className="font-display font-semibold text-lg mb-4">Enhance with Add-Ons</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {addOns.map((addon) => (
          <div key={addon.id} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/20 transition-colors">
            <Switch checked={active.has(addon.id)} onCheckedChange={() => toggle(addon.id)} id={addon.id} />
            <Label htmlFor={addon.id} className="text-sm cursor-pointer">
              <div className="font-medium">{addon.name}</div>
              <div className="text-[11px] text-muted-foreground">{addon.description}</div>
            </Label>
          </div>
        ))}
      </div>
      {activeAddOns.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Additional fields when enabled:</h4>
          <div className="flex flex-wrap gap-2">
            {activeAddOns.flatMap((a) => a.fields).map((field) => (
              <Badge key={field} variant="outline" className="text-xs">{field}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Main Page ── */
const ProductPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const fromPresentation = location.state?.fromPresentation === true;
  const product = getProductBySlug(slug || "");
  if (!product) return <NotFound />;

  const Icon = iconMap[product.icon] || Sparkles;
  const related = getRelatedProducts(product);

  return (
    <div className="py-8 px-6 max-w-6xl mx-auto">
      {/* Back to Presentation Button - only shows when coming from About page */}
      {fromPresentation && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link to="/about" state={{ returnToSlide: 4 }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Presentation
            </Link>
          </Button>
        </motion.div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="text-muted-foreground mt-1">{product.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{product.totalRecords} records</Badge>
          <Badge variant="outline">{product.countries} countries</Badge>
          {product.complianceStandards.map((std) => (
            <Badge key={std} variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />{std}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0">
          {["Overview", "Coverage & Volumes", "Sample Data", "Data Dictionary", "Related Products"].map((tab) => (
            <TabsTrigger key={tab} value={tab.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {product.id === "enrichment" ? (
            <EnrichmentStoryExperience />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">What is this data?</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{product.description}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Typical Buyers</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {product.typicalBuyers.map((b) => (
                        <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-primary" />{b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader><CardTitle className="text-lg">Use Cases</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.useCases.map((uc) => (
                      <Badge key={uc} variant="secondary">{uc}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Why InFynd?</CardTitle></CardHeader>
                <CardContent>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {product.whyInFynd.map((reason) => (
                      <li key={reason} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />{reason}
                      </li>
                    ))}
                </ul>
                </CardContent>
              </Card>
              <CaseStudiesCTA />
              <AddOnsSection />
            </>
          )}
        </TabsContent>

        {/* Coverage & Volumes */}
        <TabsContent value="coverage-&-volumes" className="mt-6 space-y-8">
          {product.id === "tele" ? (
            <TelemarketingCoverageBlock />
          ) : (
            <>
              <CoverageTab product={product} />
              {product.filledRates && <FilledRatesSection data={product.filledRates} />}
            </>
          )}
        </TabsContent>

        {/* Sample Data */}
        <TabsContent value="sample-data" className="mt-6">
          <SampleDataTab product={product} />
          <AddOnsSection />
        </TabsContent>

        {/* Data Dictionary */}
        <TabsContent value="data-dictionary" className="mt-6">
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data Group</TableHead>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Source Type</TableHead>
                  <TableHead>Update Frequency</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.dataDictionary.map((field) => (
                  <TableRow key={field.name}>
                    <TableCell><Badge variant="secondary" className="text-[10px] whitespace-nowrap">{field.dataGroup || "General"}</Badge></TableCell>
                    <TableCell className="font-mono text-sm">{field.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{field.description}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{field.sourceType}</Badge></TableCell>
                    <TableCell className="text-sm">{field.updateFrequency}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{field.availability || "API & Batch"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${field.confidenceScore}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{field.confidenceScore}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AddOnsSection />
        </TabsContent>

        {/* Related Products */}
        <TabsContent value="related-products" className="mt-6">
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((rp) => {
              const RIcon = iconMap[rp.icon] || Sparkles;
              return (
                <Link key={rp.id} to={`/products/${rp.slug}`}>
                  <Card className="group hover:shadow-lg hover:border-primary/20 transition-all h-full">
                    <CardContent className="p-5">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <RIcon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{rp.shortName}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{rp.tagline}</p>
                      <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <AddOnsSection />
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default ProductPage;

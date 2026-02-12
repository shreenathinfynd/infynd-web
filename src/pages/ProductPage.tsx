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
import { Shield, ArrowRight, ArrowLeft, Info, Users, Building, ChevronRight, Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./NotFound";
import ComingSoon from "./ComingSoon";
import { maskContactInfo } from "@/lib/maskData";

const iconMap: Record<string, React.ElementType> = {
  Mail, Phone, AtSign, Rocket, Home, MapPin, Heart, Sparkles,
};



const sampleAddonValues: Record<string, string[]> = {
  "Funding Amount": ["£250K", "£1.5M", "£5M", "£12M", "£45M"],
  "Funding Type": ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"],
  "Lead Investor Name": ["LocalGlobe", "Index Ventures", "Accel", "Balderton", "Insight Partners"],
  "Lead Investor Industry": ["Tech", "Fintech", "SaaS", "Health", "Generalist"],
  "No. of Investors": ["2", "4", "6", "8", "12"],
  "Funding Announced Date": ["Jan 2023", "Mar 2023", "Jun 2023", "Sep 2023", "Dec 2023"],
  "Director Changes 12M": ["0", "1", "2", "0", "3"],
  "Senior Hiring Trend": ["Stable", "Growing", "Rapid Growth", "Stable", "Declining"],
  "Attrition Rate Estimated": ["Low", "Low", "Medium", "Low", "High"],
  "Control Risk Score": ["Low", "Low", "Medium", "Low", "High"],
  "Critical Role Vacancies": ["None", "CTO", "None", "CFO", "None"],
  "Key Person Dependency": ["Low", "Medium", "Low", "High", "Low"],
  "Technology Product Name": ["Salesforce", "HubSpot", "AWS", "Azure", "Google Cloud"],
  "Technology Category": ["CRM", "Marketing", "Cloud", "Cloud", "Cloud"],
  "Technology Version": ["Enterprise", "Pro", "2023", "v4.5", "N/A"],
  "Technology Vendor": ["Salesforce", "HubSpot", "Amazon", "Microsoft", "Google"],
  "Technology Domain": ["Sales", "Marketing", "Infra", "Infra", "Infra"],
  "Target Markets": ["UK Only", "UK & EU", "Global", "US & UK", "Global"],
  "Customer Type": ["SME", "Mid-Market", "Enterprise", "Mid-Market", "Enterprise"],
  "Go-To-Market Model": ["PLG", "Sales-Led", "Channel", "Sales-Led", "Hybrid"],
  "Competitive Density": ["Low", "Medium", "High", "Medium", "High"],
  "Market Growth Rate": ["5%", "10%", "15%", "8%", "20%"],
  "Moat Type": ["IP", "Brand", "Network Effect", "Cost", "Switching Cost"],
  "Strategic Position": ["Challenger", "Leader", "Niche", "Leader", "Incumbent"],
  "Core Product Type": ["Service", "Platform", "Hardware", "Marketplace", "Data"],
  "Regulatory Dependency": ["Low", "Medium", "High", "High", "Medium"],
  "Compliance Readiness": ["High", "Medium", "High", "High", "Medium"],
  "AI Act Exposure": ["None", "Low", "High", "Medium", "Low"],
  "Data Privacy Risk": ["Low", "Medium", "High", "Low", "Medium"],
  "Vendor Lock-In Risk": ["Low", "High", "Medium", "High", "Low"],
  "Glassdoor Rating": ["4.5★", "3.2★", "4.0★", "4.8★", "3.8★"],
  "Trustpilot Rating": ["4.8/5", "2.5/5", "4.2/5", "4.6/5", "3.5/5"],
  "Google Rating": ["4.7", "3.0", "4.3", "4.5", "3.9"],
  "Controversy Flag": ["None", "Minor", "None", "None", "Major"],
  "Sentiment Score": ["Positive", "Negative", "Neutral", "Positive", "Neutral"],
  "Thought Leadership Score": ["High", "Low", "Medium", "High", "Low"],
  "Domain Authority": ["45", "25", "65", "80", "35"],
  "Ranking Keywords": ["500", "1.2K", "50K", "120K", "5K"],
  "Domain Organic Traffic": ["2K", "5K", "150K", "500K", "10K"],
  "Traffic Value": ["£1K", "£5K", "£80K", "£250K", "£15K"],
  "Spam Score": ["1%", "5%", "0%", "1%", "12%"],
  "Domain Age Days": ["1200", "800", "5000", "8500", "2000"],
  "Ultimate Parent Name": ["Private", "Global Corp", "Holding Group", "Investment Fund", "Private"],
  "Immediate Parent Name": ["N/A", "Regional Sub", "N/A", "Portfolio Co", "N/A"],
  "Corporate Group L1": ["N/A", "EMEA Div", "N/A", "Fund IV", "N/A"],
  "Corporate Group L2": ["N/A", "UK Ops", "N/A", "Tech Assets", "N/A"],
};

const getSampleAddonData = (field: string, index: number) => {
  const values = sampleAddonValues[field];
  if (!values || values.length === 0) return "Sample";
  return values[index % values.length];
};

/* ── Sample Data Tab ── */
const SampleDataTab = ({ product, addonFields, region, selectedCountry }: { product: Product; addonFields: string[]; region: string; selectedCountry?: string }) => {
  const [view, setView] = useState<"company" | "contact">("company");

  const rawData = view === "company" ? product.sampleDataCompany : product.sampleDataContact;
  const europeCountries = ["Germany", "France", "Netherlands", "Ireland", "Belgium", "Spain", "Italy", "Austria", "Switzerland", "Poland", "Sweden", "Norway", "Denmark", "Finland", "Portugal"];

  // Filter data based on region prop
  const filteredData = rawData.filter((row) => {
    const rowCountry = String(row["Country"] || row["Main Country"] || row["country"] || "");

    // Check for specific country if selected
    if (selectedCountry && region === "EU") return rowCountry === selectedCountry;

    if (region === "UK") return rowCountry === "United Kingdom";
    if (region === "EU") return europeCountries.includes(rowCountry);
    return true; // Global matches all
  });

  const data = filteredData;
  // Use rawData for columns if filtered data is empty to preserve table headers
  const baseColumns = data.length > 0 ? Object.keys(data[0]) : (rawData.length > 0 ? Object.keys(rawData[0]) : []);
  const columns = [...baseColumns, ...addonFields];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant={view === "company" ? "default" : "outline"} size="sm" onClick={() => setView("company")}>
            <Building className="h-4 w-4 mr-1" /> Company View
          </Button>
          <Button variant={view === "contact" ? "default" : "outline"} size="sm" onClick={() => setView("contact")}>
            <Users className="h-4 w-4 mr-1" /> Contact View
          </Button>
        </div>

        {selectedCountry && (
          <Badge variant="outline" className="ml-auto">
            <MapPin className="h-3 w-3 mr-1" />
            Filtering by: {selectedCountry}
          </Badge>
        )}
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {baseColumns.map((col) => (
                <TableHead key={col}>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1 cursor-help whitespace-nowrap">
                      {col} <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Field: {col}</TooltipContent>
                  </Tooltip>
                </TableHead>
              ))}
              {addonFields.map((col) => (
                <TableHead key={`addon-${col}`} className="bg-primary/5 backdrop-blur-md">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1 cursor-help text-primary whitespace-nowrap blur-[2px]">
                      {col} <Sparkles className="h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent>Add-On Field: {col}</TooltipContent>
                  </Tooltip>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <TableRow key={i}>
                  {baseColumns.map((col) => {
                    const value = String(row[col]);
                    const lowerCol = col.toLowerCase();
                    // Mask if column name suggests contact info
                    const shouldMask = lowerCol.includes('email') ||
                      lowerCol.includes('phone') ||
                      lowerCol.includes('mobile') ||
                      lowerCol.includes('tel') ||
                      lowerCol.includes('dial');
                    const displayValue = shouldMask ? maskContactInfo(value) : value;

                    return (
                      <TableCell key={col} className="text-sm whitespace-nowrap">
                        {displayValue}
                      </TableCell>
                    );
                  })}
                  {addonFields.map((col) => (
                    <TableCell
                      key={`addon-${col}`}
                      className="text-sm text-foreground italic bg-primary/5 whitespace-nowrap blur-md select-none min-w-[150px]"
                    >
                      {row[col] || getSampleAddonData(col, i)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No sample data available for {selectedCountry ? selectedCountry : region}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Unlock indicator below table - only show when addons are enabled */}
      {addonFields.length > 0 && (
        <div className="flex items-center justify-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <Lock className="h-5 w-5 text-primary/70" />
          <div className="flex-1">
            <p className="text-sm font-medium">Premium Add-Ons Active</p>
            <p className="text-xs text-muted-foreground">Enhanced fields are blurred. Contact sales to unlock full access.</p>
          </div>
          <Button
            size="sm"
            variant="default"
            className="shrink-0"
            onClick={() => alert('Contact sales to unlock premium add-ons!')}
          >
            <Lock className="h-3 w-3 mr-1.5" />
            Request Access
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">* Sample data shown is anonymised. Actual data includes full details.</p>
    </div>
  );
};

/* ── Add-Ons Section ── */
const AddOnsSection = ({ active, toggle }: { active: Set<string>; toggle: (id: string) => void }) => {
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
const ProductPage = ({ productOverride, regionOverride, countryOverride }: { productOverride?: Product; regionOverride?: string; countryOverride?: string }) => {
  const { slug } = useParams();
  const location = useLocation();
  const fromPresentation = location.state?.fromPresentation === true;
  const selectedRegion = regionOverride || location.state?.selectedRegion || "Global";
  const selectedCountry = countryOverride || location.state?.selectedCountry; // Get selected country from state
  const product = productOverride || getProductBySlug(slug || "");

  const [activeAddOns, setActiveAddOns] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("overview");

  const toggleAddOn = (id: string) => {
    setActiveAddOns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const addonFields = addOns.filter((a) => activeAddOns.has(a.id)).flatMap((a) => a.fields);

  // Data Dictionary Filtering (Pass-through for now as fields are global)
  // If in future fields become region-specific, add logic here.
  const filteredDictionary = product?.dataDictionary || [];

  // Special Handling for "Coming Soon" scenarios
  const isGlobalUniverse = slug === "global-universe";

  // Return Coming Soon if:
  // 1. It is the special Global Universe slug
  // 2. We are in Global Region (blocking all products in Global view?) -> User said "in product global when the card is clicked".
  //    Wait, "Global Universe" IS the card.
  //    What if I click "Email" in Global view?
  //    If "Email" in Global view is clicked, it goes to /products/email with selectedRegion="Global".
  //    User said "in product global when the card is clicked". Singular? Plural? 
  //    "when the card is clicked" usually implies the main card.
  //    But let's assume ALL global products.
  //    Actually, "Global Universe" is the only card shown in Global view (Step 97 logic: region === "Global" ? (Single Card) : (List)).
  //    So handled by isGlobalUniverse.

  // 3. We are in UK Region AND product is NOT uk-universe
  const isRestrictedUK = selectedRegion === "UK" && product?.id !== "uk-universe";

  if (isGlobalUniverse || isRestrictedUK) {
    return <ComingSoon />;
  }

  if (!product) return <NotFound />;

  const Icon = iconMap[product.icon] || Sparkles;
  const related = getRelatedProducts(product);

  // Use region from navigation state (from DataProductsPage), default to Global
  const region = selectedRegion;

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
          {region !== "UK" && !selectedCountry && (
            <Badge variant="outline">{product.countries} countries</Badge>
          )}
          {region !== "Global" && (
            <Badge variant="default" className="bg-primary">
              Showing {selectedCountry || region} Data
            </Badge>
          )}
          {product.complianceStandards.map((std) => (
            <Badge key={std} variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />{std}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-0">
        <div className="border-b pb-4 mb-8">
          <TabsList className="bg-transparent p-0 justify-start h-auto gap-2 flex-wrap">
            {(() => {
              const isUniverse = product.id === "uk-universe" || product.id === "ireland-universe";
              const isUKUniverse = product.id === "uk-universe";

              let tabs = [];

              if (isUniverse) {
                tabs = ["Overview", "Volume", "Sample Data", "Data Dictionary"];
                if (isUKUniverse) tabs.push("Related Products");
              } else {
                // Individual products
                tabs = ["Overview", "Volume & Filled Rate", "Volume & Sample", "Data Dictionary", "Related Products"];
              }

              return tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-4 border border-transparent data-[state=active]:border-primary/20"
                >
                  {tab}
                </TabsTrigger>
              ));
            })()}
          </TabsList>
        </div>

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
              <AddOnsSection active={activeAddOns} toggle={toggleAddOn} />
            </>
          )}
        </TabsContent>

        {/* Stats / Filled Rates / Volume Section */}
        {/* For Universe: "Volume" */}
        <TabsContent value="volume" className="mt-6 space-y-8">
          {product.id === "tele" ? (
            <TelemarketingCoverageBlock />
          ) : (
            <>
              {product.filledRates && <FilledRatesSection data={product.filledRates} />}
            </>
          )}
        </TabsContent>
        {/* For Individual: "Volume & Filled Rate" */}
        <TabsContent value="volume-filled-rate" className="mt-6 space-y-8">
          {product.id === "tele" ? (
            <TelemarketingCoverageBlock />
          ) : (
            <>
              {product.filledRates && <FilledRatesSection data={product.filledRates} />}
            </>
          )}
        </TabsContent>

        {/* Sample Data Section */}
        {/* For Universe: "Sample Data" */}
        <TabsContent value="sample-data" className="mt-6">
          <SampleDataTab product={product} addonFields={addonFields} region={region} selectedCountry={selectedCountry} />
          <AddOnsSection active={activeAddOns} toggle={toggleAddOn} />
        </TabsContent>
        {/* For Individual: "Volume & Sample" */}
        <TabsContent value="volume-sample" className="mt-6">
          <SampleDataTab product={product} addonFields={addonFields} region={region} selectedCountry={selectedCountry} />
          <AddOnsSection active={activeAddOns} toggle={toggleAddOn} />
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
                {filteredDictionary.map((field) => (
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
                {addonFields.map((field) => (
                  <TableRow key={`addon-${field}`} className="bg-primary/5">
                    <TableCell><Badge variant="outline" className="text-[10px] whitespace-nowrap border-primary/30 text-primary">Add-On</Badge></TableCell>
                    <TableCell className="font-mono text-sm">{field}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">Enhanced data field from add-on module</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">Enriched</Badge></TableCell>
                    <TableCell className="text-sm">Monthly</TableCell>
                    <TableCell className="text-xs text-muted-foreground">API & Batch</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                        </div>
                        <span className="text-xs text-muted-foreground">85%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AddOnsSection active={activeAddOns} toggle={toggleAddOn} />
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
          <AddOnsSection active={activeAddOns} toggle={toggleAddOn} />
        </TabsContent>
      </Tabs>

    </div >
  );
};

export default ProductPage;

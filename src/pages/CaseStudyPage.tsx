import { useParams, Link } from "react-router-dom";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { ArrowLeft, CheckSquare } from "lucide-react";
import NotFound from "./NotFound";
import merchantGraph from "@/assets/merchant-terminal-graph-v2.png";
import indeedLogo from "@/assets/indeed-logo.svg";
import britanniaLogo from "@/assets/britannia-logo.png";

const CaseStudyPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

    if (!caseStudy) {
        return <NotFound />;
    }

    const isMerchantTerminal = caseStudy.id === "merchant-terminal";
    const isIndeed = caseStudy.id === "indeed-email";
    const isFleet = caseStudy.id === "fleet-database";

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="py-6 px-6 border-b">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to About
                    </Link>
                </div>
            </section>

            {/* Title + Client Logo */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto py-6 flex items-center justify-between">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        {caseStudy.title}
                    </h1>
                    {isFleet && (
                        <img src={britanniaLogo} alt="Britannia Car Leasing" className="h-12 md:h-16" />
                    )}
                </div>
            </section>

            {/* Top Data Table */}
            {caseStudy.dataTable && (
                <section className="px-6 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm">
                                <thead>
                                     <tr className="bg-background text-foreground">
                                         <th className="p-3 text-left font-semibold border-r border-border"></th>
                                         <th className="p-3 text-center font-semibold border-r border-border"></th>
                                         <th colSpan={2} className="p-3 text-center font-semibold border-r border-border">
                                             Business level
                                         </th>
                                         <th colSpan={2} className="p-3 text-center font-semibold">
                                             Contact level
                                         </th>
                                     </tr>
                                     <tr className="bg-background text-foreground border-t border-border">
                                         {caseStudy.dataTable.headers.map((header, idx) => (
                                             <th key={idx} className="p-3 text-center font-semibold border-r border-border last:border-r-0">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {caseStudy.dataTable.rows.map((row, idx) => (
                                        <tr key={idx} className="bg-primary/5">
                                            {Object.values(row).map((value, cellIdx) => (
                                                <td key={cellIdx} className={`p-3 ${cellIdx === 0 ? 'font-medium' : 'text-center'} border-r border-border last:border-r-0`}>
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* Indeed-specific layout */}
            {isIndeed ? (
                <section className="px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-5 gap-8">
                            {/* Left Column: Objective + Solution cards */}
                            <div className="md:col-span-3 space-y-6">
                                {caseStudy.objective && (
                                    <div className="border rounded-2xl p-6 bg-background">
                                        <h2 className="font-bold text-lg text-primary mb-3">Objective</h2>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {caseStudy.objective.description}
                                        </p>
                                    </div>
                                )}

                                <div className="border rounded-2xl p-6 bg-background">
                                    <h2 className="font-bold text-lg text-primary mb-3">Solution</h2>
                                    <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                                        {caseStudy.solution.points[0]}
                                    </p>
                                    {caseStudy.solution.subPoints?.map((group, gIdx) => (
                                        <div key={gIdx} className="mb-4 last:mb-0">
                                            <h3 className="text-sm font-semibold mb-2">{group.title}</h3>
                                            <ul className="space-y-1 pl-4">
                                                {group.items.map((item, iIdx) => (
                                                    <li key={iIdx} className="text-sm text-muted-foreground list-disc">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Results */}
                            <div className="md:col-span-2 flex flex-col items-center justify-center space-y-8">
                                {isIndeed && <img src={indeedLogo} alt="Indeed" className="h-10 md:h-14" />}
                                <h2 className="font-bold text-xl">The Results</h2>
                                {caseStudy.results.metrics.map((metric, idx) => (
                                    <div key={idx} className="text-center">
                                        {metric.description && (
                                            <p className="text-sm text-muted-foreground mb-1">{metric.description}</p>
                                        )}
                                        <div className="text-6xl font-bold text-foreground">{metric.value}</div>
                                        <div className="text-base font-semibold text-primary mt-1">{metric.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : isFleet ? (
                /* Fleet Database — full case study layout */
                <>
                    {/* Section 1: What It Is */}
                    <section className="px-6 pb-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="border rounded-2xl p-6 bg-background">
                                <h2 className="font-bold text-lg text-primary mb-3">Fleet Database — What It Is</h2>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {caseStudy.overview}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 & 3: Challenge + Solution side-by-side */}
                    <section className="px-6 pb-8">
                        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
                            {caseStudy.challenge && (
                                <div className="border rounded-2xl p-6 bg-background">
                                    <h2 className="font-bold text-lg text-primary mb-3">{caseStudy.challenge.title}</h2>
                                    <ul className="space-y-2 pl-4">
                                        {caseStudy.challenge.points.map((point, idx) => (
                                            <li key={idx} className="text-sm leading-relaxed text-muted-foreground list-disc">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="border rounded-2xl p-6 bg-background">
                                <h2 className="font-bold text-lg text-primary mb-3">{caseStudy.solution.title || "Solution"}</h2>
                                <ul className="space-y-2 pl-4">
                                    {caseStudy.solution.points.map((point, idx) => (
                                        <li key={idx} className="text-sm leading-relaxed text-muted-foreground list-disc">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Before vs After */}
                    {caseStudy.benefits && (
                        <section className="px-6 pb-8">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="font-bold text-xl text-foreground mb-6 text-center">{caseStudy.benefits.title}</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="border rounded-2xl p-6 bg-background">
                                        <h3 className="font-semibold text-base text-muted-foreground mb-4">Before InFynd</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center border-b border-border pb-2">
                                                <span className="text-sm text-muted-foreground">Open Rate</span>
                                                <span className="text-lg font-bold text-muted-foreground">11.90%</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-border pb-2">
                                                <span className="text-sm text-muted-foreground">Click Rate</span>
                                                <span className="text-lg font-bold text-muted-foreground">3.30%</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground pt-1">Limited engagement · Inconsistent lead flow</p>
                                        </div>
                                    </div>
                                    <div className="border-2 border-primary/30 rounded-2xl p-6 bg-primary/5">
                                        <h3 className="font-semibold text-base text-primary mb-4">After InFynd</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                                                <span className="text-sm text-foreground">Open Rate</span>
                                                <span className="text-lg font-bold text-primary">16.42%</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                                                <span className="text-sm text-foreground">Click Rate</span>
                                                <span className="text-lg font-bold text-primary">6.01%</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground pt-1">Consistent campaign performance · Improved lead quality</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-4 italic">
                                    Based on campaigns using InFynd-supplied email data
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Section 5: Business Results */}
                    <section className="px-6 pb-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="font-bold text-xl text-foreground mb-6 text-center">Business Results</h2>
                            <div className="grid grid-cols-3 gap-6">
                                {caseStudy.results.metrics.map((metric, idx) => (
                                    <div key={idx} className="text-center border rounded-2xl p-6 bg-background">
                                        <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{metric.value}</div>
                                        <div className="text-sm font-semibold text-foreground">{metric.label}</div>
                                        {metric.description && (
                                            <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Testimonial */}
                    {caseStudy.testimonial && (
                        <section className="px-6 pb-8">
                            <div className="max-w-7xl mx-auto">
                                <div className="border rounded-2xl p-8 bg-muted/20">
                                    <blockquote className="italic text-sm leading-relaxed text-muted-foreground mb-4">
                                        "{caseStudy.testimonial.quote}"
                                    </blockquote>
                                    {caseStudy.testimonial.author && (
                                        <p className="text-sm font-semibold text-primary">— {caseStudy.testimonial.author}</p>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section 7: Why It Matters */}
                    <section className="px-6 pb-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="border rounded-2xl p-6 bg-background">
                                <h2 className="font-bold text-lg text-primary mb-3">Why This Matters for You</h2>
                                <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                                    This case study demonstrates what happens when data is built specifically for your market, your audience, and your revenue goals.
                                </p>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    The Fleet Database is not a static list — it is a continuously validated dataset designed to perform in real campaigns.
                                </p>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                /* Default two-column layout for other case studies */
                <section className="px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-5 gap-8">
                            {/* Left Column: Company Overview */}
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h2 className="font-bold text-lg mb-3">Company Overview:</h2>
                                    <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                                        {caseStudy.overview}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {caseStudy.solution.points.map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckSquare className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                                            <span className="text-sm font-semibold">{point}</span>
                                        </div>
                                    ))}
                                </div>

                                {caseStudy.solution.subPoints && caseStudy.solution.subPoints[0] && (
                                    <div className="space-y-2">
                                        {caseStudy.solution.subPoints[0].items.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <CheckSquare className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Case Study Graph */}
                            <div className="md:col-span-3 space-y-4">
                                <h2 className="font-bold text-lg">Case Study</h2>

                                {isMerchantTerminal ? (
                                    <div className="border rounded-lg p-4 bg-muted/20">
                                        <img
                                            src={merchantGraph}
                                            alt="DMC to Connect % and APP to DMC % by Date and Provider"
                                            className="w-full h-auto rounded"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {caseStudy.objective && (
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium">{caseStudy.objective.description}</p>
                                            </div>
                                        )}
                                        <div className="border rounded-lg p-8 bg-muted/30 flex items-center justify-center min-h-[300px]">
                                            <p className="text-muted-foreground text-sm">Chart visualization area</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Results Metrics — hidden for merchant-terminal, indeed, fleet */}
            {!isMerchantTerminal && !isIndeed && !isFleet && (
                <section className="px-6 pb-12">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {caseStudy.results.metrics.map((metric, idx) => (
                                <div key={idx} className="border rounded-lg p-4 bg-background">
                                    <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                                    <div className="text-sm font-medium">{metric.label}</div>
                                    {metric.description && (
                                        <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonial — hidden for fleet (shown inline) */}
            {caseStudy.testimonial && !isFleet && (
                <section className="px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground text-sm leading-relaxed">
                            "{caseStudy.testimonial.quote}"
                        </blockquote>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto border-t pt-8 text-center">
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        Ready to achieve similar results?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Let us help you unlock the power of high-quality, compliant B2B data for your business.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center rounded-md px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            Explore Our Products
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center rounded-md px-6 py-2.5 border border-input text-sm font-medium hover:bg-accent transition-colors"
                        >
                            View More Case Studies
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyPage;

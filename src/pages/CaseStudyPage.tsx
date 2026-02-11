import { useParams, Link } from "react-router-dom";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { ArrowLeft, CheckSquare } from "lucide-react";
import NotFound from "./NotFound";

const CaseStudyPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

    if (!caseStudy) {
        return <NotFound />;
    }

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

            {/* Title */}
            <section className="py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-display text-4xl font-bold text-foreground italic">
                        {caseStudy.title}
                    </h1>
                </div>
            </section>

            {/* Top Data Table */}
            {caseStudy.dataTable && (
                <section className="px-6 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-black text-white">
                                        <th className="p-3 text-left font-semibold border-r border-white/20">
                                            {caseStudy.dataTable.headers[0]}
                                        </th>
                                        <th colSpan={2} className="p-3 text-center font-semibold border-r border-white/20">
                                            Business level
                                        </th>
                                        <th colSpan={2} className="p-3 text-center font-semibold">
                                            Contact level
                                        </th>
                                    </tr>
                                    <tr className="bg-black text-white border-t border-white/20">
                                        <th className="p-3 text-left font-semibold border-r border-white/20"></th>
                                        {caseStudy.dataTable.headers.slice(1).map((header, idx) => (
                                            <th key={idx} className="p-3 text-center font-semibold border-r border-white/20 last:border-r-0">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {caseStudy.dataTable.rows.map((row, idx) => (
                                        <tr key={idx} className="bg-muted/30">
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

            {/* Two Column Layout: Overview + Case Study */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column: Company Overview */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-bold text-lg mb-4">Company Overview:</h2>
                                <p className="text-sm leading-relaxed text-justify">
                                    {caseStudy.overview}
                                </p>
                            </div>

                            {/* Solution Points */}
                            <div className="space-y-2">
                                {caseStudy.solution.points.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <CheckSquare className="h-4 w-4 shrink-0 mt-0.5" />
                                        <span className="text-sm font-semibold">{point}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Data Coverage */}
                            {caseStudy.solution.subPoints && caseStudy.solution.subPoints[0] && (
                                <div className="space-y-2">
                                    {caseStudy.solution.subPoints[0].items.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckSquare className="h-4 w-4 shrink-0 mt-0.5" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Case Study (Charts would go here) */}
                        <div className="space-y-6">
                            <h2 className="font-bold text-lg">Case Study</h2>

                            {/* Objective */}
                            {caseStudy.objective && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">{caseStudy.objective.description}</p>
                                </div>
                            )}

                            {/* Placeholder for charts */}
                            <div className="border rounded-lg p-8 bg-muted/30 flex items-center justify-center min-h-[300px]">
                                <p className="text-muted-foreground text-sm">Chart visualization area</p>
                            </div>

                            <div className="border rounded-lg p-8 bg-muted/30 flex items-center justify-center min-h-[300px]">
                                <p className="text-muted-foreground text-sm">Chart visualization area</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Data Tables */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Results Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {caseStudy.results.metrics.map((metric, idx) => (
                            <div key={idx} className="border rounded-lg p-4 bg-background">
                                <div className="text-3xl font-bold text-primary mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-medium">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Data Table Placeholder */}
                    <div className="border rounded-lg p-6 bg-muted/30">
                        <p className="text-sm text-muted-foreground text-center">Additional detailed data tables section</p>
                    </div>
                </div>
            </section>

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

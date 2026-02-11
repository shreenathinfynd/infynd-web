import { useParams, Link } from "react-router-dom";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { ArrowLeft, Phone, Mail, Database, Building, TrendingUp, CheckCircle, Quote, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const iconMap: Record<string, React.ElementType> = {
    Phone,
    Mail,
    Database,
};

const CaseStudyPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

    if (!caseStudy) {
        return <NotFound />;
    }

    const Icon = iconMap[caseStudy.icon] || Database;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-12 px-6 border-b">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to About
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <Badge variant="secondary">{caseStudy.category}</Badge>
                        </div>

                        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                            {caseStudy.client}
                        </h1>

                        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
                            {caseStudy.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                            <div>
                                <span className="font-medium text-foreground">Industry:</span> {caseStudy.industry}
                            </div>
                            <div>
                                <span className="font-medium text-foreground">Category:</span> {caseStudy.category}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Overview */}
                    {caseStudy.overview && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Building className="h-5 w-5 text-primary" />
                                        Company Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{caseStudy.overview}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Objective */}
                    {caseStudy.objective && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        {caseStudy.objective.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground leading-relaxed">
                                        {caseStudy.objective.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Challenge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <AlertCircle className="h-5 w-5 text-primary" />
                                    {caseStudy.challenge.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {caseStudy.challenge.points.map((point, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Solution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    {caseStudy.solution.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="space-y-2">
                                    {caseStudy.solution.points.map((point, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-infynd-success shrink-0 mt-0.5" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                {/* Sub-points */}
                                {caseStudy.solution.subPoints && (
                                    <div className="space-y-4 pt-4 border-t">
                                        {caseStudy.solution.subPoints.map((section, idx) => (
                                            <div key={idx}>
                                                <h4 className="font-semibold text-foreground mb-2 text-sm">{section.title}</h4>
                                                <ul className="space-y-1.5">
                                                    {section.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className="text-sm text-muted-foreground flex items-start gap-2 pl-4">
                                                            <span className="text-primary">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Benefits */}
                    {caseStudy.benefits && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">{caseStudy.benefits.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {caseStudy.benefits.points.map((point, idx) => (
                                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-infynd-success shrink-0 mt-0.5" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="space-y-6">
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                {caseStudy.results.title}
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {caseStudy.results.metrics.map((metric, idx) => (
                                    <Card key={idx}>
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-4xl font-bold text-primary mb-2">
                                                {metric.value}
                                            </div>
                                            <div className="font-medium text-foreground mb-1">
                                                {metric.label}
                                            </div>
                                            {metric.description && (
                                                <div className="text-xs text-muted-foreground">
                                                    {metric.description}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Table */}
                    {caseStudy.dataTable && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">{caseStudy.dataTable.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    {caseStudy.dataTable.headers.map((header, idx) => (
                                                        <th key={idx} className="p-3 text-left font-semibold text-foreground">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {caseStudy.dataTable.rows.map((row, idx) => (
                                                    <tr key={idx} className="border-b">
                                                        {Object.values(row).map((value, cellIdx) => (
                                                            <td key={cellIdx} className="p-3 text-muted-foreground">
                                                                {value}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Testimonial */}
                    {caseStudy.testimonial && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Card>
                                <CardContent className="pt-6">
                                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                                    <blockquote className="text-base text-foreground italic leading-relaxed mb-4">
                                        "{caseStudy.testimonial.quote}"
                                    </blockquote>
                                    {(caseStudy.testimonial.author || caseStudy.testimonial.position) && (
                                        <div className="text-sm text-muted-foreground border-t pt-4">
                                            {caseStudy.testimonial.author && (
                                                <div className="font-semibold text-foreground">
                                                    {caseStudy.testimonial.author}
                                                </div>
                                            )}
                                            {caseStudy.testimonial.position && (
                                                <div>{caseStudy.testimonial.position}</div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="pt-8 border-t text-center"
                    >
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
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyPage;

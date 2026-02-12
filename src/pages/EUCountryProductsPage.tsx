import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Shield,
    ArrowRight,
    Sparkles,
    Mail,
    Phone,
    AtSign,
    Rocket,
    Home,
    MapPin,
    Heart,
    X,
    GitCompare,
    ArrowLeft,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
    Mail,
    Phone,
    AtSign,
    Rocket,
    Home,
    MapPin,
    Heart,
    Sparkles,
};

const europeCountries = [
    "Germany",
    "France",
    "Netherlands",
    "Ireland",
    "Belgium",
    "Spain",
    "Italy",
    "Austria",
    "Switzerland",
    "Poland",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Portugal",
];

const comparisonRows = [
    { label: "Total Records", render: (p: typeof products[0]) => p.totalRecords },
    {
        label: "Countries",
        render: (p: typeof products[0]) => String(p.countries),
    },
    { label: "Category", render: (p: typeof products[0]) => p.category },
    {
        label: "Compliance",
        render: (p: typeof products[0]) => p.complianceStandards.join(", "),
    },
    {
        label: "Use Cases",
        render: (p: typeof products[0]) => p.useCases.slice(0, 3).join(", "),
    },
    {
        label: "Fields Available",
        render: (p: typeof products[0]) => String(p.dataDictionary.length),
    },
];

const EUCountryProductsPage = () => {
    const { country } = useParams<{ country: string }>();
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [showCompare, setShowCompare] = useState(false);

    // Convert URL param back to country name
    const countryName = country
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // Filter products that have coverage in the selected country
    const filteredProducts = products.filter((product) =>
        product.coverageRegions.some((region) => region.country === countryName)
    );

    const toggleProduct = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else if (next.size < 3) {
                next.add(id);
            }
            return next;
        });
    };

    const selectedProducts = filteredProducts.filter((p) => selected.has(p.id));

    // Get country-specific stats
    const getCountryRecords = (product: typeof products[0]) => {
        const region = product.coverageRegions.find(
            (r) => r.country === countryName
        );
        return region ? region.records : "N/A";
    };

    return (
        <div className="py-8 px-6 max-w-6xl mx-auto">
            {/* Back Button + Breadcrumb */}
            <div className="mb-6">
                <Button variant="outline" size="sm" asChild className="rounded-full">
                    <Link to="/products/eu">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to EU Countries
                    </Link>
                </Button>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-foreground">
                    Home
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/products" className="hover:text-foreground">
                    Products
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/products/eu" className="hover:text-foreground">
                    EU
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{countryName}</span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground">
                            {countryName} Data Products
                        </h1>
                        <p className="text-muted-foreground">
                            {filteredProducts.length} products available for {countryName}
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredProducts.map((product, i) => {
                    const Icon = iconMap[product.icon] || Sparkles;
                    const isSelected = selected.has(product.id);

                    const cardContent = (
                        <Card
                            className={`relative h-full transition-all duration-300 cursor-pointer group ${isSelected
                                ? "border-primary shadow-md ring-1 ring-primary/20"
                                : "hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                                }`}
                        >
                            <CardContent className="p-5">
                                {/* Checkbox */}
                                <div className="absolute top-4 right-4 z-10">
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => { }}
                                        onClick={(e) => toggleProduct(product.id, e)}
                                        disabled={!isSelected && selected.size >= 3}
                                        aria-label={`Select ${product.name} for comparison`}
                                    />
                                </div>

                                <div className="flex items-start gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                                        <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="pr-6">
                                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {product.shortName}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                            {product.tagline}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                                    <Badge variant="secondary" className="text-[10px]">
                                        {getCountryRecords(product)} records
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px]">
                                        {countryName}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {product.complianceStandards.slice(0, 2).map((std) => (
                                        <span
                                            key={std}
                                            className="inline-flex items-center text-[10px] text-primary/70"
                                        >
                                            <Shield className="h-3 w-3 mr-0.5" />
                                            {std}
                                        </span>
                                    ))}
                                </div>

                                <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                    Explore product <ArrowRight className="h-3 w-3" />
                                </span>
                            </CardContent>
                        </Card>
                    );

                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                        >
                            <Link
                                to={`/products/${product.slug}`}
                                className="block h-full"
                                state={{ selectedRegion: "EU", selectedCountry: countryName }}
                            >
                                {cardContent}
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* No Products Message */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        No Products Available
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        We currently don't have data products available for {countryName}.
                    </p>
                    <Button asChild>
                        <Link to="/products/eu">View Other EU Countries</Link>
                    </Button>
                </div>
            )}

            {/* Sticky Compare Bar */}
            <AnimatePresence>
                {selected.size >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="bg-card border shadow-xl rounded-full px-6 py-3 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {selectedProducts.map((p) => (
                                    <Badge
                                        key={p.id}
                                        variant="secondary"
                                        className="text-xs flex items-center gap-1"
                                    >
                                        {p.shortName}
                                        <button
                                            onClick={(e) => toggleProduct(p.id, e)}
                                            className="ml-1 hover:text-destructive"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <Button
                                size="sm"
                                className="rounded-full"
                                onClick={() => setShowCompare(!showCompare)}
                            >
                                <GitCompare className="h-4 w-4 mr-1" />
                                {showCompare ? "Hide Comparison" : "Compare Now"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comparison Table */}
            <AnimatePresence>
                {showCompare && selectedProducts.length >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="rounded-xl border bg-card p-6 mb-20">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    Product Comparison
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowCompare(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="rounded-lg border overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="w-48 font-medium text-left px-4 py-3">
                                                Attribute
                                            </th>
                                            {selectedProducts.map((p) => (
                                                <th
                                                    key={p.id}
                                                    className="font-semibold text-left px-4 py-3"
                                                >
                                                    {p.shortName}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonRows.map((row) => (
                                            <tr key={row.label} className="border-t">
                                                <td className="font-medium text-muted-foreground px-4 py-3">
                                                    {row.label}
                                                </td>
                                                {selectedProducts.map((p) => (
                                                    <td key={p.id} className="px-4 py-3">
                                                        {row.render(p)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EUCountryProductsPage;

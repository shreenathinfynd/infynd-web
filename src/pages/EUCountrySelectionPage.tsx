import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

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

// Get country stats from coverageRegions
const getCountryStats = () => {
    const countryMap = new Map<
        string,
        { totalRecords: string; productCount: number }
    >();

    europeCountries.forEach((country) => {
        // Find the first product that has this country in its coverage
        const productWithCountry = products.find((product) =>
            product.coverageRegions.some((r) => r.country === country)
        );

        if (productWithCountry) {
            const region = productWithCountry.coverageRegions.find(
                (r) => r.country === country
            );
            if (region && region.records !== "0") {
                countryMap.set(country, {
                    totalRecords: region.records,
                    productCount: 8, // Total number of products
                });
            }
        }
    });

    return countryMap;
};

const EUCountrySelectionPage = () => {
    const navigate = useNavigate();
    const countryStats = getCountryStats();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleCountryClick = (country: string) => {
        setSelectedCountry(country);
        // Navigate to products page with country filter
        navigate("/products/eu/" + country.toLowerCase().replace(/ /g, "-"));
    };

    return (
        <div className="py-8 px-6 max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
                <Button variant="outline" size="sm" asChild className="rounded-full">
                    <Link to="/products">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Products
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                    Select EU Country
                </h1>
                <p className="text-muted-foreground">
                    Choose a country to view data products available for that region
                </p>
            </div>

            {/* Country Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from(countryStats.entries())
                    .filter(([country]) => country === "Ireland")
                    .map(([country, stats], index) => (
                        <motion.div
                            key={country}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => handleCountryClick(country)}
                        >
                            <Card className="cursor-pointer hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                                            <MapPin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                                                Ireland Universe
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Total Records
                                            </span>
                                            <Badge variant="secondary" className="text-xs">
                                                {stats.totalRecords}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Products Available
                                            </span>
                                            <Badge variant="outline" className="text-xs">
                                                {stats.productCount} products
                                            </Badge>
                                        </div>
                                    </div>

                                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                        View Products <ChevronRight className="h-3 w-3" />
                                    </span>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    GDPR Compliant EU Data
                </h3>
                <p className="text-sm text-muted-foreground">
                    All our EU data products are fully GDPR compliant and sourced from
                    verified registries. Select a country above to explore available data
                    products and their coverage details.
                </p>
            </div>
        </div>
    );
};

export default EUCountrySelectionPage;

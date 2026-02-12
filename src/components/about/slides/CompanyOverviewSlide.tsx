import { Check } from "lucide-react";
import worldMapImg from "@/assets/world-map-locations.png";

const CompanyOverviewSlide = () => {
    const uspPoints = [
        "Real-time, custom-built datasets verified by human intelligence",
        "180M+ global B2B records, with 6.5M validated UK email contacts",
        "New business intelligence designed to fuel predictable pipeline",
        "Built with GDPR and CCPA compliance at the core",
        "TPS and CTPS screened to ensure compliant engagement",
        "Precision-engineered data delivering up to 98% email deliverability"
    ];

    return (
        <div className="w-full min-h-screen bg-background text-foreground flex flex-col relative">
            {/* Left Sidebar - "About InFynd" */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-primary flex items-center justify-center z-10">
                <div className="text-primary-foreground font-bold text-sm tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    ABOUT INFYND
                </div>
            </div>

            {/* Main Content - lifted up */}
            <div className="flex-1 pl-16 pr-12 pt-8 pb-4">
                {/* Company Introduction */}
                <div className="mb-4">
                    <p className="text-base leading-relaxed mb-4">
                        <span className="font-bold">InFynd</span> is a leading B2B Data and Deliverability business with offices in the UK and India. At InFynd, we focus on delivering comprehensive,
                        end-to-end data solutions coupled with exceptional customer service, continuously innovating to meet our clients' evolving needs.
                    </p>
                </div>

                {/* Our USP Section */}
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-primary mb-4">Our USP</h2>
                    <div className="space-y-2">
                        {uspPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="mt-0.5 shrink-0">
                                    <div className="w-5 h-5 border-2 border-foreground flex items-center justify-center">
                                        <Check className="w-3 h-3 text-foreground" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* World Map Image - bottom right */}
            <div className="absolute bottom-4 right-8 w-[480px]">
                <img src={worldMapImg} alt="InFynd global presence - UK and India" className="w-full h-auto" />
            </div>
        </div>
    );
};

export default CompanyOverviewSlide;

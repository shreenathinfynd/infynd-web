import { Check } from "lucide-react";

const CompanyOverviewSlide = () => {
    const uspPoints = [
        "Real-time, custom-built datasets verified by human intelligence",
        "180M+ global B2B records, with 6.5M validated UK email contacts",
        "New business intelligence designed to fuel predictable pipeline",
        "Built with GDPR and CCPA compliance at the core",
        "TPS and CTPS screened to ensure compliant engagement",
        "Precision-engineered data delivering up to 98% email deliverability"
    ];

    const badges = [
        { text: "Strength", subtext: "180+ & Growing", position: "top-[10%] right-[15%]", bg: "bg-foreground" },
        { text: "Operations @", subtext: "Coimbatore", position: "top-[35%] right-[8%]", bg: "bg-foreground" },
        { text: "Head Quarters @", subtext: "United Kingdom", position: "top-[52%] right-[20%]", bg: "bg-primary" },
        { text: "Founded in", subtext: "2020", position: "bottom-[28%] right-[22%]", bg: "bg-foreground" },
        { text: "B2B Data", subtext: "Provider", position: "bottom-[12%] right-[35%]", bg: "bg-primary" }
    ];

    return (
        <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
            {/* Left Sidebar - "About InFynd" */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-primary flex items-center justify-center z-10">
                <div className="text-primary-foreground font-bold text-sm tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    ABOUT INFYND
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 pl-16 pr-12 py-12 overflow-y-auto">
                {/* Company Introduction */}
                <div className="mb-8">
                    <p className="text-base leading-relaxed mb-6">
                        <span className="font-bold">InFynd</span> is a leading B2B Data and Deliverability business with offices in the UK and India. At InFynd, we focus on delivering comprehensive,
                        end-to-end data solutions coupled with exceptional customer service, continuously innovating to meet our clients' evolving needs.
                    </p>
                </div>

                {/* Our USP Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-primary mb-6">Our USP</h2>
                    <div className="space-y-3">
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

                {/* World Map and Badges Section */}
                <div className="relative mt-12 h-[300px]">
                    {/* World Map SVG */}
                    <div className="absolute inset-0 flex items-center justify-start">
                        <svg viewBox="0 0 800 400" className="w-[550px] h-auto opacity-90">
                            {/* World map continents in primary red */}
                            <g fill="hsl(var(--primary))" stroke="none">
                                {/* North America */}
                                <path d="M 80 80 L 140 70 L 180 80 L 200 100 L 220 110 L 230 130 L 220 150 L 200 160 L 180 170 L 160 180 L 140 190 L 120 185 L 100 175 L 85 165 L 75 150 L 70 130 L 75 110 Z" />

                                {/* South America */}
                                <path d="M 160 200 L 175 195 L 185 200 L 195 210 L 200 230 L 205 250 L 200 270 L 190 285 L 175 295 L 165 290 L 155 280 L 150 260 L 148 240 L 150 220 Z" />

                                {/* Europe */}
                                <path d="M 320 90 L 350 85 L 370 90 L 385 95 L 395 105 L 390 120 L 380 130 L 365 135 L 350 133 L 335 128 L 325 118 L 318 105 Z" />

                                {/* Africa */}
                                <path d="M 330 145 L 360 140 L 385 145 L 400 155 L 410 175 L 415 200 L 410 225 L 400 245 L 385 260 L 365 268 L 345 265 L 330 255 L 320 235 L 318 210 L 320 185 L 325 165 Z" />

                                {/* Asia */}
                                <path d="M 420 85 L 480 80 L 540 85 L 580 95 L 610 105 L 630 120 L 640 140 L 635 160 L 620 175 L 600 185 L 575 190 L 550 192 L 525 188 L 500 180 L 475 170 L 455 155 L 440 140 L 430 120 L 425 100 Z" />

                                {/* Australia */}
                                <path d="M 600 240 L 630 235 L 655 240 L 670 250 L 675 265 L 670 280 L 655 290 L 635 292 L 615 288 L 600 278 L 595 263 L 598 250 Z" />

                                {/* Antarctica */}
                                <path d="M 100 330 L 700 330 L 700 350 L 100 350 Z" />
                            </g>
                        </svg>
                    </div>

                    {/* ISO Certification Badge */}
                    <div className="absolute top-[18%] right-[28%] w-20 h-20">
                        <div className="w-full h-full rounded-full border-4 border-blue-600 bg-background flex flex-col items-center justify-center shadow-lg">
                            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">CERTIFIED</div>
                            <div className="text-xl font-bold text-blue-600">ISO</div>
                            <div className="text-[8px] text-muted-foreground">9001:2015</div>
                        </div>
                    </div>

                    {/* Circular Info Badges */}
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className={`absolute ${badge.position} w-28 h-28 ${badge.bg} rounded-full flex flex-col items-center justify-center text-primary-foreground shadow-xl`}
                        >
                            <div className="text-xs font-semibold text-center px-2">{badge.text}</div>
                            <div className="text-base font-bold text-center px-2">{badge.subtext}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyOverviewSlide;

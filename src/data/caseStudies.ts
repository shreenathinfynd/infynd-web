export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    client: string;
    industry: string;
    category: string;
    icon: string;

    // Overview
    overview: string;

    // Challenge/Pain Point
    challenge: {
        title: string;
        points: string[];
    };

    // Objective
    objective?: {
        title: string;
        description: string;
    };

    // Solution
    solution: {
        title: string;
        points: string[];
        subPoints?: { title: string; items: string[] }[];
    };

    // Benefits
    benefits?: {
        title: string;
        points: string[];
    };

    // Results/Outcomes
    results: {
        title: string;
        metrics: { value: string; label: string; description?: string }[];
    };

    // Data/Statistics Table
    dataTable?: {
        title: string;
        headers: string[];
        rows: { [key: string]: string | number }[];
    };

    // Testimonial
    testimonial?: {
        quote: string;
        author?: string;
        position?: string;
    };

    // Charts/Graphs data
    charts?: {
        title: string;
        type: "line" | "bar" | "comparison";
        data: any;
    }[];
}

export const caseStudies: CaseStudy[] = [
    {
        id: "merchant-terminal",
        slug: "merchant-terminal-telemarketing",
        title: "Merchant Terminal: Tele-Marketing Data",
        subtitle: "Expanding market coverage through strategic tele-appointment setting",
        client: "Leading Payment Processor",
        industry: "Financial Services",
        category: "Tele-Marketing",
        icon: "Phone",

        overview: "A leading payment processor offering card machines, contactless payments, and mPOS devices aimed to expand market coverage through a tele-appointment setting strategy to engage prospects and schedule sales meetings.",

        challenge: {
            title: "Business Challenge",
            points: [
                "Needed to target a specific audience of fleet companies across the UK to promote fuel card services and fleet management software",
                "Traditional data collection methods were time-consuming and resulted in incomplete information",
                "Required accurate contact data for potential customers to enable efficient marketing campaigns and sales outreach"
            ]
        },

        objective: {
            title: "Objective",
            description: "DMC TO CONNECT % by DATE and PROVIDER; APP TO DMC % by DATE and PROVIDER"
        },

        solution: {
            title: "Solution Delivered",
            points: [
                "20% increase in DMC to Connect rate",
                "Increase in overall data volume",
                "SIC to MCC Mapping",
                "Greater Consistency"
            ],
            subPoints: [
                {
                    title: "Data Coverage",
                    items: [
                        "1.2M (2M Micro Businesses) in United Kingdom",
                        "2.8M Phoneable contacts at business level",
                        "900k Emailable contacts at business level",
                        "10M Total contacts at contact level",
                        "6.7M Emailable contacts at contact level"
                    ]
                }
            ]
        },

        results: {
            title: "The Results",
            metrics: [
                {
                    value: "20%",
                    label: "Increase in Connect Rate",
                    description: "DMC to Connect improvement"
                },
                {
                    value: "2.8M",
                    label: "Phoneable Contacts",
                    description: "At business level"
                },
                {
                    value: "10M",
                    label: "Total Contacts",
                    description: "At contact level"
                }
            ]
        },

        dataTable: {
            title: "Campaign Data Breakdown",
            headers: ["Region", "Total", "Phoneable", "Emailable (Business)", "Total Contacts", "Emailable (Contact)"],
            rows: [
                {
                    Region: "United Kingdom",
                    Total: "1.2M (2M Micro)",
                    Phoneable: "2.8M",
                    "Emailable (Business)": "900k",
                    "Total Contacts": "10M",
                    "Emailable (Contact)": "6.7M"
                }
            ]
        }
    },

    {
        id: "indeed-email",
        slug: "indeed-email-marketing",
        title: "Email Marketing Case Study",
        subtitle: "Global customer acquisition across 10 markets",
        client: "Indeed",
        industry: "Recruitment & HR Technology",
        category: "Email Marketing",
        icon: "Mail",

        overview: "To drive brand awareness and new customer acquisition for Indeed across 10 global markets, with a consistent yet locally adaptable outreach strategy.",

        objective: {
            title: "Objective",
            description: "To drive brand awareness and new customer acquisition for Indeed across 10 global markets, with a consistent yet locally adaptable outreach strategy."
        },

        challenge: {
            title: "The Challenge",
            points: [
                "Reaching decision makers across multiple international markets",
                "Maintaining brand consistency while adapting to local market needs",
                "Targeting the right stakeholders in diverse industries"
            ]
        },

        solution: {
            title: "Solution",
            points: [
                "Designed and executed a segmented, multi-market audience strategy to maximise relevance and reach"
            ],
            subPoints: [
                {
                    title: "Audience Segmentation",
                    items: [
                        "Segment 1: All industries, excluding recruitment firms",
                        "Segment 2: Recruitment and staffing organisations"
                    ]
                },
                {
                    title: "Target Roles",
                    items: [
                        "Senior Decision makers",
                        "HR Leaders and Talent acquisition stakeholders"
                    ]
                },
                {
                    title: "Messaging Strategy",
                    items: [
                        "Tailored 3 touch messaging for each segment while maintaining brand consistency across regions",
                        "Enabled Indeed to engage the right stakeholders at scale and accelerate customer acquisition globally"
                    ]
                }
            ]
        },

        results: {
            title: "The Results",
            metrics: [
                {
                    value: "4,600",
                    label: "New Customers",
                    description: "Acquired across the campaign"
                },
                {
                    value: "10",
                    label: "Countries",
                    description: "Global market coverage"
                }
            ]
        }
    },

    {
        id: "fleet-database",
        slug: "fleet-database",
        title: "Fleet Database",
        subtitle: "Transforming fleet company outreach with targeted data",
        client: "Fleet Management Software Provider",
        industry: "Automotive & Fleet Services",
        category: "Database Solution",
        icon: "Database",

        overview: "A fleet management software provider needed to target specific fleet companies across the UK to promote their fuel card services and fleet management software. Traditional data collection methods were time-consuming and resulted in incomplete information, severely impacting their marketing efforts.",

        challenge: {
            title: "Pain Point",
            points: [
                "There was a need to target a specific audience of fleet companies across the UK to promote their fuel card services and fleet management software",
                "However, they faced a significant challenge in obtaining accurate contact data for potential customers",
                "The traditional data collection methods used by their team were time-consuming and frequently resulted in incomplete and outdated information, severely impacting their marketing efforts"
            ]
        },

        solution: {
            title: "Solution",
            points: [
                "InFynd's Fleet Database",
                "Our fleet database consists of, high-quality and up-to-date contact data which was put into use in their marketing campaigns and sales outreach",
                "This approach promised a direct and efficient way to connect with potential clients"
            ]
        },

        benefits: {
            title: "Benefits",
            points: [
                "With new leads, the client was able to reach out to more companies across various industries and increase their fuel card supply"
            ]
        },

        results: {
            title: "The Results",
            metrics: [
                {
                    value: "3X",
                    label: "Increase in Response Rate",
                    description: "Compared to previous campaigns"
                },
                {
                    value: "20%",
                    label: "Increased Sales",
                    description: "Direct revenue impact"
                }
            ]
        },

        testimonial: {
            quote: "InFynd's custom-built data was a game-changer for our business. Not only did it help us generate new leads, but it also significantly improved our data quality thanks to their highly accurate and up-to-date information. We were able to target the right companies more effectively, save time, and ultimately increase our revenue by streamlining the entire fleet management process."
        }
    }
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
    return caseStudies.find(cs => cs.slug === slug);
};

export interface ProductField {
  name: string;
  description: string;
  sourceType: string;
  updateFrequency: string;
  confidenceScore: number;
}

export interface SampleRow {
  [key: string]: string | number;
}

export interface CoverageRegion {
  country: string;
  records: number;
  industries: string[];
}

export interface BuildStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  fields: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  totalRecords: string;
  countries: number;
  complianceStandards: string[];
  useCases: string[];
  typicalBuyers: string[];
  whyInFynd: string[];
  coverageRegions: CoverageRegion[];
  sampleDataCompany: SampleRow[];
  sampleDataContact: SampleRow[];
  dataDictionary: ProductField[];
  buildSteps: BuildStep[];
  relatedProductIds: string[];
}

export const addOns: AddOn[] = [
  { id: "funding", name: "Funding & Investments", description: "Recent funding rounds, investors, and deal sizes", fields: ["Last Funding Round", "Funding Amount", "Lead Investor", "Funding Stage"] },
  { id: "hiring", name: "Hiring Companies", description: "Companies actively hiring with open roles count", fields: ["Open Roles Count", "Hiring Departments", "Growth Signal", "Hiring Velocity"] },
  { id: "techstack", name: "Tech Stack", description: "Technologies and tools used by the company", fields: ["CRM Used", "Marketing Platform", "Cloud Provider", "Analytics Tool"] },
  { id: "intent", name: "Intent Signals", description: "Buying intent based on content engagement", fields: ["Intent Topic", "Intent Score", "Content Engaged", "Signal Recency"] },
  { id: "jobchanges", name: "Job Changes", description: "Recent job changes of key contacts", fields: ["Previous Company", "Change Date", "New Title", "Tenure at Previous"] },
  { id: "firmographics", name: "Firmographics", description: "Detailed company demographics and classifications", fields: ["NAICS Code", "SIC Code", "Ownership Type", "Year Founded"] },
  { id: "mobile", name: "Mobile Numbers", description: "Verified direct mobile phone numbers", fields: ["Mobile Number", "Verification Date", "Carrier", "Line Type"] },
  { id: "social", name: "Social Handles", description: "Verified social media profiles", fields: ["LinkedIn URL", "Twitter Handle", "Facebook Page", "Company Blog"] },
];

export const products: Product[] = [
  {
    id: "postal",
    slug: "postal-marketing-data",
    name: "Postal Marketing Data",
    shortName: "Postal",
    tagline: "Reach decision-makers at their desk with verified mailing addresses",
    description: "Comprehensive B2B postal records covering businesses and professionals across the UK and beyond. Ideal for direct mail campaigns, catalogues, and multi-channel strategies.",
    icon: "Mail",
    category: "Marketing Data",
    totalRecords: "42M+",
    countries: 28,
    complianceStandards: ["GDPR", "MPS Checked", "Royal Mail PAF"],
    useCases: ["Direct mail campaigns", "Catalogue distribution", "Event invitations", "Account-based marketing", "Multi-channel outreach"],
    typicalBuyers: ["Marketing teams", "Direct mail agencies", "Catalogue retailers", "Event organisers"],
    whyInFynd: ["MPS-screened for suppression compliance", "Monthly address verification against PAF", "Enriched with firmographic selectors", "98.5% deliverability guarantee"],
    coverageRegions: [
      { country: "United Kingdom", records: 28500000, industries: ["Retail", "Finance", "Healthcare", "Technology", "Manufacturing"] },
      { country: "Germany", records: 4200000, industries: ["Automotive", "Manufacturing", "Finance", "Technology"] },
      { country: "France", records: 3800000, industries: ["Retail", "Luxury", "Finance", "Technology"] },
      { country: "Netherlands", records: 1900000, industries: ["Logistics", "Technology", "Finance"] },
      { country: "United States", records: 3600000, industries: ["Technology", "Healthcare", "Finance", "Retail"] },
    ],
    sampleDataCompany: [
      { "Company Name": "Acme Corp Ltd", "Address Line 1": "45 King Street", "City": "Manchester", "Postcode": "M2 4WQ", "Industry": "Technology", "Employees": 250, "Revenue Band": "£10M-£50M" },
      { "Company Name": "Bright Healthcare", "Address Line 1": "12 Harley Place", "City": "London", "Postcode": "W1G 8PH", "Industry": "Healthcare", "Employees": 85, "Revenue Band": "£5M-£10M" },
      { "Company Name": "GreenLeaf Retail", "Address Line 1": "88 High Street", "City": "Birmingham", "Postcode": "B4 7SL", "Industry": "Retail", "Employees": 520, "Revenue Band": "£50M-£100M" },
      { "Company Name": "Sterling Finance", "Address Line 1": "1 Canary Wharf", "City": "London", "Postcode": "E14 5AB", "Industry": "Finance", "Employees": 1200, "Revenue Band": "£100M+" },
      { "Company Name": "NorthStar Logistics", "Address Line 1": "Unit 7 Park Industrial", "City": "Leeds", "Postcode": "LS11 5QF", "Industry": "Logistics", "Employees": 340, "Revenue Band": "£10M-£50M" },
    ],
    sampleDataContact: [
      { "Full Name": "J. Smith", "Job Title": "Marketing Director", "Company": "Acme Corp Ltd", "Address": "45 King Street, Manchester", "Postcode": "M2 4WQ" },
      { "Full Name": "S. Patel", "Job Title": "CEO", "Company": "Bright Healthcare", "Address": "12 Harley Place, London", "Postcode": "W1G 8PH" },
      { "Full Name": "R. Williams", "Job Title": "Head of Procurement", "Company": "GreenLeaf Retail", "Address": "88 High Street, Birmingham", "Postcode": "B4 7SL" },
      { "Full Name": "A. Chen", "Job Title": "CFO", "Company": "Sterling Finance", "Address": "1 Canary Wharf, London", "Postcode": "E14 5AB" },
      { "Full Name": "M. O'Brien", "Job Title": "Operations Manager", "Company": "NorthStar Logistics", "Address": "Unit 7 Park Industrial, Leeds", "Postcode": "LS11 5QF" },
    ],
    dataDictionary: [
      { name: "company_name", description: "Registered business name", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99 },
      { name: "address_line_1", description: "Primary street address", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 98 },
      { name: "city", description: "City or town", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 99 },
      { name: "postcode", description: "Full UK postcode", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 99 },
      { name: "industry", description: "Primary SIC-based industry classification", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 94 },
      { name: "employee_count", description: "Estimated number of employees", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 88 },
      { name: "revenue_band", description: "Estimated revenue range", sourceType: "Modelled", updateFrequency: "Quarterly", confidenceScore: 82 },
    ],
    buildSteps: [
      { step: 1, title: "Source Aggregation", description: "Pull from Companies House, Royal Mail PAF, and 15+ proprietary directories", icon: "Database" },
      { step: 2, title: "Address Verification", description: "Validate every address against Royal Mail's Postcode Address File", icon: "MapPin" },
      { step: 3, title: "MPS Screening", description: "Screen against Mailing Preference Service for suppression compliance", icon: "Shield" },
      { step: 4, title: "Enrichment", description: "Add firmographic data: industry, size, revenue from multiple sources", icon: "Layers" },
      { step: 5, title: "Quality Scoring", description: "Apply confidence scores based on source freshness and validation results", icon: "Star" },
      { step: 6, title: "Continuous Refresh", description: "Monthly re-verification cycle with NCOA and gone-away suppression", icon: "RefreshCw" },
    ],
    relatedProductIds: ["tele", "email", "enrichment"],
  },
  {
    id: "tele",
    slug: "tele-marketing-data",
    name: "Tele Marketing Data",
    shortName: "Telemarketing",
    tagline: "Connect with prospects through verified direct-dial and switchboard numbers",
    description: "B2B telephone data with TPS/CTPS screening, direct dials, and switchboard numbers. Built for outbound sales, appointment setting, and telemarketing campaigns.",
    icon: "Phone",
    category: "Marketing Data",
    totalRecords: "35M+",
    countries: 22,
    complianceStandards: ["GDPR", "TPS Screened", "CTPS Screened", "PECR"],
    useCases: ["Outbound sales calls", "Appointment setting", "Market research", "Customer win-back", "Lead qualification"],
    typicalBuyers: ["Sales teams", "Call centres", "Market research firms", "Lead generation agencies"],
    whyInFynd: ["TPS & CTPS screened monthly", "Direct dial hit rate of 72%", "Switchboard-to-direct-dial enrichment", "Real-time DNC suppression"],
    coverageRegions: [
      { country: "United Kingdom", records: 22000000, industries: ["Technology", "Finance", "Professional Services", "Manufacturing"] },
      { country: "United States", records: 5500000, industries: ["Technology", "Healthcare", "Finance"] },
      { country: "Germany", records: 3200000, industries: ["Automotive", "Manufacturing", "Technology"] },
      { country: "Australia", records: 2100000, industries: ["Mining", "Finance", "Technology"] },
      { country: "Canada", records: 2200000, industries: ["Technology", "Energy", "Finance"] },
    ],
    sampleDataCompany: [
      { "Company Name": "TechFlow Ltd", "Phone": "020 7*** ****", "Type": "Switchboard", "City": "London", "Industry": "Technology", "Employees": 180 },
      { "Company Name": "Apex Solutions", "Phone": "0161 *** ****", "Type": "Direct Dial", "City": "Manchester", "Industry": "Consulting", "Employees": 45 },
      { "Company Name": "BluePeak Finance", "Phone": "0131 *** ****", "Type": "Direct Dial", "City": "Edinburgh", "Industry": "Finance", "Employees": 320 },
      { "Company Name": "DataWave", "Phone": "0117 *** ****", "Type": "Switchboard", "City": "Bristol", "Industry": "Technology", "Employees": 95 },
      { "Company Name": "MedLine Group", "Phone": "0113 *** ****", "Type": "Direct Dial", "City": "Leeds", "Industry": "Healthcare", "Employees": 650 },
    ],
    sampleDataContact: [
      { "Full Name": "T. Baker", "Job Title": "Sales Director", "Direct Dial": "020 7*** ****", "Company": "TechFlow Ltd", "TPS Status": "Clear" },
      { "Full Name": "L. Green", "Job Title": "Managing Director", "Direct Dial": "0161 *** ****", "Company": "Apex Solutions", "TPS Status": "Clear" },
      { "Full Name": "K. Morrison", "Job Title": "Head of IT", "Direct Dial": "0131 *** ****", "Company": "BluePeak Finance", "TPS Status": "Clear" },
      { "Full Name": "D. Harris", "Job Title": "CTO", "Direct Dial": "0117 *** ****", "Company": "DataWave", "TPS Status": "Clear" },
      { "Full Name": "P. Singh", "Job Title": "Procurement Lead", "Direct Dial": "0113 *** ****", "Company": "MedLine Group", "TPS Status": "Clear" },
    ],
    dataDictionary: [
      { name: "company_name", description: "Registered business name", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99 },
      { name: "phone_number", description: "Verified telephone number", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 92 },
      { name: "phone_type", description: "Direct Dial or Switchboard classification", sourceType: "Validated", updateFrequency: "Monthly", confidenceScore: 95 },
      { name: "tps_status", description: "TPS/CTPS screening result", sourceType: "TPS Registry", updateFrequency: "Monthly", confidenceScore: 100 },
      { name: "contact_name", description: "Decision-maker name", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 87 },
      { name: "job_title", description: "Current job title", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 85 },
    ],
    buildSteps: [
      { step: 1, title: "Number Sourcing", description: "Aggregate from directories, websites, and proprietary partnerships", icon: "Database" },
      { step: 2, title: "TPS/CTPS Screening", description: "Monthly screening against Telephone Preference Service registers", icon: "Shield" },
      { step: 3, title: "Line Validation", description: "HLR lookup to verify number is active and reachable", icon: "PhoneCall" },
      { step: 4, title: "Type Classification", description: "Classify as direct dial, switchboard, or mobile using carrier data", icon: "GitBranch" },
      { step: 5, title: "Contact Matching", description: "Match numbers to named decision-makers where available", icon: "UserCheck" },
      { step: 6, title: "Refresh Cycle", description: "Monthly re-validation with real-time DNC suppression updates", icon: "RefreshCw" },
    ],
    relatedProductIds: ["email", "postal", "enrichment"],
  },
  {
    id: "email",
    slug: "email-marketing-data",
    name: "Email Marketing Data",
    shortName: "Email",
    tagline: "Verified B2B email addresses for targeted outreach at scale",
    description: "High-deliverability B2B email data with real-time verification, role-based filtering, and GDPR-compliant opt-in records for email campaigns and ABM.",
    icon: "AtSign",
    category: "Marketing Data",
    totalRecords: "58M+",
    countries: 45,
    complianceStandards: ["GDPR", "CAN-SPAM", "PECR", "ePrivacy"],
    useCases: ["Email marketing campaigns", "ABM outreach", "Newsletter growth", "Lead nurturing", "Event promotion"],
    typicalBuyers: ["Marketing teams", "Growth teams", "ABM specialists", "Email marketing agencies"],
    whyInFynd: ["Real-time SMTP verification", "Bounce rate guarantee <3%", "Role-based vs personal filtering", "GDPR consent tracking"],
    coverageRegions: [
      { country: "United Kingdom", records: 18500000, industries: ["Technology", "Finance", "Professional Services", "Retail", "Healthcare"] },
      { country: "United States", records: 22000000, industries: ["Technology", "Healthcare", "Finance", "E-commerce"] },
      { country: "Germany", records: 5200000, industries: ["Automotive", "Manufacturing", "Technology", "Finance"] },
      { country: "France", records: 4100000, industries: ["Luxury", "Retail", "Technology", "Finance"] },
      { country: "India", records: 8200000, industries: ["Technology", "BPO", "Manufacturing", "Pharma"] },
    ],
    sampleDataCompany: [
      { "Company Name": "CloudFirst Ltd", "Domain": "cloudfirst.co.uk", "Emails Available": 45, "Industry": "Technology", "City": "London", "Employees": 280 },
      { "Company Name": "FinEdge Partners", "Domain": "finedge.com", "Emails Available": 22, "Industry": "Finance", "City": "Edinburgh", "Employees": 150 },
      { "Company Name": "RetailMax UK", "Domain": "retailmax.co.uk", "Emails Available": 88, "Industry": "Retail", "City": "Birmingham", "Employees": 720 },
      { "Company Name": "HealthBridge", "Domain": "healthbridge.nhs.uk", "Emails Available": 35, "Industry": "Healthcare", "City": "Bristol", "Employees": 190 },
      { "Company Name": "BuildRight Construction", "Domain": "buildright.co.uk", "Emails Available": 15, "Industry": "Construction", "City": "Leeds", "Employees": 95 },
    ],
    sampleDataContact: [
      { "Full Name": "E. Thompson", "Email": "e.t***@cloudfirst.co.uk", "Job Title": "VP Marketing", "Company": "CloudFirst Ltd", "Verified": "Yes" },
      { "Full Name": "R. Kumar", "Email": "r.k***@finedge.com", "Job Title": "Head of Digital", "Company": "FinEdge Partners", "Verified": "Yes" },
      { "Full Name": "J. Davies", "Email": "j.d***@retailmax.co.uk", "Job Title": "CMO", "Company": "RetailMax UK", "Verified": "Yes" },
      { "Full Name": "N. Wright", "Email": "n.w***@healthbridge.nhs.uk", "Job Title": "IT Director", "Company": "HealthBridge", "Verified": "Yes" },
      { "Full Name": "C. Hall", "Email": "c.h***@buildright.co.uk", "Job Title": "Managing Director", "Company": "BuildRight Construction", "Verified": "Yes" },
    ],
    dataDictionary: [
      { name: "email_address", description: "Verified business email address", sourceType: "SMTP Verified", updateFrequency: "Weekly", confidenceScore: 97 },
      { name: "email_type", description: "Personal or role-based classification", sourceType: "Pattern Analysis", updateFrequency: "Weekly", confidenceScore: 95 },
      { name: "verification_status", description: "Real-time deliverability status", sourceType: "SMTP Check", updateFrequency: "Real-time", confidenceScore: 98 },
      { name: "consent_basis", description: "GDPR lawful basis for processing", sourceType: "Consent Records", updateFrequency: "Real-time", confidenceScore: 100 },
      { name: "domain", description: "Company email domain", sourceType: "DNS Verified", updateFrequency: "Monthly", confidenceScore: 99 },
      { name: "bounce_risk", description: "Predicted bounce risk score (low/medium/high)", sourceType: "ML Model", updateFrequency: "Weekly", confidenceScore: 91 },
    ],
    buildSteps: [
      { step: 1, title: "Web Crawling", description: "Extract business emails from company websites, directories, and public filings", icon: "Globe" },
      { step: 2, title: "Pattern Discovery", description: "Identify email patterns per domain (e.g., first.last@company.com)", icon: "Search" },
      { step: 3, title: "SMTP Verification", description: "Real-time verification against mail servers without sending emails", icon: "CheckCircle" },
      { step: 4, title: "Role Classification", description: "Classify as personal (john@) vs role-based (info@, sales@)", icon: "Tag" },
      { step: 5, title: "Consent Mapping", description: "Map and track GDPR lawful basis for each record", icon: "Shield" },
      { step: 6, title: "Continuous Validation", description: "Weekly re-verification cycle with bounce monitoring", icon: "RefreshCw" },
    ],
    relatedProductIds: ["tele", "postal", "newbiz"],
  },
  {
    id: "newbiz",
    slug: "new-business-data",
    name: "New Business Data",
    shortName: "New Business",
    tagline: "Be first to reach newly registered companies before your competitors",
    description: "Daily feed of newly incorporated businesses with director details, SIC codes, and registered addresses. Reach new companies within days of incorporation.",
    icon: "Rocket",
    category: "Specialist Data",
    totalRecords: "2.8M+",
    countries: 12,
    complianceStandards: ["GDPR", "Companies House Verified"],
    useCases: ["New business prospecting", "Welcome offers", "Service onboarding", "Market sizing", "Competitor monitoring"],
    typicalBuyers: ["Business banking", "Insurance providers", "Accountancy firms", "Telecom providers", "Office suppliers"],
    whyInFynd: ["Daily incorporation feed from Companies House", "Director contact details included", "SIC code and activity filters", "Available within 24-48 hours of registration"],
    coverageRegions: [
      { country: "United Kingdom", records: 1850000, industries: ["All Sectors"] },
      { country: "Ireland", records: 280000, industries: ["All Sectors"] },
      { country: "United States", records: 420000, industries: ["Technology", "Retail", "Services"] },
      { country: "Australia", records: 250000, industries: ["All Sectors"] },
    ],
    sampleDataCompany: [
      { "Company Name": "Innovatech Solutions Ltd", "Incorporation Date": "2024-01-15", "SIC Code": "62012", "Director": "A. Johnson", "City": "London", "Status": "Active" },
      { "Company Name": "GreenPath Consulting", "Incorporation Date": "2024-01-14", "SIC Code": "70229", "Director": "M. Taylor", "City": "Manchester", "Status": "Active" },
      { "Company Name": "SwiftDeliver Ltd", "Incorporation Date": "2024-01-13", "SIC Code": "53202", "Director": "K. Brown", "City": "Birmingham", "Status": "Active" },
      { "Company Name": "HealthSync Digital", "Incorporation Date": "2024-01-12", "SIC Code": "86210", "Director": "S. Lee", "City": "Cambridge", "Status": "Active" },
      { "Company Name": "UrbanBrew Coffee Co", "Incorporation Date": "2024-01-11", "SIC Code": "56103", "Director": "R. Martinez", "City": "Bristol", "Status": "Active" },
    ],
    sampleDataContact: [
      { "Director Name": "A. Johnson", "Role": "Director", "Company": "Innovatech Solutions Ltd", "Appointed": "2024-01-15", "Nationality": "British" },
      { "Director Name": "M. Taylor", "Role": "Director", "Company": "GreenPath Consulting", "Appointed": "2024-01-14", "Nationality": "British" },
      { "Director Name": "K. Brown", "Role": "Director/Secretary", "Company": "SwiftDeliver Ltd", "Appointed": "2024-01-13", "Nationality": "British" },
      { "Director Name": "S. Lee", "Role": "Director", "Company": "HealthSync Digital", "Appointed": "2024-01-12", "Nationality": "British" },
      { "Director Name": "R. Martinez", "Role": "Director", "Company": "UrbanBrew Coffee Co", "Appointed": "2024-01-11", "Nationality": "Spanish" },
    ],
    dataDictionary: [
      { name: "company_name", description: "Newly registered company name", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100 },
      { name: "incorporation_date", description: "Date of company registration", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100 },
      { name: "sic_code", description: "Standard Industrial Classification code", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100 },
      { name: "director_name", description: "Name of appointed director(s)", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100 },
      { name: "registered_address", description: "Official registered office address", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100 },
      { name: "company_status", description: "Current status (Active, Dormant, etc.)", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100 },
    ],
    buildSteps: [
      { step: 1, title: "Daily Feed", description: "Automated daily pull from Companies House incorporation feed", icon: "Download" },
      { step: 2, title: "Data Parsing", description: "Extract company details, SIC codes, director information", icon: "FileText" },
      { step: 3, title: "Activity Scoring", description: "Score likelihood of being a genuine trading business vs dormant shell", icon: "BarChart" },
      { step: 4, title: "Contact Enrichment", description: "Append director contact details from complementary sources", icon: "UserPlus" },
      { step: 5, title: "Sector Tagging", description: "Map SIC codes to human-readable industry categories", icon: "Tag" },
      { step: 6, title: "Delivery", description: "Available in platform within 24-48 hours of incorporation", icon: "Zap" },
    ],
    relatedProductIds: ["email", "tele", "soho"],
  },
  {
    id: "soho",
    slug: "soho-data",
    name: "SOHO Data",
    shortName: "SOHO",
    tagline: "Reach small office/home office businesses often missed by traditional data",
    description: "Specialist dataset covering micro-businesses and sole traders operating from home offices. Captures the hard-to-reach SOHO segment that traditional B2B data misses.",
    icon: "Home",
    category: "Specialist Data",
    totalRecords: "8.5M+",
    countries: 8,
    complianceStandards: ["GDPR", "TPS Screened", "MPS Checked"],
    useCases: ["Micro-business marketing", "Insurance products", "Office supplies", "Telecom services", "Financial services for sole traders"],
    typicalBuyers: ["Telecom providers", "Insurance companies", "Office supply retailers", "Financial services", "Software vendors"],
    whyInFynd: ["Unique SOHO identification algorithm", "Captures sole traders missed by Companies House", "Home-office vs commercial address flagging", "Decision-maker is the business owner"],
    coverageRegions: [
      { country: "United Kingdom", records: 5800000, industries: ["Freelance", "Consulting", "Creative", "IT", "Trades"] },
      { country: "United States", records: 1200000, industries: ["Freelance", "Consulting", "E-commerce"] },
      { country: "Australia", records: 850000, industries: ["Trades", "Consulting", "Creative"] },
      { country: "Canada", records: 650000, industries: ["Freelance", "Technology", "Consulting"] },
    ],
    sampleDataCompany: [
      { "Business Name": "Sarah's Design Studio", "Type": "Sole Trader", "Sector": "Creative Services", "City": "Brighton", "Working From": "Home Office", "Est. Revenue": "£50K-£100K" },
      { "Business Name": "CodeCraft Consulting", "Type": "Ltd Company", "Sector": "IT Consulting", "City": "Reading", "Working From": "Home Office", "Est. Revenue": "£100K-£250K" },
      { "Business Name": "FitLife PT", "Type": "Sole Trader", "Sector": "Health & Fitness", "City": "Leeds", "Working From": "Mobile", "Est. Revenue": "£25K-£50K" },
      { "Business Name": "Green Thumb Gardens", "Type": "Partnership", "Sector": "Landscaping", "City": "Oxford", "Working From": "Home Office", "Est. Revenue": "£75K-£150K" },
      { "Business Name": "PageTurn Publishing", "Type": "Ltd Company", "Sector": "Publishing", "City": "Edinburgh", "Working From": "Home Office", "Est. Revenue": "£50K-£100K" },
    ],
    sampleDataContact: [
      { "Owner Name": "S. Mitchell", "Role": "Owner/Designer", "Business": "Sarah's Design Studio", "Phone": "01273 ***", "Email Domain": "sarahsdesign.co.uk" },
      { "Owner Name": "J. Patel", "Role": "Owner/Director", "Business": "CodeCraft Consulting", "Phone": "0118 ***", "Email Domain": "codecraft.co.uk" },
      { "Owner Name": "M. Jones", "Role": "Owner/Trainer", "Business": "FitLife PT", "Phone": "0113 ***", "Email Domain": "fitlifept.com" },
      { "Owner Name": "D. & L. Carter", "Role": "Partners", "Business": "Green Thumb Gardens", "Phone": "01865 ***", "Email Domain": "greenthumb.co.uk" },
      { "Owner Name": "A. McLeod", "Role": "Owner/Director", "Business": "PageTurn Publishing", "Phone": "0131 ***", "Email Domain": "pageturn.co.uk" },
    ],
    dataDictionary: [
      { name: "business_name", description: "Trading name of the SOHO business", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 93 },
      { name: "business_type", description: "Sole Trader, Ltd, Partnership classification", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 90 },
      { name: "sector", description: "Industry sector classification", sourceType: "AI Classified", updateFrequency: "Quarterly", confidenceScore: 88 },
      { name: "working_location", description: "Home Office, Co-working, or Mobile", sourceType: "Address Analysis", updateFrequency: "Quarterly", confidenceScore: 85 },
      { name: "owner_name", description: "Business owner / decision-maker name", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 91 },
      { name: "estimated_revenue", description: "Revenue band estimate", sourceType: "Modelled", updateFrequency: "Annually", confidenceScore: 72 },
    ],
    buildSteps: [
      { step: 1, title: "SOHO Identification", description: "Proprietary algorithm identifies home-based businesses from address patterns", icon: "Home" },
      { step: 2, title: "Multi-source Merge", description: "Combine self-employment registrations, trade directories, and web presence data", icon: "Merge" },
      { step: 3, title: "Owner Matching", description: "Link business to owner/decision-maker with contact details", icon: "UserCheck" },
      { step: 4, title: "Sector Classification", description: "AI-driven sector classification from business descriptions and activities", icon: "Brain" },
      { step: 5, title: "Revenue Modelling", description: "Estimate revenue bands using sector benchmarks and digital footprint", icon: "TrendingUp" },
      { step: 6, title: "Quarterly Refresh", description: "Re-validate with gone-away suppression and business cessation checks", icon: "RefreshCw" },
    ],
    relatedProductIds: ["newbiz", "tele", "postal"],
  },
  {
    id: "poi",
    slug: "poi-analytics-data",
    name: "POI / Analytics Data",
    shortName: "POI & Analytics",
    tagline: "Location intelligence with points of interest and footfall analytics",
    description: "Geospatial business data covering points of interest, footfall patterns, and location analytics. Power store planning, competitive analysis, and local marketing.",
    icon: "MapPin",
    category: "Analytics",
    totalRecords: "15M+",
    countries: 35,
    complianceStandards: ["GDPR", "ISO 27001"],
    useCases: ["Store planning", "Competitive analysis", "Local marketing", "Site selection", "Catchment analysis", "Footfall benchmarking"],
    typicalBuyers: ["Retail chains", "QSR brands", "Real estate firms", "Local marketing agencies", "Urban planners"],
    whyInFynd: ["POI taxonomy with 400+ categories", "Footfall estimates at POI level", "Monthly competitive landscape updates", "Geocoded to building level"],
    coverageRegions: [
      { country: "United Kingdom", records: 4200000, industries: ["Retail", "Hospitality", "Services", "Healthcare"] },
      { country: "United States", records: 5800000, industries: ["Retail", "QSR", "Services", "Healthcare"] },
      { country: "Germany", records: 2100000, industries: ["Retail", "Automotive", "Services"] },
      { country: "France", records: 1800000, industries: ["Retail", "Hospitality", "Services"] },
      { country: "Australia", records: 1100000, industries: ["Retail", "Services", "Hospitality"] },
    ],
    sampleDataCompany: [
      { "POI Name": "Costa Coffee - King's Cross", "Category": "Coffee Shop", "Lat": 51.5320, "Lng": -0.1240, "Footfall (Monthly)": 45000, "Rating": 4.2 },
      { "POI Name": "Boots Pharmacy - Oxford St", "Category": "Pharmacy", "Lat": 51.5150, "Lng": -0.1420, "Footfall (Monthly)": 82000, "Rating": 4.0 },
      { "POI Name": "PureGym - Shoreditch", "Category": "Gym/Fitness", "Lat": 51.5265, "Lng": -0.0780, "Footfall (Monthly)": 12000, "Rating": 4.3 },
      { "POI Name": "Tesco Express - Camden", "Category": "Grocery", "Lat": 51.5392, "Lng": -0.1426, "Footfall (Monthly)": 35000, "Rating": 3.8 },
      { "POI Name": "WeWork - Paddington", "Category": "Co-working", "Lat": 51.5154, "Lng": -0.1755, "Footfall (Monthly)": 8000, "Rating": 4.1 },
    ],
    sampleDataContact: [
      { "Location Manager": "Branch Manager", "Brand": "Costa Coffee", "Location": "King's Cross, London", "Contact": "Store Phone", "Chain Size": "2,800+ UK" },
      { "Location Manager": "Store Manager", "Brand": "Boots", "Location": "Oxford Street, London", "Contact": "Store Phone", "Chain Size": "2,200+ UK" },
      { "Location Manager": "Club Manager", "Brand": "PureGym", "Location": "Shoreditch, London", "Contact": "Club Phone", "Chain Size": "350+ UK" },
      { "Location Manager": "Store Manager", "Brand": "Tesco", "Location": "Camden, London", "Contact": "Store Phone", "Chain Size": "3,400+ UK" },
      { "Location Manager": "Community Manager", "Brand": "WeWork", "Location": "Paddington, London", "Contact": "Location Phone", "Chain Size": "40+ UK" },
    ],
    dataDictionary: [
      { name: "poi_name", description: "Point of interest / business name", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 96 },
      { name: "category", description: "POI category from 400+ taxonomy", sourceType: "AI Classified", updateFrequency: "Monthly", confidenceScore: 94 },
      { name: "latitude", description: "Geocoded latitude coordinate", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 98 },
      { name: "longitude", description: "Geocoded longitude coordinate", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 98 },
      { name: "footfall_monthly", description: "Estimated monthly visitors", sourceType: "Modelled", updateFrequency: "Monthly", confidenceScore: 78 },
      { name: "brand_name", description: "Parent brand if chain location", sourceType: "Directory", updateFrequency: "Monthly", confidenceScore: 95 },
    ],
    buildSteps: [
      { step: 1, title: "POI Collection", description: "Crawl business directories, maps APIs, and planning databases", icon: "Globe" },
      { step: 2, title: "Geocoding", description: "Precise geocoding to building level using multiple geocoding engines", icon: "MapPin" },
      { step: 3, title: "Category Mapping", description: "Classify each POI into our 400+ category taxonomy", icon: "Grid" },
      { step: 4, title: "Footfall Modelling", description: "Estimate visitor volumes using mobile signal and transaction data models", icon: "Users" },
      { step: 5, title: "Chain Linking", description: "Link individual locations to parent brands and franchise networks", icon: "Link" },
      { step: 6, title: "Monthly Update", description: "Monthly refresh with opening/closure detection and category re-validation", icon: "RefreshCw" },
    ],
    relatedProductIds: ["postal", "enrichment", "soho"],
  },
  {
    id: "healthcare",
    slug: "global-healthcare-data",
    name: "Global Healthcare Data",
    shortName: "Healthcare",
    tagline: "Reach healthcare professionals and organisations worldwide with compliant data",
    description: "Specialist healthcare B2B data covering hospitals, clinics, practitioners, pharma companies, and medical device firms. Built for pharma sales, medtech marketing, and healthcare recruitment.",
    icon: "Heart",
    category: "Specialist Data",
    totalRecords: "12M+",
    countries: 52,
    complianceStandards: ["GDPR", "HIPAA Aware", "NHS DSP Toolkit"],
    useCases: ["Pharma sales targeting", "Medical device marketing", "Healthcare recruitment", "Clinical trial recruitment", "HCP engagement"],
    typicalBuyers: ["Pharmaceutical companies", "Medical device firms", "Healthcare recruiters", "Clinical research organisations", "Health tech startups"],
    whyInFynd: ["NPI and GMC/NMC registry verified", "Specialty-level targeting for HCPs", "Hospital department-level contacts", "Pharma compliance-ready data"],
    coverageRegions: [
      { country: "United Kingdom", records: 2800000, industries: ["NHS Trusts", "Private Healthcare", "Pharma", "Medtech"] },
      { country: "United States", records: 4500000, industries: ["Hospitals", "Private Practice", "Pharma", "Biotech"] },
      { country: "Germany", records: 1800000, industries: ["Hospitals", "Pharma", "Medtech", "Private Practice"] },
      { country: "India", records: 1500000, industries: ["Hospitals", "Pharma", "Diagnostics"] },
      { country: "Japan", records: 1400000, industries: ["Hospitals", "Pharma", "Medtech"] },
    ],
    sampleDataCompany: [
      { "Organisation": "St. Mary's Hospital NHS Trust", "Type": "NHS Acute Trust", "City": "London", "Beds": 650, "Specialties": 42, "Staff": 5200 },
      { "Organisation": "Bupa Cromwell Hospital", "Type": "Private Hospital", "City": "London", "Beds": 148, "Specialties": 28, "Staff": 890 },
      { "Organisation": "AstraZeneca UK", "Type": "Pharmaceutical", "City": "Cambridge", "Beds": 0, "Specialties": 0, "Staff": 8500 },
      { "Organisation": "Smith & Nephew", "Type": "Medical Devices", "City": "Watford", "Beds": 0, "Specialties": 0, "Staff": 3200 },
      { "Organisation": "Nuffield Health Leeds", "Type": "Private Hospital", "City": "Leeds", "Beds": 82, "Specialties": 18, "Staff": 420 },
    ],
    sampleDataContact: [
      { "Name": "Dr. A. Rahman", "Specialty": "Cardiology", "Title": "Consultant", "Organisation": "St. Mary's Hospital", "GMC Status": "Registered" },
      { "Name": "Dr. L. Foster", "Specialty": "Orthopaedics", "Title": "Consultant Surgeon", "Organisation": "Bupa Cromwell", "GMC Status": "Registered" },
      { "Name": "P. Howard", "Specialty": "N/A", "Title": "Regional Sales Director", "Organisation": "AstraZeneca UK", "GMC Status": "N/A" },
      { "Name": "Dr. S. Yamamoto", "Specialty": "Oncology", "Title": "Head of Research", "Organisation": "Smith & Nephew", "GMC Status": "N/A" },
      { "Name": "Nurse K. Evans", "Specialty": "Paediatrics", "Title": "Ward Sister", "Organisation": "Nuffield Health Leeds", "NMC Status": "Registered" },
    ],
    dataDictionary: [
      { name: "organisation_name", description: "Hospital, clinic, or company name", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99 },
      { name: "organisation_type", description: "NHS Trust, Private, Pharma, Medtech classification", sourceType: "Registry", updateFrequency: "Quarterly", confidenceScore: 97 },
      { name: "hcp_name", description: "Healthcare professional name", sourceType: "GMC/NMC Registry", updateFrequency: "Monthly", confidenceScore: 98 },
      { name: "specialty", description: "Medical specialty (e.g., Cardiology, Oncology)", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 96 },
      { name: "registration_status", description: "GMC/NMC/NPI registration status", sourceType: "Official Registry", updateFrequency: "Monthly", confidenceScore: 100 },
      { name: "department", description: "Hospital department or division", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 88 },
    ],
    buildSteps: [
      { step: 1, title: "Registry Integration", description: "Direct feeds from GMC, NMC, NPI, and national medical registries", icon: "Database" },
      { step: 2, title: "Organisation Mapping", description: "Map practitioners to their primary and secondary organisations", icon: "Building" },
      { step: 3, title: "Specialty Classification", description: "Standardise specialties across regions using unified taxonomy", icon: "Stethoscope" },
      { step: 4, title: "Contact Enrichment", description: "Append direct contact details from professional directories and websites", icon: "UserPlus" },
      { step: 5, title: "Compliance Layer", description: "Apply healthcare-specific compliance rules (opt-in, pharma regulations)", icon: "Shield" },
      { step: 6, title: "Monthly Sync", description: "Monthly refresh against registries for new registrations and status changes", icon: "RefreshCw" },
    ],
    relatedProductIds: ["email", "tele", "enrichment"],
  },
  {
    id: "enrichment",
    slug: "data-match-append",
    name: "Data Match & Append / Enrichment",
    shortName: "Enrichment",
    tagline: "Fill the gaps in your CRM with verified, multi-source enrichment",
    description: "Send us your existing data and we'll match, verify, correct, and append missing fields. Transform incomplete records into actionable intelligence with our enrichment engine.",
    icon: "Sparkles",
    category: "Data Services",
    totalRecords: "N/A",
    countries: 45,
    complianceStandards: ["GDPR", "ISO 27001", "SOC 2 Type II"],
    useCases: ["CRM enrichment", "Data cleansing", "Database appending", "Duplicate detection", "Record standardisation"],
    typicalBuyers: ["CRM managers", "Data teams", "Marketing operations", "Sales operations", "Revenue operations"],
    whyInFynd: ["85%+ match rate against UK B2B universe", "30+ appendable fields per record", "Same-day turnaround for files under 100K", "Transparent match reporting"],
    coverageRegions: [
      { country: "United Kingdom", records: 0, industries: ["All – enrichment service"] },
      { country: "United States", records: 0, industries: ["All – enrichment service"] },
      { country: "Europe", records: 0, industries: ["All – enrichment service"] },
      { country: "Asia Pacific", records: 0, industries: ["All – enrichment service"] },
    ],
    sampleDataCompany: [
      { "Input Field": "Company Name", "Before": "Acme Corp", "After": "Acme Corporation Ltd", "Status": "Corrected", "Confidence": "97%" },
      { "Input Field": "Phone", "Before": "(missing)", "After": "020 7946 0958", "Status": "Appended", "Confidence": "92%" },
      { "Input Field": "Industry", "Before": "Tech", "After": "Information Technology – Software", "Status": "Standardised", "Confidence": "95%" },
      { "Input Field": "Employee Count", "Before": "(missing)", "After": "245", "Status": "Appended", "Confidence": "88%" },
      { "Input Field": "Postcode", "Before": "EC2A 4N", "After": "EC2A 4NE", "Status": "Corrected", "Confidence": "99%" },
    ],
    sampleDataContact: [
      { "Input Field": "Email", "Before": "j.smith@acme.com", "After": "j.smith@acme.com", "Status": "Verified ✓", "Confidence": "98%" },
      { "Input Field": "Job Title", "Before": "Manager", "After": "Marketing Manager", "Status": "Enhanced", "Confidence": "90%" },
      { "Input Field": "Direct Dial", "Before": "(missing)", "After": "020 7946 0123", "Status": "Appended", "Confidence": "85%" },
      { "Input Field": "LinkedIn URL", "Before": "(missing)", "After": "linkedin.com/in/j-smith-acme", "Status": "Appended", "Confidence": "82%" },
      { "Input Field": "Seniority Level", "Before": "(missing)", "After": "Mid-Level Management", "Status": "Classified", "Confidence": "91%" },
    ],
    dataDictionary: [
      { name: "match_key", description: "Unique identifier used to match input record", sourceType: "Deterministic", updateFrequency: "Per batch", confidenceScore: 100 },
      { name: "match_score", description: "Overall match confidence percentage", sourceType: "Algorithm", updateFrequency: "Per batch", confidenceScore: 100 },
      { name: "fields_appended", description: "Count of new fields added to the record", sourceType: "System", updateFrequency: "Per batch", confidenceScore: 100 },
      { name: "fields_corrected", description: "Count of existing fields that were corrected", sourceType: "System", updateFrequency: "Per batch", confidenceScore: 100 },
      { name: "duplicate_flag", description: "Whether record is a duplicate of another in the file", sourceType: "Algorithm", updateFrequency: "Per batch", confidenceScore: 95 },
      { name: "data_quality_score", description: "Overall data quality score (A-F grade)", sourceType: "Quality Engine", updateFrequency: "Per batch", confidenceScore: 100 },
    ],
    buildSteps: [
      { step: 1, title: "File Ingestion", description: "Upload your file (CSV, Excel, CRM export) – we handle all formats", icon: "Upload" },
      { step: 2, title: "Intelligent Matching", description: "Fuzzy matching against our 180M+ record universe using 12 match keys", icon: "Search" },
      { step: 3, title: "Gap Analysis", description: "Identify missing, incorrect, and outdated fields in your data", icon: "AlertCircle" },
      { step: 4, title: "Multi-source Append", description: "Fill gaps from 20+ verified sources with confidence scoring", icon: "Layers" },
      { step: 5, title: "Quality Report", description: "Deliver transparent match report with confidence scores per field", icon: "FileText" },
      { step: 6, title: "Enriched Delivery", description: "Return enriched file with before/after comparison and audit trail", icon: "Download" },
    ],
    relatedProductIds: ["email", "tele", "postal"],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (product: Product): Product[] =>
  product.relatedProductIds.map((id) => getProductById(id)).filter(Boolean) as Product[];

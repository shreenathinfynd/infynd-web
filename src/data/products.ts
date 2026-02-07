export interface ProductField {
  name: string;
  description: string;
  sourceType: string;
  updateFrequency: string;
  confidenceScore: number;
  dataGroup?: string;
  availability?: string;
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
  { id: "funding", name: "Capital & Investment History", description: "Funding rounds, investors, deal sizes & lead investor details", fields: ["Funding Amount", "Funding Type", "Lead Investor Name", "Lead Investor Industry", "No. of Investors", "Funding Announced Date"] },
  { id: "hiring", name: "Financial & Workforce Controls", description: "Director changes, hiring trends, attrition & control risk scoring", fields: ["Director Changes 12M", "Senior Hiring Trend", "Attrition Rate Estimated", "Control Risk Score", "Critical Role Vacancies", "Key Person Dependency"] },
  { id: "techstack", name: "Technology Stack Intelligence", description: "Technologies, platforms and tools used by the company", fields: ["Technology Product Name", "Technology Category", "Technology Version", "Technology Vendor", "Technology Domain"] },
  { id: "intent", name: "Market Positioning & Competitive Intelligence", description: "Competitive density, market growth, moat type & strategic position", fields: ["Target Markets", "Customer Type", "Go-To-Market Model", "Competitive Density", "Market Growth Rate", "Moat Type", "Strategic Position"] },
  { id: "governance", name: "Governance & Risk Posture", description: "Regulatory dependency, compliance readiness & AI Act exposure", fields: ["Core Product Type", "Regulatory Dependency", "Compliance Readiness", "AI Act Exposure", "Data Privacy Risk", "Vendor Lock-In Risk"] },
  { id: "reputation", name: "Reputation & Trust Signals", description: "Glassdoor, Trustpilot, Google ratings & controversy flags", fields: ["Glassdoor Rating", "Trustpilot Rating", "Google Rating", "Controversy Flag", "Sentiment Score", "Thought Leadership Score"] },
  { id: "webauthority", name: "Web Authority & Visibility", description: "Domain authority, organic traffic, ranking keywords & spam score", fields: ["Domain Authority", "Ranking Keywords", "Domain Organic Traffic", "Traffic Value", "Spam Score", "Domain Age Days"] },
  { id: "ownership", name: "Ownership & Corporate Structure", description: "Ultimate parent, immediate parent & corporate group hierarchy", fields: ["Ultimate Parent Name", "Immediate Parent Name", "Corporate Group L1", "Corporate Group L2"] },
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
      { country: "United Kingdom", records: 28500000, industries: ["Retail", "Finance", "Healthcare", "Technology", "Manufacturing", "Professional Services", "Construction"] },
      { country: "Germany", records: 4200000, industries: ["Automotive", "Manufacturing", "Finance", "Technology", "Logistics"] },
      { country: "France", records: 3800000, industries: ["Retail", "Luxury", "Finance", "Technology", "Hospitality"] },
      { country: "Netherlands", records: 1900000, industries: ["Logistics", "Technology", "Finance", "Agriculture"] },
      { country: "United States", records: 3600000, industries: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing"] },
      { country: "Ireland", records: 1200000, industries: ["Technology", "Finance", "Pharma", "Retail"] },
      { country: "Belgium", records: 850000, industries: ["Logistics", "Manufacturing", "Finance"] },
      { country: "Spain", records: 1100000, industries: ["Tourism", "Retail", "Technology", "Agriculture"] },
    ],
    sampleDataCompany: [
      { "Company Name": "Acme Corp Ltd", "Company Type": "Private", "Address Line 1": "45 King Street", "City": "Manchester", "Region": "Greater Manchester", "Postcode": "M2 4WQ", "Country": "UK", "Main Industry": "Technology", "Main Sector": "Information Technology", "Employees": 250, "Revenue": "£10M–£50M", "NAICS Code": "541511", "SIC Code": "6201", "Year Founded": 2008 },
      { "Company Name": "Bright Healthcare", "Company Type": "Private", "Address Line 1": "12 Harley Place", "City": "London", "Region": "Greater London", "Postcode": "W1G 8PH", "Country": "UK", "Main Industry": "Healthcare", "Main Sector": "Health Services", "Employees": 85, "Revenue": "£5M–£10M", "NAICS Code": "621111", "SIC Code": "8621", "Year Founded": 2015 },
      { "Company Name": "GreenLeaf Retail", "Company Type": "Public", "Address Line 1": "88 High Street", "City": "Birmingham", "Region": "West Midlands", "Postcode": "B4 7SL", "Country": "UK", "Main Industry": "Retail", "Main Sector": "Consumer Goods", "Employees": 520, "Revenue": "£50M–£100M", "NAICS Code": "445110", "SIC Code": "5211", "Year Founded": 1995 },
      { "Company Name": "Sterling Finance", "Company Type": "Public", "Address Line 1": "1 Canary Wharf", "City": "London", "Region": "Greater London", "Postcode": "E14 5AB", "Country": "UK", "Main Industry": "Finance", "Main Sector": "Financial Services", "Employees": 1200, "Revenue": "£100M+", "NAICS Code": "522110", "SIC Code": "6021", "Year Founded": 1987 },
      { "Company Name": "NorthStar Logistics", "Company Type": "Private", "Address Line 1": "Unit 7 Park Industrial", "City": "Leeds", "Region": "West Yorkshire", "Postcode": "LS11 5QF", "Country": "UK", "Main Industry": "Logistics", "Main Sector": "Transportation", "Employees": 340, "Revenue": "£10M–£50M", "NAICS Code": "484110", "SIC Code": "4212", "Year Founded": 2003 },
    ],
    sampleDataContact: [
      { "Full Name": "J. Smith", "Job Title": "Marketing Director", "Title Level": "Director", "Title Function": "Marketing", "Company": "Acme Corp Ltd", "Address": "45 King Street, Manchester", "Postcode": "M2 4WQ", "LinkedIn": "linkedin.com/in/j-smith" },
      { "Full Name": "S. Patel", "Job Title": "CEO", "Title Level": "C-Suite", "Title Function": "Management", "Company": "Bright Healthcare", "Address": "12 Harley Place, London", "Postcode": "W1G 8PH", "LinkedIn": "linkedin.com/in/s-patel" },
      { "Full Name": "R. Williams", "Job Title": "Head of Procurement", "Title Level": "VP", "Title Function": "Operations", "Company": "GreenLeaf Retail", "Address": "88 High Street, Birmingham", "Postcode": "B4 7SL", "LinkedIn": "linkedin.com/in/r-williams" },
      { "Full Name": "A. Chen", "Job Title": "CFO", "Title Level": "C-Suite", "Title Function": "Finance", "Company": "Sterling Finance", "Address": "1 Canary Wharf, London", "Postcode": "E14 5AB", "LinkedIn": "linkedin.com/in/a-chen" },
      { "Full Name": "M. O'Brien", "Job Title": "Operations Manager", "Title Level": "Manager", "Title Function": "Operations", "Company": "NorthStar Logistics", "Address": "Unit 7 Park Industrial, Leeds", "Postcode": "LS11 5QF", "LinkedIn": "linkedin.com/in/m-obrien" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the company record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Legal or commonly used name of the company", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "company_type", description: "Classification such as Private, Public, Subsidiary or Non-profit", sourceType: "Registry", updateFrequency: "Quarterly", confidenceScore: 97, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "main_street", description: "Street address of the headquarters", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_city", description: "City of the headquarters location", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_region", description: "State, province or region of the headquarters", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_postcode", description: "Postal or ZIP code of the headquarters", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_country", description: "Country where the company headquarters is located", sourceType: "PAF Verified", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_latitude", description: "Latitude coordinate of the headquarters location", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 97, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_longitude", description: "Longitude coordinate of the headquarters location", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 97, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_industry", description: "Primary industry in which the company operates", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 94, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "main_sector", description: "Broad economic sector associated with the company", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 93, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "employee_count", description: "Reported or estimated number of employees", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "revenue", description: "Reported or estimated annual revenue", sourceType: "Modelled", updateFrequency: "Quarterly", confidenceScore: 82, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "naics_primary_2022_code", description: "Primary NAICS 2022 industry classification code", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 95, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
      { name: "sic_codes", description: "Standard Industrial Classification codes", sourceType: "Registry", updateFrequency: "Quarterly", confidenceScore: 96, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
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
      { country: "United Kingdom", records: 22000000, industries: ["Technology", "Finance", "Professional Services", "Manufacturing", "Healthcare", "Retail"] },
      { country: "United States", records: 5500000, industries: ["Technology", "Healthcare", "Finance", "SaaS", "E-commerce"] },
      { country: "Germany", records: 3200000, industries: ["Automotive", "Manufacturing", "Technology", "Engineering"] },
      { country: "Australia", records: 2100000, industries: ["Mining", "Finance", "Technology", "Construction"] },
      { country: "Canada", records: 2200000, industries: ["Technology", "Energy", "Finance", "Mining"] },
      { country: "India", records: 1800000, industries: ["Technology", "BPO", "Manufacturing", "Pharma"] },
      { country: "Singapore", records: 650000, industries: ["Finance", "Technology", "Logistics"] },
    ],
    sampleDataCompany: [
      { "Company Name": "TechFlow Ltd", "Company Type": "Private", "Primary Phone": "020 7*** ****", "Phone Type": "Switchboard", "City": "London", "Country": "UK", "Main Industry": "Technology", "Main Sector": "Software & IT", "Employees": 180, "Website Domain": "techflow.co.uk" },
      { "Company Name": "Apex Solutions", "Company Type": "Private", "Primary Phone": "0161 *** ****", "Phone Type": "Direct Dial", "City": "Manchester", "Country": "UK", "Main Industry": "Consulting", "Main Sector": "Professional Services", "Employees": 45, "Website Domain": "apexsolutions.com" },
      { "Company Name": "BluePeak Finance", "Company Type": "Public", "Primary Phone": "0131 *** ****", "Phone Type": "Direct Dial", "City": "Edinburgh", "Country": "UK", "Main Industry": "Finance", "Main Sector": "Financial Services", "Employees": 320, "Website Domain": "bluepeakfinance.co.uk" },
      { "Company Name": "DataWave", "Company Type": "Private", "Primary Phone": "0117 *** ****", "Phone Type": "Switchboard", "City": "Bristol", "Country": "UK", "Main Industry": "Technology", "Main Sector": "Data Analytics", "Employees": 95, "Website Domain": "datawave.io" },
      { "Company Name": "MedLine Group", "Company Type": "Public", "Primary Phone": "0113 *** ****", "Phone Type": "Direct Dial", "City": "Leeds", "Country": "UK", "Main Industry": "Healthcare", "Main Sector": "Health Services", "Employees": 650, "Website Domain": "medlinegroup.co.uk" },
    ],
    sampleDataContact: [
      { "Full Name": "T. Baker", "Job Title": "Sales Director", "Title Level": "Director", "Title Function": "Sales", "Direct Dial": "020 7*** ****", "Company": "TechFlow Ltd", "TPS Status": "Clear", "Email": "t.b***@techflow.co.uk" },
      { "Full Name": "L. Green", "Job Title": "Managing Director", "Title Level": "C-Suite", "Title Function": "Management", "Direct Dial": "0161 *** ****", "Company": "Apex Solutions", "TPS Status": "Clear", "Email": "l.g***@apexsolutions.com" },
      { "Full Name": "K. Morrison", "Job Title": "Head of IT", "Title Level": "VP", "Title Function": "IT", "Direct Dial": "0131 *** ****", "Company": "BluePeak Finance", "TPS Status": "Clear", "Email": "k.m***@bluepeakfinance.co.uk" },
      { "Full Name": "D. Harris", "Job Title": "CTO", "Title Level": "C-Suite", "Title Function": "Technology", "Direct Dial": "0117 *** ****", "Company": "DataWave", "TPS Status": "Clear", "Email": "d.h***@datawave.io" },
      { "Full Name": "P. Singh", "Job Title": "Procurement Lead", "Title Level": "Manager", "Title Function": "Operations", "Direct Dial": "0113 *** ****", "Company": "MedLine Group", "TPS Status": "Clear", "Email": "p.s***@medlinegroup.co.uk" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the company record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Legal or commonly used name of the company", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "primary_phone", description: "Primary contact phone number of the company", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 92, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "phone_type", description: "Direct Dial, Switchboard or Mobile classification", sourceType: "Carrier Validation", updateFrequency: "Monthly", confidenceScore: 95, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "tps_status", description: "TPS/CTPS screening result for compliance", sourceType: "TPS Registry", updateFrequency: "Monthly", confidenceScore: 100, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "people_first_name", description: "First name of the associated individual", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 87, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_last_name", description: "Last name of the associated individual", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 87, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title", description: "Job title of the individual", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 85, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title_level", description: "Seniority level such as Executive, Director or Manager", sourceType: "AI Classified", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title_function", description: "Functional area such as Finance, IT or Operations", sourceType: "AI Classified", updateFrequency: "Quarterly", confidenceScore: 86, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_email", description: "Professional email address of the individual", sourceType: "SMTP Verified", updateFrequency: "Weekly", confidenceScore: 94, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_linkedin", description: "LinkedIn profile URL of the individual", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 82, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "main_industry", description: "Primary industry in which the company operates", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 94, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "employee_count", description: "Reported or estimated number of employees", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "website_domain", description: "Root domain name of the company website", sourceType: "DNS Verified", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Company Core Profile", availability: "API & Batch" },
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
      { country: "United Kingdom", records: 18500000, industries: ["Technology", "Finance", "Professional Services", "Retail", "Healthcare", "Legal"] },
      { country: "United States", records: 22000000, industries: ["Technology", "Healthcare", "Finance", "E-commerce", "SaaS"] },
      { country: "Germany", records: 5200000, industries: ["Automotive", "Manufacturing", "Technology", "Finance", "Engineering"] },
      { country: "France", records: 4100000, industries: ["Luxury", "Retail", "Technology", "Finance", "Hospitality"] },
      { country: "India", records: 8200000, industries: ["Technology", "BPO", "Manufacturing", "Pharma", "Fintech"] },
      { country: "Canada", records: 2800000, industries: ["Technology", "Energy", "Finance", "Mining"] },
      { country: "Australia", records: 1900000, industries: ["Mining", "Technology", "Finance", "Construction"] },
      { country: "Netherlands", records: 1500000, industries: ["Logistics", "Technology", "Finance"] },
    ],
    sampleDataCompany: [
      { "Company Name": "CloudFirst Ltd", "Company Type": "Private", "Website Domain": "cloudfirst.co.uk", "Primary Email": "info@cloudfirst.co.uk", "Emails Available": 45, "Main Industry": "Technology", "Main Sector": "Cloud Computing", "City": "London", "Employees": 280, "Year Founded": 2012 },
      { "Company Name": "FinEdge Partners", "Company Type": "Private", "Website Domain": "finedge.com", "Primary Email": "enquiries@finedge.com", "Emails Available": 22, "Main Industry": "Finance", "Main Sector": "Investment Banking", "City": "Edinburgh", "Employees": 150, "Year Founded": 2009 },
      { "Company Name": "RetailMax UK", "Company Type": "Public", "Website Domain": "retailmax.co.uk", "Primary Email": "hello@retailmax.co.uk", "Emails Available": 88, "Main Industry": "Retail", "Main Sector": "Consumer Goods", "City": "Birmingham", "Employees": 720, "Year Founded": 2001 },
      { "Company Name": "HealthBridge", "Company Type": "Non-profit", "Website Domain": "healthbridge.nhs.uk", "Primary Email": "admin@healthbridge.nhs.uk", "Emails Available": 35, "Main Industry": "Healthcare", "Main Sector": "Health Services", "City": "Bristol", "Employees": 190, "Year Founded": 2016 },
      { "Company Name": "BuildRight Construction", "Company Type": "Private", "Website Domain": "buildright.co.uk", "Primary Email": "office@buildright.co.uk", "Emails Available": 15, "Main Industry": "Construction", "Main Sector": "Building & Infrastructure", "City": "Leeds", "Employees": 95, "Year Founded": 2010 },
    ],
    sampleDataContact: [
      { "Full Name": "E. Thompson", "Email": "e.t***@cloudfirst.co.uk", "Job Title": "VP Marketing", "Title Level": "VP", "Title Function": "Marketing", "Company": "CloudFirst Ltd", "Verified": "Yes", "LinkedIn": "linkedin.com/in/e-thompson" },
      { "Full Name": "R. Kumar", "Email": "r.k***@finedge.com", "Job Title": "Head of Digital", "Title Level": "Director", "Title Function": "Digital", "Company": "FinEdge Partners", "Verified": "Yes", "LinkedIn": "linkedin.com/in/r-kumar" },
      { "Full Name": "J. Davies", "Email": "j.d***@retailmax.co.uk", "Job Title": "CMO", "Title Level": "C-Suite", "Title Function": "Marketing", "Company": "RetailMax UK", "Verified": "Yes", "LinkedIn": "linkedin.com/in/j-davies" },
      { "Full Name": "N. Wright", "Email": "n.w***@healthbridge.nhs.uk", "Job Title": "IT Director", "Title Level": "Director", "Title Function": "IT", "Company": "HealthBridge", "Verified": "Yes", "LinkedIn": "linkedin.com/in/n-wright" },
      { "Full Name": "C. Hall", "Email": "c.h***@buildright.co.uk", "Job Title": "Managing Director", "Title Level": "C-Suite", "Title Function": "Management", "Company": "BuildRight Construction", "Verified": "Yes", "LinkedIn": "linkedin.com/in/c-hall" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the company record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Legal or commonly used name of the company", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "primary_email", description: "Primary business email address", sourceType: "SMTP Verified", updateFrequency: "Weekly", confidenceScore: 97, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "website_domain", description: "Root domain name of the company website", sourceType: "DNS Verified", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "website_url", description: "Full URL of the official company website", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "people_email", description: "Professional email address of the individual", sourceType: "SMTP Verified", updateFrequency: "Weekly", confidenceScore: 97, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title", description: "Job title of the individual", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 85, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title_level", description: "Seniority level such as Executive, Director or Manager", sourceType: "AI Classified", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "facebook_url", description: "URL of the company Facebook page", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 90, dataGroup: "Digital Footprint", availability: "API & Batch" },
      { name: "twitter_url", description: "URL of the company Twitter/X profile", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 89, dataGroup: "Digital Footprint", availability: "API & Batch" },
      { name: "linkedin_url", description: "URL of the company LinkedIn page", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 93, dataGroup: "Digital Footprint", availability: "API & Batch" },
      { name: "youtube_url", description: "URL of the company YouTube channel", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 85, dataGroup: "Digital Footprint", availability: "API & Batch" },
      { name: "main_industry", description: "Primary industry in which the company operates", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 94, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "employee_count", description: "Reported or estimated number of employees", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "year_founded", description: "Year in which the company was established", sourceType: "Registry", updateFrequency: "Static", confidenceScore: 96, dataGroup: "Company Core Profile", availability: "API & Batch" },
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
      { country: "United Kingdom", records: 1850000, industries: ["Technology", "Retail", "Professional Services", "Construction", "Healthcare"] },
      { country: "Ireland", records: 280000, industries: ["Technology", "Finance", "Pharma", "Retail"] },
      { country: "United States", records: 420000, industries: ["Technology", "Retail", "Services", "Healthcare"] },
      { country: "Australia", records: 250000, industries: ["Construction", "Technology", "Mining", "Retail"] },
      { country: "Germany", records: 180000, industries: ["Manufacturing", "Technology", "Automotive"] },
      { country: "Canada", records: 150000, industries: ["Technology", "Energy", "Services"] },
    ],
    sampleDataCompany: [
      { "Company Name": "Innovatech Solutions Ltd", "Company Type": "Private", "Incorporation Date": "2024-01-15", "SIC Code": "62012", "SIC Label": "Business & IT Consulting", "Main City": "London", "Postcode": "EC2A 4NE", "Status": "Active", "Director": "A. Johnson" },
      { "Company Name": "GreenPath Consulting", "Company Type": "Private", "Incorporation Date": "2024-01-14", "SIC Code": "70229", "SIC Label": "Management Consulting", "Main City": "Manchester", "Postcode": "M1 3HZ", "Status": "Active", "Director": "M. Taylor" },
      { "Company Name": "SwiftDeliver Ltd", "Company Type": "Private", "Incorporation Date": "2024-01-13", "SIC Code": "53202", "SIC Label": "Courier Services", "Main City": "Birmingham", "Postcode": "B3 2QU", "Status": "Active", "Director": "K. Brown" },
      { "Company Name": "HealthSync Digital", "Company Type": "Private", "Incorporation Date": "2024-01-12", "SIC Code": "86210", "SIC Label": "General Medical Practice", "Main City": "Cambridge", "Postcode": "CB2 1TN", "Status": "Active", "Director": "S. Lee" },
      { "Company Name": "UrbanBrew Coffee Co", "Company Type": "Private", "Incorporation Date": "2024-01-11", "SIC Code": "56103", "SIC Label": "Takeaway Food Shops", "Main City": "Bristol", "Postcode": "BS1 4DJ", "Status": "Active", "Director": "R. Martinez" },
    ],
    sampleDataContact: [
      { "Director Name": "A. Johnson", "Role": "Director", "Company": "Innovatech Solutions Ltd", "Appointed": "2024-01-15", "Nationality": "British", "Email": "a.j***@innovatech.co.uk", "LinkedIn": "linkedin.com/in/a-johnson" },
      { "Director Name": "M. Taylor", "Role": "Director", "Company": "GreenPath Consulting", "Appointed": "2024-01-14", "Nationality": "British", "Email": "m.t***@greenpath.co.uk", "LinkedIn": "linkedin.com/in/m-taylor" },
      { "Director Name": "K. Brown", "Role": "Director/Secretary", "Company": "SwiftDeliver Ltd", "Appointed": "2024-01-13", "Nationality": "British", "Email": "k.b***@swiftdeliver.com", "LinkedIn": "linkedin.com/in/k-brown" },
      { "Director Name": "S. Lee", "Role": "Director", "Company": "HealthSync Digital", "Appointed": "2024-01-12", "Nationality": "British", "Email": "s.l***@healthsync.co.uk", "LinkedIn": "linkedin.com/in/s-lee" },
      { "Director Name": "R. Martinez", "Role": "Director", "Company": "UrbanBrew Coffee Co", "Appointed": "2024-01-11", "Nationality": "Spanish", "Email": "r.m***@urbanbrew.co.uk", "LinkedIn": "linkedin.com/in/r-martinez" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the company record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Newly registered company name", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "company_type", description: "Classification such as Private, LLP, or CIC", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "year_founded", description: "Date of company registration / incorporation", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "sic_codes", description: "Standard Industrial Classification codes", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
      { name: "sic_labels", description: "Human-readable SIC code descriptions", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
      { name: "main_street", description: "Registered office address", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_city", description: "City of registered office", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_postcode", description: "Postcode of registered office", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "lei", description: "Legal Entity Identifier if available", sourceType: "GLEIF", updateFrequency: "Quarterly", confidenceScore: 85, dataGroup: "Legal & Regulatory Profile", availability: "API & Batch" },
      { name: "registry_ids", description: "Companies House number and other registry IDs", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Legal & Regulatory Profile", availability: "API & Batch" },
      { name: "people_first_name", description: "Director first name", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_last_name", description: "Director last name", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title", description: "Director role (Director, Secretary, etc.)", sourceType: "Companies House", updateFrequency: "Daily", confidenceScore: 100, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
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
      { country: "United Kingdom", records: 5800000, industries: ["Freelance", "Consulting", "Creative", "IT", "Trades", "E-commerce"] },
      { country: "United States", records: 1200000, industries: ["Freelance", "Consulting", "E-commerce", "Creative"] },
      { country: "Australia", records: 850000, industries: ["Trades", "Consulting", "Creative", "IT"] },
      { country: "Canada", records: 650000, industries: ["Freelance", "Technology", "Consulting", "Trades"] },
      { country: "Ireland", records: 320000, industries: ["Consulting", "Creative", "IT"] },
      { country: "New Zealand", records: 180000, industries: ["Trades", "Consulting", "Agriculture"] },
    ],
    sampleDataCompany: [
      { "Business Name": "Sarah's Design Studio", "Company Type": "Sole Trader", "Main Sector": "Creative Services", "City": "Brighton", "Country": "UK", "Working From": "Home Office", "Est. Revenue": "£50K–£100K", "Year Founded": 2019, "Website Domain": "sarahsdesign.co.uk" },
      { "Business Name": "CodeCraft Consulting", "Company Type": "Ltd Company", "Main Sector": "IT Consulting", "City": "Reading", "Country": "UK", "Working From": "Home Office", "Est. Revenue": "£100K–£250K", "Year Founded": 2017, "Website Domain": "codecraft.co.uk" },
      { "Business Name": "FitLife PT", "Company Type": "Sole Trader", "Main Sector": "Health & Fitness", "City": "Leeds", "Country": "UK", "Working From": "Mobile", "Est. Revenue": "£25K–£50K", "Year Founded": 2021, "Website Domain": "fitlifept.com" },
      { "Business Name": "Green Thumb Gardens", "Company Type": "Partnership", "Main Sector": "Landscaping", "City": "Oxford", "Country": "UK", "Working From": "Home Office", "Est. Revenue": "£75K–£150K", "Year Founded": 2015, "Website Domain": "greenthumb.co.uk" },
      { "Business Name": "PageTurn Publishing", "Company Type": "Ltd Company", "Main Sector": "Publishing", "City": "Edinburgh", "Country": "UK", "Working From": "Home Office", "Est. Revenue": "£50K–£100K", "Year Founded": 2018, "Website Domain": "pageturn.co.uk" },
    ],
    sampleDataContact: [
      { "Owner Name": "S. Mitchell", "Role": "Owner/Designer", "Business": "Sarah's Design Studio", "Phone": "01273 ***", "Email": "s.m***@sarahsdesign.co.uk", "LinkedIn": "linkedin.com/in/s-mitchell" },
      { "Owner Name": "J. Patel", "Role": "Owner/Director", "Business": "CodeCraft Consulting", "Phone": "0118 ***", "Email": "j.p***@codecraft.co.uk", "LinkedIn": "linkedin.com/in/j-patel" },
      { "Owner Name": "M. Jones", "Role": "Owner/Trainer", "Business": "FitLife PT", "Phone": "0113 ***", "Email": "m.j***@fitlifept.com", "LinkedIn": "linkedin.com/in/m-jones" },
      { "Owner Name": "D. & L. Carter", "Role": "Partners", "Business": "Green Thumb Gardens", "Phone": "01865 ***", "Email": "info@greenthumb.co.uk", "LinkedIn": "linkedin.com/in/d-carter" },
      { "Owner Name": "A. McLeod", "Role": "Owner/Director", "Business": "PageTurn Publishing", "Phone": "0131 ***", "Email": "a.m***@pageturn.co.uk", "LinkedIn": "linkedin.com/in/a-mcleod" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the company record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "business_name", description: "Trading name of the SOHO business", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 93, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "company_type", description: "Sole Trader, Ltd, Partnership classification", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 90, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "short_description", description: "Brief summary of the business's primary offering", sourceType: "AI Generated", updateFrequency: "Quarterly", confidenceScore: 85, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "main_sector", description: "Industry sector classification", sourceType: "AI Classified", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "main_city", description: "City of the business location", sourceType: "Address Analysis", updateFrequency: "Monthly", confidenceScore: 92, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "main_postcode", description: "Postcode of the business location", sourceType: "Address Analysis", updateFrequency: "Monthly", confidenceScore: 93, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "working_location", description: "Home Office, Co-working, or Mobile", sourceType: "Address Analysis", updateFrequency: "Quarterly", confidenceScore: 85, dataGroup: "Geographic Footprint", availability: "Batch" },
      { name: "people_first_name", description: "Business owner first name", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 91, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_last_name", description: "Business owner last name", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 91, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_email", description: "Owner email address", sourceType: "SMTP Verified", updateFrequency: "Monthly", confidenceScore: 89, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "primary_phone", description: "Business phone number", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 86, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "website_domain", description: "Business website domain", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 88, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "revenue", description: "Revenue band estimate", sourceType: "Modelled", updateFrequency: "Annually", confidenceScore: 72, dataGroup: "Organizational Scale", availability: "Batch" },
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
      { country: "United Kingdom", records: 4200000, industries: ["Retail", "Hospitality", "Services", "Healthcare", "Leisure"] },
      { country: "United States", records: 5800000, industries: ["Retail", "QSR", "Services", "Healthcare", "Automotive"] },
      { country: "Germany", records: 2100000, industries: ["Retail", "Automotive", "Services", "Manufacturing"] },
      { country: "France", records: 1800000, industries: ["Retail", "Hospitality", "Services", "Luxury"] },
      { country: "Australia", records: 1100000, industries: ["Retail", "Services", "Hospitality", "Mining"] },
      { country: "India", records: 1500000, industries: ["Retail", "Healthcare", "Services", "Hospitality"] },
      { country: "UAE", records: 450000, industries: ["Retail", "Hospitality", "Real Estate", "Luxury"] },
    ],
    sampleDataCompany: [
      { "POI Name": "Costa Coffee – King's Cross", "Category": "Coffee Shop", "Latitude": 51.532, "Longitude": -0.124, "City": "London", "Country": "UK", "Footfall (Monthly)": 45000, "Rating": 4.2, "Chain Size": "2,800+ UK" },
      { "POI Name": "Boots Pharmacy – Oxford St", "Category": "Pharmacy", "Latitude": 51.515, "Longitude": -0.142, "City": "London", "Country": "UK", "Footfall (Monthly)": 82000, "Rating": 4.0, "Chain Size": "2,200+ UK" },
      { "POI Name": "PureGym – Shoreditch", "Category": "Gym/Fitness", "Latitude": 51.5265, "Longitude": -0.078, "City": "London", "Country": "UK", "Footfall (Monthly)": 12000, "Rating": 4.3, "Chain Size": "350+ UK" },
      { "POI Name": "Tesco Express – Camden", "Category": "Grocery", "Latitude": 51.5392, "Longitude": -0.1426, "City": "London", "Country": "UK", "Footfall (Monthly)": 35000, "Rating": 3.8, "Chain Size": "3,400+ UK" },
      { "POI Name": "WeWork – Paddington", "Category": "Co-working", "Latitude": 51.5154, "Longitude": -0.1755, "City": "London", "Country": "UK", "Footfall (Monthly)": 8000, "Rating": 4.1, "Chain Size": "40+ UK" },
    ],
    sampleDataContact: [
      { "Location Manager": "Branch Manager", "Brand": "Costa Coffee", "Location": "King's Cross, London", "Contact Type": "Store Phone", "Location Type": "Franchise", "Chain Size": "2,800+ UK" },
      { "Location Manager": "Store Manager", "Brand": "Boots", "Location": "Oxford Street, London", "Contact Type": "Store Phone", "Location Type": "Company-owned", "Chain Size": "2,200+ UK" },
      { "Location Manager": "Club Manager", "Brand": "PureGym", "Location": "Shoreditch, London", "Contact Type": "Club Phone", "Location Type": "Company-owned", "Chain Size": "350+ UK" },
      { "Location Manager": "Store Manager", "Brand": "Tesco", "Location": "Camden, London", "Contact Type": "Store Phone", "Location Type": "Company-owned", "Chain Size": "3,400+ UK" },
      { "Location Manager": "Community Manager", "Brand": "WeWork", "Location": "Paddington, London", "Contact Type": "Location Phone", "Location Type": "Managed", "Chain Size": "40+ UK" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the location record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Point of interest / business name", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 96, dataGroup: "Location", availability: "Batch" },
      { name: "main_country", description: "Country of the location", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Location", availability: "Batch" },
      { name: "main_city", description: "City of the location", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Location", availability: "Batch" },
      { name: "main_street", description: "Street address of the location", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 97, dataGroup: "Location", availability: "Batch" },
      { name: "main_latitude", description: "Geocoded latitude coordinate", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Location", availability: "Batch" },
      { name: "main_longitude", description: "Geocoded longitude coordinate", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Location", availability: "Batch" },
      { name: "location_type", description: "Type of location (HQ, Branch, Warehouse, Retail)", sourceType: "AI Classified", updateFrequency: "Monthly", confidenceScore: 90, dataGroup: "Location Intelligence", availability: "Batch" },
      { name: "building_name", description: "Name of the building if applicable", sourceType: "Geocoder", updateFrequency: "Monthly", confidenceScore: 85, dataGroup: "Location Intelligence", availability: "Batch" },
      { name: "floors", description: "Number of floors in the building", sourceType: "Public Records", updateFrequency: "Quarterly", confidenceScore: 78, dataGroup: "Location Intelligence", availability: "Batch" },
      { name: "footfall_monthly", description: "Estimated monthly visitors", sourceType: "Modelled", updateFrequency: "Monthly", confidenceScore: 78, dataGroup: "Location Intelligence", availability: "Batch" },
      { name: "naics_primary_2022_code", description: "Primary NAICS classification of the POI", sourceType: "AI Classified", updateFrequency: "Monthly", confidenceScore: 94, dataGroup: "Industry Classification Mapping", availability: "Batch" },
      { name: "employee_count", description: "Estimated staff at this location", sourceType: "Modelled", updateFrequency: "Quarterly", confidenceScore: 75, dataGroup: "Organizational Scale", availability: "Batch" },
      { name: "brand_name", description: "Parent brand if chain location", sourceType: "Directory", updateFrequency: "Monthly", confidenceScore: 95, dataGroup: "Company Core Profile", availability: "Batch" },
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
      { country: "United Kingdom", records: 2800000, industries: ["NHS Trusts", "Private Healthcare", "Pharma", "Medtech", "Diagnostics"] },
      { country: "United States", records: 4500000, industries: ["Hospitals", "Private Practice", "Pharma", "Biotech", "CRO"] },
      { country: "Germany", records: 1800000, industries: ["Hospitals", "Pharma", "Medtech", "Private Practice"] },
      { country: "India", records: 1500000, industries: ["Hospitals", "Pharma", "Diagnostics", "Telemedicine"] },
      { country: "Japan", records: 1400000, industries: ["Hospitals", "Pharma", "Medtech", "Research"] },
      { country: "France", records: 950000, industries: ["Hospitals", "Pharma", "Private Practice"] },
      { country: "Canada", records: 680000, industries: ["Hospitals", "Pharma", "Research"] },
    ],
    sampleDataCompany: [
      { "Organisation": "St. Mary's Hospital NHS Trust", "Company Type": "NHS Acute Trust", "City": "London", "Country": "UK", "Beds": 650, "Specialties": 42, "Staff": 5200, "Main Sector": "Public Healthcare" },
      { "Organisation": "Bupa Cromwell Hospital", "Company Type": "Private Hospital", "City": "London", "Country": "UK", "Beds": 148, "Specialties": 28, "Staff": 890, "Main Sector": "Private Healthcare" },
      { "Organisation": "AstraZeneca UK", "Company Type": "Pharmaceutical", "City": "Cambridge", "Country": "UK", "Beds": 0, "Specialties": 0, "Staff": 8500, "Main Sector": "Pharmaceuticals" },
      { "Organisation": "Smith & Nephew", "Company Type": "Medical Devices", "City": "Watford", "Country": "UK", "Beds": 0, "Specialties": 0, "Staff": 3200, "Main Sector": "Medical Devices" },
      { "Organisation": "Nuffield Health Leeds", "Company Type": "Private Hospital", "City": "Leeds", "Country": "UK", "Beds": 82, "Specialties": 18, "Staff": 420, "Main Sector": "Private Healthcare" },
    ],
    sampleDataContact: [
      { "Name": "Dr. A. Rahman", "Specialty": "Cardiology", "Title": "Consultant", "Title Level": "Senior", "Organisation": "St. Mary's Hospital", "GMC Status": "Registered", "Email": "a.r***@stmarys.nhs.uk" },
      { "Name": "Dr. L. Foster", "Specialty": "Orthopaedics", "Title": "Consultant Surgeon", "Title Level": "Senior", "Organisation": "Bupa Cromwell", "GMC Status": "Registered", "Email": "l.f***@bupacromwell.com" },
      { "Name": "P. Howard", "Specialty": "N/A", "Title": "Regional Sales Director", "Title Level": "Director", "Organisation": "AstraZeneca UK", "GMC Status": "N/A", "Email": "p.h***@astrazeneca.com" },
      { "Name": "Dr. S. Yamamoto", "Specialty": "Oncology", "Title": "Head of Research", "Title Level": "VP", "Organisation": "Smith & Nephew", "GMC Status": "N/A", "Email": "s.y***@smith-nephew.com" },
      { "Name": "Nurse K. Evans", "Specialty": "Paediatrics", "Title": "Ward Sister", "Title Level": "Manager", "Organisation": "Nuffield Health Leeds", "NMC Status": "Registered", "Email": "k.e***@nuffieldhealth.com" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier assigned to the organisation record", sourceType: "System", updateFrequency: "Real-time", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Hospital, clinic, or company name", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "company_type", description: "NHS Trust, Private, Pharma, Medtech classification", sourceType: "Registry", updateFrequency: "Quarterly", confidenceScore: 97, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "long_description", description: "Detailed narrative of the organisation's operations", sourceType: "AI Generated", updateFrequency: "Quarterly", confidenceScore: 88, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "people_first_name", description: "Healthcare professional first name", sourceType: "GMC/NMC Registry", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_last_name", description: "Healthcare professional last name", sourceType: "GMC/NMC Registry", updateFrequency: "Monthly", confidenceScore: 98, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title", description: "Medical specialty or job title", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 96, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_title_level", description: "Seniority level (Consultant, Registrar, Nurse etc.)", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 94, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_email", description: "Professional email address of the HCP", sourceType: "Multi-source", updateFrequency: "Monthly", confidenceScore: 90, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "people_linkedin", description: "LinkedIn profile URL of the HCP", sourceType: "Web Crawl", updateFrequency: "Monthly", confidenceScore: 80, dataGroup: "Leadership & Workforce Intelligence", availability: "API & Batch" },
      { name: "registration_status", description: "GMC/NMC/NPI registration status", sourceType: "Official Registry", updateFrequency: "Monthly", confidenceScore: 100, dataGroup: "Legal & Regulatory Profile", availability: "API & Batch" },
      { name: "main_city", description: "City of the organisation", sourceType: "Registry", updateFrequency: "Monthly", confidenceScore: 99, dataGroup: "Geographic Footprint", availability: "API & Batch" },
      { name: "employee_count", description: "Total staff at the organisation", sourceType: "Multi-source", updateFrequency: "Quarterly", confidenceScore: 85, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "naics_primary_2022_code", description: "Healthcare NAICS classification code", sourceType: "Registry + AI", updateFrequency: "Quarterly", confidenceScore: 95, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
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
      { country: "Middle East", records: 0, industries: ["All – enrichment service"] },
    ],
    sampleDataCompany: [
      { "Input Field": "Company Name", "Before": "Acme Corp", "After": "Acme Corporation Ltd", "Status": "Corrected", "Confidence": "97%", "Data Group": "Company Core Profile" },
      { "Input Field": "Phone", "Before": "(missing)", "After": "020 7946 0958", "Status": "Appended", "Confidence": "92%", "Data Group": "Corporate Contact Intelligence" },
      { "Input Field": "Industry", "Before": "Tech", "After": "Information Technology – Software", "Status": "Standardised", "Confidence": "95%", "Data Group": "Industry Classification Mapping" },
      { "Input Field": "Employee Count", "Before": "(missing)", "After": "245", "Status": "Appended", "Confidence": "88%", "Data Group": "Organizational Scale" },
      { "Input Field": "Postcode", "Before": "EC2A 4N", "After": "EC2A 4NE", "Status": "Corrected", "Confidence": "99%", "Data Group": "Geographic Footprint" },
    ],
    sampleDataContact: [
      { "Input Field": "Email", "Before": "j.smith@acme.com", "After": "j.smith@acme.com", "Status": "Verified ✓", "Confidence": "98%", "Data Group": "Leadership & Workforce Intelligence" },
      { "Input Field": "Job Title", "Before": "Manager", "After": "Marketing Manager", "Status": "Enhanced", "Confidence": "90%", "Data Group": "Leadership & Workforce Intelligence" },
      { "Input Field": "Direct Dial", "Before": "(missing)", "After": "020 7946 0123", "Status": "Appended", "Confidence": "85%", "Data Group": "Corporate Contact Intelligence" },
      { "Input Field": "LinkedIn URL", "Before": "(missing)", "After": "linkedin.com/in/j-smith-acme", "Status": "Appended", "Confidence": "82%", "Data Group": "Digital Footprint" },
      { "Input Field": "Seniority Level", "Before": "(missing)", "After": "Mid-Level Management", "Status": "Classified", "Confidence": "91%", "Data Group": "Leadership & Workforce Intelligence" },
    ],
    dataDictionary: [
      { name: "infynd_id", description: "Unique internal identifier used for matching", sourceType: "System", updateFrequency: "Per batch", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "match_score", description: "Overall match confidence percentage", sourceType: "Algorithm", updateFrequency: "Per batch", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "company_name", description: "Corrected and standardised company name", sourceType: "Registry + AI", updateFrequency: "Per batch", confidenceScore: 97, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "company_type", description: "Corrected company classification", sourceType: "Registry", updateFrequency: "Per batch", confidenceScore: 95, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "main_industry", description: "Standardised industry classification", sourceType: "Registry + AI", updateFrequency: "Per batch", confidenceScore: 94, dataGroup: "Company Core Profile", availability: "API & Batch" },
      { name: "employee_count", description: "Appended or corrected employee count", sourceType: "Multi-source", updateFrequency: "Per batch", confidenceScore: 88, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "revenue", description: "Appended or corrected revenue estimate", sourceType: "Modelled", updateFrequency: "Per batch", confidenceScore: 82, dataGroup: "Organizational Scale", availability: "API & Batch" },
      { name: "primary_phone", description: "Appended or verified phone number", sourceType: "Multi-source", updateFrequency: "Per batch", confidenceScore: 92, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "primary_email", description: "Appended or verified email address", sourceType: "SMTP Verified", updateFrequency: "Per batch", confidenceScore: 97, dataGroup: "Corporate Contact Intelligence", availability: "API & Batch" },
      { name: "linkedin_url", description: "Appended company LinkedIn URL", sourceType: "Web Crawl", updateFrequency: "Per batch", confidenceScore: 90, dataGroup: "Digital Footprint", availability: "API & Batch" },
      { name: "naics_primary_2022_code", description: "Appended or corrected NAICS code", sourceType: "Registry + AI", updateFrequency: "Per batch", confidenceScore: 95, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
      { name: "sic_codes", description: "Appended or corrected SIC codes", sourceType: "Registry", updateFrequency: "Per batch", confidenceScore: 96, dataGroup: "Industry Classification Mapping", availability: "API & Batch" },
      { name: "fields_appended", description: "Count of new fields added to the record", sourceType: "System", updateFrequency: "Per batch", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "fields_corrected", description: "Count of existing fields that were corrected", sourceType: "System", updateFrequency: "Per batch", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "data_quality_score", description: "Overall data quality score (A–F grade)", sourceType: "Quality Engine", updateFrequency: "Per batch", confidenceScore: 100, dataGroup: "Core", availability: "API & Batch" },
      { name: "duplicate_flag", description: "Whether record is a duplicate of another in the file", sourceType: "Algorithm", updateFrequency: "Per batch", confidenceScore: 95, dataGroup: "Core", availability: "API & Batch" },
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

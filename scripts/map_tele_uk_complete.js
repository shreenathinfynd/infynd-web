import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the UK telemarketing data
const inputPath = path.join(__dirname, 'uk_postal_tele_mapped.json');
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

console.log('📊 Processing UK Telemarketing Data...\n');
console.log(`Found ${rawData.length} records\n`);

// Helper function to derive title level from job title
function getTitleLevel(jobTitle) {
    if (!jobTitle) return 'Manager';
    const title = jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('chief executive') || title.includes('founder')) return 'C Level';
    if (title.includes('director') || title.includes('cso')) return 'Director';
    if (title.includes('vp') || title.includes('vice president')) return 'VP';
    if (title.includes('head')) return 'Head';
    if (title.includes('owner') || title.includes('partner') || title.includes('managing')) return 'Manager';
    return 'Manager';
}

// Helper function to derive title function from job title
function getTitleFunction(jobTitle) {
    if (!jobTitle) return 'Management';
    const title = jobTitle.toLowerCase();
    if (title.includes('marketing')) return 'Marketing';
    if (title.includes('sales')) return 'Sales';
    if (title.includes('finance') || title.includes('cfo')) return 'Finance';
    if (title.includes('technology') || title.includes('cto') || title.includes('it')) return 'IT';
    if (title.includes('operations') || title.includes('coo')) return 'Operations';
    if (title.includes('hr') || title.includes('human resources')) return 'HR';
    if (title.includes('legal')) return 'Legal';
    if (title.includes('product')) return 'Product';
    return 'Management';
}

// Map company data
const companyData = rawData.map(record => ({
    "Company Name": record.td_company_name || "",
    "Company Type": "Private",
    "Primary Phone": `(+44) ${record.Phone}`,
    "Phone Type": "Direct Dial",
    "Main Industry": record.Sub_industry || "",
    "Main Sector": record.Sector || "",
    "City": record.td_Post_Town || "",
    "Country": "United Kingdom",
    "Employees": record.Employee_range || "Uncategorised",
}));

// Map contact data
const contactData = rawData.map(record => ({
    "Full Name": `${record.First_name || ""} ${record.Last_name || ""}`.trim(),
    "Job Title": record.Jobtitle || "",
    "Title Level": getTitleLevel(record.Jobtitle),
    "Title Function": getTitleFunction(record.Jobtitle),
    "Direct Dial": `(+44) ${record.Phone}`,
    "Company": record.td_company_name || "",
    "TPS Status": "Clear",
    "Country": "United Kingdom",
    "Email": "N/A"
}));

console.log('✅ Sample Data Generated\n');
console.log(`✅ ${companyData.length} companies mapped`);
console.log(`✅ ${contactData.length} contacts mapped\n`);

// Generate TypeScript code for products.ts
console.log('='.repeat(70));
console.log('📋 COPY THIS TO products.ts (Telemarketing Product)');
console.log('='.repeat(70));
console.log('\n// For TELE product - Replace UK sampleDataCompany:');
console.log('sampleDataCompany: [');
companyData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < companyData.length - 1 ? ',' : ''}`);
});
console.log('],\n');

console.log('// For TELE product - Replace UK sampleDataContact:');
console.log('sampleDataContact: [');
contactData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < contactData.length - 1 ? ',' : ''}`);
});
console.log('],\n');

// Generate Data Dictionary entries from the raw data keys
console.log('='.repeat(70));
console.log('📚 DATA DICTIONARY ENTRIES (based on source fields)');
console.log('='.repeat(70));
console.log('\n// Add these to the dataDictionary array in the tele product:\n');

// Define field mappings with descriptions
const fieldMappings = [
    {
        name: "company_registration_number",
        description: "Official UK Companies House registration number",
        sourceType: "Registry",
        updateFrequency: "Quarterly",
        confidenceScore: 100,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "td_company_name",
        description: "Legal or trading name of the company",
        sourceType: "Registry",
        updateFrequency: "Monthly",
        confidenceScore: 99,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "td_address_1",
        description: "Primary address line (street address)",
        sourceType: "Registry",
        updateFrequency: "Monthly",
        confidenceScore: 98,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_address_2",
        description: "Secondary address line (locality/district)",
        sourceType: "Registry",
        updateFrequency: "Monthly",
        confidenceScore: 98,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_address_3",
        description: "Tertiary address line (city/region)",
        sourceType: "Registry",
        updateFrequency: "Monthly",
        confidenceScore: 98,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_Post_Town",
        description: "Post town as defined by Royal Mail",
        sourceType: "PAF Verified",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_County",
        description: "County or administrative region",
        sourceType: "Registry",
        updateFrequency: "Quarterly",
        confidenceScore: 97,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_Post_Code",
        description: "UK postcode verified against Royal Mail PAF",
        sourceType: "PAF Verified",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "Phone",
        description: "Primary contact phone number (direct dial or switchboard)",
        sourceType: "Verified Call",
        updateFrequency: "Monthly",
        confidenceScore: 92,
        dataGroup: "Contact Details",
        availability: "API & Batch"
    },
    {
        name: "Location_type",
        description: "Classification of site (Head Office, Single Site, Branch, etc.)",
        sourceType: "Derived",
        updateFrequency: "Quarterly",
        confidenceScore: 85,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "Techstack",
        description: "Technology stack and software used by the company",
        sourceType: "Web Scrape",
        updateFrequency: "Quarterly",
        confidenceScore: 70,
        dataGroup: "Firmographic Attributes",
        availability: "API & Batch"
    },
    {
        name: "Sic_code",
        description: "Standard Industrial Classification (SIC) code",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 100,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "Sic_text",
        description: "Human-readable description of the SIC code",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 100,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "Sub_industry",
        description: "Granular industry classification (sub-category)",
        sourceType: "Derived",
        updateFrequency: "Quarterly",
        confidenceScore: 90,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "Industry",
        description: "Primary industry sector of the company",
        sourceType: "Derived",
        updateFrequency: "Quarterly",
        confidenceScore: 92,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "Sector",
        description: "Broad business sector classification",
        sourceType: "Derived",
        updateFrequency: "Quarterly",
        confidenceScore: 95,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "Employee_range",
        description: "Estimated number of employees at this location",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 82,
        dataGroup: "Firmographic Attributes",
        availability: "API & Batch"
    },
    {
        name: "Turnover_range",
        description: "Estimated annual turnover/revenue bracket",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 78,
        dataGroup: "Firmographic Attributes",
        availability: "API & Batch"
    },
    {
        name: "First_name",
        description: "First name of the business contact",
        sourceType: "Verified",
        updateFrequency: "Monthly",
        confidenceScore: 88,
        dataGroup: "Contact Details",
        availability: "API & Batch"
    },
    {
        name: "Last_name",
        description: "Last name of the business contact",
        sourceType: "Verified",
        updateFrequency: "Monthly",
        confidenceScore: 88,
        dataGroup: "Contact Details",
        availability: "API & Batch"
    },
    {
        name: "Jobtitle",
        description: "Job title or role of the business contact",
        sourceType: "Verified",
        updateFrequency: "Monthly",
        confidenceScore: 85,
        dataGroup: "Contact Details",
        availability: "API & Batch"
    }
];

// Print data dictionary entries in TypeScript format
fieldMappings.forEach((field, idx) => {
    console.log(`  { name: "${field.name}", description: "${field.description}", sourceType: "${field.sourceType}", updateFrequency: "${field.updateFrequency}", confidenceScore: ${field.confidenceScore}, dataGroup: "${field.dataGroup}", availability: "${field.availability}" }${idx < fieldMappings.length - 1 ? ',' : ''}`);
});

console.log('\n');
console.log('='.repeat(70));
console.log('✅ MAPPING COMPLETE!');
console.log('='.repeat(70));
console.log('\n📌 Next Steps:');
console.log('1. Copy the sampleDataCompany array to products.ts');
console.log('2. Copy the sampleDataContact array to products.ts');
console.log('3. Add the data dictionary entries to the tele product dataDictionary array');
console.log('\n');

// Save to JSON for reference
const output = {
    sampleDataCompany: companyData,
    sampleDataContact: contactData,
    dataDictionary: fieldMappings
};

const outputPath = path.join(__dirname, 'uk_tele_complete_mapping.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`💾 Complete mapping saved to: ${outputPath}\n`);

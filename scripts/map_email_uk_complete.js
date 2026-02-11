import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the UK email data
const inputPath = path.join(__dirname, 'uk_data_for_products.json');
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

console.log('📊 Processing UK Email Data...\n');
console.log(`Found ${rawData.length} records\n`);

// Helper function to derive title level from job title
function getTitleLevel(jobTitle) {
    if (!jobTitle) return 'Manager';
    const title = jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('chief executive') || title.includes('founder')) return 'C Level';
    if (title.includes('director') || title.includes('managing director')) return 'Director';
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

// Map company data for Email product
const companyData = rawData.map(record => ({
    "Company Name": record.td_company_name || "",
    "Company Type": "Private",
    "Website Domain": record.domain || "N/A",
    "Company Email": record.company_email || "N/A",
    "Main Industry": record.sub_industry || "",
    "Main Sector": record.sector || "",
    "City": record.td_Post_Town || "",
    "Country": "United Kingdom",
    "Employees": record.employee_range || "Uncategorised",
}));

// Map contact data for Email product
const contactData = rawData.map(record => ({
    "Full Name": `${record.first_name || ""} ${record.last_name || ""}`.trim(),
    "Job Title": record.jobtitle || "",
    "Title Level": getTitleLevel(record.jobtitle),
    "Title Function": getTitleFunction(record.jobtitle),
    "Email": record.people_email || "N/A",
    "Company": record.td_company_name || "",
    "Country": "United Kingdom",
}));

console.log('✅ Email Data Mapped\n');
console.log(`✅ ${companyData.length} companies mapped`);
console.log(`✅ ${contactData.length} contacts mapped\n`);

// Generate TypeScript code for products.ts
console.log('='.repeat(70));
console.log('📋 COPY THIS TO products.ts (Email Product)');
console.log('='.repeat(70));
console.log('\n// For EMAIL product - Add UK sampleDataCompany:');
console.log('sampleDataCompany: [');
companyData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < companyData.length - 1 ? ',' : ''}`);
});
console.log('],\n');

console.log('// For EMAIL product - Add UK sampleDataContact:');
console.log('sampleDataContact: [');
contactData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < contactData.length - 1 ? ',' : ''}`);
});
console.log('],\n');

// Generate Data Dictionary entries from the email data keys
console.log('='.repeat(70));
console.log('📚 DATA DICTIONARY ENTRIES (Email Product Fields)');
console.log('='.repeat(70));
console.log('\n// Add these to the dataDictionary array in the email product:\n');

// Define field mappings with descriptions for email product
const fieldMappings = [
    {
        name: "domain",
        description: "Company website domain name",
        sourceType: "DNS Verified",
        updateFrequency: "Monthly",
        confidenceScore: 99,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "company_email",
        description: "General company email address (info@, contact@, etc.)",
        sourceType: "Web Scrape",
        updateFrequency: "Quarterly",
        confidenceScore: 85,
        dataGroup: "Contact Details",
        availability: "API & Batch"
    },
    {
        name: "people_email",
        description: "Direct professional email address of the business contact",
        sourceType: "SMTP Verified",
        updateFrequency: "Weekly",
        confidenceScore: 94,
        dataGroup: "Leadership & Workforce Intelligence",
        availability: "API & Batch"
    },
    {
        name: "location_type",
        description: "Classification of business site (Head Office, Branch, Single Site)",
        sourceType: "Derived",
        updateFrequency: "Quarterly",
        confidenceScore: 85,
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
        name: "td_Post_Code",
        description: "UK postcode verified against Royal Mail PAF",
        sourceType: "PAF Verified",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "sic_code",
        description: "Standard Industrial Classification (SIC) code",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 100,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "sic_text",
        description: "Human-readable description of the SIC code",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 100,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "employee_range",
        description: "Estimated number of employees at this location",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 82,
        dataGroup: "Firmographic Attributes",
        availability: "API & Batch"
    },
    {
        name: "turnover_range",
        description: "Estimated annual turnover/revenue bracket",
        sourceType: "Registry",
        updateFrequency: "Annually",
        confidenceScore: 78,
        dataGroup: "Firmographic Attributes",
        availability: "API & Batch"
    }
];

// Print data dictionary entries
fieldMappings.forEach((field, idx) => {
    console.log(`  { name: "${field.name}", description: "${field.description}", sourceType: "${field.sourceType}", updateFrequency: "${field.updateFrequency}", confidenceScore: ${field.confidenceScore}, dataGroup: "${field.dataGroup}", availability: "${field.availability}" }${idx < fieldMappings.length - 1 ? ',' : ''}`);
});

console.log('\n');
console.log('='.repeat(70));
console.log('✅ EMAIL MAPPING COMPLETE!');
console.log('='.repeat(70));

// Data Analysis Summary
console.log('\n📊 DATA ANALYSIS SUMMARY:\n');
console.log('UK Email Companies:');
rawData.forEach((record, idx) => {
    console.log(`${idx + 1}. ${record.td_company_name} (${record.td_Post_Town || 'N/A'})`);
    console.log(`   - Industry: ${record.sub_industry || 'N/A'}`);
    console.log(`   - Sector: ${record.sector || 'N/A'}`);
    console.log(`   - Domain: ${record.domain || 'N/A'}`);
    console.log(`   - Company Email: ${record.company_email || 'N/A'}`);
    console.log(`   - Contact: ${record.first_name} ${record.last_name} (${record.jobtitle})`);
    console.log(`   - Contact Email: ${record.people_email || 'N/A'}`);
    console.log('');
});

// Save to JSON for reference
const output = {
    sampleDataCompany: companyData,
    sampleDataContact: contactData,
    dataDictionary: fieldMappings,
    rawDataSummary: rawData
};

const outputPath = path.join(__dirname, 'uk_email_complete_mapping.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`💾 Complete mapping saved to: ${outputPath}\n`);

console.log('\n📌 Next Steps:');
console.log('1. Find the email product in products.ts (id: "email")');
console.log('2. Add the UK sampleDataCompany array to beginning of existing samples');
console.log('3. Add the UK sampleDataContact array to beginning of existing samples');
console.log('4. Add the data dictionary entries to the email product dataDictionary array');
console.log('\n');

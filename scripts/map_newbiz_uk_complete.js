import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the UK new business data
const inputPath = path.join(__dirname, 'uk_data_for_products.json');
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

console.log('📊 Processing UK New Business Data...\n');
console.log(`Found ${rawData.length} records\n`);

// Helper function to get current date for incorporation simulation
function getIncorporationDate(index) {
    const baseDate = new Date('2024-02-01');
    baseDate.setDate(baseDate.getDate() - index);
    return baseDate.toISOString().split('T')[0];
}

// Helper function to format director name
function formatDirectorName(firstName, lastName) {
    if (!firstName || !lastName) return 'N/A';
    const firstInitial = firstName.charAt(0);
    return `${firstInitial}. ${lastName}`;
}

// Map company data for New Business product
const companyData = rawData.map((record, index) => ({
    "Company Name": record.td_company_name || "",
    "Company Type": "Private",
    "Incorporation Date": getIncorporationDate(index),
    "SIC Code": record.sic_code || "",
    "SIC Label": record.sub_industry || record.industry || "",
    "Main City": record.td_Post_Town || "",
    "Country": "United Kingdom",
    "Postcode": record.td_Post_Code || "",
    "Status": "Active",
    "Director": formatDirectorName(record.first_name, record.last_name)
}));

// Map contact data (directors) for New Business product
const contactData = rawData.map((record, index) => ({
    "Director Name": `${record.first_name || ""} ${record.last_name || ""}`.trim(),
    "Role": record.jobtitle || "Director",
    "Company": record.td_company_name || "",
    "Appointed": getIncorporationDate(index),
    "Nationality": "British",
    "Country": "United Kingdom",
    "Email": record.people_email || "N/A",
}));

console.log('✅ New Business Data Mapped\n');
console.log(`✅ ${companyData.length} companies mapped`);
console.log(`✅ ${contactData.length} directors mapped\n`);

// Generate TypeScript code for products.ts
console.log('='.repeat(70));
console.log('📋 COPY THIS TO products.ts (New Business Product)');
console.log('='.repeat(70));
console.log('\n// For NEWBIZ product - Add UK sampleDataCompany:');
console.log('sampleDataCompany: [');
companyData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < companyData.length - 1 ? ',' : ''}`);
});
console.log('],\n');

console.log('// For NEWBIZ product - Add UK sampleDataContact:');
console.log('sampleDataContact: [');
contactData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < contactData.length - 1 ? ',' : ''}`);
});
console.log('],\n');

// Generate Data Dictionary entries
console.log('='.repeat(70));
console.log('📚 DATA DICTIONARY ENTRIES (New Business Product Fields)');
console.log('='.repeat(70));
console.log('\n// Add these to the dataDictionary array in the newbiz product:\n');

// Define field mappings with descriptions for new business product
const fieldMappings = [
    {
        name: "company_registration_number",
        description: "Official UK Companies House registration number assigned at incorporation",
        sourceType: "Companies House",
        updateFrequency: "Daily",
        confidenceScore: 100,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "incorporation_date",
        description: "Date when the company was officially registered",
        sourceType: "Companies House",
        updateFrequency: "Static",
        confidenceScore: 100,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "td_company_name",
        description: "Legal registered name of the newly incorporated company",
        sourceType: "Companies House",
        updateFrequency: "Daily",
        confidenceScore: 100,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    },
    {
        name: "sic_code",
        description: "Standard Industrial Classification code declared at registration",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "sic_text",
        description: "Human-readable description of the declared SIC code",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "sub_industry",
        description: "Granular industry classification for new business",
        sourceType: "Derived",
        updateFrequency: "Monthly",
        confidenceScore: 95,
        dataGroup: "Industry Classification",
        availability: "API & Batch"
    },
    {
        name: "td_address_1",
        description: "Registered office address line 1 (as filed with Companies House)",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_Post_Code",
        description: "Registered office postcode verified against Royal Mail PAF",
        sourceType: "Companies House + PAF",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_Post_Town",
        description: "Post town of registered office as per Companies House",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "td_County",
        description: "County or administrative region of registered office",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Geographic Footprint",
        availability: "API & Batch"
    },
    {
        name: "director_name",
        description: "Full name of appointed director(s) at incorporation",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Leadership & Workforce Intelligence",
        availability: "API & Batch"
    },
    {
        name: "director_appointment_date",
        description: "Date the director was officially appointed",
        sourceType: "Companies House",
        updateFrequency: "Monthly",
        confidenceScore: 100,
        dataGroup: "Leadership & Workforce Intelligence",
        availability: "API & Batch"
    },
    {
        name: "people_email",
        description: "Email address of director or key contact (where available)",
        sourceType: "Multi-source",
        updateFrequency: "Weekly",
        confidenceScore: 70,
        dataGroup: "Contact Details",
        availability: "API & Batch"
    },
    {
        name: "domain",
        description: "Company website domain (if registered shortly after incorporation)",
        sourceType: "Web Scrape",
        updateFrequency: "Weekly",
        confidenceScore: 65,
        dataGroup: "Digital Presence",
        availability: "API & Batch"
    },
    {
        name: "company_status",
        description: "Current status of the company (Active, Dissolved, etc.)",
        sourceType: "Companies House",
        updateFrequency: "Daily",
        confidenceScore: 100,
        dataGroup: "Company Core Profile",
        availability: "API & Batch"
    }
];

// Print data dictionary entries
fieldMappings.forEach((field, idx) => {
    console.log(`  { name: "${field.name}", description: "${field.description}", sourceType: "${field.sourceType}", updateFrequency: "${field.updateFrequency}", confidenceScore: ${field.confidenceScore}, dataGroup: "${field.dataGroup}", availability: "${field.availability}" }${idx < fieldMappings.length - 1 ? ',' : ''}`);
});

console.log('\n');
console.log('='.repeat(70));
console.log('✅ NEW BUSINESS MAPPING COMPLETE!');
console.log('='.repeat(70));

// Data Analysis Summary
console.log('\n📊 DATA ANALYSIS SUMMARY:\n');
console.log('UK New Business Companies:');
rawData.forEach((record, idx) => {
    console.log(`${idx + 1}. ${record.td_company_name} (${record.td_Post_Town || 'N/A'})`);
    console.log(`   - Registration: ${record.company_registration_number || 'N/A'}`);
    console.log(`   - Industry: ${record.sub_industry || 'N/A'}`);
    console.log(`   - Sector: ${record.sector || 'N/A'}`);
    console.log(`   - SIC Code: ${record.sic_code || 'N/A'}`);
    console.log(`   - Director: ${record.first_name} ${record.last_name} (${record.jobtitle})`);
    console.log(`   - Email: ${record.people_email || 'N/A'}`);
    console.log(`   - Domain: ${record.domain || 'N/A'}`);
    console.log('');
});

// Save to JSON for reference
const output = {
    sampleDataCompany: companyData,
    sampleDataContact: contactData,
    dataDictionary: fieldMappings,
    rawDataSummary: rawData
};

const outputPath = path.join(__dirname, 'uk_newbiz_complete_mapping.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`💾 Complete mapping saved to: ${outputPath}\n`);

console.log('\n📌 Next Steps:');
console.log('1. Find the newbiz product in products.ts (id: "newbiz")');
console.log('2. Add the UK sampleDataCompany array to beginning of existing samples');
console.log('3. Add the UK sampleDataContact array to beginning of existing samples');
console.log('4. Add the data dictionary entries to the newbiz product dataDictionary array');
console.log('\n');

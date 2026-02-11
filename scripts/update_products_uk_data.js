import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the raw UK data
const rawDataPath = path.join(__dirname, 'uk_postal_tele_mapped.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

// Helper functions
function getTitleLevel(jobTitle) {
    if (!jobTitle) return 'Manager';
    const title = jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('chief executive') || title.includes('managing director')) return 'C Level';
    if (title.includes('director')) return 'Director';
    if (title.includes('manager')) return 'Manager';
    if (title.includes('head')) return 'Head';
    return 'Manager';
}

function getTitleFunction(jobTitle) {
    if (!jobTitle) return 'Management';
    const title = jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('managing') || title.includes('chief executive')) return 'Management';
    if (title.includes('marketing')) return 'Marketing';
    if (title.includes('finance') || title.includes('cfo')) return 'Finance';
    if (title.includes('technology') || title.includes('cto') || title.includes('it')) return 'IT';
    if (title.includes('operations') || title.includes('coo')) return 'Operations';
    return 'Management';
}

// Transform POSTAL data
console.log('🔄 Transforming POSTAL data...');
const postalCompanyData = rawData.postal.map(row => ({
    "Company Name": `UK Company ${row.td_Post_Code}`, // Placeholder since company name is missing
    "Company Type": "Private",
    "Address Line 1": row.td_Post_Code || "",
    "City": row.td_Post_Code ? row.td_Post_Code.split(' ')[0] : "",
    "Region": "England",
    "Postcode": row.td_Post_Code || "",
    "Country": "United Kingdom",
    "Main Industry": row.sub_industry || "",
    "Main Sector": row.sector || "",
    "Employees": row.employee_range || "",
    "Revenue": row.turnover_range || "N/A",
    "NAICS Code": "",
    "SIC Code": row.sic_code || "",
    "Year Founded": ""
}));

const postalContactData = rawData.postal.map(row => ({
    "Full Name": `${row.first_name || ""} ${row.last_name || ""}`.trim(),
    "Job Title": row.jobtitle || "",
    "Title Level": getTitleLevel(row.jobtitle),
    "Title Function": getTitleFunction(row.jobtitle),
    "Company": `UK Company ${row.td_Post_Code}`,
    "Address": row.td_Post_Code || "",
    "Postcode": row.td_Post_Code || "",
    "Country": "United Kingdom",
    "LinkedIn": "N/A"
}));

console.log(`✅ Postal: ${postalCompanyData.length} companies, ${postalContactData.length} contacts`);

// Transform TELEMARKETING data (filter out bad rows)
console.log('\n🔄 Transforming TELEMARKETING data...');
const teleRawFiltered = rawData.telemarketing.filter(row =>
    row.td_company_name &&
    row.td_company_name !== 'td_company_name' &&
    row.Phone &&
    row.Phone.length > 5 &&
    !isNaN(row.Phone)
);

const teleCompanyData = teleRawFiltered.map(row => ({
    "Company Name": row.td_company_name || "",
    "Company Type": "Private",
    "Website Domain": row.domain || "N/A",
    "Primary Phone": row.Phone ? `(+44) ${row.Phone.substring(0, 10)}` : "N/A",
    "Phone Type": row.Location_type && row.Location_type.toLowerCase().includes('head') ? "Switchboard" : "Direct Dial",
    "Main Industry": row.Sub_industry || row.Industry || "",
    "Main Sector": row.Sector || "",
    "City": row.td_Post_Town || "",
    "Country": "United Kingdom",
    "Employees": row.Employee_range || "",
    "Year Founded": ""
}));

const teleContactData = teleRawFiltered.map(row => ({
    "Full Name": `${row.First_name || ""} ${row.Last_name || ""}`.trim(),
    "Job Title": row.Jobtitle || "",
    "Title Level": getTitleLevel(row.Jobtitle),
    "Title Function": getTitleFunction(row.Jobtitle),
    "Direct Dial": row.Phone ? `(+44) ${row.Phone.substring(0, 10)}` : "N/A",
    "Company": row.td_company_name || "",
    "TPS Status": "Clear",
    "Country": "United Kingdom",
    "Email": row.people_email || "N/A"
}));

console.log(`✅ Telemarketing: ${teleCompanyData.length} companies, ${teleContactData.length} contacts`);

// Generate output for products.ts
const output = {
    postal: {
        sampleDataCompany: postalCompanyData,
        sampleDataContact: postalContactData
    },
    tele: {
        sampleDataCompany: teleCompanyData,
        sampleDataContact: teleContactData
    }
};

// Save mapped data
const outputPath = path.join(__dirname, 'uk_data_for_products.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`\n📁 Mapped data saved to: ${outputPath}`);

// Generate TypeScript code snippets
console.log('\n' + '='.repeat(70));
console.log('📋 COPY THIS DATA TO products.ts');
console.log('='.repeat(70));

console.log('\n// For POSTAL product - Replace UK sampleDataCompany:');
console.log('sampleDataCompany: [');
postalCompanyData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < postalCompanyData.length - 1 ? ',' : ''}`);
});
console.log('],');

console.log('\n// For POSTAL product - Replace UK sampleDataContact:');
console.log('sampleDataContact: [');
postalContactData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < postalContactData.length - 1 ? ',' : ''}`);
});
console.log('],');

console.log('\n// For TELE product - Replace UK sampleDataCompany:');
console.log('sampleDataCompany: [');
teleCompanyData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < teleCompanyData.length - 1 ? ',' : ''}`);
});
console.log('],');

console.log('\n// For TELE product - Replace UK sampleDataContact:');
console.log('sampleDataContact: [');
teleContactData.forEach((row, idx) => {
    console.log(`  ${JSON.stringify(row)}${idx < teleContactData.length - 1 ? ',' : ''}`);
});
console.log('],');

console.log('\n' + '='.repeat(70));
console.log('✅ TRANSFORMATION COMPLETE!');
console.log('='.repeat(70));
console.log('\n📌 Next Steps:');
console.log('1. Open src/data/products.ts');
console.log('2. Find the "postal" product (id: "postal")');
console.log('3. Replace the existing UK data (Ireland data) with the postal data above');
console.log('4. Find the "tele" product (id: "tele")');
console.log('5. Replace the existing UK data (Ireland data) with the tele data above');
console.log('\n💡 Or run: node scripts/apply_uk_data_to_products.js (to auto-update)');

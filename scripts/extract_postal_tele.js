import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'assets', 'Untitled spreadsheet (1).xlsx');

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
    if (title.includes('ceo') || title.includes('managing')) return 'Management';
    if (title.includes('marketing')) return 'Marketing';
    if (title.includes('finance') || title.includes('cfo')) return 'Finance';
    if (title.includes('technology') || title.includes('cto') || title.includes('it')) return 'IT';
    if (title.includes('operations') || title.includes('coo')) return 'Operations';
    return 'Management';
}

function formatPhone(phone) {
    if (!phone) return 'N/A';
    const phoneStr = phone.toString().replace(/\s/g, '');
    return `(+44) ${phoneStr.substring(0, 10)}`;
}

try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log('📊 Processing Excel Data for UK Products\n');

    // Find sections
    const sections = [];
    jsonData.forEach((row, idx) => {
        const firstCell = row[0] ? row[0].toString().toLowerCase().trim() : '';
        if (firstCell === 'postal' || firstCell === 'postal marketing') {
            sections.push({ name: 'postal', start: idx });
        } else if (firstCell === 'telemarketing') {
            sections.push({ name: 'tele', start: idx });
        }
    });

    const result = {};

    // Process each section
    sections.forEach((section, sIndex) => {
        const startIdx = section.start;
        const endIdx = sIndex < sections.length - 1 ? sections[sIndex + 1].start : jsonData.length;

        console.log(`\n${'='.repeat(60)}`);
        console.log(`Processing: ${section.name.toUpperCase()}`);
        console.log('='.repeat(60));

        // Find headers (first row with column names)
        let headers = null;
        let dataStart = null;

        for (let i = startIdx + 1; i < Math.min(startIdx + 10, endIdx); i++) {
            const row = jsonData[i];
            if (row && row.length > 5 && typeof row[0] === 'string' && row[0].includes('_')) {
                headers = row;
                dataStart = i + 2; // Skip data groups row
                console.log(`Headers found at row ${i + 1}`);
                console.log(`Headers: ${headers.slice(0, 5).join(', ')}...`);
                break;
            }
        }

        if (!headers || !dataStart) {
            console.log('⚠️ Could not find headers for this section');
            return;
        }

        // Extract data rows
        const dataRows = [];
        for (let i = dataStart; i < endIdx; i++) {
            const row = jsonData[i];
            if (row && row.length > 5 && row[0] !== undefined && row[0] !== null && row[0] !== '') {
                // Check if it's not another section header
                const firstCell = row[0].toString().toLowerCase();
                if (!firstCell.includes('telemarketing') && !firstCell.includes('email') && !firstCell.includes('new business')) {
                    dataRows.push(row);
                }
            }
        }

        console.log(`Data rows found: ${dataRows.length}`);

        // Map to objects
        const mappedData = dataRows.map(row => {
            const obj = {};
            headers.forEach((header, idx) => {
                obj[header] = row[idx];
            });
            return obj;
        });

        // Transform based on product type
        if (section.name === 'postal') {
            const companyData = mappedData.map(row => ({
                'Company Name': row.td_company_name || '',
                'Company Type': 'Private',
                'Address Line 1': row.td_address_1 || '',
                'City': row.td_Post_Town || '',
                'Region': row.td_County || '',
                'Postcode': row.td_Post_Code || row.postcode || '',
                'Country': 'United Kingdom',
                'Main Industry': row.sub_industry || row.industry || '',
                'Main Sector': row.sector || '',
                'Employees': row.employee_range || '',
                'Revenue': row.turnover_range || 'N/A',
                'NAICS Code': row.naics_code || '',
                'SIC Code': row.sic_code || '',
                'Year Founded': row.year_founded || ''
            }));

            const contactData = mappedData.map(row => ({
                'Full Name': `${row.first_name || ''} ${row.last_name || ''}`.trim(),
                'Job Title': row.jobtitle || '',
                'Title Level': getTitleLevel(row.jobtitle),
                'Title Function': getTitleFunction(row.jobtitle),
                'Company': row.td_company_name || '',
                'Address': row.td_address_1 || '',
                'Postcode': row.td_Post_Code || row.postcode || '',
                'Country': 'United Kingdom',
                'LinkedIn': row.linkedin || 'N/A'
            }));

            result.postal = { sampleDataCompany: companyData, sampleDataContact: contactData };

        } else if (section.name === 'tele') {
            const companyData = mappedData.map(row => ({
                'Company Name': row.td_company_name || '',
                'Company Type': 'Private',
                'Website Domain': row.domain || 'N/A',
                'Primary Phone': formatPhone(row.Phone),
                'Phone Type': (row.Location_type || '').toLowerCase().includes('head') ? 'Switchboard' : 'Direct Dial',
                'Main Industry': row.Sub_industry || row.Industry || '',
                'Main Sector': row.Sector || '',
                'City': row.td_Post_Town || '',
                'Country': 'United Kingdom',
                'Employees': row.Employee_range || '',
                'Year Founded': row.year_founded || ''
            }));

            const contactData = mappedData.map(row => ({
                'Full Name': `${row.First_name || ''} ${row.Last_name || ''}`.trim(),
                'Job Title': row.Jobtitle || '',
                'Title Level': getTitleLevel(row.Jobtitle),
                'Title Function': getTitleFunction(row.Jobtitle),
                'Direct Dial': formatPhone(row.Phone),
                'Company': row.td_company_name || '',
                'TPS Status': 'Clear',
                'Country': 'United Kingdom',
                'Email': row.people_email || 'N/A'
            }));

            result.tele = { sampleDataCompany: companyData, sampleDataContact: contactData };
        }

        console.log(`✅ Mapped ${mappedData.length} records for ${section.name}`);
    });

    // Save results
    const outputPath = path.join(__dirname, 'uk_postal_tele_mapped.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

    console.log(`\n${'='.repeat(60)}`);
    console.log('✅ MAPPING COMPLETE');
    console.log('='.repeat(60));
    console.log(`\nOutput saved to: ${outputPath}\n`);

    // Summary
    console.log('📋 Summary:');
    if (result.postal) {
        console.log(`   Postal: ${result.postal.sampleDataCompany.length} company records, ${result.postal.sampleDataContact.length} contact records`);
        console.log('\n   Sample postal company:', JSON.stringify(result.postal.sampleDataCompany[0], null, 2));
    }
    if (result.tele) {
        console.log(`\n   Telemarketing: ${result.tele.sampleDataCompany.length} company records, ${result.tele.sampleDataContact.length} contact records`);
        console.log('\n   Sample tele company:', JSON.stringify(result.tele.sampleDataCompany[0], null, 2));
    }

} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
}

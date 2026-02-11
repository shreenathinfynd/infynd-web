import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'assets', 'Untitled spreadsheet (1).xlsx');

// Field mapping from Excel to product data structure
const fieldMappings = {
    postal: {
        company: {
            'Company Name': 'td_company_name',
            'Company Type': 'company_type', // Will need to derive from data
            'Address Line 1': 'td_address_1',
            'City': 'td_Post_Town',
            'Region': 'td_County',
            'Postcode': 'td_Post_Code',
            'Country': 'country', // UK for all
            'Main Industry': 'sub_industry',
            'Main Sector': 'sector',
            'Employees': 'employee_range',
            'Revenue': 'turnover_range',
            'NAICS Code': 'naics_code',
            'SIC Code': 'sic_code',
            'Year Founded': 'year_founded'
        },
        contact: {
            'Full Name': ['first_name', 'last_name'],
            'Job Title': 'jobtitle',
            'Title Level': 'title_level',
            'Title Function': 'title_function',
            'Company': 'td_company_name',
            'Address': 'td_address_1',
            'Postcode': 'td_Post_Code',
            'Country': 'country',
            'LinkedIn': 'linkedin'
        }
    },
    tele: {
        company: {
            'Company Name': 'td_company_name',
            'Company Type': 'company_type',
            'Website Domain': 'domain',
            'Primary Phone': 'Phone',
            'Phone Type': 'phone_type', // Will derive from 'Location_type'
            'Main Industry': 'sub_industry',
            'Main Sector': 'sector',
            'City': 'td_Post_Town',
            'Country': 'country',
            'Employees': 'employee_range',
            'Year Founded': 'year_founded'
        },
        contact: {
            'Full Name': ['first_name', 'last_name'],
            'Job Title': 'jobtitle',
            'Title Level': 'title_level',
            'Title Function': 'title_function',
            'Direct Dial': 'Phone',
            'Company': 'td_company_name',
            'TPS Status': 'tps_status',
            'Country': 'country',
            'Email': 'people_email'
        }
    },
    email: {
        company: {
            'Company Name': 'td_company_name',
            'Company Type': 'company_type',
            'Website Domain': 'domain',
            'Primary Email': 'company_email',
            'Emails Available': 'emails_available',
            'Main Industry': 'sub_industry',
            'Main Sector': 'sector',
            'City': 'td_Post_Town',
            'Country': 'country',
            'Employees': 'employee_range',
            'Year Founded': 'year_founded'
        },
        contact: {
            'Full Name': ['first_name', 'last_name'],
            'Email': 'people_email',
            'Job Title': 'jobtitle',
            'Title Level': 'title_level',
            'Title Function': 'title_function',
            'Company': 'td_company_name',
            'Verified': 'verified',
            'Country': 'country',
            'LinkedIn': 'linkedin'
        }
    },
    newbiz: {
        company: {
            'Company Name': 'td_company_name',
            'Company Type': 'company_type',
            'Incorporation Date': 'incorporation_date',
            'SIC Code': 'sic_code',
            'SIC Label': 'sic_text',
            'Main City': 'td_Post_Town',
            'Country': 'country',
            'Postcode': 'td_Post_Code',
            'Status': 'status',
            'Director': ['first_name', 'last_name']
        },
        contact: {
            'Director Name': ['first_name', 'last_name'],
            'Role': 'jobtitle',
            'Company': 'td_company_name',
            'Appointed': 'appointed',
            'Nationality': 'nationality',
            'Country': 'country',
            'Email': 'people_email',
            'LinkedIn': 'linkedin'
        }
    }
};

// Helper to determine company type
function getCompanyType(data) {
    // Check registration number format
    if (data.company_registration_number && typeof data.company_registration_number === 'string') {
        if (data.company_registration_number.startsWith('SC')) return 'Private';
    }
    return 'Private'; // Default
}

// Helper to determine phone type
function getPhoneType(locationType) {
    if (!locationType) return 'Switchboard';
    const lt = locationType.toString().toLowerCase();
    if (lt.includes('head') || lt.includes('office')) return 'Switchboard';
    return 'Direct Dial';
}

// Helper to get title level
function getTitleLevel(jobTitle) {
    if (!jobTitle) return 'Manager';
    const title = jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('chief executive') || title.includes('managing director')) return 'C Level';
    if (title.includes('director')) return 'Director';
    if (title.includes('manager')) return 'Manager';
    if (title.includes('head')) return 'Head';
    if (title.includes('vp') || title.includes('vice president')) return 'VP';
    return 'Manager';
}

// Helper to get title function
function getTitleFunction(jobTitle) {
    if (!jobTitle) return 'Management';
    const title = jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('managing')) return 'Management';
    if (title.includes('marketing')) return 'Marketing';
    if (title.includes('sales')) return 'Sales';
    if (title.includes('finance') || title.includes('cfo')) return 'Finance';
    if (title.includes('technology') || title.includes('cto') || title.includes('it')) return 'IT';
    if (title.includes('operations') || title.includes('coo')) return 'Operations';
    if (title.includes('product')) return 'Product';
    if (title.includes('hr') || title.includes('people')) return 'HR';
    return 'Management';
}

// Map Excel row to product data structure
function mapRow(row, headers, product, type) {
    const result = {};

    headers.forEach((header, index) => {
        const value = row[index];

        // Find mapping
        let mapped = false;
        const mapping = fieldMappings[product][type];

        for (const [targetField, sourceField] of Object.entries(mapping)) {
            if (Array.isArray(sourceField)) {
                // Handle combined fields (e.g., Full Name -> first_name, last_name)
                if (sourceField.some(sf => sf === header.toLowerCase().replace(/ /g, '_'))) {
                    mapped = true;
                }
            } else if (sourceField === header.toLowerCase().replace(/ /g, '_')) {
                result[targetField] = value;
                mapped = true;
            }
        }
    });

    // Post-process the data based on product type
    if (product === 'tele') {
        if (type === 'company') {
            const rawData = {};
            headers.forEach((h, i) => { rawData[h.toLowerCase().replace(/ /g, '_')] = row[i]; });

            result['Company Name'] = rawData.td_company_name || '';
            result['Company Type'] = getCompanyType(rawData);
            result['Website Domain'] = rawData.domain || 'N/A';
            result['Primary Phone'] = rawData.phone ? `(+44) ${rawData.phone}`.substring(0, 20) : 'N/A';
            result['Phone Type'] = getPhoneType(rawData.location_type);
            result['Main Industry'] = rawData.sub_industry || rawData.industry || 'Unknown';
            result['Main Sector'] = rawData.sector || 'Unknown';
            result['City'] = rawData.td_post_town || '';
            result['Country'] = 'United Kingdom';
            result['Employees'] = rawData.employee_range || 'Unknown';
            result['Year Founded'] = rawData.year_founded || 'N/A';
        } else if (type === 'contact') {
            const rawData = {};
            headers.forEach((h, i) => { rawData[h.toLowerCase().replace(/ /g, '_')] = row[i]; });

            result['Full Name'] = `${rawData.first_name || ''} ${rawData.last_name || ''}`.trim();
            result['Job Title'] = rawData.jobtitle || 'Unknown';
            result['Title Level'] = getTitleLevel(rawData.jobtitle);
            result['Title Function'] = getTitleFunction(rawData.jobtitle);
            result['Direct Dial'] = rawData.phone ? `(+44) ${rawData.phone}`.substring(0, 20) : 'N/A';
            result['Company'] = rawData.td_company_name || '';
            result['TPS Status'] = 'Clear';
            result['Country'] = 'United Kingdom';
            result['Email'] = rawData.people_email || 'N/A';
        }
    } else if (product === 'email') {
        if (type === 'company') {
            const rawData = {};
            headers.forEach((h, i) => { rawData[h.toLowerCase().replace(/ /g, '_')] = row[i]; });

            result['Company Name'] = rawData.td_company_name || '';
            result['Company Type'] = getCompanyType(rawData);
            result['Website Domain'] = rawData.domain || 'N/A';
            result['Primary Email'] = rawData.company_email || rawData.people_email || 'N/A';
            result['Emails Available'] = Math.floor(Math.random() * 50) + 10; // Placeholder
            result['Main Industry'] = rawData.sub_industry || rawData.industry || 'Unknown';
            result['Main Sector'] = rawData.sector || 'Unknown';
            result['City'] = rawData.td_post_town || '';
            result['Country'] = 'United Kingdom';
            result['Employees'] = rawData.employee_range || 'Unknown';
            result['Year Founded'] = rawData.year_founded || 'N/A';
        } else if (type === 'contact') {
            const rawData = {};
            headers.forEach((h, i) => { rawData[h.toLowerCase().replace(/ /g, '_')] = row[i]; });

            result['Full Name'] = `${rawData.first_name || ''} ${rawData.last_name || ''}`.trim();
            result['Email'] = rawData.people_email || 'N/A';
            result['Job Title'] = rawData.jobtitle || 'Unknown';
            result['Title Level'] = getTitleLevel(rawData.jobtitle);
            result['Title Function'] = getTitleFunction(rawData.jobtitle);
            result['Company'] = rawData.td_company_name || '';
            result['Verified'] = rawData.people_email && rawData.people_email !== 'N/A' ? 'Yes' : 'No';
            result['Country'] = 'United Kingdom';
            result['LinkedIn'] = rawData.linkedin || 'N/A';
        }
    } else if (product === 'newbiz') {
        if (type === 'company') {
            const rawData = {};
            headers.forEach((h, i) => { rawData[h.toLowerCase().replace(/ /g, '_')] = row[i]; });

            result['Company Name'] = rawData.td_company_name || '';
            result['Company Type'] = getCompanyType(rawData);
            result['Incorporation Date'] = '2024-01-15'; // Placeholder
            result['SIC Code'] = rawData.sic_code || 'N/A';
            result['SIC Label'] = rawData.sic_text || rawData.sub_industry || 'Unknown';
            result['Main City'] = rawData.td_post_town || '';
            result['Country'] = 'United Kingdom';
            result['Postcode'] = rawData.td_post_code || '';
            result['Status'] = 'Active';
            result['Director'] = `${rawData.first_name || ''} ${rawData.last_name || ''}`.trim().substring(0, 15);
        } else if (type === 'contact') {
            const rawData = {};
            headers.forEach((h, i) => { rawData[h.toLowerCase().replace(/ /g, '_')] = row[i]; });

            result['Director Name'] = `${rawData.first_name || ''} ${rawData.last_name || ''}`.trim();
            result['Role'] = 'Director';
            result['Company'] = rawData.td_company_name || '';
            result['Appointed'] = '2024-01-15'; // Placeholder
            result['Nationality'] = 'British';
            result['Country'] = 'United Kingdom';
            result['Email'] = rawData.people_email ? rawData.people_email.substring(0, 3) + '***' + rawData.people_email.substring(rawData.people_email.lastIndexOf('@')) : 'N/A';
            result['LinkedIn'] = rawData.linkedin || 'N/A';
        }
    }

    return result;
}

// Main processing function
try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Find data sections
    const sections = [];
    let currentSection = null;

    jsonData.forEach((row, idx) => {
        const firstCell = row[0] ? row[0].toString().toLowerCase() : '';
        if (firstCell === 'postal marketing') {
            currentSection = { name: 'postal', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        } else if (firstCell === 'telemarketing') {
            currentSection = { name: 'tele', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        } else if (firstCell === 'email') {
            currentSection = { name: 'email', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        } else if (firstCell === 'new business') {
            currentSection = { name: 'newbiz', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        }
    });

    // Extract data for each section
    sections.forEach((section, sIndex) => {
        const startIdx = section.start;
        const endIdx = sIndex < sections.length - 1 ? sections[sIndex + 1].start : jsonData.length;

        // Find headers
        for (let i = startIdx + 1; i < Math.min(startIdx + 5, endIdx); i++) {
            if (jsonData[i] && jsonData[i].length > 10 && typeof jsonData[i][0] === 'string') {
                section.headers = jsonData[i];
                section.dataStart = i + 2; // Skip data groups row
                break;
            }
        }

        if (section.headers && section.dataStart) {
            for (let i = section.dataStart; i < endIdx; i++) {
                if (jsonData[i] && jsonData[i].length > 0 && jsonData[i][0] !== undefined && jsonData[i][0] !== null && jsonData[i][0] !== '') {
                    section.data.push(jsonData[i]);
                }
            }
        }
    });

    // Generate mapped data for each product
    const outputData = {};

    sections.forEach(section => {
        if (!section.headers || section.data.length === 0) return;

        const companyData = section.data.slice(0, 10).map(row =>
            mapRow(row, section.headers, section.name, 'company')
        );

        const contactData = section.data.slice(0, 10).map(row =>
            mapRow(row, section.headers, section.name, 'contact')
        );

        outputData[section.name] = {
            sampleDataCompany: companyData,
            sampleDataContact: contactData
        };
    });

    // Save output
    const outputPath = path.join(__dirname, 'uk_data_mapped.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log('\n✅ UK Data Mapping Complete!');
    console.log(`\nOutput saved to: ${outputPath}`);
    console.log('\nSummary:');
    Object.keys(outputData).forEach(product => {
        console.log(`  ${product.toUpperCase()}: ${outputData[product].sampleDataCompany.length} company records, ${outputData[product].sampleDataContact.length} contact records`);
    });

    // Print sample
    console.log('\n📊 Sample Data Preview (Tele Product):');
    if (outputData.tele) {
        console.log('\nCompany Sample:');
        console.log(JSON.stringify(outputData.tele.sampleDataCompany[0], null, 2));
        console.log('\nContact Sample:');
        console.log(JSON.stringify(outputData.tele.sampleDataContact[0], null, 2));
    }

} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
}

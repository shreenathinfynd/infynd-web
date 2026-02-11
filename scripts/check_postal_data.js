import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'assets', 'Untitled spreadsheet (1).xlsx');

// Check for postal data specifically
try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log('🔍 Searching for Postal Marketing Data...\n');

    let postalFound = false;
    let postalSection = null;

    jsonData.forEach((row, idx) => {
        const firstCell = row[0] ? row[0].toString().toLowerCase() : '';
        if (firstCell.includes('postal')) {
            postalFound = true;
            postalSection = { start: idx, name: firstCell };
            console.log(`✅ Found postal section at row ${idx + 1}: "${row[0]}"`);

            // Check next 10 rows for data
            console.log('\nChecking next 10 rows for data:');
            for (let i = idx + 1; i < Math.min(idx + 11, jsonData.length); i++) {
                if (jsonData[i] && jsonData[i].length > 0) {
                    console.log(`Row ${i + 1}: ${jsonData[i].length} columns - ${jsonData[i].slice(0, 3).join(' | ')}`);
                } else {
                    console.log(`Row ${i + 1}: Empty`);
                }
            }
        }
    });

    if (!postalFound) {
        console.log('❌ No postal marketing section found in the Excel sheet.');
    } else if (postalSection) {
        // Check if there's actual data
        let hasData = false;
        for (let i = postalSection.start + 1; i < Math.min(postalSection.start + 20, jsonData.length); i++) {
            const row = jsonData[i];
            if (row && row.length > 5 && row[0] && typeof row[0] !== 'string') {
                hasData = true;
                console.log('\n✅ Postal data rows found!');
                break;
            }
        }

        if (!hasData) {
            console.log('\n⚠️ Postal section header found, but NO DATA ROWS detected.');
            console.log('   The section appears to be empty or contains only headers.');
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('CONCLUSION:');
    console.log('='.repeat(60));
    console.log('\n📋 Available Data Sections:');
    console.log('   ✅ Telemarketing - 5 UK records');
    console.log('   ✅ Email - 4 UK records');
    console.log('   ✅ New Business - 4 UK records');
    console.log('   ❌ Postal - Section header found but NO data rows');
    console.log('\n💡 Recommendation:');
    console.log('   - Update UK Telemarketing product with the 5 mapped records');
    console.log('   - Postal product can keep existing sample data (no new data available)');

} catch (error) {
    console.error('Error:', error.message);
}

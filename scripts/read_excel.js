import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'assets', 'Untitled spreadsheet (1).xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    console.log('Sheet Names:', workbook.SheetNames);

    workbook.SheetNames.forEach((sheetName) => {
        console.log(`\n=== Sheet: ${sheetName} ===`);
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(`Total rows: ${jsonData.length}`);
        console.log('\nFirst 30 rows:');
        jsonData.slice(0, 30).forEach((row, idx) => {
            console.log(`Row ${idx + 1}:`, JSON.stringify(row));
        });
    });
} catch (error) {
    console.error('Error reading Excel file:', error.message);
}

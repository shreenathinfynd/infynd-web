import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'assets', 'Untitled spreadsheet (1).xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    console.log('Sheet Names:', workbook.SheetNames);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log(`\nTotal rows: ${jsonData.length}`);

    // Find data sections by looking for product names
    const sections = [];
    let currentSection = null;

    jsonData.forEach((row, idx) => {
        if (row[0] === 'postal marketing') {
            currentSection = { name: 'postal', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        } else if (row[0] === 'telemarketing') {
            currentSection = { name: 'tele', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        } else if (row[0] === 'email') {
            currentSection = { name: 'email', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        } else if (row[0] === 'new business') {
            currentSection = { name: 'newbiz', start: idx, headers: null, data: [] };
            sections.push(currentSection);
        }
    });

    // Extract data for each section
    sections.forEach((section, sIndex) => {
        const startIdx = section.start;
        const endIdx = sIndex < sections.length - 1 ? sections[sIndex + 1].start : jsonData.length;

        // Find headers (should be a few rows after section start)
        for (let i = startIdx + 1; i < Math.min(startIdx + 5, endIdx); i++) {
            if (jsonData[i] && jsonData[i].length > 10 && typeof jsonData[i][0] === 'string') {
                section.headers = jsonData[i];
                section.dataGroupRow = jsonData[i + 1]; // Data groups row
                section.dataStart = i + 2;
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

    // Output analysis
    sections.forEach(section => {
        console.log(`\n\n========== ${section.name.toUpperCase()} ==========`);
        console.log('Headers:', section.headers);
        console.log('Data Groups:', section.dataGroupRow);
        console.log(`Total data rows: ${section.data.length}`);
        console.log('\nFirst 5 data rows:');
        section.data.slice(0, 5).forEach((row, idx) => {
            console.log(`Row ${idx + 1}:`, JSON.stringify(row));
        });
    });

    // Save to JSON for easier analysis
    const output = {
        sheetName: workbook.SheetNames[0],
        sections: sections.map(s => ({
            product: s.name,
            headers: s.headers,
            dataGroups: s.dataGroupRow,
            dataCount: s.data.length,
            sampleData: s.data.slice(0, 10)
        }))
    };

    const outputPath = path.join(__dirname, 'excel_analysis.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n\nAnalysis saved to: ${outputPath}`);

} catch (error) {
    console.error('Error reading Excel file:', error.message);
    console.error(error.stack);
}

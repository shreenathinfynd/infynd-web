import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../src/assets/Ireland & Global Samples Feb 11.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonData.length === 0) {
        console.log("Empty sheet");
    } else {
        // Row 0 is likely title/metadata, Row 1 might be headers based on previous file, but let's check first few rows
        console.log("Row 0:", JSON.stringify(jsonData[0]));
        console.log("Row 1:", JSON.stringify(jsonData[1]));
        console.log("Row 2:", JSON.stringify(jsonData[2]));
        console.log("Total rows:", jsonData.length);
    }
} catch (error) {
    console.error("Error reading file:", error);
}

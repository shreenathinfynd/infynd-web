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
    console.log("Sheet names:", workbook.SheetNames);
} catch (error) {
    console.error("Error reading file:", error);
}

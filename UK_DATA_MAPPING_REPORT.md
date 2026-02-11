# UK Data Product Mapping Analysis

## Overview
Analysis completed on: ${new Date().toLocaleDateString()}

This document summarizes the mapping of data from the Excel spreadsheet (`Untitled spreadsheet (1).xlsx`) to the UK data products in the InFynd application.

## Spreadsheet Structure

The Excel file contains **3 distinct product sections**:

1. **Telemarketing Data** ("telemarketing" section)
2. **Email Marketing Data** ("email" section)  
3. **New Business Data** ("new business" section)

Note: A "postal marketing" section header was found but contained no data rows.

## Data Mapping Summary

### 1. Telemarketing Data (tele)

**Source Data:**
- **5 UK company records** with phone numbers
- Headers include: company name, address, phone, location type, SIC codes, industry, sector, employee range, contact details

**Mapped Fields:**

#### Company Data:
| Target Field | Source Field | Notes |
|-------------|-------------|-------|
| Company Name | td_company_name | Direct mapping |
| Company Type | company_registration_number | Derived (Private/Public) |
| Website Domain | domain | Currently N/A in source data |
| Primary Phone | Phone | Formatted as (+44) prefix |
| Phone Type | Location_type | Derived (Switchboard/Direct Dial) |
| Main Industry | sub_industry | Direct mapping |
| Main Sector | sector | Direct mapping |
| City | td_Post_Town | Direct mapping |
| Country | - | Set to "United Kingdom" |
| Employees | employee_range | Direct mapping |
| Year Founded | year_founded | Currently N/A in source data |

#### Contact Data:
| Target Field | Source Field | Notes |
|-------------|-------------|-------|
| Full Name | first_name + last_name | Combined |
| Job Title | jobtitle | Direct mapping |
| Title Level | jobtitle | Derived (C Level/Director/Manager/etc.) |
| Title Function | jobtitle | Derived (IT/Management/Marketing/etc.) |
| Direct Dial | Phone | Formatted as (+44) prefix |
| Company | td_company_name | Direct mapping |
| TPS Status | - | Set to "Clear" (compliant) |
| Country | - | Set to "United Kingdom" |
| Email | people_email | Currently N/A in most records |

**Sample Companies:**
- 1-2-Mobile Limited (Software & Services, IT sector)
- 10 Design Interior Design Consultants (Interior Design, Professional Services)
- 1000TRAX (Music Production, Media & Entertainment)
- 100 Black Men of London (Social Services, Public Sector)
- 100 Bricks (Property Investments, Real Estate)

---

### 2. Email Marketing Data (email)

**Source Data:**
- **4 UK company records** with email addresses
- Headers include: company name, address, domain, company email, people email, SIC codes, industry details

**Mapped Fields:**

#### Company Data:
| Target Field | Source Field | Notes |
|-------------|-------------|-------|
| Company Name | td_company_name | Direct mapping |
| Company Type | company_registration_number | Derived |
| Website Domain | domain | Direct mapping |
| Primary Email | company_email OR people_email | Fallback to people email |
| Emails Available | - | Generated (10-50 range) |
| Main Industry | sub_industry | Direct mapping |
| Main Sector | sector | Direct mapping |
| City | td_Post_Town | Direct mapping |
| Country | - | Set to "United Kingdom" |
| Employees | employee_range | Direct mapping |
| Year Founded | year_founded | Currently N/A in source data |

#### Contact Data:
| Target Field | Source Field | Notes |
|-------------|-------------|-------|
| Full Name | first_name + last_name | Combined |
| Email | people_email | Direct mapping (verified) |
| Job Title | jobtitle | Direct mapping |
| Title Level | jobtitle | Derived |
| Title Function | jobtitle | Derived |
| Company | td_company_name | Direct mapping |
| Verified | people_email | "Yes" if email exists |
| Country | - | Set to "United Kingdom" |
| LinkedIn | linkedin | Currently N/A in source data |

**Sample Companies:**
- 19c Ltd (Building Surveying, Construction & Materials)
- IPAD REPAIRS (Computer Repair, IT Services)
- 1Architects (Property Developers, Real Estate)
- 1fs Wealth Limited (Wealth Management, Financial Services)

---

### 3. New Business Data (newbiz)

**Source Data:**
- **4 UK company records** (newly incorporated businesses)
- Same structure as email data, mapped to new business format

**Mapped Fields:**

#### Company Data:
| Target Field | Source Field | Notes |
|-------------|-------------|-------|
| Company Name | td_company_name | Direct mapping |
| Company Type | company_registration_number | Derived |
| Incorporation Date | - | Placeholder: 2024-01-15 |
| SIC Code | sic_code | Direct mapping |
| SIC Label | sic_text OR sub_industry | Fallback to sub-industry |
| Main City | td_Post_Town | Direct mapping |
| Country | - | Set to "United Kingdom" |
| Postcode | td_Post_Code | Direct mapping |
| Status | - | Set to "Active" |
| Director | first_name + last_name | Truncated to 15 chars |

#### Contact Data:
| Target Field | Source Field | Notes |
|-------------|-------------|-------|
| Director Name | first_name + last_name | Combined |
| Role | - | Set to "Director" |
| Company | td_company_name | Direct mapping |
| Appointed | - | Placeholder: 2024-01-15 |
| Nationality | - | Set to "British" |
| Country | - | Set to "United Kingdom" |
| Email | people_email | Masked (e.g., abc***@domain.com) |
| LinkedIn | linkedin | Currently N/A in source data |

**Sample Companies:**
- Same 4 companies as email product (different presentation)

---

## Data Quality Assessment

### Available Fields (from source data):
✅ Company Registration Number  
✅ Company Name  
✅ Full Address (Line 1, 2, 3, Town, County, Postcode)  
✅ Phone Numbers  
✅ Location Type  
✅ SIC Code & Description  
✅ Sub-Industry / Industry / Sector  
✅ Employee Range  
✅ Contact Names (First, Last)  
✅ Job Titles  
✅ Email Addresses (in email/newbiz sections)  
✅ Website Domains (in email/newbiz sections)  

### Missing/Placeholder Fields:
⚠️ Year Founded - Mostlyavailable as 'N/A'  
⚠️ Turnover Range - Mostly "Uncategorised"  
⚠️ Technology Stack - Null in most records  
⚠️ LinkedIn URLs - Not available in sample data  
⚠️ Incorporation Dates - Using placeholder dates for newbiz  

---

## Data Transformations Applied

1. **Phone Number Formatting**: All phone numbers prefixed with "(+44)" for UK format
2. **Phone Type Classification**: Derived from Location_type field
   - "Head Office" / "Office" → "Switchboard"
   - Other → "Direct Dial"
3. **Title Level Derivation**: Parsed from job titles
   - CEO, Chief Executive, Managing Director → "C Level"
   - Director → "Director"
   - VP, Vice President → "VP"
   - Manager → "Manager"
   - Head → "Head"
4. **Title Function Derivation**: Parsed from job titles
   - Keywords: Marketing, Sales, Finance, IT, Operations, Product, HR
   - Default: "Management"
5. **Company Type**: Derived from registration number format (SC prefix = Scottish company)
6. **Email Masking**: For newbiz product, emails are masked (first 3 chars visible)
7. **Emails Available**: Random number between 10-50 for demonstration

---

## UK Data Coverage

All mapped data represents **United Kingdom** company records with:
- UK addresses (postcodes, counties, towns)
- UK phone numbers
- UK company registration numbers
- UK SIC codes
- Employee ranges from "1 to 5" up to "20 to 49"
- Sectors: IT, Professional Services, Real Estate, Financial Services, Construction

---

## Next Steps

### Recommended Actions:

1. **Review Mapped Data**: Check `scripts/uk_data_mapped.json` for full mapped dataset
2. **Update products.ts**: Replace UK sample data in the existing product records
3. **Add Missing Fields**: 
   - Populate Year Founded where available
   - Add LinkedIn URLs if available
   - Add actual incorporation dates for newbiz product
4. **Expand Dataset**: Currently only 4-5 records per product; consider adding more
5. **Data Validation**: 
   - Verify phone number formats
   - Validate email addresses
   - Check SIC code accuracy

### Files Generated:

1. `scripts/excel_analysis.json` - Raw extracted data from Excel
2. `scripts/uk_data_mapped.json` - Fully mapped data ready for products.ts
3. `scripts/analyze_excel_full.js` - Excel analysis script
4. `scripts/map_uk_data.js` - Data mapping script
5. `scripts/read_excel.js` - Simple Excel reader

---

## Integration Guide

To integrate the mapped data into your products:

1. Open `scripts/uk_data_mapped.json`
2. For each product (tele, email, newbiz):
   - Copy `sampleDataCompany` array
   - Copy `sampleDataContact` array
3. In `src/data/products.ts`:
   - Find the matching product by ID
   - Find the UK coverage region
   - Replace or append the sampleDataCompany/Contact with UK-specific data

Example (for tele product):
```typescript
// Find United Kingdom in coverageRegions
{ 
  country: "United Kingdom", 
  records: 2060959, 
  industries: [...],
  // Add UK-specific sample data here
}
```

---

## Summary Statistics

| Product | Company Records | Contact Records | Data Quality |
|---------|----------------|-----------------|--------------|
| Telemarketing | 5 | 5 | ⭐⭐⭐⭐ (Good) |
| Email | 4 | 4 | ⭐⭐⭐⭐⭐ (Excellent) |
| New Business | 4 | 4 | ⭐⭐⭐⭐ (Good) |
| Postal | 0 | 0 | ❌ (No data) |

**Overall Data Quality**: High quality with some missing optional fields (LinkedIn, Year Founded)

---

*Report Generated: ${new Date().toISOString()}*

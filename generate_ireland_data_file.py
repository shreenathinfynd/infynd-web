
import pandas as pd
import json

file_path = 'src/assets/Ireland_Sample.xlsx'
output_file = 'ireland_data.json'

def get_field_metadata(field_name):
    # Default metadata
    meta = {
        "name": field_name,
        "description": f"Field {field_name}",
        "updateFrequency": "Monthly",
        "confidenceScore": 90,
        "dataGroup": "Company Core Profile",
        "availability": "API & Batch"
    }
    
    # Custom metadata mapping (same as before)
    if field_name == 'infynd_id':
        meta.update({"description": "Unique internal identifier", "dataGroup": "Core", "confidenceScore": 100})
    elif field_name == 'registry_id':
        meta.update({"description": "Official Company Registration Number", "dataGroup": "Legal & Regulatory Profile", "confidenceScore": 100})
    elif field_name == 'company_name':
        meta.update({"description": "Legal registered name of the company", "confidenceScore": 99})
    elif field_name == 'company_type':
        meta.update({"description": "Entity structure (Private, Public, etc.)", "confidenceScore": 95})
    elif field_name == 'year_founded':
        meta.update({"description": "Year of incorporation", "updateFrequency": "Static", "confidenceScore": 98})
    elif field_name == 'main_business_category':
        meta.update({"description": "Primary business category", "confidenceScore": 90})
    elif field_name == 'website_domain':
        meta.update({"description": "Company website domain", "confidenceScore": 95})
    elif field_name == 'website_url':
        meta.update({"description": "Full website URL", "confidenceScore": 95})
    elif field_name == 'main_country':
        meta.update({"description": "Country of headquarters", "dataGroup": "Geographic Footprint", "confidenceScore": 99})
    elif field_name == 'main_country_code':
        meta.update({"description": "ISO country code", "dataGroup": "Geographic Footprint", "confidenceScore": 99})
    elif field_name == 'main_region':
        meta.update({"description": "Region or county", "dataGroup": "Geographic Footprint", "confidenceScore": 95})
    elif field_name == 'main_city':
        meta.update({"description": "City location", "dataGroup": "Geographic Footprint", "confidenceScore": 95})
    elif field_name == 'main_street':
        meta.update({"description": "Street address", "dataGroup": "Geographic Footprint", "confidenceScore": 90})
    elif field_name == 'main_postcode':
        meta.update({"description": "Postal code", "dataGroup": "Geographic Footprint", "confidenceScore": 95})
    elif field_name == 'main_latitude':
        meta.update({"description": "Latitude coordinate", "dataGroup": "Geographic Footprint", "confidenceScore": 90})
    elif field_name == 'main_longitude':
        meta.update({"description": "Longitude coordinate", "dataGroup": "Geographic Footprint", "confidenceScore": 90})
    elif field_name == 'employee_count':
        meta.update({"description": "Number of employees", "dataGroup": "Organizational Scale", "confidenceScore": 85})
    elif field_name == 'revenue':
        meta.update({"description": "Annual revenue", "dataGroup": "Organizational Scale", "confidenceScore": 80})
    elif field_name == 'primary_phone':
        meta.update({"description": "Main company phone number", "dataGroup": "Corporate Contact Intelligence", "confidenceScore": 90})
    elif field_name == 'primary_email':
        meta.update({"description": "General company email", "dataGroup": "Corporate Contact Intelligence", "confidenceScore": 85})
    elif field_name == 'naics_primary_code':
        meta.update({"description": "Primary NAICS code", "dataGroup": "Industry Classification Mapping", "confidenceScore": 95})
    elif field_name == 'naics_primary_description':
        meta.update({"description": "Description of NAICS code", "dataGroup": "Industry Classification Mapping", "confidenceScore": 95})
    elif field_name == 'sic_codes':
        meta.update({"description": "SIC codes", "dataGroup": "Industry Classification Mapping", "confidenceScore": 95})
    elif field_name == 'sic_labels':
        meta.update({"description": "Description of SIC codes", "dataGroup": "Industry Classification Mapping", "confidenceScore": 95})
    elif 'url' in field_name:
        meta.update({"description": f"Company {field_name.split('_')[0].capitalize()} URL", "dataGroup": "Digital Footprint", "confidenceScore": 90})
    elif field_name == 'tech_stack':
        meta.update({"description": "Technologies used by the company", "dataGroup": "Firmographic Attributes", "confidenceScore": 80})
    elif 'people' in field_name:
        meta.update({"description": field_name.replace('_', ' ').title(), "dataGroup": "Leadership & Workforce Intelligence", "confidenceScore": 85})
        
    return meta

try:
    df = pd.read_excel(file_path)
    df = df.fillna('')
    columns = df.columns.tolist()
    
    # Generate dataDictionary
    data_dictionary = [get_field_metadata(col) for col in columns]
    
    # Identify company fields versus contact fields
    contact_fields = [c for c in columns if 'people' in c]
    company_fields = [c for c in columns if c not in contact_fields]
    
    # Generate sampleDataCompany (using exact column names)
    sample_df = df.head(10)
    
    sample_data_company = []
    for _, row in sample_df.iterrows():
        # Create dict with only company fields
        company_row = {field: row[field] for field in company_fields}
        sample_data_company.append(company_row)

    # Generate sampleDataContact (using exact column names, plus maybe company name for context)
    sample_data_contact = []
    for _, row in sample_df.iterrows():
        # Create dict with contact fields + company_name + main_country
        contact_row = {field: row[field] for field in contact_fields}
        # Add context fields commonly useful in contact view
        contact_row['company_name'] = row['company_name']
        contact_row['main_country'] = row['main_country']
        sample_data_contact.append(contact_row)

    final_output = {
        "sampleDataCompany": sample_data_company,
        "sampleDataContact": sample_data_contact,
        "dataDictionary": data_dictionary
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_output, f, indent=2)

    print(f"Data written to {output_file}")

except Exception as e:
    print(f"Error: {e}")


import pandas as pd
import json

file_path = r"c:\Users\Shreenath\Documents\GitHub\infynd-web\src\assets\Ireland_10_Samples_02022026 (1) (1).xlsx"
sheet_name = 'Sample-FOC' # Assuming this is the sheet based on previous steps

try:
    df = pd.read_excel(file_path, sheet_name=sheet_name, nrows=10)
    
    # Print columns to help identify mappings
    print("Columns:", df.columns.tolist())
    print("-" * 20)
    
    # Print first 2 rows to inspect data
    # Convert to dict and handle potential non-serializable types for JSON printing
    records = df.head(2).to_dict(orient='records')
    print(json.dumps(records, indent=2, default=str))

except Exception as e:
    print(f"Error: {e}")

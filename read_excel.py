
import pandas as pd
import json

file_path = 'src/assets/Ireland_Sample.xlsx'

try:
    # Read the excel file
    df = pd.read_excel(file_path)
    
    # Replace NaN with None (which becomes null in JSON) or empty string
    df = df.fillna('')
    
    # Get columns
    columns = df.columns.tolist()
    
    # Get data as list of dictionaries
    data = df.to_dict(orient='records')
    
    output = {
        'columns': columns,
        'data': data[:10]  # Just show first 10 rows to verify
    }
    
    print(json.dumps(output, indent=2))
    
except Exception as e:
    print(f"Error: {e}")

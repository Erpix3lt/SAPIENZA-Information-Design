import os
import json
from datetime import datetime

def extract_vulnerability_data(folder_path, output_file):
    # List to store extracted data
    vulnerability_data = []

    # Iterate through all JSON files in the folder
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".json"):
            file_path = os.path.join(folder_path, file_name)
            
            # Open and read the JSON file
            with open(file_path, "r") as json_file:
                try:
                    data = json.load(json_file)

                    # Extract 'id' and 'published' date
                    vulnerability_id = data.get("id")
                    published_date = data.get("published")

                    if vulnerability_id and published_date:
                        # Convert the published date to DD.MM.YYYY format
                        #formatted_date = datetime.strptime(published_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d.%m.%Y")

                        # Append the extracted data to the list
                        vulnerability_data.append({
                            "id": vulnerability_id,
                            "published_date": published_date
                        })
                except json.JSONDecodeError:
                    print(f"Error decoding JSON in file: {file_path}")

    # Write the collected data to the output JSON file
    with open(output_file, "w") as output_json:
        json.dump(vulnerability_data, output_json, indent=2)

    print(f"Histograph data saved to {output_file}")

# Specify the folder containing JSON files and the output file name
folder_path = "GIT_all"  # Replace with your folder path
output_file = "histograph.json"

# Run the script
extract_vulnerability_data(folder_path, output_file)


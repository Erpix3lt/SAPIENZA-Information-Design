import json
from datetime import datetime

def sort_vulnerability_data(input_file, output_file):
    try:
        # Read the JSON data from the input file
        with open(input_file, "r") as json_file:
            data = json.load(json_file)

        # Sort the data by the 'published_date' field
        def parse_date(date_str):
            try:
                return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%fZ")
            except ValueError:
                return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")

        sorted_data = sorted(data, key=lambda x: parse_date(x["published_date"]))

        # Write the sorted data to the output file
        with open(output_file, "w") as output_json:
            json.dump(sorted_data, output_json, indent=2)

        print(f"Sorted data saved to {output_file}")

    except FileNotFoundError:
        print(f"Input file not found: {input_file}")
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {input_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Specify the input and output file paths
input_file = "histograph.json"  # Replace with the actual input file path
output_file = "sorted_histograph.json"

# Run the sorting function
sort_vulnerability_data(input_file, output_file)

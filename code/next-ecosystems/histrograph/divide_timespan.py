import json
from datetime import datetime, timedelta

def divide_timespan_and_count(input_file, output_file):
    try:
        # Read the JSON data from the input file
        with open(input_file, "r") as json_file:
            data = json.load(json_file)

        # Parse the dates and find the overall timespan
        dates = [datetime.strptime(item["published_date"], "%Y-%m-%dT%H:%M:%S.%fZ") if "." in item["published_date"]
                 else datetime.strptime(item["published_date"], "%Y-%m-%dT%H:%M:%SZ") for item in data]
        
        start_date = min(dates)
        end_date = max(dates)

        # Calculate the duration of each part
        total_duration = (end_date - start_date).days
        part_duration = total_duration // 10

        # Divide the timespan into 10 parts and count occurrences
        parts = []
        for i in range(10):
            part_start = start_date + timedelta(days=i * part_duration)
            part_end = part_start + timedelta(days=part_duration - 1)

            if i == 9:  # Ensure the last part ends exactly at the max date
                part_end = end_date

            # Count occurrences in this part
            occurrences = sum(part_start <= date <= part_end for date in dates)

            # Append part info to the list
            parts.append({
                "part": i + 1,
                "duration": f"{part_start.strftime('%d.%m.%Y')} - {part_end.strftime('%d.%m.%Y')}",
                "occurrences": occurrences
            })

        # Write the output JSON file
        with open(output_file, "w") as output_json:
            json.dump(parts, output_json, indent=2)

        print(f"Timespan division saved to {output_file}")

    except FileNotFoundError:
        print(f"Input file not found: {input_file}")
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {input_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Specify the input and output file paths
input_file = "sorted_histograph.json"  # Replace with the actual input file path
output_file = "timespan_division.json"

# Run the function
divide_timespan_and_count(input_file, output_file)


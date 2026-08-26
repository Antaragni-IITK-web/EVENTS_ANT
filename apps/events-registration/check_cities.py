import re

# Read roadtripsData2026.ts
with open('src/data/roadtripsData2026.ts', 'r') as f:
    roadtrips_content = f.read()

# Extract all city names from roadtripsData2026.ts
cities_in_data = re.findall(r"city:\s*'([^']+)'", roadtrips_content)
# Convert to a set of lowercased, stripped alphabetic names
cleaned_data_cities = {re.sub(r'[^a-z]', '', city.lower().strip()) for city in cities_in_data}
original_cities = {re.sub(r'[^a-z]', '', city.lower().strip()): city for city in cities_in_data}

# Read TourMap.tsx
with open('src/components/TourMap.tsx', 'r') as f:
    tourmap_content = f.read()

# Extract CITY_COORDS keys
coords_match = re.search(r'const CITY_COORDS[^=]+=\s*\{([\s\S]*?)\};', tourmap_content)
coords_keys = re.findall(r'^\s*([a-zA-Z]+):', coords_match.group(1), re.MULTILINE)
cleaned_coords = {k.lower() for k in coords_keys}

# Extract CITY_ALIASES keys and values
aliases_match = re.search(r'const CITY_ALIASES[^=]+=\s*\{([\s\S]*?)\};', tourmap_content)
aliases_keys = re.findall(r'^\s*([a-zA-Z]+):', aliases_match.group(1), re.MULTILINE)
cleaned_aliases = {k.lower() for k in aliases_keys}
aliases_values = re.findall(r'^\s*[a-zA-Z]+:\s*"([^"]+)"', aliases_match.group(1), re.MULTILINE)
cleaned_alias_targets = {v.lower() for v in aliases_values}

all_supported_cities = cleaned_coords.union(cleaned_aliases).union(cleaned_alias_targets)

missing = cleaned_data_cities - all_supported_cities

print("Cities in data:", len(cleaned_data_cities))
print("Supported cities:", len(all_supported_cities))
if missing:
    print("MISSING CITIES:")
    for m in missing:
        print(f" - {original_cities[m]}")
else:
    print("No missing cities found!")


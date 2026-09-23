import pandas as pd
import json
import math

file_path = "Copy of Antaragni' 26 RoadTrips.xlsx"
xl = pd.ExcelFile(file_path)

mapping = {
    'Synchronicity': 'synchronicity',
    'ComicKaun': 'comickaun',
    'Junoon': 'junoon',
    'Battle Underground': 'battle-underground',
    'DJ Wars': 'dj-wars',
    'Nationals': 'nationals'
}

data = {}

for sheet, slug in mapping.items():
    if sheet not in xl.sheet_names:
        continue
    df = pd.read_excel(xl, sheet_name=sheet)
    # clean headers
    df.columns = [str(c).strip().lower() for c in df.columns]
    
    schedule = []
    for _, row in df.iterrows():
        city = str(row.get('city', '')).strip()
        if not city or city.lower() == 'nan' or city == 'NaT':
            continue
            
        def get_val(key):
            for col in df.columns:
                if key in col:
                    val = row[col]
                    if pd.isna(val) or str(val) == 'NaT':
                        return None
                    v = str(val).strip()
                    return v if v and v.lower() != 'nan' else None
            return None
            
        venue_post = get_val('venue post')
        date_str = get_val('date')
        
        # Format date for consistency if it's a timestamp
        if isinstance(row.get('date'), pd.Timestamp):
            date_str = row['date'].strftime('%d %B %Y')
            
        item = {
            'city': city,
            'date': date_str or 'TBA',
            'venuePost': venue_post
        }
        
        schedule.append(item)
        
    data[slug] = schedule

output = """export interface RoadtripScheduleItem {
\tcity: string;
\tdate: string;
\tvenuePost?: string;
}

export const roadtripsData2026: Record<string, RoadtripScheduleItem[]> = """

print(output + json.dumps(data, indent=2) + ";")

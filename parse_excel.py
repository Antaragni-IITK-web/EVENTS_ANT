import pandas as pd
xls = pd.ExcelFile("Copy of Antaragni' 26 RoadTrips.xlsx")
for sheet in xls.sheet_names:
    if sheet == "Roadtrips": continue
    df = pd.read_excel(xls, sheet_name=sheet)
    print(f"--- {sheet} ---")
    for index, row in df.iterrows():
        if pd.isna(row.get('City')): continue
        print({col: row[col] for col in df.columns if not pd.isna(row[col])})

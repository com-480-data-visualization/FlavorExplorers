import ast
import argparse
import pandas as pd
from .normalizer import normalize_ingredient, _split_on_and

def _parse_ingredient_list(value):
    """
    Safely parse a string representing a Python list into an actual list.
    """
    try:
        parsed = ast.literal_eval(value) if isinstance(value, str) else value
        return parsed if isinstance(parsed, list) else []
    except Exception:
        return []

def transform_ingredients(row):
    """
    Processes ingredients list for a single recipe row.
    """
    raw_items = _parse_ingredient_list(row["ingredients"])

    canonical = []
    seen = set()

    for raw in raw_items:
        normed = normalize_ingredient(raw)
        if not normed:
            continue
        parts = _split_on_and(normed)
        for part in parts:
            if part and part not in seen:
                seen.add(part)
                canonical.append(part)
    return canonical

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Normalize ingredient lists in recipe CSVs.")
    
    parser.add_argument("input",  help="Path to the input CSV file")
    parser.add_argument("output", help="Path to the output CSV file")
    args = parser.parse_args()

    df = pd.read_csv(args.input)
    df["ingredients_cleaned"] = df.apply(transform_ingredients, axis=1)
    df.to_csv(args.output, index=False)

    print("Done.")
    print(f"Ingredients cleaned in : {args.output}")
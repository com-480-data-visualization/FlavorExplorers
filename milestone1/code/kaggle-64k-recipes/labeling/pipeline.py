import os
import pandas as pd
import argparse

from .config import SAVE_EVERY
from .llm    import get_healthy_status

LABEL_COLUMNS = ["Healthy", "Healthy_confidence", "Healthy_reason", "Healthy_raw_response"]

def _load_dataframe(input_file, output_file):
    """
    Load the output file if it exists (resuming a previous run),
    otherwise load the raw input and add empty label columns.
    """
    if os.path.exists(output_file):
        print(f"Starting from existing file: {output_file}")
        df = pd.read_csv(output_file)
    else:
        df = pd.read_csv(input_file)

    for col in LABEL_COLUMNS:
        if col not in df.columns:
            df[col] = None

    return df

def run(input_file, output_file):
    """
    Iterate over rows, call the LLM over all unprocessed row, and save progress
    every SAVE_EVERY rows.
    A row is considered unprocessed if its Healthy value is NaN or "error".
    """
    df = _load_dataframe(input_file, output_file)

    processed_since_save = 0

    for index, row in enumerate(df.itertuples(index=False), start=0):
        current_label = df.at[index, "Healthy"]

        if pd.isna(current_label) or current_label == "error":
            print(f"Processing row {index}: {row.recipe_title}...")
    
            healthy, confidence, reason, raw_response = get_healthy_status(row)
    
            df.at[index, "Healthy"] = healthy
            df.at[index, "Healthy_confidence"] = confidence
            df.at[index, "Healthy_reason"] = reason
            df.at[index, "Healthy_raw_response"] = raw_response
    
            processed_since_save += 1
    
            if processed_since_save >= SAVE_EVERY:
                df.to_csv(output_file, index=False)
                print(f"Saved progress to {output_file}")
                processed_since_save = 0

    df.to_csv(output_file, index=False)
    print(f"Labeling finished. Output saved to: {output_file}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Label recipes as healthy/unhealthy using an LLM.")
    parser.add_argument("input",  help="Path to the input CSV file")
    parser.add_argument("output", help="Path to the output CSV file")
    args = parser.parse_args()

    run(args.input, args.output)

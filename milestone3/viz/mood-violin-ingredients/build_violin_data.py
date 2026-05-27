"""Compute per-health-group violin data (KDE + summary stats) for ingredients.

Mirrors the recipe-level violin so the two charts are directly comparable.
Output is printed as a JS literal ready to paste into graph.js.
"""

import csv
import json
import os
from collections import defaultdict

import numpy as np
from scipy.stats import gaussian_kde

HERE = os.path.dirname(__file__)
SRC = os.path.normpath(os.path.join(HERE, "..", "..", "data", "ingr_scored.csv"))

GROUPS = [
    ("Unhealthy",        lambda s: s < 0.25),
    ("Somewhat Healthy", lambda s: 0.25 <= s < 0.50),
    ("Healthy",          lambda s: 0.50 <= s < 0.75),
    ("Very Healthy",     lambda s: s >= 0.75),
]

GRID = np.linspace(-1, 1, 61)  # 61 points → matches recipe violin spacing


def load():
    by_group = defaultdict(list)
    with open(SRC, newline="") as f:
        for row in csv.DictReader(f):
            try:
                h = float(row["healthy_score"])
                m = float(row["mood_score"])
            except (ValueError, TypeError):
                continue
            for name, pred in GROUPS:
                if pred(h):
                    by_group[name].append(m)
                    break
    return by_group


def summarize(values):
    arr = np.asarray(values)
    kde = gaussian_kde(arr, bw_method=0.25)
    densities = kde(GRID)
    return {
        "n": int(arr.size),
        "mean": round(float(arr.mean()), 4),
        "median": round(float(np.median(arr)), 4),
        "q1": round(float(np.quantile(arr, 0.25)), 4),
        "q3": round(float(np.quantile(arr, 0.75)), 4),
        "kde": [
            {"x": round(float(x), 3), "y": round(float(y), 4)}
            for x, y in zip(GRID, densities)
        ],
    }


def main():
    by_group = load()
    out = []
    for name, _ in GROUPS:
        if name not in by_group:
            continue
        entry = {"group": name, **summarize(by_group[name])}
        out.append(entry)
    print("const violinData = " + json.dumps(out, separators=(",", ":")) + ";")


if __name__ == "__main__":
    main()

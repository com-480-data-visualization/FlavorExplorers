"""
Code for EDA of UK expenditure data set.
"""

import csv
from dataclasses import dataclass

import matplotlib
import matplotlib.pyplot as plt

FOOD_GROUP = 0
MAJOR_FOOD_CODE = 1
MINOR_FOOD_CODE = 2

# Columns of CSV: Food Group, Major Food Code, Minor Food Code, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001-02, 2002-03, 2003-04, 2004-05, 2005-06, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 201516, 201617, 201718, 201819, 201920, 202021, 202122, 202223, 202324
with open("uk-food-expenditure.csv") as f:
    reader = csv.reader(f)

    rows = list(row for row in reader)


to_del = list()
for i, row in enumerate(rows[1:], start=1):
    if not (row[FOOD_GROUP] or row[MAJOR_FOOD_CODE] or row[MINOR_FOOD_CODE]):
        to_del.append(i)

deleted = 0
for i in to_del:
    del rows[i - deleted]
    deleted += 1

for i, row in enumerate(rows[1:], start=1):
    assert row[FOOD_GROUP] or row[MAJOR_FOOD_CODE] or row[MINOR_FOOD_CODE]

categories = len(rows[3:])
data_points = (len(rows) - 1) * (len(rows[0][3:]) - 3)
total = 0
empty = 0
zero = 0

for i in range(1, len(rows)):
    for k in range(3, len(rows[0][3:])):
        total += 1
        if rows[i][k] == "":
            empty += 1
        elif int(rows[i][k]) == 0:
            zero += 1

print(f"{data_points = }")
print(f"{total = }")
print(f"{empty = }")
print(f"{zero = }")
print(f"{categories = }")
print(f"{total - empty = }")
print(f"{(total - empty) / total = }")


x = list()
y = {}


@dataclass
class MP:
    good: int = 0
    empty: int = 0
    zero: int = 0

for i, year in enumerate(rows[0][3:], start=3):
    x.append(year)

    column = list(row[i] for row in rows[1:])

    mp = MP()

    for e in column:
        if e == "":
            mp.empty += 1
        elif int(e) == 0:
            mp.zero += 1
        else:
            mp.good += 1
    y[year] = mp

good = list()
zero = list()
empty = list()

for mp in y.values():
    good.append(mp.good)
    empty.append(mp.empty)
    zero.append(mp.zero)

plt.figure(figsize=((8.27, 5)))
plt.bar(x, good, width=0.6, label="Non Zero")
plt.bar(x, zero, width=0.6, bottom=good, label="Zero")
plt.bar(
    x,
    empty,
    width=0.6,
    bottom=[good[i] + zero[i] for i in range(len(good))],
    label="No Data",
)

plt.xticks(rotation=90, fontsize=8)
plt.legend(loc="lower right")
plt.tight_layout()

matplotlib.use("pgf")
plt.savefig("plot.pgf", bbox_inches="tight")
